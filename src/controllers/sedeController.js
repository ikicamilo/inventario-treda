const sedeService = require("../services/sedeService");
const { validationResult } = require("express-validator");

const createSede = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nomSed, dirSed, telSed } = req.body;

    if (req.user.role === "ADMIN") {
      await sedeService.createSede(nomSed, dirSed, telSed);

      res.status(201).json({
        message: "Sede registrada correctamente",
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
      .json({ message: "Server error - durante registro de sede" });
  }
};

const getAllSedes = async (req, res) => {
  try {
    const sedes = await sedeService.getAllSedes();
    res.json(sedes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createSede,
  getAllSedes,
};
