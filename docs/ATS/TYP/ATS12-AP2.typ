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
A nossa empresa lançou o *"GeekStore"*, um sistema web de e-commerce. A aplicação foi desenvolvida com um banco de dados real (SQLite), mas devido aos prazos curtíssimos, *nenhuma linha de teste automatizado foi escrita*. 

Para piorar, o CTO exigiu um padrão rígido de qualidade: de agora em diante, nenhuma alteração de código pode ir para a produção se a *cobertura de testes for inferior a 90%*.

Vocês foram contratados como Engenheiros de Qualidade de Software. A missão é construir uma suíte de testes ponta a ponta e configurar uma esteira de *Integração Contínua (CI)* que bloqueie códigos sem qualidade.

== O que é esperado na Entrega Final
O grupo deverá entregar o link de um *repositório público no GitHub* contendo:
1. O código da aplicação base (fornecido abaixo).
2. Toda a suíte de testes (Unidade, Integração/DB, Mocks, API, E2E e BDD).
3. A pipeline do *GitHub Actions* configurada (`ci.yml`) que rode os testes, verifique a métrica de cobertura de código (mínimo de 90%) e fique com o selo "Verde" (Sucesso).

== Detalhamento das Tarefas

=== 1. Fixtures Avançadas e Banco de Dados (`pytest`)
O sistema agora utiliza um banco de dados *SQLite*. Você *não pode* sujar o banco de dados principal de produção durante os testes.
* Utilize o arquivo `conftest.py` para criar uma `fixture` de banco de dados. 
* Essa fixture deve criar um banco de dados temporário em memória (`:memory:`) ou um arquivo `test.db`, inserir dados fictícios para o teste, retornar a conexão com `yield` e, por fim, *apagar/limpar o banco após o teste* (Teardown).

=== 2. Cobertura de Código (`pytest-cov`)
Sua suíte deve passar por todos os cenários (inclusive os fluxos de erro, como tentar comprar um produto sem estoque).
* A execução oficial dos testes deve ser feita com o comando: `pytest --cov=. --cov-fail-under=90`
* A pipeline do GitHub Actions deve falhar se essa meta não for atingida.

=== 3. Dublês de Testes (Mocks)
O sistema possui uma classe `GatewayPagamento`. Você *não deve* fazer chamadas reais para esse gateway nos testes.
- Utilize `unittest.mock` (ou `pytest-mock`) para criar um Mock do gateway e validar a ordem em que as regras de negócio foram executadas no processamento do pedido.

=== 4. Testes de Comportamento (BDD) com `pytest-bdd`
- Escreva ao menos 1 arquivo `.feature` utilizando a sintaxe *Gherkin* (Dado, Quando, Então) descrevendo o fluxo de "Compra com Sucesso".
- Crie os *step definitions* em Python associando o Gherkin às funções reais.

=== 5. Testes de API com `Tavern`
- Crie testes declarativos em YAML para a sua API. Valide se a requisição GET de produtos retorna Status 200, a estrutura do JSON e as chaves esperadas do banco de dados. 

=== 6. Testes End-to-End (E2E) com `Selenium`
- Crie um script usando `WebDriverWait` (Expected Conditions) para abrir o `index.html` via navegador, digitar o produto, clicar no botão e validar a mensagem final.
- O teste *deve* rodar de forma invisível usando o modo *Headless*, permitindo que funcione no GitHub Actions.