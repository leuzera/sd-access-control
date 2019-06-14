# sd-access-control

> API server to Access Control

These server has two interfaces, one for a REST API and one for a gRPC API.

> The Admin Panel can be found at [website branch](/leuzera/sd-access-control/tree/website)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload
$ npm run dev

# run server in  production
$ npm start
```

## Configuration

This project accepts a `.env` file. Below you can see a configuration example.

```
REST_PORT = 8080
GRPC_PORT = 8081
MONGO_URI = "mongodb://localhost:27017/test"
SALTING_ROUNDS = 10
```

`REST_PORT` and `GRPC_PORT` are the REST API and gRPC ports, respective. If you want to set the ports below 1024, you should be run as sudo, but it's not recommended.

`MONGO_URI` should follow the [MongoDB URI schema](https://docs.mongodb.com/manual/reference/connection-string/#components).

`SALTING_ROUNDS` is used to criptografy the user password.

On Linux, these option can also be set with environment variables.

## Depolying

> PM2 Runtime is a Production Process Manager for Node.js applications with a built-in Load Balancer. It allows you to keep applications alive forever, to reload them without downtime and facilitate common Devops tasks.

You can use PM2 do deploy and manage this server. For more information see [PM2 documentation](https://pm2.io/doc/en/runtime/overview/).

The deploy configuration can be found at `ecosystem.config.js`. See the [Ecosystem File Reference](https://pm2.io/doc/en/runtime/reference/ecosystem-file/) for more information on the options.
