import useSWR, { useSWRConfig } from 'swr';
import axios from './axios';

// .get(`${api}/${id}`, headers)
export const DataApiGet = async (api, headers) => {
  try {
    const response = await axios.post(api, null, headers);
    return response.data;
  } catch (error) {
    console.error('Error en los datos', error);
    throw error;
  }
};

export const DataApiPost = async (api, data, headers) => {
  console.log({ api, data });
  try {
    const response = await axios.post(api, data, headers);
    return response.data;
  } catch (error) {
    console.error('Error en el envio de datos', error);
    throw error;
  }
};

export const DataApiPut = async (api, headers) => {
  try {
    const response = await axios.put(api, headers);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar los datos', error);
    throw error;
  }
};

export const DataApiDelete = async (api, headers) => {
  try {
    const response = await axios.delete(api, headers);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el dato', error);
    throw error;
  }
};

export const DataApiShow = (api, id, headers) => DataApiGet(api, id, headers);

export const useFetchSWR = (key, fetcher, options) => {
  const { data, error, isValidating, isLoading, mutate } = useSWR(key, fetcher, options);
  return { data, error, isValidating, isLoading, mutate };
};
