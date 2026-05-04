---
hide:
  - navigation
---

<div class="page-unlock" data-unlock-password="1q2w3e" data-unlock-date="2026-05-04"></div>

# Projeto CTT-AP2

??? abstract "Referências"
    - [Zensical Documentação](https://zensical.org/docs/get-started/)
    - [Roadmap da linguagem Go](https://roadmap.sh/golang)

O objetivo é criar documentação da linguagem de programação Go, usando markdown com a ferramenta zensical. Leia a descrição e requisitos da entrega no link abaixo:

[:lucide-file-text: CTT-AP2](#){ .md-button .md-button--primary onclick="gerarPDFTypst('../TYP/CTT-AP2.typ'); return false;" }

## Zensical

Criação do projeto com zensical:

```bash
# instalação
python3 -m venv .venv
source .venv/bin/activate
pip install zensical

zensical new .

zensical serve
```

Usar o [script actions](https://zensical.org/docs/publish-your-site/) como base pra fazer rodar no github pages.

Há várias opções de [customização](https://zensical.org/docs/customization/).