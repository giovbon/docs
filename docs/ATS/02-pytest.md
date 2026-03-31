---
icon: simple/pytest
hide:
  - navigation
---

# PyTest :simple-pytest:

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../zSLIDES/03-pytest.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? abstract "Referências"

    - [pytest documentation](https://docs.pytest.org/en/stable/)
    - [Coverage.py — Coverage.py 7.13.4 documentation](https://coverage.readthedocs.io/en/7.13.4/)
    - [O mínimo que você deveria saber sobre testes unitários - #30diasdepython - YouTube](https://www.youtube.com/watch?v=pZvhZ-Lr-PE)
    - [pytest fixtures: explícitos, modulares, escaláveis ​​— documentação do pytest](https://docs.pytest.org/en/6.2.x/fixture.html)

O Pytest é um framework de testes para Python muito popular por ser expressivo, escalável e simples. Requer instalação via `pip install pytest`.

Características:

- Baseado em funções, permite escrita simples começando com `test_` e uso do comando nativo `assert`. 
- Utiliza apenas o `assert`, com introspecção automática para erros, mostrando valores que causaram a falha.
- O Pytest procura automaticamente por arquivos que começam com `test_` ou terminam com `_test.py`. (Ex: `test_calculadora.py`).
- Dentro desses arquivos, ele só executa funções que começam com `test_`. (Ex: `def test_soma_positivos():`).
- Esqueça coisas como o `self.assertEqual` do unitTest. Use apenas a palavra reservada `assert` do Python.

Separar o código da aplicação do código de teste é uma prática essencial no desenvolvimento profissional em Python. A estrutura padrão de um projeto Python geralmente inclui uma pasta dedicada para os testes, permitindo que ferramentas como `pytest` localizem automaticamente os arquivos de teste cujo nome começa com `test_`.

```bash hl_lines="6"
meu_projeto/
├── app/
│   ├── __init__.py
│   ├── main.py 
│   └── utilitarios.py
├── tests/
│   ├── __init__.py
│   ├── test_main.py # (1)!
│   └── test_utilitarios.py # (2)!
```

1. Testa o `main.py`, onde o programa começa
2. Testa as funções auxiliares

Preparando o ambiente:

=== "Linux (Ubuntu/Debian)"

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install pytest pytest-cov
    ```

=== "Windows"

    ```bash
    python -m venv .venv
    .\.venv\Scripts\activate
    pip install pytest pytest-cov
    ```

```python title="funcao.py"
def eh_par(numero):
    return numero % 2 == 0 # (1)!
```

1. Retorna `True` se o número for par, `False` caso contrário

```python title="test_funcoes.py"
from funcoes import eh_par
import pytest

def test_deve_retornar_true_para_numero_par(): # (1)!
    resultado = eh_par(4)
    assert resultado is True

def test_deve_retornar_false_para_numero_impar(): # (2)!
    resultado = eh_par(5)
    assert resultado is False
```

1. Verifica um caso verdadeiro
2. Verifica um caso falso

Execute `pytest test_funcoes.py -v` ou apenas `pytest` que executa todos os arquivos de teste que seguem a convenção de nomenclatura (como `test_*.py` ou `*_test.py`) no diretório atual e em subdiretórios. A opção `-v` (ou `--verbose`) aumenta a verbosidade da saída, fornecendo detalhes sobre cada teste, incluindo seu nome e resultado.

## `assert`

```py title="Possibilidades de uso do assert no pytest"
assert resultado is True
assert resultado is False
assert resultado is None
assert resultado is not None

assert soma == 10
assert nome == "Carlos"
assert usuario == {"id": 1, "nome": "Ana"} # (1)!

lista_de_frutas = ["maçã", "banana", "uva"]
mensagem_erro = "Erro: Usuário não encontrado no banco."

assert "banana" in lista_de_frutas
assert "sucesso" not in mensagem_erro
assert "id" in usuario_dict # (2)!

lista_vazia = []
lista_cheia = [1, 2, 3]

assert lista_cheia
assert not lista_vazia

idade = 18
assert idade >= 18
```

1. Compara o conteúdo do dicionário
2. Verifica se a chave existe no dicionário

Existem dois casos onde o `assert` puro do Python não resolve bem, e o pytest oferece ferramentas auxiliares:

**Testar erros**: testar se seu código falha quando deveria falhar (`assertRaises` do UnitTest):

```py hl_lines="2"
def test_deve_falhar_ao_dividir_por_zero():
    with pytest.raises(ZeroDivisionError): # (1)!
        resultado = 10 / 0
```

1. O teste PASSA se o erro acontecer. Se NÃO der erro, o teste falha.

**Aproximação**: computadores são ruins com números decimais (float). `0.1 + 0.2` muitas vezes resulta em `0.30000000000000004` e o teste falha se usar `==`.

```py hl_lines="2"
def test_calculo_decimal():
    assert 0.1 + 0.2 == pytest.approx(0.3) # (1)!
```

1. Usar `assert 0.1 + 0.2 == 0.3` falharia por causa das casas decimais: `0.30000000000000004`

## Cobertura de Testes

Cobertura de Testes (ou Code Coverage) é uma métrica usada no desenvolvimento de software para medir a porcentagem do seu código-fonte que é executada quando seus testes automatizados rodam. Em termos simples, ela responde à pergunta: "Quanto do meu código foi realmente verificado pelos testes que escrevi?"

O pytest, através do `pytest-cov` exibe estatísticas de:

### Cobertura de linha

Cobertura de linha (Line Coverage) que é a métrica mais simples, significando quantas linhas foram executadas, através do comando `pytest -v --cov=funcao` analiza um único arquivo, no caso `funcao.py`, se quiser analizar todos os arquivos com o pytest e coverage use `pytest -v --cov=.`, indicando que o coverage deve analisar todos os arquivos no diretório atual e seus subdiretórios.

O retorno no terminal seria algo assim:

```
Name        Stmts   Miss    Cover
-------------------------------
funcao.py   2       0       100%
-------------------------------
TOTAL       2       0       100%
```

- `Stmts` (statements): o pytest detectou que existem apenas 2 linhas de código "executável" dentro do arquivo `funcao.py`.
- `Miss` : durante a execução dos testes, zero linhas deixaram de rodar.
- `Cover` : (2 linhas totais - 0 perdidas) / 2 totais = 100% de cobertura de testes.

### Cobertura de desvio

Cobertura de desvio (Branch Coverage) verifica se todos os caminhos possíveis foram testados (cada `true` e `false` de um `if` ). Para obter dados desse tipo de cobertura use `--cov-branch` (ex: `pytest -v --cov=funcao --cov-branch`) , que exibirá:

```
Name        Stmts   Miss    Branch  BrPart  Cover
---------------------------------------------
funcao.py   2       0       0       0       100%
---------------------------------------------
TOTAL       2       0       0       0       100%
```

- `Branch` : quantos desvios (bifurcações como `if/else` ) existem.
- `BrPart` : quantos desvios foram executados apenas parcialmente (ex: entrou no `if` , mas nunca no `else`).

### `coverage html`

O comando `coverage html` gera um relatório visual e interativo a partir dos dados de cobertura de testes, exibindo os dados dos último comandos e para todo o projeto, tornando mais fácil identificar quais partes do código não foram testadas. Ele cria automaticamente uma pasta chamada `htmlcov` no diretório do projeto, onde o arquivo principal `index.html` é responsável por fornecer a interface visual da cobertura de testes. Ao abrir esse arquivo no navegador, você encontrará seu código-fonte colorido de acordo com seu status de execução durante os testes:

- Linhas em verde indicam que foram cobertas
- Linhas em vermelho que nunca foram executadas
- Linhas em amarelo (se usado `--cov-branch`) que foram testadas, mas não em todos os caminhos possíveis, facilitando a identificação de áreas que precisam de mais testes.