module.exports = (sequelize, DataTypes) => {
  const Proveedor = sequelize.define(
    "Proveedor",
    {
      codIntProv: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Código interno del Proveedor",
      },
      nomProv: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombre del Proveedor",
      },
      contProv: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Contacto del Proveedor",
      },
      dirProv: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Dirección del Proveedor",
      },
      telProv: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: "Teléfono del Proveedor",
      },
      emailProv: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          isEmail: true,
        },
        comment: "Email del Proveedor",
      },
    },
    {
      timestamps: true,
      tableName: "proveedores",
      underscored: false,
    }
  );

  Proveedor.associate = (models) => {
    Proveedor.hasMany(models.Producto, {
      foreignKey: "codProv",
      as: "usuarios",
    });
  };

  return Proveedor;
};
