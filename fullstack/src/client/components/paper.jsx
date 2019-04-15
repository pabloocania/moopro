<Paper className={classes.paper}>
  <Typography variant="h6">
    <Emoji symbol="👉" label="Nombre" />
    {shop.nombre}
  </Typography>
  <Typography variant="subtitle2">
    <Emoji symbol="☎" label="Nombre" />
    {shop.telefono}
  </Typography>
  <Typography variant="body2">
    <Emoji symbol="💈" label="Dirección" />
    {`${shop.direccion} - ${shops.localidad}`}
  </Typography>
  <Button variant="outlined" size="small" className={classes.button}>
    Detalles
  </Button>
  <Button variant="outlined" size="small" className={classes.button}>
    Ver Promociones
  </Button>
</Paper>;
