const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const productoController = require("../controllers/productoController");

const router = express.Router();

/**
 * @openapi
 * /api/producto/create:
 *   post:
 *     tags:
 *       - Creación de Productos
 *     requestBody:
 *       description: Objeto JSON del *estudiante*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Producto"
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
 *                     $ref: "#/components/schemas/Producto"
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
router.post(
  "/create",
  authenticateJWT,
  [
    check("nomProd")
      .notEmpty()
      .withMessage("El nombre del producto es obligatorio"),
    check("preProd")
      .isFloat()
      .withMessage("El precio del producto debe ser un número")
      .notEmpty()
      .withMessage("El precio del producto es obligatorio"),
    check("codCat")
      .isInt()
      .withMessage("El código de categoría debe ser un número")
      .notEmpty()
      .withMessage("El código de categoría es obligatorio"),
    check("codProv")
      .isInt()
      .withMessage("El código del proveedor debe ser un número")
      .notEmpty()
      .withMessage("El código del proveedor es obligatorio"),
  ],
  productoController.createProducto
);

/**
 * @openapi
 * /api/producto/update/{codProd}:
 *   put:
 *     tags:
 *       - Actualizar Producto
 *     parameters:
 *       - in: path
 *         name: codProd
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código del Producto
 *     requestBody:
 *       description: Objeto JSON del *producto*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Producto"
 *     security:
 *     - BearerAuth: []
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
 *                     $ref: "#/components/schemas/Producto"
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
router.put(
  "/update/:codProd",
  authenticateJWT,
  [
    check("nomProd")
      .notEmpty()
      .withMessage("El nombre del producto es obligatorio"),
    check("preProd")
      .isFloat()
      .withMessage("El precio del producto debe ser un número")
      .notEmpty()
      .withMessage("El precio del producto es obligatorio"),
    check("codCat")
      .isInt()
      .withMessage("El código de categoría debe ser un número")
      .notEmpty()
      .withMessage("El código de categoría es obligatorio"),
    check("codProv")
      .isInt()
      .withMessage("El código del proveedor debe ser un número")
      .notEmpty()
      .withMessage("El código del proveedor es obligatorio"),
  ],
  productoController.updateProducto
);

/**
 * @openapi
 * /api/producto/delete/{codProd}:
 *   delete:
 *     tags:
 *       - Eliminar producto
 *     parameters:
 *       - in: path
 *         name: codProd
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Código del Producto
 *     security:
 *     - BearerAuth: []
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
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "Producto eliminado correctamente"
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
router.delete(
  "/delete/:codProd",
  authenticateJWT,
  productoController.deleteProducto
);

/**
 * @openapi
 * /api/producto/all:
 *   get:
 *     tags:
 *       - Productos
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
 *                     $ref: "#/components/schemas/Producto"
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
router.get("/all", authenticateJWT, productoController.getAllProductos);

module.exports = router;
