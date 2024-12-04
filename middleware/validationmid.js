const validaton = require("../helpers/validationhelp");

const check = async (req, res, next) => {
  const validationRule = {
    color: "required|string",
    location: "required|string",
    name: "required|string",
    personality: "required|string",
  };

  await validaton(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: err,
      });
    } else {
      next();
    }
  }).catch((err) => console.log(err));
};

module.exports = {
  check,
};
