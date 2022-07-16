const chat = require("../daos/daoChat.js");

const socketMensajeNorm = async (socket, sockets) => {
  socket.emit("messages", await chat.obtenerTodos());

  socket.on("new_message", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await chat.agregarItem(mensaje);
    sockets.emit("messages", await chat.obtenerTodos());
  });
};

module.exports = socketMensajeNorm;
