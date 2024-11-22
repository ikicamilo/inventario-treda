const productoService = require("../services/productoService");
const { validationResult } = require("express-validator");

const createProducto = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { nomProd, preProd, codCat, codProv } = req.body;

    if (req.user.role === "ADMIN") {
      await productoService.createProducto(nomProd, preProd, codCat, codProv);

      res.status(201).json({
        message: "Producto registrado correctamente",
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
      .json({ message: "Server error - durante registro de producto" });
  }
};

const updateProducto = async (req, res) => {
  const { codProd } = req.params;

  try {
    if (req.user.role === "ADMIN") {
      await productoService.updateProducto(codProd, req.body);

      res.status(201).json({
        message: "Producto actualizado correctamente",
      });
    } else {
      res
        .status(403)
        .json({ message: "Rol no autorizado para ejecutar esta operación" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error updating producto." });
  }
};

const deleteProducto = async (req, res) => {
  const { codProd } = req.params;

  try {
    if (req.user.role === "ADMIN") {
      const producto = await productoService.deleteProducto(codProd);
      return res.json(producto);
    } else {
      res
        .status(403)
        .json({ message: "Rol no autorizado para ejecutar esta operación" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error deleting producto." });
  }
};

const getAllProductos = async (req, res) => {
  try {
    const productos = await productoService.getAllProductos();
    res.json(productos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createProducto,
  getAllProductos,
  updateProducto,
  deleteProducto,
};
