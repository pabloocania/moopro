const moment = require("moment");

module.exports = {
  getPromocionesDTO: function getPromocionesDTO({
    _id = "",
    title = "",
    description = "",
    from,
    until,
    validDay = "",
    active = false,
    image = "",
    link = [],
    keywords = [],
    originalValue = 0,
    discountValue = 0,
    discountPercentage = 0,
    shopId = "",
    generated = 0,
    available = 0,
    peopleReq = 1
  } = {}) {
    return {
      _id,
      title,
      description,
      from: moment(from).format("DD-MM-YYYY"),
      until: moment(until).format("DD-MM-YYYY"),
      validDay,
      active,
      image,
      link,
      keywords,
      originalValue,
      discountValue,
      discountPercentage,
      shopId,
      generated,
      available,
      peopleReq
    };
  }
};
