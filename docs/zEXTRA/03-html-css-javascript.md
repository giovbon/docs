---
hide:
  - navigation
---

# Frontend Basics

##  HTML :simple-html5:

HTML: ou _HyperText Markup Language_, é a linguagem padrão utilizada para criar e estruturar páginas na web. Ela permite que os desenvolvedores definam a estrutura do conteúdo, utilizando uma série de elementos e tags que organizam texto, imagens, links e outros recursos multimídia. Com HTML, é possível criar documentos que são interpretados pelos navegadores, permitindo a exibição de informações de forma interativa e acessível. Além disso, HTML é frequentemente utilizado em conjunto com CSS e JavaScript para aprimorar a apresentação e a funcionalidade das páginas web.

HTML5: é a quinta versão da linguagem de marcação HTML, que traz uma série de melhorias e novas funcionalidades em relação às versões anteriores. Lançado oficialmente em 2014, HTML5 introduz elementos semânticos que melhoram a estrutura e a acessibilidade do conteúdo, como `<header>`, `<footer>`, `<article>` e `<section>`. Além disso, HTML5 suporta nativamente multimídia, permitindo a incorporação de áudio e vídeo sem a necessidade de plugins externos, através das tags `<audio>` e `<video>`.

![](https://www.scientecheasy.com/wp-content/uploads/2023/02/html-elements.png)

A imagem mostra a estrutura de um elemento HTML de link (`<a>`), destacando suas partes: a *tag de abertura* (`<a>`), o *atributo* `href` com o valor do link (`"https://google.com"`), o *conteúdo visível* ("Google") e a *tag de fechamento* (`</a>`). Cada parte é identificada para ajudar a entender como os elementos HTML são formados.


```html
<!-- Comentários são envolvidos conforme essa linha! -->

<!-- #################### As Tags #################### -->

<!-- Aqui está um exemplo de arquivo HTML que iremos analisar. -->

<!doctype html>
	<html>
		<head>
			<title>Meu Site</title>
		</head>
		<body>
			<h1>Olá, mundo!</h1>
			<a href = "http://codepen.io/anon/pen/xwjLbZ">Venha ver como isso aparece</a>
			<p>Esse é um parágrafo.</p>
			<p>Esse é um outro parágrafo.</p>
			<ul>
				<li>Esse é um item de uma lista não enumerada (bullet list)</li>
				<li>Esse é um outro item</li>
				<li>E esse é o último item da lista</li>
			</ul>
		</body>
	</html>

<!-- Um arquivo HTML sempre inicia indicando ao navegador que é uma página HTML. -->
<!doctype html>

<!-- Após isso, inicia abrindo a tag <html>. -->
<html>

<!-- Essa tag deverá ser fechada ao final do arquivo com </html>. -->
</html>

<!-- Não deverá haver nada após o fechamento desta tag. -->

<!-- Entre a abertura e o fechamento das tags <html></html>, nós encontramos: -->

<!-- Um cabeçalho definido por <head> (deverá ser fechado com </head>). -->
<!-- O cabeçalho contém uma descrição e algumas informações adicionais que não serão exibidas; chamam-se metadados. -->

<head>
	<title>Meu Site</title><!-- Essa tag <title> indica ao navegador o título a ser exibido na barra de títulos e no nome da aba. -->
</head>

<!-- Após a seção <head>, nós encontramos a tag - <body> -->
<!-- Até esse ponto, nada descrito irá aparecer na janela do browser. -->
<!-- Nós deveremos preencher o body(corpo) com o conteúdo a ser exibido. -->
```

### Headings

Os headings são importantes para a estrutura do conteúdo e para a acessibilidade, pois ajudam na organização e na hierarquia das informações.

```html
<!-- O título principal da página, geralmente usado para o nome do documento -->
<h1>Título Principal (h1)</h1>

<!-- O segundo nível de título, usado para seções principais dentro do conteúdo -->
<h2>Subtítulo (h2)</h2>

<!-- O terceiro nível de título, usado para subseções dentro de um h2 -->
<h3>Subseção (h3)</h3>

<!-- O quarto nível de título, usado para detalhes adicionais dentro de um h3 -->
<h4>Detalhe (h4)</h4>

<!-- O quinto nível de título, usado para informações ainda mais específicas -->
<h5>Informação Específica (h5)</h5>

<!-- O sexto nível de título, o menor, usado para notas ou informações de menor importância -->
<h6>Nota (h6)</h6>
```

### Parágrafo e estilizações

Parágrafos `<p>` são usados para agrupar blocos de texto. Cada parágrafo é automaticamente separado por um espaço vertical, o que melhora a legibilidade.

```html
<!-- Parágrafo padrão -->
<p>Este é um parágrafo de texto. Os parágrafos são usados para agrupar blocos de texto e são criados com a tag p.</p>

<!-- Parágrafo com texto em negrito -->
<p>Este é um parágrafo com texto em <strong>negrito</strong> para destacar informações importantes.</p>

<!-- Parágrafo com texto em itálico -->
<p>Este parágrafo contém texto em <em>itálico</em>, que pode ser usado para ênfase ou para títulos de obras.</p>

<!-- Parágrafo com texto sublinhado -->
<p>Você pode também usar texto <u>sublinhado</u> para chamar a atenção para certas partes do texto.</p>

<!-- Parágrafo com texto de código -->
<p>Para exibir código, você pode usar a tag <code>code</code>, como neste exemplo: <code>console.log('Olá, mundo!');</code>.</p>

<!-- Parágrafo com múltiplas estilizações -->
<p>Além disso, você pode combinar estilos, como <strong>negrito</strong>, <em>itálico</em> e <code>código</code> em uma mesma frase.</p>
```

### Imagens e links

```html
<!-- Link (âncora) para outra página -->
<p>Para visitar o site do <a href="https://www.example.com" target="_blank">Example</a>, clique no link acima.</p>

<!-- Link (âncora) para uma seção na mesma página -->
<p>Você pode ir para a seção <a href="#seção">Seção</a> abaixo.</p>

<!-- Seção de exemplo -->
<h2 id="seção">Seção</h2>
<p>Esta é a seção para a qual você pode navegar usando o link acima.</p>

<!-- Imagem com link -->
<p>Veja a imagem abaixo:</p>
<a href="https://www.example.com">
		<img src="https://via.placeholder.com/150" alt="Imagem de Exemplo" />
</a>

<!-- Imagem sem link -->
<p>Esta é uma imagem sem link:</p>
<img src="https://via.placeholder.com/150" alt="Imagem de Exemplo" />
```

### Listas e tabelas

```html
<!-- Lista não ordenada -->
<h2>Lista Não Ordenada</h2>
<ul>
		<li>Item 1</li>
		<li>Item 2</li>
		<li>Item 3</li>
</ul>

<!-- Lista ordenada -->
<h2>Lista Ordenada</h2>
<ol>
		<li>Primeiro Item</li>
		<li>Segundo Item</li>
		<li>Terceiro Item</li>
</ol>

<!-- Lista de definição -->
<h2>Lista de Definição</h2>
<dl>
		<dt>HTML</dt>
		<dd>Linguagem de Marcação de Hipertexto usada para criar páginas da web.</dd>
		<dt>CSS</dt>
		<dd>Folha de Estilo em Cascata, usada para estilizar páginas da web.</dd>
		<dt>JavaScript</dt>
		<dd>Linguagem de programação usada para criar interatividade em páginas da web.</dd>
</dl>


<!-- Início da tabela -->
<table border="1"> <!-- Atributo 'border' define a borda da tabela -->
		<thead> <!-- Cabeçalho da tabela -->
				<tr> <!-- Linha do cabeçalho -->
						<th>ID</th> <!-- Célula do cabeçalho -->
						<th>Nome</th>
						<th>Email</th>
				</tr>
		</thead>
		<tbody> <!-- Corpo da tabela -->
				<tr> <!-- Linha de dados -->
						<td>1</td> <!-- Célula de dados -->
						<td>João Silva</td>
						<td>joao.silva@email.com</td>
				</tr>
				<tr> <!-- Outra linha de dados -->
						<td>2</td>
						<td>Maria Oliveira</td>
						<td>maria.oliveira@email.com</td>
				</tr>
		</tbody>
</table> 
<!-- Fim da tabela -->
```

### Elementos semânticos e não semânticos
Landmarks são elementos semânticos que ajudam a estruturar uma página da web, facilitando a navegação e a acessibilidade. Eles permitem que os usuários e tecnologias assistivas (como leitores de tela) identifiquem rapidamente as diferentes seções de uma página.

*Elementos semânticos* são aqueles que têm um significado claro e específico, tanto para os desenvolvedores quanto para os navegadores e tecnologias assistivas. Eles ajudam a descrever a estrutura e o conteúdo da página de forma mais significativa. Melhoram a acessibilidade, SEO (otimização para mecanismos de busca) e a manutenção do código, pois tornam a estrutura da página mais clara.

Aqui está uma lista dos principais landmarks (marcos) em HTML, com uma breve definição para cada um:

- *`<header>`*: Define o cabeçalho de uma página ou seção. Geralmente contém o título, logotipo e links de navegação.

- *`<nav>`*: Usado para agrupar links de navegação. Pode estar presente em qualquer parte da página, como no cabeçalho ou rodapé.

- *`<main>`*: Representa o conteúdo principal da página. Deve haver apenas um `<main>` por página e deve conter o conteúdo que é diretamente relacionado ao tema da página.

- *`<section>`*: Define seções temáticas dentro do conteúdo. Cada seção pode ter seu próprio título e conteúdo, ajudando a organizar a informação.

- *`<article>`*: Usado para encapsular conteúdo independente que pode ser distribuído ou reutilizado, como postagens de blog, notícias ou comentários.

- *`<aside>`*: Representa conteúdo relacionado, mas não essencial, ao conteúdo principal. Geralmente usado para barras laterais, notas ou links adicionais.

- *`<footer>`*: Define o rodapé de uma página ou seção. Geralmente contém informações de copyright, links de contato e outras informações relevantes.

- *`<figure>`*: Usado para encapsular conteúdo ilustrativo, como imagens, gráficos ou diagramas, que pode ter uma legenda associada.

- *`<figcaption>`*: Usado para fornecer uma legenda para o conteúdo dentro de um `<figure>`.

*Elementos não semânticos* são aqueles que não têm um significado específico e não descrevem o conteúdo que contêm. Eles são usados principalmente para estilização e layout, sem fornecer informações sobre o tipo de conteúdo. Embora úteis para layout e estilização, devem ser usados com moderação, pois não fornecem informações sobre o conteúdo.

- `<div>`: Usado como um contêiner genérico para agrupar outros elementos, sem significado semântico.
- `<span>`: Usado para agrupar texto ou outros elementos em linha, sem significado semântico.

### Formulários

Os formulários em HTML são essenciais no desenvolvimento web, pois permitem a coleta de dados dos usuários, como informações pessoais e feedback. Eles são utilizados para autenticação e registro de usuários, possibilitando login e criação de contas. Além disso, os formulários facilitam a interação com os usuários por meio de pesquisas, enquetes e comentários, e são fundamentais em transações online, coletando informações de pagamento e envio em sites de e-commerce.

```html
<!-- Início do formulário -->
<form action="/submit" method="POST">
		<!-- Campo de texto para o nome -->
		<label for="nome">Nome:</label>
		<input type="text" id="nome" name="nome" required>
		<!-- O atributo 'required' torna este campo obrigatório -->

		<!-- Campo de e-mail -->
		<label for="email">E-mail:</label>
		<input type="email" id="email" name="email" required>
		<!-- O tipo 'email' valida o formato do e-mail -->

		<!-- Campo de senha -->
		<label for="senha">Senha:</label>
		<input type="password" id="senha" name="senha" required>
		<!-- O tipo 'password' oculta a entrada do usuário -->

		<!-- Botão de envio do formulário -->
		<button type="submit">Enviar</button>
</form>
<!-- Fim do formulário -->
```

- O atributo `action` especifica para onde os dados do formulário serão enviados quando o usuário clicar no botão de envio. O atributo `method` define o método HTTP a ser usado (neste caso, POST).
- O elemento `<label>` fornece uma descrição para os campos do formulário. O atributo `for` deve corresponder ao `id` do campo de entrada associado.
- O elemento `<input>` é usado para criar campos de entrada. O tipo de entrada é definido pelo atributo `type`, que pode ser `text`, `email`, `password`, entre outros. O atributo `required` indica que o campo deve ser preenchido antes do envio. 
- O elemento `<button>` cria um botão que, quando clicado, envia o formulário.

## CSS :simple-css:

CSS: ou _Cascading Style Sheets_, é uma linguagem de estilo utilizada para descrever a apresentação e o layout de documentos HTML. Com CSS, os desenvolvedores podem controlar aspectos visuais das páginas web, como cores, fontes, espaçamentos, tamanhos e posicionamento de elementos. Através de regras de estilo, é possível aplicar design consistente em múltiplas páginas, facilitando a manutenção e a atualização do visual de um site. CSS também permite a criação de layouts responsivos, que se adaptam a diferentes tamanhos de tela, melhorando a experiência do usuário em dispositivos variados. @NFP_CSS

_Style Sheets_ em CSS são as regras que dizem como o HTML deve aparecer na tela. Ou seja, elas definem o visual do site: cores, tamanhos, fontes, espaçamentos, alinhamentos, etc.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxmZ1AHFadA1wOEKbimXrYLQnQFzF-0tPOBA&s)

