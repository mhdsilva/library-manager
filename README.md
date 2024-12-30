# Library Manager API

Uma API de gerenciamento de biblioteca desenvolvida com Express.js, Prisma e TypeScript, utilizando arquitetura limpa e princípios SOLID.

## Tecnologias Utilizadas

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- Docker

## Pré-requisitos

- Docker e Docker Compose
- Node.js (para desenvolvimento local)
- npm ou yarn

## Instalação e Execução

### Usando Docker

1. Clone o repositório:

`````git clone https://github.com/seu-usuario/library-manager.git
cd library-manager````

2. Inicie o container:

`docker compose up --build`

### Desenvolvimento Local

1. Instale as dependências:

`npm install`

2. Configure o banco de dados:

```npx prisma generate
npx prisma migrate dev```

3. Inicie o servidor:

`npm run dev`


## Rotas da API

### Autenticação e Usuários

**POST /login**
- Autentica um usuário

```json
    {
        "email": "usuario@email.com",
        "password": "senha123"
    }
```


**POST /usuarios**
- Cria um novo usuário

```json
    {
        "email": "usuario@email.com",
        "password": "senha123",
        "role": "admin"
    }
```


### Livros

**POST /livros** (requer autenticação de admin)
- Adiciona um novo livro

```json
    {
        "titulo": "O Senhor dos Anéis",
        "autor": "J.R.R. Tolkien",
        "isbn": "9788533613379",
        "ano": 1954
    }
```


**GET /livros** (requer autenticação)
- Lista todos os livros
- Suporta busca por título: `/livros?q=senhor`

**GET /livros/:isbn** (requer autenticação)
- Busca um livro específico pelo ISBN

## Autenticação

A API utiliza JWT para autenticação. Para acessar rotas protegidas:
1. Faça login para obter o token
2. Inclua o token no header: `Authorization: Bearer {seu-token}`

## Níveis de Acesso

- **Admin**: Acesso total ao sistema
- **Reader**: Pode apenas consultar livros

## Estrutura do Projeto

```
├── application
│   ├── ports
│   │   ├── RepositorioDeLivros.ts
│   │   └── RepositorioDeUsuarios.ts
│   └── usecases
│       ├── AdicionarLivro.ts
│       ├── AutenticarUsuario.ts
│       ├── BuscarLivroPorISBN.ts
│       ├── BuscarLivroPorTitulo.ts
│       ├── CriarUsuario.ts
│       └── ListarLivros.ts
├── domain
│   ├── Livro.ts
│   └── User.ts
├── index.ts
├── infrastructure
│   ├── middleware
│   │   └── authMiddleware.ts
│   ├── RepositorioDeLivrosMemoria.ts
│   ├── RepositorioDeLivrosPrisma.ts
│   └── RepositorioDeUsuariosPrisma.ts
├── tests
│   ├── adicionarLivro.unit.test.ts
│   ├── buscarLivroPorISBN.unit.test.ts
│   └── listarLivros.unit.test.ts
└── types
    └── express.d.ts ```


`````
