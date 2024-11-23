const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const sedeController = require("../controllers/sedeController");

const router = express.Router();

/**
 * @openapi
 * /api/sede/create:
 *   post:
 *     tags:
 *       - Creación de Sedes
 *     requestBody:
 *       description: Objeto JSON del *sede* - Habilitada solo para ADMINS
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Sede"
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
 *                     $ref: "#/components/schemas/Sede"
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

/**
 * @openapi
 * /api/sede/all:
 *   get:
 *     tags:
 *       - Sedes
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
 *                     $ref: "#/components/schemas/Sede"
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
router.get("/all", authenticateJWT, sedeController.getAllSedes);

module.exports = router;
