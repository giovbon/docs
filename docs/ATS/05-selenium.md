---
hide:
  - navigation
---

# Selenium :simple-selenium:

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../SLIDES/07-selenium.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

## Preparar ambiente

Crie ambiente python, depois:

```bash
pip install selenium
pip install webdriver-manager
```

```py title="teste-func-selenium.py"
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager # (6)!

servico = Service(ChromeDriverManager().install())  # (1)!
driver = webdriver.Chrome(service=servico)  # (2)!

driver.get("https://www.google.com")  # (3)!
print(f"Sucesso! Título: {driver.title}")  # (4)!
driver.quit()  # (5)!
```

1. Instala e obtém o caminho do ChromeDriver
2. Inicializa o WebDriver e o servidor HTTP local do ChromeDriver
3. Carrega a página do Google
4. Exibe o título da página
5. Encerra a sessão e finaliza processos
6. Importa as bibliotecas necessárias para usar o Selenium com o ChromeDriver e gerenciar automaticamente a instalação do ChromeDriver

Execute com  `python3 teste-func-selenium.py`. 

Deverá ser aberto o navegador e depois fechado e no final impresso: `Sucesso absoluto! Título: Google`.

## Testando Locators

O script apresentado ensina a abrir e fechar o navegador, mas uma automação eficaz deve simular ações humanas, como clicar em botões, preencher formulários e navegar entre páginas. Para isso, o Selenium utiliza **Locators** para identificar elementos na página, com a busca por ID sendo a mais rápida e recomendada. Em seguida, será criado um "Playground" com uma página HTML local e um script que emprega a classe `ActionChains` para realizar ações interativas de mouse e teclado.

```html title="playground.html"
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Playground Selenium</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 20px; }
        .caixa { 
            padding: 15px; margin-bottom: 10px; border: 2px solid #333; 
            width: 300px; text-align: center; cursor: pointer; transition: 0.3s;
        }
        #area-teclado { width: 300px; height: 80px; font-size: 16px; padding: 10px; }
    </style>
</head>
<body>
    <h2>Laboratório de Automação</h2>

    <div id="caixa-clique" class="caixa" onclick="this.style.backgroundColor='lightgreen'; this.innerText='Clicado!'">
        1. Clique Simples em mim
    </div>

    <div id="caixa-duplo" class="caixa" ondblclick="this.style.backgroundColor='salmon'; this.innerText='Duplo Clique Realizado!'">
        2. Dê um Duplo Clique em mim
    </div>

    <div id="caixa-direito" class="caixa" oncontextmenu="this.style.backgroundColor='lightblue'; this.innerText='Clique Direito Realizado!'; return false;">
        3. Clique com o Botão Direito em mim
    </div>

    <textarea id="area-teclado">Texto inicial.</textarea>

</body>
</html>
```

<iframe src="../EX/playground.html" width="100%" height="450px" style="border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>

```py title="aula1_selenium.py"
import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

print("Iniciando a Aula Prática de Selenium...\n")

# --- PREPARAÇÃO DO AMBIENTE ---
caminho_arquivo = f"file://{Path(__file__).parent.absolute()}/playground.html"
driver = webdriver.Chrome()
driver.get(caminho_arquivo)
driver.maximize_window()

# Instanciamos o ActionChains (nossa ferramenta para ações complexas de mouse e teclado)
acoes_avancadas = ActionChains(driver)
time.sleep(2) # Pausa para o aluno ver a página inicial

try:
    # --- LIÇÃO 1: CLIQUE SIMPLES ---
    print("▶ Lição 1: Executando clique simples...")
    caixa_clique = driver.find_element(By.ID, 'caixa-clique')
    caixa_clique.click()
    time.sleep(2) # Aluno vê a caixa ficar verde

    # --- LIÇÃO 2: DUPLO CLIQUE ---
    print("▶ Lição 2: Executando duplo clique...")
    caixa_duplo = driver.find_element(By.ID, 'caixa-duplo')
    acoes_avancadas.double_click(caixa_duplo).perform()
    time.sleep(2) # Aluno vê a caixa ficar vermelha/salmão

    # --- LIÇÃO 3: CLIQUE DIREITO ---
    print("▶ Lição 3: Executando clique com o botão direito...")
    caixa_direito = driver.find_element(By.ID, 'caixa-direito')
    acoes_avancadas.context_click(caixa_direito).perform()
    time.sleep(2) # Aluno vê a caixa ficar azul

    # --- LIÇÃO 4: AÇÕES DE TECLADO (CTRL+A e Backspace) ---
    print("▶ Lição 4: Limpando texto e digitando com o teclado...")
    area_teclado = driver.find_element(By.ID, 'area-teclado')
    
    # Clica na caixa de texto para focar nela
    area_teclado.click()
    
    # Encadeamento: Pressiona CTRL, aperta A, solta CTRL, aperta Backspace
    acoes_avancadas\
        .key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL)\
        .send_keys(Keys.BACKSPACE)\
        .perform()
    
    time.sleep(1) # Pausa para ver a caixa vazia
    
    # Digita um texto novo como se fosse um humano
    area_teclado.send_keys("Automação concluída com sucesso!")
    time.sleep(3) # Pausa final para o aluno admirar o resultado final

    print("\n✅ Todas as ações foram executadas com sucesso.")

finally:
    # --- ENCERRAMENTO ---
    print("Encerrando o navegador...")
    driver.quit()
```

## Selenium como Teste

O script apresentado é uma boa automação visual, mas não constitui um teste de software verdadeiro, que depende de validações manuais para confirmar resultados. Para profissionalizar a automação, será introduzido o uso do Pytest e Fixtures. Com o Pytest, é possível usar o comando **assert** para validar automaticamente se o sistema se comporta conforme o esperado; caso a afirmação falhe, o teste é interrompido automaticamente.

```py title="test_pytest_simples.py"
import pytest
from pathlib import Path
from selenium import webdriver

# ==========================================
# 1. A FIXTURE (O "Preparador")
# ==========================================
@pytest.fixture
def navegador():
    print("\n[FIXTURE] Abrindo o Chrome...")
    driver = webdriver.Chrome()
    yield driver  
    print("\n[FIXTURE] Fechando o Chrome...")
    driver.quit()

# ==========================================
# 2. O TESTE (A "Ação e Validação")
# ==========================================
def test_verificar_titulo_do_playground(navegador):
    
    print("[TESTE] Montando o caminho do arquivo local...")
    # __file__ descobre onde ESTE script Python está salvo.
    # .parent pega a pasta onde ele está.
    # .absolute() garante o caminho completo desde a raiz do sistema.
    pasta_atual = Path(__file__).parent.absolute()
    
    # Montamos a "URL" do arquivo local
    caminho_html = f"file://{pasta_atual}/playground.html"
    
    print(f"[TESTE] Acessando: {caminho_html}")
    navegador.get(caminho_html)
    
    print("[TESTE] Validando o título da página...")
    # O nosso assert agora verifica o título do seu HTML!
    assert navegador.title == "Playground Selenium"
```

