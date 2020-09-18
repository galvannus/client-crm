import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import prospectoContext from '../../context/prospectos/prospectoContext';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

import concredito from '../../concredito.svg'

const NuevoProspecto = () => {

    //Extraer información del usuario
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    //Extraer valores del Context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    //Obtener state del formulario
    const prospectosContext = useContext(prospectoContext);
    const {
        errorformulario,
        agregarProspecto,
        mostrarError
    } = prospectosContext;

    //State para Prospecto
    const [prospecto, setProspecto] = useState({
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        calle: '',
        numero: '',
        colonia: '',
        codigoPostal: '',
        telefono: '',
        rfc: '',
        nameFile: '',
        selectedFile: null
    });

    //Extraer campos de prospecto
    const {
        nombre,
        primerApellido,
        segundoApellido,
        calle,
        numero,
        colonia,
        codigoPostal,
        telefono,
        rfc,
        nameFile,
        selectedFile,
    } = prospecto;

    //Lee el contenido de los inputs
    const onChangeProspecto = e => {
        if(e.target.name !== 'selectedFile'){
            setProspecto({
                ...prospecto,
                [e.target.name]: e.target.value
            });
        } else {
            setProspecto({
                ...prospecto,
                [e.target.name]: [e.target.files[0]]
            });
            
        }
        
    }

    //Cuando se envia un prospecto
    const onSubmitProspecto = e => {
        e.preventDefault();

        
        //Validar que no tenga campos vacios
        if(
            nombre.trim() === '' || 
            primerApellido.trim() === '' ||
            calle.trim() === '' ||
            numero.trim() === '' ||
            colonia.trim() === '' ||
            codigoPostal.trim() === '' ||
            telefono.trim() === '' ||
            rfc.trim() === '') {
            mostrarAlerta('Los campos con * son obligatorios', 'alerta-error');
            return;
        }

        //Agregar al state
        agregarProspecto(prospecto);

        //Reiniciar form
        setProspecto({
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            calle: '',
            numero: '',
            colonia: '',
            codigoPostal: '',
            telefono: '',
            rfc: '',
            nameFile: '',
            selectedFile: null
        });
    }

    return(
        <>
            {usuario ? <span>{usuario.email}</span> : null}
            
            {alerta
                ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
                : null}
            
            <nav className="nav-main">
                <ul className="nav-menu">
                    <li className="logo-menu">
                        <img src={concredito}></img>
                    </li>
                    <li className="border-bottom">
                        <Link to='/listado-prospectos'>Listado de Prospectos</Link>
                    </li>
                    <li className="border-bottom">
                        <Link to='/nuevo-prospecto'>Nuevo Prospecto</Link>
                    </li>
                    { usuario
                        ? <li className="border-bottom">
                            <button className="btn-menu" onClick={() => cerrarSesion()}>Cerrar Sesión</button>
                        </li>
                        : null}
                </ul>
            </nav>

            <div className="form-elements">
                <h1>Nuevo Prospecto</h1>
                <form
                    encType="multipart/form-data"
                    onSubmit={onSubmitProspecto}
                >
                    <div className="form-prospecto">

                        <div>
                            <label htmlFor="name">Nombre *</label>
                            <input
                                type="text"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeProspecto}
                            />
                        </div>
                        <div>
                            <label htmlFor="primerApellido">Primer Apellido *</label>
                            <input
                                type="text"
                                name="primerApellido"
                                value={primerApellido}
                                onChange={onChangeProspecto}
                                />
                        </div>
                        <div>
                            <label htmlFor="segundoApellido">Segundo Apellido</label>
                            <input
                                type="text"
                                name="segundoApellido"
                                value={segundoApellido}
                                onChange={onChangeProspecto}
                                />
                        </div>
                        <div>
                            <label htmlFor="calle">Calle *</label>
                            <input
                                type="text"
                                name="calle"
                                value={calle}
                                onChange={onChangeProspecto}
                            />
                        </div>
                        <div>
                            <label htmlFor="numero">Numero *</label>
                            <input
                                type="text"
                                name="numero"
                                value={numero}
                                onChange={onChangeProspecto}
                                />
                        </div>
                        
                        <div>
                            <label htmlFor="colonia">Colonia *</label>
                            <input
                                type="text"
                                name="colonia"
                                value={colonia}
                                onChange={onChangeProspecto}
                                />
                        </div>
                        <div>
                            <label htmlFor="codigoPostal">Codigo Postal *</label>
                            <input
                                type="text"
                                name="codigoPostal"
                                pattern="^\d{4,5}$"
                                title="No coincide con un CP válido"
                                value={codigoPostal}
                                onChange={onChangeProspecto}
                            />
                        </div>
                        <div>
                            <label htmlFor="telefono">Teléfono *</label>
                            <input
                                type="tel"
                                name="telefono"
                                pattern="\([0-9]{3}\) [0-9]{3}[ -][0-9]{4}"
                                title="Un numero valido consiste en el codigo de area con 3 digitos entre parentesis, un espacio,
                                los tres primeros digitos, un guión medio (-) y los demás 4 digitos"
                                placeholder="(322) 123-1234"
                                value={telefono}
                                onChange={onChangeProspecto}
                                />
                        </div>
                        <div>
                            <label htmlFor="rfc">RFC *</label>
                            <input
                                type="text"
                                name="rfc"
                                pattern="^([A-ZÑ\x26]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Z\d]{3})?$"
                                title="No coincide con un RFC válido"
                                value={rfc}
                                onChange={onChangeProspecto}
                            />
                        </div>
                        <div>
                            <label htmlFor="nameFile">Nombre del archivo</label>
                            <input
                                type="text"
                                name="nameFile"
                                value={nameFile}
                                onChange={onChangeProspecto}
                                />
                        </div>
                        <input type="file" name="selectedFile" onChange={onChangeProspecto}/>
                    </div>
                    <div className="center-element">
                        <input
                            type="submit"
                            value="Enviar"
                        />
                    </div>
                </form>
            </div>
            { errorformulario ? <p>El nombre es obligatorio</p> : null }
        </>
        
    );
}

export default NuevoProspecto;