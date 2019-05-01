const config = require("./src/config");
const GrpcServer = require("./src/grpc");
const RestServer = require("./src/rest");

GrpcServer(config.grpc_port);
RestServer(config.rest_port);
