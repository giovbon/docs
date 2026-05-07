#set page(
  paper: "a4",
  fill: rgb("#181818"),
  footer: align(center)[Gerado em: #datetime.today().display("[day]/[month]/[year]")],
)
#show raw.where(block: false): set text(fill: rgb("#aed68d"))
#set text(
  fill: rgb("#f5f5f5"), 
  size: 14pt
)
#show link: set text(fill: rgb("#58a6ff"))

= ATS AP2 Projeto Final

== Contexto

A nossa empresa lançou o “GeekStore”, um sistema web de e-commerce. A aplicação foi desenvolvida com um banco de dados real (SQLite), mas, devido aos prazos curtíssimos, nenhuma linha de teste automatizado foi escrita. 

Para piorar, o CTO exigiu um padrão rígido de qualidade: de agora em diante, nenhuma alteração de código pode ir para a produção se a cobertura de testes for inferior a *90%*. 

*A Exceção de Refatoração:* O CTO sabe que o código original está fortemente acoplado. Excepcionalmente, ele *autorizou a refatoração estrutural* da aplicação base (como implementar Injeção de Dependência para o banco de dados e gateways) estritamente para tornar o sistema testável antes da criação da suíte de testes.

Vocês foram contratados como Engenheiros de Qualidade de Software. A missão é construir uma suíte de testes ponta a ponta e configurar uma esteira de Integração Contínua (CI) que bloqueie códigos sem qualidade.

== O que é esperado na Entrega Final

O grupo deverá entregar o link de um repositório público no GitHub contendo:

1. O código da aplicação base refatorado para testes *(código base original fornecido no final deste documento)*.
2. Toda a suíte de testes (Unidade, Integração/DB, Mocks, API, E2E e BDD).
3. A pipeline do GitHub Actions configurada (`.github/workflows/ci.yml`) que suba a aplicação, rode os testes, verifique a métrica de cobertura de código (mínimo de 90%) e fique com o selo “Verde” (Sucesso).

== Detalhamento das Tarefas

=== 1. Fixtures Avançadas e Banco de Dados (pytest)
O sistema utiliza um banco de dados SQLite. Você não pode sujar o banco de dados principal de produção durante os testes. 

- Utilize o arquivo `conftest.py` para criar uma fixture de banco de dados. 
- Essa fixture deve criar um banco de dados *temporário em arquivo (ex: `test.db`)*, inserir dados fictícios para o teste, retornar a conexão com `yield` e, por fim, apagar o banco após o teste (Teardown).
- *Dica de Arquitetura:* Não use `:memory:`, pois threads diferentes (aplicação web vs. testes) não compartilharão os dados. Utilize Variáveis de Ambiente (ex: `os.environ['DATABASE_URL'] = 'sqlite:///test.db'`) dentro do seu `conftest.py` ou a fixture `monkeypatch` para forçar a aplicação a usar o banco de testes.

=== 2. Cobertura de Código (pytest-cov)
Sua suíte deve passar por todos os cenários (inclusive os fluxos de erro, como tentar comprar um produto sem estoque). A execução oficial dos testes deve ser feita com o comando: 
`pytest --cov=. --cov-fail-under=90`
A pipeline do GitHub Actions deve falhar se essa meta não for atingida.

=== 3. Dublês de Testes (Mocks)
O sistema possui uma classe `GatewayPagamento`. Você não deve fazer chamadas reais para esse gateway nos testes.
- Refatore a aplicação para que o `GatewayPagamento` seja injetado como dependência na função de processamento.
- Utilize `unittest.mock` (ou `pytest-mock`) para criar um Mock do gateway e validar se as regras de negócio e a ordem de execução foram respeitadas no processamento do pedido.

=== 4. Testes de Comportamento (BDD) com pytest-bdd
- Escreva ao menos 1 arquivo `.feature` utilizando a sintaxe Gherkin (Dado, Quando, Então) descrevendo a regra de negócio do fluxo de “Compra com Sucesso”.
- Crie os *step definitions* em Python associando o Gherkin às funções reais do backend.

=== 5. Testes de Contrato de API com Tavern
- Crie testes declarativos em YAML para a sua API focando no contrato de comunicação. 
- Valide se a requisição `GET` de produtos retorna Status `200`, verifique a estrutura do JSON e confirme se as chaves esperadas estão presentes.

=== 6. Testes End-to-End (E2E) com Selenium
- Crie um script usando `WebDriverWait` (Expected Conditions) para abrir o `index.html` via navegador, preencher os dados (produto e, se aplicável, cupom), clicar no botão de compra e validar a mensagem final na tela.
- *Atenção ao CI:* O teste deve rodar de forma invisível usando o modo *Headless* (sem interface gráfica), permitindo que funcione corretamente nos servidores do GitHub Actions.

== Dicas de Ouro do CTO (Infraestrutura)

Para que os testes de API (Tavern) e E2E (Selenium) funcionem no GitHub Actions, *a sua aplicação precisa estar rodando em segundo plano* durante a pipeline. Aqui está um esqueleto de como configurar seu `ci.yml`:

```yaml
name: CI GeekStore

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Configurar Python
        uses: actions/setup-python@v4
        with:
          python-version: '3.10'

      - name: Instalar dependências
        run: pip install -r requirements.txt

      - name: Iniciar a aplicação em background
        run: |
          python app.py & 
          sleep 5 # Aguarda o servidor subir antes de testar

      - name: Rodar testes com cobertura (Pytest, BDD, Tavern, Selenium)
        run: pytest --cov=. --cov-fail-under=90
```