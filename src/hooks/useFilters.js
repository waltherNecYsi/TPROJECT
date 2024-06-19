import { useState } from 'react';
import { fTimestamp } from '../utils/formatTime';
import { getComparator } from '../components/table';

const applyFilter = ({ inputData, comparator, filterName, filterStartDate, filterEndDate }) => {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.alm_nomb.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        invoice.emp_nom.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
        invoice.direccion.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStartDate && filterEndDate) {
    inputData = inputData.filter(
      (invoice) =>
        fTimestamp(invoice.updated_at) >= fTimestamp(filterStartDate) &&
        fTimestamp(invoice.updated_at) <= fTimestamp(filterEndDate)
    );
  }

  return inputData;
};

// useFilters -------------------------------------*
export function useFilters({ tableData, setPage, order, orderBy, page, defaultRowsPerPage }) {
  const [filterName, setFilterName] = useState('');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus('all');
    setFilterEndDate(null);
    setFilterStartDate(null);
  };

  // const handleFilterStatus = (event, newValue) => {
  //   setPage(0);
  //   setFilterStatus(newValue);
  // };

  const isFiltered =
    filterStatus !== 'all' || filterName !== '' || (!!filterStartDate && !!filterEndDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStartDate,
    filterEndDate,
  });

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  const dataInPage = dataFiltered.slice(
    page * defaultRowsPerPage,
    page * defaultRowsPerPage + defaultRowsPerPage
  );

  return {
    filterName,
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate,
    handleFilterName,
    handleResetFilter,
    isFiltered,
    isNotFound,
    dataFiltered,
    dataInPage,
  };
}
