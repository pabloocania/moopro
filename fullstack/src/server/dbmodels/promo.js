const mongoose = require("mongoose");
const { diasDeLaSemana, diasDeLaSemanaDefault } = require("../dtos/diasDeLaSemanaDTO");

const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const promoSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  from: { type: Date, required: true },
  until: { type: Date, required: true },
  validDay: {
    type: String,
    enum: diasDeLaSemana,
    default: diasDeLaSemanaDefault
  }, // mejorar esta parte
  active: { type: Boolean, default: false },
  image: String,
  links: [String],
  keywords: [String],
  originalValue: { type: Number, default: 0 },
  discountValue: { type: Number, default: 0 },
  discountPercentage: { type: Number, default: 0 },
  shopId: { type: ObjectId, ref: "shop", required: true },
  generated: { type: Number, default: 0 },
  available: { type: Number, default: 0 },
  peopleReq: { type: Number, default: 1 }
});

module.exports = mongoose.model("promo", promoSchema);
