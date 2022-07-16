const Contenedor = require("../Contenedores/contenedorMongo.js");
const mongodbUri = require("../utils/config.js");

const chatDao = new Contenedor(mongodbUri, "proyecto", "chats");

module.exports = chatDao;
