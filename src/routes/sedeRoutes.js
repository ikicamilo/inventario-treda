const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const sedeController = require("../controllers/sedeController");

const router = express.Router();

router.post(
  "/create",
  authenticateJWT,
  [
    check("nomSed")
      .notEmpty()
      .withMessage("El nombre de la sede es obligatorio"),
    check("dirSed")
      .notEmpty()
      .withMessage("La dirección de la sede es obligatoria"),
    check("telSed")
      .isInt()
      .withMessage("El número de teléfono debe ser un número")
      .notEmpty()
      .withMessage("El teléfono de la sede es obligatorio"),
  ],
  sedeController.createSede
);

router.get("/all", authenticateJWT, sedeController.getAllSedes);

module.exports = router;
