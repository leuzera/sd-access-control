const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const groupSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  permissions: {
    type: String,
    enum: ["vacancy", "full"],
    required: true,
    trim: true
  }
});

const Group = Mongoose.model("Group", groupSchema);

module.exports = Group;
