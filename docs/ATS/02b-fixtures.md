---
icon: simple/pytest
hide:
  - navigation
---


# Fixtures

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../SLIDES/04-fixtures.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

Fixture é uma função que prepara e fornece dados ou contexto para os testes. O pytest detecta automaticamente essas funções marcadas com `@pytest.fixture`. Seus resultados são injetados nos testes que as solicitam, eliminando a necessidade de chamadas manuais, por simplesmente adicionar o nome da fixture dentro dos parênteses da função de teste.

Use `return` quando você só quer fornecer um dado inicial para o teste e não precisa desfazer/limpar nada depois:

``` py hl_lines="1 3"
@pytest.fixture
def usuario_padrao():
    return {"nome": "João", "idade": 30}

def test_nome_do_usuario(usuario_padrao):
    assert usuario_padrao["nome"] == "João"
```

Use `yield` quando você cria algo que precisa ser destruído ou fechado depois que o teste acabar (ex: arquivos físicos, conexões de rede, bancos de dados):

``` py hl_lines="1 7"
@pytest.fixture
def arquivo_temporario():
    # 1. SETUP
    arquivo = open("temp.txt", "w")
    
    # 2. INJEÇÃO (pausa a fixture e roda o teste)
    yield arquivo 
    
    # 3. TEARDOWN (o teste acabou, o código volta para cá)
    arquivo.close()
```

---

Segue exemplo do uso de fixture com `yield` simulando um banco de dados:

``` py title="test_banco.py (Testando um Banco de Dados Falso)" hl_lines="3 25 38"
import pytest

# O código que queremos testar
class BancoDeDadosFalso:
    def __init__(self):
        self.conectado = False
        self.dados = {}

    def conectar(self):
        self.conectado = True
        print("\n[SETUP] Conectando ao banco de dados...")

    def desconectar(self):
        self.conectado = False
        print("\n[TEARDOWN] Desconectando e limpando o banco...")

    def salvar(self, chave, valor):
        if not self.conectado:
            raise Exception("Erro: Banco de dados não está conectado!")
        self.dados[chave] = valor

    def buscar(self, chave):
        return self.dados.get(chave)

# Fixture (O Preparador de Ambiente)
@pytest.fixture
def banco():
    # --- SETUP: Roda ANTES do teste ---
    db = BancoDeDadosFalso()
    db.conectar()
    
    # --- INJEÇÃO: Entrega o objeto 'db' para a função de teste ---
    yield db 
    
    # --- TEARDOWN: Roda DEPOIS do teste ---
    db.desconectar()

# Testes
def test_salvar_e_buscar_usuario(banco): # (1)!
    banco.salvar("user_123", "Maria da Silva")
    
    assert banco.buscar("user_123") == "Maria da Silva"
    print("-> Teste 1 finalizado!")

def test_banco_inicia_sem_dados(banco):
    assert banco.buscar("user_999") is None
    print("-> Teste 2 finalizado!")
```

1. O pytest vê que a função pede "banco", roda a fixture e injeta aqui. Uma nova conexão é criada pela fixture só para este teste.

Abra o seu terminal, vá até a pasta onde salvou o arquivo e rode o pytest com a flag `-s` (isso permite que o pytest mostre os `prints` na tela para você ver a mágica acontecendo): `pytest test_banco.py -s`.

## Parâmetros

Alguns parâmetros são cruciais para definir o comportamento e a abrangência de uma fixture no Pytest, permitindo opções como controle de tempo de vida e execução automática.

| Parâmetro           | Descrição                                                      | Uso Comum                                                  |
|---------------------|----------------------------------------------------------------|-----------------------------------------------------------|
| **`scope`**         | Define o tempo de vida da fixture.                            | Usado para otimizar testes e recursos.                    |
| **`autouse`**       | Executa automaticamente a fixture sem necessidade de injeção.| Ideal para configurações globais nos testes.              |
| **`params`**        | Permite a execução da fixture com diferentes valores.          | Útil para testes que necessitam de diferentes cenários.   |

Essas ferramentas dão uma flexibilidade enorme para criar ambientes de teste rápidos e complexos.

### `params`

