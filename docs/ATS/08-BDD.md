---
hide:
  - navigation
---

<div class="page-unlock" data-unlock-date="2026-04-09" data-unlock-password="1q2w3e"></div>

# BDD

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../zSLIDES/10-bdd.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? abstract "Referências"
    - [Pytest-BDD: the BDD framework for pytest — pytest-bdd 8.1.0 documentation](https://pytest-bdd.readthedocs.io/en/stable/)

## Exemplos

Exemplo simples:

```gherkin title="soma.feature"
# language: pt
Funcionalidade: Matemática
  Cenário: Soma exata
    Dado que o valor inicial é zero
    Quando eu somo 2 e 2
    Então o total deve ser 4
```

```py title="test_soma.py"
from pytest_bdd import scenarios, given, when, then

# 1. Carrega o arquivo
scenarios('soma.feature')

# 2. DADO
@given("que o valor inicial é zero", target_fixture="estado")
def valor_inicial():
    # Passamos um dicionário simples com o valor 0
    return {"total": 0}

# 3. QUANDO
@when("eu somo 2 e 2")
def somar(estado):
    # Fazemos a soma diretamente aqui
    estado["total"] = 2 + 2

# 4. ENTÃO
@then("o total deve ser 4")
def verificar_resultado(estado):
    # Validamos se deu 4
    assert estado["total"] == 4
```

Execute com `pytest test_soma.py`. Quando você executa `test_soma.py`, o pytest-bdd faz o seguinte, passo a passo:

1. Lê `scenarios('soma.feature')` e carrega o arquivo `soma.feature`.
2. Encontra o cabeçalho `# language: pt` e usa o dicionário interno para mapear `Dado`→`given`, `Quando`→`when`, `Então`→`then`.
3. Percorre o cenário linha a linha, extraindo as strings das etapas:
   - `que o valor inicial é zero`
   - `eu somo 2 e 2`
   - `o total deve ser 4`
4. Registra as funções Python decoradas (`@given`, `@when`, `@then`) e faz correspondência exata das strings das etapas com os decoradores do código.
5. Ao casar cada texto exatamente, executa as funções na ordem das etapas:
   - Chama `valor_inicial()` (`@given`) que retorna `{"total": 0}` e o disponibiliza como fixture `estado`.
   - Chama `somar(estado)` (`@when`) que atualiza `estado["total"] = 4`.
   - Chama `verificar_resultado(estado)` (`@then`) que executa `assert estado["total"] == 4`.
6. Se todas as asserções passarem, o teste é considerado bem-sucedido; se a correspondência de strings falhar ou a asserção falhar, o pytest reporta erro.

Exemplo mais complexo:

<div class="code-explorer" data-src="../zCODE/pytest-bdd-saque.txt" ></div>

## Exercício

[:lucide-file-text: ATS10 - BDD](#){ .md-button .md-button--primary onclick="gerarPDFTypst('../TYP/ATS10.typ'); return false;" }

[:lucide-send: Entregar Atividade](https://forms.gle/XtxuC3MNMnuaU1v66){ .md-button target="_blank" }