---
icon: simple/linux
hide:
  - navigation
---

# Linux :simple-linux:

## WSL

Instalando Ubuntu no Windows via WSL:

No CMD lance o comando: `wsl --install -d Ubuntu-22.04`. Vai instalar o ubuntu, depois vai criar um ícone pra acessar o terminal sempre que precisar. Depois de instalar o ubuntu e definir usuário e senha, dê o comando para atualizar o sistema: `sudo apt update && sudo apt upgrade -y`  

- Os arquivos do windows são acessíveis em `/mnt/c`
- Os arquivos do linux ficam acessíveis em `\\wsl$`, colocando na barra de endereços do explorador de arquivos.

Deletando máquinas:
- listar máquinas `wsl --list --verbose`
- deletar máquina `wsl --unregister NomeDaDistro`

## Distrobox :simple-distrobox:

```bash
sudo apt install distrobox

distrobox create --name debian1 --image debian:latest #(1)!
distrobox enter debian1 #(2)!
apt install chromium #(3)!
distrobox-export --app chromium #(4)!
```

1. Criar ambiente debian
2. Entrar no ambiente
3. Instalar aplicativo dentro do ambiente
4. Tornar o aplicativo instalado disponível no ambiente hospedeiro (haverá ícone para acesso)

Definir podman como motor de emulação:

```bash
nano ~/.distroboxrc
container_manager="podman"
```