// ----------------------------------------------------------------------
import useResponsive from '../../hooks/useResponsive';

export default function Table(theme) {

  const isDesktop = useResponsive('up', 'md');

  return {
    MuiTableContainer: {
      styleOverrides: {
        root: {
          position: 'relative',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${theme.palette.divider}`,
          // borderBottom: 'none',
        },
        head: {
          color: theme.palette.text.secondary,
          backgroundColor: theme.palette.background.neutral,
          fontSize: isDesktop ? '0.75vw' : '2.5vw',
        },
        body: {
          fontSize: isDesktop ? '0.75vw' : '2.5vw',
          '& .MuiButtonBase-root': {
            padding: '0.2vw',
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        paddingCheckbox: {
          paddingLeft: theme.spacing(1),
        },
      },
    },
    MuiTablePagination: {
      defaultProps: {
        backIconButtonProps: {
          size: 'small',
        },
        nextIconButtonProps: {
          size: 'small',
        },
        SelectProps: {
          MenuProps: {
            MenuListProps: {
              sx: {
                '& .MuiMenuItem-root': {
                  ...theme.typography.body2,
                },
              },
            },
          },
        },
      },

      // ESTILOS PARA LA PARTE DE ABAJO DE LA TABLA
      styleOverrides: {
        root: {
          // borderTop: `solid 1px ${theme.palette.divider}`,
          borderTop: 'none',
        },
        toolbar: {
          height: 64,
        },
        actions: {
          marginRight: theme.spacing(1),
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
      },
    },
  };
}
