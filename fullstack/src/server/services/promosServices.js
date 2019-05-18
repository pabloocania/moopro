const mongoose = require("mongoose");

const Promo = require("../dbmodels/promo");
const promoDTO = require("../dtos/promosDTO");

module.exports = {
  newPromo: function newPromo(promo) {
    return new Promise((resolve, reject) => {
      Promo.findOne({ title: promo.title }).then((resultadoFindOne) => {
        if (!resultadoFindOne) {
          const newPromoObj = new Promo(promo);
          newPromoObj
            .save()
            .then(promoCreada => resolve(promoDTO.getPromocionesDTO(promoCreada)))
            .catch(error => reject(new Error(error)));
        } else {
          reject(new Error("Promocion existente"));
        }
      });
    });
  },
  getPromosOfShop: function getPromosOfShop(shopId) {
    return new Promise((resolve, reject) => {
      Promo.find({ shopId })
        .then(promos => resolve({
          promos: promos.map(p => promoDTO.getPromocionesDTO(p))
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  getPromos: function getPromos() {
    return new Promise((resolve, reject) => {
      Promo.find({})
        .then(promos => resolve({
          promos: promos.map(p => promoDTO.getPromocionesDTO(p))
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  getPromocionByID: function getPromocionByID(id) {
    return new Promise((resolve, reject) => {
      Promo.findOne({ _id: id })
        .then((promo) => {
          if (promo) {
            resolve(promoDTO.getPromocionesDTO(promo));
          } else {
            reject(new Error("Promoción no encontrada"));
          }
        })
        .catch(error => reject(new Error(error)));
    });
  },
  getPromosBy: function getPromosBy(filter) {
    return new Promise((resolve, reject) => {
      Promo.find(filter)
        .then(promociones => resolve({
          promociones: promociones.map(p => promoDTO.getPromocionesDTO(p))
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  updatePromo: function updatePromo(id, promocion) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Promo.findOneAndUpdate({ _id: id }, { $set: promocion }, { new: true })
          .then((docs) => {
            resolve(docs);
          })
          .catch((error) => {
            reject(new Error(error));
          });
      } else {
        reject(new Error("id invalido"));
      }
    });
  },
  deletePromo: function deletePromo(id) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Promo.findOneAndRemove({ _id: id })
          .then((docs) => {
            resolve(docs);
          })
          .catch((error) => {
            reject(new Error(error));
          });
      } else {
        reject(new Error("id invalido"));
      }
    });
  }
};
