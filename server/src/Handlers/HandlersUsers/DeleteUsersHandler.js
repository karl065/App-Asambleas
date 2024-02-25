const {
  deleteControllerUsuarios,
} = require('../../Controllers/ControllersUsers/DeleteControllerUsers');
const { conectarDB } = require('../../config/DB');

const deleteHandlerUsuarios = async (req, res) => {
  try {
    const {id} = req.params;
    const {DBConectada} = req.query

    const dbConnection = await conectarDB(DBConectada); 

    const usuario = await deleteControllerUsuarios(dbConnection, id);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerUsuarios};
