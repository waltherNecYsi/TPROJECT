import { useFetchSWR, DataApiGet } from './connectApis';

function useGetData(endPoint) {
  const { data, error, isLoading } = useFetchSWR(endPoint, DataApiGet, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return { data, error, isLoading };
}

// GETS -------------------------------------------*

function useGetClaseCuenta() {
  const { data, error, isLoading } = useGetData('/api/clase_cuenta-dominio');

  return { dataClaseCta: data, error, isLoading };
}

function useGetNivelCuenta() {
  const { data, error, isLoading } = useGetData('/api/nivel_cuenta-dominio');

  return { dataNivelCta: data, error, isLoading };
}

function useGetTipoAsiento() {
  const { data, error, isLoading } = useGetData('/api/tipo_asiento-dominio');
  return { dataTipoAto: data, error, isLoading };
}

function useGetPlanCuenta() {
  const { data, error, isLoading } = useGetData('/api/plan_cuenta-dominio');
  return { dataPlanCta: data, error, isLoading };
}

function useGetBanco() {
  const { data, error, isLoading } = useGetData('/api/banco');
  return { dataBanco: data, error, isLoading };
}

function useGetMoneda() {
  const { data, error, isLoading } = useGetData('/api/moneda-dominio');
  return { dataMoneda: data, error, isLoading };
}

function useTipoCtaBanco() {
  const { data, error, isLoading } = useGetData('/api/tipo_cuenta');
  return { dataTipCtaBanco: data, error, isLoading };
}

export {
  useGetClaseCuenta,
  useGetNivelCuenta,
  useGetTipoAsiento,
  useGetPlanCuenta,
  useGetBanco,
  useGetMoneda,
  useTipoCtaBanco,
};
