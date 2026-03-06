---
icon: simple/python
---

# Python :simple-python:

Criação de ambiente:

=== "Linux (Ubuntu/Debian)"

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

=== "Windows"

    ```bash
    python -m venv .venv
    .venv\Scripts\activate
    ```

## `uv` :simple-uv:

O `uv` é uma ferramenta moderna concebida para ser um utilitário "tudo-em-um" no ecossistema Python. Ele unifica e substitui o uso de várias ferramentas conhecidas que os desenvolvedores costumam usar separadamente, como `pip`, `pip-tools`, `pipx`, `poetry`, `pyenv`, `twine` e `virtualenv`.

Instalação:

=== "Linux (Ubuntu/Debian)"

    ```bash
    curl -LsSf https://astral.sh/uv/install.sh | sh
    ```

=== "Windows"

    ```bash
    powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
    ```

``` bash title="Iniciar um projeto"
uv init meu_projeto
cd meu_projeto
```

``` bash title="Adicionar biblioteca"
uv add pytest # (1)!
```

``` bash title="Rodar o pytest"
uv run pytest
```

1. Quando você adiciona uma biblioteca (como o `requests`), o `uv` já baixa a versão correta do Python (se necessário), cria um ambiente virtual (pasta `.venv`) e instala o pacote instantaneamente.

### `uvx`

O `uvx`, que acompanha o uv, é uma ferramenta eficaz para executar o pytest de forma rápida e isolada, semelhante ao `npx` (Node.js) e `pipx` (Python). Ele cria um ambiente virtual temporário de maneira rápida, baixa pacotes necessários e executa comandos, tudo isso sem afetar o ambiente global ou exigir configuração manual de um `.venv`.

**Execução Básica**: Para rodar testes no diretório atual com a configuração padrão, use:
```bash
uvx pytest
```

**Passando Argumentos e Diretórios**: Para passar argumentos ao `pytest`, siga o comando com os parâmetros desejados:
```bash
uvx pytest tests/ -v -s
```

**Usando Plugins**: Para utilizar plugins como `pytest-cov`, use a flag `--with`:
```bash
uvx --with pytest-cov pytest --cov=meu_projeto tests/ # (1)!
```

1. Você pode encadear múltiplos plugins com várias flags `--with`.

**Testando com Versões Específicas do Python**: Para testar em uma versão específica do Python:
```bash
uvx --python 3.12 pytest tests/
```