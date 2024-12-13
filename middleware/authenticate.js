const authentication = (req, res, next) => {
  if (req.session.user === undefined) {
    return res.status(401).json("Access denied. Log in, silly.");
  }
  next();
};

module.exports = { authentication };
