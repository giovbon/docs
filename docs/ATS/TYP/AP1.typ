#set text(size: 14pt)

#set page(
  paper: "a4",
  footer: align(center)[Gerado em: #datetime.today().display("[day]/[month]/[year]")],
  header: align(right)[ATS - AP1]
)

= AP1

=== O Projeto: Gestor de Notas (`note_manager`)

Neste exercício, vai desenvolver um sistema em Python que valida notas, guarda-as numa base de dados e envia alertas (por exemplo, para integrações com ferramentas como o ntfy ou Gotify) quando a nota for marcada como urgente. 

A estrutura de ficheiros do seu projeto deverá seguir as boas práticas de separação entre o código da aplicação e o código de testes:

```text
projeto_notas/
├── app/
│   ├── __init__.py
│   ├── gestor.py
│   └── notificacoes.py
├── tests/
│   ├── __init__.py
│   ├── conftest.py
│   └── test_gestor.py
```

=== Fase 1: Validação com TDD (Tempo estimado: 45 min)

O seu primeiro objetivo é criar a lógica de validação de uma nota utilizando a abordagem de Desenvolvimento Dirigido por Testes (TDD). O TDD exige que crie o código de forma incremental, garantindo que cada regra de negócio tenha um teste correspondente.

*Regras de Negócio a implementar no `gestor.py`:*
1. O título da nota deve ter no mínimo 4 caracteres.
2. O conteúdo da nota não pode estar vazio.
3. A nota pode ter uma *tag* (etiqueta) opcional. Se a *tag* for "urgente", a nota deve ser sinalizada como prioritária.

*Passos do Exercício:*
1. *Vermelho:* Comece por escrever um teste no ficheiro `test_gestor.py` para a primeira regra (ex: `test_titulo_curto_deve_falhar`) que invoca a função pura do Python `assert` para verificar o resultado. Execute o teste e veja-o falhar.
2. *Verde:* Escreva o código mínimo necessário no `gestor.py` para fazer o teste passar.
3. *Refatoração:* Melhore o código, por exemplo, extraindo as regras para funções separadas (ex: `_validar_tamanho_titulo`) para tornar a validação mais modular e fácil de estender.
4. Repita o ciclo para as regras 2 e 3.

---

=== Fase 2: Gestão de Estado com Fixtures (Tempo estimado: 45 min)

As suas notas precisam de ser guardadas numa base de dados. Vai utilizar as *fixtures* do Pytest para preparar e fornecer este ambiente aos seus testes.

*Passos do Exercício:*
1. Crie uma classe simulada `BancoDeDadosFalso` que possua métodos para `conectar()`, `salvar()` e `desconectar()`.
2. No ficheiro `conftest.py`, crie uma *fixture* chamada `banco_de_dados`. O `conftest.py` atuará como um diretório central de recursos partilhados para os seus testes, eliminando a necessidade de importações manuais nos ficheiros de teste.
3. Na sua *fixture*, utilize a palavra reservada `yield` para separar as fases: implemente o *setup* (conectar ao banco) antes do `yield` e o *teardown* (desconectar e limpar) depois do `yield`.
4. Adicione o parâmetro `scope="module"` à sua *fixture* para garantir que a base de dados simulada seja carregada apenas uma vez por ficheiro de teste, otimizando o tempo de execução.
5. Crie uma *fixture* separada com o parâmetro `autouse=True` para configurar automaticamente variáveis de ambiente (ex: definir o modo de execução para "TESTE"), afetando silenciosamente todos os testes no escopo sem necessidade de ser chamada explicitamente.

---

=== Fase 3: Dublês de Testes (Tempo estimado: 45 min)

Sempre que uma nota for validada com a *tag* "urgente", o sistema deve enviar um alerta através de um serviço externo (no ficheiro `notificacoes.py`).

*Passos do Exercício:*
1. Crie uma classe `ServicoNotificacao` no código da sua aplicação que, teoricamente, faria um pedido de rede real.
2. Como não queremos fazer pedidos reais durante os testes, crie um *Dublê de Testes* (um *Mock* ou *Fake*) no seu ficheiro de testes para substituir este serviço externo.
3. Atualize o seu gestor de notas para aceitar o serviço de notificação como dependência.
4. Escreva um teste (`test_nota_urgente_dispara_notificacao`) que injete o seu Dublê de Testes e verifique se o método de envio foi chamado corretamente quando a nota possui a *tag* "urgente".
5. Escreva um teste para verificar o comportamento do sistema quando ocorre um erro propositado (ex: erro de divisão por zero ou erro de rede simulado), utilizando `with pytest.raises(...)` para garantir que o código falha quando deveria falhar.

---

=== Fase 4: Cobertura de Código e Análise Final (Tempo estimado: 45 min)

A Cobertura de Testes é a métrica que mede a percentagem do código-fonte que foi executada pelos seus testes automatizados. O objetivo desta fase é garantir 100% de cobertura, não deixando nenhum caminho lógico por testar.

*Passos do Exercício:*
1. No seu terminal, ative o seu ambiente virtual e instale as ferramentas necessárias executando `pip install pytest pytest-cov`.
2. Execute a sua suíte de testes com a verificação de desvios (*Branch Coverage*), que avalia se todos os caminhos possíveis (`true` e `false` de cada `if`) foram testados. Utilize o comando:
   `pytest -v --cov=app --cov-branch`
3. Analise o terminal e verifique os valores das colunas `Branch` e `BrPart`. Se houver algum desvio que foi executado apenas parcialmente (ex: entrou num `if`, mas nunca no `else`), crie os testes em falta.
4. Gere o relatório visual interativo executando o comando `coverage html`.
5. Abra o ficheiro `index.html` (localizado dentro da pasta `htmlcov` recém-criada) no seu navegador Chromium para visualizar exatamente quais as linhas a verde (cobertas) e a vermelho/amarelo (não cobertas ou com cobertura parcial).

Bom trabalho com o exercício! As abordagens como o TDD e a utilização de *fixtures* são fundamentais para escalar projetos de *software* profissionais.