O parâmetro `params` serve para **parametrizar uma fixture**, ou seja, fazê-la rodar múltiplas vezes com dados diferentes. Se você passar uma lista com 3 itens para o `params`, qualquer teste que pedir essa fixture vai ser executado 3 vezes automaticamente, uma vez para cada item da lista. É a ferramenta perfeita para testar o mesmo comportamento sob várias condições diferentes (como testar vários navegadores ou tipos de usuários) sem precisar duplicar o código do teste.

Para usá-lo, você passa a lista em `@pytest.fixture(params=[...])` e, dentro da fixture, usa um objeto especial do pytest chamado `request` para acessar o valor da rodada atual através de `request.param`.

Exemplo prático de params:

``` python
@pytest.fixture(params=["joao@email.com", "contato@empresa.com.br", "admin@sistema.org"]) # (1)!
def email_valido(request):
    return request.param # (2)!

def test_email_deve_conter_arroba(email_valido): # (3)!
    assert "@" in email_valido
```
1. Define a lista de dados. A fixture fornece um e-mail diferente a cada rodada
2. Retorna diretamente o valor da rodada atual
3. Esse teste roda 3 vezes automaticamente

### `scope`

O scope determina como e quando a fixture é criada e destruída. Com ele, você pode evitar a criação repetida de recursos pesados, como conexões de banco de dados ou instâncias de navegadores, e assim otimizar a execução dos testes.

Ele define o "tempo de vida" da fixture. As opções são:

`scope="function"` (Padrão): Roda a fixture uma vez para cada teste. Se 10 testes chamarem a fixture, ela roda 10 vezes. Ideal para dados simples em memória.

`scope="class"`: Roda apenas uma vez por classe de testes. Todos os testes dentro daquela classe vão compartilhar o mesmo resultado da fixture.

``` py hl_lines="3"
import pytest

@pytest.fixture(scope="class")
def navegador_logado():
    # SETUP: Abre o navegador e faz login (roda 1 vez para a classe)
    navegador = iniciar_navegador()
    navegador.fazer_login("admin", "1234")
    yield navegador
    # TEARDOWN: Fecha o navegador após o último teste da classe
    navegador.fechar()

class TestPainelAdministrativo:
    def test_verificar_dashboard(self, navegador_logado): # (1)!
        assert navegador_logado.pagina_atual == "dashboard"

    def test_acessar_configuracoes(self, navegador_logado): # (2)!
        assert navegador_logado.clicar("configurações")
```

1. Usa a instância logada
2. Reutiliza exatamente a mesma instância logada do teste anterior


`scope="module"`: Roda apenas uma vez por arquivo de teste (`.py`). Muito útil para carregar um arquivo pesado (como um CSV gigante) apenas uma vez e reutilizar nos testes daquele arquivo.

``` py
import pytest
import json

@pytest.fixture(scope="module")
def dataset_gigante():
    # SETUP: Carrega um arquivo pesado do disco (roda 1 vez para o arquivo .py)
    print("\nCarregando 5GB de dados do disco...")
    with open("dados_gigantes.json", "r") as f:
        dados = json.load(f)
    return dados

def test_contar_usuarios(dataset_gigante):
    assert len(dataset_gigante["usuarios"]) == 100000

def test_verificar_cidade_mais_comum(dataset_gigante): # (2)!
    assert dataset_gigante["estatisticas"]["cidade"] == "São Paulo"
```

1. Aqui não é usado `yield` porque não há teardown necessário
2. Usa os mesmos dados já carregados na memória, deixando o teste mais rápido


`scope="session"`: O mais abrangente. Roda apenas uma vez para toda a execução do `pytest`, não importa em quantos arquivos ou testes diferentes você use. Excelente para subir bancos de dados globais ou iniciar serviços que demoram a carregar.

``` py
import pytest

@pytest.fixture(scope="session")
def banco_de_dados_de_teste():
    # SETUP: Sobe um banco de dados real (ex: via Docker) no início da execução do pytest
    conexao = subir_container_postgres()
    conexao.criar_tabelas()
    
    yield conexao
    
    # TEARDOWN: Derruba o banco de dados e apaga tudo só quando todos os testes de todos os arquivos acabarem
    conexao.destruir_container()
```

### `autouse`

Este parâmetro permite que a fixture seja aplicada a todos os testes dentro do seu escopo automaticamente. É especialmente útil para configurações globais que não precisam ser referenciadas diretamente em cada teste.

Normalmente, para usar uma fixture, você precisa injetar o nome dela na função de teste (ex: `def test_algo(minha_fixture):`).

