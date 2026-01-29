---
icon: simple/githubactions
hide:
  - navigation
---

# Artefatos

```yaml
name: Aprendendo Artefatos

on: 
  push:
  workflow_dispatch:

jobs:
  # Job que gera o arquivo
  gerador:
    name: Produzir Arquivo
    runs-on: ubuntu-latest
    steps:
      - name: Criar relatório de teste
        run: echo "Sucesso! Artefato gerado em $(date)" > relatorio.txt

      - name: Salvar Artefato
        uses: actions/upload-artifact@v4 # ferramenta oficial para enviar arquivos do executor atual para o armazenamento seguro do GitHub
        with:
          name: meu-pacote        # Nome identificador do artefato, será arquivo compactado
          path: relatorio.txt      # O arquivo que será criado e enviado

  # Job que usa o arquivo
  consumidor:
    name: Ler Arquivo
    runs-on: ubuntu-latest
    needs: [gerador] # Obrigatório para o arquivo existir
    steps:
      - name: Recuperar Artefato
        uses: actions/download-artifact@v4 # ferramenta oficial para recuperar esses arquivos do armazenamento e colocá-los dentro de um novo executor.
        with:
          name: meu-pacote        # O mesmo nome usado no upload

      - name: Exibir Conteúdo
        run: cat relatorio.txt
```