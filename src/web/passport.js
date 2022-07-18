// const { Router } = require("express");
// const path = require("path");
// const { passportUser } = require("../rutas/rutasUsuario.js");
// const { rutasUsuario } = require("../rutas/rutasUsuario.js");
// const logAuthRouter = Router();

// logAuthRouter.get("/", (req, res) => {
//   res.redirect("/home");
// });

// logAuthRouter.get("/login", (req, res) => {
//   const nombre = req.session?.nombre;
//   if (nombre) {
//     res.redirect("/");
//   } else {
//     res.render(path.join(process.cwd(), "./public/hbsViews/login.hbs"));
//   }
// });

// logAuthRouter.post("/login", passportUser.authenticate("login"), rutasUsuario.bienvenida);

// // logAuthRouter.post("/login", (req, res) => {
// //   req.session.nombre = req.body.nombre;
// //   res.redirect("/home");
// // });

// logAuthRouter.get("/signup", (req, res) => {
//   res.render(path.join(process.cwd(), "./public/hbsViews/signup.hbs"));
// });

// logAuthRouter.post("/signup", passport.authenticate("registracion"), rutasUsuario.registracion);

// logAuthRouter.get("/logout", (req, res) => {
//   const nombre = req.session?.nombre;
//   if (nombre) {
//     req.session.destroy((err) => {
//       if (!err) {
//         res.render(path.join(process.cwd(), "./public/hbsViews/logout.hbs"), { nombre: nombre });
//       } else {
//         res.redirect("/");
//       }
//     });
//   } else {
//     res.redirect("/");
//   }
// });

// logAuthRouter.get("/user", (req, res) => {
//   if (req.session?.nombre) res.send(req.session.nombre);
//   else res.send("invitado");
// });

// module.exports = logAuthRouter;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const usuarios = require("../daos/daoUsuario.js");

passport.use(
  "login",
  new LocalStrategy(async (username, password, callback) => {
    const users = await usuarios.obtenerTodos();
    const user = users.find((usuario) => usuario.username === username);
    if (!user || !bcrypt.compareSync(password, user.password)) return callback(null, false, { message: "Usuario no existente o password incorrecto" });
    callback(null, user);
  })
);

passport.use(
  "signup",
  new LocalStrategy(async (username, password, callback) => {
    const users = await usuarios.obtenerTodos();
    const user = users.find((usuario) => usuario.username === username);
    if (user) return callback(null, false, { message: "El usuario ya existe" });
    const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const usuarioCreado = { username, password: passwordHasheado };
    console.log(usuarioCreado);
    await usuarios.agregarItem(usuarioCreado);
    callback(null, usuarioCreado);
  })
);

/*
    Candot engo que escribir una sesion, me pasan req.user y elijo
    que guardar en la sesion, en este caso es el username.
  */
passport.serializeUser((usuario, callback) => {
  callback(null, usuario.username);
});

/*
    Cuando tengo que leer una sesion, agarro lo que esta en la sesion
    y decido como reconstruir req.user
  */
passport.deserializeUser((username, callback) => {
  const user = users.find((usr) => usr.username == username);
  callback(null, user);
});

module.exports = passport;
