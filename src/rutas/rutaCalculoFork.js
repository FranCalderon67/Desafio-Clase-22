const { Router } = require("express");
const { fork } = require("child_process");
const { calcRandom } = require("../utils/calcFork.js");

const routerFork = Router();

routerFork.get("/api/random/:cantidad?", (req, res) => {
  const cantidad = req.params.cantidad || "100000000";
  console.log("cantidad=>", cantidad);

  const calcFork = fork("./src/utils/calcFork.js");
  calcFork.send(cantidad);
  calcFork.on("message", (msg) => {
    if (msg === "") {
      res.send(cantidad);
    } else {
      res.send(calcRandom(cantidad));
    }
  });
});

module.exports = routerFork;
