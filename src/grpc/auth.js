let users = [
  { username: "leonardo", password: "leo123", code: "w2c33caFS3zwS9" },
  { username: "andreia", password: "senha123", code: "GaG29UJTN273e7F" }
];

class AuthHandler {
  authPerson(call, callback) {
    let authorized = false;

    for (let u of users) {
      if (u.code === call.request.token) {
        authorized = true;
      }
    }

    console.log(authorized);
    return callback(null, { authorized });
  }
}

module.exports = AuthHandler;
