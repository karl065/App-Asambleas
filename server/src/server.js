const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const router = require('./Routes');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
const httpServer = http.createServer(server); // Crea un servidor HTTP
const io = socketIO(httpServer, {
  cors: {
    origin: '*', // Ajusta según tu configuración de React
    methods: ['GET', 'POST'],
  },
}); // Crea una instancia de Socket.io

server.use(morgan('dev'));
server.use(express.json());
server.use(helmet());

// Cross-Origin-Opener-Policy configuration
server.use(
  helmet.crossOriginOpenerPolicy({
    policy: 'same-origin-allow-popups',
  })
);

server.use(cors());

server.use(router);

module.exports = {server, httpServer, io};
