---
icon: simple/githubactions
hide:
  - navigation
tags:
  - githubActions
---

# Variáveis

```yaml hl_lines="5 13 18"
name: Aprendendo Variaveis
on: workflow_dispatch

env: # (1)!
  VAR_GLOBAL: "GLOBAL 🌎"

jobs:
  backend:
    name: JOB1
    runs-on: ubuntu-latest

    env: # (2)!
      VAR_JOB: "JOB 💼"

    steps:
      - name: "Passo 1"
        env: # (3)!
          VAR_STEP: "STEP 👣"
        run: |
          echo "Var Global: $VAR_GLOBAL"
          echo "Var Job: $VAR_JOB"
          echo "Var Step: $VAR_STEP"

      - name: "Passo 2"
        run: |
          echo "Ainda vejo GLOBAL: $VAR_GLOBAL"
          echo "Mas não vejo mais VAR_STEP: '${VAR_STEP:-NAO_ENCONTRADO}'"

  seguranca:
    name: JOB2
    runs-on: ubuntu-latest
    needs: backend

    steps:
      - name: "Passo 3"
        run: |
          echo "Aqui no JOB2 eu ainda vejo a VAR_GLOBAL é $VAR_GLOBAL"
          echo "Mas eu não faço ideia de qual é a VAR_JOB do outro Job: '${VAR_JOB:-NAO_ENCONTRADO}'"
```

1. Variáveis de contexto global
2. Variáveis de contexto do job
3. Variáveis de contexto do step