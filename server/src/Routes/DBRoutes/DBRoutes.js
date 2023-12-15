const {getHandlerDB} = require('../../Handlers/HandlerDB/GetHandlerDB');
const {postHandlerDB} = require('../../Handlers/HandlerDB/PostHandlerDB');
const {authMiddle} = require('../../Middleware/authMiddle');

const router = require('express').Router();

router.post('/', authMiddle, postHandlerDB);
router.get('/', authMiddle, getHandlerDB);

module.exports = router;
