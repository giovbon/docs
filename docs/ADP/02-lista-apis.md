---
hide:
  - navigation
---

# Lista das APIs

- [x] APIs de CRUD básicas (criadas automaticamente junto com as tabelas)
    - `GET`, `POST`, `DELETE id`, `GET id` e `PATCH id`

- [x] APIs de autenticação (criadas junto da criação do workspace no Xano). A partir da tabela `user` padrão[^6], três APIs estão disponíveis para uso:
    - `/auth/login` devolve um `authToken` para alguém já cadastrado
    - `/auth/signup` cadastra usuário e devolve um `authToken` [^1]
    - `/auth/me/{authToken}` dado um authToken, devolve o usuário associado à ele

- SNIPPETs importados (15)
    - [x] `/consultaCEP` dado um número de cep, devolve cep, localidade, estado, etc.
    - [x] `/SendGrid_Email` {from, to, subject, content} devolve o status do envio

**APIs Customizadas**

- [ ] `/buscaCEP`. Recebe um CEP (texto) e busca na tabela CEP. Se encontrar, devolve o registro; se não, devolve null. Serve para evitar o "Query All" (buscar tudo) que seria lento. (16)

- [ ] `/buscaCliente` (ou `/consultaCliente`). Recebe `authToken`, chama internamente `/auth/me` para pegar o `user_id`, e então busca na tabela Cliente. É a base para quase todas as outras APIs. (16/17)

- [ ] `/upsertCEP`. Recebe {cep, cidade, estado}. Se o CEP existe, faz PATCH (atualiza); se não, faz POST (insere). Sempre retorna o registro do CEP (com o id). (17)

- [ ] `/cadastraCliente` Fluxo de 4 etapas: (17)
    1. `/auth/signup` (cria user); 
    2. `/auth/me` (pega ID); 
    3. Busca `status_id` na tabela `STATUS_CLIENTE`; 
    4. Salva na tabela Cliente.

- [ ] `/consultaEnderecoCliente`. Recebe `authToken`, descobre quem é o cliente (via `/buscaCliente`) e lista os endereços. Usa um Addon para trazer os dados do CEP junto com o endereço. (18)

- [ ] `/salvaEndereco`. Recebe dados do endereço + CEP. Primeiro chama `/upsertCEP` para garantir que o CEP existe e obter o `cep_id`, depois faz POST na tabela `ENDERECO`. (18)

- [ ] `/atualizaEndereco`. Similar ao anterior, mas faz PATCH na tabela ENDERECO usando o `endereco_id`. Também usa o `/upsertCEP` internamente. (18)

- [ ] `/marcarEnderecoPadrao`. Torna um endereço `padrão = true` e, via lógica de Array Map, define todos os outros endereços do mesmo cliente como `padrão = false`. (18)


[^1]: Um authToken é utilizado para provar que as futuras requisições pertencem à mesma pessoa que fez login naquela sessão.
[^6]: Tabelas a serem usadas para autenticação de usuários devem possuir campo de `Email` (tipo text) e um campo de `Password` (tipo password).

```mermaid
graph TD
    %% Definição das classes visuais
    classDef auth fill:#e1f5fe,stroke:#0288d1,stroke-width:2px,color:#000;
    classDef loc fill:#e8f5e9,stroke:#388e3c,stroke-width:2px,color:#000;
    classDef action fill:#fff3e0,stroke:#f57c00,stroke-width:2px,color:#000;
    classDef logic fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000;
    classDef database fill:#eceff1,stroke:#455a64,stroke-width:2px,color:#000;

    %% Declaração dos Nós (APIs e Banco de Dados)
    BuscaCli(["/buscaCliente"])
    UpsertCEP(["/upsertCEP"])
    
    ConsultaEnd(["/consultaEnderecoCliente"])
    SalvaEnd(["/salvaEndereco"])
    AtualizaEnd(["/atualizaEndereco"])
    
    MarcarPadrao(["/marcarEnderecoPadrao"])
    DB[("Tabela de Endereços")]

    %% Atribuição de classes aos nós (Sintaxe segura)
    class BuscaCli auth;
    class UpsertCEP loc;
    class ConsultaEnd,SalvaEnd,AtualizaEnd action;
    class MarcarPadrao logic;
    class DB database;

    %% 1. Dependência de Identidade
    BuscaCli -->|Depende de Sucesso| ConsultaEnd
    BuscaCli -->|Depende de Sucesso| SalvaEnd
    BuscaCli -->|Depende de Sucesso| AtualizaEnd

    %% 2. Dependência de Localização
    UpsertCEP -->|Dependência Obrigatória| SalvaEnd
    UpsertCEP -->|Dependência Obrigatória| AtualizaEnd

    %% Ações no Banco de Dados (Operações padrão)
    ConsultaEnd -.->|Lê dados| DB
    SalvaEnd -.->|Cria registro| DB
    AtualizaEnd -.->|Altera registro| DB

    %% 3. Lógica de Negócio (Exclusividade)
    MarcarPadrao ==>|1. Marca o endereço alvo| DB
    MarcarPadrao ==>|2. Varre a tabela e desmarca os outros| DB
```