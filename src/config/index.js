require("dotenv").config();
const convict = require("convict");

const config = convict({
  env: {
    doc: "The application environment.",
    format: ["development", "test", "production"],
    default: "dev",
    arg: "nodeEnv",
    env: "NODE_ENV"
  },
  grpc_port: {
    doc: "The GRPC port to bind.",
    format: "port",
    default: 8080,
    env: "GRPC_PORT",
    arg: "grpc_port"
  },
  rest_port: {
    doc: "The REST API port to bind.",
    format: "port",
    default: 8080,
    env: "REST_PORT",
    arg: "rest_port"
  },
  mongo_uri: {
    doc: "MongoDB URI string",
    format: "*",
    default: "mongodb://localhost:27017/test",
    env: "MONGO_URI",
    arg: "mongo_uri"
  },
  salting_rounds: {
    doc: "Salting rounds for the cryptography algorithm",
    format: "int",
    default: 10,
    env: "SALTING_ROUNDS",
    arg: "salting_rounds"
  }
});

// Load environment dependent configuration
var env = config.get("env");
config.loadFile("./config/" + env + ".json");

// Perform validation
config.validate({ allowed: "strict" });

module.exports = config;
