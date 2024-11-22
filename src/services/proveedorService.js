const { Proveedor } = require("../models");

const createProveedor = async (
  nomProv,
  contProv,
  telProv,
  emailProv,
  dirProv
) => {
  const newProveedor = await Proveedor.create({
    nomProv,
    contProv,
    telProv,
    emailProv,
    dirProv,
  });

  return newProveedor;
};

const getAllProveedores = async () => {
  return await Proveedor.findAll({
    order: [["updatedAt", "DESC"]],
  });
};

module.exports = {
  createProveedor,
  getAllProveedores,
};
