import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/Login';
import ListadoProspectos from './components/prospectos/ListadoProspectos';
import NuevoProspecto from './components/prospectos/NuevoProspecto';
import AlertaState from './context/alertas/alertaState';

import ProspectoState from './context/prospectos/prospectoState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';

//Revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth();
}

function App() {
  return (
    <ProspectoState>
      <AlertaState>
        <AuthState>
          <Router>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/listado-prospectos" component={ListadoProspectos} />
              <Route exact path="/nuevo-prospecto" component={NuevoProspecto} />
            </Switch>
          </Router>
        </AuthState>
      </AlertaState>
    </ProspectoState>
  );
}

export default App;
