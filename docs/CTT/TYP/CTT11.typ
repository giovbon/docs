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


= Desafio Prático: Controle de Fluxos e Sobrevivência de Arquivos 

*Objetivo:* Dominar as regras de gatilhos complexos (triggers) para economizar recursos do servidor e garantir que arquivos gerados não sejam perdidos quando a máquina virtual do GitHub Actions for destruída, utilizando artefatos.

== Contexto
Você é o responsável por configurar a automação de um projeto. A equipe de desenvolvimento reclamou que o pipeline atual roda toda hora, gastando os minutos gratuitos do GitHub à toa (por exemplo, quando alguém apenas corrige um erro de digitação no README). Além disso, os relatórios de testes gerados durante o processo estão sumindo e ninguém consegue baixá-los para analisar.

Sua missão é criar um *Workflow* inteligente que só rode quando necessário e que salve os relatórios em um "pendrive virtual" (Artefato) para que a equipe possa baixar depois.

=== Etapa 1: Preparação do Repositório
1. Crie um repositório público vazio no seu GitHub pessoal chamado `lab-actions-artefatos`.
2. Clone o repositório para o seu computador.
3. Crie a seguinte estrutura de pastas e arquivos (podem ser arquivos vazios ou com qualquer texto simples) para simular um projeto real:
   ```text
   /src
     /codigo
       script.js
     /docs
       manual.md
   /testes
     suite.test.js
   ```
4. Crie a pasta `.github/workflows/` e dentro dela um arquivo chamado `pipeline-inteligente.yml`.

=== Etapa 2: Configurando os Gatilhos (Triggers)
Dentro do arquivo `pipeline-inteligente.yml`, você deve configurar a seção `on:` para atender *todas* as regras de negócio abaixo de uma só vez:

* *Regra 1 (Manual):* Deve existir a opção de rodar o workflow clicando em um botão na interface do GitHub.
* *Regra 2 (Agendamento):* O workflow deve rodar sozinho todos os dias às 02:00 da manhã (busque a expressão cron correta).
* *Regra 3 (Filtro de Branch):* Se for um `push`, ele *só deve rodar* se o código for enviado para uma branch que comece com o nome `feature/` (ex: `feature/novo-layout`).
* *Regra 4 (Filtro de Caminho com Exceção):* Ainda no evento de `push`, o workflow deve monitorar qualquer alteração dentro da pasta `src/` inteira. *PORÉM*, se o desenvolvedor alterar *apenas* coisas dentro de `src/docs/`, o workflow deve ignorar e não rodar. Use a regra de exceção (`!`) para isso.

=== Etapa 3: Job 1 - O Produtor de Artefatos
Crie o primeiro job, chamado `job_gerador`.
1. Defina para rodar em `ubuntu-latest`.
2. Crie um *step* que simule a construção do projeto: crie uma pasta chamada `saida_build/` e, dentro dela, crie dois arquivos: `relatorio1.txt` e `relatorio2.txt` (coloque qualquer mensagem dentro deles usando o comando `echo`).
3. Adicione o *step* oficial do GitHub Actions para fazer o upload de artefatos.
4. Configure este step para pegar *toda a pasta* `saida_build/` e salvá-la no servidor do GitHub com o nome `meus-relatorios-oficiais`.

=== Etapa 4: Job 2 - O Consumidor de Artefatos
Crie o segundo job, chamado `job_auditoria`.
1. Configure este job para rodar em `ubuntu-latest` e adicione a instrução necessária para que ele *aguarde* o `job_gerador` terminar antes de começar.
2. Como esta é uma máquina virtual totalmente nova e limpa, adicione o *step* oficial de download de artefatos para baixar o pacote `meus-relatorios-oficiais`.
3. Crie um *step* final com o comando `ls -R` (para listar as pastas) e outro comando `cat relatorio1.txt` para provar que os arquivos sobreviveram à troca de máquinas.

== Validação Prática
*Esta é a etapa mais importante para confirmar seu aprendizado. Faça os testes abaixo no seu terminal/git e observe a aba "Actions" no GitHub para ver se você acertou a configuração.*

*Teste 1 (Obrigatório falhar):* Faça um commit de qualquer arquivo diretamente na branch `main` e dê push. 
*O que deve acontecer:* Nada. O GitHub Actions deve ignorar.

*Teste 2 (Obrigatório falhar):*
Crie uma branch chamada `feature/documentacao`. Modifique apenas o arquivo `src/docs/manual.md`, faça o commit e o push.
*O que deve acontecer:* Nada. Sua regra de exceção (`!`) deve bloquear a execução.

*Teste 3 (Obrigatório funcionar):*
Ainda na branch `feature/documentacao`, modifique o arquivo `src/codigo/script.js`, faça o commit e o push.
*O que deve acontecer:* O workflow *deve* iniciar automaticamente!

*Teste 4 (Conferência visual):*
Entre na execução que deu certo no Teste 3:
1. Verifique se os dois jobs rodaram na ordem certa.
2. Abra os logs do `job_auditoria` e veja se o comando `cat` exibiu o texto do relatório na tela.
3. Na página de resumo (*Summary*) do workflow, role até o final da página. Você deve ver um arquivo `.zip` chamado `meus-relatorios-oficiais` disponível para download na seção "Artifacts". Baixe-o para o seu computador e veja se os relatórios estão lá dentro.


== Entrega

⚠️ Envie o *link do repo do github* para o #link("https://forms.gle/XtxuC3MNMnuaU1v66")[formulário] (*NÃO* envie pelo classroom, apenas click em "_Marcar como Concluída_" lá dentro após preencher o formulário com a entrega).