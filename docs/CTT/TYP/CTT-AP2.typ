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

= CTT AP2

*Objetivo:* Trabalhar em equipe para criar um site de documentação para a linguagem Go utilizando a ferramenta Zensical. O grupo deverá aplicar um fluxo de trabalho colaborativo estrito no GitHub (Feature Branches, Pull Requests e Code Review) e automatizar a publicação no GitHub Pages através de um pipeline de CI/CD robusto e otimizado no GitHub Actions.

*Modalidade:* Trabalho em Grupo.

== Contexto

A documentação de software é tão importante quanto o próprio código. Ferramentas geradoras de sites estáticos, como o Zensical, facilitam a criação de portfólios e documentações usando Markdown. No entanto, gerar e publicar esses arquivos HTML manualmente é um processo suscetível a erros.

Além disso, em ambientes profissionais, o código nunca é alterado diretamente em produção sem revisão. Uma colaboração eficaz exige processos claros, proteção do trabalho em equipe e automação.

Por isso, neste trabalho, sua equipe será responsável por criar a estrutura inicial da documentação da linguagem Go no Zensical. Mais importante do que o conteúdo do site, será como vocês trabalham juntos: protegendo o repositório, revisando o código uns dos outros e automatizando todo o processo de validação, build e deploy utilizando os conceitos de Integração e Entrega Contínuas (CI/CD) vistos em aula.

Vocês utilizarão o #link("https://zensical.org/docs/publish-your-site/", "workflow básico") fornecido pelo Zensical como ponto de partida, mas deverão refatorá-lo completamente para atender aos requisitos de qualidade, colaboração e segurança exigidos neste projeto.

Referências para utilizar:
- #link("https://zensical.org/docs/setup/basics/", "Basics - Zensical Documentation")
- #link("https://roadmap.sh/golang","Learn to become a Go developer")

== O Que Deve Ser Feito (Tarefas)

- *Estruturação do Repositório e Proteção de Branch:*
  - No repositório público no GitHub para o projeto do grupo, inicializar um projeto Zensical localmente.
  - *Regra Obrigatória:* Configurar regras de proteção na branch `main` (*Branch Protection Rules*). O repositório deve *bloquear commits diretos (pushes)* na branch principal.
  - Exigir que todas as alterações sejam feitas via *Pull Request* (PR) e que necessitem da aprovação (*Code Review*) de pelo menos um outro membro da equipe antes do *merge*.

- *Fluxo de Trabalho Colaborativo (Feature Branches):*
  - Para cada nova página de documentação ou configuração de workflow, o aluno responsável deve criar uma branch separada (ex: `feat/doc-goroutines`, `fix/yaml-cache`).
  - Ao finalizar o trabalho, o aluno deve abrir um PR para a `main`.
  - Outro aluno do grupo deve revisar o PR, deixar comentários construtivos (se necessário) e aprovar a integração (*Approve*).

- *Criação do Conteúdo:*
  - Criar as páginas de documentação sobre a linguagem Go abordando esses assuntos da linguagem:
    - Introdução e Instalação
    - Sintaxe Básica e Variáveis
    - Estruturas de Controle (If, For, Switch)
    - Arrays, Slices e Maps
    - Structs e Métodos
    - Tratamento de Erros (Error Handling)
    - Concorrência I: Goroutines
    - Concorrência II: Channels
    - Gerenciamento de Pacotes (Go Modules)
    - Testes Automatizados em Go
  - Cada página deve ser feita e revisada seguindo o fluxo de PRs descrito acima.

