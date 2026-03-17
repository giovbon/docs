---
icon: simple/github
hide:
  - navigation
---

# Ferramentas de Colaboração no Github

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../SLIDES/05-ferramentas-colaboracao.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

## Github CLI

??? abstract "Referências"

    - [GitHub CLI | Take GitHub to the command line](https://cli.github.com/)
    - [What is the GitHub CLI? How to Use GitHub from the Command Line](https://www.freecodecamp.org/news/how-to-use-github-from-the-command-line/)

=== "Linux (Ubuntu/Debian)"

    ```bash
    sudo apt intall gh
    gh --version 
    ```

=== "Windows"

    ```bash
    winget install --id GitHub.cli
    gh --version
    ```

Para autenticar use o comando `gh auth login`. No login escolha as opções:

```
What account do you want to log into? GitHub.com
What is your preferred protocol for Git operations? SSH
Upload your SSH public key to your GitHub account? /home/giobon/.ssh/id_rsa.pub
How would you like to authenticate GitHub CLI? Login with a web browser
```

Finalize colocando um código de 6 dígitos que aparece no terminal no navegador.

```
gh auth status

  ✓ Logged in to github.com as giovbon (/home/giobon/.config/gh/hosts.yml) 
```

Quando você for criar um Pull Request ou uma Issue pelo terminal, o gh pode abrir um editor de texto para você escrever a descrição. Você pode definir o seu editor favorito (como o VS Code, Nano ou Vim) com o comando:

```
# Para usar o VS Code:
gh config set editor "code --wait"

# Para usar o Nano (muito comum em Linux/Mac):
gh config set editor "nano"
```

- `gh repo list` lista repositórios da sua conta
- `gh issue list --repo giovbon/docs` lista issues do repo específico