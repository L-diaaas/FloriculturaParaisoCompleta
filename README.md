# 💐 API e Frontend da Floricultura Paraiso

Este é um projeto completo para uma Floricultura, desenvolvido para fins acadêmicos.

## 👩‍💻 Desenvolvedoras
[Emily Rafaela](https://github.com/Emilyrts)

[Laura Dias](https://github.com/L-diaaas)

[Talita Yuki](https://github.com/taltsolyu)

## 🗃️ Back

Está é uma API RESTfull para gerenciamento de uma floricultura, implementada em Python com framework Flask, utilizando o SQLAlchemy para persistência e documentação com Swagger.

### 🛠️ Funcionalidades

- ✅ CRUD completo (criação, listagem, atualização e remoção) de clientes, compras, itens, produtos e tipos de produtos
- ✅ Documentação interativa via Swagger UI
- ✅ Padrão MVC (Model-View-Controller) com rotas separadas por entidade
- ✅ Banco de dados SQLite para persistência local

### Passos para rodar localmente

- Clone o repositório


        git clone https://github.com/L-diaaas/FloriculturaCompleta.git

        cd FloriculturaCompleta

        cd backend-Floricultura

- Crie o ambiente virtual

        python -m venv venv

        source venv/bin/activate    #Linux/Mac

        venv\Scripts\activate       #Windows

- Instale as dependências

       pip install -r requirements.txt

- Execute a aplicação

        python app.py

### Endpoints principais

- A aplicação estará disponível em:

        http://localhost:5000

- ####  Clientes: 
  Se refere aos clientes da floricultura.

                http://localhost:5000/clientes


    - `GET /clientes` – Listar todos
    - `POST /clientes` – Criar novo
    - `GET /clientes/<id>` – Buscar por ID
    - `PUT /clientes/<id>` – Atualizar
    - `DELETE /clientes/<id>` – Remover

- #### Compras: 
  Representa os registros das compras realizadas pelos clientes da floricultura. Cada compra está associada a um ou mais itens e a um cliente específico.

                http://localhost:5000/compras

    - `GET /compras` – Listar todos
    - `POST /compras` – Criar novo
    - `GET /compras/<id>` – Buscar por ID
    - `PUT /compras/<id>` – Atualizar
    - `DELETE /compras/<id>` – Remover

- #### Itens: 
  Refere-se aos itens individuais que compõem uma compra, contendo informações como quantidade, valor e o produto vinculado.

                http://localhost:5000/itens

    - `GET /itens` – Listar todos
    - `POST /itens` – Criar novo
    - `GET /itens/<id>` – Buscar por ID
    - `PUT /itens/<id>` – Atualizar
    - `DELETE /itens/<id>` – Remover

-  #### Produtos:
   Representa os produtos disponíveis para venda na floricultura, como flores, vasos, arranjos e outros artigos relacionados.

                http://localhost:5000/produtos

    - `GET /produtos` – Listar todos
    - `POST /produtos` – Criar novo
    - `GET /produtos/<id>` – Buscar por ID
    - `PUT /produtos/<id>` – Atualizar
    - `DELETE /produtos/<id>` – Remover

- #### Tipos: 
  Define as categorias ou classificações dos produtos da floricultura (por exemplo: flores naturais, flores artificiais, vasos decorativos).

                http://localhost:5000/tipos

    - `GET /tipos` – Listar todos
    - `POST /tipos` – Criar novo
    - `GET /tipos/<id>` – Buscar por ID
    - `PUT /tipos/<id>` – Atualizar
    - `DELETE /tipos/<id>` – Remover

### Documentação Swagger

A documentação interativa da API pode ser acessada em:

                http://localhost:5000/api/docs


## ⌨️ Front

Aplicação Front-End integrada a uma API administrativa para gerenciamento completo de uma loja online. Este projeto consiste no desenvolvimento do **front-end** de uma aplicação administrativa voltada para o gerenciamento de uma loja. Apesar de existir uma página inicial pública, **o acesso ao sistema é exclusivo para funcionários autorizados**, que devem realizar login para acessar o painel administrativo.

### Como Rodar o Projeto Localmente

- Acesse a pasta do projeto

```bash
cd frontend-Floricultura
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Rode o servidor de desenvolvimento

```bash
npm run dev
```

### 5. Acesse no navegador

```
http://localhost:3000
```

### Login

- Usuário

```
funcionario
```

- Senha

```
flori123
```

