const {
  deleteHandlerIntervenciones,
} = require('../../Handlers/HandlerIntervenciones/DeleteIntervencionesHandler');
const {
  getHandlerIntervenciones,
} = require('../../Handlers/HandlerIntervenciones/GetIntervencionesHandler');
const {
  postHandlerIntervenciones,
} = require('../../Handlers/HandlerIntervenciones/PostIntervencionesHandler');
const {
  putHandlerIntervenciones,
} = require('../../Handlers/HandlerIntervenciones/PutIntervencionesHandler');

const router = require('express').Router();

router.post('/', postHandlerIntervenciones);
router.delete('/:id', deleteHandlerIntervenciones);
router.put('/:id', putHandlerIntervenciones);
router.get('/', getHandlerIntervenciones);

module.exports = router;
