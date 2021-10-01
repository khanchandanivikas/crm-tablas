import React from "react";
import { useState } from "react";
import "../style/Modal.css";
import axios from "axios";

const NuevoEvento = (props) => {
  const toggleNuevoEventoForm = props.mostrarModalNuevoEvento;
  const recuperarEventos = props.eventosRecuperar;
  const recuperarClientes = props.clientesRecuperar;
  const [nuevoCliente, setNuevoCliente] = useState("");
  const [nuevoMatricula, setNuevoMatricula] = useState("");
  const [nuevoFecha, setNuevoFecha] = useState("");
  const [nuevoTitulo, setNuevoTitulo] = useState("");
  const [nuevoMensaje, setNuevoMensaje] = useState("");
  const [nuevoResultado, setNuevoResultado] = useState("");
  const handleNuevoCliente = (e) => {
    setNuevoCliente(e.target.value);
  };
  const handleNuevoMatricula = (e) => {
    setNuevoMatricula(e.target.value);
  };
  const handleNuevoFecha = (e) => {
    setNuevoFecha(e.target.value);
  };
  const handleNuevoTitulo = (e) => {
    setNuevoTitulo(e.target.value);
  };
  const handleNuevoMensaje = (e) => {
    setNuevoMensaje(e.target.value);
  };
  const handleNuevoResultado = (e) => {
    setNuevoResultado(e.target.value);
  };
  const handleAñadirEvento = async (e) => {
    e.preventDefault();
    const request = await axios.post(
      process.env.REACT_APP_BACKEND_URL + "/tasks",
      {
        cliente: nuevoCliente,
        matricula: nuevoMatricula,
        date: nuevoFecha,
        title: nuevoTitulo,
        mensaje: nuevoMensaje,
        resultado: nuevoResultado,
      }
    );
    const datos = request.data;
    console.log(datos);
    recuperarEventos();
    recuperarClientes();
    setNuevoCliente("");
    setNuevoMatricula("");
    setNuevoFecha("");
    setNuevoTitulo("");
    setNuevoMensaje("");
    setNuevoResultado("");
    toggleNuevoEventoForm();
  };
  return (
    <div>
      <div className="overlay"></div>
      <div className="form-container">
        <form action="" onSubmit={handleAñadirEvento} className="formulario">
          <h1>Añadir Evento</h1>
          <input
            value={nuevoCliente}
            onChange={handleNuevoCliente}
            type="text"
            name="cliente"
            id="cliente"
            placeholder="nombre del cliente"
            required
          />
          <input
            value={nuevoMatricula}
            onChange={handleNuevoMatricula}
            type="text"
            name="matricula"
            id="matricula"
            placeholder="numero matricula"
            required
          />
          <input
            value={nuevoFecha}
            onChange={handleNuevoFecha}
            type="datetime-local"
            name="fecha"
            id="fecha"
            placeholder="fecha del evento"
            required
          />
          <input
            value={nuevoTitulo}
            onChange={handleNuevoTitulo}
            type="text"
            name="titulo"
            id="titulo"
            placeholder="titulo del evento"
            required
          />
          <input
            value={nuevoMensaje}
            onChange={handleNuevoMensaje}
            type="text"
            name="mensaje"
            id="mensaje"
            placeholder="detalles del evento"
            required
          />
          <input
            value={nuevoResultado}
            onChange={handleNuevoResultado}
            type="text"
            name="resultado"
            id="resultado"
            placeholder="resultado del evento"
            required
          />
          <button className="buscar" type="submit">
            Añadir
          </button>
          <button className="buscar" onClick={toggleNuevoEventoForm}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default NuevoEvento;
