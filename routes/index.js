const routes = require("express").Router();

routes.get("/", (req, res) => {
  // #swagger.tags=['Home']
  res.send("Hello! I'm very scared!");
});

routes.use("/rocks", require("./rocks"));
routes.use("/plants", require("./plants"));
module.exports = routes;
