---
icon: simple/githubactions
hide:
  - navigation
tags:
  - githubactions
---

# Dependências

```yaml hl_lines="17 24"

on: workflow_dispatch

jobs:
  job-1:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Um job consiste em"
      - run: echo "uma ou mais etapas"
      - run: echo "que são executadas sequencialmente"
      - run: echo "dentro do mesmo ambiente de computação"
  job-2:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Vários jobs podem rodar em paralelo"
  job-3:
    runs-on: ubuntu-latest
    needs:
      - job-1
      - job-2
    steps:
      - run: echo "Eles também podem depender uns dos outros..."
  job-4:
    runs-on: ubuntu-latest
    needs:
      - job-2
      - job-3
    steps:
      - run: echo "...para formar um grafo direcionado acíclico (DAG)"
```