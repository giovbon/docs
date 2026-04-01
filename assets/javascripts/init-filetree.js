document.addEventListener('DOMContentLoaded', () => {
  const explorers = document.querySelectorAll('.code-explorer');
  
  explorers.forEach(explorer => {
    const src = explorer.getAttribute('data-src');
    if (!src) return;
    
    // Set up the UI layout immediately
    explorer.classList.add('file-tree-container');
    
    const sidebar = document.createElement('div');
    sidebar.className = 'file-tree-sidebar';
    
    // Fullscreen button
    const fsBtn = document.createElement('button');
    fsBtn.className = 'file-tree-fs-btn';
    fsBtn.innerHTML = '⛶';
    fsBtn.title = 'Tela Cheia';
    fsBtn.addEventListener('click', () => {
      explorer.classList.toggle('fullscreen');
      document.body.style.overflow = explorer.classList.contains('fullscreen') ? 'hidden' : '';
    });
    explorer.appendChild(fsBtn);
    
    // Font button
    const fontBtn = document.createElement('button');
    fontBtn.className = 'file-tree-font-btn';
    fontBtn.innerHTML = 'A+';
    fontBtn.title = 'Aumentar fonte';
    let isLargeFont = false;
    fontBtn.addEventListener('click', () => {
      isLargeFont = !isLargeFont;
      if (isLargeFont) {
        contentPanel.classList.add('large-font');
        fontBtn.innerHTML = 'a-';
      } else {
        contentPanel.classList.remove('large-font');
        fontBtn.innerHTML = 'A+';
      }
    });
    explorer.appendChild(fontBtn);

    // Sidebar toggle button
    const toggleSidebarBtn = document.createElement('button');
    toggleSidebarBtn.className = 'file-tree-toggle-sidebar-btn';
    toggleSidebarBtn.innerHTML = '◫';
    toggleSidebarBtn.title = 'Recolher/Expandir menu';
    toggleSidebarBtn.addEventListener('click', () => {
      explorer.classList.toggle('sidebar-collapsed');
    });
    explorer.appendChild(toggleSidebarBtn);
    
    const contentPanel = document.createElement('div');
    contentPanel.className = 'file-tree-content';
    
    const placeholder = document.createElement('div');
    placeholder.className = 'file-tree-placeholder';
    placeholder.textContent = 'Selecione um arquivo para ver o código';
    contentPanel.appendChild(placeholder);
    
    explorer.appendChild(sidebar);
    explorer.appendChild(contentPanel);

    // Fetch the data
    fetch(src)
      .then(r => {
        if (!r.ok) {
          throw new Error('HTTP ' + r.status + ' - ' + r.statusText);
        }
        return r.text();
      })
      .then(text => {
        const treeData = parseFileTreeData(text);
        renderTree(treeData, sidebar, contentPanel, explorer);
      })
      .catch(e => {
        sidebar.innerHTML = `<span style="color:red">Erro carregando ${src}</span>`;
        console.error("Error loading file tree src:", e);
      });
  });
});

function parseFileTreeData(text) {
  const lines = text.split(/\r?\n/);
  const nodes = [];
  const stack = []; 
  
  let inCodeBlock = false;
  let currentCodeLanguage = '';
  let currentCodeContent = [];
  let currentCodeIndent = 0;
  let currentCodeAnnotations = {};
  let currentBlockLineIdx = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const originalLine = lines[i];
    
    if (inCodeBlock) {
      if (originalLine.trim().startsWith('```')) {
        inCodeBlock = false;
        const lastNode = stack[stack.length - 1];
        if (lastNode) {
          lastNode.code = currentCodeContent.map(l => {
             if (l.trim().length === 0) return '';
             let count = 0;
             while(count < currentCodeIndent && count < l.length && (l[count] === ' ' || l[count] === '\t')) {
                 count++;
             }
             return l.substring(count);
          }).join('\n');
          lastNode.language = currentCodeLanguage;
          lastNode.isFolder = false; 
          lastNode.annotations = currentCodeAnnotations;
        }
      } else {
        const annotRegex = /(\s*(?:\/\/|#|<!--|\/\*)?\s*)@@\[(.*)\](?:\s*(?:\*\/|-->))?\s*$/;
        const match = originalLine.match(annotRegex);
        let processedLine = originalLine;
        if (match) {
            currentCodeAnnotations[currentBlockLineIdx] = match[2];
            processedLine = originalLine.replace(annotRegex, '');
        }
        currentCodeContent.push(processedLine);
        currentBlockLineIdx++;
      }
      continue;
    }

    const trimmedLine = originalLine.trim();
    if (trimmedLine.length === 0) continue; // ignore empty lines

    if (trimmedLine.startsWith('```')) {
      inCodeBlock = true;
      currentCodeLanguage = trimmedLine.substring(3).trim();
      currentCodeContent = [];
      currentCodeAnnotations = {};
      currentBlockLineIdx = 0;
      const matchIndent = originalLine.match(/^\s*/);
      currentCodeIndent = matchIndent ? matchIndent[0].length : 0;
      continue;
    }

    const match = originalLine.match(/^(\s*)-\s+(.*)$/);
    if (match) {
      const indentSpaces = match[1].length;
      const name = match[2].trim();
      const level = Math.floor(indentSpaces / 2); // 2 spaces per indent

      const isFolder = name.endsWith('/') || name.endsWith('\\');
      
      const node = {
        name: name.replace(/[\/\\]$/, ''), // Remove trailing slash for display
        children: [],
        code: null,
        language: null,
        isFolder: isFolder,
        level: level
      };

      // Find the correct parent in the stack based on level
      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length === 0) {
        nodes.push(node);
      } else {
        stack[stack.length - 1].children.push(node);
        stack[stack.length - 1].isFolder = true; // explicitly mark parent as folder
      }

      stack.push(node);
    }
  }
  return nodes;
}

