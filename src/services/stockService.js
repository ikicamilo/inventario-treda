const { Stock, Producto, Sede } = require("../models");

const getStockProductoSede = async (codProd, codSed) => {
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

  return (
    (await Stock.findOne({
      where: { codProd, codSed },
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
    })) ?? []
  );
};

module.exports = {
  getStockProductoSede,
};
