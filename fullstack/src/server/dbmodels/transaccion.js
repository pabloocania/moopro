const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const transaccionesSchema = new Schema({
  clienteId: { type: Schema.ObjectId, ref: "cliente" },
  qrId: { type: Schema.ObjectId, ref: "qr" }
});


module.exports = mongoose.Model('transaccion', transaccionesSchema);
