const mongoose = require("mongoose");
const { categorias, categoriaDefault } = require("../dtos/categoriasDTO");
const { localidades, localidadDefault } = require("../dtos/localidadesDTO");

const { Schema } = mongoose;
const { ObjectId } = mongoose.SchemaTypes;

const comerciosSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  geolocalizacion: { type: [Number], default: [-26.808285, -65.21759] },
  facebook: String,
  instagram: String,
  twitter: String,
  whatsapp: String,
  categorias: {
    type: [String],
    validate: {
      validator: v => categorias.includes(v[0]),
      message: v => `${v.value} no es valida`
    },
    default: categoriaDefault
  },
  usuario: { type: ObjectId, ref: "usuario" },
  imagenUrl: { type: String, default: "" },
  promociones: [{ type: ObjectId, ref: "promocion" }],
  localidad: { type: String, enum: localidades, default: localidadDefault }
});

comerciosSchema.pre("remove", function (next) {
  this.model("promocion").deleteMany({ comercioId: this._id }, next);
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

module.exports = mongoose.model("comercio", comerciosSchema);
