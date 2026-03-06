---
icon: simple/fastapi
hide:
  - navigation
---

# Configuração inicial :simple-poetry: :simple-fastapi:

??? abstract "Referências"

    - [Documentation Poetry - Python dependency management and packaging made easy](https://python-poetry.org/docs/)

=== "Linux (Ubuntu/Debian)"

    ```bash
    sudo apt install pipx -y
    pipx ensurepath 
    ```

=== "Windows"

    ```bash
    python -m pip install --user pipx
    python -m pipx ensurepath
    ```

O Poetry é uma ferramenta de gerenciamento de dependências e empacotamento para projetos Python, que usa um arquivo `pyproject.toml` para definir requisitos e metadados. Ele automatiza tarefas como instalação e atualização de pacotes, tornando a gestão de ambientes e projetos mais eficiente e organizada.

```bash title="Instalar Poetry"
pipx install poetry
pipx inject poetry poetry-plugin-shell  # (1)!
```

1. Adiciona plugin `poetry-plugin-shell` ao Poetry já instalado, permitindo o uso de *funcionalidades adicionais relacionadas ao shell* na sua configuração do Poetry.

```bash title="Criação de Projetos"
poetry new --flat fast_zero # (1)!
cd fast_zero
```

1. Sobre `flat` e `src` [aqui](https://packaging.python.org/en/latest/discussions/src-layout-vs-flat-layout/).

Criará uma estrutura de arquivos e pastas como essa:

```
.
fast_zero
  ├── README.md
  ├── fast_zero
  │   └── __init__.py
  ├── pyproject.toml
  └── tests
      └── __init__.py
```

```bash title="Instalar FastAPI"
poetry install # (1)!
poetry add 'fastapi[standard]' # (2)!
```

1. Lê o arquivo `pyproject.toml` e instala todas as dependências listadas nele dentro de um ambiente virtual isolado. Se for a primeira vez, ele cria o arquivo `poetry.lock` para travar as versões exatas; se o arquivo já existir, ele instala exatamente o que está travado lá.
2. Adiciona o pacote FastAPI ao seu projeto. O sufixo `[standard]` inclui dependências extras recomendadas (como o servidor Uvicorn). O Poetry baixa o pacote, atualiza o arquivo de configurações (`pyproject.toml`) e o arquivo de trava (`poetry.lock`) automaticamente.

```py title="app.py Base"
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {'message': 'Olá Mundo!'}
```

```bash title="Rodar FastAPI"
poetry shell
fastapi dev app.py # (1)!
```

1. Ou `fastapi dev app.py --port 8001` para escolher a porta onde vai rodar (o padrão é `8000`)

Vai aparecer algo assim no terminal:

``` hl_lines="14 15"
   FastAPI   Starting development server 🚀
 
             Searching for package file structure from directories with __init__.py files
             Importing from /home/giobon/distrobox/ubuntu-home/CODE/FastAPI/fast_zero
 
    module   🐍 app.py
 
      code   Importing the FastAPI app object from the module with the following code:
 
             from app import app
 
       app   Using import string: app:app
 
    server   Server started at http://127.0.0.1:8000
    server   Documentation at http://127.0.0.1:8000/docs
 
       tip   Running in development mode, for production use: fastapi run
 
             Logs:
 
      INFO   Will watch for changes in these directories: ['/home/giobon/distrobox/ubuntu-home/CODE/FastAPI/fast_zero']
     ERROR   [Errno 98] Address already in use
```
Onde:

- `http://127.0.0.1:8000` é o endpoint `/` da API
- `http://127.0.0.1:8000/docs` é a documentação Swagger dessa API