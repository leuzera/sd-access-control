const GrpcServer = require("./src/grpc");
const RestServer = require("./src/rest");

const stage = require("./src/config")[process.env.NODE_ENV];

GrpcServer(stage.grpcport);
RestServer(stage.restport);
