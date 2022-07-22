const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const usuarios = require("../daos/daoUsuario.js");

usuarios.conectarMongo();

passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, async (username, password, cb) => {
    const user = await usuarios.find("username", username);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      cb(new Error("Datos incorrectos"), false);
    } else {
      return cb(null, { nombre: user.nombre, password: user.password });
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(async (username, password, callback) => {
    console.log("usuario=>", username, "password=>", password);
    const users = await usuarios.obtenerTodos();
    const user = users.find((usuario) => usuario.nombre === username);
    if (user) return callback(null, false, { message: "El usuario ya existe" });
    else if (user === undefined) {
      const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const usuarioCreado = { username, password: passwordHasheado };
      console.log(usuarioCreado);
      await usuarios.agregarItem(usuarioCreado);
      callback(null, { nombre: usuarioCreado.nombre, password: usuarioCreado.password });
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(async (usr, done) => {
  try {
    const user = await usuarios.find("username", usr.username);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = passport;
