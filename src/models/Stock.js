/**
 * @openapi
 * components:
 *   schemas:
 *     Stock:
 *       type: object
 *       properties:
 *         codIntNivStc:
 *           type: integer
 *           readOnly: true
 *           description: "Código del Nivel de Stock (Autoincrementable)"
 *           x-auto-increment: true
 *         codProd:
 *           type: integer
 *           example: 100
 *           description: "Código del Producto, llave foránea de (Productos)"
 *         codSed:
 *           type: integer
 *           example: 100
 *           description: "Código de la sede, llave foránea de (Sedes)"
 *         cantNivStc:
 *           type: integer
 *           example: 100
 *           description: "Cantidad de items en el stock"
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
