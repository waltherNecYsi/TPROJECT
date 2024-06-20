export default function checkUserRolePermission(user, roles, permission) {
  const hasRole = user.roles.some((r) => roles.find((f) => f === r.name));
  const hasPermission = user.roles.some((r) => r.permissions.find((p) => permission === p.name));
  // const hasPermission = user.roles.permissions.some((p) => p.name === permission);
  return hasRole || hasPermission;
};