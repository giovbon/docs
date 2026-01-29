---
icon: simple/githubactions
hide:
  - navigation
---

# Hello World

```yaml
name: Hello World # rótulo do workflow

on: #define gatilho
  workflow_dispatch: # roda manualmente, com botão "Run workflow"

jobs:
  say-hello-inline-bash: # id do job
    runs-on: ubuntu-24.04 # define runner
    steps:
      - run: echo "Hello GitHub Action Workflow!"
        # executa comandos de linha de comando (shell).
```