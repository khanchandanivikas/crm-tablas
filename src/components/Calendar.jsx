import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import bootstrapPlugin from "@fullcalendar/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { useState } from "react";
import NuevoEvento from "./NuevoEvento";
import EventClicked from "./EventClicked";

const Calendar = (props) => {
  const events = props.eventos;
  const eventosRecuperar = props.recuperarEventos;
  const clientesRecuperar = props.recuperarClientes;
  const [modalNuevoEvento, setModalNuevoEvento] = useState(false);
  const [modalEventClicked, setModalEventClicked] = useState(false);
  const [eventData, setEventData] = useState([]);
  const mostrarModalNuevoEvento = () => {
    setModalNuevoEvento(!modalNuevoEvento);
  };
  const mostrarModalEventClicked = () => {
    setModalEventClicked(!modalEventClicked);
  };
  return (
    <div style={{minHeight: "100vh"}}>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listPlugin,
          bootstrapPlugin,
          interactionPlugin,
        ]}
        themeSystem="bootstrap"
        initialView="dayGridMonth"
        headerToolbar={{
          center: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,new",
        }}
        events={events}
        eventColor="red"
        customButtons={{
          new: {
            text: "nuevo",
            click: () => mostrarModalNuevoEvento(),
          },
        }}
        nowIndicator
        eventClick={(e) => {
          setEventData(e.event);
          console.log(e.event._instance.range.start.toISOString());
          mostrarModalEventClicked();
        }}
      />
      {modalNuevoEvento ? (
        <NuevoEvento
          eventosRecuperar={eventosRecuperar}
          mostrarModalNuevoEvento={mostrarModalNuevoEvento}
          clientesRecuperar={clientesRecuperar}
        />
      ) : null}
      {modalEventClicked ? (
        <EventClicked
          eventData={eventData}
          eventosRecuperar={eventosRecuperar}
          clientesRecuperar={clientesRecuperar}
          mostrarModalEventClicked={mostrarModalEventClicked}
        />
      ) : null}
    </div>
  );
};

export default Calendar;
