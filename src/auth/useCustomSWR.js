import useSWR from "swr";

export const fetcher = async (fetchUrl, fetchData) => {
  const storedToken = localStorage.getItem("accessToken");

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${storedToken}`,
    },
    body: JSON.stringify(fetchData),
  });
  return response.json();
};

export const fetchget = async (fetchUrl, fetchData) => {
  const url = new URL(fetchUrl);
  url.searchParams.append("token", fetchData);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const useCustomSWR = (urlpost, requestDataPost) => {
  const { data, error, mutate } = useSWR(
    [urlpost, requestDataPost],
    ([url, requestData]) => fetcher(url, requestData)
  );

  return { data, error, mutate };
};

export default useCustomSWR;
