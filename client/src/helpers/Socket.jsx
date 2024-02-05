import io from 'socket.io-client';
import server from '../conexiones/conexiones';

export const socket = io(server.api.baseURL, {reconnection: true});
