---
hide:
  - navigation
---

# Introdução aos Testes de Software

<div class="reveal" style="height: 500px; border: 1px solid #ccc;">
  <div class="slides">
    <section data-markdown="../zSLIDES/01-intro-testes.txt"
             data-separator="^\r?\n---\r?\n$"
             data-separator-vertical="^\r?\n--\r?\n$">
    </section>
  </div>
</div>

## Pirâmide de Testes

![](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fkncykfgi8417hgvcxih3.png)

A pirâmide de testes é uma metáfora visual clássica, criada originalmente por Mike Cohn, que serve como um guia para estruturar a estratégia de testes de um software de forma eficiente. Em sua essência, ela divide os testes em três camadas principais, ilustrando a quantidade ideal de cada tipo de teste que um projeto deve ter. Na base larga da pirâmide, ficam os **testes de unidade**, que são rápidos de executar, baratos para criar e testam pequenos pedaços isolados de código. Subindo para o meio, temos os **testes de integração**, em menor quantidade, que verificam se esses pedaços isolados funcionam bem quando conectados, como a comunicação do sistema com um banco de dados. No topo estreito da pirâmide estão os **testes de ponta a ponta (E2E) ou de interface (UI)**, que simulam o comportamento real do usuário; eles devem existir na menor quantidade possível, pois são lentos, caros de manter e quebram com facilidade.

Compreender e aplicar esse conceito é de extrema importância porque ele ajuda as equipes a equilibrarem custo, velocidade e confiança. Sem a pirâmide, é muito comum que os times caiam no chamado "antipadrão do cone de sorvete", onde investe-se quase todo o tempo fazendo testes manuais ou de interface de usuário pesados e esquecem-se das fundações. Isso resulta em um ciclo de desenvolvimento arrastado: qualquer alteração no código demora horas para ser validada, e quando um teste de tela falha, é muito difícil descobrir qual linha exata de código causou o problema. A pirâmide garante que os desenvolvedores tenham um ciclo de feedback rápido durante a programação diária por meio dos testes de unidade, deixando os testes mais pesados apenas para os fluxos mais críticos do sistema.

Apesar de a ideia original ser muito sólida, hoje em dia você encontrará diversas versões e adaptações da pirâmide simplesmente porque a forma como construímos software mudou de maneira drástica desde que ela foi concebida. A pirâmide original pensava muito em aplicações monolíticas tradicionais. Hoje, nós temos arquiteturas baseadas em microsserviços, aplicações focadas fortemente no frontend (como React ou Angular) e sistemas baseados em nuvem. 

Por conta dessa evolução, novos modelos surgiram para refletir melhor essas realidades. Por exemplo, surgiu o "Troféu de Testes" (Testing Trophy), popularizado por Guillermo Rauch, que defende que no frontend moderno os testes de integração devem ser o foco principal, formando o "bojo" do troféu, pois eles dão mais confiança do que testar componentes visuais isolados. Outro modelo é o "Favo de Mel" (Testing Honeycomb), muito usado no ecossistema de microsserviços, que também foca fortemente em testes de integração para garantir que as dezenas de pequenos serviços conversem bem entre si. No fim das contas, as várias versões não significam que a pirâmide original estava errada, mas sim que o princípio central — investir onde o custo-benefício e a confiança são maiores para o seu contexto específico — precisou se adaptar às novas tecnologias.

| Nível | Tipo de Teste | Características | Quantidade |
| :--- | :--- | :--- | :--- |
| Base | Testes Unitários | Rápidos, isolados, confiáveis | Muitos |
| Meio | Testes de Integração | Verificam comunicação entre componentes | Moderada |
| Topo | Testes E2E/UI | Simulam comportamento do usuário | Poucos |

??? abstract "Leia mais"

    - [Maratona de Testes Automatizados — Step 0: Fundamentos, Importância e a Pirâmide de Testes - DEV Community](https://dev.to/diegobrandao/maratona-de-testes-automatizados-step-0-fundamentos-importancia-e-a-piramide-de-testes-3i6n)