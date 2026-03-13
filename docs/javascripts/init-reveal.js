function initReveal() {
    const revealContainers = document.querySelectorAll('.reveal');
    revealContainers.forEach(container => {
        // Ignora se já foi inicializado
        if (container.classList.contains('reveal-initialized')) return;
        container.classList.add('reveal-initialized');

        const isPrinting = window.location.search.match(/print-pdf/gi);

        if (isPrinting) {
            // 1. Esconde a estrutura do tema para não interferir na impressão
            const themeContainer = document.querySelector('.md-container') || document.querySelector('.md-layout');
            if (themeContainer) themeContainer.style.display = 'none';
            
            // 2. Move os slides para o topo (body) para o Reveal.js assumir controle total
            document.body.appendChild(container);

            // 3. CSS para garantir isolamento e fundo limpo
            const style = document.createElement('style');
            style.innerHTML = `
                body, html { 
                    overflow: visible !important; 
                    height: auto !important; 
                    margin: 0 !important;
                    padding: 0 !important;
                    background: #191919 !important;
                    color: #fff !important;
                }
                header, footer, .md-header, .md-footer, .md-sidebar, .md-tabs {
                    display: none !important;
                }
                .reveal-viewport {
                    background: #191919 !important;
                }
                .reveal table {
                    width: 100% !important;
                    max-width: 100% !important;
                    font-size: 0.60em !important;
                    line-height: 1.2 !important;
                    border-collapse: collapse !important;
                    margin: 0 !important;
                }
                .reveal table th {
                    text-align: left !important;
                    color: #ffb932 !important; /* Mantém a cor de destaque se houver */
                }
                .reveal table th, .reveal table td {
                    padding: 4px 8px !important;
                    word-break: break-word !important;
                    border: 1px solid rgba(255,255,255,0.1) !important;
                }
                .reveal table code {
                    font-size: 0.9em !important;
                    padding: 0 2px !important;
                    background: rgba(255,255,255,0.05) !important;
                    border: none !important;
                }
            `;
            document.head.appendChild(style);
        }

        let deck = new Reveal(container, {
            plugins: [RevealMarkdown, RevealHighlight],
            embedded: !isPrinting,
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

        // Botão PDF discreto apenas na capa
        const pdfBtn = document.createElement('button');
        pdfBtn.innerHTML = 'PDF';
        pdfBtn.style.position = 'absolute';
        pdfBtn.style.bottom = '15px';
        pdfBtn.style.left = '125px'; // Ao lado do botão "Tela Cheia"
        pdfBtn.style.zIndex = '1000';
        pdfBtn.style.background = 'rgba(0,0,0,0.2)';
        pdfBtn.style.color = 'rgba(255,255,255,0.5)';
        pdfBtn.style.border = 'none';
        pdfBtn.style.padding = '5px 8px';
        pdfBtn.style.borderRadius = '3px';
        pdfBtn.style.cursor = 'pointer';
        pdfBtn.style.fontSize = '12px';
        pdfBtn.title = "Baixar PDF (Abre em nova aba)";

        // Atualiza visibilidade baseado no slide atual
        const updatePdfVisibility = (indices) => {
            pdfBtn.style.display = (indices.h === 0 && indices.v === 0) ? 'block' : 'none';
        };

        deck.on('ready', () => updatePdfVisibility(deck.getIndices()));
        deck.on('slidechanged', event => updatePdfVisibility({ h: event.indexh, v: event.indexv }));

        pdfBtn.addEventListener('click', () => {
            const url = new URL(window.location.href);
            url.searchParams.set('print-pdf', '');
            window.open(url.href, '_blank');
        });

        pdfBtn.addEventListener('mouseover', () => {
            pdfBtn.style.background = 'rgba(0,0,0,0.5)';
            pdfBtn.style.color = 'white';
        });
        pdfBtn.addEventListener('mouseout', () => {
            pdfBtn.style.background = 'rgba(0,0,0,0.2)';
            pdfBtn.style.color = 'rgba(255,255,255,0.5)';
        });

        container.appendChild(pdfBtn);
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
