const passport = require("passport");

const routes = require("express").Router();

// routes.get("/", (req, res) => {
//   // #swagger.tags=['Home']
//   res.send("Hello! I'm very scared!");
// });

routes.get("/login", passport.authenticate("github"), (req, res) => {});

routes.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

routes.use("/rocks", require("./rocks"));
routes.use("/plants", require("./plants"));
module.exports = routes;
