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


= Atividade de Fixação: Fundamentos de CI/CD e GitHub Actions

*Instruções:* Responda às questões abaixo de forma dissertativa, utilizando suas próprias palavras com base no material de apoio. Respostas que consistirem em meras cópias de trechos do texto não serão pontuadas integralmente.

== Eixo 1: Cultura DevOps e o Ciclo CI/CD
*1.* Observando o ciclo de vida de CI/CD (representado pelo símbolo do infinito), existe uma divisão clara entre as responsabilidades da Integração Contínua (azul) e da Implantação Contínua (laranja/amarelo). Explique a diferença fundamental entre essas duas fases. Em sua resposta, detalhe por que a etapa de Monitoramento ("Monitor") não é o fim definitivo do processo, mas sim um gatilho que reinicia o ciclo.

*2.* O texto afirma que o fluxo de CI/CD permite que empresas lancem atualizações de software "dezenas de vezes por dia com alta segurança", opondo-se ao modelo de lançamentos "gigantes e arriscados a cada poucos meses". Explique, com base nas definições de Testes Automáticos e Deploy em Produção, como o GitHub Actions atua na prática para garantir que esse lançamento contínuo seja seguro e não quebre o que já funciona.

== Eixo 2: A Anatomia de um Workflow
*3.* O ecossistema do GitHub Actions possui uma hierarquia estrita de funcionamento. Descreva o papel e a relação entre os seguintes componentes: *Evento, Workflow, Job, Runner e Step*. 

*4.* Por padrão, o GitHub Actions tenta maximizar a velocidade executando os Jobs de forma simultânea. No entanto, há cenários em que precisamos que uma tarefa só ocorra após o sucesso de outra. Como podemos alterar esse comportamento paralelo padrão para um comportamento sequencial? Dê um exemplo prático de onde isso seria necessário.

== Eixo 3: Actions e Ambiente de Execução
*5.* Analise o exemplo de workflow que testa uma API em Python. O runner do GitHub inicia como uma máquina formatada e completamente vazia. Descreva o papel exato das actions `actions/checkout@v4` e `actions/setup-python@v5` para resolver esse problema do "computador zerado".

*6.* Ainda no workflow de teste de API, a configuração `cache: 'pip'` é utilizada. Explique o problema que essa configuração visa resolver e qual é o impacto direto dela na performance financeira e de tempo de um pipeline.

*7.* Sabemos que o GitHub Actions roda na nuvem, mas o texto apresenta a ferramenta `act` para simular esse ambiente localmente utilizando contêineres Docker. Compare as opções de imagens disponibilizadas pelo `act` (Large, Medium e Micro) e justifique por que a imagem "Large" geralmente não é recomendada para testes locais rotineiros no dia a dia do desenvolvimento.

== Eixo 4: Regras de Negócio e Validação Automática
*8.* O texto menciona que o GitHub Actions é "burro" em relação à linguagem da sua aplicação (por exemplo, ele não entende código Python ou os testes do Pytest diretamente). Como, então, o Runner toma a decisão de exibir o sinal verde (✅ Passed) aprovando o Pull Request, ou o sinal vermelho (❌ Failed) bloqueando a integração? Explique o mecanismo de comunicação entre a ferramenta de teste e o Runner.

== Eixo 5: Gestão de Variáveis, Contexto e Segurança
*9.* O gerenciamento de informações é crucial na configuração de pipelines. Imagine que você está configurando o deploy de um backend e precisa lidar com as seguintes informações:
- A versão do Node.js (ex: v20).
- A URL do servidor de produção.
- A senha criptografada do banco de dados.

Com base nos conceitos de `env`, `vars` e `secrets`, explique em qual destas três categorias você armazenaria cada uma das informações acima e justifique sua escolha levando em conta o nível de segurança e visibilidade.

*10.* As variáveis de ambiente (`env`) no GitHub Actions possuem regras rígidas de escopo (Workflow, Job e Step). Explique a diferença de acesso entre uma variável criada no nível de Job e uma criada no nível de Step. Além disso, descreva para que serve a variável especial `$GITHUB_ENV` e em que cenário específico o desenvolvedor é obrigado a utilizá-la em vez de apenas declarar a variável no YAML.



/*
== Dica para a correção (Expectativa de Respostas para você balizar os alunos):


* *Q1:* Devem focar que CI foca em mesclar código frequentemente (construção/validação via testes automatizados), enquanto CD foca na entrega do pacote validado aos usuários. O Monitoramento capta bugs e feedback, alimentando a fase de *Plan* (Planejamento).
*/

/*
* *Q2:* Exige que falem que PRs são bloqueados se os testes falharem (evitando código ruim na main) e o deploy ocorre automaticamente após aprovação, tirando o fator humano propenso a erros.
*/

/*
* *Q3:* Evento dispara -> Workflow (YAML com regras) -> Job (tarefa grande no Runner) -> Runner (Máquina Vazia/VM) -> Steps (comandos sequenciais no terminal).
*/

/*
* *Q4:* Devem citar a instrução `needs`. Exemplo: Um job de Deploy "precisa" do job de Teste. Não faz sentido fazer deploy e testar ao mesmo tempo.
*/

/*
* *Q5:* `checkout` clona o repositório para o Runner. `setup-python` instala o interpretador Python na versão correta e arruma o PATH.
*/

/*
* *Q6:* Resolve o problema de baixar dependências pesadas da internet repetidas vezes. Impacto: Transforma minutos de processamento pago em segundos, guardando arquivos numa pasta secreta para o próximo uso.
*/

/*
* *Q7:* A Large pesa mais de 20GB (inviável para simulação rápida local). A Medium é o equilíbrio.
*/

/*
* *Q8:* Devem explicar que o GitHub Actions se baseia unicamente no *código de saída (Exit Code)* do terminal. Código 0 = Sucesso. Diferente de 0 = Erro, parando o Runner.
*/

/*
* *Q9:* Versão Node = `env` (direto no YAML, não muda e não é sensível). URL = `vars` (muda conforme o ambiente, mas não compromete a segurança se lida). Senha do Banco = `secrets` (criptografada, GitHub esconde com `**`).
*/

/*
* *Q10:* Job é visível por todos os steps daquele job; Step é restrito a si mesmo. O `$GITHUB_ENV` é usado quando o valor não é conhecido de antemão (calculado dinamicamente no terminal em tempo de execução).

*/