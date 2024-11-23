const express = require("express");
const authenticateJWT = require("../middlewares/authMiddlewares");
const { Usuario } = require("../models");

const router = express.Router();

router.get("/me", authenticateJWT, async (req, res) => {
  try {
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
