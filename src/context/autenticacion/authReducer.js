import {
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION,
    OBTENER_USUARIO
} from '../../types';

export default (state, action) => {
    switch (action.type) {

        case CERRAR_SESION:
        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                usuario: null,
                autenticado: null,
                mensaje: action.payload
            }
        case LOGIN_EXITOSO:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                autenticado: true,
                mensaje: null
            }
        case OBTENER_USUARIO:
            return {
                ...state,
                usuario: action.payload
            }
    
        default:
            return state;
    }
}