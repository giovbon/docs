---
icon: simple/githubactions
hide:
  - navigation
---

# Transferência de Dados

```yaml
name: Transferencia de Dados entre Jobs

on: workflow_dispatch

jobs:
  job_produtor:  # Job responsável por gerar dados
    runs-on: ubuntu-latest
    outputs:
      meu_dado_exportado: ${{ steps.gerar_dados.outputs.VALOR_SAIDA }}  # Exporta o valor da saída do step 'gerar_dados'

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

  job_consumidor:  # Job que consome os dados gerados por 'job_produtor'
    runs-on: ubuntu-latest
    needs: job_produtor  # Declara dependência do job_produtor
    steps:
      - name: Acessar dados externos
        run: |
          echo "Dado vindo do job_produtor (DADO_SAIDA): ${{ needs.job_produtor.outputs.meu_dado_exportado }}"
          echo "Tentativa de ler ENV interna: ${VAR_INTERNA:-NAO_DEFINIDA}"
```