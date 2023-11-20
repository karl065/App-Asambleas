const {
  deleteControllerUsuarios,
} = require('../../Controllers/ControllersUsers/DeleteControllerUsers');

const deleteHandlerUsuarios = async (req, res) => {
  try {
    const {id} = req.params;
    const usuario = await deleteControllerUsuarios(id);
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {deleteHandlerUsuarios};
