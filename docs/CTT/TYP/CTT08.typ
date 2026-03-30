#set page(
  paper: "a4",
  footer: align(center)[Gerado em: #datetime.today().display("[day]/[month]/[year]")]
)

= Laboratório Prático: Dominando GitHub Actions Localmente com `act`

*Objetivo:* Simular o dia a dia de uma pessoa engenheira de DevOps criando, validando e executando um pipeline de CI/CD complexo inteiramente no seu ambiente local, garantindo que tudo funcione perfeitamente antes de um `git push`.

== Contexto

Você foi encarregado de modernizar a esteira de integração de um novo projeto na sua empresa. Para economizar minutos da cota do GitHub Actions na nuvem e agilizar o desenvolvimento, a liderança técnica exigiu que todo o fluxo seja criado e testado localmente utilizando a ferramenta *`act`*.

Lembre-se: o `act` utiliza contêineres Docker para simular os *runners* do GitHub. Portanto, seu ambiente deve estar devidamente preparado.

== Parte 1: Preparação do Ambiente

O `act` exige que o ambiente local seja reconhecido como um repositório Git para conseguir preencher corretamente as variáveis de ambiente.

1. Crie uma pasta raiz para o seu projeto chamada `meu-projeto-ci`.
2. Inicialize um repositório Git vazio e faça um commit inicial (pode ser de um arquivo `README.md` vazio).
3. Recrie a estrutura de diretórios estrita que o GitHub (e o `act`) exige para reconhecer os workflows de automação.
4. Certifique-se de que o *Docker* está rodando na sua máquina e que o *`act`* está instalado.

== Parte 2: O Primeiro Workflow e a Ferramenta de Mapeamento

Antes de criar o pipeline completo, você precisa validar se o `act` está lendo seus arquivos corretamente.

1. Dentro da pasta correta de workflows, crie um arquivo chamado `01-hello-local.yml`.
2. Configure este workflow para ser disparado pelo evento `workflow_dispatch` (acionamento manual) ou `push`.
3. Crie um único *job* chamado `teste-basico` que rode no ambiente `ubuntu-latest`.
4. Este job deve conter três *steps* sequenciais:
   - Um passo que imprima no terminal: `"Iniciando testes locais"`.
   - Um passo que imprima a versão do Node.js instalada no runner (dica: `node -v`).
   - Um passo que imprima: `"Finalizado com sucesso!"`.
5. *Validação:* Utilize o comando do `act` que *lista todos os workflows e jobs detectados* sem executá-los. Anote o comando utilizado e a saída do terminal. Em qual `Stage` este job se encontra?
6. *Execução:* Execute apenas este arquivo específico utilizando a flag `-W` combinada com `grep "|"` para limpar a saída do terminal e ver apenas os `echos`.

== Parte 3: O Desafio do Pipeline Complexo (DAG)

Agora você criará o pipeline oficial da aplicação. Crie um novo arquivo chamado `02-pipeline-principal.yml`. Este workflow deve ser disparado no evento de `push`.

Você deve configurar *quatro jobs distintos*. Lembre-se de que, por padrão, o GitHub Actions tenta rodar tudo em paralelo. Você precisará usar a palavra-chave *`needs`* para criar a seguinte ordem de execução estruturada (um Grafo Direcionado Acíclico - DAG):

-   *Job 1 (`setup-e-lint`):* O primeiro a rodar. Simula a preparação do ambiente e a checagem de qualidade do código. Deve rodar no `ubuntu-latest` e ter um step que imprima `"Analisando qualidade do código..."`.
-   *Job 2 (`testes-unitarios`):* Só pode iniciar *após* o término do Job 1. Deve imprimir `"Rodando testes unitários..."`.
-   *Job 3 (`scan-de-seguranca`):* Também só pode iniciar *após* o término do Job 1, mas deve rodar *em paralelo* com o Job 2. Deve imprimir `"Procurando vulnerabilidades..."`.
-   *Job 4 (`build-e-deploy`):* O estágio final. Só deve iniciar quando os testes (Job 2) *E* o scan de segurança (Job 3) tiverem finalizado com sucesso. Deve imprimir `"Gerando artefato e fazendo deploy..."`.

*Validação de Arquitetura:*
Antes de rodar, verifique se a sintaxe do YAML está correta usando o comando de *dry-run* (checagem de sintaxe) do `act`.
Em seguida, liste os jobs mapeados. O seu terminal deve obrigatoriamente exibir a seguinte distribuição de *Stages*:

-   *Stage 0:* `setup-e-lint`
-   *Stage 1:* `testes-unitarios` e `scan-de-seguranca`
-   *Stage 2:* `build-e-deploy`

Se os Stages estiverem diferentes disso, revise suas dependências (`needs`) antes de prosseguir.

== Parte 4: Execução Customizada e Resolução de Problemas

Para finalizar o laboratório, você deverá interagir de forma avançada com o runner local.

1. *Imagem Customizada:* O `act` utiliza imagens Docker enxutas (Micro/Medium) por padrão para ser rápido. Execute todo o workflow `02-pipeline-principal.yml` forçando o uso de uma imagem específica via linha de comando. Utilize a imagem `node:slim` para o runner `ubuntu-latest`. *(Consulte a seção de comandos do material base).*
2. *Execução Isolada:* O time de segurança reportou que o `scan-de-seguranca` apresentou uma falha de memória durante a noite. Para não ter que rodar o pipeline inteiro (o que gastaria tempo), execute *apenas* o job de segurança (Job 3) isoladamente utilizando seu ID. Qual comando você utilizou?
3. *Comprovação de Paralelismo:* Explique, com base na saída do seu terminal durante a execução completa do pipeline, como você consegue comprovar que o Job 2 e o Job 3 rodaram ao mesmo tempo em contêineres temporários separados.

== Entregáveis (Submissão via GitHub)

Ao final do laboratório, você deve realizar o *push* de todo o seu trabalho local para um repositório (público ou privado com acesso liberado ao instrutor) no GitHub. 

Seu repositório deve conter obrigatoriamente a seguinte estrutura e arquivos:

1. A pasta `.github/workflows/`: 
   - Contendo os códigos YAML dos dois arquivos criados (`01-hello-local.yml` e `02-pipeline-principal.yml`).

2. O arquivo `comandos.txt` na raiz do projeto:
   - Logo após finalizar a Parte 4, limpe os comandos que deram erro (se quiser) e exporte o histórico recente do seu terminal rodando o comando: 
     `history 50 > comandos.txt`
   - Atenção: É através deste arquivo que avaliaremos a Parte 4. O `comandos.txt` deve conter a prova em texto de que você utilizou:
     - O comando de listagem e checagem de sintaxe (`act -l` e `act -n`).
     - O comando de execução com a imagem Docker customizada (`act -W ... -P ubuntu-latest=node:slim`).
     - O comando de execução do job isolado de segurança (`act -j scan-de-seguranca`).

3. Um arquivo `README.md` respondendo às validações:
   - Validação da Parte 3: Cole a saída em texto da tabela gerada pelo comando `act -l`, comprovando que o DAG foi montado corretamente (com os *Stages* 0, 1 e 2 organizados conforme o enunciado).
   - Validação da Parte 4: Responda de forma direta à pergunta teórica: *Com base na saída do terminal, como é possível comprovar que o Job 2 e o Job 3 rodaram em paralelo?*