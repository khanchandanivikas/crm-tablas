import React from "react";
import { useState } from "react";

const ModificarEvento = (props) => {
  const evento = props.event;
  const modalEventoClicked = props.toggleModalEvent;
  const modalModificarEvento = props.toggleEventoModificar;
  const eventosRecuperar = props.recuperarEventos;
  const clientesRecuperar = props.recuperarClientes;
  const [nuevoCliente, setNuevoCliente] = useState(
    evento._def.extendedProps.cliente
  );
  const [nuevoMatricula, setNuevoMatricula] = useState(
    evento._def.extendedProps.matricula
  );
  const [nuevoFecha, setNuevoFecha] = useState(
    evento._instance.range.start.toISOString()
  );
  const [nuevoTitulo, setNuevoTitulo] = useState(evento._def.title);
  const [nuevoMensaje, setNuevoMensaje] = useState(
    evento._def.extendedProps.mensaje
  );
  const [nuevoResultado, setNuevoResultado] = useState(
    evento._def.extendedProps.resultado
  );
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
  const handleModificarEvento = (e) => {
    e.preventDefault();
    fetch(
      process.env.REACT_APP_BACKEND_URL + `/tasks/${evento._def.publicId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cliente: nuevoCliente,
          matricula: nuevoMatricula,
          date: nuevoFecha,
          title: nuevoTitulo,
          mensaje: nuevoMensaje,
          resultado: nuevoResultado,
        }),
      }
    )
      .then((resultado) => {
        resultado.json();
      })
      .then((datos) => {
        console.log(datos);
        eventosRecuperar();
        clientesRecuperar();
        setNuevoCliente("");
        setNuevoMatricula("");
        setNuevoFecha("");
        setNuevoTitulo("");
        setNuevoMensaje("");
        setNuevoResultado("");
        modalModificarEvento();
        modalEventoClicked();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="overlay"></div>
      <div className="form-container">
        <form action="" onSubmit={handleModificarEvento} className="formulario">
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
            placeholder="numero de matricula"
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
            Modificar
          </button>
          <button className="buscar" onClick={modalModificarEvento}>
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModificarEvento;
