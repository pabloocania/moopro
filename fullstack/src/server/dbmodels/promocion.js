const mongoose = require('mongoose');
const { diasDeLaSemana, diasDeLaSemanaDefault } = require("../dtos/diasDeLaSemanaDTO");

const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const promocionesSchema = new Schema({
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true },
  vigenciaDesde: { type: Date, required: true },
  vigenciaHasta: { type: Date, required: true },
  diaValidez: {
    type: String,
    enum: diasDeLaSemana,
    default: diasDeLaSemanaDefault
  }, // mejorar esta parte
  activa: { type: Boolean, default: false },
  imagen: String,
  links: [String],
  keywords: [String],
  valorOriginal: { type: Number, default: 0 },
  valorConDescuento: { type: Number, default: 0 },
  porcentajeDeDescuento: { type: Number, default: 0 },
  comercioId: { type: ObjectId, ref: "comercio", required: true },
  qrId: { type: ObjectId, ref: "qr" }
});

module.exports = mongoose.model('promocion', promocionesSchema);
