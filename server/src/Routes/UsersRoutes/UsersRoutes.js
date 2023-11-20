const {
  deleteHandlerUsuarios,
} = require('../../Handlers/HandlersUsers/DeleteUsersHandler');
const {
  getHandlerUsers,
} = require('../../Handlers/HandlersUsers/GetUsersHandler');
const {
  postHandlerUsers,
} = require('../../Handlers/HandlersUsers/PostUsersHandler');
const {
  putUsersHandler,
} = require('../../Handlers/HandlersUsers/PutUsersHandler');

const router = require('express').Router();

router.post('/', postHandlerUsers);
router.get('/', getHandlerUsers);
router.put('/:id', putUsersHandler);
router.delete('/:id', deleteHandlerUsuarios);

module.exports = router;
