"use strict";

// Step 1: Load environment variables (if using dotenv)
require("dotenv").config;

// Step 2: Load core modules and packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const winston = require("winston");
const expressWinston = require("express-winston");

// Step 3: Load custom modules
const connectDB = require("./utilities/db");
//...
const advertisementRoutes = require("./routes/advertisementRoutes");
const errorHandler = require("./middlewares/errorHandler");
const swaggerSpec = require("./swaggerConfig");

// Step 4: Initialize the Express application
const app = express();

// Step 5: Connect to the Database
connectDB();

// Step 6: Set up Middleware
// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up Winston logger for HTTP requests
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "combined.log" }),
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (req, res) {
      return false;
    },
  })
);

// Step 7: Set up Routes
app.use("/api/v1/advertisement", advertisementRoutes);

// Step 8: Set up Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Step 9: Use Custom Error Handling Middleware
app.use(errorHandler);

// Step 10: Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
