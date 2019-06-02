const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const floorsSchema = new Schema({
  number: { type: String, required: true },
  capacity: { type: Number, required: true, default: 0 },
  occupancy: { type: Number, required: true, default: 0 },
  groups: [{ type: Schema.Types.ObjectId, ref: "Group" }]
});

const buildingSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  max_capacity: { type: Number, required: true, default: 0 },
  occupancy: { type: Number, required: true, default: 0 },
  floors: [floorsSchema]
});

const Floor = Mongoose.model("Floors", floorsSchema);
const Building = Mongoose.model("Building", buildingSchema);

module.exports = { Building, Floor };
