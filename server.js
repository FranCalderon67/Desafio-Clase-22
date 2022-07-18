//Imports de express
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const session = require("express-session");

//Imports de Mongo
const MongoStore = require("connect-mongo");
const MongoUri = require("./src/utils/config.js");

//Imports de Socket y Server
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const { Server: SocketServer } = require("socket.io");
const socketServer = new SocketServer(httpServer);

//Imports de Funcionalidad

const crearProductoRandom = require("./src/utils/productosRandom.js");
const chatSocket = require("./src/websockets/webSocketMensajes.js");
const productosSocket = require("./src/websockets/webSocketProductos.js");
const routerUsuario = require("./src/rutas/rutasUsuario.js");
const routerHomeWeb = require("./src/web/home.js");
// const routerUsuario = require("./src/web/logAuth");

//Configuracion de servidor
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./public/hbsViews");
app.set("view engine", "hbs");

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);
//Guardo en MONGO los datos y cookie de sesion
app.use(
  session({
    store: MongoStore.create({ mongoUrl: MongoUri }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
  })
);

app.use(routerUsuario);
app.use(routerHomeWeb);

// app.use(routerUsuario);
//Faker
app.get("/api/productos-test", (req, res) => {
  const productos = crearProductoRandom();
  res.send(productos);
});
//Coneccion de Sockets
socketServer.on("connection", async (socket) => {
  chatSocket(socket, socketServer.sockets);
  productosSocket(socket, socketServer.sockets);
});

// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const bCrypt = require("bcryptjs");

// passport.use(
//   "signup",
//   new LocalStrategy(
//     {
//       passReqToCallback: true,
//     },
//     (req, username, password, done) => {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) {
//           console.log("Error in SignUp: " + err);
//           return done(err);
//         }

//         if (user) {
//           console.log("User already exists");
//           return done(null, false);
//         }

//         const newUser = {
//           username: username,
//           password: createHash(password),
//           email: req.body.email,
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//         };

//         User.create(newUser, (err, userWithId) => {
//           if (err) {
//             console.log("Error in Saving user: " + err);
//             return done(err);
//           }
//           console.log(user);
//           console.log("User Registration succesful");
//           return done(null, userWithId);
//         });
//       });
//     }
//   )
// );

// function createHash(password) {
//   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// }

// app.post("/signup", passport.authenticate("signup", { failureRedirect: "/login" }), async (req, res) => {
//   const nuevoUsuario = req.body;
//   if (nuevoUsuario.mail === "" || nuevoUsuario.password === "") {
//     res.status(400).send({ error: "Datos incompletos" });
//   } else {
//     await usuario.agregarItem(nuevoUsuario);
//     res.redirect("/login");
//   }
// });

// const usuario = require("./src/daos/daoUsuario");
// const { Router } = require("express");
// const routerUsuario = Router();

// routerUsuario.post("/signin", async (req, res) => {
//   const nuevoUsuario = req.body;
//   if (nuevoUsuario.mail === "" || nuevoUsuario.password === "") {
//     res.status(400).send({ error: "Datos incompletos" });
//   } else {
//     await usuario.agregarItem(nuevoUsuario);
//     res.redirect("/login");
//   }
// });

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
