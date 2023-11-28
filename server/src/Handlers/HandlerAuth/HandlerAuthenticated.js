const { authenticatedUser } = require("../../auth/authenticatedUser");

/**
 * La función `handlerAuthenticated` es una función asíncrona que maneja las solicitudes para recuperar
 * la información de un usuario autenticado y devuelve una respuesta JSON con los datos del usuario o
 * un mensaje de error.
 * @param req - El parámetro `req` es el objeto de solicitud que contiene información sobre la
 * solicitud HTTP entrante, como los encabezados de la solicitud, el cuerpo de la solicitud y los
 * parámetros de la solicitud. Se utiliza para recuperar datos del cliente y pasarlos al servidor.
 * @param res - El parámetro `res` es el objeto de respuesta que se usa para enviar la respuesta al
 * cliente. Contiene métodos y propiedades que le permiten establecer el código de estado, los
 * encabezados y enviar el cuerpo de la respuesta. En este fragmento de código, se usa para enviar una
 * respuesta JSON con el objeto de usuario
 * @returns una respuesta con un código de estado de 200 y un objeto JSON que contiene la información
 * del usuario autenticado.
 */
const handlerAuthenticated = async (req, res) => {
  try {
    const { id } = req.user;
    const user = await authenticatedUser(id);
    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = { handlerAuthenticated };
