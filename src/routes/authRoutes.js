const express = require("express");
const { check } = require("express-validator");
const authenticateJWT = require("../middlewares/authMiddlewares");
const authController = require("../controllers/authControllers");

const router = express.Router();

/**
 * @openapi
 * /api/auth/register:
 *   post:
 *     tags:
 *       - Registro de usuario
 *     requestBody:
 *       description:  Objeto JSON del *usuario*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Usuario"
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
 *                     $ref: "#/components/schemas/Usuario"
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
  "/register",
  authenticateJWT,
  [
    check("nomUsu")
      .not()
      .isEmpty()
      .withMessage("El nombre de usuario es obligatorio"),
    check("emailUsu").isEmail().withMessage("Un email válido es requerido"),
    check("passUsu")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  authController.registerUser
);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Login de usuario
 *     requestBody:
 *       description: Objeto JSON del *usuario*
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailUsu:
 *                 type: string
 *                 example: tommy@yahoo
 *               passUsu:
 *                 type: string
 *                 example: hola1234
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
 *                       example: login successfull
 *                     token:
 *                       type: string
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
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
  "/login",
  [
    check("emailUsu").not().isEmpty().withMessage("Ingrese el email"),
    check("passUsu").not().isEmpty().withMessage("Ingrese la contraseña"),
  ],
  authController.loginUser
);

module.exports = router;
