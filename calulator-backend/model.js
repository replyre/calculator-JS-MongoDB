const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: String,
  calculation: String,
});

const CalcModel = mongoose.model("Calculations", UserSchema);
module.exports = CalcModel;
