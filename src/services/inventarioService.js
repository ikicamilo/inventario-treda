const { Inventario, Producto, Sede } = require("../models");

const createInventario = async (codProd, codSed, cantTranInv, tipTranInv) => {
  const existingProducto = await Producto.findOne({
    where: { codIntProd: codProd },
  });

  if (!existingProducto) {
    throw new Error("El producto no existe");
  }

  const existingSede = await Sede.findOne({
    where: { codIntSed: codSed },
  });

  if (!existingSede) {
    throw new Error("La sede no existe");
  }

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
