const {postHandlerDB} = require('../../Handlers/HandlerDB/PostHandlerDB');
const {authMiddle} = require('../../Middleware/authMiddle');

const router = require('express').Router();

router.post('/', authMiddle, postHandlerDB);

module.exports = router;
