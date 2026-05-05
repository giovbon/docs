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

= ATS AP2 Projeto Final

== Contexto
A nossa empresa lançou o *"GeekStore"*, um sistema web de e-commerce. A aplicação foi desenvolvida com um banco de dados real (SQLite), mas devido aos prazos curtíssimos, *nenhuma linha de teste automatizado foi escrita*. 

Para piorar, o CTO exigiu um padrão rígido de qualidade: de agora em diante, nenhuma alteração de código pode ir para a produção se a *cobertura de testes for inferior a 90%*.

Vocês foram contratados como Engenheiros de Qualidade de Software. A missão é construir uma suíte de testes ponta a ponta e configurar uma esteira de *Integração Contínua (CI)* que bloqueie códigos sem qualidade.

== O que é esperado na Entrega Final
O grupo deverá entregar o link de um *repositório público no GitHub* contendo:
1. O código da aplicação base (fornecido abaixo).
2. Toda a suíte de testes (Unidade, Integração/DB, Mocks, API, E2E e BDD).
3. A pipeline do *GitHub Actions* configurada (`ci.yml`) que rode os testes, verifique a métrica de cobertura de código (mínimo de 90%) e fique com o selo "Verde" (Sucesso).

== Detalhamento das Tarefas

=== 1. Fixtures Avançadas e Banco de Dados (`pytest`)
O sistema agora utiliza um banco de dados *SQLite*. Você *não pode* sujar o banco de dados principal de produção durante os testes.
* Utilize o arquivo `conftest.py` para criar uma `fixture` de banco de dados. 
* Essa fixture deve criar um banco de dados temporário em memória (`:memory:`) ou um arquivo `test.db`, inserir dados fictícios para o teste, retornar a conexão com `yield` e, por fim, *apagar/limpar o banco após o teste* (Teardown).

=== 2. Cobertura de Código (`pytest-cov`)
Sua suíte deve passar por todos os cenários (inclusive os fluxos de erro, como tentar comprar um produto sem estoque).
* A execução oficial dos testes deve ser feita com o comando: `pytest --cov=. --cov-fail-under=90`
* A pipeline do GitHub Actions deve falhar se essa meta não for atingida.

=== 3. Dublês de Testes (Mocks)
O sistema possui uma classe `GatewayPagamento`. Você *não deve* fazer chamadas reais para esse gateway nos testes.
- Utilize `unittest.mock` (ou `pytest-mock`) para criar um Mock do gateway e validar a ordem em que as regras de negócio foram executadas no processamento do pedido.

=== 4. Testes de Comportamento (BDD) com `pytest-bdd`
- Escreva ao menos 1 arquivo `.feature` utilizando a sintaxe *Gherkin* (Dado, Quando, Então) descrevendo o fluxo de "Compra com Sucesso".
- Crie os *step definitions* em Python associando o Gherkin às funções reais.

=== 5. Testes de API com `Tavern`
- Crie testes declarativos em YAML para a sua API. Valide se a requisição GET de produtos retorna Status 200, a estrutura do JSON e as chaves esperadas do banco de dados. 

=== 6. Testes End-to-End (E2E) com `Selenium`
- Crie um script usando `WebDriverWait` (Expected Conditions) para abrir o `index.html` via navegador, digitar o produto, clicar no botão e validar a mensagem final.
- O teste *deve* rodar de forma invisível usando o modo *Headless*, permitindo que funcione no GitHub Actions.

== Código da Aplicação Base

*Requisitos (`requirements.txt`):*
```txt
fastapi
uvicorn
pytest
pytest-cov
pytest-bdd
pytest-mock
tavern
selenium
```

=== 1. Backend, Banco de Dados e Regras (`main.py`)
*Nota para os alunos: Vocês precisarão usar a biblioteca `unittest.mock.patch` nos testes para substituir a variável `DB_PATH` temporariamente para um banco de testes.*

