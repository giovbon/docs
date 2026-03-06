---
icon: simple/linux
hide:
  - navigation
---

# Linux

## Configuração de Ambiente

### WSL

Instalando Ubuntu no Windows via WSL:

No CMD lance o comando: `wsl --install -d Ubuntu` 
Depois de instalar o ubuntu e definir usuário e senha: `sudo apt update && sudo apt upgrade -y`  
Ele vai instalar o ubuntu, depois vai criar um ícone pra acessar o terminal sempre que precisar.

- Os arquivos do windows são acessíveis em `/mnt/c`
- Os arquivos do linux ficam acessíveis em `\\wsl$` colocando na barra de endereços do explorador de arquivos.

### Act

Para emular workflows do github actions no ubuntu.

Instalação no ubuntu:

```bash
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

```bash
Please choose the default image you want to use with act:
  - Large size image: ca. 17GB download + 53.1GB storage, you will need 75GB of free disk space, snapshots of GitHub Hosted Runners without snap and pulled docker images
  - Medium size image: ~500MB, includes only necessary tools to bootstrap actions and aims to be compatible with most actions
  - Micro size image: <200MB, contains only NodeJS required to bootstrap actions, doesn't work with all actions

Default image and other options can be changed manually in /home/giovani/.config/act/actrc (please refer to https://nektosact.com/usage/index.html?highlight=configur#configuration-file for additional information about file structure)  [Use arrows to move, type to filter, ? for more help]
  Large
> Medium
  Micro
```

Escolha `Medium` e ++Enter++