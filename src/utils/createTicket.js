import createPdf from "./createPdf";

const generateTicket = (output, datApi) => {
  console.log(datApi);
  const content = [
    {
      columns: [
        {
          image: "my",
          fit: [70, 50],
        },
        {
          text: `Ticket de Pago `,
          style: "header",
          alignment: "center",
        },
      ],
    },
    {
      columns: [
        {
          width: "50%",
          text: "Número:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `F001-${datApi.cita_id}`,
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
          text: "Fecha de Registro:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `${datApi.detalles[0].FechaInicio}`,
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
          text: `${datApi.detalles[0].EstilistaID}`,
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
          text: "Total:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: `${datApi.monto_total}`,
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
          text: "Vigente Hasta:",
          alignment: "left",
          bold: true,
          fontSize: 12,
        },
        {
          width: "50%",
          text: "08/07/2024",
          alignment: "right",
          fontSize: 12,
        },
      ],
      margin: [0, 5],
    },
    // {
    //   qr: "https://ejemplo.com",
    //   fit: 70,
    //   alignment: "center",
    //   margin: [0, 20, 0, 0],
    // },
  ];

  const response = createPdf({ content }, output);
  return response;
};

export default generateTicket;
