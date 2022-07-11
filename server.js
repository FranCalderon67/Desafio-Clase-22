//Imports de express
const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const session = require("express-session");

//Importes de Mongo
const MongoStore = require("connect-mongo");
const MongoUri = require("./src/utils/config.js");

//Imports de Socket y Server
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const { Server: SocketServer } = require("socket.io");
const socketServer = new SocketServer(httpServer);

//Imports de Funcionalidad

const crearProductoRandom = require("./src/utils/productosRandom.js");
const chatNormalizado = require("./src/websockets/mensajes.js");
const productosSocket = require("./src/websockets/productos.js");
const routerAuthWeb = require("./src/web/logAuth.js");
const routerHomeWeb = require("./src/web/home.js");

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

app.use(routerHomeWeb);
app.use(routerAuthWeb);

//Faker
app.get("/api/productos-test", (req, res) => {
  const productos = crearProductoRandom();
  res.send(productos);
});
//Coneccion de Sockets
socketServer.on("connection", async (socket) => {
  chatNormalizado(socket, socketServer.sockets);
  productosSocket(socket, socketServer.sockets);
});

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
