---
icon: simple/githubactions
hide:
  - navigation
---

# Hello World

``` yaml
name: Hello World # (1)!

on: # (2)!
  workflow_dispatch: # (3)!

jobs:
  say-hello-inline-bash: # (4)!
    runs-on: ubuntu-24.04 # (5)!
    steps:
      - run: echo "Hello GitHub Action Workflow!" # (6)!
```

1. Rótulo do workflow
2. Define gatilho
3. Gatilho de rodar manualmente, com botão "Run workflow"
4. id do job
5. Define runner
6. Executa comandos de linha de comando (shell)