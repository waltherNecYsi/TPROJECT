import createPdf from './createPdf';

const generateTicket = (output, datApi) => {
  const content = [
    //  DATOS EMPRESA


    //  DATOS CEBECERA FACTURAR
    {
      text: 'TICKET DE PAGO',
      style: 'tHeaderValue',
      alignment: 'center',
      margin: [0, 10, 0, 0],
    },
    { text: '----------------', style: 'tHeaderLabel', alignment: 'center' , width: '100%' },
    { text: `Numero: aaa`, style: 'tHeaderLabel', alignment: 'left' },
    {
      text: `Fecha Registro : 9999`,
      style: 'tHeaderLabel',
      alignment: 'left',
    },
    { text: `Registrado Por : 2313`, style: 'tHeaderLabel', alignment: 'left' },
    { text: `RUC: 3232`, style: 'tHeaderValue', alignment: 'left' },
    { text: `Vigente Hasta: 3232`, style: 'tHeaderValue', alignment: 'left' },



    //  QR FACTURA
    {
      stack: [
        {
          qr: '20603831404|03|B002|000131|724.94|4,752.30|30/09/2023|1|70477554|v2Ez4sKStje4NiqcXiuTcmTtPwgbrqgnXpWPltJKEhk=|',
          fit: 115,
          alignment: 'center',
          eccLevel: 'Q',
          margin: [0, 10, 0, 3],
        },
        {
          text: 'Consulta tu comprobante aquí:',
          style: 'text',
        },
        {
          text: 'www.sukha.com',
          // link: 'www.nubefa.com',
          style: 'text',
        },
      ],
    },
  ];

  const response = createPdf({ content }, output);
  return response;
};

export default generateTicket;
