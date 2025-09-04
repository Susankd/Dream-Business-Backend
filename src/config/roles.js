const allRoles = {
  user: ['getUsers'],
  admin: ['getUsers', 'manageUsers'],
  superadmin: []
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
