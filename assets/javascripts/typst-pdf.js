let typstCompiler = null;

// Global function to generate and download Typst PDF
window.gerarPDFTypst = async function(typPath) {
    const btnEl = document.activeElement;
    const originalText = btnEl ? btnEl.innerHTML : "";
    const originalStyle = btnEl ? btnEl.style.cssText : "";
    
    try {
        if (btnEl && btnEl.tagName === 'A') {
            btnEl.disabled = true;
            // Add a simple SVG spinner to the button
            btnEl.innerHTML = '<svg style="width: 1em; height: 1em; vertical-align: middle; margin-right: 0.5em; animation: typst-spin 1s linear infinite" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4V2A10 10 0 0 0 2 12h2a8 8 0 0 1 8-8z"/></svg> Gerando PDF...';
            btnEl.style.pointerEvents = "none";
            btnEl.style.opacity = "0.7";
            
            // Add keyframes for the spinner if not already present
            if (!document.getElementById('typst-spinner-style')) {
                const style = document.createElement('style');
                style.id = 'typst-spinner-style';
                style.textContent = '@keyframes typst-spin { 100% { transform: rotate(360deg); } }';
                document.head.appendChild(style);
            }
        }

        if (!typstCompiler) {
            // Determine base URL from script tag or fallback safely
            const scriptTag = document.querySelector('script[src*="typst-pdf.js"]');
            const baseUrl = scriptTag ? scriptTag.src : window.location.origin + '/javascripts/typst-pdf.js';
            
            // 1. Fully robust module resolution
            let typstModule = null;
            const modulePaths = [
                new URL('./typst/snippet.bundle.mjs', baseUrl).href,
                new URL('../../javascripts/typst/snippet.bundle.mjs', window.location.href).href,
                new URL('../../../javascripts/typst/snippet.bundle.mjs', window.location.href).href,
                new URL('../../../../javascripts/typst/snippet.bundle.mjs', window.location.href).href,
                new URL('/javascripts/typst/snippet.bundle.mjs', window.location.origin).href,
                new URL('/docs/javascripts/typst/snippet.bundle.mjs', window.location.origin).href
            ];
            
            for (const p of modulePaths) {
                try {
                    typstModule = await import(p);
                    break;
                } catch (e) {}
            }
            if (!typstModule) {
               throw new Error("Não foi possível carregar o módulo Typst (snippet.bundle.mjs). Tente recarregar a página.");
            }
            
            typstCompiler = typstModule.$typst;

            // 2. Fully robust WASM resolution
            typstCompiler.setCompilerInitOptions({
                getModule: async () => {
                    const wasmPaths = [
                        new URL('./typst/typst_ts_web_compiler_bg.wasm', baseUrl).href,
                        new URL('../../javascripts/typst/typst_ts_web_compiler_bg.wasm', window.location.href).href,
                        new URL('../../../javascripts/typst/typst_ts_web_compiler_bg.wasm', window.location.href).href,
                        new URL('../../../../javascripts/typst/typst_ts_web_compiler_bg.wasm', window.location.href).href,
                        new URL('/javascripts/typst/typst_ts_web_compiler_bg.wasm', window.location.origin).href,
                        new URL('/docs/javascripts/typst/typst_ts_web_compiler_bg.wasm', window.location.origin).href
                    ];
                    
                    for (const p of wasmPaths) {
                        try {
                            const res = await fetch(p, { method: 'HEAD' });
                            if (res.ok) {
                                // Double check it doesn't return HTML (Github pages 404s sometimes trick ok)
                                const contentType = res.headers.get('content-type');
                                if (!contentType || !contentType.includes('text/html')) {
                                    return p;
                                }
                            }
                        } catch (e) {}
                    }
                    // Fallback to the default one if all fail
                    return new URL('./typst/typst_ts_web_compiler_bg.wasm', baseUrl).href;
                }
            });
        }

        // Robust path resolution since MkDocs directory URLs can mess up relative paths in JS
        let response = null;
        let typstCode = "";
        
        const urlsToTry = [
            new URL(typPath, window.location.href).href, // Basic relative
            new URL('../' + typPath, window.location.href).href, // MkDocs 1 dir level deep
            new URL('../../' + typPath, window.location.href).href, // MkDocs 2 dir levels deep
            new URL('/' + typPath.replace(/^(\.\.\/)+/, ''), window.location.origin).href, // From root
            new URL('/CTT/' + typPath.replace(/^(\.\.\/)+/, ''), window.location.origin).href // Fallback custom
        ];

        for (const u of urlsToTry) {
            try {
                const res = await fetch(u + '?t=' + Date.now());
                if (res.ok) {
                    const text = await res.text();
                    // Check if the response is actually a web page (404/redirect) instead of Typst code
                    const lowerText = text.trim().toLowerCase();
                    if (!lowerText.startsWith('<!doctype html') && !lowerText.startsWith('<html')) {
                        response = res;
                        typstCode = text;
                        break;
                    }
                }
            } catch (e) {
                // Ignore network errors on fallbacks
            }
        }
        
        if (!response || !typstCode) {
            throw new Error(`Arquivo Typst não encontrado.\nO caminho original era: ${typPath}\nTentei vários diretórios mas todos retornaram página não encontrada.`);
        }

        // Generate PDF
        const pdfArrayBuffer = await typstCompiler.pdf({ mainContent: typstCode });
        
        // Trigger download
        const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        // extract filename gracefully
        const parts = typPath.split('/');
        let filename = parts[parts.length - 1];
        if (!filename.endsWith('.typ')) filename += '.typ';
        a.download = filename.replace('.typ', '.pdf');
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

    } catch (error) {
        console.error("Erro detalhado no Typst:", error);
        
        // Formata um erro detalhado para ajudar na depuração
        let msg = error.message || "";
        if (!msg && typeof error === 'string') msg = error;
        if (!msg) {
            try { msg = JSON.stringify(error, Object.getOwnPropertyNames(error)); } 
            catch(e) { msg = "Erro irrecuperável e não converte para texto."; }
        }
        
        alert("Falha ao gerar PDF:\n" + msg);
    } finally {
        if (btnEl && btnEl.tagName === 'A') {
            btnEl.disabled = false;
            btnEl.innerHTML = originalText;
            btnEl.style.cssText = originalStyle;
            btnEl.style.pointerEvents = "auto";
        }
    }
};

