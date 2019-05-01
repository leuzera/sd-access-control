const grpc = require("grpc");
const loader = require("@grpc/proto-loader");
const AuthHandler = require("./auth.js");

const GrpcServer = bindPath => {
  loader
    .load("auth.proto", { includeDirs: ["./src/protos"] })
    .then(packageDefinition => {
      const packageDef = grpc.loadPackageDefinition(packageDefinition);
      const service = packageDef.person_auth.PersonAuth.service;
      const server = new grpc.Server();

      server.addService(service, new AuthHandler());
      server.bind(bindPath, grpc.ServerCredentials.createInsecure());

      server.start();
      console.log("Server started at ", bindPath);
    })
    .catch(e => {
      console.log("error: ", e);
    });
};

// export { GrpcServer };
module.exports = GrpcServer;
