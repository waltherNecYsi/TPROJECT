import React, { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { Button, Typography, Checkbox } from '@mui/material';
import DataTable from 'react-data-table-component';
import { GridArrowDownwardIcon } from '@mui/x-data-grid';
import  ButtonModalNubefa  from './ButtonModalNubefa';
import "../../pages/Main/style.css"
import 'bootstrap/dist/css/bootstrap.min.css';



const sortIcon = <GridArrowDownwardIcon />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

export default function DatattableNubefa({ onUpdateTable, onRowIdChange, ...props }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [rowId, setRowId] = useState(null);

  useEffect(() => {
    if (selectedRows.length > 0) {
      setRowId(selectedRows[0].idAlmacen);
      onRowIdChange(selectedRows[0].idAlmacen);
    } else {
      setRowId(null);
      onRowIdChange(null);
    }
  }, [selectedRows, onRowIdChange]);

  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  return (
    <m.div className='tableUsers'>
      <m.div>
        {selectedRows.length > 0 && <p>El ID de la fila seleccionada es: {selectedRows[0].idAlmacen}</p>}
      </m.div>
      <m.div className='tableUsers-table'>
        <DataTable
          dense
          fixedHeaderScrollHeight="300px"
          highlightOnHover
          pagination
          pointerOnHover
          responsive
          selectableRows
          selectableRowsHighlight
          selectableRowsNoSelectAll
          selectableRowsSingle
          selectableRowsVisibleOnly
          striped
          selectableRowsComponent={Checkbox}
          selectableRowsComponentProps={selectProps}
          sortIcon={sortIcon}
          onSelectedRowsChange={handleSelectedRowsChange}
          {...props}
        />
      </m.div>
    </m.div>
  );
}

DatattableNubefa.propTypes = {
  onRowIdChange: PropTypes.func.isRequired,
  onUpdateTable: PropTypes.func,
};
