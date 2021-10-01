import React from "react";
import axios from "axios";
import MaterialTable from "material-table";

const Eventos = (props) => {
  const data = props.eventos;
  const eventosRecuperar = props.recuperarEventos;
  const columns = [
    {
      title: "Cliente",
      field: "cliente",
      validate: (rowData) =>
        rowData.cliente === undefined || rowData.cliente === ""
          ? "Required"
          : true,
    },
    {
      title: "Fecha",
      field: "fecha",
      validate: (rowData) =>
        rowData.fecha === undefined || rowData.fecha === "" ? "Required" : true,
    },
    {
      title: "Hora",
      field: "hora",
      validate: (rowData) =>
        rowData.hora === undefined || rowData.hora === "" ? "Required" : true,
    },
    {
      title: "Titulo",
      field: "title",
      validate: (rowData) =>
        rowData.title === undefined || rowData.title === "" ? "Required" : true,
    },
    {
      title: "Resultado",
      field: "resultado",
      validate: (rowData) =>
        rowData.resultado === undefined || rowData.resultado === ""
          ? "Required"
          : true,
    },
  ];
  return (
    <div>
      <MaterialTable
        title="Lista Eventos"
        columns={columns}
        data={data}
        options={{ actionsColumnIndex: -1, addRowPosition: "first" }}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/tasks",
                  {
                    cliente: newData.cliente,
                    fecha: newData.fecha,
                    hora: newData.hora,
                    date: `${newData.fecha + newData.hora}`,
                    title: newData.title,
                    resultado: newData.resultado,
                  }
                );
                const datos = request.data;
                console.log(datos);
                eventosRecuperar();
                resolve();
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.put(
                  process.env.REACT_APP_BACKEND_URL + `/tasks/${oldData.id}`,
                  {
                    cliente: newData.cliente,
                    fecha: newData.fecha,
                    hora: newData.hora,
                    date: `${newData.fecha + newData.hora}`,
                    title: newData.title,
                    resultado: newData.resultado,
                  }
                );
                const datos = request.data;
                console.log(datos);
                eventosRecuperar();
                resolve();
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.delete(
                  process.env.REACT_APP_BACKEND_URL + `/tasks/${oldData.id}`
                );
                eventosRecuperar();
                resolve();
                const datos = request.data;
                console.log(datos);
              } catch (error) {
                console.log("error" + error);
              }
            }),
        }}
      />
    </div>
  );
};

export default Eventos;
