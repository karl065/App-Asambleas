const {
  getHandlerPredios,
} = require('../../Handlers/HandlerPredios/GetHandlerPredios');
const {
  postHandlerPredios,
} = require('../../Handlers/HandlerPredios/PostHandlerPredios');

const router = require('express').Router();

router.post('/', postHandlerPredios);
router.get('/', getHandlerPredios);

module.exports = router;