```python
import sqlite3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.responses import HTMLResponse

app = FastAPI()

# Configuração do Banco
DB_PATH = "geekstore.db"

def get_db_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Cria a tabela e insere dados iniciais se o banco estiver vazio."""
    conn = get_db_connection()
    conn.execute('CREATE TABLE IF NOT EXISTS produtos (nome TEXT PRIMARY KEY, preco REAL, estoque INTEGER)')
    cursor = conn.cursor()
    cursor.execute('SELECT count(*) FROM produtos')
    if cursor.fetchone()[0] == 0:
        conn.execute("INSERT INTO produtos (nome, preco, estoque) VALUES ('teclado', 200.0, 10)")
        conn.execute("INSERT INTO produtos (nome, preco, estoque) VALUES ('mouse', 100.0, 5)")
    conn.commit()
    conn.close()

# --- Dependências Externas ---
class GatewayPagamento:
    """Simula uma API externa de cartão de crédito"""
    def cobrar(self, cartao: str, valor: float):
        return True # Na vida real faria request HTTP

# --- Regras de Negócio ---
def calcular_desconto(valor: float, cupom: str) -> float:
    if cupom == "GEEK20":
        return valor * 0.8
    return valor

def processar_pedido(valor: float, cartao: str, gateway: GatewayPagamento):
    if valor <= 0:
        raise ValueError("O valor deve ser maior que zero.")
    sucesso = gateway.cobrar(cartao, valor)
    if not sucesso:
        raise ValueError("Pagamento recusado pelo Gateway.")
    return "Compra aprovada!"

# --- Rotas da API ---
class CompraRequest(BaseModel):
    produto: str
    cartao: str
    cupom: str = ""

@app.on_event("startup")
def startup_event():
    init_db()

@app.get("/api/produtos")
def listar_produtos():
    conn = get_db_connection()
    produtos = conn.execute('SELECT * FROM produtos').fetchall()
    conn.close()
    return [dict(p) for p in produtos]

@app.post("/api/comprar")
def comprar(req: CompraRequest):
    conn = get_db_connection()
    produto = conn.execute('SELECT * FROM produtos WHERE nome = ?', (req.produto.lower(),)).fetchone()
    
    if not produto:
        conn.close()
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    
    if produto["estoque"] <= 0:
        conn.close()
        raise HTTPException(status_code=400, detail="Sem estoque")
    
    valor_final = calcular_desconto(produto["preco"], req.cupom)
    gateway = GatewayPagamento()
    
    try:
        mensagem = processar_pedido(valor_final, req.cartao, gateway)
        # Reduz o estoque no banco
        conn.execute('UPDATE produtos SET estoque = estoque - 1 WHERE nome = ?', (req.produto.lower(),))
        conn.commit()
        conn.close()
        return {"status": "sucesso", "mensagem": mensagem, "valor_pago": valor_final}
    except ValueError as e:
        conn.close()
        raise HTTPException(status_code=400, detail=str(e))

# Rota do Frontend
@app.get("/", response_class=HTMLResponse)
def frontend():
    with open("index.html", "r", encoding="utf-8") as f:
        return f.read()
```

=== 2. Frontend da Aplicação (`index.html`)
*(Colocar na mesma pasta do `main.py`)*

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>GeekStore E-commerce</title>
</head>
<body>
    <h1>Bem-vindo à GeekStore</h1>
    <div id="mensagem" style="color: green; font-weight: bold; margin-bottom: 15px;"></div>
    
    <label for="input-produto">Nome do Produto:</label>
    <input type="text" id="input-produto" placeholder="Ex: teclado"><br><br>
    
    <label for="input-cartao">Número do Cartão:</label>
    <input type="text" id="input-cartao" placeholder="0000 0000 0000 0000"><br><br>

    <button id="btn-comprar" onclick="fazerCompra()">Comprar</button>

    <script>
        async function fazerCompra() {
            const produto = document.getElementById('input-produto').value;
            const cartao = document.getElementById('input-cartao').value;
            const msgDiv = document.getElementById('mensagem');
            
            msgDiv.innerText = "Processando...";
            msgDiv.style.color = "blue";

            // Simula um atraso da rede (Força o aluno a usar WebDriverWait no Selenium)
            setTimeout(async () => {
                const response = await fetch('/api/comprar', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({produto: produto, cartao: cartao, cupom: ""})
                });

                if(response.ok) {
                    msgDiv.innerText = "Compra aprovada com sucesso!";
                    msgDiv.style.color = "green";
                } else {
                    const errorData = await response.json();
                    msgDiv.innerText = "Erro: " + errorData.detail;
                    msgDiv.style.color = "red";
                }
            }, 1500);
        }
    </script>
