import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import { Button, Typography, Checkbox } from '@mui/material';
import DataTable from 'react-data-table-component';
import { GridArrowDownwardIcon } from '@mui/x-data-grid';
import ButtonTableUsers from './ButtonTableUsers';




const sortIcon = <GridArrowDownwardIcon />;
const selectProps = { indeterminate: isIndeterminate => isIndeterminate };

function ReactTableUsers({ onUpdateTable, ...props }) {

	const [selectedRows, setSelectedRows] = useState([]);

	const handleSelectedRowsChange = (state) => {
		setSelectedRows(state.selectedRows);
	};

	return (
		<>
			<m.div className='tableUsers'>
				<m.div className='tableUsers-table'>
					<DataTable
						dense
						direction="auto"
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
				<m.div className='tableUsers-buttons'>
				<ButtonTableUsers selectedRows={selectedRows} onUpdateTable={props.onUpdateTable}  />
				</m.div>
			</m.div>
		</>
	);
}

ReactTableUsers.propTypes = {
  onUpdateTable: PropTypes.func,
  // ... otras props
};


export default ReactTableUsers;
