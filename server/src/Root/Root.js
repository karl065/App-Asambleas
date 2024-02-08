const Usuarios = require('../Models/Usuarios.js');
const DBsAdmin = require('../Models/DBs.js');
const bcryptjs = require('bcryptjs');
const {PSWROOT, PSWVIEW} = process.env;

const superUser = async (DB) => {
  try {
    const root = await Usuarios.findOne({documento: 'SuperAdmin'});
    const password = await bcryptjs.hash(PSWROOT, 10);
    if (!root) {
      const SuperUser = {
        documento: 'SuperAdmin',
        primerNombre: 'SuperAdmin',
        password: password,
        role: 'SuperAdmin',
        userStatus: false,
      };

      const usuario = new Usuarios(SuperUser);
      if (DB) {
        const DBAdmin = new DBsAdmin({nombre: DB});
        const nuevaDBAdmin = await DBAdmin.save();
        const rootSuperUser = await usuario.save();
        return rootSuperUser, nuevaDBAdmin;
      }

      const rootSuperUser = await usuario.save();

      return rootSuperUser;
    }
    return root;
  } catch (error) {
    return error;
  }
};
const viewUser = async () => {
  try {
    const userView = await Usuarios.findOne({documento: 'View'});
    const password = await bcryptjs.hash(PSWVIEW, 10);
    if (!userView) {
      const ViewUser = {
        documento: 'View',
        primerNombre: 'View',
        password: password,
        role: 'View',
        userStatus: false,
      };

      const usuario = new Usuarios(ViewUser);

      const viewUser = await usuario.save();

      return viewUser;
    }
    return userView;
  } catch (error) {
    return error;
  }
};

module.exports = {superUser, viewUser};
