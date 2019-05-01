const Mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const config = require("../config");

const schema = Mongoose.Schema;

const userSchema = new schema({
  name: { type: "String", required: true, trim: true, unique: true },
  password: { type: "String", required: true, trim: true }
});

userSchema.pre("save", next => {
  const user = this;

  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, config.salting_rounds, (err, hash) => {
      if (err) {
        console.log("Error hashing password from user ", user.name);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
