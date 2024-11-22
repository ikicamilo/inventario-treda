const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const proveedorController = require("../controllers/proveedorController");

const router = express.Router();

router.post(
  "/create",
  authenticateJWT,
  [
    check("nomProv")
      .notEmpty()
      .withMessage("El nombre del proveedor es obligatorio"),
    check("contProv")
      .notEmpty()
      .withMessage("El contacto del proveedor es obligatorio"),
    check("dirProv")
      .notEmpty()
      .withMessage("La dirección del proveedor es obligatoria"),
    check("telProv")
      .isInt()
      .withMessage("El número de teléfono debe ser un número")
      .notEmpty()
      .withMessage("El teléfono del proveedor es obligatorio"),
    check("emailProv").isEmail().withMessage("Un email válido es requerido"),
  ],
  proveedorController.createProveedor
);

router.get("/all", authenticateJWT, proveedorController.getAllProveedores);

module.exports = router;
