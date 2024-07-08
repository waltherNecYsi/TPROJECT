import pdfMake from "pdfmake/build/pdfmake";
import printjs from "print-js";
import * as pdfFonts from "./vfs_fonts";

pdfMake.vfs = pdfFonts.default;

const createPdf = (props, output = "print") =>
  new Promise((resolve, reject) => {
    try {
      const {
        pageSize = {
          width: 4 * 72,
          height: 6 * 72,
        },
        pageMargins = [5.66, 5.66, 5.66, 5.66],
        info = {
          title: "F001-000001",
          author: "maclode",
          subject: "ticket",
          keywords: "tck, sale",
        },
        styles = {
          header: {
            fontSize: 15,
            bold: true,
            alignment: "center",
          },
          tHeaderLabel: {
            fontSize: 15,
            alignment: "center",
          },
          tHeaderValue: {
            fontSize: 15,
            bold: true,
          },
          tProductsHeader: {
            fontSize: 15,
            bold: true,
          },
          tProductsBody: {
            fontSize: 15,
          },
          tTotals: {
            fontSize: 15,
            bold: true,
            alignment: "right",
          },
          tClientLabel: {
            fontSize: 15,
            alignment: "right",
          },
          tClientValue: {
            fontSize: 8,
            bold: true,
          },
          text: {
            fontSize: 15,
            alignment: "center",
          },
          link: {
            fontSize: 8,
            bold: true,
            margin: [0, 0, 0, 4],
            alignment: "center",
          },
        },
        content,
      } = props;

      const docDefinition = {
        pageSize, //  TAMAÑO HOJA
        pageMargins, // MARGENES HOJA
        info, //  METADATA PDF
        content, // CONTENIDO PDF
        styles, //  ESTILOS PDF
      };

      if (output === "b64") {
        //  SI INDICAMOS QUE LA SALIDA SERA [b64] Base64
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          resolve({
            success: true,
            content: data,
            message: "Archivo generado correctamente.",
          });
        });
        return;
      }

      //  ENVIAR A IMPRESIÓN DIRECTA
      if (output === "print") {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          printjs({
            printable: data,
            type: "pdf",
            base64: true,
          });
          resolve({
            success: true,
            content: null,
            message: "Documento enviado a impresión.",
          });
        });
        return;
      }

      reject(new Error("Debes enviar tipo salida"));
    } catch (error) {
      reject(new Error(error?.message ?? "No se pudo generar proceso."));
    }
  });

export default createPdf;
