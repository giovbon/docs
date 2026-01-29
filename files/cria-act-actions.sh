#!/bin/bash

git init
mkdir cache-act
mkdir -p .github/workflows/

cat <<'EOF' > main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"status": "online", "mensagem": "API funcionando!"}
EOF


cat <<'EOF' > test_main.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"status": "online", "mensagem": "API funcionando!"}
EOF

cat <<'EOF' > requirements.txt
fastapi[standard]
pytest
httpx
EOF

cat <<'EOF' > .github/workflows/workflow-actions.yml
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
EOF

git add .
git commit -m "primeiro commit"
