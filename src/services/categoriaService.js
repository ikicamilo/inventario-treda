const { Categoria } = require("../models");

const createCategoria = async (nomCat, desCat) => {
  const newCategoria = await Categoria.create({
    nomCat,
    desCat,
  });

  return newCategoria;
};

const getAllCategorias = async () => {
  return await Categoria.findAll({
    order: [["updatedAt", "DESC"]],
  });
};

module.exports = {
  createCategoria,
  getAllCategorias,
};
