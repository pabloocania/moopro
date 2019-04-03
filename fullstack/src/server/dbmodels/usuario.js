const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const { Schema } = mongoose;

const usuariosSchema = new Schema({
  email: { type: String, required: true, trim: true },
  password: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  activo: { type: Boolean, default: false },
  rol: { type: String, required: true, enum: ['admin', 'comercio'] }
});

function verifyPassword(candidatePassword, cb) { bcrypt.compare(
  candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err, null);
    cb(null, isMatch);
  }
);
}
usuariosSchema.methods.verifyPassword = verifyPassword;

module.exports = mongoose.model('usuario', usuariosSchema);
