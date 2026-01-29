---
icon: simple/githubactions
hide:
  - navigation
---

# Actions

```yaml
name: Testar FastAPI

on: [push]

jobs:
  verificar-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Python
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip' # <--- Ativa o cache para o gerenciador pip

      - name: Instalar dependências
        run: |
          python -m pip install --upgrade pip
          # Com o cache ativo, este comando será instantâneo se o requirements não mudou
          pip install fastapi[standard] pytest httpx
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Rodar Testes
        run: pytest test_main.py
```

[Baixar Arquivo](../../files/cria-act-actions.sh)