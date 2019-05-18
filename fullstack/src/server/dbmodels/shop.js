const mongoose = require("mongoose");
const { categorias, categoriaDefault } = require("../dtos/categoriasDTO");
const { localidades, localidadDefault } = require("../dtos/localidadesDTO");

const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const shopsSchema = new Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  geopoint: { type: Object, default: { lat: -26.808285, lng: -65.21759 } },
  facebook: String,
  instagram: String,
  twitter: String,
  whatsapp: String,
  categories: {
    type: [String],
    validate: {
      validator: v => categorias.includes(v[0]),
      message: v => `${v.value} no es valida`
    },
    default: categoriaDefault
  },
  /*
  usuario: {
    type: ObjectId, ref: "usuario", default: null, required: false
  }, */
  user: {
    type: String,
    default: "null"
  },
  imagenUrl: { type: String, default: "" },
  promociones: [{ type: ObjectId, ref: "promocion" }],
  /*
  localidad: { type: String, enum: localidades, default: localidadDefault },
  */
  city: { type: String, default: "Mendoza" },
  region: { type: String, default: "Mendoza" },
  metadata: { type: Object, default: null },
  placeId: { type: String, default: "" }
});

shopsSchema.pre("remove", function (next) {
  this.model("promocion").deleteMany({ shopId: this._id }, next);
  this.model("usuarios").deleteMany({ _id: this.usuario }, next);
});

/* A INVESTIGAR
comerciosSchema.pre('init', function(next, data) {
  User.populate(data, {
    path: 'organization project_list task_list'
  }, function(err, user) {
    data = user;
    next();
  });
});
*/

module.exports = mongoose.model("shop", shopsSchema);
