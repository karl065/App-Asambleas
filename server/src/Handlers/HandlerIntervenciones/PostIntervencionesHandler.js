const {
  postControllerIntervenciones,
} = require('../../Controllers/ControllersIntervenciones/PostControllerIntervenciones');
const {conectarDB} = require('../../config/DB');

const postHandlerIntervenciones = async (req, res) => {
  try {
    const {DBConectada, intervenciones} = req.body;

    const dbConnection = await conectarDB(DBConectada);

    const nuevoTema = await postControllerIntervenciones(
      dbConnection,
      intervenciones
    );
    console.log(nuevoTema);
    return res.status(200).json(nuevoTema);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerIntervenciones};
