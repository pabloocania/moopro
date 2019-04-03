const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const clientesSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  telefono: String,
  email: String,
  dispositivoId: String
});

/*
id: String
nombre: String
apellido: String
telefono: String
email: String
*/

module.exports = mongoose.Model('cliente', clientesSchema);
