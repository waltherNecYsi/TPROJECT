import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import axios from '../utils/axios';
import useTableData from './useTableData';
import { DataApiGet, useFetchSWR } from '../utils/connectApis';
// usePagination ----------------------------- *

export function usePagination({ page, setPage }) {
  const { data, isLoading } = useFetchSWR(`/api/paginado/${page + 1}`, DataApiGet);

  const dataPage = data?.ventas.data || [];
  const totalElements = data?.ventas.total || 0;

  const handleClickPagination = (event, newPage) => {
    setPage(newPage);
  };

  return {
    dataPage,
    isLoading,
    totalElements,
    handleClickPagination,
  };
}
