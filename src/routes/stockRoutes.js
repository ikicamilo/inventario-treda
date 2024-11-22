const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const stockController = require("../controllers/stockController");

const router = express.Router();

router.get(
  "/:codProd/:codSed",
  authenticateJWT,
  stockController.getStockProductoSede
);

module.exports = router;
