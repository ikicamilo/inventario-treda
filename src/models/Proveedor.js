/**
 * @openapi
 * components:
 *   schemas:
 *     Proveedor:
 *       type: object
 *       properties:
 *         codIntProv:
 *           type: integer
 *           readOnly: true
 *           description: "Código del proveedor (Autoincrementable)"
 *           x-auto-increment: true
 *         nomProv:
 *           type: string
 *           example: Coratiendas
 *           description: "nombre del proveedor"
 *         contProv:
 *           type: string
 *           example: Pedro Perez
 *           description: "Contacto que representa al proveedor"
 *         dirProv:
 *           type: string
 *           example: Calle falsa 123
 *           description: "Dirección del proveedor"
 *         telProv:
 *           type: string
 *           example: 3333333333
 *           description: "Teléfono del proveedor"
 *         emailProv:
 *           type: string
 *           example: pedro@hotmail.com
 *           description: "Teléfono del proveedor"
 *         createdAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de creación"
 *         updatedAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de actualización"
 */

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
