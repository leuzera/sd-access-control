const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const logger = require("../logger");
const config = require("../config");

const schema = Mongoose.Schema;

const userSchema = new schema({
  name: { type: String, required: true, trim: true, unique: true },
  password: { type: String, required: true, trim: true },
  type: {
    type: String,
    required: true,
    trim: true,
    enum: ["customer", "visitor", "employee"],
    default: "visitor"
  },
  admin: { type: Boolean, required: true, default: false }
});

userSchema.pre("save", function(next) {
  const user = this;

  // Se o usuário é novo ou teve a senha modificada, criptografe a senha
  if (!user.isNew || !user.isModified) {
    next();
  } else {
    bcrypt.hash(user.password, config.salting_rounds, (err, hash) => {
      if (err) {
        logger.error(`Error hashing password from user ${user.name}`);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

userSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      logger.error(`Error while authenticating user.\n${err}`);
      return callback(err);
    }

    if (isMatch) logger.debug(`User authenticated.\n${this}`);
    else logger.debug(`User not authenticated.\n${this}`);

    callback(null, isMatch);
  });
};

const User = Mongoose.model("User", userSchema);

module.exports = User;
