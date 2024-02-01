const {
  deleteHandlerRespuestas,
} = require('../../Handlers/HandlersRespuestas/DeleteHandlerRespuestas');
const {
  postHandlerRespuestas,
} = require('../../Handlers/HandlersRespuestas/PostRespuestasHandler');
const {
  putHandlerRespuestas,
} = require('../../Handlers/HandlersRespuestas/PutHandlerRespuestas');
const {
  getHandleRespuestas,
} = require('../../Handlers/HandlersRespuestas/GetHandlerRespuestas');

const router = require('express').Router();

router.post('/', postHandlerRespuestas);
router.get('/', getHandleRespuestas);
router.put('/:id', putHandlerRespuestas);
router.delete('/:id', deleteHandlerRespuestas);

module.exports = router;
