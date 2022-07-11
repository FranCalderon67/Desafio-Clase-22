const chat = require("../daos/chat.js");
const { normalizarMensajes } = require("../normalizacion/mensajes.js");

const socketMensajeNorm = async (socket, sockets) => {
  socket.emit("messages", normalizarMensajes(await chat.obtenerTodos()));

  socket.on("new_message", async (mensaje) => {
    mensaje.fyh = new Date().toLocaleString();
    await chat.agregarItem(mensaje);
    sockets.emit("messages", normalizarMensajes(await chat.obtenerTodos()));
  });
};

module.exports = socketMensajeNorm;
