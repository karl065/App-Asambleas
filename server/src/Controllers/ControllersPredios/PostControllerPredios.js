const Predios = require('../../Models/Predios.js');
const Usuarios = require('../../Models/Usuarios.js');
const {
  getControllerUsers,
} = require('../ControllersUsers/GetControllersUsers.js');

const postControllerPredios = async (predios) => {
  try {
    if (!Array.isArray(predios)) {
      predios = [predios];
    }

    // Obtén todos los documentos de usuarios de una vez
    const documentosUsuarios = predios.map((predio) => predio.documento);
    const usuarios = await Usuarios.find({
      documento: {$in: documentosUsuarios},
    });

    const prediosCreados = await Promise.all(
      predios.map(async (predio) => {
        const {documento} = predio;
        const user = usuarios.find((u) => u.documento === documento);

        if (!user) {
          throw new Error(`Usuario con documento ${documento} no encontrado`);
        }

        // Crea el predio sin la propiedad documento y con la nueva propiedad idUsuario
        const nuevoPredio = await Predios.create({
          ...predio,
          idUsuario: user._id,
        });

        // Actualiza la referencia en el usuario
        await Usuarios.findByIdAndUpdate(
          user._id,
          {$push: {predios: nuevoPredio._id}},
          {new: true}
        ).populate('predios');

        return nuevoPredio;
      })
    );

    // Actualiza la lista de usuarios y predios
    const nuevosDatos = await getControllerUsers();
    return nuevosDatos;
  } catch (error) {
    return error;
  }
};

module.exports = {postControllerPredios};
