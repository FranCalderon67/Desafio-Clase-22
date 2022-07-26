const { Router } = require("express");
// const { autorizacionWeb } = require("../autorizacion/auth.js");

const path = require("path");
const productosWebRouter = Router();

productosWebRouter.get("/home", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/home.hbs"), { nombre: req.body.email });
});

module.exports = productosWebRouter;
