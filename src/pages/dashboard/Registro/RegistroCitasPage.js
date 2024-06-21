import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';
import sumBy from 'lodash/sumBy';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';
import axios from '../../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fTimestamp } from '../../../utils/formatTime';
// import { tenantUrl } from '../../../auth/TenantUtils';

// _mock_

// import { _invoices } from '../../_mock/arrays';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
import ConfirmDialog from '../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../components/table';
// sections

import {
  CitasTableRow,
  CitasTableToolbar,
  CitasTableButtom,
  CitasTableEdit,
} from '../../../sections/@dashboard/Registro/Citas';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'ane_tipdoc', label: 'Dcto', align: 'left' },
  { id: 'ane_numdoc', label: 'Número', align: 'left' },
  { id: 'ane_nom', label: 'Nombre', align: 'left' },
  { id: 'ane_dir', label: 'Dirección', align: 'left' },
  { id: 'ane_tel', label: 'Teléfono', align: 'left' },
  { id: 'ane_ema', label: 'Email', align: 'center' },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function RegistroCitasPage() {
  const theme = useTheme();

  const { themeStretch } = useSettingsContext();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState([]);

  const [filterName, setFilterName] = useState('');

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterStatus, setFilterStatus] = useState('all');

  const [filterEndDate, setFilterEndDate] = useState(null);

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [fetchTrigger, setFetchTrigger] = useState(false);

  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [rowData, setRowData] = useState({});

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleDeleteRow = async (id) => {
    const deleteRow = tableData.filter((row) => row.ane_id !== id.ane_id);
    setSelected([]);
    try {
      const response = axios.post(`/api/cliente-delete/${id.ane_id}`);
      setFetchTrigger((prevState) => !prevState);
      if (page > 0 && dataInPage.length < 2) {
        setPage(page - 1);
      }
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud DELETE:', error);
      throw error;
    }
  };

  const handleDeleteRows = (selectedRows) => {
    const deleteRows = tableData.filter((row) => !selectedRows.includes(row.ane_id));
    setSelected([]);
    setTableData(deleteRows);

    if (page > 0) {
      if (selectedRows.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selectedRows.length === dataFiltered.length) {
        setPage(0);
      } else if (selectedRows.length > dataInPage.length) {
        const newPage = Math.ceil((tableData.length - selectedRows.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleViewRow = (id) => {
    navigate(PATH_DASHBOARD.invoice.view(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterStatus('all');
    setFilterEndDate(null);
    setFilterStartDate(null);
  };

  const modal1Inputs = [
    {
      name: 'ane_tipdoc',
      label: 'Dcto',
      type: 'select',
      defaultValue: '',
      helperText: 'Seleccione el tipo de documento',
    },
    {
      name: 'ane_numdoc',
      label: 'Número',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_nom',
      label: 'Nombre',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_dir',
      label: 'Dirección',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_tel',
      label: 'Teléfono',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_ema',
      label: 'Email',
      type: 'text',
      defaultValue: '',
    },
  ];

  const modal2Inputs = [
    {
      name: 'ane_id',
      label: 'Id Almacen',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_tipdoc',
      label: 'Dcto',
      type: 'select',
      defaultValue: '',
      helperText: 'Seleccione el tipo de documento',
    },
    {
      name: 'ane_numdoc',
      label: 'Número',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_nom',
      label: 'Nombre',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_dir',
      label: 'Dirección',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_tel',
      label: 'Teléfono',
      type: 'text',
      defaultValue: '',
    },
    {
      name: 'ane_ema',
      label: 'Email',
      type: 'text',
      defaultValue: '',
    },
  ];

  const modal1Request = async (formData, closeModal) => {
    try {
      const response = await axios.post(`/api/cliente`, {
        ...formData
      });
      console.log('Respuesta exitosa:', response.data);
      setFetchTrigger((prevState) => !prevState);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      console.log('Error', formData);
      throw error;
    }
  };

  const modal2Request = async (formData, closeModal) => {
    try {
      const response = await axios.put(`/api/cliente/${formData.ane_id}`, {
        ...formData
      });
      console.log('Respuesta exitosa:', response.data);
      setFetchTrigger((prevState) => !prevState);
      return response.data;
    } catch (error) {
      console.error('Error al realizar la solicitud POST:', error);
      console.log('Error', formData);
      throw error;
    }
  };

  const handleOpenEditModal = (id) => {
    console.log('Se seleccionó editar la fila con ID:', id.ane_id);
    setIsModalEditOpen(true);
    setRowData(id);
    console.log(id);
    console.log(typeof rowData);
  };

  const fetchDataFromAPI = useCallback(async () => {
    try {
      const response = await axios.post(`/api/cliente-dominio`);
      setTableData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    fetchDataFromAPI()
      .then((data) => {
        setTableData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [fetchDataFromAPI, fetchTrigger]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterStartDate,
    filterEndDate,
  });

  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 56 : 76;

  const isFiltered =
    filterStatus !== 'all' || filterName !== '' || (!!filterStartDate && !!filterEndDate);

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterStatus) ||
    (!dataFiltered.length && !!filterEndDate) ||
    (!dataFiltered.length && !!filterStartDate);

  return (
    <>
      <Helmet>
        <title>Clientes</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="Citas"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Registros',
              href: PATH_DASHBOARD.registro.root,
            },
            {
              name: 'Citas',
            },
          ]}
          action={
            <CitasTableButtom
              modal1Inputs={modal1Inputs}
              modal1Request={modal1Request}
              fetchDataFromAPI={fetchDataFromAPI}
            />
          }
        />

        <Card>
          <Divider />

          <CitasTableToolbar
            filterName={filterName}
            isFiltered={isFiltered}
            // filterService={filterService}
            filterEndDate={filterEndDate}
            onFilterName={handleFilterName}
            // optionsService={SERVICE_OPTIONS}
            filterStartDate={filterStartDate}
            onResetFilter={handleResetFilter}
            // onFilterService={handleFilterService}
            onFilterStartDate={(newValue) => {
              setFilterStartDate(newValue);
            }}
            onFilterEndDate={(newValue) => {
              setFilterEndDate(newValue);
            }}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.ane_id)
                )
              }
              action={
                <Stack direction="row">
                  <Tooltip title="Sent">
                    <IconButton color="primary">
                      <Iconify icon="ic:round-send" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Download">
                    <IconButton color="primary">
                      <Iconify icon="eva:download-outline" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Print">
                    <IconButton color="primary">
                      <Iconify icon="eva:printer-fill" />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={handleOpenConfirm}>
                      <Iconify icon="eva:trash-2-outline" />
                    </IconButton>
                  </Tooltip>
                </Stack>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.ane_id)
                    )
                  }
                />

                <TableBody>
                  {dataFiltered
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row , index) => (
                      <CitasTableRow
                        key={row.ane_id}
                        keyIndex={index}
                        row={row}
                        selected={selected.includes(row.ane_id)}
                        onSelectRow={() => onSelectRow(row.ane_id)}
                        onViewRow={() => handleViewRow(row.ane_id)}
                        // onEditRow={() => handleEditRow(row.ane_id)}
                        onEditRow={() => handleOpenEditModal(row)}
                        onDeleteRow={() => handleDeleteRow(row)}
                      />
                    ))}
                  <CitasTableEdit
                    modal2Inputs={modal2Inputs}
                    modal2Request={modal2Request}
                    fetchDataFromAPI={fetchDataFromAPI}
                    isModalOpen={isModalEditOpen}
                    setIsModalOpen={setIsModalEditOpen}
                    rowData={rowData}
                  />
                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  />

                  <TableNoData isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={dataFiltered.length}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStartDate, filterEndDate }) {
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
}
