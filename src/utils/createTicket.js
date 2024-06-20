import createPdf from './createPdf';

const generateTicket = (output, datApi) => {
  const content = [
    //  DATOS EMPRESA
    {
      image: `${datApi.imagen}`,
      // fit: [141.73, 56.692],
      fit: [80.73, 56.692],
      alignment: 'center',
    },

    //  DATOS CEBECERA FACTURAR
    {
      text: datApi.datosEmpresa.emp_nom,
      style: 'tHeaderValue',
      alignment: 'center',
      margin: [0, 10, 0, 0],
    },
    { text: '----', style: 'tHeaderLabel', alignment: 'center' },
    { text: '----', style: 'tHeaderLabel', alignment: 'center' },
    { text: `E: ${datApi.datosEmpresa.emp_ema}`, style: 'tHeaderLabel', alignment: 'center' },
    {
      text: `Teléf: ${datApi.datosEmpresa.emp_tel}`,
      style: 'tHeaderLabel',
      alignment: 'center',
    },
    { text: `Cel: ${datApi.datosEmpresa.emp_cel}`, style: 'tHeaderLabel', alignment: 'center' },
    { text: `RUC ${datApi.datosEmpresa.emp_ruc}`, style: 'tHeaderValue', alignment: 'center' },
    { text: 'FACTURA ELECTRÓNICA', style: 'tHeaderValue', alignment: 'center' },
    { text: `${datApi.venta.ven_documento}`, style: 'tHeaderValue', alignment: 'center' },
    { text: `Cliente: ${datApi.cliente.ane_nom}`, style: 'tHeaderLabel', alignment: 'center' },
    { text: `RUC ${datApi.cliente.ane_numdoc}`, style: 'tHeaderLabel', alignment: 'center' },
    {
      text: 'Dirección:CAL. LAS PERDICES LT. 50 URB. JUAN',
      style: 'tHeaderLabel',
      alignment: 'center',
    },
    { text: 'JUAN PABLO II - LIMA LIMA LOS OLIVOS', style: 'tHeaderLabel', alignment: 'center' },
    { text: 'Fecha Emisión: 01/04/2024 10:10 AM', style: 'tHeaderLabel', alignment: 'center' },
    { text: 'Condición: Crédito', style: 'tHeaderLabel', alignment: 'center' },
    { text: 'Tipo Moneda: SOL', style: 'tHeaderLabel', alignment: 'center' },
    { text: 'Tipo de Pago: EFECTIVO', style: 'tHeaderLabel', alignment: 'center' },

    //  TABLA PRODUCTOS
    {
      margin: [0, 10, 0, 0],
      table: {
        widths: ['20%', '20%', '30%', '30%'],
        // headerRows: 2,
        body: [
          // [
          //   {
          //     text: 'CÓDIGO - DESCRIPCIÓN',
          //     colSpan: 4,
          //     style: 'tProductsHeader',
          //   },
          //   {},
          //   {},
          //   {},
          // ],
          // [
          //   { text: 'CANT.', style: 'tProductsHeader' },
          //   { text: 'UM', style: 'tProductsHeader', alignment: 'center' },
          //   { text: 'PRECIO', style: 'tProductsHeader', alignment: 'right' },
          //   { text: 'TOTAL', style: 'tProductsHeader', alignment: 'right' },
          // ],
          [
            {
              text: 'PLK180024 - Pelikano Mel Bellota 18mm (2150x2440)',
              style: 'tProductsBody',
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          [
            { text: '0.50', style: 'tProductsBody', alignment: 'center' },
            { text: 'UND', style: 'tProductsBody', alignment: 'center' },
            { text: '295.00', style: 'tProductsBody', alignment: 'right' },
            { text: '147.50', style: 'tProductsBody', alignment: 'right' },
          ],
          [
            {
              text: 'CANTOBELLOT01 - Canto Bellota 0.45x22mm',
              style: 'tProductsBody',
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          [
            { text: '40', style: 'tProductsBody', alignment: 'center' },
            { text: 'UND', style: 'tProductsBody', alignment: 'center' },
            { text: '0.90', style: 'tProductsBody', alignment: 'right' },
            { text: '36.00', style: 'tProductsBody', alignment: 'right' },
          ],
          [
            {
              text: 'CANTOBELLOT01 - Canto Bellota 0.45x22mm',
              style: 'tProductsBody',
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          [
            { text: '40', style: 'tProductsBody', alignment: 'center' },
            { text: 'UND', style: 'tProductsBody', alignment: 'center' },
            { text: '0.90', style: 'tProductsBody', alignment: 'right' },
            { text: '36.00', style: 'tProductsBody', alignment: 'right' },
          ],
          [
            {
              text: 'CANTOBELLOT01 - Canto Bellota 0.45x22mm',
              style: 'tProductsBody',
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          [
            { text: '40', style: 'tProductsBody', alignment: 'center' },
            { text: 'UND', style: 'tProductsBody', alignment: 'center' },
            { text: '0.90', style: 'tProductsBody', alignment: 'right' },
            { text: '36.00', style: 'tProductsBody', alignment: 'right' },
          ],
          [
            {
              text: 'CANTOBELLOT01 - Canto Bellota 0.45x22mm',
              style: 'tProductsBody',
              colSpan: 4,
            },
            {},
            {},
            {},
          ],
          [
            { text: '40', style: 'tProductsBody', alignment: 'center' },
            { text: 'UND', style: 'tProductsBody', alignment: 'center' },
            { text: '0.90', style: 'tProductsBody', alignment: 'right' },
            { text: '36.00', style: 'tProductsBody', alignment: 'right' },
          ],
        ],
      },
      layout: {
        hLineWidth: (i, node) => (i === 0 ? 0.5 : 0),
        vLineWidth: (i, node) => 0,
        hLineColor: () => '#cccccc',
        paddingTop: (i, node) => (i % 2 === 0 ? 10 : 1),
      },
    },
    {
      margin: [0, 10, 0, 2],
      table: {
        widths: ['15%', '21%', '34%', '30%'],
        body: [
          //  TOTALES
          [
            {},
            {},
            { text: 'Afecto', style: 'tProductsBody', alignment: 'left' },
            { text: 'S/ 0.82', style: 'tProductsBody', alignment: 'right' },
          ],
          [
            {},
            {},
            { text: 'IGV/IVA', style: 'tProductsBody', alignment: 'left' },
            { text: 'S/ 0.18', style: 'tProductsBody', alignment: 'right' },
          ],
          [
            {},
            {},
            { text: 'Total Documento', style: 'tProductsBody', alignment: 'left' },
            { text: 'S/ 0.82', style: 'tProductsBody', alignment: 'right' },
          ],
          [
            {},
            {},
            { text: 'Total a Pagar', style: 'tTotals', alignment: 'left' },
            { text: 'S/ 1.00', style: 'tTotals', alignment: 'right' },
          ],
          //  TOTAL IMPORTE EN LETRAS
          [
            {
              text: 'Son: Uno con 50/100 Soles',
              // style: 'tTotals',
              style: 'tProductsBody',
              alignment: 'left',
              colSpan: 4,
              margin: [0, 4, 0, 0],
            },
            {},
            {},
            {},
          ],
          [
            {
              text: 'Vendedor: Prueba Demo',
              // style: 'tTotals',
              style: 'tProductsBody',
              alignment: 'left',
              colSpan: 4,
              margin: [0, 4, 0, 0],
            },
            {},
            {},
            {},
          ],
        ],
      },
      layout: {
        hLineWidth: (i, node) => 0,
        vLineWidth: (i, node) => 0,
        paddingTop: (i, node) => 1,
      },
    },
    //  NOTA DE PIE
    // {
    //   text: 'ESTIMADO CLIENTE, TIENE COMO PLAZO MAXIMO DE 5 DIAS HABILES EN RECOGER SU MERCADERÍA, DICHO ESTO SE LE COBRARÍA PENALIDAD DE ALMACEN POR EL MONTO DE S/20.00 POR DIA, GRACIAS.',
    //   style: 'text',
    //   alignment: 'justify',
    //   margin: [0, 5],
    // },
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
          text: 'www.nubefa.com',
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
