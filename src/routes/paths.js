function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
};
