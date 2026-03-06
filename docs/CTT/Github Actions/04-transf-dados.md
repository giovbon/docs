---
icon: simple/githubactions
hide:
  - navigation
tags:
  - githubActions
---

# Transferência de Dados

``` yaml
name: Transferencia de Dados entre Jobs

on: workflow_dispatch

jobs:
  job_produtor: # (1)!
    runs-on: ubuntu-latest
    outputs:
      meu_dado_exportado: ${{ steps.gerar_dados.outputs.VALOR_SAIDA }} # (2)!

    steps:
      - name: Gerar e persistir dados
        id: gerar_dados
        run: |
          # Declare variáveis locais
          DADO_SAIDA="🛸🛸🛸"
          DADO_INTERNO="🚀🚀🚀"

          echo "VALOR_SAIDA=${DADO_SAIDA}" >> "$GITHUB_OUTPUT"
          echo "VAR_INTERNA=${DADO_INTERNO}" >> "$GITHUB_ENV"

      - name: Validar persistência interna
        run: |
          echo "Output do STEP anterior (DADO_SAIDA): ${{ steps.gerar_dados.outputs.VALOR_SAIDA }}"
          echo "Variável de ambiente deste job (DADO_INTERNO): $VAR_INTERNA"

  job_consumidor: # (3)!
    runs-on: ubuntu-latest
    needs: job_produtor # (4)!
    steps:
      - name: Acessar dados externos
        run: |
          echo "Dado vindo do job_produtor (DADO_SAIDA): ${{ needs.job_produtor.outputs.meu_dado_exportado }}"
          echo "Tentativa de ler ENV interna: ${VAR_INTERNA:-NAO_DEFINIDA}"
```

1. Job responsável por gerar dados
2. Exporta o valor da saída do step 'gerar_dados'
3. Job que consome os dados gerados por 'job_produtor'
4. Declara dependência do 'job_produtor'