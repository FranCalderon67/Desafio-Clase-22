const Contenedor = require("../contenedores/contenedorMongo.js");
const mongodbUri = require("../utils/config.js");

const productDao = new Contenedor(mongodbUri, "proyecto", "productos");

module.exports = productDao;
