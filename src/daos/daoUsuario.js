const Contenedor = require("../contenedores/contenedorMongo.js");
const mongodbUri = require("../utils/config.js");

const usuarioDao = new Contenedor(mongodbUri, "proyecto", "usuarios");

module.exports = usuarioDao;
