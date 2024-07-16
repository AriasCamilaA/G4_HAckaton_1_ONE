export const adaptKey = (keyData) => ({
    id: keyData.id,
    name: keyData.nombre,
    key: keyData.key,
    createdAt: keyData.fecha_creacion,
    expiresAt: keyData.fecha_caducidad,
    userId: keyData.id_usuario_fk,
    modelId: keyData.id_modelo_fk,
    serviceId: keyData.id_servicio_fk,
  });
  