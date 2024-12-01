const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Inhabitants API Documentation",
    description: "Documentation for rock and plant inhabitants",
  },
  host: "localhost:4000",
  schemes: ["http", "https"],
};

const fileName = "./swagger.json";
const routes = ["./routes/index.js", "./routes/plants.js", "./routes/rocks.js"];

swaggerAutogen(fileName, routes, doc).then(() => {
  require("./server.js");
});
