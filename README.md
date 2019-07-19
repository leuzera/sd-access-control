# Access Control

## Instalando

### Servidor API

Para iniciar a execução do Servidor API é necessário ter os seguintes programas instalados em sua máquina:
• Node.js v11.15.0
• NPM
• MongoDB
Após verificar que estão instalados e funcionando, deve-se configurar o programa através de variáveis de ambiente do Linux ou através do arquivo `.env` presente na pasta raiz. Agora basta executar os seguintes comandos:

```sh
# instalando dependências
$ npm install

# iniciando servidor de desenvolvimento
$ npm run dev

# iniciando servidor em modo produção
$ npm start
```

### Portal Web

Para o Portal Web, deve-se ter instalado apenas o Node.js e o NPM, configurando o arquivo `.env` em sua pasta ou através das variáveis de ambiente. Então pode-se executar os comandos abaixo:

```sh
# instalando dependências
$ npm install

# inicia um servidor local para desenvolvimento
$ npm run dev

# compila para produção e inicia um servidor
$ npm run build
$ npm start

# gera um site estático
$ npm run generate
```

Caso tenha iniciado um servidor, basta acessar o link gerado pelo comando, se tiver gerado um site estático, abra o arquivo `index.html`, presente na pasta `dist/`, em um navegador web para ter acesso ao Painel de Administração.
