// const passport = require("passport");
// const LocalStrategy = require("passport-local");

const autorizacionWeb = (req, res, next) => {
  if (req.session?.nombre) {
    next();
  } else {
    res.redirect("/login");
  }
};

const autorizacionApi = (req, res, next) => {
  if (req.session?.nombre) {
    next();
  } else {
    res.status(401).json({ error: "Autorizacion denegada" });
  }
};

module.exports = {
  autorizacionWeb,
  autorizacionApi,
};
