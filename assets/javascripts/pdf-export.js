/**
 * PDF Export System for Zensical/MkDocs
 * Uses Paged.js for high-quality PDF formatting.
 */

(function () {
    let selectionMode = false;
    let selectedUrls = []; // Use array to maintain selection order

    function isIndexPage() {
        const logo = document.querySelector('.md-logo');
        if (!logo) return false;
        try {
            const logoUrl = new URL(logo.getAttribute('href'), window.location.href).href.replace(/\/+$/, '');
            const currentUrl = window.location.href.split(/[?#]/)[0].replace(/\/+$/, '');
            return logoUrl === currentUrl;
        } catch (e) {
            return false;
        }
    }

    function initPdfExport() {
        const isIndex = isIndexPage();

        // 1. Add/Manage PDF Toolbar
        let toolbar = document.querySelector('.pdf-export-toolbar');
        const headerInner = document.querySelector('.md-header__inner');
        const logo = document.querySelector('.md-logo');

        if (!toolbar && headerInner) {
            toolbar = document.createElement('div');
            toolbar.className = 'pdf-export-toolbar';

            // Toggle Button
            const toggle = document.createElement('div');
            toggle.className = 'pdf-export-toggle';
            toggle.title = 'Selecionar páginas';
            toggle.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-up"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M12 12v6"/><path d="m15 15-3-3-3 3"/></svg>
            `;
            toggle.addEventListener('click', toggleSelectionMode);

            // Generate Button
            const generate = document.createElement('div');
            generate.className = 'pdf-export-generate';
            generate.title = 'Gerar PDF agora';
            generate.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-printer"><path d="M6 18H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-2"/><path d="M6 9V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v5"/><rect x="6" y="14" width="12" height="8" rx="1"/></svg>
                <span class="pdf-count">0</span>
            `;
            generate.addEventListener('click', generatePdf);

            toolbar.appendChild(toggle);
            toolbar.appendChild(generate);

            if (logo && logo.nextSibling) {
                headerInner.insertBefore(toolbar, logo.nextSibling);
            } else {
                headerInner.appendChild(toolbar);
            }
        }

        // Toggle visibility of Toolbar and Search based on page
        if (toolbar) {
            toolbar.style.display = isIndex ? 'flex' : 'none';
        }

        const search = document.querySelector('.md-search');
        if (search) {
            search.style.display = isIndex ? 'block' : 'none';
        }

        addCheckboxesToNav();
    }

    function toggleSelectionMode() {
        selectionMode = !selectionMode;
        document.body.setAttribute('data-pdf-selection-mode', selectionMode);
        updateHeaderButtons();
        updateAllCheckboxes();
    }

    function addCheckboxesToNav() {
        // Refine selector to only target the primary navigation sidebar (left)
        // and exclude the Table of Contents/Index (right)
        const navItems = document.querySelectorAll('.md-sidebar--primary .md-nav__link');

        // Remove any accidentally created checkboxes in the secondary sidebar (TOC)
        document.querySelectorAll('.md-sidebar--secondary .pdf-selection-container').forEach(el => el.remove());

        navItems.forEach(link => {
            if (link.querySelector('.pdf-selection-container')) return;

            const href = link.getAttribute('href');
            if (!href || href.startsWith('#')) return;

            const container = document.createElement('div');
            container.className = 'pdf-selection-container';

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'pdf-selection-checkbox';

            const badge = document.createElement('span');
            badge.className = 'pdf-selection-order';

            const absoluteUrl = new URL(href, window.location.href).href;

            checkbox.checked = selectedUrls.includes(absoluteUrl);
            updateBadge(badge, absoluteUrl);

            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    if (!selectedUrls.includes(absoluteUrl)) {
                        selectedUrls.push(absoluteUrl);
                    }
                } else {
                    selectedUrls = selectedUrls.filter(u => u !== absoluteUrl);
                }
                updateHeaderButtons();
                updateAllCheckboxes();
            });

            container.addEventListener('click', (e) => e.stopPropagation());
            container.appendChild(badge);
            container.appendChild(checkbox);
            link.prepend(container);
        });
    }

    function updateBadge(badge, url) {
        const index = selectedUrls.indexOf(url);
        if (index !== -1) {
            badge.textContent = index + 1;
            badge.classList.add('active');
        } else {
            badge.textContent = '';
            badge.classList.remove('active');
        }
    }

    function updateAllCheckboxes() {
        const items = document.querySelectorAll('.md-sidebar--primary .md-nav__link');
        items.forEach(link => {
            const container = link.querySelector('.pdf-selection-container');
            if (!container) return;

            const href = link.getAttribute('href');
            const absoluteUrl = new URL(href, window.location.href).href;

            const checkbox = container.querySelector('.pdf-selection-checkbox');
            const badge = container.querySelector('.pdf-selection-order');

            checkbox.checked = selectedUrls.includes(absoluteUrl);
            updateBadge(badge, absoluteUrl);
        });
    }

    function updateHeaderButtons() {
        const toggleBtn = document.querySelector('.pdf-export-toggle');
        if (toggleBtn) {
            if (selectionMode) {
                toggleBtn.classList.add('active');
            } else {
                toggleBtn.classList.remove('active');
            }
        }

        const genBtn = document.querySelector('.pdf-export-generate');
        if (!genBtn) return;

        if (selectionMode && selectedUrls.length > 0) {
            genBtn.classList.add('visible');
            genBtn.querySelector('.pdf-count').textContent = selectedUrls.length;
        } else {
            genBtn.classList.remove('visible');
        }
    }

    async function generatePdf() {
        const genBtn = document.querySelector('.pdf-export-generate');
        if (genBtn.classList.contains('processing')) return;

        genBtn.classList.add('processing');
        const originalHtml = genBtn.innerHTML;
        genBtn.innerHTML = '<span class="loading-spinner"></span>';

        try {
            const pagesContent = [];

            // Sort URLs if needed? For now, insertion order.
            for (const url of selectedUrls) {
                const response = await fetch(url);
                const html = await response.text();
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extract main content
                const content = doc.querySelector('article.md-content__inner');
                if (content) {
                    // --- REVEAL.JS SLIDE EXTRACTION ---
                    const revealContainers = content.querySelectorAll('.reveal');
                    for (const container of revealContainers) {
                        let slideContent = '';
                        const sections = container.querySelectorAll('section[data-markdown]');

                        for (const section of sections) {
                            const mdPath = section.getAttribute('data-markdown');
                            const separator = section.getAttribute('data-separator') || '^\r?\n---\r?\n$';
                            const verticalSeparator = section.getAttribute('data-separator-vertical');

                            if (mdPath) {
                                try {
                                    // Ensure the base URL has a trailing slash for consistent relative resolution
                                    const baseUrl = url.endsWith('/') ? url : url + '/';
                                    const mdUrl = new URL(mdPath, baseUrl).href;
                                    console.log('[PDF Export] Fetching slide MD from:', mdUrl);

                                    const mdResponse = await fetch(mdUrl);
                                    let mdText = await mdResponse.text();

                                    // Split by separators
                                    const sepRegex = new RegExp(separator, 'm');
                                    let parts = mdText.split(sepRegex);

                                    if (verticalSeparator) {
                                        const vSepRegex = new RegExp(verticalSeparator, 'm');
                                        parts = parts.flatMap(p => p.split(vSepRegex));
                                    }

                                    // Skip the first slide (usually the cover/title)
                                    const actualSlides = parts.slice(1);
                                    slideContent += actualSlides.map(part => {
                                        // Resolve Background Images if present
                                        let bgImage = '';
                                        const bgMatch = part.match(/data-background-image=["']([^"']*)["']/);
                                        if (bgMatch && bgMatch[1]) {
                                            const bgUrl = bgMatch[1].trim();
                                            if (bgUrl && !bgUrl.startsWith('http') && !bgUrl.startsWith('data:')) {
                                                try {
                                                    // IMPORTANT: Resolve relative to the page (baseUrl) because Reveal.js
                                                    // resolves slide assets relative to the page URL, not the MD file.
                                                    const absoluteBg = new URL(bgUrl, baseUrl).href;
                                                    console.log('[PDF Export] Resolved BG Image (relative to page):', absoluteBg);
                                                    bgImage = `<img src="${absoluteBg}" style="max-height: 250px; display: block; margin: 15px 0; border: 1px solid #ddd; border-radius: 4px;">`;
                                                } catch (e) { }
                                            } else if (bgUrl) {
                                                bgImage = `<img src="${bgUrl}" style="max-height: 250px; display: block; margin: 15px 0; border: 1px solid #ddd; border-radius: 4px;">`;
                                            }
                                        }

                                        // Basic cleaning of reveal.js comments/attributes
                                        let cleanPart = part.replace(/<!-- \.slide: .*? -->/g, '');
                                        cleanPart = cleanPart.replace(/\{: .*?\}/g, ''); // Attributes like {:.fragment}

                                        // Resolve Image Paths in Slide Content (Markdown and HTML)
                                        // 1. Markdown images: ![alt](path)
                                        cleanPart = cleanPart.replace(/!\[(.*?)\]\(([^"'\s)]+)(?:\s+["'].*?["'])?\)/g, (match, alt, path) => {
                                            if (path && !path.startsWith('http') && !path.startsWith('data:')) {
                                                try {
                                                    // Resolve relative to page
                                                    const absolutePath = new URL(path, baseUrl).href;
                                                    console.log('[PDF Export] Resolved MD Image (relative to page):', absolutePath);
                                                    return `![${alt}](${absolutePath})`;
                                                } catch (e) { return match; }
                                            }
                                            return match;
                                        });

                                        // 2. HTML images: <img src="path" ...>
                                        cleanPart = cleanPart.replace(/<img\s+([^>]*?)src=["']([^"']*)["']([^>]*?)>/gi, (match, before, src, after) => {
                                            if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                                                try {
                                                    // Resolve relative to page
                                                    const absoluteSrc = new URL(src, baseUrl).href;
                                                    console.log('[PDF Export] Resolved HTML Image (relative to page):', absoluteSrc);
                                                    return `<img ${before}src="${absoluteSrc}"${after}>`;
                                                } catch (e) { return match; }
                                            }
                                            return match;
                                        });

                                        // Wrap in a div to simulate a slide block in the PDF
                                        // Store MD as textContent manually to prevent browser mangling
                                        const block = document.createElement('div');
                                        block.className = 'slide-block';
                                        block.textContent = cleanPart; 
                                        
                                        if (bgImage) {
                                            const bgDiv = document.createElement('div');
                                            bgDiv.innerHTML = bgImage;
                                            if (bgDiv.firstChild) {
                                                block.prepend(bgDiv.firstChild);
                                            }
                                        }
                                        return block.outerHTML;
                                    }).join('\n');

                                } catch (e) {
                                    console.warn('Erro ao buscar slide MD:', mdPath, e);
                                }
                            }
                        }

                        if (slideContent) {
                            const slideWrapper = document.createElement('div');
                            slideWrapper.className = 'extracted-slides md-typeset';

                            // Insert "Slides" marker
                            const slideMarker = document.createElement('div');
                            slideMarker.className = 'content-marker slide-marker';
                            slideMarker.innerHTML = `
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="14" x="3" y="3" rx="2"/><path d="M7 21h10"/><path d="M12 17v4"/></svg>
                                Slides
                            `;

                            slideWrapper.innerHTML = slideContent;
                            container.parentNode.insertBefore(slideMarker, container);
                            container.parentNode.replaceChild(slideWrapper, container);

                            // Insert "Documentação" marker if there is content after the slides
                            if (slideWrapper.nextElementSibling) {
                                const docsMarker = document.createElement('div');
                                docsMarker.className = 'content-marker docs-marker';
                                docsMarker.innerHTML = `
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    Documentação
                                `;
                                slideWrapper.parentNode.insertBefore(docsMarker, slideWrapper.nextElementSibling);
                            }
                        }
                    }
                    // ----------------------------------

                    // Force all details/callouts to be open for print
                    content.querySelectorAll('details').forEach(details => {
                        details.setAttribute('open', '');
                    });

                    // Fix relative paths for images
                    content.querySelectorAll('img').forEach(img => {
                        const src = img.getAttribute('src');
                        if (src && !src.startsWith('http') && !src.startsWith('data:')) {
                            img.src = new URL(src, url).href;
                        }
                    });
                    pagesContent.push(content.innerHTML);
                }
            }

            if (pagesContent.length === 0) {
                alert('Nenhum conteúdo encontrado para as páginas selecionadas.');
                return;
            }

            // Create aggregation document
            const printWindow = window.open('', '_blank');
            const combinedHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Documentação Exportada</title>
                    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
                    <script>
                        window.PagedConfig = {
                            after: (flow) => {
                                console.log('[PDF Export] Paged.js rendered. Initializing Markmaps...');
                                if (window.initMarkmap) {
                                    window.initMarkmap({ duration: 0 });
                                }
                            }
                        };
                    </script>
                    <script src="https://cdn.jsdelivr.net/npm/pagedjs@0.4.3/dist/paged.polyfill.js"></script>
                    <link rel="stylesheet" href="${new URL('./assets/stylesheets/classic/main.d9d44b50.min.css', window.location.href).href}">
                    <link rel="stylesheet" href="${new URL('./stylesheets/custom-reveal.css', window.location.href).href}">
                    <link rel="stylesheet" href="${new URL('./stylesheets/markmap.css', window.location.href).href}">
                    <link rel="stylesheet" href="${new URL('./stylesheets/pdf-export.css', window.location.href).href}">
                    <link rel="stylesheet" href="${new URL('./stylesheets/asciinema.css', window.location.href).href}">
                    <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
                    <script src="https://cdn.jsdelivr.net/npm/markmap-lib@0.17"></script>
                    <script src="https://cdn.jsdelivr.net/npm/markmap-view@0.17"></script>
                    <script src="${new URL('./javascripts/init-markmap.js', window.location.href).href}"></script>
                    <style>
                        @page {
                            size: A4;
                            margin: 20mm;
                            @bottom-right {
                                content: counter(page);
                            }
                        }
                        body {
                            background: white !important;
                            color: black !important;
                            font-family: var(--md-text-font), sans-serif;
                            margin: 0 !important;
                            padding: 0 !important;
                            /* Stability for lists and paragraphs */
                            orphans: 3;
                            widows: 3;
                        }
                        .page-break {
                            break-after: page;
                        }
                        article {
                            margin-bottom: 20px;
                            break-inside: auto !important;
                        }
                        article h1:first-child {
                            margin-top: 0 !important;
                        }
                        h1, h2, h3, h4 {
                            break-after: avoid !important;
                            break-inside: avoid !important;
                        }
                        /* Fix for nested lists (ul) */
                        .md-typeset ul {
                            list-style-type: disc !important;
                            padding-left: 2.5em !important;
                            margin-left: 0 !important;
                        }
                        .md-typeset ul ul {
                            list-style-type: circle !important;
                            padding-left: 1.5em !important;
                        }
                        .md-typeset ul ul ul {
                            list-style-type: square !important;
                            padding-left: 1.5em !important;
                        }
                        .md-typeset li {
                            display: list-item !important;
                            break-inside: avoid-page !important;
                            margin-bottom: 0.3em !important;
                        }

                        /* Prepare ordered lists for hardcoded script-based numbering */
                        .md-typeset ol {
                            list-style: none !important;
                            padding-left: 2.5em !important;
                            margin-left: 0 !important;
                        }
                        .md-typeset ol > li {
                            display: flex !important;
                            break-inside: auto !important;
                            padding-left: 0 !important;
                            margin-bottom: 0.5em !important;
                            align-items: flex-start !important;
                        }
                        .li-content {
                            flex: 1 !important;
                            min-width: 0 !important;
                        }
                        .li-content > :first-child {
                            margin-top: 0 !important;
                        }
                        .md-typeset ol > li::before {
                            display: none !important;
                            content: none !important;
                        }
                        /* Aggressive Reset for Code Blocks to ensure "Continuum" */
                        .md-typeset .highlight, 
                        .md-typeset .highlighttable,
                        .md-typeset .highlight pre {
                            display: block !important;
                            background-color: #f5f5f5 !important;
                            overflow: visible !important;
                            height: auto !important;
                            min-height: 0 !important;
                            max-height: none !important;
                            break-inside: auto !important;
                            page-break-inside: auto !important;
                            margin-bottom: 1.2em !important;
                            padding: 0 !important;
                            border: none !important;
                            orphans: 1 !important;
                            widows: 1 !important;
                            white-space: pre-wrap !important;
                            word-break: break-all !important;
                        }

                        /* Hide ALL decorative elements in PDF */
                        .md-typeset .highlight::before, .md-typeset .highlight::after,
                        .md-clipboard, .md-code__copy, .md-status {
                            display: none !important;
                        }

                        /* Visually join filename and code block with overlap */
                        .md-typeset .highlight .filename {
                            display: block !important;
                            margin: 0 !important;
                            margin-bottom: -1px !important;
                            padding: 0.5rem 0.6rem !important;
                            background-color: #eee !important;
                            border-bottom: 1px solid #ddd !important;
                            break-after: avoid !important;
                            position: relative !important;
                            z-index: 2 !important;
                            font-weight: bold !important;
                        }

                        .md-typeset .highlight pre {
                            margin: 0 !important;
                            border-top: none !important;
                            padding: 0.5rem 0.6rem !important;
                        }

                        .md-typeset pre code {
                            break-inside: auto !important;
                            white-space: pre-wrap !important;
                            padding: 0 !important;
                            background: transparent !important;
                        }
                        p, li {
                            orphans: 3;
                            widows: 3;
                        }
                        .extracted-slides {
                            padding: 0;
                            margin: 0;
                            break-inside: auto !important;
                            break-before: avoid !important;
                        }
                        .slide-block {
                            padding: 0;
                            margin: 0;
                            break-inside: auto !important; 
                        }
                        .slide-block img {
                            max-width: 100%;
                            height: auto;
                        }
                        /* Material Theme Adjustments for Print */
                        .md-typeset h1, .md-typeset h2 { color: var(--md-primary-color); }
                        .md-sidebar, .md-header, .md-footer, .md-nav, .md-content__button { display: none !important; }
                        
                        /* Force hide icons and chevrons in the aggregated PDF window */
                        .md-typeset .admonition > .admonition-title::before,
                        .md-typeset .admonition > summary::before,
                        .md-typeset details > .admonition-title::before,
                        .md-typeset details > summary::before,
                        .md-typeset .admonition > .admonition-title:before,
                        .md-typeset .admonition > summary:before,
                        .md-typeset details > .admonition-title:before,
                        .md-typeset details > summary:before,
                        .md-typeset details > summary::after,
                        .md-typeset details > summary:after {
                            display: none !important;
                            content: none !important;
                            background-image: none !important;
                            -webkit-mask-image: none !important;
                            mask-image: none !important;
                        }

                        /* Reset padding for titles */
                        .md-typeset .admonition > .admonition-title,
                        .md-typeset .admonition > summary,
                        .md-typeset details > .admonition-title,
                        .md-typeset details > summary {
                            padding-left: 0.6rem !important;
                        }

                        /* Remove fixed heights and other restrictive styles from original content */
                        .md-content__inner, .md-typeset {
                            height: auto !important;
                            min-height: 0 !important;
                            overflow: visible !important;
                            display: block !important;
                        }

                        /* Reset italic/emph styles for print (override custom-reveal.css) */
                        em {
                            color: inherit !important;
                            background-color: transparent !important;
                            padding-left: 0 !important;
                            padding-right: 0 !important;
                            font-style: italic !important;
                            font-weight: inherit !important;
                            border-radius: 0 !important;
                        }

                        /* Markmap Print/Light Mode Overrides */
                        .markmap {
                            background: white !important;
                            border: 1px solid rgba(0, 0, 0, 0.05) !important;
                            height: 800px !important; /* Larger height for better visibility */
                            width: 100% !important;
                            break-inside: avoid !important;
                            margin: 20px 0 !important;
                        }
                        .markmap text, .markmap-node text, .markmap div, .markmap span, .markmap p {
                            fill: #1e1e1e !important;
                            color: #1e1e1e !important;
                        }
                        .markmap-control-btn {
                            display: none !important;
                        }

                        /* Global Image Handling for Print */
                        .md-typeset img {
                            max-width: 100% !important;
                            height: auto !important;
                            break-inside: avoid !important;
                            margin: 10px auto !important;
                            display: block !important;
                        }
                    </style>
                </head>
                <body>
                    ${pagesContent.map((content, index) => `
                        <article class="md-content__inner md-typeset">${content}</article>
                        ${index < pagesContent.length - 1 ? '<div class="page-break"></div>' : ''}
                    `).join('')}
                    
                    <script>
                        // 1. Convert any markdown in slide-blocks to HTML
                        document.querySelectorAll('.slide-block').forEach(block => {
                            // Use textContent to get the RAW markdown we safely stored
                            const rawMd = block.textContent;
                            block.innerHTML = marked.parse(rawMd);
                        });

                        // 2. Post-process to freeze numbers and avoid resets across pages
                        document.querySelectorAll('.md-typeset ol').forEach(ol => {
                            const start = parseInt(ol.getAttribute('start')) || 1;
                            const items = Array.from(ol.children).filter(child => child.tagName === 'LI');
                            items.forEach((li, index) => {
                                if (li.dataset.numbered) return;

                                // Wrap existing content to prevent flex separation of text nodes
                                const contentWrapper = document.createElement('div');
                                contentWrapper.className = 'li-content';
                                while (li.firstChild) {
                                    contentWrapper.appendChild(li.firstChild);
                                }
                                li.appendChild(contentWrapper);

                                const marker = document.createElement('span');
                                marker.textContent = (start + index) + '.';
                                marker.style.flexShrink = '0';
                                marker.style.width = '2em';
                                marker.style.fontWeight = 'bold';
                                marker.style.color = 'var(--md-primary-color)';
                                li.style.listStyle = 'none';
                                li.prepend(marker);
                                li.dataset.numbered = "true";
                            });
                        });

                        // 3. Markmaps are now initialized via PagedConfig.after hook
                    </script>
                </body>
                </html>
            `;

            printWindow.document.write(combinedHtml);
            printWindow.document.close();

        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            alert('Erro ao gerar o PDF. Verifique o console.');
        } finally {
            genBtn.classList.remove('processing');
            genBtn.innerHTML = originalHtml;
            updateHeaderButtons();
        }
    }

    // Initialize
    if (typeof document$ !== "undefined") {
        document$.subscribe(function () {
            initPdfExport();
        });
    } else {
        document.addEventListener("DOMContentLoaded", initPdfExport);
    }
})();
