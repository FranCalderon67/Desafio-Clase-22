const { Router } = require("express");

const path = require("path");
const productosWebRouter = Router();

productosWebRouter.get("/home", (req, res) => {
  res.render(path.join(process.cwd(), "./public/hbsViews/home.hbs"), { nombre: req.session.email });
});

module.exports = productosWebRouter;
