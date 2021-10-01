import React from "react";
import { useState } from "react";
import ListaEventoBuscado from "./ListaEventoBuscado";

const BuscadorEvento = (props) => {
  const clienteData = props.rowData;
  const eventos = props.listaEventos;
  const [event, setEvent] = useState([]);
  const showData = () => {
    setEvent(
      eventos.filter((event) => {
        return event.matricula === clienteData.matricula;
      })
    );
  };
  return (
    <div>
      <button className="buscar"onClick={showData}>Citas</button>
      <ListaEventoBuscado key={event.id} event={event}/>
    </div>
  );
};

export default BuscadorEvento;
