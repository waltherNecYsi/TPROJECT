function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, "/app"),
  },
  registro: {
    root: path(ROOTS_DASHBOARD, "/registro"),
    regCliente: path(ROOTS_DASHBOARD, "/registro/clientes"),
    regCitas: path(ROOTS_DASHBOARD, "/registro/citas"),
    regEstilistas: path(ROOTS_DASHBOARD, "/registro/estilistas"),
    regServicios: path(ROOTS_DASHBOARD, "/registro/servicios"),
  },
  consulta: {
    root: path(ROOTS_DASHBOARD, "/consulta"),
    consultaCitas: path(ROOTS_DASHBOARD, "/consulta/citas"),
  },
};

export const PATH_CONSULTA = {
  root: path("/", "/consultar"),
  index: path("/consultar", "/miCita"),
};
