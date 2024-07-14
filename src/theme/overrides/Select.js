//
import { InputSelectIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Select(theme) {
  return {
    MuiSelect: {
      defaultProps: {
        IconComponent: InputSelectIcon,
      },
      styleOverrides: {
        select: {
          fontSize: theme.typography.body2.fontSize,
          paddingRight: theme.spacing(1),
          paddingLeft: theme.spacing(1),
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
          '&:focus': {
            backgroundColor: theme.palette.action.hover,
            '& .MuiSvgIcon-root': {
              color: theme.palette.text.primary,
            },
          },
        },
      },
    },
  };
}
