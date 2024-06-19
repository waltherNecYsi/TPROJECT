import PropTypes from 'prop-types';
import { Menu, MenuItem } from '@mui/material';

export default function MenuComponent({ items, anchorEl, open, handleClose, onClick }) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
      sx={{
        '& .MuiPaper-root': {
          minWidth: 150,
        },
      }}
    >
      {items.map((item) => (
        <MenuItem key={item.id} onClick={() => onClick(item.id)}>
          {item.title}
        </MenuItem>
      ))}
    </Menu>
  );
}

MenuComponent.propTypes = {
  items: PropTypes.array,
  anchorEl: PropTypes.object,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onClick: PropTypes.func,
};
