const {
  crearUsuario,
} = require('../../Controllers/ControllersUsers/PostControllerUsers.js');
const {conectarDB} = require('../../config/DB.js');

const postHandlerUsers = async (req, res) => {
  try {
    const {DBConectada, usuarios} = req.body;
    const dbConnection = await conectarDB(DBConectada);
    const dataUser = await crearUsuario(dbConnection, usuarios);
    return res.status(201).json(dataUser);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerUsers};
