---
icon: simple/fastapi
hide:
  - navigation
---

# CRUD :simple-fastapi: :simple-pydantic:

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

Em relação ao projeto, o arquivo `schemas.py` contém as definições de schemas de dados utilizando o Pydantic, que são essenciais para validar e estruturar as informações utilizadas na aplicação FastAPI definida em `app.py`.

As classes definidas no arquivo servem como modelos que especificam os atributos e seus tipos para os dados utilizados na aplicação, utilizando o Pydantic. Cada classe define campos, como `username`, `email`, e `password`, e seus tipos correspondentes (por exemplo, `str` e `EmailStr`), garantindo que os dados sejam automaticamente validados e estruturados de maneira consistente ao interagir com a API.

<div class="code-explorer" data-src="../../zCODE/fastzero1.txt" ></div>

<!--

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
-->

Com isso concluímos um CRUD simples de usuário de uma aplicação, usando FastAPI.