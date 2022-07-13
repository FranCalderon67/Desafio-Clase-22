const { Router } = require("express");
const path = require("path");

const logAuthRouter = Router();

logAuthRouter.get("/", (req, res) => {
  res.redirect("/home");
});

logAuthRouter.get("/login", (req, res) => {
  const nombre = req.session?.nombre;
  if (nombre) {
    res.redirect("/");
  } else {
    res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"));
  }
});

logAuthRouter.post("/login", (req, res) => {
  req.session.nombre = req.body.nombre;
  res.redirect("/home");
});

logAuthRouter.get("/logout", (req, res) => {
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

logAuthRouter.get("/user", (req, res) => {
  if (req.session?.nombre) res.send(req.session.nombre);
  else res.send("invitado");
});

module.exports = logAuthRouter;
