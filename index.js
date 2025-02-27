"use strict";

const express = require("express");
const connectDB = require("./functions/utilities/db");
const cors = require("cors");
const app = express();
connectDB();
const bodyParser = require("body-parser");
const advertisementRoutes = require("./functions/routes/advertisementRoutes");
const swaggerSpec = require("./functions/swaggerConfig");
const swaggerUi = require("swagger-ui-express");

// Enable CORS
app.use(cors());

// parse json requests
app.use(express.json());

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1/advertisement", advertisementRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`);
});
