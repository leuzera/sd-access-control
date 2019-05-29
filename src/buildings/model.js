const Mongoose = require("mongoose");

const Schema = Mongoose.Schema;

const buildingSchema = new Schema({
  name: { type: String, required: true, trim: true, unique: true },
  max_capacity: { type: Number, required: true },
  occupancy: { type: Number, required: true, default: 0 },
  floors: [{ type: Schema.Types.ObjectId, ref: "Floors" }]
});

const floorsSchema = new Schema({
  _buildingId: { type: Schema.Types.ObjectId, ref: "Building" },
  number: { type: Number, required: true },
  capacity: { type: Number, required: true },
  occupancy: { type: Number, required: true, default: 0 }
});

const Floor = Mongoose.model("Floors", floorsSchema);
const Building = Mongoose.model("Building", buildingSchema);

module.exports = { Building, Floor };
