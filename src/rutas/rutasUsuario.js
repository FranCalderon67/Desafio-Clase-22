const { Router } = require("express");

const path = require("path");
const routerUsuario = Router();
const passport = require("../web/passport.js");
// const usuario = require("../../src/daos/daoUsuario.js");

const { loginErrorHandler, signupErrorHandler } = require("../utils/passportErrors.js");

routerUsuario.use(passport.initialize());
routerUsuario.use(passport.session());

routerUsuario.get("/", (req, res) => {
  res.redirect("/home");
});

// routerUsuario.get("/login", (req, res) => {
//   const nombre = req.session?.nombre;
//   if (nombre) {
//     res.redirect("/");
//   } else {
//     res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"));
//   }
// });

routerUsuario.get("/login", (req, res, next) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"));
});

routerUsuario.get("/failedLogin", (req, res, next) => {
  res.sendFile(path.join(process.cwd(), "./public/hbsViews/errorLogin.hbs"));
});

// routerUsuario.post("/login", (req, res) => {
//   req.session.nombre = req.body.nombre;
//   res.redirect("/home");
// });

routerUsuario.post("/login", passport.authenticate("login"), loginErrorHandler, (req, res) => {
  return res.redirect("/");
});

routerUsuario.get("/signup", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/signup.hbs"));
});

routerUsuario.post("/signup", passport.authenticate("signup"), signupErrorHandler, (req, res) => {
  res.redirect("/");
});

// routerUsuario.post("/signup", passport.authenticate("signup", { failureRedirect: "/" }), async (req, res) => {
//   const nuevoUsuario = req.body;
//   if (nuevoUsuario.nombre === "" || nuevoUsuario.password === "") {
//     res.status(400).send({ error: "Datos incompletos" });
//   } else {
//     await usuario.agregarItem(nuevoUsuario);
//     res.redirect("/login");
//   }
// });

routerUsuario.get("/failedSignup", (req, res, next) => {
  res.sendFile(path.join(process.cwd(), "./public/hbsViews/errorSignup.hbs"));
});

// routerUsuario.post(
//   "/signup",
//   passport.authenticate("signup", async (req, res) => {
//     const nuevoUsuario = req.body;
//     if (nuevoUsuario.nombre === "" || nuevoUsuario.password === "") {
//       res.status(400).send({ error: "Datos incompletos" });
//     } else {
//       await usuario.agregarItem(nuevoUsuario);
//       res.redirect("/login");
//     }
//   })
// );

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
