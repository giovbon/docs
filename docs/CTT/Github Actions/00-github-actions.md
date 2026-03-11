---
icon: simple/githubactions
hide:
  - navigation
---

# Github Actions :simple-githubactions:

??? abstract "Referências"
    - [courses.devopsdirective.com/github-actions-beginner-to-pro](https://courses.devopsdirective.com/github-actions-beginner-to-pro)

Pode-se entender o GitHub Actions como um motor flexível para automatizar diversas tarefas relacionadas ao desenvolvimento de software. Seu principal objetivo é a automação geral de fluxos de trabalho dentro do ecossistema do GitHub.

## Act

??? abstract "Referências"
    - [Introduction - act - User Guide | Manual | Docs | Documentation](https://nektosact.com/)
    - [nektos/act: Run your GitHub Actions locally 🚀](https://github.com/nektos/act)
    - [How to Run GitHub Actions Locally Using the act CLI Tool](https://www.freecodecamp.org/news/how-to-run-github-actions-locally/)

Para emular workflows do github actions no ubuntu.

Instalação no ubuntu:

``` bash
cd
sudo apt install curl docker.io
sudo systemctl start docker
sudo systemctl enable docker
curl https://raw.githubusercontent.com/nektos/act/master/install.sh | sudo bash
sudo mv ./bin/act /usr/local/bin/act
act --version
sudo usermod -aG docker $USER
newgrp docker
```

Mensagem ao tentar rodar algum workflow com `act`:

```
Please choose the default image you want to use with act:
  - Large size image: ca. 17GB download + 53.1GB storage, you will need 75GB of free disk space, snapshots of GitHub Hosted Runners without snap and pulled docker images
  - Medium size image: ~500MB, includes only necessary tools to bootstrap actions and aims to be compatible with most actions
  - Micro size image: <200MB, contains only NodeJS required to bootstrap actions, doesn't work with all actions

Default image and other options can be changed manually in /home/giovani/.config/act/actrc (please refer to https://nektosact.com/usage/index.html?highlight=configur#configuration-file for additional information about file structure)  [Use arrows to move, type to filter, ? for more help]
  Large
> Medium
  Micro
```
Esse texto é a tela de configuração inicial da ferramenta `act`, pedindo para você escolher o tamanho do ambiente virtual (imagem Docker) padrão que executará os fluxos de trabalho. Você tem três opções que equilibram consumo de disco e compatibilidade: a **Large** (gigante e idêntica aos servidores do GitHub), a **Medium** (cerca de 500MB, compatível com a maioria das ações e que está atualmente selecionada) e a **Micro** (muito leve, mas restrita). O aviso final apenas informa que essa escolha poderá ser alterada futuramente no seu arquivo de configuração `actrc`.

Escolha `Medium` e Enter.

## Workflows

!!! danger "Alerta"

    Todos workflows são criados usando a linguagem YAML. Tenha em mente que a precisão na indentação é crucial. Um erro simples, como um espaço a mais ou a falta dele, pode fazer com que seu workflow falhe sem explicações claras.

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

## Escopos

No GitHub Actions, os escopos das variáveis de ambiente (`env`) definem três níveis de visibilidade.

```yaml hl_lines="4-5 12-13 17-18"
name: Aprendendo escopos de variaveis
on: workflow_dispatch

env: # (1)!
  VAR_GLOBAL: "GLOBAL 🌎"

jobs:
  job1:
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

  job2:
    name: JOB2
    runs-on: ubuntu-latest
    needs: backend

    steps:
      - name: "Passo 3"
        run: |
          echo "Aqui no JOB2 eu ainda vejo a VAR_GLOBAL é $VAR_GLOBAL"
          echo "Mas eu não faço ideia de qual é a VAR_JOB do outro Job: '${VAR_JOB:-NAO_ENCONTRADO}'"
```

1. Variáveis de contexto global. O **contexto global** (ou workflow) é definido na raiz do arquivo, permitindo que qualquer *job* ou *step* dentro do workflow acesse essas variáveis.
2. Variáveis de contexto do job. O **contexto do job** refere-se às variáveis definidas dentro de um *job* específico. Nesse caso, apenas os passos desse *job* podem acessá-las.
3. Variáveis de contexto do step. No contexto do step (ou passo), as variáveis são definidas dentro de um único passo. Apenas esse passo pode acessá-las, e nem mesmo o passo seguinte dentro do mesmo *job* consegue.

## `needs`

O `needs` no GitHub Actions é usado para estabelecer **dependências entre jobs** e controlar a ordem de execução, uma vez que, por padrão, todos os jobs são executados em paralelo. Quando um job é designado com `needs`, ele deve aguardar a conclusão bem-sucedida de outros jobs antes de iniciar. O `needs` transforma a execução paralela padrão dos jobs em um fluxo estruturado (sequencial), onde cada passo depende do anterior.

```yaml hl_lines="17 24"
name: Usando needs
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

## Integração Contínua

Integração Contínua ou Continuous Integration (CI) é a prática de automatizar a verificação do código sempre que uma nova alteração é enviada para o repositório, utilizando o gatilho` on: [push]`. Essa abordagem aumenta a segurança no desenvolvimento em equipe, permitindo que apenas o código que passa nas validações seja aceito.

``` yaml
name: Teste de API

on: [push]

jobs:
  verificar-api:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Python # (1)!
        uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip' # (2)!

      - name: Instalar dependências # (3)!
        run: |
          python -m pip install --upgrade pip
          # Com o cache ativo, este comando será instantâneo se o requirements não mudou
          pip install fastapi[standard] pytest httpx
          if [ -f requirements.txt ]; then pip install -r requirements.txt; fi

      - name: Rodar Testes # (4)!
        run: pytest test_main.py
```

1. Prepara o ambiente ao baixar o código e instala a linguagem (Python). 
2. Ativa o cache para o gerenciador `pip`
3. Constrói a aplicação instalando as dependências necessárias, como o framework FastAPI.
4. Valida o código ao executar testes automatizados com `pytest`, assegurando que as novas alterações não comprometam o funcionamento do código existente.