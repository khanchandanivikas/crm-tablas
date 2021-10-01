import React from 'react';
import "../style/TarjetaEventoBuscado.css";

const ElementoEventoBuscado = (props) => {
    const event = props.element;
    return (
        <div className="tarjeta">
            <p><span>Cliente: </span>{event.cliente}</p>
            <p><span>Matricula: </span>{event.matricula}</p>
            <p><span>Fecha: </span>{event.date}</p>
            <p><span>Titulo: </span>{event.title}</p>
            <p><span>Resultado: </span>{event.resultado}</p>
        </div>
    )
}

export default ElementoEventoBuscado
