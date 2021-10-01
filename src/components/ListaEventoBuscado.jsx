import React from 'react';
import ElementoEventoBuscado from './ElementoEventoBuscado';
import "../style/ListaEventoBuscado.css";

const ListaEventoBuscado = (props) => {
    const listaElement = props.event;
    return (
        <div className="lista">
            {listaElement.map((element) => {
                return <ElementoEventoBuscado key={element.id} element={element}/>
            })}
        </div>
    )
}

export default ListaEventoBuscado
