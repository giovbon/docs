#set page(
  paper: "a4",
  fill: rgb("#181818"),
  footer: align(center)[Gerado em: #datetime.today().display("[day]/[month]/[year]")],
)
#show raw.where(block: false): set text(fill: rgb("#aed68d"))
#set text(
  fill: rgb("#f5f5f5"), 
  size: 14pt
)
#show link: set text(fill: rgb("#58a6ff"))

= Desafio Prático: Dominando Variáveis e Escopos no GitHub Actions

*Objetivo:* Configurar um fluxo de CI/CD simulado (Integração e Entrega Contínuas) aplicando corretamente todos os conceitos de variáveis: Escopos (`env`), Variáveis Dinâmicas (`GITHUB_ENV`), Variáveis de Contexto Padrão, Segredos (`secrets`) e Variáveis de Repositório (`vars`).

== Cenário

Você foi contratado como Engenheiro(a) DevOps para organizar o processo de build de uma aplicação. O código atual está uma bagunça, com senhas expostas e repetição de código. Sua missão é criar um *Workflow* limpo e seguro usando as melhores práticas de variáveis do GitHub Actions.

== Começando: Template Pré-Pronto

Para facilitar o início, você receberá um arquivo de workflow (`pipeline.yml`) pré-configurado. Sua tarefa será *completar os trechos marcados com `TODO`* e analisar o comportamento das variáveis em cada etapa.

=== Passo 1: Preparação do Terreno

1.  Crie um novo repositório *público* no seu GitHub chamado `lab-github-actions-vars`.
2.  *Faça o upload do arquivo `pipeline.yml`* (localizado em `/home/ubuntu/lab-github-actions-vars/pipeline.yml`) para a raiz do seu novo repositório, dentro da pasta `.github/workflows/`.
3.  Vá até as configurações do repositório (*Settings > Secrets and variables > Actions*).
4.  *Crie um Secret:* Adicione um *Repository Secret* chamado `API_TOKEN_PROD` com um valor fictício (ex: `super_senha_secreta_123`).
5.  *Crie uma Variable:* Adicione uma *Repository Variable* chamada `URL_AMBIENTE` com o valor `https://api.meuprojeto.com`.

=== Passo 2: O Labirinto dos Escopos

O template `pipeline.yml` já contém a estrutura inicial para este passo. Sua tarefa é:

1.  *Analise o `pipeline.yml`:* Observe as variáveis `APP_NAME` (global), `BUILD_VERSION` (job) e `STEP_TEMP` (step).
2.  *Execute o Workflow:* Vá para a aba "Actions" do seu repositório no GitHub e execute o workflow `Desafio de Variaveis e Escopos` manualmente (usando `Run workflow`).
3.  *Analise os Logs:* No log de execução, observe o resultado do "Passo 1: Variáveis em Escopos Diferentes" e do "Passo 2: Observando o Escopo da STEP_TEMP". Entenda por que `STEP_TEMP` não é acessível no Passo 2.

=== Passo 3: Informações de Graça (Variáveis Padrão)

No mesmo Job (`build_app`), você encontrará um Step chamado "Passo 3: Auditoria com Variáveis Padrão".

1.  *Complete o `TODO`:* Edite o `pipeline.yml` para usar as *Variáveis Padrão do GitHub* e imprimir no terminal um relatório no seguinte formato:
    > "O usuário [NOME_DO_USUARIO] disparou este workflow no repositório [NOME_DO_REPO]. O sistema operacional do runner é [SISTEMA_OPERACIONAL]."
2.  *Dica:* Consulte a documentação do GitHub Actions para encontrar os nomes exatos das variáveis padrão (ex: `GITHUB_ACTOR`, `GITHUB_REPOSITORY`, `RUNNER_OS`).
3.  *Commit e Execute:* Faça o commit da sua alteração, execute o workflow novamente e verifique o log do "Passo 3".

=== Passo 4: A Variável do Futuro (`GITHUB_ENV`)

Ainda no Job `build_app`, você encontrará os Steps "Passo 4: Gerar Código Dinâmico" e "Passo 5: Usar Código Dinâmico".

1.  *Complete o `TODO` no "Passo 4":* Usando um bloco `run`, gere um valor numérico aleatório (no Linux, você pode usar `RANDOM_NUM=$RANDOM`) e empurre esse valor para o `$GITHUB_ENV` com a chave `BUILD_HASH`.
2.  *Complete o `TODO` no "Passo 5":* Imprima na tela o `BUILD_HASH` gerado no passo anterior, no formato: *"O hash gerado para este build foi: [VALOR_DO_HASH]"*.
3.  *Commit e Execute:* Faça o commit, execute o workflow e verifique os logs para confirmar que o valor foi gerado e usado corretamente.

=== Passo 5: O Cofre e o Painel (`secrets` e `vars`) (≈ 20 min)

No Job `deploy_app`, você encontrará o Step "Passo 6: Acessando Secrets e Vars".

1.  *Complete o `TODO`:* Edite o `pipeline.yml` para imprimir na tela a variável de repositório `URL_AMBIENTE` e o secret `API_TOKEN_PROD`.
2.  *Commit e Execute:* Faça o commit, execute o workflow e analise os logs.
3.  *Responda às Perguntas de Reflexão:* No próprio README, responda:
  -  Por que a Secret aparece no log como `**` e a variável aparece normalmente?
  -  O Job `deploy_app` consegue ler a variável `BUILD_VERSION` criada no Job `build_app`? Por quê?


=== Critérios de Sucesso

Para considerar o exercício concluído com sucesso, você deve fazer o commit do arquivo YAML, rodar o workflow no GitHub e analisar os *logs de execução*. Você acertou se:

1.  Nenhum erro de sintaxe impediu o workflow de rodar.
2.  No *Passo 2*, o `Step 2` mostrou os valores do App e da Versão, mas a variável `STEP_TEMP` retornou vazia ou acusou não encontrada.
3.  No *Passo 3*, o log montou a frase certinha com o seu nome de usuário, o nome do seu repositório e `Linux` (ou o SO do runner que você usou).
4.  No *Passo 4*, o "Passo 5: Usar Código Dinâmico" conseguiu ler e imprimir um número aleatório que não existia no início do workflow.
5.  No *Passo 5*, a `URL_AMBIENTE` apareceu legível no log, mas a `API_TOKEN_PROD` apareceu bloqueada por asteriscos (`**`).
6.  As perguntas de reflexão foram respondidas corretamente no README.


=== Dicas para o Aluno

-   Cuidado com a diferença entre `${{ env.VARIAVEL }}` (usada em instruções do Actions como `if:`) e `$VARIAVEL` (usada dentro dos comandos bash no `run:`).
-   O comando de injeção dinâmica é chato com espaços! Use exatamente: `echo "CHAVE=valor" >> $GITHUB_ENV`.
-   Lembre-se: Jobs diferentes rodam em "máquinas" (runners) diferentes, a menos que você passe informações ativamente entre eles (o que não é o foco deste exercício, mas é bom ter em mente).

== Entrega

⚠️ Envie o *link do repo do github* para o #link("https://forms.gle/XtxuC3MNMnuaU1v66")[formulário] (*NÃO* envie pelo classroom, apenas click em "_Marcar como Concluída_" lá dentro após preencher o formulário com a entrega).