</body>
</html>
```



---


Aqui tens a estrutura completa e sintética para o ficheiro `README.md` do teu repositório modelo (Template). Adaptei o vocabulário para o português de Portugal, conforme solicitado.

---

```markdown
# 🚀 Projeto Final: Engenharia de Qualidade Contínua (GeekStore)

Bem-vindos à GeekStore! Este é o repositório base para o projeto final da disciplina de Testes Automatizados.

## 📌 Contexto
A GeekStore é uma aplicação de e-commerce recém-lançada. No entanto, foi desenvolvida sem **qualquer tipo de teste automatizado**. O vosso objetivo como Engenheiros de Qualidade é construir uma suíte de testes robusta (Unidade, Integração, API, UI e BDD) e garantir que nenhum código novo seja aceite se não passar na esteira de Integração Contínua (CI) com, no mínimo, **90% de cobertura**.

---

## 🛠️ Como configurar o ambiente local

É fortemente recomendado o uso de um ambiente virtual para instalar as dependências.

**1. Criar e ativar o ambiente virtual:**
```bash
# Criar o ambiente
python -m venv venv

# Ativar no Windows:
venv\Scripts\activate
# Ativar no Linux/Mac:
source venv/bin/activate
```

**2. Instalar as dependências:**
```bash
pip install -r requirements.txt
```

---

## ▶️ Como correr a aplicação

A aplicação utiliza o **FastAPI** para o backend e serve um ficheiro estático `index.html` para o frontend.

```bash
uvicorn main:app --reload
```
* **Frontend:** Acede a `http://localhost:8000` no navegador.
* **Documentação da API:** Acede a `http://localhost:8000/docs`.

*(Nota: Na primeira execução, o ficheiro do banco de dados `geekstore.db` será criado automaticamente).*

---

## 🧪 Como correr os testes

Deixa o servidor (comando acima) a correr num terminal e **abre um segundo terminal** (lembra-te de ativar o ambiente virtual novamente) para executar a suíte de QA.

**Para correr todos os testes:**
```bash
pytest
```

**Para correr os testes e validar a meta de cobertura (Obrigatório para a entrega):**
```bash
pytest --cov=. --cov-fail-under=90
```

---

## 🎯 O que deve ser implementado (Missões)

Para concluires esta atividade com sucesso, o teu repositório final deve conter:

1. **Testes Unitários e Fixtures (`pytest`):** - Isolar o banco de dados oficial durante os testes utilizando uma *Fixture* no `conftest.py` que crie um banco SQLite em memória (`:memory:`) e faça o *teardown* (limpeza) no fim.
2. **Dublês de Teste / Mocks (`unittest.mock`):** - Isolar a classe `GatewayPagamento` para que os testes não façam chamadas reais à operadora de cartão, validando a ordem das regras de negócio.
3. **Behavior-Driven Development (`pytest-bdd`):** - Criar pelo menos 1 ficheiro `.feature` (Gherkin) para o fluxo de compra e implementar os *step definitions*.
4. **Testes de Contrato de API (`Tavern`):** - Criar ficheiros YAML que validem o *status code* (ex: 200, 400) e o formato do JSON de resposta dos *endpoints*.
5. **Testes End-to-End (`Selenium`):** - Script que abra a interface web e simule um humano a comprar um produto. 
   - **Requisito:** Usar `WebDriverWait` (esperas explícitas) e configurar o *Headless Mode* (invisível).
6. **Integração Contínua (`GitHub Actions`):** - Um ficheiro `.github/workflows/ci.yml` que instale o Python, as dependências, inicie a aplicação em *background* e corra o comando de cobertura de testes (`pytest --cov`) a cada novo *Push*.

---

**Boa sorte e boas automações! 🤖**
```