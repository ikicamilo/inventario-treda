const categoriaService = require("../services/categoriaService");
const { validationResult } = require("express-validator");

const createCategoria = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nomCat, desCat } = req.body;

    if (req.user.role === "ADMIN") {
      await categoriaService.createCategoria(nomCat, desCat);

      res.status(201).json({
        message: "Categoria registrada correctamente",
      });
    } else {
      res
        .status(403)
        .json({ message: "Rol no autorizado para ejecutar esta operación" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error - durante registro de categoria" });
  }
};

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await categoriaService.getAllCategorias();
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createCategoria,
  getAllCategorias,
};
