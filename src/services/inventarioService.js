const { Inventario, Producto, Sede } = require("../models");

const createInventario = async (codProd, codSed, cantTranInv, tipTranInv) => {
  const newInventario = await Inventario.create({
    codProd,
    codSed,
    cantTranInv,
    tipTranInv,
  });

  return newInventario;
};

const getAllInventario = async () => {
  return await Inventario.findAll({
    include: [
      {
        model: Producto,
        as: "productos",
        attributes: ["nomProd"],
      },
      {
        model: Sede,
        as: "sedes",
        attributes: ["nomSed"],
      },
    ],
    order: [["updatedAt", "DESC"]],
  });
};

module.exports = {
  createInventario,
  getAllInventario,
};
