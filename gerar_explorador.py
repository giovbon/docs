#!/usr/bin/env python3
import os
import argparse
from pathlib import Path

# Diretórios, arquivos e extensões comumente ignorados por padrão
IGNORE_DIRS = {'.git', 'node_modules', '__pycache__', 'dist', 'build', '.venv', 'venv', '.idea', '.vscode'}
IGNORE_FILES = {'.ds_store', 'package-lock.json', 'yarn.lock', 'gerar_explorador.py', 'estrutura.txt'}
IGNORE_EXTS = {'.exe', '.dll', '.so', '.dylib', '.png', '.jpg', '.jpeg', '.gif', '.pdf', '.zip', '.tar', '.gz', '.pyc'}

def get_language(ext):
    """Mapeia extensões para os nomes de sintaxe usados pelo markdown/highlight.js."""
    ext = ext.lower().replace('.', '')
    mapping = {
        'js': 'javascript', 'ts': 'typescript', 'py': 'python',
        'html': 'html', 'css': 'css', 'json': 'json', 'md': 'markdown',
        'txt': 'text', 'sh': 'bash', 'yaml': 'yaml', 'yml': 'yaml',
        'toml': 'toml', 'cpp': 'cpp', 'c': 'c', 'java': 'java', 'go': 'go'
    }
    return mapping.get(ext, ext)

def is_text_file(filepath):
    """Heurística simples para pular arquivos binários lendo os primeiros bytes."""
    try:
        with open(filepath, 'rb') as f:
            chunk = f.read(512)
            if b'\x00' in chunk:
                return False
        return True
    except Exception:
        return False

def print_tree(dir_path: Path, output_file, level=0):
    try:
        entries = sorted(os.listdir(dir_path))
    except PermissionError:
        return
    
    # Organiza: exibe pastas primeiro, depois os arquivos na lista
    dirs, files = [], []
    for entry in entries:
        if entry.startswith('.'):
            continue
        
        if entry in IGNORE_DIRS:
            continue
            
        if entry in IGNORE_FILES:
            continue
        
        p = dir_path / entry
        if p.is_dir():
            dirs.append(entry)
        else:
            files.append(entry)

    indent_str = "  " * level
    
    # Visita as sub-pastas
    for d in dirs:
        output_file.write(f"{indent_str}- {d}/\n")
        print_tree(dir_path / d, output_file, level + 1)
        
    # Adiciona e Lê os arquivos
    for f in files:
        if Path(f).suffix.lower() in IGNORE_EXTS:
            continue
        
        file_path = dir_path / f
        if not is_text_file(file_path):
            continue

        output_file.write(f"{indent_str}- {f}\n")
        
        lang = get_language(Path(f).suffix)
        
        # Inicia o bloco de código baseando-se no indent atual + 1 recuo extra
        code_indent = indent_str + "  "
        output_file.write(f"{code_indent}```{lang}\n")
        
        try:
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as code_f:
                code_lines = code_f.readlines()
                for line in code_lines:
                    # Aplica a indentação da árvore ANTES do código
                    output_file.write(f"{code_indent}{line}")
                
                # Garante que termine com quebra de linha antes de fechar a crase
                if code_lines and not code_lines[-1].endswith('\n'):
                    output_file.write('\n')
        except Exception as e:
            output_file.write(f"{code_indent}# Erro ao ler arquivo: {e}\n")
            
        output_file.write(f"{code_indent}```\n")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Gera automaticamente um arquivo .txt aninhado para o File Tree Explorer Vanilla JS.")
    parser.add_argument("caminho", help="Caminho para a pasta que você quer transformar no explorador.")
    parser.add_argument("-o", "--output", default="estrutura.txt", help="Nome/caminho do arquivo gerado (Padrão: estrutura.txt)")
    parser.add_argument("--ignore-dirs", help="Nomes de pastas extras para ignorar (separados por vírgula)")
    parser.add_argument("--ignore-files", help="Nomes de arquivos extras para ignorar (separados por vírgula)")
    parser.add_argument("--ignore-exts", help="Extensões extras para ignorar (ex: .log,.tmp)")
    
    args = parser.parse_args()

    # Atualiza as listas de ignore se fornecido via argumentos
    if args.ignore_dirs:
        for d in args.ignore_dirs.split(','):
            IGNORE_DIRS.add(d.strip())
            
    if args.ignore_files:
        for f in args.ignore_files.split(','):
            IGNORE_FILES.add(f.strip())
            
    if args.ignore_exts:
        for ex in args.ignore_exts.split(','):
            ext = ex.strip()
            if not ext.startswith('.'):
                ext = '.' + ext
            IGNORE_EXTS.add(ext.lower())
    target_dir = Path(args.caminho)
    
    if not target_dir.exists() or not target_dir.is_dir():
        print(f"Erro fatante: '{target_dir}' não é uma pasta válida no sistema.")
        exit(1)
        
    print(f"🔎 Lendo arquivos dentro de '{target_dir}'...")
    
    with open(args.output, "w", encoding="utf-8") as out_f:
        # Ponto de Partida (Root)
        out_f.write(f"- {target_dir.name}/\n")
        print_tree(target_dir, out_f, 1)
        
    print(f"✅ Concluído! Copie o arquivo gerado '{args.output}' para o local adequado e insira isso no seu markdown:")
    print(f'\n   <div class="code-explorer" data-src="{args.output}"></div>\n')
