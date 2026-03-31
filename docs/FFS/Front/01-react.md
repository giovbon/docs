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

<div class="code-explorer" data-src="../../zCODE/react1.txt" ></div>

Os atributos do JSX (como o `backgroundColor`) são semelhantes aos atributos HTML, mas com algumas diferenças importantes: 

- Os atributos de eventos em JSX seguem a convenção **camelCase**, como `onClick`, enquanto em HTML são escritos em minúsculas (`onclick`)... 
    - `class` do html é escrito de forma diferente em React: `className`.
- Alguns atributos são específicos do React e não têm equivalente direto no HTML.

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

    <div class="asciinema" data-src="../../zASC/01-react-vite-init.cast" data-speed="1" data-idle-time-limit="4" data-theme="tango"></div>

Estrutura de pastas do projeto:

- `node_modules` contém todos os pacotes e bibliotecas que seu projeto precisa para funcionar
- `public` ficam os arquivos estáticos que não precisam ser processados pelo Vite. Imagens, fontes, ou outros assets que você quer que o navegador acesse diretamente
- `src` é onde o código-fonte da aplicação React fica, aqui se encontram os componentes, estilos e toda a lógica do app. `App.jsx` é o componente "raiz" da aplicação, onde todos os outros componentes são aninhados. `App.css` é usado para definir os estilos CSS específicos do componente App.jsx. `index.css` contém estilos CSS globais que serão aplicados a toda a aplicação. `main.jsx` é o ponto de entrada principal da aplicação React, sendo o primeiro arquivo JavaScript a ser executado, e sua responsabilidade é "montar" a aplicação no navegador.
- `package.json` é o coração do projeto. Ele contém metadados como o nome e a versão do projeto, além de listar todas as dependências (os pacotes que o projeto usa) e scripts úteis (como o npm run dev para iniciar o servidor).
- `vite.config.js` é o arquivo de configuração específico do Vite. Nele, você pode adicionar plugins, definir caminhos de importação, configurar o servidor de desenvolvimento e muito mais.