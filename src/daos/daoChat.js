const Contenedor = require("../contenedores/contenedorMongo.js");
const mongodbUri = require("../utils/config.js");

const chatDao = new Contenedor(mongodbUri, "proyecto", "chats");

module.exports = chatDao;
