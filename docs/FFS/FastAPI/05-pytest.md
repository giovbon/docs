---
icon: simple/pytest
hide:
  - navigation
---

# Testes para rotas

[Sobre o arquivo `conftest.py`](../../ATS/02-pytest.md#conftestpy) e [Fixtures](../../ATS/02-pytest.md#fixtures). Aplicando esses recursos para testes unitário da lógica das rotas.

``` hl_lines="15 16"
.
├── README.md
├── database.db
├── fast_zero
│   ├── __init__.py
│   ├── app.py
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   └── settings.py
├── poetry.lock
├── pyproject.toml
├── tests
│   ├── __init__.py
│   ├── conftest.py
│   └── test_users.py
└── uv.lock
```

```py title="conftest.py"
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from fast_zero.app import app
from fast_zero.database import get_session
from fast_zero.models import mapeador

@pytest.fixture
def session():
    engine = create_engine(
        "sqlite:///:memory:", # (1)!
        connect_args={"check_same_thread": False}, # (2)!
        poolclass=StaticPool, # (3)!
    )
    
    mapeador.metadata.create_all(engine) # (4)!

    with Session(engine) as session: # (5)!
        yield session

    mapeador.metadata.drop_all(engine) # (6)!

@pytest.fixture
def client(session):
    def get_session_override(): # (7)!
        return session

    app.dependency_overrides[get_session] = get_session_override # (8)!
    
    with TestClient(app) as client: # (9)!
        yield client
    
    app.dependency_overrides.clear()
```


1. O banco de dados é criado na RAM em vez de um arquivo `.db`, desaparecendo após o teste, o que resulta em alta velocidade.
2. O SQLite só permite uma única "thread" por padrão; desativar essa restrição é necessário para o FastAPI, que utiliza requisições assíncronas.
3. Mantém uma única conexão aberta durante todo o teste, evitando a perda de dados gravados antes da verificação final.
4. Cria as tabelas no banco em memória.
5. O código utiliza a funcionalidade de Generator do Python, onde uma sessão com o banco é aberta e, ao encontrar o `yield`, a função é "pausada" e a sessão é entregue ao teste. Durante a execução do teste (como POST, GET, etc.), o controle está na função de teste. Após a conclusão do teste, o Pytest retoma a função original, executando as instruções que seguem o `yield`.
6. Limpa as tabelas após o teste.
7. Aqui você está criando uma função temporária. O objetivo dela é simples: sempre que alguém chamá-la, ela vai devolver a mesma sessão de banco de dados que o Pytest criou na memória RAM.
8. A funcionalidade de **dependency_overrides** do FastAPI permite substituir a função original **get_session** por **get_session_override** sem precisar modificar o código no arquivo **app.py**. Ao declarar **Depends(get_session)** nas rotas, o FastAPI é instruído a usar a função de teste em vez da original, mantendo a aparência de que ainda está utilizando o banco de dados normal, enquanto na verdade está operando com a sessão de teste.
9. O **TestClient** do pacote **httpx** simula requisições de um navegador ou celular à sua API, permitindo a execução de testes sem iniciar um servidor real na porta 8000. Essa abordagem torna os testes muito rápidos, pois as chamadas HTTP são feitas internamente. O **yield** entrega o **TestClient** para uso nos testes, permitindo realizar operações como `client.get('/')`.
10. Limpa o override após o teste para não afetar outros processos.


```py title="test_users.py"
def test_create_user(client): # (1)!
    response = client.post(
        "/users/",
        json={"username": "zero", "email": "zero@test.com", "password": "123"}
    )
    
    assert response.status_code == 201
    assert response.json()["user"]["username"] == "zero"

def test_read_users_vazio(client): # (2)!
    response = client.get("/users/")
    assert response.status_code == 200
    assert response.json() == {"users": []}
```

1. O 'client' aqui já está usando o banco em memória. O teste `test_create_user` verifica a funcionalidade de criação de um novo usuário na API. Ele envia uma requisição POST para a rota **/users/** com os dados do usuário em formato JSON. Em seguida, o teste assegura que o código de status da resposta seja **201**, indicando que a criação foi bem-sucedida, e verifica se o nome de usuário retornado corresponde a "zero", confirmando que os dados foram corretamente salvos.

2. O teste `test_read_users_vazio` avalia a resposta da API ao solicitar a lista de usuários quando não há nenhum cadastrado. Ele realiza uma requisição GET para a rota **/users/** e espera que o código de status da resposta seja **200**, indicando que a requisição foi bem-sucedida. O teste também verifica se a resposta JSON contém uma lista vazia de usuários, assegurando que a base de dados está de fato vazia nesse cenário.