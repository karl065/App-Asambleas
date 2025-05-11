import authMiddle from '../../Middleware/authMiddle.js';
import handlerAuthenticate from '../../Handlers/HandlerAuth/HandlerAuthenticate.js';
import handlerAuthenticated from '../../Handlers/HandlerAuth/HandlerAuthenticated.js';

import { Router } from 'express';

const router = Router();

router.post('/', handlerAuthenticate);
router.get('/', authMiddle, handlerAuthenticated);

export default router;
