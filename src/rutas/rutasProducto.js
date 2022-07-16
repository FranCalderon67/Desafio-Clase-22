const { Router } = require("express");
const producto = require("../daos/daoProducto.js");
const routerProducto = Router();

routerProducto.get("/home", async (req, res) => {
  let productos = await producto.obtenerTodos();
  console.log(productos);
  res.render("home", { productos });
});

routerProducto.post("/productos", async (req, res) => {
  let prod = req.body;
  if (prod.name === "" || prod.price === "" || prod.image === "") {
    res.status(400).send({ error: "El producto no se pudo cargar, hay campos vacios" });
  } else {
    await producto.agregarItem(req.body);
    res.redirect("/home");
  }
});

module.exports = routerProducto;