A imagem mostra a estrutura de uma regra CSS. O *seletor* `.my-css-rule` indica quais elementos serão afetados, no caso a classe `my-css-rule`. Dentro das chaves `{}`, temos *declarações*, compostas por uma *propriedade* (como `color`) e um *valor* (`beige`), separados por dois-pontos e finalizados com ponto e vírgula. Cada declaração define um estilo a ser aplicado aos elementos selecionados.

_Cascading_, ou cascata, significa que várias regras podem afetar o mesmo elemento, e há uma ordem de prioridade para saber qual regra vence. Essa hierarquia depende de:

- Especificidade (id > classe > tag)
- Ordem das regras (a última geralmente vence se o nível for igual)
- Importância (regra com `!important` vence tudo)

Em relação à *especificidade*, quanto mais específico o seletor, mais prioridade ele tem.

Ordem de força (do mais fraco pro mais forte):

+ Seletor de elemento, ex: `div`, `p`
+ Classe `.classe`, pseudo-classes `:hover`
+ Atributos `[type="text"]`
+ ID `#id`
+ Estilo inline `style="..."`
+ `!important` vence tudo, mas deve ser evitado.

Quando múltiplas regras têm a mesma especificidade, o navegador aplica a última regra lida no CSS.

*3 formas de usar CSS dentro do HTML*:
```html
<!-- Você precisa incluir o arquivo css dentro da tag <head>. Esse é o
     método recomendado. -->
<link rel="stylesheet" type="text/css" href="path/to/style.css" />

<!-- Você também pode incluir alguns CSS inline no seu HTML, dentro da tag <head> -->
<style>
    a { color: purple; }
</style>

<!-- Ou definir propriedades CSS diretamente no elemento. -->
<div style="border: 1px solid red;">
</div>
```

