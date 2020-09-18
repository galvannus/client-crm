import React, { useReducer } from 'react';

import prospectoContext from './prospectoContext';
import prospectoReducer from './prospectoReducer';
import {
    OBTENER_PROSPECTOS,
    AGREGAR_PROSPECTO,
    VALIDAR_FORMULARIO,
    PROSPECTO_ACTUAL,
    ESTADO_PROSPECTO
} from '../../types';
import clienteAxios from '../../config/axios';



const ProspectoState = props => {

    const initialState = {
        prospectos: [],
        errorformulario: false,
        prospecto: null
    }

    //Dispatch para ejecutar las acciones
    const [state, dispatch] = useReducer(prospectoReducer, initialState);

    //Serie de funciones

    //Obtener prospectos
    const obtenerProspectos = async () => {
        try {
            const resultado = await clienteAxios.get('/api/prospectos');
            dispatch({
                type: OBTENER_PROSPECTOS,
                payload: resultado.data.prospectos
            })
        } catch (error) {
            console.log(error)
        }
    }

    //Nuevo prospecto
    const agregarProspecto = async prospecto => {
        
        try {
            //const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            /* let data = new FormData();
            data.append('calle', prospecto.calle);
            data.append('codigoPostal', prospecto.codigoPostal);
            data.append('colonia', prospecto.colonia);
            data.append('nameFile', prospecto.nameFile);
            data.append('nombre', prospecto.nombre);
            data.append('numero', prospecto.numero);
            data.append('primerApellido', prospecto.primerApellido);
            data.append('segundoApellido', prospecto.segundoApellido);
            data.append('rfc', prospecto.rfc);
            data.append('telefono', prospecto.telefono);
            data.append('selectedFile', prospecto.selectedFile);
            console.log(data);

            fetch('http://localhost:4000/api/prospectos',{
                method: 'POST',
                body: data
            })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error)) */

            const resultado = await clienteAxios.post('/api/prospectos', prospecto);

            dispatch({
                type: AGREGAR_PROSPECTO,
                payload: resultado
            });

            
        } catch (error) {
            console.log(error);
        }
    }

    //Validar formulario
    const mostrarError = () => {
        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    //Selecciona el prospecto en el que se dio click
    const prospectoActual = prospectoId => {
        console.log(prospectoId)
        dispatch({
            type: PROSPECTO_ACTUAL,
            payload: prospectoId
        });
    }

    //Cambia el estado del prospecto
    const cambiarEstadoProspecto = async prospecto => {
        
        try {
            const resultado = await clienteAxios.put(`/api/prospectos/${prospecto._id}`,prospecto);
            console.log(resultado);
            dispatch({
                type: ESTADO_PROSPECTO,
                payload: prospecto
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <prospectoContext.Provider
            value = {{
                prospectos: state.prospectos,
                errorformulario: state.errorformulario,
                prospecto: state.prospecto,
                obtenerProspectos,
                agregarProspecto,
                mostrarError,
                prospectoActual,
                cambiarEstadoProspecto
            }}
        >
            {props.children}
        </prospectoContext.Provider>
    )
}
export default ProspectoState;