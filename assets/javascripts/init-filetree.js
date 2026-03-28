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
        renderTree(treeData, sidebar, contentPanel);
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
  
  for (let i = 0; i < lines.length; i++) {
    const originalLine = lines[i];
    
    if (inCodeBlock) {
      if (originalLine.trim().startsWith('```')) {
        inCodeBlock = false;
        const lastNode = stack[stack.length - 1];
        // Only attach code if the node wasn't deemed a folder by explicit structure
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
        }
      } else {
        currentCodeContent.push(originalLine);
      }
      continue;
    }

    const trimmedLine = originalLine.trim();
    if (trimmedLine.length === 0) continue; // ignore empty lines

    if (trimmedLine.startsWith('```')) {
      inCodeBlock = true;
      currentCodeLanguage = trimmedLine.substring(3).trim();
      currentCodeContent = [];
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

function renderTree(nodes, container, contentPanel) {
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
      renderTree(node.children, childrenContainer, contentPanel);
      
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
          copyBtn.innerHTML = '📋 Copiar';
          copyBtn.title = 'Copiar código';
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(node.code).then(() => {
              copyBtn.innerHTML = '✅ Copiado!';
              setTimeout(() => { copyBtn.innerHTML = '📋 Copiar'; }, 2000);
            }).catch(e => {
              console.error('Falha ao copiar:', e);
            });
          });
          contentPanel.appendChild(copyBtn);

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
                window.hljs.highlightElement(codeNode);
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