### Classes e ids 

Classes: é um atributo que pode ser atribuído a um ou mais elementos para agrupar e aplicar estilos de forma consistente. As classes são definidas usando o atributo HTML `class` e podem ser reutilizadas em diferentes elementos dentro de uma página. No CSS, as classes são selecionadas usando um ponto (`.`) seguido do nome da classe. Isso permite que múltiplos elementos compartilhem o mesmo estilo, facilitando a manutenção e a consistência visual do design.

IDs: é um atributo que identifica de forma única um único elemento em uma página HTML. Cada ID deve ser exclusivo dentro do documento, o que significa que _não pode haver dois elementos com o mesmo ID_. Os IDs são definidos usando o atributo HTML `id` e, no CSS, são selecionados usando o símbolo de hash (`#`) seguido do nome do ID. Essa exclusividade permite que os IDs sejam usados para aplicar estilos específicos a um único elemento ou para manipulação via JavaScript, tornando-os úteis para interações dinâmicas e estilizações personalizadas.

```html
<head>
			...
    <style>
        /* Estilo para elementos com a classe 'destacado' */
        .destacado {
            color: blue; /* Texto azul */
            font-weight: bold; /* Texto em negrito */
        }

        /* Estilo para o elemento com o ID 'titulo' */
        #titulo {
            font-size: 24px; /* Tamanho da fonte maior */
            text-align: center; /* Alinhamento centralizado */
        }
    </style>
</head>
<body>

    <h1 id="titulo">Exemplo de Classes e IDs</h1> <!-- ID 'titulo' para estilização específica -->

    <p class="destacado">Este é um parágrafo destacado.</p> <!-- Classe 'destacado' para estilização em grupo -->
    <p>Este é um parágrafo normal.</p>

    <p class="destacado">Outro parágrafo destacado.</p> <!-- Outro uso da classe 'destacado' -->

</body>
```

### Propriedades

