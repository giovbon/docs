---
icon: simple/githubactions
hide:
  - navigation
---

# Intro Github Actions

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../zSLIDES/07-intro-github-actions.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? abstract "Referências"
    - [Documentação do GitHub Actions - Documentos do GitHub](https://docs.github.com/pt/actions)

## Act

??? abstract "Referências"
    - [Introduction - act - User Guide | Manual | Docs | Documentation](https://nektosact.com/)
    - [nektos/act: Run your GitHub Actions locally 🚀](https://github.com/nektos/act)
    - [How to Run GitHub Actions Locally Using the act CLI Tool](https://www.freecodecamp.org/news/how-to-run-github-actions-locally/)

Pode-se entender o GitHub Actions como um motor flexível para automatizar diversas tarefas relacionadas ao desenvolvimento de software. Seu principal objetivo é a automação geral de fluxos de trabalho dentro do ecossistema do GitHub. O act foi feito para imitar o comportamento do GitHub.

### Preparação do ambiente

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

### Comandos

```bash
# lista todos os workflows e jobs detectados no seu projeto
act -l
# checa se o arquivo YAML está com a sintaxe correta
act -n
# executará todos os jobs com evento de push
act
# roda os workflows por evento
act pull_request
# roda workflow inteiro específico, pode estar em qualquer pasta
act -W .github/workflows/meu-teste.yml
# filtra a saída do terminal para exibir apenas o que o script imprimiu
act -W ./.github/workflows/meu-teste.yml | grep "|" 
# executa workflow definindo qual imagem Docker deve ser usada para rodar os jobs
act -W ./hello.yml -P ubuntu-latest=node:slim
# roda um job específico
act -j [ID]
```

### Testando

No GitHub, quando você faz um git push, o servidor olha para a pasta `.github/workflows/` à procura de workflows (arquivos `.yml` ou `.yaml`) e dispara todos os arquivos que tenham `on: push` configurado. O act imita esse comportamento, assim para executar seu primeiro script abaixo crie uma pasta, inicialize o repositório git ali e dentro de `.github/workflows/` coloque o arquivo `hello.yml` com esse conteúdo:

```yaml
name: Hello World

on:
  workflow_dispatch:

jobs:
  say-hello-inline-bash:
    runs-on: ubuntu-24.04
    steps: # (3)!
      - run: echo "Hello GitHub Action Workflow!"
```

Após isso rode: `act -l` para ver se esse workflow aparece, depois disso: `act workflow_dispatch -q`. A mensagem de "Hello" deverá aparecer no terminal.

