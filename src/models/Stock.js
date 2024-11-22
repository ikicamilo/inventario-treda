module.exports = (sequelize, DataTypes) => {
  const Stock = sequelize.define(
    "Stock",
    {
      codIntNivStc: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Código interno del Nivel de Stock",
      },
      codProd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código del Producto",
      },
      codSed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código de la Sede",
      },
      cantNivStc: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Cantidad del Nivel de Stock",
      },
    },
    {
      timestamps: true,
      tableName: "niveles_stock",
      underscored: false,
    }
  );

  return Stock;
};
