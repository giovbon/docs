---
icon: simple/nextdotjs
hide:
  - navigation
---


# Next.js :simple-nextdotjs:

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../zSLIDES/02-nextjs.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? abstract "Referências"

    - [Getting Started: Installation | Next.js](https://nextjs.org/docs/app/getting-started/installation)
    - [Entendendo os métodos de renderização do Next.js: SSR, CSR, SSG e ISR | por Narayanan Sundaram | Medium](https://medium.com/@narayanansundar02/understanding-next-js-rendering-methods-ssr-csr-ssg-and-isr-7764dedabbe6)


## Criação do projeto em Next.js

!!! danger "Alerta"

    Para o curso crie o projeto em javascript ao invés de typscript.

```bash
npx create-next-app@latest nome-do-proj --js --yes
cd nome-do-proj
npm run dev

# Ou no modo guiado

npx create-next-app@latest
```

??? example ":lucide-square-terminal: Iniciando projeto em Next.js (2 formas)"

    <div class="asciinema" data-src="../../zASC/02-nextjs-install.cast" data-speed="1.5" data-idle-time-limit="4" data-theme="tango"></div> 

## Estratégias de renderização

![](https://miro.medium.com/v2/resize:fit:1400/1*qtbY8twpsF6WBghrpz4fXg.png)

### Server-Side Rendering (SSR) - Renderização no Lado do Servidor
**O que é e o que faz:**
No SSR, o HTML da página é gerado no **servidor** no momento exato em que o usuário faz a requisição. O servidor busca os dados necessários no banco de dados, monta a página HTML completa e a envia pronta para o navegador. 
- **Vantagens:** Excelente para SEO (os motores de busca leem o conteúdo imediatamente) e garante que o usuário sempre veja os dados mais atualizados.
- **Desvantagens:** Pode ser mais lento que enviar um arquivo estático, pois o servidor precisa trabalhar a cada clique do usuário.

**Exemplo simples:** Um site de notícias (como o G1 ou CNN). Quando você acessa a página inicial, o servidor busca as últimas notícias de última hora no banco de dados, monta o HTML da capa e envia para o seu navegador. Cada usuário que acessa pode receber uma versão ligeiramente diferente se uma nova notícia acabou de ser publicada.

### Static Site Generation (SSG) - Geração de Site Estático
**O que é e o que faz:**
No SSG, o HTML de todas as páginas é gerado antecipadamente, durante o **tempo de build** (quando o código é compilado para ir ao ar), e não quando o usuário pede. O servidor apenas guarda esses arquivos HTML prontos e os entrega instantaneamente para qualquer pessoa que acessar.
- **Vantagens:** É extremamente rápido e barato de hospedar, pois o servidor não faz nenhum processamento pesado, apenas entrega arquivos. Ótimo para SEO.
- **Desvantagens:** Se você quiser mudar um texto no site, precisa rodar o processo de *build* novamente para gerar novos arquivos HTML.

**Exemplo simples:** O seu blog pessoal ou uma documentação de software. O conteúdo raramente muda. Quando você escreve um novo artigo, você compila o site, gerando um novo arquivo `meu-artigo.html`. Todos os milhares de visitantes baixarão exatamente o mesmo arquivo.

### Client-Side Rendering (CSR) - Renderização no Lado do Cliente
**O que é e o que faz:**
No CSR, o servidor envia um arquivo HTML praticamente vazio (geralmente só com uma tag `<div id="root"></div>`) e um grande arquivo JavaScript. É o **navegador do usuário** (o cliente) que executa esse JavaScript, busca os dados via API e constrói toda a interface (botões, textos, imagens) diretamente na tela.
- **Vantagens:** Após o carregamento inicial, a navegação entre as páginas é instantânea, criando a sensação de um aplicativo nativo (as famosas Single Page Applications - SPAs).
- **Desvantagens:** O SEO inicial é prejudicado (os robôs do Google veem uma página em branco até o JS rodar) e o carregamento inicial pode ser lento em celulares mais fracos.

**Exemplo simples:** O Spotify na versão Web ou um painel administrativo financeiro. O Google não precisa indexar o seu painel logado. O servidor envia o código da aplicação e o seu navegador vai desenhando os gráficos e as listas de músicas conforme o JavaScript vai puxando as informações das APIs.

### Incremental Static Regeneration (ISR) - Geração Estática Incremental
**O que é e o que faz:**
O ISR é uma evolução mágica do SSG popularizada por frameworks como o Next.js. Ele permite que você **atualize páginas estáticas específicas em background**, sem precisar fazer o *build* do site inteiro. Você define um tempo de expiração (ex: 60 segundos). Após esse tempo, o próximo usuário que acessar a página verá a versão antiga, mas isso acionará o servidor para recriar apenas aquela página nos bastidores. O usuário seguinte já verá a página atualizada.
- **Vantagens:** Junta a velocidade extrema do SSG com a capacidade de manter dados atualizados quase como o SSR.

**Exemplo simples:** A página de um produto em um grande e-commerce. Você quer que ela carregue em milissegundos (SSG). Mas o preço do produto pode mudar. Usando ISR com um limite de 60 segundos: a página é estática. Se o preço mudar, por 1 minuto as pessoas ainda veem o preço velho. O primeiro acesso após 1 minuto recebe a página velha, mas engatilha a recriação. Segundos depois, a página estática foi substituída pela nova com o preço novo, sem derrubar ou reconstruir as outras milhões de páginas da loja.

---

### Comparativo de Estratégias de Renderização Web

| Estratégia | Onde / Quando o HTML é gerado? | Principal Vantagem | Principal Desvantagem | Exemplo Clássico |
| :--- | :--- | :--- | :--- | :--- |
| **SSR** (Server-Side) | No servidor, **no momento exato** do pedido do utilizador. | SEO excelente e dados sempre 100% atualizados. | Maior carga no servidor; tempo de resposta (TTFB) mais lento. | Sites de notícias (ex: G1, CNN). |
| **SSG** (Static Site) | No servidor, **durante o build** (compilação do projeto). | Performance extrema e custo de alojamento muito baixo. | Necessita de um novo build para qualquer alteração de conteúdo. | Blogs e documentação técnica. |
| **CSR** (Client-Side) | No navegador, **em tempo de execução**, via JavaScript. | Navegação instantânea após o load inicial (experiência de app). | SEO inicial prejudicado e demora no carregamento em dispositivos lentos. | Dashboards e Spotify Web. |
| **ISR** (Incremental) | No servidor, atualizando o conteúdo **em background** após um tempo limite. | Rapidez do SSG com a flexibilidade de atualização do SSR. | O primeiro visitante após a expiração ainda vê dados antigos. | Páginas de produto em grandes E-commerces. |