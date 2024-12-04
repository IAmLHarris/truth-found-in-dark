const Validatorjs = require("validatorjs");

const validation = async (body, rules, customMessages, callback) => {
  const validation = new Validatorjs(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

module.exports = validation;
