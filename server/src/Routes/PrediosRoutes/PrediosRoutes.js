import getHandlerPredios from '../../Handlers/HandlerPredios/GetHandlerPredios.js';
import postHandlerPredios from '../../Handlers/HandlerPredios/PostHandlerPredios.js';

import { Router } from 'express';

const router = Router();

router.post('/', postHandlerPredios);
router.get('/', getHandlerPredios);

export default router;
