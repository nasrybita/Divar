const express = require("express");
const serverless = require("serverless-http");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const advertisementRoutes = require("./routes/advertisementRoutes");

const app = express();

app.use(
  "/.netlify/functions/api/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(express.json());
app.use("/api/v1/advertisement", advertisementRoutes);

module.exports.handler = serverless(app);
