const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const proveedorController = require("../controllers/proveedorController");

const router = express.Router();

/**
 * @openapi
 * /api/proveedor/create:
 *   post:
 *     tags:
 *       - Creación de Proveedores
 *     requestBody:
 *       description: Objeto JSON del *proveedores* - Solo habilitada para admins
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Proveedor"
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
 *                     $ref: "#/components/schemas/Proveedor"
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

/**
 * @openapi
 * /api/proveedor/all:
 *   get:
 *     tags:
 *       - Proveedores
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
 *                     $ref: "#/components/schemas/Proveedor"
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
router.get("/all", authenticateJWT, proveedorController.getAllProveedores);

module.exports = router;
