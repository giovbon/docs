---
icon: simple/python
---

# Python :simple-python:

## 🪐 JupyterLite

Execute Python diretamente no navegador, sem instalar nada.

<a href="../../jupyterlite/lab/index.html?path=exemplo.ipynb" target="_blank">
    :simple-jupyter: Abrir Notebook de Exemplo
</a>

## Ambientes

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

??? abstract "Referências"
    - [Installing and managing Python | uv](https://docs.astral.sh/uv/guides/install-python/)

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

1. Quando você adiciona uma biblioteca (como o `requests`), o `uv` já baixa a versão correta do Python (se necessário), cria um ambiente virtual (pasta `.venv`) e instala o pacote instantaneamente.

``` bash title="Rodar o pytest"
uv run pytest
```

| Comando | Descrição |
| :--- | :--- |
| `uv init [nome]` | Cria a estrutura básica do projeto (`pyproject.toml`, `hello.py`, etc.), mas não cria o ambiente virtual (`.venv`) nem o `uv.lock` de imediato. |
| `uv add <pacote>` | Cria o ambiente virtual (se não existir), instala o pacote, anota no `pyproject.toml` e gera o arquivo de trava `uv.lock`. |
| `uv add --dev <pacote>` | Faz o mesmo que o comando acima, mas separa o pacote como dependência de desenvolvimento (ex: `pytest`, linters). |
| `uv remove <pacote>` | Desinstala o pacote do ambiente virtual e o remove do `pyproject.toml` e do `uv.lock`. |
| `uv sync` | Lê o seu `pyproject.toml`/`uv.lock` e instala tudo de uma vez. Ótimo para quando você acaba de clonar o projeto de outra pessoa. |
| `uv run <arquivo/comando>` | Roda um arquivo (`main.py`) ou um comando (`pytest`) usando o ambiente virtual do projeto (criando o `.venv` na hora, se precisar). |
| `uv lock` | Lê o `pyproject.toml` e gera/atualiza o `uv.lock` travando as versões exatas de cada dependência, para garantir que o projeto rode igual em qualquer máquina. |
| `uv lock --upgrade` | Atualiza as versões travadas no `uv.lock` para as mais recentes que forem permitidas pelo seu `pyproject.toml`. |


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