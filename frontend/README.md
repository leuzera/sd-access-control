# access-control

> Admin panel to Access Control

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).

## Configuration

This project accepts a `.env` file. Below you can see a configuration example.

```
API_HOST=127.0.0.1
API_PORT=8080
API_PREFIX=/v1/
API_HTTPS=false
```

`API_HOST`, `API_PREFIX` and `API_PORT` are used to form the REST API Server as follow `http(s)://[API_HOST]:[API_PORT][API_PREFIX]`. You can alse set `BASE_URL`.

`API_HTTPS` defines the use of HTTPS.

On Linux, these option can also be set with environment variables.

## Deploying

To deploy this site on [Netlify](https://www.netlify.com), select the `website` branch. Other configuration can be found at `netlify.toml`.
