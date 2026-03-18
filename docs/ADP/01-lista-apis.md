---
hide:
  - navigation
---

# Lista das APIs

- [x] APIs de CRUD básicas (criadas automaticamente junto com as tabelas)
    - `GET`, `POST`, `DELETE id`, `GET id` e `PATCH id`

- [x] APIs de autenticação básicas (criadas junto da criação do workspace no Xano). A partir de uma tabela `user` padrão, ou outra tabela que assuma este papel, uma série de 3 APIs sempre estão disponíveis para uso:
    - `/auth/login` {email, password} devolve um `authToken` para alguém já cadastrado
    - `/auth/signup` {name, email,password } cadastra usuário e devolve um `authToken` [^1]
    - `/auth/me/{authToken}` dado um authToken, devolve o usuário associado à ele

- SNIPPETs importados [^2]
    - [ ] `/consultacep` {cep} dado um cep, devolve cep, localidade, estado, etc.
    - [ ] `/SendGrid_Email` {from, to, subject, content} devolve o status do envio

## APIs Customizadas

- [ ] `/buscacep` {cep} dado um cep, devolve se ele está na tabela CEP [^3]

- [ ] `/buscaCliente` (ou `/consultaCliente`), dado um authToken, devolve o cliente [^3]

- [ ] `/UpsertCEP` {cep, cidade, estado} confere se o cep já existe, se sim, insere, se não, atualiza, retorna o CEP [^4]

- [ ] `/cadastraCliente` realiza 4 processos para: [^5]
    - Cadastrar user ( `/auth/signup` ) e recuperar o authToken
    - Recuperar dados do user (`/auth/me`)
    - Procurar status do cliente
    - Salvar o cliente associado ao usuário e status
- [ ] `/consultaEnderecoDoCliente` {authToken} dado um token, devolve os endereços daquele cliente [^5]

- [ ] `/salvaEndereco` salva ou atualiza o cep, estado e cidade na tabela CEP, os demais campos na tabela ENDERECO [^5]

- [ ] `/atualizaEndereco` salva ou atualiza o cep, estado e cidade em CEP, atualiza os demais campos na tabela ENDERECO [^5]

- [ ] `/marcarEnderecoPadrao` marca um endereco como padrao, desmarcando o bit de padrão de todos os demais [^5]


[^1]: Um authToken é utilizado para provar que as futuras requisições pertencem à mesma pessoa que fez login naquela sessão.
[^2]: Aula 15
[^3]: Aula 16
[^4]: Aula 17
[^5]: Aula 18