Abaixo as propriedades mais comuns do CSS com explicações. Para uma lista extensiva de todas as propriedades do css veja a [documentação](https://www.w3schools.com/cssref/index.php).

```css
/* Agrupamento de propriedades CSS por usos comuns */

/* 1. Propriedades de Layout */
.container {
    display: flex; /* Define o contêiner como um flex container */
    flex-direction: row; /* Alinha os itens em uma linha */
    justify-content: space-between; /* Distribui espaço entre os itens */
    align-items: center; /* Alinha os itens verticalmente ao centro */
}

/* 2. Propriedades de Tamanho */
.box {
    width: 100px; /* Largura fixa de 100 pixels */
    height: 100px; /* Altura fixa de 100 pixels */
    max-width: 100%; /* Largura máxima de 100% do contêiner pai */
    min-height: 50px; /* Altura mínima de 50 pixels */
}

/* 3. Propriedades de Cor e Fundo */
.text {
    color: #333; /* Cor do texto em hexadecimal */
    background-color: rgba(255, 255, 255, 0.8); /* Fundo branco com opacidade */
}

/* 4. Propriedades de Fonte */
.title {
    font-family: 'Arial', sans-serif; /* Fonte Arial ou sans-serif como fallback */
    font-size: 24px; /* Tamanho da fonte de 24 pixels */
    font-weight: bold; /* Texto em negrito */
    line-height: 1.5; /* Altura da linha de 1.5 vezes o tamanho da fonte */
}

/* 5. Propriedades de Margem e Preenchimento */
.element {
    margin: 10px; /* Margem de 10 pixels em todos os lados */
    padding: 15px; /* Preenchimento interno de 15 pixels em todos os lados */
}

/* 6. Propriedades de Bordas */
.box-border {
    border: 2px solid #000; /* Borda sólida de 2 pixels de largura e cor preta */
    border-radius: 5px; /* Bordas arredondadas com raio de 5 pixels */
}

/* 7. Propriedades de Exibição e Visibilidade */
.hidden {
    display: none; /* Oculta o elemento */
}

.visible {
    visibility: visible; /* Torna o elemento visível */
}

```
### Layout e alinhamento

Os *elementos block* ocupam toda a largura disponível de seu contêiner, criando uma nova linha antes e depois deles. Isso significa que, ao adicionar um elemento block, ele empurra os elementos subsequentes para baixo. Exemplos comuns de elementos block incluem `<div> <p> <h1>  <ul> <section>`. Esses elementos são frequentemente usados para estruturar o layout de uma página.

Os *elementos inline*, por outro lado, ocupam apenas a largura necessária para seu conteúdo e não criam quebras de linha antes ou depois. Isso permite que múltiplos elementos inline apareçam na mesma linha, lado a lado. Exemplos de elementos inline incluem `<span> <a> <strong> <img>`. Eles são geralmente usados para estilizar partes do texto ou para inserir pequenos elementos dentro de um bloco maior.

Várias propriedades CSS podem ser utilizadas para controlar o layout e o alinhamento de elementos:

- `display: inline-block;` permite que elementos sejam exibidos lado a lado, como elementos inline, mas também aceita propriedades de largura e altura, como elementos block.
- `float` pode ser usada para posicionar elementos à esquerda ou à direita dentro de um contêiner, permitindo que o texto e outros elementos flutuem ao redor deles.
- `margin` pode ser usado para criar espaço entre os elementos. A margem automática (margin: auto;) pode centralizar elementos block dentro de um contêiner.
- `position` (com valores como relative, absolute, e fixed) permite posicionar elementos em relação a seus contêineres ou à viewport, oferecendo controle sobre o layout.
- `width` e `height` definem explicitamente a largura e a altura dos elementos pode ajudar a controlar o layout, embora não ofereça a flexibilidade dinâmica do Flexbox.
- `text-align` servem para alinhar elementos inline ou inline-block horizontalmente dentro de um contêiner, a propriedade text-align pode ser utilizada.
- `vertical-align` é usada para alinhar elementos inline ou inline-block verticalmente em relação a outros elementos na mesma linha.

### Pseudo classes e pseudo elementos

Pseudo-classes:  são utilizadas para definir o estado de um elemento com base em sua interação ou posição em relação a outros elementos. Elas permitem aplicar estilos a elementos que não podem ser selecionados diretamente por seus seletores normais.

```css
/* :hover - Aplica estilos quando o mouse está sobre o elemento */
a:hover {
    color: blue; /* Muda a cor do texto para azul ao passar o mouse */
}

/* :active - Aplica estilos quando o elemento está sendo clicado */
button:active {
    background-color: green; /* Muda o fundo do botão para verde enquanto é clicado */
}

/* :focus - Aplica estilos quando o elemento está em foco (por exemplo, um campo de entrada) */
input:focus {
    border: 2px solid orange; /* Adiciona uma borda laranja ao campo de entrada em foco */
}

/* :nth-child(n) - Aplica estilos ao enésimo filho de um elemento pai */
li:nth-child(2) {
    font-weight: bold; /* Torna o segundo item da lista em negrito */
}

/* :first-child - Aplica estilos ao primeiro filho de um elemento pai */
p:first-child {
    font-size: 20px; /* Aumenta o tamanho da fonte do primeiro parágrafo */
}

/* :last-child - Aplica estilos ao último filho de um elemento pai */
div:last-child {
    margin-bottom: 20px; /* Adiciona uma margem inferior ao último div */
}

/* :not(selector) - Aplica estilos a elementos que não correspondem ao seletor especificado */
div:not(.active) {
    opacity: 0.5; /* Torna todos os divs que não têm a classe 'active' semi-transparentes */
}
``` 

Pseudo-elementos: são usados para estilizar partes específicas de um elemento, permitindo que os desenvolvedores apliquem estilos a seções que não podem ser acessadas diretamente através de seletores normais.

```css
/* ::before - Insere conteúdo antes do conteúdo de um elemento */
h1::before {
    content: "Título: "; /* Adiciona "Título: " antes do texto do h1 */
    color: gray; /* Muda a cor do texto inserido para cinza */
}

/* ::after - Insere conteúdo após o conteúdo de um elemento */
p::after {
    content: " [Fim]"; /* Adiciona " [Fim]" após o texto do parágrafo */
    font-style: italic; /* Aplica estilo itálico ao texto inserido */
}

/* ::first-line - Aplica estilos à primeira linha de um bloco de texto */
p::first-line {
    font-weight: bold; /* Torna a primeira linha do parágrafo em negrito */
    color: blue; /* Muda a cor da primeira linha para azul */
}

/* ::first-letter - Aplica estilos à primeira letra de um bloco de texto */
p::first-letter {
    font-size: 2em; /* Aumenta o tamanho da fonte da primeira letra */
    float: left; /* Faz a primeira letra flutuar à esquerda */
    margin-right: 0.1em; /* Adiciona uma margem à direita da primeira letra */
}

/* ::selection - Aplica estilos ao texto selecionado pelo usuário */
::selection {
    background-color: yellow; /* Muda a cor de fundo do texto selecionado para amarelo */
    color: black; /* Muda a cor do texto selecionado para preto */
}
```

### Box Model
/ Modelo de caixa: (_box model_) do CSS é um conceito que descreve como os elementos são representados na página web, considerando cada elemento como uma "caixa" composta por quatro partes principais: conteúdo (_Content_), preenchimento (_Padding_), borda (_Border_) e margem (_Margin_). 


![](https://hermes.dio.me/articles/cover/bc77d880-2cfa-4f01-81b5-012f08d572d3.png)

```css
/* Estilo para um elemento com o modelo de caixa */
.box {
    /* Define a largura e altura do conteúdo */
    width: 300px; /* Largura do conteúdo */
    height: 200px; /* Altura do conteúdo */
    
    /* Define o preenchimento interno */
    padding: 20px; /* Espaço entre o conteúdo e a borda */
    
    /* Define a borda */
    border: 5px solid #000; /* 5 pixels de largura, sólida e preta */
    
    /* Define a margem externa */
    margin: 30px; /* Espaço entre a borda e outros elementos */
    
    /* Define a cor de fundo */
    background-color: #f0f0f0; /* Cor de fundo da caixa */
}

/* Estilo para um texto dentro da caixa */
.box p {
    /* Define a cor do texto */
    color: #333; /* Cor do texto */
    
    /* Define o tamanho da fonte */
    font-size: 16px; /* Tamanho da fonte */
}
```
Para compreensão visual veja esse [guia](https://css.guidee.org/docs/boxmodel).

### Media queries

Media queries: são uma técnica do CSS que permite aplicar estilos diferentes a um documento com base em características específicas do dispositivo, como largura, altura, resolução e orientação da tela. Elas são fundamentais para o design responsivo, pois possibilitam que desenvolvedores ajustem a apresentação de um site ou aplicativo para diferentes tamanhos de tela, garantindo uma experiência de usuário otimizada em dispositivos móveis, tablets e desktops. Com as media queries, é possível alterar propriedades de estilo, como tamanhos de fonte, cores e layouts, dependendo das condições definidas, promovendo assim uma interface mais adaptável e acessível.

Essa técnica é muito comum para tornar um site *responsivo*, ajustando margens, tamanhos e espaçamentos conforme o tamanho da tela do dispositivo.

![](https://iqratechnology.com/wp-content/uploads/2023/10/Basic-Syntax-of-a-Media-Query-1024x537.png.webp)

A imagem mostra um exemplo de media query em CSS, que é usada para aplicar estilos diferentes com base em características da tela, como a largura.

- `@media screen and (min-width: 900px)`
  Esta linha define uma *media query* que será aplicada *apenas em telas* (`screen`) com largura *mínima de 900 pixels*. Ou seja, os estilos dentro desse bloco só terão efeito em dispositivos com tela grande (como desktops).
- `article`
  É o seletor do elemento que receberá o estilo.
-  `padding: 1rem 3rem;`
  Define o preenchimento interno do elemento `article`:
   - `1rem` no *eixo vertical* (topo e base)
   - `3rem` no *eixo horizontal* (esquerda e direita)


```css
/* Estilo padrão para todos os dispositivos */
body {
    font-family: Arial, sans-serif; /* Define a fonte padrão */
    background-color: white; /* Cor de fundo padrão */
    color: black; /* Cor do texto padrão */
}

/* Media query para dispositivos com largura máxima de 600px */
@media (max-width: 600px) {
    body {
        background-color: lightblue; /* Muda a cor de fundo para azul claro em telas pequenas */
        color: darkblue; /* Muda a cor do texto para azul escuro */
    }

    h1 {
        font-size: 24px; /* Reduz o tamanho da fonte do título em telas pequenas */
    }
}

/* Media query para dispositivos com largura mínima de 601px e máxima de 1200px */
@media (min-width: 601px) and (max-width: 1200px) {
    body {
        background-color: lightgreen; /* Muda a cor de fundo para verde claro em telas médias */
        color: darkgreen; /* Muda a cor do texto para verde escuro */
    }

    h1 {
        font-size: 32px; /* Aumenta o tamanho da fonte do título em telas médias */
    }
}

/* Media query para dispositivos com largura mínima de 1201px */
@media (min-width: 1201px) {
    body {
        background-color: lightcoral; /* Muda a cor de fundo para coral em telas grandes */
        color: white; /* Muda a cor do texto para branco */
    }

    h1 {
        font-size: 40px; /* Aumenta ainda mais o tamanho da fonte do título em telas grandes */
    }
}

```

### Flexbox

Flexbox: ou Flexible Box Layout, é um modelo de layout do CSS que facilita o alinhamento e a distribuição de espaço entre itens em um container, mesmo quando seu tamanho é desconhecido ou dinâmico. Ele facilita a distribuição de espaço entre os itens de um contêiner, permitindo que esses itens se ajustem automaticamente ao tamanho do contêiner e se alinhem de maneira flexível, tanto na direção horizontal quanto vertical. Com propriedades como `flex-direction`, `justify-content` e `align-items`, o Flexbox oferece controle preciso sobre o alinhamento, a ordem e o dimensionamento dos elementos, tornando-o uma ferramenta poderosa para o design de interfaces modernas.


No Flexbox, o *parent* é o elemento pai que recebe a propriedade `display: flex` ou `display: inline-flex`. Ele se torna um *flex container*, o que significa que passa a controlar o layout dos seus elementos filhos com base nas regras do modelo Flexbox. A partir desse ponto, o container pode definir a direção (`flex-direction`), a quebra de linha (`flex-wrap`), o alinhamento dos itens no eixo principal (`justify-content`) e no eixo cruzado (`align-items` e `align-content`), além de controlar o comportamento geral do espaço interno.

Os *children* são os elementos filhos diretos do flex container. Ao estarem dentro de um elemento com `display: flex`, eles se tornam *flex items* automaticamente e passam a obedecer às regras do Flexbox. Cada item pode ser ajustado individualmente com propriedades como `flex-grow`, `flex-shrink` e `flex-basis` (ou resumidamente com `flex`), além de poderem mudar sua ordem com `order` e seu alinhamento específico com `align-self`. Esses filhos são os blocos visuais que se reorganizam conforme o espaço disponível e as regras do container.

Exemplo contextualizado:

```html
<body>
    <div class="estante"> <!-- parent -->
        <!-- childrens -->
        <div class="livro">Livro 1</div>
        <div class="livro livro-maior">Livro 2 (Maior)</div>
        <div class="livro">Livro 3</div>
    </div>
</body>
```

```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 20px;
}

.estante {
    display: flex; /* A estante é um flex container */
    flex-direction: row; /* Os livros ficam em linha */
    justify-content: space-between; /* Espaço igual entre os livros */
    align-items: flex-start; /* Alinha os livros no topo */
    background-color: #fff;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.livro {
    background-color: #e0e0e0;
    padding: 20px;
    margin: 5px;
    border-radius: 3px;
    flex-grow: 1; /* Todos os livros crescem igualmente */
    text-align: center;
}

.livro-maior {
    flex-grow: 2; /* Este livro ocupa mais espaço */
}
```

Assim podemos ver que há tanto para parent como children propriedades específicas. Para uma compreensão mais visual do que elas fazem veja esse [guia](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). 

### Grid

CSS Grid: é um sistema de layout bidimensional que permite organizar elementos em linhas e colunas de forma precisa e flexível. Ao aplicar `display: grid` em um container, ele se torna um *grid container* e pode definir a estrutura da grade com propriedades como `grid-template-columns`, `grid-template-rows` e `gap`. Os elementos filhos, chamados *grid items*, se posicionam dentro dessa malha e podem ocupar uma ou mais células, sendo controlados com propriedades como `grid-column`, `grid-row`, `justify-self` e `align-self`. O Grid facilita a criação de layouts complexos e responsivos com clareza e controle total sobre o espaço.

O *Grid Container* é o elemento HTML pai ao qual se aplica `display: grid` (ou `inline-grid`). Esse container cria uma estrutura bidimensional, ou seja, uma malha de linhas e colunas, definida por propriedades como `grid-template-columns`, `grid-template-rows`, `grid-gap` e `grid-auto-flow`. A partir do momento em que o estilo é aplicado, o container passa a controlar não só a disposição horizontal dos elementos, como também a vertical — permitindo criar layouts complexos de forma mais semântica e flexível que métodos tradicionais como `float` ou posicionamento absoluto ([w3schools.com][1]).

Os *Grid Items* são os elementos filhos diretos do grid container. Cada um deles ocupa uma célula ou bloco na grade, podendo ser posicionados e dimensionados com precisão usando propriedades como `grid-column-start`, `grid-column-end`, `grid-row-start` e `grid-row-end`. Além disso, os itens podem se estender por múltiplas linhas e colunas (spanning), responder a redes implícitas, e ajustar seu comportamento com `justify-self` e `align-self`, conferindo grande controle na criação de layouts responsivos e detalhados.

Para uma compreensão mais visual do que as propriedades do grid fazem veja esse [guia](https://css-tricks.com/snippets/css/complete-guide-grid/). 

## Tailwind :simple-tailwindcss:

Frameworks CSS:  são bibliotecas pré-definidas de estilos e componentes que facilitam o desenvolvimento de interfaces web, proporcionando uma base estruturada e consistente para a criação de layouts e design. Eles oferecem um conjunto de classes e estilos prontos para uso, permitindo que os desenvolvedores implementem rapidamente elementos como botões, formulários, grids e navegação, sem a necessidade de escrever CSS do zero. Além disso, muitos frameworks incluem funcionalidades responsivas, que ajudam a garantir que os sites se adaptem a diferentes tamanhos de tela. Exemplos populares de frameworks CSS incluem Bootstrap, Foundation e Bulma, que são amplamente utilizados para acelerar o processo de desenvolvimento e melhorar a eficiência na criação de aplicações web.

Tailwind CSS: é um framework _utility-first_ do CSS que oferece uma extensa coleção de classes pré-definidas, cada uma focada em uma única propriedade CSS, permitindo estilizar elementos diretamente no HTML/JSX sem a necessidade de criar CSS separado ou nomes de classes customizadas. Ele utiliza convenções como `bg-blue-500`, `text-white`, `flex`, `items-center`, `rounded-full`, etc., para aplicar rapidamente estilos comuns. Esse modelo reduz a complexidade dos estilos, facilita a criação de interfaces responsivas e otimiza o tamanho final do CSS, pois apenas as classes usadas são geradas.

Há várias [formas de instalar](https://tailwindcss.com/docs/installation) o Tailwind. A mais fácil é por CDN, por apenas adicionar esse `script` no html:

```html
<!doctype html>
<html>  
   <head>    
      ... 
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>  
   </head>
   ...
```

Depois de incluir o Tailwind, você pode começar a estilizar seus elementos HTML usando as classes utilitárias do Tailwind. Aqui está um exemplo de como criar um botão estilizado:

```html
<body class="bg-gray-100 flex items-center justify-center h-screen">
    <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
        Clique Aqui
    </button>
</body>
```

- `bg-gray-100`: Define a cor de fundo do corpo como um cinza claro.
- `flex items-center justify-center h-screen`: Utiliza Flexbox para centralizar o botão vertical e horizontalmente na tela.
- `bg-blue-500`: Define a cor de fundo do botão como azul.
- `text-white`: Define a cor do texto do botão como branco.
- `font-bold`: Aplica um estilo de fonte em negrito ao texto do botão.
- `py-2 px-4`: Adiciona padding vertical (py) e horizontal (px) ao botão.
- `rounded`: Aplica bordas arredondadas ao botão.
- `hover:bg-blue-700`: Muda a cor de fundo do botão para um azul mais escuro quando o mouse passa sobre ele.

Utilize a [documentação](https://tailwindcss.com/docs) para saber como utilizar todas as classes estilizadoras do Tailwind.

## Javascript :simple-javascript:

JavaScript: é uma linguagem de programação amplamente utilizada para adicionar interatividade e dinamismo às páginas web. Ele permite que os desenvolvedores criem funcionalidades como animações, validação de formulários, manipulação de elementos da página e comunicação assíncrona com servidores, tudo isso diretamente no navegador do usuário. JavaScript é uma linguagem orientada a objetos e baseada em eventos, o que facilita a criação de aplicações web interativas e responsivas. Além disso, com o advento de bibliotecas e frameworks como React, Angular e Vue.js, JavaScript se tornou uma ferramenta essencial no desenvolvimento de aplicações web modernas, permitindo a construção de interfaces de usuário complexas e eficientes. @NFP_JS

ECMAScript:  é um padrão de linguagem de programação que serve como base para várias linguagens, sendo o JavaScript a mais conhecida e amplamente utilizada. Desenvolvido pela ECMA International, o ECMAScript define a sintaxe, tipos de dados, estruturas de controle, objetos e métodos que compõem a linguagem. O padrão é atualizado periodicamente, com novas versões introduzindo melhorias e funcionalidades, como o ES5, que trouxe suporte a JSON e métodos de array, e o ES6, que adicionou recursos como classes, módulos e funções de seta. O objetivo do ECMAScript é garantir a interoperabilidade entre diferentes implementações da linguagem, promovendo um ambiente de desenvolvimento mais consistente e robusto.

ES6: também conhecido como ECMAScript 2015, é uma versão do padrão ECMAScript que introduziu uma série de melhorias e novas funcionalidades ao JavaScript, visando tornar a linguagem mais poderosa e fácil de usar. Entre as principais características do ES6 estão a introdução de variáveis com escopo de bloco através das palavras-chave `let` e `const`, a sintaxe de funções de seta (arrow functions), classes, módulos, e a desestruturação de objetos e arrays. Além disso, o ES6 trouxe melhorias na manipulação de strings, promessas para tratamento assíncrono, e novas APIs, como o `Map` e o `Set`, ampliando significativamente as capacidades da linguagem e facilitando o desenvolvimento de aplicações mais complexas.

Case-sensitive: Diferencia letras maiúsculas de minúsculas.

Comentários: Usam `//` para uma linha ou `/* */` para múltiplas linhas.

### Variáveis e escopo

```js 
// Declaração de variáveis em JavaScript

// 1. Variáveis com 'var'
// 'var' é uma forma antiga de declarar variáveis. 
// O escopo de uma variável declarada com 'var' é a função em que ela foi definida ou, se não estiver dentro de uma função, o escopo global.
var globalVar = "Eu sou uma variável global";

function exemploVar() {
    var localVar = "Eu sou uma variável local";
    console.log(globalVar); // Acessa a variável global
    console.log(localVar);   // Acessa a variável local
}

exemploVar();
// console.log(localVar); // Isso causaria um erro, pois localVar não está acessível fora da função

// 2. Variáveis com 'let'
// 'let' é uma forma moderna de declarar variáveis. 
// O escopo de uma variável declarada com 'let' é o bloco em que ela foi definida.
let blocoVar = "Eu sou uma variável de bloco";

if (true) {
    let blocoVar = "Eu sou uma variável de bloco dentro do if";
    console.log(blocoVar); // Acessa a variável de bloco dentro do if
}

console.log(blocoVar); // Acessa a variável de bloco fora do if

// 3. Variáveis com 'const'
// 'const' é usado para declarar constantes, ou seja, variáveis cujo valor não pode ser alterado.
// O escopo de uma variável declarada com 'const' também é o bloco em que ela foi definida.
const constante = "Eu sou uma constante";

if (true) {
    const constante = "Eu sou uma constante dentro do if";
    console.log(constante); // Acessa a constante dentro do if
}

console.log(constante); // Acessa a constante fora do if

// Resumo sobre escopo:
// - 'var' tem escopo de função ou global.
// - 'let' e 'const' têm escopo de bloco, ou seja, são acessíveis apenas dentro do bloco em que foram definidos.
```

### Operadores
- Aritméticos: `+ - * / % `
- Comparação: `== === != !== < > <= >=`
- Lógicos: `&& || !`
- Atribuição: `= += -=`, etc.

```js
// Operadores em JavaScript

// 1. Operadores Lógicos
// Os operadores lógicos são usados para combinar expressões booleanas.

let a = true;
let b = false;

// AND (&&): Retorna true se ambos os operandos forem true
console.log(a && b); // false

// OR (||): Retorna true se pelo menos um dos operandos for true
console.log(a || b); // true

// NOT (!): Inverte o valor booleano
console.log(!a); // false
console.log(!b); // true

// 2. Diferença entre '==' e '==='
// '==' (igualdade solta): Compara valores, mas não considera o tipo
console.log(5 == '5'); // true, pois apenas compara o valor

// '===' (igualdade estrita): Compara valores e tipos
console.log(5 === '5'); // false, pois os tipos são diferentes (number vs string)

// 3. Diferença entre '!=' e '!=='
// '!=' (desigualdade solta): Compara valores, mas não considera o tipo
console.log(5 != '5'); // false, pois apenas compara o valor

// '!==' (desigualdade estrita): Compara valores e tipos
console.log(5 !== '5'); // true, pois os tipos são diferentes

// 4. Operadores de Incremento e Atribuição
let x = 10;

// Incremento (++)
x++; // Equivalente a x = x + 1
console.log(x); // 11

// Decremento (--)
x--; // Equivalente a x = x - 1
console.log(x); // 10

// Atribuição com adição (+=)
x += 5; // Equivalente a x = x + 5
console.log(x); // 15

// Atribuição com subtração (-=)
x -= 3; // Equivalente a x = x - 3
console.log(x); // 12

// Atribuição com multiplicação (*=)
x *= 2; // Equivalente a x = x * 2
console.log(x); // 24

// Atribuição com divisão (/=)
x /= 4; // Equivalente a x = x / 4
console.log(x); // 6
```

### Estrutura de controle
- Condicionais: `if` `else` `else if` `switch`
- Laços: `for` `while` `do...while` `for...of` (para arrays) `for...in` (para objetos)

```js
// Estrutura 'else if'
let nota = 75;

if (nota >= 90) {
    console.log("Aprovado com Distinção");
} else if (nota >= 70) {
    console.log("Aprovado");
} else {
    console.log("Reprovado");
}

// Estrutura 'switch'
let diaDaSemana = 3; // 1: Domingo, 2: Segunda, 3: Terça, ...

switch (diaDaSemana) {
    case 1:
        console.log("Domingo");
        break;
    case 2:
        console.log("Segunda-feira");
        break;
    case 3:
        console.log("Terça-feira");
        break;
    default:
        console.log("Dia inválido");
}

// Laço 'for'
for (let i = 0; i < 5; i++) {
    console.log(i); // Imprime os números de 0 a 4
}

// Laço 'while'
let j = 0;
while (j < 5) {
    console.log(j); // Imprime os números de 0 a 4
    j++;
}

// Laço 'do...while'
let k = 0;
do {
    console.log(k); // Imprime os números de 0 a 4
    k++;
} while (k < 5);

// Laço 'for...of' (para arrays)
let frutas = ["maçã", "banana", "laranja"];
for (let fruta of frutas) {
    console.log(fruta); // Imprime cada fruta no array
}

// Laço 'for...in' (para objetos)
let pessoa = { nome: "João", idade: 30, cidade: "São Paulo" };
for (let chave in pessoa) {
    console.log(`${chave}: ${pessoa[chave]}`); // Imprime cada chave e valor do objeto
}
```
 
### Funções
```js
// Declarações tradicionais
function soma(a, b) {
  return a + b;
}

// Funções anônimas e atribuídas a variáveis
const soma = function(a, b) {
  return a + b;
}

// Arrow functions (ES6)
const soma = (a, b) => a + b;
```
### Arrays

```js
/// Arrays em JavaScript

// 1. Criação de um array
let frutas = ["maçã", "banana", "laranja", "uva"];

// 2. Acesso a elementos do array
console.log(frutas[0]); // Acessa o primeiro elemento: "maçã"
console.log(frutas[2]); // Acessa o terceiro elemento: "laranja"

// 3. Modificação de elementos do array
frutas[1] = "manga"; // Altera "banana" para "manga"
console.log(frutas); // ["maçã", "manga", "laranja", "uva"]

// 4. Métodos de arrays

// 4.1. push(): Adiciona um ou mais elementos ao final do array
frutas.push("kiwi");
console.log(frutas); // ["maçã", "manga", "laranja", "uva", "kiwi"]

// 4.2. pop(): Remove o último elemento do array e o retorna
let ultimaFruta = frutas.pop();
console.log(ultimaFruta); // "kiwi"
console.log(frutas); // ["maçã", "manga", "laranja", "uva"]

// 4.3. shift(): Remove o primeiro elemento do array e o retorna
let primeiraFruta = frutas.shift();
console.log(primeiraFruta); // "maçã"
console.log(frutas); // ["manga", "laranja", "uva"]

// 4.4. unshift(): Adiciona um ou mais elementos ao início do array
frutas.unshift("morango");
console.log(frutas); // ["morango", "manga", "laranja", "uva"]

// 4.5. splice(): Adiciona ou remove elementos em uma posição específica
// Remove 1 elemento a partir do índice 1 (manga)
frutas.splice(1, 1); // Remove "manga"
console.log(frutas); // ["morango", "laranja", "uva"]

// 4.6. slice(): Retorna uma cópia de uma parte do array
let algumasFrutas = frutas.slice(0, 2); // Retorna elementos do índice 0 ao 1
console.log(algumasFrutas); // ["morango", "laranja"]

// 4.7. forEach(): Executa uma função para cada elemento do array
frutas.forEach(function(fruta) {
    console.log(fruta); // Imprime cada fruta
});

// 4.8. map(): Cria um novo array com os resultados da chamada de uma função para cada elemento
let frutasEmCaixas = frutas.map(function(fruta) {
    return fruta + " em caixa"; // Adiciona " em caixa" a cada fruta
});
console.log(frutasEmCaixas); // ["morango em caixa", "laranja em caixa", "uva em caixa"]

// 4.9. filter(): Cria um novo array com todos os elementos que passam no teste da função
let frutasComA = frutas.filter(function(fruta) {
    return fruta.includes("a"); // Filtra frutas que contêm a letra "a"
});
console.log(frutasComA); // ["laranja", "uva"]

// 4.10. find(): Retorna o primeiro elemento que satisfaz a condição
let frutaEncontrada = frutas.find(function(fruta) {
    return fruta.startsWith("l"); // Encontra a primeira fruta que começa com "l"
});
console.log(frutaEncontrada); // "laranja"
```

### Objetos 

```js
// Objetos em JavaScript

// 1. Criação de um objeto
let pessoa = {
    nome: "João",
    idade: 30,
    cidade: "São Paulo",
    profissao: "Desenvolvedor",
    // Método do objeto
    apresentar: function() {
        console.log(`Olá, meu nome é ${this.nome} e eu sou ${this.profissao}.`);
    }
};

// 2. Acesso a propriedades do objeto
console.log(pessoa.nome); // Acessa a propriedade 'nome'
console.log(pessoa["idade"]); // Acessa a propriedade 'idade' usando notação de colchetes

// 3. Modificação de propriedades do objeto
pessoa.idade = 31; // Altera a idade
console.log(pessoa.idade); // 31

// 4. Adição de novas propriedades
pessoa.email = "joao@example.com"; // Adiciona uma nova propriedade 'email'
console.log(pessoa.email); // "joao@example.com"

// 5. Remoção de propriedades
delete pessoa.cidade; // Remove a propriedade 'cidade'
console.log(pessoa.cidade); // undefined

// 6. Chamando um método do objeto
pessoa.apresentar(); // "Olá, meu nome é João e eu sou Desenvolvedor."

// 7. Objetos aninhados
let carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2020,
    proprietario: {
        nome: "Maria",
        idade: 28
    }
};

// Acesso a propriedades aninhadas
console.log(carro.proprietario.nome); // "Maria"

// 8. Iterando sobre as propriedades de um objeto
for (let chave in pessoa) {
    console.log(`${chave}: ${pessoa[chave]}`); // Imprime cada chave e valor do objeto
}

// 9. Object.keys(), Object.values() e Object.entries()
console.log(Object.keys(pessoa)); // Retorna um array com as chaves do objeto
console.log(Object.values(pessoa)); // Retorna um array com os valores do objeto
console.log(Object.entries(pessoa)); // Retorna um array de pares [chave, valor]
```
### ES6

ES6: ou ECMAScript 2015, é uma versão do padrão ECMAScript que introduziu uma série de melhorias e novas funcionalidades ao JavaScript, visando tornar a linguagem mais poderosa e fácil de usar. Entre as principais adições estão as classes, que permitem uma abordagem orientada a objetos mais clara; módulos, que facilitam a organização do código; arrow functions, que simplificam a sintaxe de funções; e promises, que melhoram o tratamento de operações assíncronas. Além disso, o ES6 trouxe melhorias na manipulação de arrays e objetos, como o spread operator e destructuring, tornando o desenvolvimento em JavaScript mais eficiente e legível.

```js 
// Exemplo de Classes
class Animal {
    constructor(nome) {
        this.nome = nome;
    }

    // Método da classe
    falar() {
        console.log(`${this.nome} faz barulho.`);
    }
}

const cachorro = new Animal('Rex');
cachorro.falar(); // Saída: Rex faz barulho.

// Exemplo de Módulos (supondo que este código esteja em um arquivo separado)
export const pi = 3.14; // Exportando uma constante
export function soma(a, b) { // Exportando uma função
    return a + b;
}

// Exemplo de Arrow Functions
const quadrado = (x) => x * x;
console.log(quadrado(5)); // Saída: 25

// Exemplo de Promises
const promessa = new Promise((resolve, reject) => {
    const sucesso = true; // Simulando uma condição
    if (sucesso) {
        resolve('Operação bem-sucedida!');
    } else {
        reject('Erro na operação.');
    }
});

promessa
    .then((resultado) => console.log(resultado)) // Saída: Operação bem-sucedida!
    .catch((erro) => console.log(erro));

// Exemplo de Spread Operator
const numeros = [1, 2, 3];
const maisNumeros = [...numeros, 4, 5]; // Adicionando novos elementos
console.log(maisNumeros); // Saída: [1, 2, 3, 4, 5]

// Exemplo de Destructuring
const pessoa = {
    nome: 'João',
    idade: 30
};

const { nome, idade } = pessoa; // Extraindo propriedades do objeto
console.log(nome); // Saída: João
console.log(idade); // Saída: 30
```

### DOM

DOM: ou _Document Object Model_ é uma interface de programação que representa documentos HTML e XML como uma estrutura de árvore, onde cada elemento do documento é um objeto que pode ser manipulado por linguagens de programação, como JavaScript. Essa estrutura permite que desenvolvedores acessem e modifiquem o conteúdo, a estrutura e o estilo de uma página web de forma dinâmica, possibilitando a criação de interações e atualizações em tempo real. O DOM é fundamental para o desenvolvimento web, pois fornece uma maneira padronizada de interagir com o conteúdo da página, facilitando a manipulação de elementos, atributos e eventos.

Elementos no DOM: são representações estruturais de documentos HTML e XML, permitindo que linguagens de programação, como JavaScript, interajam com a estrutura da página. Cada elemento, como `<div>`, `<p>`, `<a>`, entre outros, é um nó na árvore do DOM, que pode ser acessado e manipulado para alterar o conteúdo, estilo e comportamento da página. O DOM é dinâmico, permitindo que os desenvolvedores adicionem, removam ou modifiquem elementos em tempo real, proporcionando uma experiência interativa ao usuário.

O objeto _document_ é a entrada principal para o DOM em uma página web. Ele representa o documento HTML ou XML carregado no navegador e fornece uma interface para acessar e manipular o conteúdo da página. Através do objeto _document_, é possível interagir com todos os elementos da página, permitindo a criação de aplicações web dinâmicas.

#### Seleção

Selecionar elementos no DOM é uma parte fundamental do desenvolvimento web. Aqui estão algumas das principais formas de fazer isso usando JavaScript:

- `getElementById` seleciona um elemento pelo seu atributo `id`.

```javascript
// Seleciona o elemento com o id "meuElemento"
const elemento = document.getElementById('meuElemento');

// Exibe o conteúdo do elemento no console
console.log(elemento.innerHTML);
```

- `getElementsByClassName` seleciona todos os elementos que possuem uma determinada classe. Retorna uma coleção de elementos.

```javascript
// Seleciona todos os elementos com a classe "minhaClasse"
const elementos = document.getElementsByClassName('minhaClasse');

// Itera sobre a coleção e exibe o conteúdo de cada elemento
for (let i = 0; i < elementos.length; i++) {
    console.log(elementos[i].innerHTML);
}
```

- `getElementsByTagName` seleciona todos os elementos de um tipo específico (tag).

```javascript
// Seleciona todos os elementos <p> no documento
const paragrafos = document.getElementsByTagName('p');

// Itera sobre a coleção e exibe o texto de cada parágrafo
for (let i = 0; i < paragrafos.length; i++) {
    console.log(paragrafos[i].textContent);
}
```

- `querySelector` seleciona o primeiro elemento que corresponde a um seletor CSS.

```javascript
// Seleciona o primeiro elemento com a classe "minhaClasse"
const primeiroElemento = document.querySelector('.minhaClasse');

// Exibe o conteúdo do primeiro elemento encontrado
console.log(primeiroElemento.innerHTML);
```

- `querySelectorAll` seleciona todos os elementos que correspondem a um seletor CSS. Retorna uma NodeList #footnote("Uma NodeList é uma coleção de nós do DOM, incluindo elementos HTML e nós de texto, retornada por métodos como querySelectorAll. Ela permite acesso por índice e é iterável, mas não possui métodos de array.").

```javascript
// Seleciona todos os elementos <div> com a classe "minhaClasse"
const divs = document.querySelectorAll('div.minhaClasse');

// Itera sobre a NodeList e exibe o conteúdo de cada div
divs.forEach(div => {
    console.log(div.innerHTML);
});
```

- `children` acessa todos os filhos diretos de um elemento.

```javascript
// Seleciona um elemento pai
const pai = document.getElementById('pai');

// Acessa todos os filhos diretos do elemento pai
const filhos = pai.children;

// Itera sobre os filhos e exibe seus conteúdos
for (let i = 0; i < filhos.length; i++) {
    console.log(filhos[i].innerHTML);
}
```

#### Manipulações

Além de selecionar elementos, existem várias operações essenciais que você deve conhecer para manipular o DOM de forma eficaz. Aqui estão algumas das mais importantes:

Você pode criar novos elementos e adicioná-los ao DOM.

```javascript
// Cria um novo elemento <div>
const novaDiv = document.createElement('div');
novaDiv.textContent = 'Olá, mundo!';

// Adiciona a nova div ao corpo do documento
document.body.appendChild(novaDiv);
```

É possível alterar o conteúdo, atributos e estilos dos elementos existentes.

```javascript
// Seleciona um elemento e altera seu conteúdo
const elemento = document.getElementById('meuElemento');
elemento.textContent = 'Conteúdo atualizado!';

// Altera um atributo
elemento.setAttribute('class', 'novaClasse');

// Modifica o estilo
elemento.style.color = 'blue';
```

Você pode remover elementos do DOM.

```javascript
// Seleciona um elemento e o remove
const elementoParaRemover = document.getElementById('removerEste');
elementoParaRemover.remove();
```

Manipular classes é fundamental para aplicar estilos e efeitos.

```javascript
// Adiciona uma classe
elemento.classList.add('novaClasse');

// Remove uma classe
elemento.classList.remove('classeAntiga');

// Alterna uma classe
elemento.classList.toggle('classeAlternativa');
```

Você pode navegar entre elementos irmãos, pais e filhos.

```javascript
// Acessa o pai de um elemento
const pai = elemento.parentNode;

// Acessa os filhos
const filhos = pai.children;

// Acessa o próximo elemento irmão
const proximoIrmao = elemento.nextElementSibling;
```

Você pode clonar elementos existentes.

```javascript
// Clona um elemento
const clone = elemento.cloneNode(true); // true para clonar também os filhos

// Adiciona o clone ao DOM
document.body.appendChild(clone);
```

Você pode aplicar estilos diretamente ou manipular classes CSS.

```javascript
// Aplica um estilo diretamente
elemento.style.backgroundColor = 'yellow';

// Alternativamente, você pode adicionar uma classe que contém estilos
elemento.classList.add('estiloPersonalizado');
```

Manipular elementos de formulário, como inputs e botões, é crucial para interações do usuário.

```javascript
// Seleciona um input e obtém seu valor
const input = document.querySelector('input[type="text"]');
const valor = input.value;

// Define um novo valor para o input
input.value = 'Novo valor';
```

#### Event Listeners

Event listeners: são funções que aguardam e respondem a eventos específicos em elementos do DOM, como cliques, movimentos do mouse, teclas pressionadas e muito mais. Quando um evento ocorre, o listener associado a esse evento é acionado, permitindo que o desenvolvedor execute uma ação, como alterar o conteúdo da página, enviar dados para um servidor ou iniciar animações. Essa abordagem facilita a criação de interfaces interativas e responsivas, melhorando a experiência do usuário.

Para adicionar um event listener, utiliza-se o método `addEventListener`, que permite especificar o tipo de evento a ser monitorado e a função a ser executada quando o evento ocorre.

Existem muitos tipos de eventos que você pode escutar, incluindo:

- Mouse Events: `click`, `dblclick`, `mouseover`, `mouseout`, `mousemove`
- Keyboard Events: `keydown`, `keyup`, `keypress`
- Form Events: `submit`, `change`, `input`, `focus`, `blur`
- Window Events: `load`, `resize`, `scroll`

Você pode adicionar um listener a um elemento usando o método `addEventListener`.

```javascript
// Seleciona um botão e adiciona um listener de clique
const botao = document.getElementById('meuBotao');
botao.addEventListener('click', () => {
    alert('Botão clicado!');
});
```

Se necessário, você pode remover um listener usando `removeEventListener`. Para isso, você deve passar a mesma função que foi usada para adicioná-lo.

```javascript
// Define a função do listener
const minhaFuncao = () => {
    alert('Botão clicado!');
};

// Adiciona o listener
botao.addEventListener('click', minhaFuncao);

// Remove o listener
botao.removeEventListener('click', minhaFuncao);
```

Quando um evento ocorre, um objeto de evento é criado e passado para a função do listener. Esse objeto contém informações sobre o evento.

```javascript
botao.addEventListener('click', (evento) => {
    console.log(evento); // Exibe informações sobre o evento
    console.log(evento.target); // O elemento que disparou o evento
});
```

Mais códigos com exemplos do uso:

```javascript
// Seleciona um elemento do DOM
const button = document.getElementById('meuBotao');

// Função que será chamada quando o evento ocorrer
function handleClick(event) {
    // 'event' contém informações sobre o evento
    console.log('Botão clicado!', event);
}

// Adiciona um listener de evento ao botão
// 'click' é o tipo de evento que estamos ouvindo
button.addEventListener('click', handleClick);

// Exemplo de remoção de um listener de evento
function handleMouseOver(event) {
    console.log('Mouse sobre o botão!');
}

// Adiciona um listener para o evento 'mouseover'
button.addEventListener('mouseover', handleMouseOver);

// Para remover o listener, precisamos referenciar a mesma função
button.removeEventListener('mouseover', handleMouseOver);

// Exemplo de eventos de teclado
document.addEventListener('keydown', function(event) {
    // Verifica se a tecla pressionada é a tecla 'Enter'
    if (event.key === 'Enter') {
        console.log('Tecla Enter pressionada!');
    }
});

// Exemplo de eventos de formulário
const input = document.getElementById('meuInput');

// Adiciona um listener para o evento 'input' no campo de texto
input.addEventListener('input', function(event) {
    console.log('Valor do input:', event.target.value);
});

// Exemplo de eventos de janela
window.addEventListener('resize', function() {
    console.log('A janela foi redimensionada!');
});

// Exemplo de eventos de toque (touch events) para dispositivos móveis
const touchArea = document.getElementById('areaDeToque');

touchArea.addEventListener('touchstart', function(event) {
    console.log('Toque detectado!');
});

// Exemplo de eventos de mouse
button.addEventListener('mousedown', function(event) {
    console.log('Botão do mouse pressionado!');
});

button.addEventListener('mouseup', function(event) {
    console.log('Botão do mouse solto!');
});
```