/**
 * @openapi
 * components:
 *   schemas:
 *     Sede:
 *       type: object
 *       properties:
 *         codIntSed:
 *           type: integer
 *           readOnly: true
 *           description: "Código de la sede (Autoincrementable)"
 *           x-auto-increment: true
 *         nomSed:
 *           type: string
 *           example: Barranquilla
 *           description: "nombre de la sede"
 *         dirSed:
 *           type: string
 *           example: calle falsa 123
 *           description: "dirección de la sede"
 *         telSed:
 *           type: string
 *           example: 3215648999
 *           description: "teléfono de la sede"
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
