const { Router } = require("express");

const path = require("path");
const routerUsuario = Router();
const passport = require("../web/passport.js");

// const { loginErrorHandler, signupErrorHandler } = require("../utils/passportErrors.js");

routerUsuario.use(passport.initialize());
routerUsuario.use(passport.session());

routerUsuario.get("/", (req, res) => {
  res.redirect("/login");
});

routerUsuario.get("/login", (req, res, next) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"));
});

routerUsuario.post("/login", passport.authenticate("login", { failureRedirect: "/failedLogin", successRedirect: "/" }));

routerUsuario.get("/signup", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/signup.hbs"));
});

routerUsuario.post("/signup", passport.authenticate("signup", { failureRedirect: "/failedSignup", successRedirect: "/login" }));

routerUsuario.get("/failedLogin", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/errorLogin.hbs"));
});

routerUsuario.get("/failedSignup", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/errorSignup.hbs"));
});

routerUsuario.get("/logout", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    req.session.destroy((err) => {
      if (!err) {
        res.render(path.join(process.cwd(), "./public/hbsViews/logout.hbs"), { nombre: nombre });
      } else {
        res.redirect("/");
      }
    });
  } else {
    res.redirect("/");
  }
});

routerUsuario.get("/user", (req, res) => {
  if (req.session?.nombre) res.send(req.session.nombre);
  else res.send("invitado");
});

module.exports = routerUsuario;
