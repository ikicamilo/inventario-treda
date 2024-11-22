const proveedorService = require("../services/proveedorService");
const { validationResult } = require("express-validator");

const createProveedor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nomProv, contProv, telProv, emailProv, dirProv } = req.body;

    if (req.user.role === "ADMIN") {
      await proveedorService.createProveedor(
        nomProv,
        contProv,
        telProv,
        emailProv,
        dirProv
      );

      res.status(201).json({
        message: "Proveedor registrado correctamente",
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
      .json({ message: "Server error - durante registro de proveedor" });
  }
};

const getAllProveedores = async (req, res) => {
  try {
    const proveedores = await proveedorService.getAllProveedores();
    res.json(proveedores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProveedor,
  getAllProveedores,
};
