---
icon: simple/githubactions
hide:
  - navigation
tags:
  - githubactions
---

# Contextos

``` yaml
name: Aprendendo Contextos

on: 
  push:
  workflow_dispatch:

env:
  NIVEL_ESTUDO: "Iniciante"

jobs:
  inspecao:
    runs-on: ubuntu-latest
    steps:
      - name: Identificação
        run: | 
          echo "Iniciado por ${{ github.actor }} no branch ${{ github.ref }}"
          echo "Rodando em ${{ runner.os }} arquitetura ${{ runner.arch }} e na máquina ${{ runner.name }}"

  exibicao:
    runs-on: ubuntu-latest
    needs: [inspecao]
    if: ${{ needs.inspecao.result == 'success' }}
    steps:
      - name: Exibindo Dados Local (Secrets e Vars)
        env:
          ENV_LOCAL: "📌📌📌"
          CHAVE_PRIVADA: ${{ secrets.API_KEY }}
          URL_PUBLICA: ${{ vars.SERVER_URL }}
        run: |
          echo "--- DADOS RECUPERADOS ---"
          echo "Variável de Ambiente (env): ${{ env.NIVEL_ESTUDO }}"
          echo "Arquivo .vars (SERVER_URL): $URL_PUBLICA"
          echo "Arquivo .secrets (API_KEY): $CHAVE_PRIVADA"
          echo "ENV Local (ENV_LOCAL): $ENV_LOCAL"
          echo "-------------------------"
```