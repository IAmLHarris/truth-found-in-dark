const express = require("express");
const app = express();
const mongodb = require("./helpers/database");
const bodyParser = require("body-parser");

const port = process.env.PORT || 4000;

process.on("uncaughtException", (err, origin) => {
  console.log(
    process.stderr.id,
    `Exception found! ${err}\n` + `Exception origin: ${origin}`
  );
});

// Swagger stuff
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  next();
});

// Loads the API stuff
app.use(bodyParser.json());
app.use("/", require("./routes"));

// Atempts to run database
mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    // When successful, outputs to a HTML page
    app.listen(port, () => {
      console.log(`Database + Node is running on port ${port}`);
    });
  }
});
