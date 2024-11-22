/**
 * @openapi
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         codIntUsu:
 *           type: integer
 *           readOnly: true
 *           description: "Código del Usuario (Autoincrementable)"
 *           x-auto-increment: true
 *         nomUsu:
 *           type: string
 *           example: Tommy10
 *           description: "nombre del usuario"
 *         emailUsu:
 *           type: string
 *           example: tommy10@yahoo.com
 *           description: "email del usuario (Campo único)"
 *         passUsu:
 *           type: string
 *           example: hola1234
 *           description: "Contraseña del usuario (Campo encriptado)"
 *         rolUsu:
 *           type: string
 *           example: EMPLEADO
 *           description: "Rol del usuario ('ADMIN', 'ADMIN_SEDE', 'EMPLEADO')"
 *         codSed:
 *           type: integer
 *           example: 100
 *           description: "Código de la sede (Llave foránea de Sedes)"
 *         createdAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de creación del usuario"
 *         updatedAt:
 *           type: timestamp
 *           readOnly: true
 *           example: 2024-11-12T03:19:49.000Z
 *           description: "Fecha de actualización del usuario"
 */

module.exports = (sequelize, DataTypes) => {
  const Usuario = sequelize.define(
    "Usuario",
    {
      codIntUsu: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "Código interno del usuario",
      },
      nomUsu: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        comment: "Nombre del Usuario",
      },
      emailUsu: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        comment: "Email del Usuario",
      },
      passUsu: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "Contraseña del Usuario",
      },
      rolUsu: {
        type: DataTypes.ENUM("ADMIN", "ADMIN_SEDE", "EMPLEADO"),
        defaultValue: "EMPLEADO",
        allowNull: false,
        comment: "Rol del Usuario",
      },
      codSed: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "Código de la Sede",
      },
    },
    {
      timestamps: true,
      tableName: "usuarios",
      underscored: false,
    }
  );

  return Usuario;
};
