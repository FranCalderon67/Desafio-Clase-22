const { Router } = require("express");
const { fork } = require("child_process");

const routerFork = Router();

routerFork.get("/api/random/:cantidad?", (req, res) => {
  const cantidad = req.query.cantidad || "100000000";

  const calcFork = fork("./src/utils/calcFork.js");
  calcFork.send(cantidad);
  calcFork.on("random", (msg) => {
    res.send(msg);
  });
});

module.exports = routerFork;
