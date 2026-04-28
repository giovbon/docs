---
hide:
  - navigation
---

<div class="page-unlock" data-unlock-password="1q2w3e" data-unlock-date="2026-05-04"></div>

# Projeto AP2

O objetivo é criar documentação da linguagem de programação Go.

??? abstract "GPT sugestão"

    Faz **total sentido** e é, na verdade, a **melhor solução** que chegamos até agora! 

    Usar a linguagem Go (Golang) resolve completamente o problema da vaguidade. Eles não precisam inventar regras de negócio fictícias e não precisam lidar com um "texto chato" só para cumprir tabela. Eles vão documentar algo que é real, tangível, técnico e que tem farta referência na internet.

    Na disciplina de *Collaboration Tools for Teams*, o que importa não é o tema do site, mas sim **como o time trabalha junto para construir e entregar esse site**. Construir a documentação de uma linguagem é exatamente o que as equipes de Open Source fazem no dia a dia.

    Veja por que essa ideia é perfeita para a sua disciplina e como você pode dividir:

    **Por que se encaixa na disciplina?**

    1. **Foco na Ferramenta, não na Invenção:** Como as regras do Go já existem (ex: como declarar uma variável, o que é uma Goroutine), o esforço cognitivo do grupo vai 100% para o Git, GitHub, Markdown e CI/CD.
    2. **Uso rico de Markdown:** Documentar Go exige muitos blocos de código (` ```go `), tabelas comparativas e links internos.
    3. **Colaboração Real:** Eles estarão simulando uma equipe de *DevRel* (Developer Relations) ou mantenedores de um projeto Open Source.

    **Como dividir o projeto "Go Docs" para os 5 alunos**

    Para garantir que eles usem o Git corretamente e gerem os conflitos necessários para o aprendizado, você pode dividir os módulos do Go da seguinte forma:

    **Aluno 1: O Guia de Início Rápido (Onboarding)**
    * **Missão:** Documentar como instalar o Go (Windows, Mac, Linux), como configurar o `GOPATH` (ou Go Modules) e criar a página do clássico "Hello World".
    * **Impacto no Git:** Esse aluno será responsável por criar o repositório inicial, configurar o Zensical e fazer o primeiro commit estrutural.

    **Aluno 2: Tipos Básicos e Coleções**
    * **Missão:** Criar as páginas explicando variáveis, tipos primitivos, *Arrays*, *Slices* e *Maps* no Go. 
    * **Impacto no Git:** Vai precisar criar uma branch `feature/tipos-basicos` e adicionar essas páginas no menu de navegação lateral (o arquivo `zensical.toml` ou similar), cruzando com o trabalho dos colegas.

    **Aluno 3: Estruturas de Controle e Funções**
    * **Missão:** Documentar como funciona o `if/else`, o `for` (lembrando que Go não tem `while`), o `switch`, e como criar funções (incluindo funções com múltiplos retornos, que é um clássico do Go).

    **Aluno 4: O Coração do Go (Concorrência & Structs)**
    * **Missão:** Essa é a parte mais legal do Go. O aluno deve documentar como criar `Structs` (já que Go não tem classes tradicionais) e explicar o básico de *Goroutines* e *Channels* com exemplos de código.

    **Aluno 5: O Engenheiro DevOps da Equipe**
    * **Missão:** Enquanto os outros 4 escrevem o conteúdo, este aluno é o dono da esteira. Ele vai criar as **GitHub Actions**.
    * **Tarefas Técnicas:** Criar o workflow de CI (para rodar um linter de Markdown nos textos dos colegas e bloquear o Pull Request se tiver erro) e o workflow de CD (para fazer o deploy do Zensical gerado para o GitHub Pages).


    ### A Dinâmica de Git e Conflitos

    Como os alunos de 1 a 4 precisarão registrar suas novas páginas no arquivo de menu principal do site ao mesmo tempo, **os conflitos de Git vão acontecer naturalmente**. Eles serão obrigados a abrir os *Pull Requests*, fazer revisões de código cruzadas (um aluno aprova o PR do outro) e resolver os conflitos de merge na interface do GitHub ou no terminal.

    Isso entrega o que a disciplina pede: uso real de Git/GitHub, processos de Pull Request, CI/CD automatizado com Actions e Docs-as-Code.

## Zensical

??? abstract "Referências"
    - [Zensical Documentation](https://zensical.org/docs/get-started/)

```bash
# instalação
python3 -m venv .venv
source .venv/bin/activate
pip install zensical

zensical new .

zensical serve
```

Tem o [script actions](https://zensical.org/docs/publish-your-site/) pra fazer rodar no github pages.

Há várias opções de [customização](https://zensical.org/docs/customization/).