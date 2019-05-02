const grpc = require("grpc");
const loader = require("@grpc/proto-loader");
const AuthHandler = require("./auth.js");
const logger = require("../logger");

const GrpcServer = port => {
  loader
    .load("auth.proto", { includeDirs: ["./src/grpc/protos"] })
    .then(packageDefinition => {
      const packageDef = grpc.loadPackageDefinition(packageDefinition);
      const service = packageDef.person_auth.PersonAuth.service;
      const server = new grpc.Server();

      server.addService(service, new AuthHandler());
      server.bind(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure());

      server.start();
      logger.info(`Grpc Server started at port ${port}`);
    })
    .catch(e => {
      logger.error(e);
    });
};

// export { GrpcServer };
module.exports = GrpcServer;
