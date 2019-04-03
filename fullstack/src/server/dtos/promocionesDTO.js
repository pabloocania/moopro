const moment = require('moment');

module.exports = {
  getPromocionesDTO: function getPromocionesDTO({
    _id = '',
    titulo = '',
    descripcion = '',
    vigenciaDesde,
    vigenciaHasta,
    diaValidez = '',
    activa = false,
    imagen = '',
    link = [],
    keywords = [],
    valorOriginal = 0,
    valorConDescuento = 0,
    porcentajeDeDescuento = 0,
    comercioId = '',
    qrId = ''
  } = {}) {
    return ({
      _id,
      titulo,
      descripcion,
      vigenciaDesde: moment(vigenciaDesde).format('DD-MM-YYYY'),
      vigenciaHasta: moment(vigenciaHasta).format('DD-MM-YYYY'),
      diaValidez,
      activa,
      imagen,
      link,
      keywords,
      valorOriginal,
      valorConDescuento,
      porcentajeDeDescuento,
      comercioId,
      qrId
    });
  }
};
