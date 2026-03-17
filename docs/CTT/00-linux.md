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
distrobox create --name debian1 --image debian:latest
distrobox enter debian1
apt install chromium
distrobox-export --app chromium
```

nano ~/.distroboxrc
container_manager="podman"