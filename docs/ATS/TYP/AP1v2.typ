#set text(size: 14pt)

#set page(
  paper: "a4",
  footer: align(center)[Gerado em: #datetime.today().display("[day]/[month]/[year]")],
  header: align(right)[ATS - AP1]
)

= Exercício Prático: Sistema de Delivery "PyFood"

*Duração Estimada:* 3 horas
*Objetivo:* Aplicar na prática os conceitos de testes automatizados em Python utilizando o framework `pytest`, incluindo Desenvolvimento Orientado a Testes (TDD), Fixtures, Tratamento de Exceções, Dublês de Teste (Mocks) e Análise de Cobertura (Coverage).

== Restrições do Projeto
* *NÃO* utilize classes (Orientação a Objetos) na sua implementação. Modele os dados do sistema utilizando apenas dicionários (`dict`), listas (`list`) e tipos básicos do Python.
* Toda a lógica de negócio e integrações devem ser feitas utilizando funções simples.

---

== Contexto
Você foi contratado para construir o motor principal de validação e processamento de pedidos de uma nova startup de delivery, o *PyFood*. O projeto deve obrigatoriamente seguir a seguinte estrutura de pastas padrão ensinada para separar o código da aplicação dos testes:
```text
pyfood/
├── app/
│   ├── validador.py
│   ├── calculos.py
│   └── pagamento.py
├── tests/
│   ├── conftest.py
│   └── test_*.py
```

Preparação do ambiente: Certifique-se de ter as dependências necessárias instaladas no seu ambiente virtual: `pip install pytest pytest-cov pytest-mock`

== Etapa 1: Validação de Pedidos com TDD (Tempo estimado: 40 min)

Você deve criar o arquivo `app/validador.py` contendo uma função `validar_pedido(pedido: dict) -> bool`. O desenvolvimento dessa função *deve obrigatoriamente seguir o ciclo TDD (Red, Green, Refactor)*. Escreva o teste primeiro, veja falhar, implemente a lógica, faça passar e refatore.

*Regras de Negócio para um Pedido Válido:*
1. O pedido deve conter pelo menos 1 item na lista de `"itens"`.
2. O valor total do pedido (soma dos valores dos itens) deve ser no mínimo `R$` 20,00.
3. O dicionário do pedido deve obrigatoriamente conter a chave `"endereco_entrega"`, e ela não pode ser vazia.

*Exemplo de estrutura de um pedido válido para seus testes:*
```python
pedido = {
    "endereco_entrega": "Rua das Flores, 123",
    "itens": [
        {"nome": "Hamburguer", "preco": 15.00},
        {"nome": "Refrigerante", "preco": 8.00}
    ]
}
```

---

== Etapa 2: Centralizando Dados com Fixtures (Tempo estimado: 40 min)

*Missões:*
1. Crie o arquivo `tests/conftest.py`.
2. Implemente nele três funções decoradas com `@pytest.fixture` que retornem dicionários de pedidos com diferentes cenários:
  - `pedido_vazio`: Um pedido sem itens.
  - `pedido_simples`: Um pedido que não atinge `R$` 50,00.
  - `pedido_premium`: Um pedido cujo valor total ultrapasse `R$` 100,00.
3. Implemente a função `calcular_total_com_desconto(pedido: dict) -> float` em `app/calculos.py`. A regra de negócio exige que pedidos acima de `R$` 100,00 recebam 10% de desconto no valor final.
4. Escreva testes para essa função injetando (passando como argumento) as fixtures globais que você criou no `conftest.py`.
5. *Fixture com `yield` (Setup e Teardown):* Crie uma fixture chamada `arquivo_log_temporario` que abra um arquivo de texto `.txt` em modo de escrita, use o `yield` para pausar e entregar o arquivo para o teste e, após o teste acabar, feche o arquivo (`arquivo.close()`).

---

== Etapa 3: Testando Exceções (Tempo estimado: 30 min)

No arquivo `app/calculos.py`, crie a função `dividir_conta(pedido: dict, numero_pessoas: int) -> float`.
1. A lógica exige que, se o `numero_pessoas` for igual a `0`, a função deve causar um erro nativo do Python (uma divisão por zero).
2. Escreva um teste chamado `test_deve_falhar_ao_dividir_por_zero`.
3. Utilize o bloco `with pytest.raises(ZeroDivisionError):` para garantir que a exceção aconteça e seja capturada corretamente, fazendo o teste passar apenas se o erro ocorrer.

---

== Etapa 4: Dublês de Teste (Mocks) na Integração (Tempo estimado: 40 min)

O seu sistema precisa cobrar o cliente simulando uma integração com um gateway de pagamento (ex: Cielo, Stripe). Crie a função em `app/pagamento.py`:

```python
def finalizar_compra(pedido: dict, gateway_modulo):
    # Regras de Negócio:
    # 1. O sistema deve primeiro chamar gateway_modulo.verificar_fraude(pedido)
    # 2. Logo em seguida, chamar gateway_modulo.cobrar(pedido)
    # 3. Deve retornar a string "Compra aprovada"
    pass
```

*Missões:*
1. Escreva o teste `test_deve_verificar_fraude_antes_de_cobrar`.
2. Injete a fixture `mocker` no teste e crie um Mock que substitua o módulo real: `mock_gateway = mocker.Mock()`.
3. Execute a função `finalizar_compra` passando esse Mock.
4. Defina o roteiro esperado e utilize `mock_gateway.assert_has_calls(roteiro_esperado, any_order=False)` para garantir que a verificação de fraude ocorreu estritamente *antes* da cobrança.

---

== Etapa 5: Análise de Cobertura (Coverage) (Tempo estimado: 30 min)

Agora vamos utilizar o `pytest-cov` para garantir que nossa suíte de testes seja robusta e não tenha deixado nenhum caminho (`if/else`) para trás.

*Missões:*
1. Execute o comando do pytest no terminal solicitando a cobertura por desvios: `pytest -v --cov=app --cov-branch`.
2. Em seguida, gere o relatório interativo com o comando `coverage html`.
3. Abra o arquivo `index.html` (gerado na pasta `htmlcov`) no seu navegador.
4. *Critério de Aceite:* O relatório final deve mostrar *100% de cobertura* para as linhas (`Stmts`) e para os desvios (`Branch`), confirmando que tudo está verde.

---

=== Entregáveis Esperados ao Final:
* Todos os arquivos `.py` dentro da pasta `app/` implementados com funções simples.
* A suíte de testes na pasta `tests/` executando sem falhas.
* O arquivo `conftest.py` contendo as fixtures de retorno de dados e a fixture com `yield`.
* O relatório HTML de cobertura comprovando 100% nas métricas `Stmts` e `Branch`.