import React from "react";
import axios from "axios";
import MaterialTable from "material-table";
import BuscadorEvento from "./BuscadorEvento";

const Clientes = (props) => {
  const data = props.clientes;
  const clientesRecuperar = props.recuperarClientes;
  const listaEventos = props.eventos;
  const columns = [
    {
      title: "Cliente",
      field: "empresa",
      validate: (rowData) =>
        rowData.empresa === undefined || rowData.empresa === ""
          ? "Required"
          : true,
    },
    {
      title: "Matricula",
      field: "matricula",
      validate: (rowData) =>
        rowData.matricula === undefined || rowData.matricula === ""
          ? "Required"
          : true,
    },
    {
      title: "Contacto",
      field: "contacto",
      validate: (rowData) =>
        rowData.contacto === undefined || rowData.contacto === ""
          ? "Required"
          : true,
    },
    {
      title: "Direccion",
      field: "direccion",
      validate: (rowData) =>
        rowData.direccion === undefined || rowData.direccion === ""
          ? "Required"
          : true,
    },
    {
      title: "Correo",
      field: "correo",
      validate: (rowData) =>
        rowData.correo === undefined || rowData.correo === ""
          ? "Required"
          : true,
    },
  ];
  return (
    <div>
      <MaterialTable
        title="Lista Clientes"
        columns={columns}
        data={data}
        detailPanel={(rowData) => {
          return (
            <BuscadorEvento
              key={listaEventos.id}
              listaEventos={listaEventos}
              rowData={rowData}
            />
          );
        }}
        options={{
          actionsColumnIndex: -1,
          addRowPosition: "first",
          pageSize: 7,
          pageSizeOptions: [7, 10, 20],
          headerStyle: {
            backgroundColor: "rgb(13, 110, 253, 0.9)",
            color: "#fff",
          },
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.post(
                  process.env.REACT_APP_BACKEND_URL + "/clients",
                  {
                    empresa: newData.empresa,
                    matricula: newData.matricula,
                    contacto: newData.contacto,
                    direccion: newData.direccion,
                    correo: newData.correo,
                  }
                );
                const datos = request.data;
                console.log(datos);
                clientesRecuperar();
                resolve();
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.put(
                  process.env.REACT_APP_BACKEND_URL + `/clients/${oldData.id}`,
                  {
                    empresa: newData.empresa,
                    matricula: newData.matricula,
                    contacto: newData.contacto,
                    direccion: newData.direccion,
                    correo: newData.correo,
                  }
                );
                const datos = request.data;
                console.log(datos);
                clientesRecuperar();
                resolve();
              } catch (error) {
                console.error("error" + error);
              }
            }),
          onRowDelete: (oldData) =>
            new Promise(async (resolve, reject) => {
              try {
                const request = await axios.delete(
                  process.env.REACT_APP_BACKEND_URL + `/clients/${oldData.id}`
                );
                clientesRecuperar();
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

export default Clientes;
