module.exports = {
  // returns a DTO object parsing the internal parameters
  getShopsDTO: function getShopsDTO({
    _id = "",
    name = "",
    address = "",
    phone = "",
    geopoint = null,
    facebook = "",
    instagram = "",
    twitter = "",
    whatsapp = "",
    categories = [],
    user,
    // localidad,
    city = "",
    region = "",
    imagenUrl,
    metadata = null,
    placeId = ""
  } = {}) {
    // here we can modify the return to adapt the information to the view and viceversa
    return {
      _id,
      name,
      address,
      phone,
      geopoint,
      facebook,
      instagram,
      twitter,
      whatsapp,
      categories,
      user,
      // localidad,
      city,
      region,
      imagenUrl,
      metadata,
      placeId
    };
  }
};
