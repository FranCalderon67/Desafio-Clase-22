const Contenedor = require("../Contenedores/contenedorMongo.js");
const mongodbUri = require("../utils/config.js");

const productDao = new Contenedor(mongodbUri, "desafio22", "productos");

module.exports = productDao;
