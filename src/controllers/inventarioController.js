const inventarioService = require("../services/inventarioService");
const { validationResult } = require("express-validator");

const createInventario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { codProd, codSed, cantTranInv, tipTranInv } = req.body;

    if (tipTranInv === "COMPRA" && req.user.role !== "EMPLEADO") {
      await inventarioService.createInventario(
        codProd,
        codSed,
        cantTranInv,
        tipTranInv
      );

      res.status(201).json({
        message: "Movimiento de inventario registrado correctamente",
      });
    } else if (tipTranInv === "VENTA") {
      await inventarioService.createInventario(
        codProd,
        codSed,
        cantTranInv,
        tipTranInv
      );

      res.status(201).json({
        message: "Movimiento de inventario registrado correctamente",
      });
    } else {
      res
        .status(403)
        .json({ message: "Rol no autorizado para ejecutar esta operación" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        message:
          err.original.sqlMessage ||
          "Server error - durante registro de inventario",
      });
  }
};

const getAllInventario = async (req, res) => {
  try {
    const inventario = await inventarioService.getAllInventario();
    res.json(inventario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createInventario,
  getAllInventario,
};
