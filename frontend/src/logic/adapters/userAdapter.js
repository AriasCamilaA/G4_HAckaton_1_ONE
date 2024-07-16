export const adaptUser = (userData) => ({
    id: userData.id,
    name: `${userData.nombres} ${userData.apellidos}`,
    email: userData.correo,
    role: userData.id_rol_fk,
  });
  