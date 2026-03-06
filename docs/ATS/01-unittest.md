---
hide:
  - navigation
---

# UnitTest

O unittest é focado primordialmente em Testes de Unidade (ou Testes Unitários), como o próprio nome sugere. Esses testes servem para verificar se as menores partes de um sistema (as "unidades") estão funcionando exatamente como deveriam, de forma isolada.

Uma unidade é geralmente:

- Uma única função.
- Um método de uma classe.
- Um pequeno componente lógico.

Ele é o framework de testes padrão do Python pois já vem instalado com a linguagem (built-in). É fortemente inspirado no JUnit (do Java), o que significa que ele é baseado em Programação Orientada a Objetos. Assim, para criar um teste, você precisa obrigatoriamente criar uma classe que herda de `unittest.TestCase`.

```py hl_lines="6-8"
import unittest

def soma(a, b): # (4)!
    return a + b

class TesteSoma(unittest.TestCase): # (3)!
    def test_funcao_soma(self): # (1)!
        self.assertEqual(soma(10, 5), 15)

if __name__ == '__main__': # (2)!
    unittest.main()
```

1. Só executa funções que comecem com `test_*`
2. Permite que execute o arquivo como um script Python comum
3. Diz que a classe herda de `unittest.TestCase`, identificando ele como um teste
4. Função que será testada, para fins didáticos está no mesmo arquivo que o teste

Rode com `python3 unittest01.py`

Tendo como resultado:

```
[giobon@giovani-a320mh UNITTEST]$ python3 <nome-arquivo>.py 
.
----------------------------------------------------------------------
Ran 1 test in 0.000s

OK
```

Exibirá um ponto (`.`) para cada teste com sucesso ou um `F` para cada falha.

## Assert Methods

Quando você cria uma classe que herda de `unittest.TestCase`, essa classe ganha acesso aos Assert Methods (ou métodos de afirmação) através do `self`. A grande vantagem deles sobre o `assert` comum do Python é que, se o teste falhar, eles explicam por que falhou.

Os Assert Methods mais usados são: 

| Método                     | Checa que                  | Descrição                                           |
|---------------------------|---------------------------|-----------------------------------------------------|
| `assertEqual(a, b)`     | a == b                    | Verifica se a e b são iguais.                       |
| `assertNotEqual(a, b)`  | a != b                    | Verifica se a e b são diferentes.                   |
| `assertTrue(x)`         | bool(x) é True           | Verifica se a condição x é verdadeira.              |
| `assertFalse(x)`        | bool(x) é False          | Verifica se a condição x é falsa.                   |
| `assertIs(a, b)`        | a é b                     | Verifica se a e b são o mesmo objeto.              |
| `assertIsNot(a, b)`     | a não é b                 | Verifica se a e b não são o mesmo objeto.          |
| `assertIsNone(x)`       | x é None                  | Verifica se x é None.                               |
| `assertIsNotNone(x)`    | x não é None              | Verifica se x não é None.                           |
| `assertIn(a, b)`        | a em b                    | Verifica se a está contido em b (como listas ou dicionários). |
| `assertNotIn(a, b)`     | a não em b                | Verifica se a não está contido em b.                |
| `assertIsInstance(a, b)` | isinstance(a, b)         | Verifica se a é uma instância de b.                 |
| `assertNotIsInstance(a, b)` | não isinstance(a, b) | Verifica se a não é uma instância de b.            |
| `assertIsSubclass(a, b)`  | issubclass(a, b)       | Verifica se a é uma subclasse de b.                 |
| `assertNotIsSubclass(a, b)` | não issubclass(a, b)  | Verifica se a não é uma subclasse de b.             |

### `assertRaises`

O `assertRaises` é um método do módulo unittest que verifica se uma função específica levanta uma exceção esperada quando é executada. Ao usar esse método, o desenvolvedor pode garantir que o código se comporta corretamente em situações de erro, validando se a exceção correta é gerada em resposta a condições inesperadas.

Imagine uma função simples de divisão. O Python não consegue dividir por zero e lança um `ZeroDivisionError`. Podemos testar se isso realmente acontece:

```py hl_lines="8"
import unittest

def dividir(a, b):
    return a / b

class TesteDivisao(unittest.TestCase):
    def test_erro_divisao_por_zero(self):
        with self.assertRaises(ZeroDivisionError): # (1)!
            dividir(10, 0)

if __name__ == '__main__':
    unittest.main()
```

1. Basicamente diz: "Eu espero que aconteça um `ZeroDivisionError` ao executar o que vem abaixo". Se um erro aconteceu: o `with` captura o erro e verifica se é do tipo que você esperava (`ZeroDivisionError`). Se for, ele "engole" o erro e deixa o teste seguir como sucesso. Se nenhum erro acontecer o `with` entende que algo está errado (já que você esperava um erro) e interrompe o teste como falha.

### `discover`

O comando `python3 -m unittest discover` permite que você procure automaticamente por testes em um projeto inteiro, ao invés de especificar arquivos individualmente. Ao ser executado, ele percorre o diretório atual e suas subpastas em busca de arquivos que começam com `test` (ex: `test_soma.py`, `test_login.py`). Dentro desses arquivos, o comando identifica classes que herdam de `unittest.TestCase` e métodos que começam com `test_`. Em vez de executar testes individualmente, o `discover` reúne todos, executa-os e fornece um único relatório.