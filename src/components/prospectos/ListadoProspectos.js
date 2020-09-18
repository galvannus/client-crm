import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Prospecto from './Prospecto';
import prospectoContext from '../../context/prospectos/prospectoContext';
import AuthContext from '../../context/autenticacion/authContext';

import concredito from '../../concredito.svg'


const ListadoProspectos = () => {
    //Extraer información del usuario
    const authContext = useContext(AuthContext);
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext;

    useEffect(() => {
        usuarioAutenticado();
    }, []);

    //Extraer proyectos de state inicial
    const prospectosContext = useContext(prospectoContext);
    const { prospectos, obtenerProspectos } = prospectosContext;
    

    //Obtener prospectos cuando carga el componente
    useEffect(() => {
        obtenerProspectos();
    }, []);

    //Revisar si el prospecto tiene contenido
    if(prospectos.length === 0) return null;

    

    return(
        <div>
            {usuario ? <span>{usuario.email}</span> : null}
            {/*<button onClick={() => cerrarSesion()}>Cerrar Sesión</button>
            <hr/>*/}
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
            <div className="listado-elementos">
                <h1>Listado de Prospectos</h1>

                
                <div className="contenedor-tabla">

                    {/**Header de tabla */}
                    <div className="header-tabla">Nombre</div>
                    <div className="header-tabla">Primer Apellido</div>
                    <div className="header-tabla">Segundo Apellido</div>
                    <div className="header-tabla">Estatus</div>
                    <div className="header-tabla">Detalles</div>
                
                    {prospectos.map(prospecto => (
                        <Prospecto
                            key={prospecto._id}
                            prospecto={prospecto}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ListadoProspectos;