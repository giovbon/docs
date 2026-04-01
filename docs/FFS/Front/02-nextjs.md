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

```bash
npx create-next-app@latest nome-do-proj --js --yes
cd nome-do-proj
npm run dev

# Ou no modo guiado

npx create-next-app@latest
```
!!! danger "Alerta"

    Para o curso crie o projeto em javascript ao invés de typscript.

??? example ":lucide-square-terminal: Iniciando projeto em Next.js"

    <div class="asciinema" data-src="../../zASC/02-nextjs-install.cast" data-speed="1.5" data-idle-time-limit="4" data-theme="tango"></div> 
