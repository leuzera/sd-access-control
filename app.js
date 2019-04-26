const grpc = require('grpc');
const loader = require('@grpc/proto-loader');

const ADDR = '0.0.0.0:8080'

class AuthHandler {
    authPerson(call, callback) {
        return callback(null, true);
    }
}

const server = (bindPath, handler) => {
    loader.load('auth.proto', { includeDirs: ['./protos'] })
        .then((packageDefinition) => {
            const package = grpc.loadPackageDefinition(packageDefinition);
            const service = package.person_auth.PersonAuth.service;
            const server = new grpc.Server();

            server.addService(service, handler);
            server.bind(bindPath, grpc.ServerCredentials.createInsecure());

            server.start();
            console.log('Server started at ', bindPath);
        })
        .catch((e) => {
            console.log('error: ', e)
        });
}

server(ADDR, new AuthHandler);