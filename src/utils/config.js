require("dotenv").config();

const mongodbUri = process.env.MONGOURI;
module.exports = mongodbUri;
