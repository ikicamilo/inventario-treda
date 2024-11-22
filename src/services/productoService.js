const { Producto, Categoria, Proveedor } = require("../models");

const createProducto = async (nomProd, preProd, codCat, codProv) => {
  const newProducto = await Producto.create({
    nomProd,
    preProd,
    codCat,
    codProv,
  });

  return newProducto;
};

const updateProducto = async (codIntProd, data) => {
  const { nomProd, preProd, codCat, codProv } = data;

  const existingProducto = await Producto.findOne({
    where: { codIntProd },
  });

  if (!existingProducto) {
    throw new Error("El Producto no existe");
  }

  existingProducto.nomProd = nomProd || existingProducto.nomProd;
  existingProducto.preProd = preProd || existingProducto.preProd;
  existingProducto.codCat = codCat || existingProducto.codCat;
  existingProducto.codProv = codProv || existingProducto.codProv;

  await existingProducto.save();

  return existingProducto;
};

const deleteProducto = async (codIntProd) => {
  const producto = await Producto.findOne({
    where: { codIntProd },
  });

  if (!producto) {
    throw new Error("El producto no existe");
  }

  await producto.destroy();

  return { message: "Producto eliminado correctamente" };
};

const getAllProductos = async () => {
  return await Producto.findAll({
    include: [
      {
        model: Categoria,
        as: "categorias",
        attributes: ["nomCat"],
      },
      {
        model: Proveedor,
        as: "proveedores",
        attributes: ["nomProv"],
      },
    ],
    order: [["updatedAt", "DESC"]],
  });
};

module.exports = {
  createProducto,
  getAllProductos,
  updateProducto,
  deleteProducto,
};
