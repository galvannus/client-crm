import React, { useState, useContext, useEffect } from 'react';
import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';


const Login = (props) => {

    //Extraer valores del Context
    const alertaContext = useContext(AlertaContext);
    const { alerta, mostrarAlerta } = alertaContext;

    const authContext = useContext(AuthContext);
    const { mensaje, autenticado, iniciarSesion } = authContext;

    //En caso de que el usuario o password no existan
    useEffect(() => {
        if(autenticado) {
            props.history.push('/listado-prospectos')
        }

        if(mensaje) {
            mostrarAlerta(mensaje.msg, mensaje.categoria);
        }

    }, [mensaje, autenticado, props.history]);

    //State para inicio de sesión
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    //Extraer usuario
    const { email, password } = usuario;

    const onChange = (e) => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        });
    }

    const onSubmit = (e) => {
        e.preventDefault();

        //Validar que no tenga campos vacios
        if(email.trim() === '' || password.trim() === '') {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
            return;
        }

        //Pasarlo al action
        iniciarSesion({ email, password});
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                {alerta
                    ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>)
                    : null}
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <input type="submit" value="Iniciar Sesión" />
                </div>
            </form>
        </div>
    );
}

export default Login;