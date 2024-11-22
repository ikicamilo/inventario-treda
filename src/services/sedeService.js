const { Sede } = require("../models");

const createSede = async (nomSed, dirSed, telSed) => {
  const newSede = await Sede.create({
    nomSed,
    dirSed,
    telSed,
  });

  return newSede;
};

const getAllSedes = async () => {
  return await Sede.findAll({
    order: [["updatedAt", "DESC"]],
  });
};

module.exports = {
  createSede,
  getAllSedes,
};
