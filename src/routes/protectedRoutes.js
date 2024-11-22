const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { check } = require("express-validator");
// const UserController = require("../controllers/authControllers");
const { Usuario } = require("../models");

const router = express.Router();

router.get("/me", authenticateJWT, async (req, res) => {
  try {
    console.log(req.user);
    const userId = req.user.userId;

    const user = await Usuario.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      user: {
        ...user.toJSON(),
        passUsu: undefined,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
