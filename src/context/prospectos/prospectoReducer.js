import {
    OBTENER_PROSPECTOS,
    AGREGAR_PROSPECTO,
    VALIDAR_FORMULARIO,
    PROSPECTO_ACTUAL,
    ESTADO_PROSPECTO
} from '../../types';

export default (state, action) => {
    switch(action.type) {
        
        case OBTENER_PROSPECTOS:
            return {
                ...state,
                prospectos: action.payload
            }
        case AGREGAR_PROSPECTO:
            return {
                ...state,
                prospectos: [...state.prospectos, action.payload]
            }
        case VALIDAR_FORMULARIO:
            return {
                ...state,
                errorformulario: true
            }
        case PROSPECTO_ACTUAL:
            return {
                ...state,
                prospecto: state.prospectos.filter(prospecto => prospecto.id === action.payload)
            }
        case ESTADO_PROSPECTO:
            return {
                ...state,
                prospectos: state.prospectos.map(prospecto => prospecto._id === action.payload._id ? action.payload : prospecto)
            }

        default:
            return state;
    }
}