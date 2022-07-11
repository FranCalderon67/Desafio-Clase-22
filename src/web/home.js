const { Router } = require("express");
const { autorizacionWeb } = require("../autorizacion/auth.js");
const path = require("path");
const productosWebRouter = Router();

productosWebRouter.get("/home", autorizacionWeb, (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/home.hbs"), { nombre: req.session.nombre });
});

module.exports = productosWebRouter;
