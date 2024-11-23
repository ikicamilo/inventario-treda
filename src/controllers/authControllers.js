const authService = require("../services/authService");
const { validationResult } = require("express-validator");

const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nomUsu, emailUsu, passUsu, rolUsu, codSed } = req.body;

    await authService.register(nomUsu, emailUsu, passUsu, rolUsu, codSed);

    res.status(201).json({
      message: "Usuario registrado correctamente",
    });
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

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await authService.getAllUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getAllUsuarios,
};
