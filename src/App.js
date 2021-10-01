import "./App.css";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Clientes from "./components/Clientes";
// import Eventos from "./components/Eventos";
import Calendar from "./components/Calendar";

function App() {
  const [clientes, setClientes] = useState([]);
  const [eventos, setEventos] = useState([]);
  const recuperarClientes = async () => {
    try {
      const request = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/clients"
      );
      const datos = request.data;
      setClientes(datos);
      console.log(datos);
    } catch (error) {
      console.log("error", error);
    }
  };
  const recuperarEventos = async () => {
    try {
      const request = await axios.get(
        process.env.REACT_APP_BACKEND_URL + "/tasks"
      );
      const datos = request.data;
      setEventos(datos);
      console.log(datos);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    recuperarClientes();
    recuperarEventos();
  }, []);
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Clientes
              key={clientes.id}
              clientes={clientes}
              eventos={eventos}
              recuperarClientes={recuperarClientes}
            />
          </Route>
          {/* <Route path="/eventos">
            <Eventos
              key={eventos.id}
              eventos={eventos}
              recuperarEventos={recuperarEventos}
            />
          </Route> */}
          <Route path="/calendar">
            <Calendar
              key={eventos.id}
              eventos={eventos}
              recuperarEventos={recuperarEventos}
              recuperarClientes={recuperarClientes}
            />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
