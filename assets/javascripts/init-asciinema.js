/**
 * Asciinema Initialization for Zensical/MkDocs
 * Integrates asciinema-player with support for external sources and inline JSON.
 */

(function () {
    // Utility to ensure asciinema-player is available
    function getAsciinemaPlayer() {
        return window.AsciinemaPlayer;
    }

    async function initAsciinema() {
        const AsciinemaPlayer = getAsciinemaPlayer();
        if (!AsciinemaPlayer) {
            console.warn('[Asciinema] AsciinemaPlayer library not found. Retrying in 500ms...');
            setTimeout(initAsciinema, 500);
            return;
        }

        const elements = document.querySelectorAll('.asciinema');

        elements.forEach(async (el) => {
            if (el.dataset.asciinemaInitialized) return;
            
            // Reveal.js PDF Export mode check
            const isPrinting = window.location.search.match(/print-pdf/gi);
            if (isPrinting) {
                el.classList.add('asciinema-print-mode');
                el.dataset.asciinemaInitialized = 'true';
                return; // Don't initialize player in PDF export mode
            }

            el.dataset.asciinemaInitialized = 'true';

            let src = el.getAttribute('data-src');
            let inlineData = null;

            // If no data-src, look for inline content
            if (!src) {
                const template = el.querySelector('script[type="application/json"], pre, code');
                if (template) {
                    let content = template.textContent;

                    // Decode HTML entities (like &quot; for ")
                    const txt = document.createElement('textarea');
                    txt.innerHTML = content;
                    content = txt.value;

                    // AsciinemaPlayer v3 expects inline data as a string in an object
                    // but we can also check if it's already a JSON object and stringify it back if needed
                    // Actually, if we just pass the raw content string, it's safer
                    inlineData = { data: content.trim(), type: 'asciicast' };
                }
            }

            if (!src && !inlineData) {
                console.warn('[Asciinema] No source or data found for element:', el);
                return;
            }

            // ... previous logic to clear and create container
            el.innerHTML = '';
            const playerContainer = document.createElement('div');
            el.appendChild(playerContainer);

            // ... options logic
            const options = {
                theme: el.getAttribute('data-theme') || 'asciinema',
                speed: parseFloat(el.getAttribute('data-speed')) || 1,
                idleTimeLimit: parseFloat(el.getAttribute('data-idle-time-limit')) || 2,
                poster: el.getAttribute('data-poster') || "npt:0:0", // Show first frame
                fit: el.getAttribute('data-fit') || 'width',
                fontSize: el.getAttribute('data-font-size') || 'medium',
            };

            try {
                // ... src logic
                if (src && src.match(/^\d+$/)) {
                    src = `https://asciinema.org/a/${src}.cast`;
                }

                AsciinemaPlayer.create(src || inlineData, playerContainer, options);
                console.log('[Asciinema] Player initialized', src ? `Source: ${src}` : 'Source: Inline Data');
            } catch (e) {
                console.error('[Asciinema] Initialization failed:', e);
                el.innerHTML = `<div style="color:red; padding: 10px;">Erro ao inicializar Asciinema: ${e.message}</div>`;
            }
        });
    }

    // Support for Zensical/MkDocs Material instant navigation
    if (typeof document$ !== "undefined") {
        document$.subscribe(function () {
            initAsciinema();
        });
    } else {
        document.addEventListener("DOMContentLoaded", initAsciinema);
    }
})();
