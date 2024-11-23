const { DataTypes, Op } = require("sequelize");
const sequelize = require("../config/db");

const Sede = require("./Sede")(sequelize, DataTypes);
const Usuario = require("./Usuario")(sequelize, DataTypes);
const Proveedor = require("./Proveedor")(sequelize, DataTypes);
const Categoria = require("./Categoria")(sequelize, DataTypes);
const Producto = require("./Producto")(sequelize, DataTypes);
const Inventario = require("./Inventario")(sequelize, DataTypes);
const Stock = require("./Stock")(sequelize, DataTypes);

Sede.associate({ Usuario, Inventario, Stock });

Usuario.belongsTo(Sede, {
  foreignKey: "codSed",
  as: "sedes",
});

Proveedor.associate({ Producto });
Categoria.associate({ Producto });

Producto.associate({ Inventario, Stock });

Producto.belongsTo(Categoria, {
  foreignKey: "codCat",
  as: "categorias",
});

Producto.belongsTo(Proveedor, {
  foreignKey: "codProv",
  as: "proveedores",
});

Inventario.belongsTo(Sede, {
  foreignKey: "codSed",
  as: "sedes",
});

Inventario.belongsTo(Producto, {
  foreignKey: "codProd",
  as: "productos",
});

Stock.belongsTo(Sede, {
  foreignKey: "codSed",
  as: "sedes",
});

Stock.belongsTo(Producto, {
  foreignKey: "codProd",
  as: "productos",
});

module.exports = {
  sequelize,
  Op,
  Sede,
  Usuario,
  Proveedor,
  Categoria,
  Producto,
  Inventario,
  Stock,
};
