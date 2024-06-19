import { useCallback, useEffect, useRef } from 'react';
import axios from '../utils/axios';
import generateTicket from '../utils/createTicket';
import base64toBlob from '../utils/base64Blob';
import { DataApiGet } from '../utils/connectApis';

// TICKET API
const useFetchTicket = (id_Venta) => {
  const fetchTicket = () => DataApiGet(`/api/ticket/${id_Venta}`);

  return { fetchTicket };
};

export const useGenerateTicket = (id_Venta) => {
  const { fetchTicket } = useFetchTicket(id_Venta);

  // GENERAR TICKET
  const onGenerateTicket = async (output) => {
    const datApi = await fetchTicket();
    const response = await generateTicket(output, datApi);
    if (!response?.success) {
      alert(response?.message);
      return;
    }

    if (output === 'b64') {
      const ticketBlob = base64toBlob(response?.content);
      const ticketUrl = URL.createObjectURL(ticketBlob);
      window.open(ticketUrl, '_blank');
    }
  };

  return {
    onGenerateTicket,
  };
};
