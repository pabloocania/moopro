const mongoose = require("mongoose");

const Promocion = require("../dbmodels/promocion");
const promocionDTO = require("../dtos/promocionesDTO");

module.exports = {
  nuevaPromocion: function nuevaPromocion(promocion) {
    return new Promise((resolve, reject) => {
      Promocion.findOne({ titulo: promocion.titulo })
        .then((resultadoFindOne) => {
          if (!resultadoFindOne) {
            const nuevaPromo = new Promocion(promocion);
            nuevaPromo
              .save()
              .then(promoCreada => resolve(promocionDTO.getPromocionesDTO(promoCreada)))
              .catch(error => reject(new Error(error)));
          } else {
            reject(new Error("Promocion existente"));
          }
        });
    });
  },
  getPromocionesDelComercio: function getPromocionesDelComercio(comercioId) {
    return new Promise((resolve, reject) => {
      Promocion.find({ comercioId })
        .then(promociones => resolve({
          "promociones": promociones.map(
            p => (promocionDTO.getPromocionesDTO(p))
          )
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  getPromociones: function getPromociones() {
    return new Promise((resolve, reject) => {
      Promocion.find({})
        .then(promociones => resolve({
          "promociones": promociones.map(
            p => (promocionDTO.getPromocionesDTO(p))
          )
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  getPromocionByID: function getPromocionByID(id) {
    return new Promise((resolve, reject) => {
      Promocion.findOne({ _id: id })
        .then((promocion) => {
          if (promocion) {
            resolve(promocionDTO.getPromocionesDTO(promocion));
          } else {
            reject(new Error("Promoción no encontrada"));
          }
        })
        .catch(error => reject(new Error(error)));
    });
  },
  getPromocionesSegun: function getPromocionesSegun(filtro) {
    return new Promise((resolve, reject) => {
      Promocion.find(filtro)
        .then(promociones => resolve({
          "promociones": promociones.map(
            p => (promocionDTO.getPromocionesDTO(p))
          )
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  actualizarPromocion: function actualizarPromocion(id, promocion) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Promocion.findOneAndUpdate({ _id: id }, { $set: promocion }, { new: true })
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
  borrarPromocion: function borrarPromocion(id) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Promocion.findOneAndRemove({ _id: id })
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
