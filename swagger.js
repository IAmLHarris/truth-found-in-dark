const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Inhabitants API Documentation",
    description: "Documentation for rock and plant inhabitants",
  },
  host: "truth-found-in-dark.onrender.com",
  schemes: ["http", "https"],
};

const fileName = "./swagger.json";
const routes = ["./routes/index.js", "./routes/plants.js", "./routes/rocks.js"];

swaggerAutogen(fileName, routes, doc).then(() => {
  require("./server.js");
});
