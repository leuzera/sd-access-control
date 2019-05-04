const Mongoose = require("mongoose");
const logger = require("../logger");

const Schema = Mongoose.Schema;

const buildingSchema = new Schema({
  name: { type: String, required: true, trim: true },
  max_capacity: { type: Number, required: true },
  occupancy: { type: Number, required: true },
  floors: [{ type: Schema.Types.ObjectId, ref: "Floors" }]
});

const floorsSchema = new Schema({
  _buildingId: { type: Schema.Types.ObjectId, ref: "Building" },
  number: { type: Number, required: true },
  capacity: { type: Number, required: true },
  occupancy: { type: Number, required: true, default: 0 }
});

buildingSchema.methods.addFloor = function(params, callback) {
  let { number, capacity } = params;

  let floor = new Floor({
    _buildingId: this._id,
    number: number,
    capacity: capacity
  });

  floor.save(err => {
    if (err) {
      logger.error(err);
      callback(err);
    }
  });

  this.floors.push(floor);
  this.save(err => {
    if (err) {
      logger.error(err);
      callback(err);
    }
  });
};

buildingSchema.methods.enter = function(params, callback) {
  let { building, floor } = params;
  let canEnter = false;
  // find floor and build capacity and occupancy
  // if occupancy is lower than capacity
  //    let user access
  //    increment floor and building occupancy
  // if not
  //    if user is a funcionário
  //        let user access
  //        increment floor and building occupancy
  //    if not, dont let user access

  callback(null, canEnter);
};

buildingSchema.methods.leave = function(floor_id, callback) {
  // decrement floor and building occupancy
};

const Floor = Mongoose.model("Floors", floorsSchema);
const Building = Mongoose.model("Building", buildingSchema);

module.exports = {
  Building,
  Floor
};
