const express = require("express");
// const { Server: IOServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const { engine } = require("express-handlebars");
const chat = require("./daos/chat.js");
const producto = require("./daos/producto.js");
const crearProductoRandom = require("./utils/productosRandom.js");
const chatNormalizado = require("./websockets/mensajes.js");
//Conecto MongoDB
producto.conectarMongo();
const app = express();
const httpServer = new HttpServer(app);
// const ioServer = new IOServer(httpServer);
const { Server: SocketServer } = require("socket.io");
const socketServer = new SocketServer(httpServer);

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

app.get("/", async (req, res) => {
  let productos = await producto.obtenerTodos();
  console.log(productos);
  res.render("formulario", { productos });
});

app.post("/productos", async (req, res) => {
  let prod = req.body;
  if (prod.name === "" || prod.price === "" || prod.image === "") {
    res.status(400).send({ error: "El producto no se pudo cargar, hay campos vacios" });
  } else {
    await producto.agregarItem(req.body);
    res.redirect("/");
  }
});

//Faker
app.get("/api/productos-test", (req, res) => {
  const productos = crearProductoRandom();
  res.send(productos);
});

socketServer.on("connection", async (socket) => {
  chatNormalizado(socket, SocketServer.sockets);
  // socket.emit("messages", await chat.obtenerTodos());
  socket.emit("products", await producto.obtenerTodos());

  socket.on("new_message", async (mensaje) => {
    console.log(mensaje);
    chat.agregarItem(mensaje);
    let mensajes = await chat.obtenerTodos();
    socketServer.sockets.emit("messages", mensajes);
  });

  socket.on("new_products", async (product) => {
    await producto.agregarItem(product);
    let productos = (await producto.obtenerTodos()) === "" ? "" : await producto.obtenerTodos();
    socketServer.sockets.emit("products", productos);
  });
});

httpServer.listen(8080, () => {
  console.log("Servidor escuchando en puerto 8080");
});
