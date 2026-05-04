---
hide:
  - navigation
---

# Integração

Exemplo simples de integração entre backend e frontend:

<div class="code-explorer" data-src="../zCODE/integracao-back-front.txt" ></div>

O projeto implementa uma arquitetura cliente-servidor desacoplada operando em um ambiente monorepo. O frontend desenvolvido em Next.js utiliza o padrão de App Router com React Server Components. Isso significa que a requisição HTTP para o consumo da API é resolvida diretamente no lado do servidor do Next.js através da API nativa de fetch, injetando os dados no HTML gerado antes de entregar a interface ao navegador. O backend consiste em uma API RESTful construída em Python com o framework FastAPI, executada de forma assíncrona através do servidor ASGI Uvicorn. 

A integração entre os dois serviços ocorre via protocolo HTTP padrão, onde o Next.js atua como cliente consumindo os endpoints expostos pelo FastAPI e trafegando os dados em formato JSON. Para contornar as restrições de segurança do navegador caso requisições client-side sejam necessárias no futuro, o backend implementa o middleware de CORS (Cross-Origin Resource Sharing), modificando os headers da resposta para autorizar explicitamente o tráfego originado da porta onde o frontend está sendo executado. Esse setup garante a interoperabilidade de rede básica entre as runtimes do Node.js e do Python.