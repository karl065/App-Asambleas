import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Convertir a segundos
    const expired = decodedToken.exp < currentTime;
    decodedToken.expired = expired;
    return decodedToken;
  } catch (error) {
    // Manejar cualquier error al decodificar el token
    console.error('Error al decodificar el token', error);
    return true; // Tratar como expirado en caso de error
  }
};
