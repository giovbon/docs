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
# configurar docker
sudo apt install curl docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
newgrp docker
# intalar act
curl -O https://raw.githubusercontent.com/nektos/act/master/install.sh
sudo bash install.sh
sudo mv ./bin/act /usr/local/bin/act
act --version
```

Após isso, crie nova pasta, inicialize repositório crie o arquivo `.github/workflows/hello.yml` dentro dessa estrutura de pastas e coloque esse conteúdo dentro do arquivo:

```yaml
name: Hello World

on:
  workflow_dispatch:

jobs:
  say-hello-inline-bash:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Hello GitHub Action Workflow!"
```

No GitHub, quando você faz um git push, o servidor olha para a pasta `.github/workflows/` à procura de workflows (arquivos `.yml` ou `.yaml`) e dispara todos os arquivos que tenham `on: push` configurado. O act imita esse comportamento.

Agora rode: `act -l` para ver se esse workflow aparece, depois disso: `act workflow_dispatch -q` para executar.

Ao tentar rodar esse primeiro workflow com `act`, aparecerá o menu de escolha:

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

Depois disso rode novamente o comando: `act workflow_dispatch -q` para executar. Pode ser que demore um pouco pois o programa baixará a imagem docker correspondente para preparar o ambiente.

Depois de tudo a mensagem de "Hello GitHub Action Workflow!" deverá aparecer no terminal.

### Principais Comandos

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

??? example ":lucide-square-terminal: Instalando o act e executando primeiro workflow"

    <div class="asciinema" data-src="../../zASC/13-act-install-hello.cast" data-speed="2" data-idle-time-limit="4" data-theme="tango"></div> 