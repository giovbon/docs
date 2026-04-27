---
icon: simple/githubactions
hide:
  - navigation
---

# Artefatos e gatilhos

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../zSLIDES/11-artefatos-transf.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

## Artefatos

```yaml title="artefatos.yml"
name: Aprendendo Artefatos

on: 
  push:
  workflow_dispatch:

jobs:
  gerador: # (1)!
    name: Produzir Arquivo
    runs-on: ubuntu-latest
    steps:
      - name: Criar relatório de teste
        run: echo "Sucesso! Artefato gerado em $(date)" > relatorio.txt

      - name: Salvar Artefato
        uses: actions/upload-artifact@v4 # (3)!
        with:
          name: meu-pacote # (4)!
          path: relatorio.txt # (5)!

  consumidor: # (2)!
    name: Ler Arquivo
    runs-on: ubuntu-latest
    needs: [gerador] # (6)!
    steps:
      - name: Recuperar Artefato
        uses: actions/download-artifact@v4 # (7)!
        with:
          name: meu-pacote # (8)!

      - name: Exibir Conteúdo
        run: cat relatorio.txt
```

1. Job que gera o arquivo
2. Job que usa o arquivo
3. Ferramenta oficial para enviar arquivos do executor atual para o armazenamento seguro do GitHub
4. Nome identificador do artefato, será um arquivo compactado
5. O arquivo que será criado e enviado
6. Obrigatório para o arquivo existir
7. Ferramenta oficial para recuperar esses arquivos do armazenamento e colocá-los dentro de um novo executor
8. O mesmo nome usado no upload

## Exercício

[:lucide-file-text: CTT11 - artefatos e gatilhos](#){ .md-button .md-button--primary onclick="gerarPDFTypst('../TYP/CTT11.typ'); return false;" }

[:lucide-send: Entregar Atividade](https://forms.gle/XtxuC3MNMnuaU1v66){ .md-button target="_blank" }