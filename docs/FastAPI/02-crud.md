---
icon: simple/fastapi
tags:
  - pydantic
hide:
  - navigation
---

# CRUD

No desenvolvimento de APIs, existem ==quatro ações principais que fazemos com os dados==: criar, ler, atualizar e excluir. Com essas operações podemos realizar qualquer tipo de comportamento em uma base dados. Podemos criar um registro, em seguida alterá-lo, e depois deletá-lo.

Quando falamos de APIs servindo dados, todas essas operações têm alguma forma similar no protocolo HTTP. O protocolo tem verbos para indicar essas mesmas ações que queremos representar no banco de dados.


- `POST`: é usado para solicitar que o servidor aceite um dado para a ==criação do recurso== enviado pelo cliente.
- `GET`: é usado para quando o cliente deseja requisitar uma informação do servidor.
- `PUT`: é usando no momento em que o cliente deseja informar alguma ==alteração nos dados== para o servidor.
- `PATCH`: é usado quando o cliente quer aplicar ==atualizações parciais== a um recurso existente, enviando apenas os dados que precisam ser modificados.
- `DELETE`: usado para dizer ao servidor que delete determinado recurso.

## Schemas

??? abstract "Referências"

    - [Pydantic](https://docs.pydantic.dev/latest/)

Os **Schemas** no Pydantic são ==classes que definem a estrutura dos dados em uma aplicação==, agindo como um contrato para garantir que os dados que entram ou saem da API estejam conformes às expectativas. Eles são criados a partir de `BaseModel`, utilizando anotações de tipo para definir regras. Os principais propósitos dos schemas são:

1. **Validação**: Verificam automaticamente se os dados estão corretos.
2. **Conversão**: Transformam tipos de dados, como strings em inteiros.
3. **Serialização**: Facilitam a conversão de objetos em dicionários ou JSON.

No FastAPI, os schemas são usados para ==validar a entrada de dados== em funções de endpoint e filtrar a saída de dados, protegendo informações sensíveis. Boas práticas incluem ter diferentes schemas para diferentes situações, como criação, atualização e exposição de dados. Em resumo, os schemas garantem que os dados estejam formatados corretamente antes de serem processados na aplicação.

### `schemas.py`

Estrutura do projeto:
```
└── fast_zero
    ├── app.py
    ├── fast_zero
    ├── poetry.lock
    ├── pyproject.toml
    ├── schemas.py
    └── tests
        └── __init__.py
```

Em relação ao projeto, o arquivo abaixo contém as definições de schemas de dados utilizando o Pydantic, que são essenciais para validar e estruturar as informações utilizadas na aplicação FastAPI definida em `app.py`.

As classes definidas no arquivo servem como modelos que especificam os atributos e seus tipos para os dados utilizados na aplicação, utilizando o Pydantic. Cada classe define campos, como `username`, `email`, e `password`, e seus tipos correspondentes (por exemplo, `str` e `EmailStr`), garantindo que os dados sejam automaticamente validados e estruturados de maneira consistente ao interagir com a API.

``` python title="schemas.py"
from typing import Optional
from pydantic import BaseModel, EmailStr # (2)!

class UserSchema(BaseModel):
    username: str
    email: EmailStr
    password: str

class UserPublic(BaseModel):
    username: str
    email: EmailStr

class UserResponse(BaseModel):
    message: str
    user: UserPublic

class UserDB(UserSchema): # (1)!
    id: int

class UserList(BaseModel):
    users: list[UserPublic]

class UserUpdate(BaseModel):
    username: Optional[str] = None # (3)!
    email: Optional[EmailStr] = None
    password: Optional[str] = None

class Message(BaseModel):
    message: str
```

1. Indica que a classe `UserDB` herda da classe `UserSchema`. Isso significa que `UserDB` possui todos os atributos e validações definidos em `UserSchema`, além de adicionar um novo atributo, `id`, do tipo `int`. Essa herança permite que `UserDB` aproveite a estrutura e a validação de dados já configuradas em `UserSchema`, facilitando a criação de modelos de dados mais especializados.
2. `BaseModel` é uma classe do Pydantic que permite criar modelos de dados, oferecendo validação automática, fácil conversão para JSON e aprimoramento na documentação de APIs. É essencial para construir modelos consistentes e validados.
3. No método PATCH, usar `Optional[str] = None` (ou `str | None = None`) é essencial porque torna o campo não obrigatório, permitindo que o usuário envie apenas os dados que deseja atualizar. Se um campo, como `username`, for omitido, o Pydantic atribui None a ele. Isso é importante para que, ao usar `model_dump(exclude_unset=True)`, o sistema identifique quais campos foram realmente enviados e quais podem ser ignorados na atualização, evitando a sobrescrição acidental de informações existentes.

## `app.py`

<!-- linenums="1" -->
``` python hl_lines="15-26 12 34 38 50 63" title="app.py"
from fastapi import FastAPI, HTTPException
from schemas import UserSchema, UserResponse, UserDB, UserList, UserPublic, UserUpdate, Message

app = FastAPI() # (1)!

@app.get("/", summary="Endpoint raiz") # (2)!
def read_root():
    return {'message': 'API FUNCIONANDO!'}

database = [] # (3)!

@app.post("/users/", status_code=201, response_model=UserResponse, summary="Cria um usuário")# (4)!
def create_user(user: UserSchema):

    dados_do_usuario = user.model_dump() # (5)!
    
    novo_id = len(database) + 1 # (6)!

    user_with_id = UserDB( # (7)!
        id=novo_id,
        username=dados_do_usuario["username"],
        email=dados_do_usuario["email"],
        password=dados_do_usuario["password"]
    )
    
    database.append(user_with_id) # (8)!
    # (9)!

    return {
        "message": "Usuário criado com sucesso",
        "user": user_with_id
    }

@app.get('/users/', response_model=UserList, summary="Retorna todos os usuários")
def read_users():
    return {'users': database} # (10)!

@app.put('/users/{user_id}', response_model=UserPublic, summary="Atualiza totalmente um usuário")
def update_user(user_id: int, user: UserSchema): # (11)!
    if user_id > len(database) or user_id < 1: # (12)!
        raise HTTPException( # (13)!
            status_code=404, detail='User not found'
        ) 

    user_with_id = UserDB(**user.model_dump(), id=user_id) # (14)!
    database[user_id - 1] = user_with_id # (15)!

    return user_with_id

@app.patch('/users/{user_id}', response_model=UserPublic, summary="Atualiza parcialmente um usuário")
def patch_user(user_id: int, user: UserUpdate):

    if user_id > len(database) or user_id < 1:
        raise HTTPException(status_code=404, detail='User not found')

    user_atual = database[user_id - 1] # (16)!
    update_data = user.model_dump(exclude_unset=True) # (17)!
    user_atualizado = user_atual.model_copy(update=update_data) # (18)!
    database[user_id - 1] = user_atualizado # (19)!

    return user_atualizado

@app.delete('/users/{user_id}', response_model=Message, summary="Deleta um usuário")
def delete_user(user_id: int):
    if user_id > len(database) or user_id < 1:
        raise HTTPException(
            status_code=404, detail='User not found'
        )

    del database[user_id - 1] # (20)!

    return {'message': 'User deleted'}
```

1. Criamos a instância do FastAPI
2. Dizemos que quando alguém acessar a "raiz" (`/`) via GET, execute esta função: `read_root`
3. Banco de dados "fake" em memória
4. Em `response_model` especifica que a resposta de uma rota deve seguir a estrutura definida pelo modelo `UserResponse`, o que permite validação automática da resposta e documentação automatica
5. `model_dump()` transforma os dados validados enviados para a rota POST em um dicionário simples, permitindo acesso fácil e garantindo que apenas os dados válidos do `UserSchema` sejam incluídos. [^1]
6. Calculado o `ID` manualmente baseando-se no tamanho atual da lista
7. Esse trecho cria uma nova instância do modelo `UserDB`, que representa o usuário no "banco de dados", atribuindo a ele um ID gerado (`novo_id`) e preenchendo os campos `username`, `email` e `password` com os dados extraídos do dicionário `dados_do_usuario`.
8. Adiciona o objeto `user_with_id`, que representa um novo usuário, à lista `database`. Isso simula o armazenamento do usuário no "banco de dados", que, neste caso, é apenas uma lista em memória, permitindo que os dados dos usuários sejam mantidos e acessados posteriormente.
9. O destaque acima poderia ser substituído por essas duas linhas:
    ``` python
    user_with_id = UserDB(**user.model_dump(), id=len(database) + 1)  
    database.append(user_with_id)
    ```
    Sobre o uso de `user.model_dump()` [^1] e `**user.model_dump()` [^2]
10. Retorna um dicionário com a chave `users` e a lista `database` como valor, representando todos os usuários armazenados
11. O parâmetro `user_id`, que deve ser um número inteiro, identifica qual usuário deve ser atualizado, enquanto o parâmetro `user`, que segue o modelo `UserSchema`, contém os dados que serão utilizados na atualização. Assim, a função combina esses dois elementos para localizar e modificar as informações do usuário correspondente no banco de dados.   
12. Avalia se o identificador do usuário é maior que o número total de usuários no banco de dados ou menor que 1. Se qualquer uma dessas condições for verdadeira, a função gera uma exceção HTTP 404, utilizando `raise HTTPException`, indicando que o usuário não foi encontrado.
13. Esse trecho gera uma exceção HTTP 404, indicando que o usuário não foi encontrado. Ele utiliza `HTTPException` com `status_code=404` e a mensagem `detail='User not found'` para informar ao cliente que o recurso solicitado não existe.
14. Cria uma nova instância de `UserDB` usando os dados recebidos. Ao usar `**user.model_dump()`, o operador `**` desempacota o dicionário resultante, permitindo que seus pares chave-valor sejam passados como argumentos nomeados para uma função ou construtor
15. Substitui o usuário existente no banco de dados. Aqui, `user_with_id` (a nova instância com os dados atualizados) é atribuído à posição correspondente a `user_id - 1` na lista database, substituindo quaisquer dados que estavam anteriormente nesse índice. O `-1` é usado para ajustar o índice porque a contagem em listas em Python começa do zero, enquanto os identificadores de usuário (neste caso, `user_id`) geralmente começam a partir de 1.
16. Busca o registro do usuário que está sendo atualizado a partir do `database`, usando o `user_id` fornecido
17. A classe `UserUpdate` define um modelo com três campos opcionais: `username`, `email` e `password`. Cada um desses campos pode ser atualizado individualmente, permitindo que o usuário altere apenas as informações desejadas. Utilizando o método `model_dump(exclude_unset=True)`, apenas os campos que o usuário fornecer no JSON serão incluídos na atualização, garantindo que dados não mencionados permaneçam inalterados. Usar `exclude_unset=True` garante que o seu `model_copy(update=...)` receba apenas as "peças" que precisam ser trocadas, mantendo todas as outras peças originais intactas.
18. Cria uma nova instância do usuário atual, chamada `user_atualizado`, aplicando as alterações contidas em `update_data`. O método `model_copy` do Pydantic é utilizado para gerar uma cópia do objeto original, mesclando os novos dados com os existentes. Isso permite que as atualizações sejam feitas de forma segura, preservando a integridade do objeto original e garantindo que apenas os campos especificados em `update_data` sejam modificados. Veja [^3]
19. Substitui o registro antigo do usuário no `database` pelo novo objeto `user_atualizado`. Isso atualiza a lista com as informações alteradas, garantindo que os dados mais recentes sejam armazenados corretamente.
20. Remove um item da lista `database` no índice correspondente ao `user_id` fornecido. O comando `del` exclui o objeto do usuário daquela posição, garantindo que o registro seja completamente removido da lista.

[^1]: O `model_dump()` é um método do Pydantic (a biblioteca que o FastAPI usa por baixo dos panos para validação de dados). De forma bem direta: ele pega o objeto da sua classe (que é uma instância complexa do Python) e o **converte em um dicionário comum** (`dict`).
Quando você recebe `user: UserSchema` no seu endpoint, o FastAPI já validou os dados, mas o `user` ainda é um objeto Pydantic. Se você precisar manipular esses dados como uma coleção de chave-valor, o `model_dump()` faz isso.
```python
# O que você tem (Objeto Pydantic)
user.username  # Acessa como atributo

# O que o model_dump() gera (Dicionário)
{'username': 'joao', 'email': 'joao@email.com'}
```

[^2]: **O que é o `**` (double asterisk)**:
No código, você viu isto: `UserDB(**user.model_dump() ...`
O `**` é o operador de **desempacotamento** (unpacking). Ele pega o dicionário gerado e "espalha" as chaves como argumentos para o novo objeto. Na prática, isso:
```python
dados = user.model_dump() # {'name': 'Leo', 'email': 'a@a.com'}
UserDB(**dados, id=1)
# É exatamente igual a fazer isso:
UserDB(name='Leo', email='a@a.com', id=1)
```

[^3]: O `model_copy()` é um dos métodos mais úteis do Pydantic para lidar com a imutabilidade e a atualização de dados.Em termos simples: ele cria uma **cópia idêntica** de uma instância do seu modelo, mas permite que você **sobrescreva** valores específicos durante esse processo.
Imagine que você tem um usuário carregado do banco de dados e quer alterar apenas o email. Em vez de editar o objeto original (o que pode causar efeitos colaterais), você gera uma cópia atualizada.
```python
user_original = UserDB(id=1, username="leo", email="velho@email.com")

# Criando a cópia com a alteração
novo_user = user_original.model_copy(update={'email': 'novo@email.com'})

print(user_original.email) # Continua "velho@email.com"
print(novo_user.email)     # Agora é "novo@email.com"
```

Com isso concluímos um CRUD simples de usuário de uma aplicação, usando FastAPI :simple-fastapi: