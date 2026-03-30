---
icon: simple/githubactions
hide:
  - navigation
---

# Workflows

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../zSLIDES/08-workflows.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? abstract "Referências"
    - [courses.devopsdirective.com/github-actions-beginner-to-pro](https://courses.devopsdirective.com/github-actions-beginner-to-pro)
    - [Documentação do GitHub Actions - Documentos do GitHub](https://docs.github.com/pt/actions)

!!! danger "Alerta"

    Todos workflows são criados usando a linguagem YAML. Tenha em mente que a precisão na indentação é crucial. Um erro simples, como um espaço a mais ou a falta dele, pode fazer com que seu workflow falhe sem explicações claras.

No GitHub, quando você faz um `git push`, o servidor olha para a pasta `.github/workflows/` à procura de workflows (arquivos `.yml` ou `.yaml`) e dispara todos os arquivos que tenham `on: push` configurado. 
O act imita esse comportamento, de forma que para executar os workflows você deve criar uma pasta, inicializar um repo com `git init`, criar as pastas `.github/workflows` e dentro de `workflows` colocar seus workflows como arquivos `.yml`

Elementos básicos de um workflow, a estrutura mínima para um workflow funcionar:

``` yaml
name: Hello World # (1)!

on: # (2)!
  workflow_dispatch:

jobs:
  say-hello-inline-bash: # (4)!
    runs-on: ubuntu-24.04 # (5)!
    steps: # (3)!
      - run: echo "Hello GitHub Action Workflow!" # (6)!
```

1. Workflow é o processo automatizado como um todo, identificado por esse rótulo ou nome.
2. Define o evento que faz o workflow rodar. No caso, foi configurado um gatilho manual (workflow_dispatch), que permite iniciá-lo clicando em um botão "Run workflow".
4. Job é um bloco de trabalho ou tarefa específica dentro do workflow, identificado por esse ID único (`say-hello-inline-bash`)
5. Define runner. Runner é a máquina ou ambiente virtual onde o job será executado (ex: um servidor `ubuntu-24.04`).
3. Steps são as instruções sequenciais executadas dentro do job.
6. Executa comando de linha de comando (shell).

[:lucide-arrow-big-down: Baixar Exercício CTT8](#){ .md-button .md-button--primary onclick="gerarPDFTypst('../TYP/CTT08.typ'); return false;" }