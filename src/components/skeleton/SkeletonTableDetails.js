import PropTypes from 'prop-types';
// @mui
import { Skeleton, TableCell } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonPostDetails({ rows = 1, columns }) {
  return (
    <>
      {[...Array(rows)].map((row, rowIndex) => (
        <tr key={rowIndex}>
          {[...Array(columns)].map((column, columnIndex) => (
            <TableCell key={columnIndex}>
              <Skeleton variant="text" width="-webkit-fill-available" height={20} />
            </TableCell>
          ))}
        </tr>
      ))}
    </>
  );
}
SkeletonPostDetails.propTypes = {
  rows: PropTypes.number,
  columns: PropTypes.number.isRequired,
};
