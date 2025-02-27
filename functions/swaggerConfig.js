const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API Project",
      version: "1.0.0",
    },
    servers: [
      {
        url: `https://comforting-melba-d49d40.netlify.app/.netlify/functions/api`,
      },
    ],
  },
  apis: [path.join(__dirname, "routes/*.js")],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
