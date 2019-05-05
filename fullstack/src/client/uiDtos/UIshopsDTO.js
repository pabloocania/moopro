module.exports = {
  // returns a DTO object parsing the internal parameters
  getShopsDTO: function getShopsDTO({
    _id = "",
    nombre = "",
    direccion = "",
    telefono = "",
    geolocalizacion = [],
    facebook = "",
    instagram = "",
    twitter = "",
    whatsapp = "",
    categorias = [],
    usuario,
    localidad,
    imagenUrl
  } = {}) {
    // here we can modify the return to adapt the information to the view and viceversa
    return {
      _id,
      nombre,
      direccion,
      telefono,
      geolocalizacion,
      facebook,
      instagram,
      twitter,
      whatsapp,
      categorias,
      usuario,
      localidad,
      imagenUrl
    };
  }
};
