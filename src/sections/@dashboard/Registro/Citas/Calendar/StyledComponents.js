import { styled } from "@mui/material/styles";
import Fab from "@mui/material/Fab";

const PREFIX = "Demo";
export const classes = {
  content: `${PREFIX}-content`,
  container: `${PREFIX}-container`,
  containerForm: `${PREFIX}-containerForm`,
  header: `${PREFIX}-header`,
  closeButton: `${PREFIX}-closeButton`,
  buttonGroup: `${PREFIX}-buttonGroup`,
  button: `${PREFIX}-button`,
  picker: `${PREFIX}-picker`,
  wrapper: `${PREFIX}-wrapper`,
  icon: `${PREFIX}-icon`,
  textField: `${PREFIX}-textField`,
  addButton: `${PREFIX}-addButton`,
};

export const StyledDiv = styled("div")(({ theme }) => ({
  [`& .${classes.containerForm}`]: {
    width: "fit-content",
  },
  [`& .${classes.container}`]: {
    display: "flex",
    flexDirection: "column",
  },
  [`& .${classes.icon}`]: {
    margin: theme.spacing(2, 0),
    marginRight: theme.spacing(2),
  },
  [`& .${classes.header}`]: {
    overflow: "hidden",
    paddingTop: theme.spacing(0.5),
  },
  [`& .${classes.textField}`]: {
    width: "100%",
  },
  [`& .${classes.content}`]: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
  [`& .${classes.closeButton}`]: {
    float: "right",
  },
  [`& .${classes.picker}`]: {
    marginRight: theme.spacing(2),
    "&:last-child": {
      marginRight: 0,
    },
    width: "50%",
  },
  [`& .${classes.wrapper}`]: {
    display: "flex",
    justifyContent: "flex-start",
    gap: theme.spacing(2),
    padding: theme.spacing(1, 0),
  },
  [`& .${classes.buttonGroup}`]: {
    display: "flex",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
  },
  [`& .${classes.button}`]: {
    marginLeft: theme.spacing(2),
  },
}));

export const StyledFab = styled(Fab)(({ theme }) => ({
  [`&.${classes.addButton}`]: {
    position: "absolute",
    bottom: theme.spacing(3),
    right: theme.spacing(4),
  },
}));