const mongoose = require("mongoose");
const shopDTO = require("../dtos/shopsDTO");

const Shop = require("../dbmodels/shop");

module.exports = {
  newShop: function newShop(shop) {
    return new Promise((resolve, reject) => {
      Shop.findOne({ nombre: shop.nombre }).then((resultadoFindOne) => {
        if (!resultadoFindOne) {
          const nuevo = new Shop(shop);
          nuevo
            .save()
            .then(createdShop => resolve(shopDTO.getShopsDTO(createdShop)))
            .catch(error => reject(new Error(error)));
        } else {
          reject(new Error("Comercio existente"));
        }
      });
    });
  },
  getShops: function getShops() {
    return new Promise((resolve, reject) => {
      Shop.find({})
        .then(shops => resolve({
          shops: shops.map(c => shopDTO.getShopsDTO(c))
        }))
        .catch(error => reject(new Error(error)));
    });
  },
  getShopByID: function getShopByID(id) {
    return new Promise((resolve, reject) => {
      Shop.findOne({ _id: id })
        .then((c) => {
          if (c) {
            resolve(shopDTO.getShopsDTO(c));
          } else {
            reject(new Error("Comercio no encontrado"));
          }
        })
        .catch(error => reject(new Error(error)));
    });
  },
  updateShop: function updateShop(id, comercio) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Shop.findOneAndUpdate({ _id: id }, { $set: comercio }, { new: true })
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
  deleteShop: function deleteShop(id) {
    return new Promise((resolve, reject) => {
      if (mongoose.Types.ObjectId.isValid(id)) {
        Shop.findOneAndRemove({ _id: id })
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
  getShopsDTO: function getShopsDTO() {
    return new Promise((resolve, reject) => {
      resolve(shopDTO.getShopsDTO());
    });
  }
};
