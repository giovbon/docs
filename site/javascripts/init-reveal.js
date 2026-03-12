function initReveal() {
    const revealContainers = document.querySelectorAll('.reveal');
    revealContainers.forEach(container => {
        // Ignora se já foi inicializado
        if (container.classList.contains('reveal-initialized')) return;
        container.classList.add('reveal-initialized');

        let deck = new Reveal(container, {
            plugins: [RevealMarkdown, RevealHighlight],
            embedded: true,
            hash: false,
            keyboard: true,
            progress: true,
            controls: true,
            slideNumber: true,
            highlight: {
                lineNumbers: true
            }
        });

        deck.on('ready', event => {
            if (typeof hljs !== 'undefined') {
                hljs.initLineNumbersOnLoad({
                    singleLine: true
                });
            }
        });

        deck.initialize();

        // Garante que o container tenha position relative para o botão ficar no lugar certo
        container.style.position = 'relative';

        const btn = document.createElement('button');
        btn.innerHTML = '⛶ Tela Cheia';
        btn.style.position = 'absolute';
        btn.style.bottom = '15px';
        btn.style.left = '15px';
        btn.style.zIndex = '1000';
        btn.style.background = 'rgba(0,0,0,0.5)';
        btn.style.color = 'white';
        btn.style.border = 'none';
        btn.style.padding = '8px 12px';
        btn.style.borderRadius = '5px';
        btn.style.cursor = 'pointer';
        btn.style.fontFamily = 'inherit';
        btn.style.fontSize = '14px';
        btn.title = "Alternar Tela Cheia";

        btn.addEventListener('click', () => {
            if (!document.fullscreenElement) {
                container.requestFullscreen().catch(err => {
                    console.error(`Erro ao ativar tela cheia: ${err.message}`);
                });
            } else {
                document.exitFullscreen();
            }
        });

        container.appendChild(btn);
    });
}

// O Zensical (MkDocs Material) tem a funcionalidade de "Navegação Instantânea" (SPA).
// Assim, o DOMContentLoaded ocorre só na primeira vez.
// Por isso, precisamos amarrar o evento na troca de páginas do Zensical também:
if (typeof document$ !== "undefined") {
    document$.subscribe(function () {
        initReveal();
    });
} else {
    document.addEventListener("DOMContentLoaded", initReveal);
}
