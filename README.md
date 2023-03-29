<h2 align="center" style='font-family: sans-serif'>
	Cadastro_full_stack | API REST (Back-end)
</h2>

<p align = "center">
Este é o backend da aplicação para gerenciamento de clientes e contatos.
</p>

<h2 align="center" style='font-family: sans-serif'>
	Instalação:
</h2>

<p align = "center">
<h2>backend</h2>
<p>cd backend</p>
<p>yarn / npm install</p>
<p>yarn migrate / npm run migrate</p>
<p>yarn dev / npm run dev</p>

<h2>frontend</h2>
<p>cd frontend</p>
<p>cd front</p>
<p>yarn / npm install</p>
<p>yarn dev / npm run dev</p>



<h2 align ='center'>Clientes (Endpoints)</h2>

## **Rotas Sem Autenticação**

<li style='font-size: 20px'>Criação de um Cliente:</li>

<br/>

`POST /api/client - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
    "name": "matheus",
    "email": "matheus@gmail.com",
    "password": "matheus",
    "phone": 99934561234
}
```

Caso dê tudo certo, a resposta será assim:

`POST /api/client- FORMATO DA RESPOSTA - STATUS 201`

```json
{
    "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
    "name": "matheus",
    "email": "matheus@gmail.com",
    "phone": "99934561234",
    "created_at": "2023-03-22T18:03:24.787Z",
}
```

<br/>

<li style='font-size: 20px'>Login do Cliente</li>

<br/>

`POST /api/login - FORMATO DA REQUISIÇÃO - STATUS 201`

```json
{
    "email": "matheus@gmail.com",
    "password": "matheus"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /client/login - FORMATO DA RESPOSTA - STATUS 201`

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Nzk1MDgyMjIsImV4cCI6MTY3OTU5NDYyMiwic3ViIjoiODc3NTYzMzgtODE3Zi00OTZkLWI3ZTEtYzU2OGNmYzVlODJiIn0.HUSu-5Fdec2VvfnkFK5gINXap7DwnvJk1yXrQ4XyH28"
}
```

Caso dê um erro irá retornar o seguinte erro:

```json
{
    "message": "Client Not Found"
}
```

## **Rotas Com Autenticação**

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}

Após o usuário estar logado, ele deve conseguir adicionar os contatos.

> Caso você tente acessar os endpoints sem um token válido receberá o seguinte erro

<br/>

`(Exemplo) POST /api/client/contacts/ - 401 Sem Autorização`

```json
{
    "message": "Invalid token"
}
```

<br/>

> Caso seja informado um id inválido ou diferente do id do usuário logado irá retornar:

```json
{
    "message": "Invalid Credentials Token"
}
```

## <br/>

<li style='font-size: 20px'>Podemos acessar um cliente específico utilizando o endpoint:</li>

<br/>

`GET /api/client/:client_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
    "name": "matheus",
    "email": "matheus@gmail.com",
    "phone": "99934561234",
    "created_at": "2023-03-22T18:03:24.787Z",
    "contacts": []
}
```

<li style='font-size: 20px'>Atualização de um cliente</li>

<br/>

`PATCH /api/client/:client_id - FORMATO DA REQUISIÇÃO`

```json
{
    "email": "matheusvincente@gmail.com",
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /api/client/:client_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
    "id": "87756338-817f-496d-b7e1-c568cfc5e82b",
    "name": "matheus",
    "email": "matheusvincente@gmail.com",
    "phone": "99934561234",
    "created_at": "2023-03-22T18:03:24.787Z",
    "contacts": []
}
```

<li style='font-size: 20px'>Podemos deletar um cliente específico utilizando o endpoint:</li>

<br/>

`DELETE /api/client/:client_id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
    "message": "Client Not Found"
}
```

<h2 align ='center'>Contatos (Endpoints)</h2>

<li style='font-size: 20px'>Criando um contato a partir do cliente logado:</li>

<br/>

`POST /api/client/contact - FORMATO DA REQUISIÇÃO`

```json
{
    "name": "tio",
    "email": "contato2@gmail.com",
    "password": "1234",
    "phone": 78123456789
}
```

Caso dê tudo certo, a resposta será assim:

`POST /contacts - FORMATO DA RESPOSTA - STATUS 201`

```json
{
    	"email": "contato2@gmail.com",
	"name": "tio",
	"phone": "78123456789",
	"client": "bc040c36-3141-4ffb-b34e-3c0d7c7d8b89",
	"id": "5a4c2d40-c7bf-4790-84ba-4fa2be78224c",
	"created_at": "2023-03-27T12:41:19.317Z"
}
```

<li style='font-size: 20px'>Acessando um contato</li>

<br/>


<li style='font-size: 20px'>Atualização de um contato</li>

<br/>

`PATCH /api/client/contact/:contact_id - FORMATO DA REQUISIÇÃO`

```json
{
    "name": "gandalf",
    "email": "gandalf@gmail.com"
}
```

<li style='font-size: 20px'>Caso dê tudo certo, a resposta será assim:</li>

`PATCH /api/client/contact/:contact_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
	"id": "ae5ab33e-ffee-418c-bd92-02f79baeadbb",
	"email": "gandalf@gmail.com",
	"name": "gandalf",
	"phone": "555",
	"created_at": "2023-03-22T16:50:44.884Z"
    }
}
```

<li style='font-size: 20px'>Podemos deletar um contato específico utilizando o endpoint:</li>

<br/>

`DELETE /api/client/contact/:contact_id - FORMATO DA RESPOSTA - STATUS 204`

```json
{}
```

<br/>

<li style='font-size: 20px'>Outra Possível Mensagem de Erro:</li>

<br/>

```json
{
    "message": "Contact Not Found"
}
```

By Bruno Paulin
