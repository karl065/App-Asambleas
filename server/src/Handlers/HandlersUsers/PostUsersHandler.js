const {
  crearUsuario,
} = require('../../Controllers/ControllersUsers/PostControllerUsers.js');

const postHandlerUsers = async (req, res) => {
  try {
    const usuario = req.body;

    const dataUser = await crearUsuario(usuario);
    return res.status(201).json(dataUser);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {postHandlerUsers};
