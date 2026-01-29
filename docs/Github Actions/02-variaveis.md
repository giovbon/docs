---
icon: simple/githubactions
hide:
  - navigation
---

# Variáveis

```yaml
name: Aprendendo Variaveis
# Gatilho manual para facilitar o teste com o 'act'
on: workflow_dispatch

# 1. NÍVEL WORKFLOW (Global: Todo o prédio vê)
env:
  VAR_GLOBAL: "GLOBAL 🌎"

jobs:
  backend:
    name: JOB1
    runs-on: ubuntu-latest

    env:
      VAR_JOB: "JOB 💼"

    steps:
      - name: "Passo 1"
        env:
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