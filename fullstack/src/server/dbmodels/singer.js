const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

const singerSchema = new Schema({
  id: Schema.ObjectId,
  name: { type: String, required: true },
  origin: String,
  styles: [String]
});


module.exports = mongoose.Model('Singer', singerSchema);
