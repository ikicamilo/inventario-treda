const stockService = require("../services/stockService");

const getStockProductoSede = async (req, res) => {
  try {
    const { codProd, codSed } = req.params;
    const stock = await stockService.getStockProductoSede(codProd, codSed);
    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: `${error}` });
  }
};

module.exports = {
  getStockProductoSede,
};
