import { useEffect, useRef, useState } from 'react';
import axios from '../utils/axios';

const useFetchPdf = (id_Venta) => {
  // MANUAL
  const pdfVentas = async () => {
    try {
      const response = await axios.post(`/api/pdf/${id_Venta}`, null, {
        responseType: 'blob',
        headers: { Accept: 'application/pdf' },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  return { pdfVentas };
};

export const useGeneratePdf = (id_Venta) => {
  const { pdfVentas } = useFetchPdf(id_Venta);

  const handlePrintClick = async () => {
    try {
      const pdf = await pdfVentas();

      const blob = new Blob([pdf], { type: 'application/pdf' });
      const pdfURL = URL.createObjectURL(blob);
      window.open(pdfURL, '_blank');
    } catch (error) {
      console.error('Error al descargar el PDF:', error);
      throw error;
    }
  };

  return { handlePrintClick };
};
