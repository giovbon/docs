---
icon: simple/github
hide:
  - navigation
---

# Branching e Merging

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../zSLIDES/03-branching-merging.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? example ":lucide-square-terminal: Criando e mudando de branches"

    <div class="asciinema" data-src="../../zASC/08-branches.cast" data-speed="2" data-idle-time-limit="4" data-theme="tango"></div> 

??? example ":lucide-square-terminal: Fazendo o merge fast-forward"

    <div class="asciinema" data-src="../../zASC/09-merge-fast.cast" data-speed="2" data-idle-time-limit="4" data-theme="tango"></div> 

??? example ":lucide-square-terminal: Fazendo o merge de três vias"

    <div class="asciinema" data-src="../../zASC/10-merge-tres-vias.cast" data-speed="2" data-idle-time-limit="4" data-theme="tango"></div> 

??? example ":lucide-square-terminal: Fazendo o rebase"

    <div class="asciinema" data-src="../../zASC/11-rebase.cast" data-speed="2" data-idle-time-limit="4" data-theme="tango"></div> 

    Após o rebase repare onde o HEAD está, é necessário movê-lo para a branch mais recente com `git switch main`e depois `git merge rebase`