function renderTree(nodes, container, contentPanel, explorer) {
  nodes.forEach(node => {
    if (node.isFolder || node.children.length > 0) {
      const details = document.createElement('div');
      details.className = 'file-tree-folder-group';
      
      const summary = document.createElement('div');
      summary.className = 'file-tree-folder';
      
      const toggle = document.createElement('span');
      toggle.className = 'folder-toggle expanded';
      toggle.innerHTML = '▶'; 
      
      const typeIcon = document.createElement('span');
      typeIcon.className = 'file-tree-icon folder-icon';
      typeIcon.innerHTML = '📁'; 
      
      const textNode = document.createElement('span');
      textNode.className = 'file-tree-name';
      textNode.textContent = node.name;
      
      summary.appendChild(toggle);
      summary.appendChild(typeIcon);
      summary.appendChild(textNode);
      details.appendChild(summary);
      
      const childrenContainer = document.createElement('div');
      childrenContainer.className = 'file-tree-children';
      renderTree(node.children, childrenContainer, contentPanel, explorer);
      
      details.appendChild(childrenContainer);
      container.appendChild(details);

      summary.addEventListener('click', () => {
         const isExpanded = toggle.classList.contains('expanded');
         if (isExpanded) {
             toggle.classList.remove('expanded');
             childrenContainer.style.display = 'none';
         } else {
             toggle.classList.add('expanded');
             childrenContainer.style.display = 'block';
         }
      });
    } else {
      const fileDiv = document.createElement('div');
      fileDiv.className = 'file-tree-file';
      
      const icon = document.createElement('span');
      icon.className = 'file-tree-icon file-icon';
      icon.innerHTML = '📄';
      
      const textNode = document.createElement('span');
      textNode.className = 'file-tree-name';
      textNode.textContent = node.name;
      
      fileDiv.appendChild(icon);
      fileDiv.appendChild(textNode);
      
      if (node.code !== null) {
        fileDiv.addEventListener('click', () => {
          // Manage active state
          document.querySelectorAll('.file-tree-file.active').forEach(el => el.classList.remove('active'));
          fileDiv.classList.add('active');
          
          contentPanel.innerHTML = '';
          
          const copyBtn = document.createElement('button');
          copyBtn.className = 'file-tree-copy-btn';
          copyBtn.innerHTML = '📋';
          copyBtn.title = 'Copiar código';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(node.code).then(() => {
              copyBtn.innerHTML = '✅';
              setTimeout(() => { copyBtn.innerHTML = '📋'; }, 2000);
            }).catch(e => {
              console.error('Falha ao copiar:', e);
            });
          });
          
          // Fix: Append copy button to the explorer container so it stays fixed during inner scroll
          const oldCopyBtn = explorer.querySelector('.file-tree-copy-btn');
          if (oldCopyBtn) oldCopyBtn.remove();
          explorer.appendChild(copyBtn);

          // Create the main code display area
          const codeArea = document.createElement('div');
          codeArea.className = 'file-tree-code-area';

          // Create Gutter with Line Numbers
          const gutter = document.createElement('div');
          gutter.className = 'file-tree-gutter';
          
          const lines = node.code.split('\n');
          const linesCount = lines.length;
          
          let nums = '';
          for (let i = 1; i <= linesCount; i++) {
            nums += i + '\n';
          }
          gutter.textContent = nums;

          const pre = document.createElement('pre');
          const codeNode = document.createElement('code');
          codeNode.className = node.language ? `language-${node.language}` : '';
          codeNode.textContent = node.code;
          
          pre.appendChild(codeNode);
          codeArea.appendChild(gutter);
          codeArea.appendChild(pre);
          contentPanel.appendChild(codeArea);

          const applyHighlight = () => {
             if (window.hljs) {
                const result = window.hljs.highlight(node.code, { 
                    language: node.language || 'plaintext',
                    ignoreIllegals: true 
                });
                let highlightedCode = result.value;
                
                if (node.annotations && Object.keys(node.annotations).length > 0) {
                    const lines = highlightedCode.split('\n');
                    Object.keys(node.annotations).forEach(lineIdx => {
                        const idx = parseInt(lineIdx);
                        if (lines[idx] !== undefined) {
                            const tooltipText = escapeHTML(node.annotations[idx]);
                            lines[idx] += ` <span class="annotation-marker" tabindex="0" data-annotation="${tooltipText}">✚</span>`;
                        }
                    });
                    highlightedCode = lines.join('\n');
                }
                
                codeNode.innerHTML = highlightedCode;
                
                // Attach tooltip listeners
                const markers = codeArea.querySelectorAll('.annotation-marker');
                markers.forEach(marker => {
                    marker.addEventListener('click', (e) => {
                        e.stopPropagation();
                        // find existing globals
                        let activeTooltip = document.querySelector('.annotation-tooltip');
                        
                        // Close currently active marker
                        if (marker.classList.contains('active')) {
                            marker.classList.remove('active');
                            if (activeTooltip) activeTooltip.remove();
                            return;
                        }
                        
                        document.querySelectorAll('.annotation-marker.active').forEach(m => m.classList.remove('active'));
                        if (activeTooltip) activeTooltip.remove();
                        
                        marker.classList.add('active');
                        
                        const text = marker.getAttribute('data-annotation');
                        const tooltip = document.createElement('div');
                        tooltip.className = 'annotation-tooltip';
                        
                        // Basic markdown parsing for inline code blocks
                        let htmlText = text.replace(/`(.*?)`/g, '<code>$1</code>');
                        tooltip.innerHTML = htmlText;
                        
                        // Default position out of view to calculate dimension
                        tooltip.style.top = '-9999px';
                        tooltip.style.left = '0px';
                        codeArea.appendChild(tooltip);
                        
                        // Positioning calculations
                        const rect = marker.getBoundingClientRect();
                        const ttRect = tooltip.getBoundingClientRect();
                        const areaRect = codeArea.getBoundingClientRect();
                        
                        // Horizontal placement: start with centering relative to marker in viewport
                        let targetViewportLeft = rect.left + (rect.width / 2) - (ttRect.width / 2);
                        
                        // Constraint: avoid going off the left/right edges of the dynamic viewport
                        if (targetViewportLeft + ttRect.width > window.innerWidth - 10) {
                            targetViewportLeft = window.innerWidth - 10 - ttRect.width;
                        }
                        if (targetViewportLeft < 10) {
                            targetViewportLeft = 10;
                        }
                        
                        // Convert viewport left to codeArea relative left
                        tooltip.style.left = (targetViewportLeft - areaRect.left) + 'px';
                        
                        // Vertical placement
                        let relativeTop;
                        // Check if it fits below in the viewport
                        if (rect.bottom + 10 + ttRect.height > window.innerHeight - 10) {
                            // Flip to top of marker
                            relativeTop = rect.top - areaRect.top - ttRect.height - 10;
                        } else {
                            // Place below marker
                            relativeTop = rect.bottom - areaRect.top + 10;
                        }
                        tooltip.style.top = relativeTop + 'px';
                        
                        const closeListener = (e2) => {
                            if (!tooltip.contains(e2.target) && e2.target !== marker) {
                                tooltip.remove();
                                marker.classList.remove('active');
                                document.removeEventListener('click', closeListener);
                            }
                        };
                        
                        setTimeout(() => {
                            document.addEventListener('click', closeListener);
                        }, 10);
                        
                    });
                });
             }
          };

          if (!window.hljs) {
              const script = document.createElement('script');
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
              script.onload = applyHighlight;
              document.head.appendChild(script);
          } else {
              applyHighlight();
          }
        });
      }
      
      container.appendChild(fileDiv);
    }
  });
}

function escapeHTML(str) {
  return str.replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
}
