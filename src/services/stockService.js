const { Stock, Producto, Sede } = require("../models");

const getStockProductoSede = async (codProd, codSed) => {
  return await Stock.findOne({
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
  });
};

module.exports = {
  getStockProductoSede,
};
