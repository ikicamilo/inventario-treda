const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
const categoriaController = require("../controllers/categoriaController");

const router = express.Router();

router.post(
  "/create",
  authenticateJWT,
  [
    check("nomCat")
      .notEmpty()
      .withMessage("El nombre de la categoria es obligatorio"),
    check("desCat")
      .notEmpty()
      .withMessage("La descripción de la categoria es obligatorio"),
  ],
  categoriaController.createCategoria
);

/**
 * @openapi
 * /api/categoria/all:
 *   get:
 *     tags:
 *       - Categorias
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
 *                     $ref: "#/components/schemas/Categoria"
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
router.get("/all", authenticateJWT, categoriaController.getAllCategorias);

module.exports = router;
