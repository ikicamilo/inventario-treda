/**
 * @openapi
 * components:
 *   schemas:
 *     Producto:
 *       type: object
 *       properties:
 *         codIntProd:
 *           type: integer
 *           readOnly: true
 *           description: "Código del Producto (Autoincrementable)"
 *           x-auto-increment: true
 *         nomProd:
 *           type: string
 *           example: Manzana
 *           description: "nombre del producto"
 *         preProd:
 *           type: number
 *           format: float
 *           example: 150
 *           description: "Precio del producto"
 *         codCat:
 *           type: integer
 *           example: 100
 *           description: "Código de la categoría, llave foránea de (Categorias)"
 *         codProv:
 *           type: integer
 *           example: 100
 *           description: "Código del proveedor, llave foránea de (Proveedores)"
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
  const Producto = sequelize.define(
    "Producto",
    {
      codIntProd: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Código interno del Proveedor",
      },
      nomProd: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombre del Producto",
      },
      preProd: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        comment: "Precio del Producto",
      },
      codCat: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código de la Categoría",
      },
      codProv: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "Código del Proveedor",
      },
    },
    {
      timestamps: true,
      tableName: "productos",
      underscored: false,
    }
  );

  Producto.associate = (models) => {
    Producto.hasMany(models.Inventario, {
      foreignKey: "codProd",
      as: "transacciones_inventario",
    });
  };

  return Producto;
};
