const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const inventarioController = require("../controllers/inventarioController");

const router = express.Router();

router.post(
  "/create",
  authenticateJWT,
  [
    check("codProd")
      .isInt()
      .withMessage("El código de producto debe ser un número")
      .notEmpty()
      .withMessage("El código de producto es obligatorio"),
    check("codSed")
      .isInt()
      .withMessage("El código de sede debe ser un número")
      .notEmpty()
      .withMessage("El código de sede es obligatorio"),
    check("cantTranInv")
      .isInt()
      .withMessage("La cantidad de la transacción debe ser un número")
      .notEmpty()
      .withMessage("La cantidad de la transacción es obligatorio"),
    check("tipTranInv")
      .notEmpty()
      .withMessage("Tipo de transacción es obligatorio"),
  ],
  inventarioController.createInventario
);

/**
 * @openapi
 * /api/inventario/all:
 *   get:
 *     tags:
 *       - Transacciones inventario
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Transacciones_inventario"
 *     security:
 *     - BearerAuth: []
 *       500:
 *         description: SERVER ERROR
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: FAILED
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string
 *                       example: "Server Error"
 */
router.get("/all", authenticateJWT, inventarioController.getAllInventario);

module.exports = router;
