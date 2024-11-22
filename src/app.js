const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const sedeRoutes = require("./routes/sedeRoutes");
const proveedorRoutes = require("./routes/proveedorRoutes");
const categoriaRoutes = require("./routes/categoriaRoutes");
const productoRoutes = require("./routes/productoRoutes");
const inventarioRoutes = require("./routes/inventarioRoutes");
const stockRoutes = require("./routes/stockRoutes");
const protectedRoutes = require("./routes/protectedRoutes");

const { swaggerDocs: V1SwaggerDocs } = require("./v1/swagger");

dotenv.config();

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sede", sedeRoutes);
app.use("/api/proveedor", proveedorRoutes);
app.use("/api/categoria", categoriaRoutes);
app.use("/api/producto", productoRoutes);
app.use("/api/inventario", inventarioRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/user", protectedRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  V1SwaggerDocs(app, PORT);
});
