---
icon: simple/react
hide:
  - navigation
---


# React :simple-react:

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../zSLIDES/01-react-intro.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

## Componente

```js title="App.js"
import MeuBotao from "./Componentes/Botao1";

export default function App() {
  return (
    <div className="App">
      <h1>Componentes do React</h1>

      <MeuBotao // (1)!
        texto="Componente intância do componente MeuBotao"
        bgcor="blue"
        cor="white"
      />
      <br />
      <MeuBotao texto="Outro botão" bgcor="red" cor="white" /> /* (2)! */
    </div>
  );
}
```

1. Enviando 3 props para este componente: texto, bgcor e cor
2. Reutilizando o componente com outras propriedades

```js title="MeuBotao.jsx"
import React from "react";

export default function MeuBotao({ texto, bgcor, cor }) { // (2)!
  /* (1)! */
  return (
    <button style={{ backgroundColor: bgcor, color: cor }}>{texto}</button>
  );
}

```

1. A área entre a definição da função e o `return` é o "cérebro" do componente, onde você processa dados, define estados com `useState` e cria funções de lógica antes de renderizar o visual
2. Recebe 3 propriedades de forma desestruturada, sem ela ficaria: `MeuBotao( props )` com as props sendo acessadas com `props.bgcor`

Os atributos do JSX (como o `backgroundColor`) são semelhantes aos atributos HTML, mas com algumas diferenças importantes: 

- Os atributos de eventos em JSX seguem a convenção **camelCase**, como `onClick`, enquanto em HTML são escritos em minúsculas (`onclick`)... 
    - `class` do html é escrito de forma diferente em React: `className`.
- Alguns atributos são específicos do React e não têm equivalente direto no HTML.

## Estados

Cada componente pode ter seu próprio estado, que é gerenciado frequentemente com o hook `useState`, permitindo declarar uma variável de estado e uma função para atualizá-la.

```js hl_lines="4 8-9" title="Contador.jsx"
import React, { useState } from 'react';

function Contador() {
  const [contador, setContador] = useState(0);  //(1)!

  return (
    <div>
      <p>Contagem: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}
```

1. O uso de `useState` envolve declarar uma variável de estado (`contador`) e uma função para atualizá-la (`setContador`) além do estado inicial (`useState(0)`)

---

<iframe src="https://codesandbox.io/embed/xvskdc?view=editor+%2B+preview&module=%2Fsrc%2FComponentes%2FBotao1.jsx"
     style="width:100%; height: 500px; border:0; border-radius: 4px; overflow:hidden;"
     title="react-impacta-aula"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## Criação de Projeto React com Vite

[Vite](https://vite.dev/) é capaz de criar um ambiente de desenvolvimento já configurado e otimizado para a criação de aplicativos com React.

Comandos (Certifique-se de ter o Node.js instalado):

```bash
npm create vite@latest
cd nome-app-react
npm install
npm run dev
```

??? example ":lucide-square-terminal: Criação de projeto react com vite"

    <div class="asciinema" data-src="../../zASC/01-react-init-vite.cast" data-speed="1" data-idle-time-limit="4" data-theme="tango"></div>

Estrutura de pastas do projeto:

```bash
├── node_modules #(1)!
├── public #(2)!
│   └── vite.sgv
├── src #(3)!
│   └── ...
├── .gitignore
├── eslint.config.js
├── index.html #(4)!
├── package-lock.json
├── package.json #(5)!
├── public
│   └── vite.svg
├── src
│   ├── App.css
│   ├── App.jsx
│   ├── assets
│   │   └── react.svg
│   ├── index.css
│   └── main.jsx
└── vite.config.js #(6)!
```

1. `node_modules` contém todos os pacotes e bibliotecas que seu projeto precisa para funcionar
2. `public` ficam os arquivos estáticos que não precisam ser processados pelo Vite. Imagens, fontes, ou outros assets que você quer que o navegador acesse diretamente
3. `src` é onde o código-fonte da aplicação React fica, aqui se encontram os componentes, estilos e toda a lógica do app. `App.jsx` é o componente "raiz" da aplicação, onde todos os outros componentes são aninhados. `App.css` é usado para definir os estilos CSS específicos do componente App.jsx. `index.css` contém estilos CSS globais que serão aplicados a toda a aplicação. `main.jsx` é o ponto de entrada principal da aplicação React, sendo o primeiro arquivo JavaScript a ser executado, e sua responsabilidade é "montar" a aplicação no navegador.
4. `index.html` é a página web principal da sua aplicação. O Vite usa esse arquivo como um template para carregar o aplicativo React no navegador. Note que o React "injeta" seu código dentro de um elemento `<div id="root">` que está nesse arquivo.
5. `package.json` é o coração do projeto. Ele contém metadados como o nome e a versão do projeto, além de listar todas as dependências (os pacotes que o projeto usa) e scripts úteis (como o npm run dev para iniciar o servidor).
6. `vite.config.js` é o arquivo de configuração específico do Vite. Nele, você pode adicionar plugins, definir caminhos de importação, configurar o servidor de desenvolvimento e muito mais.