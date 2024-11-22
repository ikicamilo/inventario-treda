const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Inventario Treda", version: "1.0.0" },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // You can specify JWT as the bearer format
        },
      },
    },
  },
  apis: [
    "src/routes/authRoutes.js",
    "src/routes/categoriaRoutes.js",
    "src/routes/inventarioRoutes.js",
    "src/routes/productoRoutes.js",
    "src/routes/proveedorRoutes.js",
    "src/routes/sedeRoutes.js",
    "src/routes/stockRoutes.js",
    "src/models/Categoria.js",
    "src/models/Inventario.js",
    "src/models/Producto.js",
    "src/models/Proveedor.js",
    "src/models/Sede.js",
    "src/models/Stock.js",
    "src/models/Usuario.js",
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available at http://localhost:${process.env.PORT}/api/v1/docs`
  );
};

module.exports = { swaggerDocs };
