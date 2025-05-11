import deleteHandlerUsuarios from '../../Handlers/HandlersUsers/DeleteUsersHandler.js';
import getHandlerUsers from '../../Handlers/HandlersUsers/GetUsersHandler.js';
import postHandlerUsers from '../../Handlers/HandlersUsers/PostUsersHandler.js';
import putUsersHandler from '../../Handlers/HandlersUsers/PutUsersHandler.js';

import express from 'express';

const router = express.Router();

router.post('/', postHandlerUsers);
router.get('/', getHandlerUsers);
router.put('/:id', putUsersHandler);
router.delete('/:id', deleteHandlerUsuarios);

export default router;
