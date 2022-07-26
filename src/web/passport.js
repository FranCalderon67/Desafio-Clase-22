const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const usuarios = require("../daos/daoUsuario.js");

usuarios.conectarMongo();

passport.use(
  "signup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, callback) => {
      try {
        const userExists = await usuarios.obtenerUsuario(email);
        console.log("TEST signup");
        if (userExists) {
          return callback(null, false);
        } else {
          const passwordHasheado = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
          const usuarioCreado = usuarios.agregarItem({ email, password: passwordHasheado });
          return callback(null, usuarioCreado);
        }
      } catch (error) {
        console.log("error=>", error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },

    async (email, password, callback) => {
      try {
        const user = await usuarios.obtenerUsuario(email);
        console.log(user);
        if (!user || !bcrypt.compareSync(password, user.password)) {
          return callback(null, false);
        } else {
          return callback(null, user);
        }
      } catch (error) {
        console.log("ERROR=>", error);
        return callback(null, false);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(async (usr, done) => {
  try {
    const user = await usuarios.obtenerUsuario("username", usr.username);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = passport;
