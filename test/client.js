const grpc = require("grpc");
const loader = require("@grpc/proto-loader");

const ADDR = "0.0.0.0:8080";

loader
  .load("auth.proto", { includeDirs: ["./src/protos"] })
  .then(packageDefinition => {
    const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

    const client = new protoDescriptor.person_auth.PersonAuth(
      ADDR,
      grpc.credentials.createInsecure()
    );

    const tokens = [
      "GaG29UJTN273e7F",
      "w2c33caFS3zwS9",
      "error",
      "nothinghere"
    ];
    for (let t of tokens) {
      client.authPerson({ type: 1, token: t }, (err, res) => {
        if (err) console.error(err);

        if (res.authorized) console.log("Entrou ");
        else console.error("Não pode entrar ");
      });
    }
  })
  .catch(e => {
    console.error(e);
  });
