/**
 * Markmap Initialization for Zensical/MkDocs
 * Integrates markmap.js.org with support for .txt and .md files.
 */

(function () {
    // Utility to ensure markmap is available
    function getMarkmap() {
        return window.markmap;
    }

    // Performance Optimization: Global Registry for resize handling
    const markmapInstances = [];
    let resizeTimeout;

    function debounce(func, wait) {
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(resizeTimeout);
                func(...args);
            };
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(later, wait);
        };
    }

    const handleGlobalResize = debounce(() => {
        console.log('[Markmap] Global resize triggered, refitting all maps...');
        // Iterate backwards to allow splicing while iterating
        for (let i = markmapInstances.length - 1; i >= 0; i--) {
            const { el, mm } = markmapInstances[i];
            if (!document.body.contains(el)) {
                markmapInstances.splice(i, 1);
                continue;
            }
            try {
                mm.fit();
            } catch (e) {
                console.warn('[Markmap] Failed to fit map on resize', e);
            }
        }
    }, 250);

    // Single listener for all instances
    window.addEventListener('resize', handleGlobalResize);

    async function initMarkmap(options = {}) {
        const { Markmap, Transformer, loadCSS, loadJS } = getMarkmap() || {};
        if (!Markmap || !Transformer) {
            console.warn('[Markmap] Markmap libraries not found. Retrying in 500ms...');
            setTimeout(() => initMarkmap(options), 500);
            return;
        }

        const transformer = new Transformer();
        const markmapElements = document.querySelectorAll('.markmap');

        markmapElements.forEach(async (el) => {
            // Avoid double initialization
            if (el.dataset.markmapInitialized) return;
            el.dataset.markmapInitialized = 'true';

            let markdown = '';
            const src = el.getAttribute('data-src');

            if (src) {
                try {
                    const response = await fetch(src);
                    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                    markdown = await response.text();
                } catch (e) {
                    console.error('[Markmap] Failed to fetch source:', src, e);
                    el.innerHTML = `<div style="color:red; padding: 10px;">Erro ao carregar mapa mental: ${src}</div>`;
                    return;
                }
            } else {
                // If it contains a script or pre tag, use its content directly
                const template = el.querySelector('script[type="text/template"], pre, code');
                if (template) {
                    markdown = template.textContent;
                } else {
                    // Fallback to innerHTML and handle line breaks then strip HTML tags
                    markdown = el.innerHTML
                        .replace(/<br\s*[\/]?>/gi, '\n') // Convert <br> to newlines
                        .replace(/<\/p>/gi, '\n') // Convert </p> to newlines
                        .replace(/<[^>]+>/g, ''); // Strip remaining tags
                }
                
                // Decode HTML entities (like &gt; for >)
                const txt = document.createElement('textarea');
                txt.innerHTML = markdown;
                markdown = txt.value;

                // Dedent: find common leading whitespace and remove it
                const lines = markdown.split('\n');
                const minIndent = lines.reduce((min, line) => {
                    if (line.trim().length === 0) return min;
                    const match = line.match(/^\s*/);
                    return Math.min(min, match[0].length);
                }, Infinity);

                if (minIndent !== Infinity && minIndent > 0) {
                    markdown = lines.map(line => line.substring(minIndent)).join('\n');
                }
            }

            if (!markdown || !markdown.trim()) {
                console.warn('[Markmap] Empty content for element:', el);
                return;
            }

            // Prepare the SVG container
            el.innerHTML = '';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            el.appendChild(svg);

            // Transform Markdown to Markmap data
            const { root, features } = transformer.transform(markdown);
            const { styles, scripts } = transformer.getAssets();

            // Load additional assets if required by features
            if (styles) loadCSS(styles);
            if (scripts) loadJS(scripts, { getMarkmap });

            // Create Markmap instance
            const isMobile = window.matchMedia('(max-width: 768px)').matches;
            const mm = Markmap.create(svg, {
                autoFit: false,
                duration: isMobile ? 0 : (options.duration !== undefined ? options.duration : 500)
            }, root);

            // Re-fit after a small delay to ensure container dimensions are settled
            setTimeout(() => mm.fit(), 200);

            // Create controls container
            const controls = document.createElement('div');
            controls.className = 'markmap-controls';
            el.appendChild(controls);

            // Add title if present (check data-title first, then markdown content)
            let title = el.getAttribute('data-title');
            
            // Fallback: try to extract title from markdown if not in data-title
            if (!title) {
                // Try to find the first level 1 heading
                const titleMatch = markdown.match(/^#\s+(.+)$/m);
                if (titleMatch) {
                    title = titleMatch[1].trim();
                } else {
                    // Try to find title in frontmatter
                    const fmMatch = markdown.match(/^title:\s*(.+)$/m);
                    if (fmMatch) {
                        title = fmMatch[1].trim();
                    }
                }
            }

            if (title) {
                const titleEl = document.createElement('div');
                titleEl.className = 'markmap-title';
                titleEl.textContent = title;
                el.appendChild(titleEl);
                
                // Also set it as a title attribute for accessibility/tooltip
                svg.setAttribute('title', title);
            }

            // Helper to create buttons
            const createBtn = (className, title, icon, onClick) => {
                const btn = document.createElement('button');
                btn.className = `markmap-control-btn ${className}`;
                btn.title = title;
                btn.setAttribute('aria-label', title);
                btn.innerHTML = icon;
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    onClick(e);
                });
                return btn;
            };

            // Zoom In button
            controls.appendChild(createBtn('markmap-zoom-in', 'Aumentar Zoom', 
                `<svg viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`, 
                () => mm.rescale(1.25)));

            // Zoom Out button
            controls.appendChild(createBtn('markmap-zoom-out', 'Diminuir Zoom', 
                `<svg viewBox="0 0 24 24"><path d="M19 13H5v-2h14v2z"/></svg>`, 
                () => mm.rescale(0.8)));

            // Full-screen button
            const fsBtn = createBtn('markmap-fullscreen-btn', 'Alternar Tela Cheia', 
                `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`,
                () => {
                    if (!document.fullscreenElement) {
                        el.requestFullscreen().catch(err => {
                            console.error(`[Markmap] Error attempting to enable full-screen: ${err.message}`);
                        });
                    } else {
                        document.exitFullscreen();
                    }
                }
            );
            controls.appendChild(fsBtn);

            // Handle full-screen change to re-fit the map and update icon
            const handleFullscreenChange = () => {
                const isFs = document.fullscreenElement === el;
                if (isFs) {
                    fsBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg>`;
                } else {
                    fsBtn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg>`;
                }
                
                setTimeout(() => mm.fit(), 100);
            };

            el.addEventListener('fullscreenchange', handleFullscreenChange);

            // Register instance for global resize handling
            markmapInstances.push({ el, mm });

            // Visual Cue: Robust synchronization of fold color using MutationObserver
            const syncFoldColors = () => {
                el.querySelectorAll('.markmap-node.markmap-fold circle').forEach(circle => {
                    const stroke = circle.getAttribute('stroke') || circle.style.stroke;
                    if (stroke) {
                        circle.style.fill = stroke;
                        circle.style.fillOpacity = "1";
                    }
                });
                el.querySelectorAll('.markmap-node:not(.markmap-fold) circle').forEach(circle => {
                    circle.style.fill = "";
                    circle.style.fillOpacity = "";
                });
            };

            const observer = new MutationObserver(syncFoldColors);
            observer.observe(svg, { 
                attributes: true, 
                childList: true, 
                subtree: true,
                attributeFilter: ['class', 'stroke'] 
            });
            
            // Initial sync
            setTimeout(syncFoldColors, 500);
        });
    }

    // Expose to window for PDF export access
    window.initMarkmap = initMarkmap;

    // Support for Zensical/MkDocs Material instant navigation
    if (typeof document$ !== "undefined") {
        document$.subscribe(function () {
            initMarkmap();
        });
    } else {
        document.addEventListener("DOMContentLoaded", initMarkmap);
    }
})();
