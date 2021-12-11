# PreTalk

## Description

#### 시공〮간 복합 랑데부 기반 실시간 메시징 시스템

## Deployed On

- http://dbproject.duckdns.org:8300/
- 연세대학교 서버에 배포되었기 때문에 교내 네트워크 혹은 VPN 사용 필수

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
DB_PORT=3306
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
│       ├── components
│       │   ├── utils
│       │   └── views
│       │       ├── ChatList
│       │       ├── ChatRoomPage
│       │       ├── EditPage
│       │       ├── FriendListPage
│       │       ├── FriendSearchPage
│       │       ├── LandingPage
│       │       ├── LoginPage
│       │       ├── NavBar
│       │       ├── Nearby
│       │       ├── RegisterPage
│       │       └── Socket
│       └── hoc
└── server
    ├── config
    ├── controllers
    ├── middleware
    ├── models
    └── routes
```
