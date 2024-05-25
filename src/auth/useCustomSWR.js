import useSWR from 'swr';

export const fetcher = async (fetchUrl, fetchData) => {
  const response = await fetch(fetchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(fetchData),
  });
  return response.json();
};

const useCustomSWR = (urlpost, requestDataPost) => {

  const { data, error , mutate } = useSWR([urlpost, requestDataPost], ([url, requestData]) => fetcher(url, requestData));

  return { data, error , mutate };
};

export default useCustomSWR;

