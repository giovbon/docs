---
icon: simple/githubactions
hide:
  - navigation
---

# Locust

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../zSLIDES/12-locust.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? abstract "Referências"

    - [Locust - A modern load testing framework](https://locust.io/)

## Exemplo

Crie ambiente venv do python, ative-o, instale o locust com `pip install locust`.

``` py title="locustfile.py"
from locust import HttpUser, task, between

class LeitorDeBlog(HttpUser):
    # O usuário vai esperar entre 1 e 3 segundos entre as ações
    wait_time = between(1, 3)

    @task(3) # O número 3 significa que essa tarefa tem "peso 3" (acontece 3 vezes mais que as outras)
    def listar_todos_os_posts(self):
        # Simula o usuário entrando na home e vendo a lista de posts
        self.client.get("/posts", name="[GET] Listar Todos os Posts")

    @task(2) # Peso 2
    def ler_post_especifico(self):
        # Simula o usuário clicando em um post específico (ID 1)
        self.client.get("/posts/1", name="[GET] Ler Post ID 1")

    @task(1) # Peso 1 (ocorre com menos frequência, pois criar posts é mais raro)
    def criar_novo_post(self):
        # Simula um usuário enviando dados para o servidor (criando um post)
        dados_do_post = {
            "title": "Descobrindo o Locust",
            "body": "Ferramenta sensacional para testes de carga!",
            "userId": 1
        }
        self.client.post("/posts", json=dados_do_post, name="[POST] Criar Novo Post")
```

HttpUser: É a classe que representa o "robô" (o usuário simulado). Cada usuário que o Locust criar vai seguir as instruções dessa classe.

wait_time: Simula o comportamento humano. O usuário não clica em tudo instantaneamente; ele espera um pouco (nesse caso, de 1 a 5 segundos) entre uma ação e outra.

@task: É um decorador que diz ao Locust: "Isso aqui é uma ação que o usuário faz". O Locust vai escolher uma dessas funções aleatoriamente para executar.

self.client.get(): É o comando que realmente dispara o acesso ao site/API. Ele funciona igualzinho à famosa biblioteca requests do Python.





No terminal o comando `locust` lança o servidor do Locust (`Starting web interface at http://localhost:8089`) abra essa url no navegador. Lá você verá uma tela com interface gráfica pedindo três informações para iniciar o teste:

- Number of users (Número de usuários): Quantos usuários simulados você quer criados no total. Vamos colocar 30 usuários simultâneos

- Ramp up (Taxa de surgimento): Quantos usuários serão criados por segundo até atingir o total. Coloque 3 (vai injetar 3 novos usuários por segundo).

- Host: A URL do site ou API que você quer testar. Coloque `https://jsonplaceholder.typicode.com` que é o site/API real que vai receber o bombardeio. Dica: Não teste o Google ou o site alheio, ou você pode ser bloqueado. Para testar com segurança, você pode usar uma API pública de testes como https://httpbin.org ou rodar um sistema próprio localmente.

Preencha os campos e clique em "Start swarming" (Começar o enxame).

## Análise de resultados

Que foto bonita de se ver! Parabéns, você colocou o teste para rodar com sucesso.

Olhando para essa tela, o diagnóstico principal é: **A API está ultra saudável sob essa carga.** Não há nenhum erro e os tempos de resposta estão excelentes.

Vamos destrinchar cada parte desse painel para você entender o que esses números estão te dizendo:

---

**O Cabeçalho (Status Geral)**

* **Users (30):** Você tem exatamente 30 usuários virtuais simultâneos "navegando" no site neste momento.
* **RPS (13.87 / 15):** O sistema está processando uma média de 14 a 15 requisições por segundo.
* **Failures (0%):** O número mais importante aqui. **Zero falhas.** Significa que o servidor respondeu com sucesso (Status 200 OK) a absolutamente todas as tentativas de acesso.

---

**A Proporção das Tarefas (Os Pesos funcionaram!)**

Lembra que no código nós definimos pesos (`3`, `2` e `1`) para as tarefas? Olha a coluna **# Requests** provando que o Locust obedeceu perfeitamente:

* **Listar Todos os Posts:** 409 requisições (Peso 3 - a mais executada).
* **Ler Post ID 1:** 270 requisições (Peso 2).
* **Criar Novo Post:** 125 requisições (Peso 1 - a menos executada).

O Locust manteve a proporção matemática exata que você planejou.

---

**Anatomia dos Tempos de Resposta (Em milissegundos)**

É aqui que os desenvolvedores choram ou sorriem. No seu caso, é motivo de sorriso:

* **GET vs POST:** Perceba como as rotas de leitura (`GET`) são ridiculamente rápidas (média de **9ms**). Já a rota de escrita (`POST`), que simula criar um post, demora consideravelmente mais (média de **128ms**). Isso é perfeitamente normal no desenvolvimento de software: gravar dados no banco exige processamento, enquanto ler dados geralmente bate em sistemas de cache.
* **Min e Max:** O menor tempo registrado para ler um post foi de **5ms**, mas em algum momento de lentidão da rede ou do servidor, uma requisição demorou **356ms** (o Máximo).

**O que são os Percentis (95%ile e 99%ile)?**

A média engana (se eu comi um frango e você nenhum, a média é meio frango para cada). Por isso olhamos os percentis:

* **95%ile (ms) para o Criar Post é 140:** Isso significa que **95%** de todas as criações de posts demoraram *140ms ou menos*. Apenas 5% foram mais lentas que isso.
* **99%ile (ms) para o Criar Post é 380:** Significa que **99%** dos usuários tiveram uma experiência de *380ms ou menos*. Só 1% pegou o pior cenário.

Se o seu chefe perguntar: *"Qual é a velocidade real do nosso sistema para a esmagadora maioria dos clientes?"*, você olha para a coluna **95%ile**.

---

**Tamanho dos Dados (Average size)**

Olha que interessante a coluna **Average size (bytes)**:

* A rota de listar todos os posts baixa **27.520 bytes** (~27 KB) por vez, porque ela traz uma lista enorme de texto.
* A rota de criar um post recebe apenas **123 bytes** de resposta.

Se você aumentasse esse teste para 10.000 usuários, a rota de "Listar" provavelmente esgotaria a largura de banda (internet) do seu servidor muito antes da rota de "Criar", por causa do tamanho do pacote de dados.

**Resumo do Diagnóstico**

O JSONPlaceholder aguentou seus 30 usuários brincando de blog sem suar. Se você quiser ver o bicho pegar e o gráfico de falhas subir, tente mudar o número de usuários para **500** ou **1000** com um spawn rate mais agressivo.



## Exercício

Modelo para o exercício:

<div class="code-explorer" data-src="zCODE/CTT09-repo.txt" ></div>

[:lucide-file-text: ATS11 - GA](#){ .md-button .md-button--primary onclick="gerarPDFTypst('../TYP/ATS11.typ'); return false;" }

[:lucide-send: Entregar Atividade](https://forms.gle/XtxuC3MNMnuaU1v66){ .md-button target="_blank" }
