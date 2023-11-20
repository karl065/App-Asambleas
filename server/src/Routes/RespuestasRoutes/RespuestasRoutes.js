const {
  postHandlerRespuestas,
} = require('../../Handlers/HandlersRespuestas/PostRespuestasHandler');
const {
  getHandleRespuestas,
} = require('../../Handlers/HandlersRespuestas/getHandlerRespuestas');

const router = require('express').Router();

router.post('/', postHandlerRespuestas);
router.get('/', getHandleRespuestas);

module.exports = router;
