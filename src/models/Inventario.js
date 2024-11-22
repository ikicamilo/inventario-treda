/**
 * @openapi
 * components:
 *   schemas:
 *     Transacciones_inventario:
 *       type: object
 *       properties:
 *         codIntTranInv:
 *           type: integer
 *           readOnly: true
 *           description: "Código de la transacción del inventario (Autoincrementable)"
 *           x-auto-increment: true
 *         codProd:
 *           type: integer
 *           example: 100
 *           description: "código del producto (Llave foránea de Productos)"
 *         codSed:
 *           type: integer
 *           example: 100
 *           description: "Código de la sede (Llave foránea de Sedes)"
 *         cantTranInv:
 *           type: integer
 *           example: 100
 *           description: "Cantidad de la transacción del inventario"
 *         tipTranInv:
 *           type: string
 *           example: COMPRA
 *           description: "Tipo de transacción (COMPRA | VENTA)"
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
  const Inventario = sequelize.define(
    "Inventario",
    {
      codIntTranInv: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Código interno de la transacción del inventario",
      },
      codProd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código del Producto",
      },
      codSed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código de la sede",
      },
      cantTranInv: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Cantidad de la transacción del inventario",
      },
      tipTranInv: {
        type: DataTypes.ENUM("COMPRA", "VENTA"),
        allowNull: false,
        defaultValue: "VENTA",
        comment: "Tipo de Transacción del Inventario",
      },
    },
    {
      timestamps: true,
      tableName: "transacciones_inventario",
      underscored: false,
    }
  );

  return Inventario;
};
