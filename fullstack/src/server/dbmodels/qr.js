const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const qrsSchema = new Schema({
  contenido: String
});


module.exports = mongoose.Model('qr', qrsSchema);
