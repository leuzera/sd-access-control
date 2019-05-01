class AuthHandler {
  authPerson(call, callback) {
    let authorized = false;

    // TODO: look at database for user

    return callback(null, { authorized });
  }
}

module.exports = AuthHandler;
