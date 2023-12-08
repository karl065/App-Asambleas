const Usuarios = require('../Models/Usuarios.js');
const bcryptjs = require('bcryptjs');
const {PSWROOT} = process.env;

const superUser = async () => {
  const root = await Usuarios.findOne({documento: 'SuperAdmin'});

  const password = await bcryptjs.hash(PSWROOT, 10);
  try {
    if (!root) {
      const SuperUser = {
        documento: 'SuperAdmin',
        primerNombre: 'SuperAdmin',
        password: password,
        role: 'SuperAdmin',
        userStatus: false,
      };

      const usuario = new Usuarios(SuperUser);

      const rootSuperUser = await usuario.save();

      return rootSuperUser;
    }
    return root;
  } catch (error) {
    return error;
  }
};

module.exports = {superUser};
