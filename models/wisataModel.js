const mongoose = require("mongoose");

const wisataSchema = new mongoose.Schema({
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true },
  nama: { type: String, required: true },
  foto: { type: String, required: true },
  public_id: { type: String, required: false, default: null },
  deskripsi: { type: String, required: true },
  alamat: { type: String, required: true },
  telepon: { type: String, required: true },
});

module.exports = mongoose.model("Wisata", wisataSchema);
