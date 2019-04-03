const mongoose = require("mongoose");
const comercioDTO = require("../dtos/comerciosDTO");

const Comercio = require("../dbmodels/comercio");


module.exports = {
  nuevoComercio: function nuevoComercio(comercio) {
    return new Promise((resolve, reject) => {
      Comercio.findOne({ nombre: comercio.nombre })
        .then((resultadoFindOne) => {
          if (!resultadoFindOne) {
            const nuevo = new Comercio(comercio);
            nuevo
              .save()
              .then(comercioCreado => resolve(comercioDTO.getComercioDTO(comercioCreado)))
              .catch(error => reject(new Error(error)));
          } else {
            reject(new Error("Comercio existente"));
          }
        });
    });
  },
  getComercios: function getComercios() {
    return new Promise((resolve, reject) => {
      Comercio.find({})
        .then(comercios => resolve({
          "comercios": comercios.map(
            c => (comercioDTO.getComercioDTO(c))
          )
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  getComercioByID: function getComercioByID(id) {
    return new Promise((resolve, reject) => {
      Comercio.findOne({ _id: id })
        .then((c) => {
          if (c) {
            resolve(comercioDTO.getComercioDTO(c));
          } else {
            reject(new Error("Comercio no encontrado"));
          }
        })
        .catch(error => reject(new Error(error)));
    });
  },
  actualizarComercio: function actualizarComercio(id, comercio) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Comercio.findOneAndUpdate({ _id: id }, { $set: comercio }, { new: true })
          .then((docs) => {
            resolve(docs);
          }).catch((error) => {
            reject(new Error(error));
          });
      } else {
        reject(new Error("id invalido"));
      }
    });
  },
  borrarComercio: function borrarComercio(id) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Comercio.findOneAndRemove({ _id: id })
          .then((docs) => {
            resolve(docs);
          }).catch((error) => {
            reject(new Error(error));
          });
      } else {
        reject(new Error("id invalido"));
      }
    });
  }
};
