/**
 * @openapi
 * components:
 *   schemas:
 *     Categoria:
 *       type: object
 *       properties:
 *         codIntCat:
 *           type: integer
 *           readOnly: true
 *           description: "Código de la categoria (Autoincrementable)"
 *           x-auto-increment: true
 *         nomCat:
 *           type: string
 *           example: higiene
 *           description: "nombre de la categoria"
 *         desCat:
 *           type: string
 *           example: contiene los productos de higiene
 *           description: "descripcion de la categoria"
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
  const Categoria = sequelize.define(
    "Categoria",
    {
      codIntCat: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Código interno de la categoría",
      },
      nomCat: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Nombre de la categoría",
      },
      desCat: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "Descripción de la categoría",
      },
    },
    {
      timestamps: true,
      tableName: "categorias",
      underscored: false,
    }
  );

  Categoria.associate = (models) => {
    Categoria.hasMany(models.Producto, {
      foreignKey: "codCat",
      as: "productos",
    });
  };

  return Categoria;
};
