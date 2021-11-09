# 시공〮간 복합 랑데부 기반 실시간 메시징 시스템

## How To Develop

### Install Dependencies

```bash
$ npm install
```

### Configure VSCode Settings

1. Install `Prettier - Code formatter` extension

2. Create file `.vscode/settings.json`

```bash
{
    "editor.formatOnSave": true,
    "[javascript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
    "[javascriptreact]":{ "editor.defaultFormatter": "esbenp.prettier-vscode" },
    "[typescript]": { "editor.defaultFormatter": "esbenp.prettier-vscode" },
    "[typescriptreact]": { "editor.defaultFormatter": "esbenp.prettier-vscode" }
}
```

### Configure .env file

```
NODE_ENV=development
PORT=5000
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=127.0.0.1
ACCESS_TOKEN_SECRET={random string}
```

#### Tip: generate random string

```bash
# Start node console
$ node
# Use crypto library to accquire random bytes and convert it to a string
$ require("crypto").randomBytes(48).toString('hex')
```

### Run the app

```bash
$ npm run dev
```

## Project Structure

```bash
├── client
│   ├── public
│   └── src
│       └── components
│           └── views
│               ├── LandingPage
│               ├── LoginPage
│               ├── NavBar
│               └── RegisterPage
└── server
    ├── config
    ├── controllers
    ├── database
    ├── middleware
    ├── models
    └── routes
```
