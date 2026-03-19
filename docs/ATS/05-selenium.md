---
icon: simple/selenium
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

<iframe src="../EXE/playground-selenium.html" width="100%" height="450px" style="border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);"></iframe>

```py title="aula1_selenium.py"
import time
from pathlib import Path
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

print("Iniciando a Aula Prática de Selenium... preparando ambiente\n")

caminho_arquivo = f"file://{Path(__file__).parent.absolute()}/playground.html"
driver = webdriver.Chrome() # (1)!
driver.get(caminho_arquivo) # (2)!
driver.maximize_window() # (3)!

acoes_avancadas = ActionChains(driver) # (4)!
time.sleep(2)

try:
    print("▶ Lição 1: Executando clique simples...")
    caixa_clique = driver.find_element(By.ID, 'caixa-clique') # (5)!
    caixa_clique.click() # (6)!
    time.sleep(2)

    print("▶ Lição 2: Executando duplo clique...")
    caixa_duplo = driver.find_element(By.ID, 'caixa-duplo')
    acoes_avancadas.double_click(caixa_duplo).perform() # (7)!
    time.sleep(2)

    print("▶ Lição 3: Executando clique com o botão direito...")
    caixa_direito = driver.find_element(By.ID, 'caixa-direito')
    acoes_avancadas.context_click(caixa_direito).perform()
    time.sleep(2)

    print("▶ Lição 4: Limpando texto e digitando com o teclado...")
    area_teclado = driver.find_element(By.ID, 'area-teclado')
    area_teclado.click() #(8)!
    
    acoes_avancadas\
        .key_down(Keys.CONTROL).send_keys("a").key_up(Keys.CONTROL)\
        .send_keys(Keys.BACKSPACE)\
        .perform() #(9)!
    
    time.sleep(1)
    
    area_teclado.send_keys("Automação concluída com sucesso!")
    time.sleep(3)

    print("\n✅ Todas as ações foram executadas com sucesso.")

finally:
    print("Encerrando o navegador...")
    driver.quit() #(10)!
```

1. Inicia uma nova instância do Google Chrome controlada pelo Selenium
2. Carrega o conteúdo do arquivo HTML
3. Abre a janela do Chrome em tela cheia
4. Instanciação de ActionChains
5. Vasculha o código HTML da página procurando por um elemento que tenha o atributo id="caixa-clique"
6. Simula um clique físico do mouse em cima do elemento
7. Prepara o comando de "clicar duas vezes rapidamente", `perform()` é o gatilho da ação
8. Clica na caixa de texto para focar nela
9. Primeira linha "aperta" a tecla Control (Ctrl) e a mantém pressionada, toca na tecla "A" e finalmente solta a tecla. A segunda linha apaga o conteúdo.
10. Fecha tudo e mata o processo do driver (diferente do `driver.close()` que fecha apenas a janela/aba que está em foco no momento)

---

| Componente | Função Principal | Analogia |
| :--- | :--- | :--- |
| **By** | Localizar elementos. | Apontar para um objeto na página. |
| **Keys** | Teclas de comando. | Apertar botões no teclado. |
| **ActionChains** | Gestos complexos. | Mover, arrastar e soltar. |

Gestos complexos ou teclas especiais: a classe `Keys` no Selenium simula as "teclas especiais" do teclado, excluindo letras, números e símbolos comuns. As principais categorias incluem: **Ação** (como `Keys.ENTER` e `Keys.TAB`), **Edição** (como `Keys.BACKSPACE`), **Modificadoras** (como `Keys.CONTROL` e `Keys.SHIFT`), e **Navegação** (teclas de seta e funcionais).

| Se você ler... | O robô fará... |
| :--- | :--- |
| **`.click()`** | Clique normal (botão esquerdo). |
| **`.double_click()`** | Clique duplo rápido. |
| **`.context_click()`** | Clique com o botão **Direito** (abre menu). |
| **`.send_keys()`** | Digita um texto ou aperta uma tecla especial. |

**Lembrete:** Para o **Duplo** e o **Direito**, você sempre precisa do `.perform()` no final para a ação realmente acontecer.

## Selenium como Teste

O script apresentado é uma boa automação visual, mas não constitui um teste de software verdadeiro, que depende de validações manuais para confirmar resultados. Para profissionalizar a automação, será introduzido o uso do [Pytest](./02-pytest.md) e [Fixtures](./02b-fixtures.md). Com o Pytest, é possível usar o comando **assert** para validar automaticamente se o sistema se comporta conforme o esperado; caso a afirmação falhe, o teste é interrompido automaticamente.

```py title="test_pytest_simples.py"
import pytest
from pathlib import Path
from selenium import webdriver

@pytest.fixture
def navegador():
    driver = webdriver.Chrome()
    yield driver
    driver.quit()

def test_verificar_titulo_do_playground(navegador):
    
    pasta_atual = Path(__file__).parent.absolute()
    caminho_html = f"file://{pasta_atual}/playground.html" #(1)!
    
    navegador.get(caminho_html)
    
    assert navegador.title == "Playground Selenium"
```

1. O código utiliza um caminho para um arquivo HTML local na mesma pasta que o script de teste, em vez de acessar um site na Internet. O prefixo `file://` indica ao navegador para abrir um arquivo local.