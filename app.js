import { loadPackageDefinition, Server, ServerCredentials } from 'grpc';
import { load } from '@grpc/proto-loader';

const ADDR = '0.0.0.0:8080';

class AuthHandler {
    authPerson(call, callback) {
        return callback(null, true);
    }
}

const server = (bindPath, handler) => {
    load('auth.proto', { includeDirs: ['./protos'] })
        .then((packageDefinition) => {
            const packageDef = loadPackageDefinition(packageDefinition);
            const service = packageDef.person_auth.PersonAuth.service;
            const server = new Server();

            server.addService(service, handler);
            server.bind(bindPath, ServerCredentials.createInsecure());

            server.start();
            console.log('Server started at ', bindPath);
        })
        .catch((e) => {
            console.log('error: ', e);
        });
};

server(ADDR, new AuthHandler());