Quando você usa `autouse=True`, a fixture roda automaticamente para todos os testes que estiverem dentro do escopo dela, sem você precisar passar o nome como argumento.

Onde isso é útil? Para configurações que devem afetar tudo, mas que os testes não precisam interagir diretamente (ex: silenciar logs, configurar variáveis de ambiente, limpar tabelas do banco antes de qualquer coisa).

Exemplo prático de autouse:

``` python
@pytest.fixture(autouse=True) # (1)!
def configurar_ambiente_de_teste():
    os.environ["AMBIENTE"] = "testes_automatizados" # (2)!
    
    yield
    
    del os.environ["AMBIENTE"]

# --- Repare que os testes abaixo NÃO pedem a fixture nos parênteses ---
def test_verificar_conexao():
    # A variável já existe aqui dentro graças ao autouse!
    assert os.environ["AMBIENTE"] == "testes_automatizados"

def test_outra_regra_qualquer():
    # O setup foi feito de novo para este teste, de forma invisível
    assert "AMBIENTE" in os.environ
```

1. Isso vai rodar antes de todo teste silenciosamente, para todos os testes neste mesmo arquivo. Como você não definiu o parâmetro `scope` dentro do `@pytest.fixture(...)`, o pytest assume automaticamente o padrão dele, que é o escopo de função. Combinando esse padrão com o `autouse=True`, o ciclo de vida exato será este para cada função de teste no seu arquivo `.py`
2. Essa prática é comum para informar o sistema sobre o "modo" de operação. Por exemplo, o código pode usar essa variável para decidir sobre a conexão com o banco de dados, como: Se ambiente for "testes", conecta a um banco de dados seguro e falso, se não, conecta ao banco de dados de produção.

Use `autouse` com moderação. O Zen do Python diz que "explícito é melhor que implícito", e abusar do `autouse` pode tornar difícil entender de onde estão vindo os dados mágicos dos seus testes.

## `conftest.py`

O `conftest.py` é um arquivo especial do pytest que atua como um diretório central de recursos compartilhados para os seus testes. Ao definir fixtures ou configurações de ambiente dentro dele, o pytest as reconhece e as disponibiliza automaticamente para todos os arquivos de teste presentes na mesma pasta e em suas subpastas, eliminando totalmente a necessidade de fazer importações manuais (como `import conftest`). Isso o torna o local ideal para armazenar fixtures globais e muito utilizadas (como conexões com banco de dados, inicialização de navegadores ou autenticações de API), garantindo que o seu código nos arquivos de teste fique limpo, focado e livre de repetições.

``` bash
meu_projeto/
├── conftest.py # (1)!
├── test_usuarios.py
└── test_produtos.py
```

1. Suas fixtures globais vão aqui.

É considerado má prática colocar todas as fixtures no `conftest.py`, pois isso transforma o arquivo em um "monstro" complexo e difícil de manter. A organização ideal segue a regra de ouro: crie fixtures específicas dentro do arquivo de teste (`test_*.py`) se forem utilizadas apenas por esse arquivo, utilize o `conftest.py` da raiz para fixtures genéricas que precisam ser compartilhadas entre vários testes e use `conftest.py` em subpastas para restrições regionais, evitando que diferentes domínios de teste se poluam mutuamente. Pense no `conftest.py` como a caixa de ferramentas global, enquanto os arquivos de teste são suas mesas de trabalho individuais.

``` bash
meu_projeto/
├── conftest.py  # (1)!
├── testes/
│   ├── api/
│   │   ├── conftest.py # (2)!
│   │   └── test_api.py
│   └── frontend/
│       ├── conftest.py # (3)!
│       └── test_frontend.py
```

1. Fixtures globais. Este arquivo na raiz contém fixtures que são necessárias para todo o projeto, como conexões com bancos de dados que podem ser usadas em testes de diferentes tipos.
2. Fixtures específicas para testes de API. Se você tem fixtures específicas que só são úteis para os testes da API, como um cliente HTTP configurado para fazer chamadas para uma API de teste, você pode colocá-las aqui. Isso mantém essas fixtures organizadas e evita que a lógica de API "polua" outros testes.
3. Fixtures específicas para testes de backend. Se você tem fixtures que são voltadas para testes de frontend, como um objeto que simula um usuário na interface, coloque-as neste arquivo. Isso isola suas fixtures de frontend das de API.