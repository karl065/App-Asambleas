const {
  postHandlerPredios,
} = require('../../Handlers/HandlerPredios/PostHandlerPredios');

const router = require('express').Router();

router.post('/', postHandlerPredios);

module.exports = router;
