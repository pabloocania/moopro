module.exports = {
  // returns a DTO object parsing the internal parameters
  getComercioDTO: function getComercioDTO({
    _id = '',
    nombre = '',
    direccion = '',
    telefono = '',
    geolocalizacion = [],
    facebook = '',
    instagram = '',
    twitter = '',
    whatsapp = '',
    categorias = [],
    usuario,
    localidad
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
      localidad
    };
  }
};
