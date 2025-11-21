const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model("Admin", adminSchema);
