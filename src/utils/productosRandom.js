const { faker } = require("@faker-js/faker");

faker.locale = "es";

const crearProductoRandom = () => {
  return {
    title: faker.commerce.product(),
    price: faker.commerce.price(),
    thumbnail: faker.image.imageUrl(),
  };
};

const listaProductoRandom = (quantity = 5) => {
  const productList = [];
  for (let i = 0; i < quantity; i++) {
    productList.push(crearProductoRandom());
  }
  return productList;
};

module.exports = listaProductoRandom;
