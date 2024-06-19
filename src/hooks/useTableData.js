import { useState, useEffect, useMemo } from 'react';
import useShowData from '../sections/@dashboard/Ventas/ListaVentas/useShowData';

export default function useTableData({ setSelected = [] }) {
  // useEffect(() => console.log('data', data), [data]);

  // const [tableData, setTableData] = useState(data?.detalle || []);
  const [tableData, setTableData] = useState([]);

  const updateTableData = (newTableData) => {
    setTableData(newTableData);
  };

  const CumulativeTable = (newListaProductos) => {
    setTableData((prevData) => [...prevData, { ...newListaProductos }]);
  };

  const handleListaProductosChange = (newListaProductos) => {
    setTableData((prevData) => [...prevData, ...newListaProductos]);
  };

  const handleDeleteRow = async (index) => {
    try {
      const deleteRow = tableData.filter((row, i) => i !== index);

      console.log(deleteRow);
      setTableData(deleteRow);
      setSelected([]);

      console.log(tableData);
    } catch (error) {
      console.error('Error al eliminar fila:', error);
    }
  };

  const updateTableRowData = (updatedRowData, index) => {
    const updatedProductsData = tableData.map((row, i) => {
      if (i === index) {
        return updatedRowData;
      }
      return row;
    });
    setTableData(updatedProductsData);
  };

  return {
    tableData,
    setTableData,
    CumulativeTable,
    handleListaProductosChange,
    handleDeleteRow,
    updateTableRowData,
    updateTableData,
  };
}
