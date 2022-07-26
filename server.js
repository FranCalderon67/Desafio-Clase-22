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
const routerinfo = require("./src/rutas/rutasInfo.js");
const yargs = require("yargs");
const argumentos = process.argv.slice(2);

const forkCalc = require("./src/rutas/rutaCalculoFork.js");

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
//Rutas
app.use(routerUsuario);
app.use(routerHomeWeb);
app.use(routerinfo);
app.use(forkCalc);
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

httpServer.listen(
  yargs(argumentos)
    .default({
      port: 8080,
    })
    .alias({
      p: "port",
    }).argv,
  () => {
    console.log("Servidor escuchando en puerto 8080");
  }
);
