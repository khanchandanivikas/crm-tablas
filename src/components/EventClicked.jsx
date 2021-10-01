import React from "react";
import { useState } from "react";
import ModificarEvento from "./ModificarEvento";
import "../style/Modal.css";

const EventClicked = (props) => {
  const event = props.eventData;
  const toggleModalEvent = props.mostrarModalEventClicked;
  const recuperarEventos = props.eventosRecuperar;
  const recuperarClientes = props.clientesRecuperar;
  const [modalModificarCliente, setModalModificarCliente] = useState(false);
  const toggleEventoModificar = () => {
    setModalModificarCliente(!modalModificarCliente);
  };
  const [nuevoEliminarEvento, setNuevoEliminarEvento] = useState(
    event._def.publicId
  );
  const handleNuevoEliminarEvento = () => {
    setNuevoEliminarEvento(event._def.publicId);
  };
  const handleEliminarEvento = () => {
    fetch(process.env.REACT_APP_BACKEND_URL + `/tasks/${nuevoEliminarEvento}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((resultado) => {
        console.log(resultado);
        recuperarEventos();
        recuperarClientes();
        toggleModalEvent();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="overlay"></div>
      <div className="form-container">
        <div className="formulario">
          <p>
            <span>Cliente: </span>
            {event._def.extendedProps.cliente}
          </p>
          <p>
            <span>Matricula: </span>
            {event._def.extendedProps.matricula}
          </p>
          <p>
            <span>Titulo: </span>
            {event._def.title}
          </p>
          <p>
            <span>Mensaje: </span>
            {event._def.extendedProps.mensaje}
          </p>
          <p>
            <span>Resultado: </span>
            {event._def.extendedProps.resultado}
          </p>
          <button className="buscar" onClick={toggleEventoModificar}>
            Modificar
          </button>
          <button
            className="buscar"
            onClick={handleEliminarEvento}
            value={nuevoEliminarEvento}
            onChange={handleNuevoEliminarEvento}
          >
            Eliminar
          </button>
          <button className="buscar" onClick={toggleModalEvent}>
            Cerrar
          </button>
        </div>
      </div>
      {modalModificarCliente ? (
        <ModificarEvento
          event={event}
          recuperarEventos={recuperarEventos}
          recuperarClientes={recuperarClientes}
          toggleModalEvent={toggleModalEvent}
          toggleEventoModificar={toggleEventoModificar}
        />
      ) : null}
    </div>
  );
};

export default EventClicked;
