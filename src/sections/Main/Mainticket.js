import createPdf from "../../utils/createPdf";

const generateTicket = (output, datApi) => {
  const content = [
    {
      columns: [
        {
          image: "my",
          fit: [70, 50],
        },
        {
          text: `Detalle de Cita`,
          style: "header",
          alignment: "center",
        },
      ],
    },
    {
      columns: [
        {
          width: "50%",
          text: "Cliente:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `${datApi.ticket.Nomb_Clt}`,
          alignment: "right",
          fontSize: 12,
        },
      ],
      margin: [0, 5],
    },
    {
      columns: [
        {
          width: "50%",
          text: "Estilista:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `${datApi.ticket.Nombr_Est}`,
          alignment: "right",
          fontSize: 12,
        },
      ],
      margin: [0, 5],
    },
    {
      columns: [
        {
          width: "50%",
          text: "Fecha:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `${datApi.ticket.FechaInicio}`,
          alignment: "right",
          fontSize: 12,
        },
      ],
      margin: [0, 5],
    },
    {
      columns: [
        {
          width: "50%",
          text: "Registrado Por:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `${datApi.ticket.Nombr_Est}`,
          alignment: "right",
          fontSize: 12,
        },
      ],
      margin: [0, 5],
    },
  ];

  datApi.servicio.forEach(servicio => {
    content.push({
      columns: [
        {
          width: "50%",
          text: `${servicio.Nomb_Serv}`,
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `${servicio.Precio_Serv}/S`,
          alignment: "right",
          fontSize: 12,
        },
      ],
      margin: [0, 5],
    });
  });

  const totalPrecio = datApi.servicio.reduce((total, servicio) => total + servicio.Precio_Serv, 0);
  content.push({
    columns: [
      {
        width: "50%",
        text: "Total",
        alignment: "left",
        bold: true,
        fontSize: 12,
      },
      {
        width: "50%",
        text: `${totalPrecio}/S`,
        alignment: "right",
        fontSize: 12,
      },
    ],
    margin: [0, 5],
  });

  const response = createPdf({ content }, output);
  return response;
};

export default generateTicket;
