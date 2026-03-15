---
hide:
    - navigation
    - path
search:
  exclude: true
---

# CTT7

## Exercício Prático: Fluxo Colaborativo no GitHub

**Objetivo**: Vivenciar o ciclo de vida completo de uma contribuição de software utilizando Issues, Projects (Kanban), Forks e Pull Requests.
Entrega: O link do repositório público do Aluno A, contendo o histórico de Issues fechadas, Pull Requests mergeados e o link para o Project Board.

---

### Fase 1: Planejamento e Organização (Aluno A)

Nesta etapa, o Aluno A atuará como o "Dono do Projeto" (Maintainer).

1. Criação do Repositório Base:
- O Aluno A deve criar um novo repositório público no GitHub chamado `lab-colaboracao-github`.
- Inicialize o repositório com um arquivo `README.md`.
- Adicione um arquivo `app.py` ou `index.html` com um código bem simples e propositalmente incompleto (ex: um script de "Olá Mundo" que precisa de mais funções).


2. Criação do Project (Kanban):
- O Aluno A vai na aba "Projects" do seu perfil e cria um novo projeto estilo "Board" (Kanban).
- Crie três colunas: `To Do`, `In Progress`, e `Done`.
- Adicione um campo personalizado (Custom Field) do tipo Single select chamado "Prioridade" (Alta, Média, Baixa).


3. Abertura e Gestão de Issues:
- No repositório, o Aluno A deve criar duas Issues distintas:
- Issue 1 (Bug): "Corrigir erro de digitação no README"
- Issue 2 (Feature): "Adicionar nova funcionalidade no arquivo principal" (ex: adicionar uma função de soma no `app.py`).


- Adicione Labels adequadas para cada uma (`bug` e `enhancement`).
- Adicione essas Issues ao Project recém-criado, defina a prioridade delas e coloque-as na coluna `To Do`.


---

### Fase 2: Contribuição Externa (Aluno B)

Nesta etapa, o Aluno B atuará como o "Desenvolvedor Externo" (Contributor).

1. O Fork e o Clone:
- O Aluno B acessa a página do repositório `lab-colaboracao-github` do Aluno A e clica no botão Fork.
- No terminal de sua máquina, o Aluno B clona o seu próprio fork:
`git clone https://github.com/[usuario-aluno-B]/lab-colaboracao-github.git`
- (Opcional) O Aluno B configura o `upstream` apontando para o repositório original do Aluno A.


2. Trabalhando na Issue 1 (Branches e Commits):
- O Aluno B cria uma nova branch para resolver a primeira tarefa:
`git checkout -b fix/readme-typo`
- Edita o arquivo `README.md`, corrigindo o texto.
- Faz o commit das alterações: `git add .` e `git commit -m "docs: corrige erro no readme"`.
- Envia para o seu fork no GitHub: `git push origin fix/readme-typo`.


3. Abrindo o primeiro Pull Request:
- O Aluno B vai até o seu fork no GitHub e clica em "Compare & pull request".
- Crucial: Na descrição do PR, o Aluno B deve escrever `Closes #1` (substituindo o "1" pelo número real da Issue de correção do README aberta pelo Aluno A).


4. Repetindo o processo para a Issue 2:
- O Aluno B volta para a branch `main` (`git checkout main`), cria uma nova branch (`feat/nova-funcao`), edita o código principal, commita, faz o push e abre um segundo Pull Request utilizando a palavra-chave `Resolves #2`.


---

### Fase 3: Revisão e Automação (Aluno A e B juntos)

1. Movendo os Cartões:
- O Aluno A acessa seu Project (Kanban) e move manualmente os cartões das duas Issues da coluna `To Do` para `In Progress` (ou `In Review`, se tiver criado essa coluna).


2. Revisão de Código (Code Review):
- O Aluno A abre a aba de Pull Requests do seu repositório original.
- Entra no PR referente à Issue 1 e analisa o código na aba "Files changed".
- O Aluno A pode deixar um comentário elogiando ou pedindo uma pequena alteração. (O Aluno B pode responder ao comentário para simular a interação).


3. O Merge e a Mágica:
- O Aluno A clica em Merge pull request para o PR 1 e depois para o PR 2.
- Observação Ativa: Ambos os alunos devem voltar à aba de Issues e verificar que elas foram fechadas automaticamente (devido às palavras-chave `Closes` e `Resolves` usadas pelo Aluno B).
- O Aluno A vai até o Project Kanban. Se as automações (Workflows) estiverem ativas por padrão, os cartões devem ter ido automaticamente para a coluna `Done`. Caso contrário, ele deve movê-los manualmente e verificar como ativar essa automação na aba "Workflows".

---

### Critérios de Entrega e Avaliação

Para que a dupla receba a nota completa, o repositório entregue pelo Aluno A deverá conter publicamente:

- [ ] Um quadro do GitHub Projects vinculado, contendo pelo menos 2 tarefas na coluna "Done".
- [ ] Histórico de 2 Issues fechadas, contendo labels (`bug`, `enhancement`).
- [ ] Histórico de 2 Pull Requests aceitos (merged) vindos de um repositório "forkado" (comprovando a participação do Aluno B).
- [ ] Uso correto das palavras-chave para fechamento automático (`Closes #ID`) na descrição dos PRs.