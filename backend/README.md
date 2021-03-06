# Access Control API Server

> API server to Access Control

These server has two interfaces, one for a REST API and one for a gRPC API.

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
