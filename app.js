const grpc = require("grpc");
const loader = require("@grpc/proto-loader");
const AuthHandler = require("./src/auth.js");

const ADDR = "0.0.0.0:8080";

const server = (bindPath, handler) => {
  loader
    .load("auth.proto", { includeDirs: ["./protos"] })
    .then(packageDefinition => {
      const packageDef = grpc.loadPackageDefinition(packageDefinition);
      const service = packageDef.person_auth.PersonAuth.service;
      const server = new grpc.Server();

      server.addService(service, handler);
      server.bind(bindPath, grpc.ServerCredentials.createInsecure());

      server.start();
      console.log("Server started at ", bindPath);
    })
    .catch(e => {
      console.log("error: ", e);
    });
};

server(ADDR, new AuthHandler());
