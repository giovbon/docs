---
icon: simple/github
hide:
  - navigation
---

# Github e Repositórios Remotos

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../../zSLIDES/02-repos-remotos.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

??? example ":lucide-square-terminal: Configurando chaves ssh e subindo repositório local com git push"

    <div class="asciinema" data-src="../../zASC/06-ssh-git-push.cast" data-speed="2" data-idle-time-limit="4" data-theme="tango"></div> 

!!! danger "Alerta"

    Depois de configurar a chave SSH no github, se você mudar de computador, para poder interagir com repos remotos da sua conta, deverá gerá-la e adicioná-la novamente.

??? example ":lucide-square-terminal: Puxando alterações em repo remoto com git pull"

    <div class="asciinema" data-src="../../zASC/07-git-pull.cast" data-speed="2" data-idle-time-limit="4" data-theme="tango"></div> 