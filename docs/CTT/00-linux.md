---
icon: simple/linux
hide:
  - navigation
---

# Linux :simple-linux:

## WSL

Instalando Ubuntu no Windows via WSL:

No CMD lance o comando: `wsl --install -d Ubuntu` 
Depois de instalar o ubuntu e definir usuário e senha: `sudo apt update && sudo apt upgrade -y`  
Ele vai instalar o ubuntu, depois vai criar um ícone pra acessar o terminal sempre que precisar.

- Os arquivos do windows são acessíveis em `/mnt/c`
- Os arquivos do linux ficam acessíveis em `\\wsl$` colocando na barra de endereços do explorador de arquivos.