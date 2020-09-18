import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import prospectoContext from '../../context/prospectos/prospectoContext';

const Prospectos = ({prospecto}) => {

    //Obtener state de prospectos
    const prospectosContext = useContext(prospectoContext);
    const { prospectoActual, cambiarEstadoProspecto } = prospectosContext;

    //Modifica el estado actual del prospecto
    const cambiarEstado = (prospecto,e) => {
        
        switch (e) {
            case "Autorizado":
                prospecto: prospecto.estatus = e
                break;

            case "Descartado":
                prospecto: prospecto.estatus = e
                break;
        
            default:
                break;
        }
        console.log(prospecto)
        cambiarEstadoProspecto(prospecto);
        //onClick={() => prospectoActual(prospecto._id)}
        
    }
    const mostrarDatos = (prospectoId) => {
        let mostrar = document.getElementById(`items-aparecer${prospecto._id}`);

        if(mostrar.className === 'items-ocultos'){
            mostrar.classList.remove('items-ocultos');
            mostrar.classList.add('mostrar-items');
        } else {
            mostrar.classList.remove('mostrar-items');
            mostrar.classList.add('items-ocultos');
        }
    }

    return(
        <>
            
            {/** Elementos de la tabla*/}
            <div className="item-tabla left-border-item" onClick={() => prospectoActual(prospecto._id)}>
                {prospecto.nombre}
            </div>
            
            <div className="item-tabla">{prospecto.primerApellido}</div>
            {prospecto.segundoApellido
                ? <div className="item-tabla">{prospecto.segundoApellido}</div>
                : <div className="item-tabla"></div>}
            
            <select className="item-tabla" defaultValue={prospecto.estatus} onChange={(e) => cambiarEstado(prospecto,e.target.value)}>
                <option value="Autorizado">Autorizado</option>
                <option value="Descartado">Descartado</option>
                {prospecto.estatus === "Enviado"
                    ? <option value="Enviado">Enviado</option>
                    : null
                }
                
                
            </select>

            <div className="item-tabla right-border-item" onClick={() => mostrarDatos(prospecto._id)} >&#43;</div>
            
            <div className="items-ocultos" id={`items-aparecer${prospecto._id}`}>
                <div className="item-tabla">Calle: {prospecto.calle}</div>
                <div className="item-tabla">Numero: {prospecto.numero}</div>
                <div className="item-tabla">Colonia: {prospecto.colonia}</div>
                <div className="item-tabla">Codigo Postal: {prospecto.codigoPostal}</div>
                <div className="item-tabla">Teléfono: {prospecto.telefono}</div>
                <div className="item-tabla">RFC: {prospecto.rfc}</div>
            </div>

        </>
    );
}

export default Prospectos;