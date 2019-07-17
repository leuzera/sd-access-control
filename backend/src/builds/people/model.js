const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  group: { type: Schema.Types.ObjectId, ref: "Group" }
});

const User = Mongoose.model("User", userSchema);

module.exports = User;
