module.exports = (sequelize, DataTypes) => {
  const Sede = sequelize.define(
    "Sede",
    {
      codIntSed: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Código interno de la sede",
      },
      nomSed: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombre de la sede",
      },
      dirSed: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Dirección de la sede",
      },
      telSed: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: "Teléfono de la sede",
      },
    },
    {
      timestamps: true,
      tableName: "sedes",
      underscored: false,
    }
  );

  Sede.associate = (models) => {
    Sede.hasMany(models.Usuario, {
      foreignKey: "codSed",
      as: "usuarios",
    });
    Sede.hasMany(models.Inventario, {
      foreignKey: "codSed",
      as: "transacciones_inventario",
    });
  };

  return Sede;
};
