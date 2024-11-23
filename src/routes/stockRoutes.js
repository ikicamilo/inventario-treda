const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const stockController = require("../controllers/stockController");

const router = express.Router();

/**
 * @openapi
 * /api/stock/{codProd}/{codSed}:
 *   get:
 *     tags:
 *       - Stock del producto por sede
 *     parameters:
 *       - in: path
 *         name: codProd
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código del Producto
 *       - in: path
 *         name: codSed
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código de la Sede
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
 *                     $ref: "#/components/schemas/Stock"
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
router.get(
  "/:codProd/:codSed",
  authenticateJWT,
  stockController.getStockProductoSede
);

module.exports = router;
