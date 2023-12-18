const {default: mongoose} = require('mongoose');
const {
  putControllerUser,
} = require('../../Controllers/ControllersUsers/PutControllerUsers');

const putUsersHandler = async (req, res) => {
  try {
    const {id} = req.params;
    const updateUser = req.body;
    const usuarioActualizado = await putControllerUser(updateUser, id);
    const {userStatus} = req.body;
    if (!userStatus) mongoose.disconnect();
    return res.status(200).json(usuarioActualizado);
  } catch (error) {
    return res.status(400).json({error: error.message});
  }
};

module.exports = {putUsersHandler};
