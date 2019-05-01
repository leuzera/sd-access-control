import { Mongoose } from "mongoose";
import { bcrypt } from "bcrypt";

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
    bcrypt.hash(user.password, saltingRounds, (err, hash) => {
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

export { User };
