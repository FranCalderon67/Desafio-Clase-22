const productos = require("../daos/producto.js");

const socketProducto = async (socket, sockets) => {
  socket.emit("products", await productos.obtenerTodos());

  socket.on("new_products", async (producto) => {
    await productos.agregarItem(producto);
    sockets.emit("products", await productos.obtenerTodos());
  });
};

module.exports = socketProducto;
