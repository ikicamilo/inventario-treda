const authService = require("../services/authService");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (req.user.role === "ADMIN") {
      const { nomUsu, emailUsu, passUsu, rolUsu, codSed } = req.body;

      await authService.register(nomUsu, emailUsu, passUsu, rolUsu, codSed);

      res.status(201).json({
        message: "Usuario registrado correctamente",
      });
    } else {
      res
        .status(403)
        .json({ message: "Rol no autorizado para ejecutar esta operación" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailUsu, passUsu } = req.body;

    const token = await authService.login(emailUsu, passUsu);

    if (!token) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