- *Estilização da documentação:* Uma documentação técnica de excelência não se resume apenas a escrever bons textos; a experiência de leitura e a formatação são fundamentais. Como vocês estarão documentando uma linguagem de programação, explorar os recursos visuais da ferramenta fará toda a diferença. Não se limitem ao Markdown básico! Acessem a documentação oficial do gerador no link #link("https://zensical.org/docs/setup/basics/", "Zensical - Basics & Setup") e descubram como enriquecer as páginas de vocês. Procurem aplicar recursos como:

    - Blocos de código com Syntax Highlighting: Essencial para mostrar exemplos práticos de código em Go.
    - Alertas e Avisos (Admonitions): Ótimos para destacar dicas importantes, cuidados com a sintaxe ou notas sobre boas práticas (ex: "Cuidado ao usar Goroutines sem controle de concorrência!").
    - Tabelas e Navegação: Usem a criatividade para organizar informações estruturadas (como listas de comandos ou tipos de variáveis) e garantir que a navegação lateral do site faça sentido.
    - Lembrem-se: parte do trabalho em equipe é entregar um produto final com cara de projeto profissional. Usem a documentação da própria ferramenta a favor de vocês e surpreendam na apresentação!

- *Gatilhos (Triggers) Avançados de CI/CD:*
  - Criar o diretório `.github/workflows` e o arquivo YAML de automação.
  - O workflow deve ser executado no evento de `pull_request` para a branch `main` (para que o revisor saiba se o código está quebrando o site antes de aprovar).
  - O workflow também deve rodar no `push` para a `main` (após o merge do PR).
  - Adicionar um gatilho de agendamento (`schedule`) utilizando sintaxe cron (ex: `0 0 * * 0`), para que o workflow rode automaticamente uma vez por semana.

- *Estratégia de Matriz (Matrix Strategy):*
  - Criar um job de "Validação" que utilize a diretiva `strategy: matrix` para rodar o build do Zensical em pelo menos duas versões diferentes do Python (ex: 3.10 e 3.11). Isso garante que a documentação é gerada sem erros em diferentes ambientes.

- *Otimização com Cache:*
  - Implementar a action `actions/cache` para fazer o cache das bibliotecas Python instaladas via `pip`. 

- *Desacoplamento e Transferência de Artefatos:*
  - O workflow base deve ser refatorado para separar responsabilidades em pelo menos dois jobs distintos: `build_site` e `deploy_site`.
  - Configurar o job `deploy_site` para aguardar a conclusão do build utilizando a diretiva `needs:`.
  - O job de build deve empacotar os arquivos HTML gerados usando a action de upload de artefato.
  - O job de deploy deve fazer o download desse artefato para o ambiente antes de publicá-lo no GitHub Pages.

- *Condicionais de Segurança (`if`):*
  - O job de deploy (`deploy_site`) *nunca* deve ser executado durante um *Pull Request*. Utilizar a diretiva `if` para garantir que o deploy só ocorra quando houver um `push` na branch `main` ou no evento de `schedule`.

- *Documentação Final:*
  - Escrever um `README.md` no repositório detalhando o fluxo de trabalho escolhido pela equipe, como as revisões foram feitas e a arquitetura do workflow do Actions. Incluir nele os *nomes dos integrantes*.

== Entregáveis Finais

O grupo deverá entregar:

1. *Link do Repositório no GitHub*, contendo o código, a documentação Markdown, e o workflow YAML configurado.
2. *Link do Site Publicado* funcionando no GitHub Pages.
3. *Evidências de Colaboração:* Histórico de *Pull Requests* fechados, discussões, uso de *Feature Branches* e as aprovações (*Code Reviews*).
4. *Comprovação de CI/CD:* Aba "Actions" demonstrando a Matriz de testes, o uso do Cache e o fluxo de dependência entre jobs.

== Critérios de Avaliação
- *Fluxo Colaborativo e Git:* Uso rigoroso de branches, PRs e Code Reviews. Respeito à proteção da branch `main`.
- *Implementação de Gatilhos e Condicionais:* Pipeline bloqueia deploys durante PRs e valida automaticamente o código.
- *Performance e Boas Práticas CI/CD:* Separação lógica de jobs, transferência de artefatos e uso de cache.
- *Resiliência:* Implementação correta da Matriz para validação em múltiplas versões.