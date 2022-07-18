const { Router } = require("express");
// const usuario = require("../daos/daoUsuario.js");
const path = require("path");
const routerUsuario = Router();
const passport = require("../web/passport.js");

routerUsuario.use(passport.initialize());
routerUsuario.use(passport.session());

routerUsuario.get("/", (req, res) => {
  res.redirect("/home");
});

routerUsuario.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"));
  }
});

// routerUsuario.post("/login", (req, res) => {
//   req.session.nombre = req.body.nombre;
//   res.redirect("/home");
// });

routerUsuario.post("/login", passport.authenticate("login"), routerUsuario.get("/login"));

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

routerUsuario.get("/signup", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/signup.hbs"));
});

// routerUsuario.post("/signup", async (req, res) => {
//   const nuevoUsuario = req.body;
//   if (nuevoUsuario.mail === "" || nuevoUsuario.password === "") {
//     res.status(400).send({ error: "Datos incompletos" });
//   } else {
//     await usuario.agregarItem(usuario);
//     res.redirect("/login");
//   }
// });

routerUsuario.post("/signup", passport.authenticate("signup", { failureRedirect: "/", failureMessage: true }));

routerUsuario.get("/user", (req, res) => {
  if (req.session?.nombre) res.send(req.session.nombre);
  else res.send("invitado");
});

module.exports = routerUsuario;
