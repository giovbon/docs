---
icon: simple/git
hide:
  - navigation
---

# Git

## Comandos Auxiliares de Terminal (CLI)
Comandos básicos de Linux citados nos slides para navegação.

| Comando | Descrição |
| :--- | :--- |
| `pwd` | Exibe o caminho do diretório atual. |
| `ls` / `ls -la` | Lista arquivos (o `-la` mostra arquivos ocultos como o `.git`). |
| `cd <diretório>` | Entra em uma pasta. |
| `mkdir <nome>` | Cria uma nova pasta. |
| `touch <arquivo>` | Cria um novo arquivo vazio. |
| `rm <arquivo> -r` | Remove arquivos ou diretórios recursivamente. |
| `nano <arquivo>` | Abre um editor de texto simples no terminal. |
| `cat <arquivo>` | Pega o conteúdo de um arquivo de texto. |
| `history > <arquivo>` | Pega o resultado do comando e salva-o num arquivo de texto. Sobrescreve se o arquivo já existir.|
| `history >> <arquivo>` | Pega o resultado do comando e salva-o num arquivo de texto. Adicionando no final se o arquivo já existir.|

## Configurações Iniciais e Identificação
Antes de iniciar o trabalho, é necessário configurar quem é o autor das alterações.

| Comando | Descrição |
| :--- | :--- |
| `git version` | Verifica a versão instalada do Git. |
| `git config --global user.name "Nome"` | Define o nome do usuário globalmente para todos os projetos. |
| `git config --global user.email "email@exemplo.com"` | Define o e-mail do usuário globalmente. |
| `git config --global --list` | Lista todas as configurações globais aplicadas. |
| `git config user.name "Nome"` | Define um nome específico apenas para o repositório atual. |
| `git config user.email "email@exemplo.com"` | Define um e-mail específico apenas para o repositório atual. |

## Criação e Clonagem de Repositórios
Comandos para iniciar um novo projeto ou copiar um existente.

| Comando | Descrição |
| :--- | :--- |
| `git init` | Inicializa um novo repositório Git na pasta atual (cria a pasta `.git`). |
| `git init -b main` | Inicializa o repositório já definindo `main` como o nome da branch principal. |
| `git clone <URL>` | Copia um repositório remoto inteiro para a sua máquina local. |

## Fluxo de Trabalho Local (Add & Commit)
Gerenciamento das alterações nas áreas de *Working Directory*, *Staging Area* e *Local Repository*.

| Comando | Descrição |
| :--- | :--- |
| `git status` | Exibe o estado atual do diretório (arquivos modificados, novos ou na stage). |
| `git add <arquivo>` | Adiciona um arquivo específico à área de preparação (*Staging Area*). |
| `git add *` | Adiciona todos os arquivos novos e modificados à área de preparação. |
| `git add .` | Adiciona tudo no diretório atual e subdiretórios à área de preparação. |
| `git commit -m "mensagem"` | Cria um novo snapshot (versão) do projeto com as alterações da stage. |
| `git commit -a -m "mensagem"` | Atalho que adiciona arquivos modificados (já rastreados) e commita em um só passo. |
| `git log` | Lista o histórico de commits (hash, autor, data e mensagem). |

## Desfazendo Alterações e Corrigindo Erros
Comandos para reverter arquivos ou commits em diferentes situações.

#### **Reset** (Uso privado/local - altera o histórico)
| Variação | Descrição |
| :--- | :--- |
| `git reset --soft HEAD~1` | Volta 1 commit, mantendo as alterações na *Staging Area* para um novo commit. |
| `git reset --mixed HEAD~1` | Volta 1 commit, mantém as alterações nos arquivos, mas fora da stage. |
| `git reset --hard <hash>` | **Cuidado:** Apaga todas as alterações e volta o projeto exatamente ao estado do commit especificado. |
| `git reset HEAD <arquivo>` | Remove um arquivo específico da *Staging Area* (unstage), sem alterar o código. |

#### **Revert** (Uso público/colaborativo - preserva o histórico)
| Variação | Descrição |
| :--- | :--- |
| `git revert <hash>` | Cria um novo commit que desfaz as alterações do commit especificado. |
| `git revert HEAD` | Desfaz o último commit criando uma nova entrada no histórico. |
| `git revert -n <hash>` | Prepara a reversão, mas não commita automaticamente (permite revisão). |

#### **Restore** (Manipulação de arquivos)
| Variação | Descrição |
| :--- | :--- |
| `git restore <arquivo>` | Descarta mudanças locais e volta o arquivo ao estado do último commit. |
| `git restore --source=<hash> <arq>` | Restaura um arquivo para como ele era em um commit específico. |
| `git restore --staged <arquivo>` | Tira o arquivo da *Staging Area* (equivalente ao unstage). |

## Repositórios Remotos (GitHub)
Sincronização entre o computador local e o servidor remoto.

| Comando | Descrição |
| :--- | :--- |
| `ssh-keygen -t rsa -b 4096 -C "email"` | Gera uma nova chave SSH para autenticação segura com o GitHub. |
| `git remote add origin <URL>` | Conecta o repositório local a um endereço remoto sob o nome "origin". |
| `git remote -v` | Lista os repositórios remotos configurados e suas URLs. |
| `git push origin main` | Envia os commits locais para a branch `main` do repositório remoto. |
| `git pull origin main` | Busca as novidades do servidor e as mescla no repositório local (Fetch + Merge). |
