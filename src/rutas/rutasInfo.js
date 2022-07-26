const { Router } = require("express");

const routerInfo = Router();

routerInfo.get("/info", (req, res) => {
  const info = {
    argumentosEntrada: process.argv,
    sistema: process.platform,
    versionNode: process.version,
    memoria: process.memoryUsage,
    path: process.execPath,
    idProceso: process.pid,
    carpeta: process.cwd(),
  };

  res.send(`
  <h3>Argumentos de Entrada: ${info.argumentosEntrada}</h3>
  <h3>Nombre de la Plataforma: ${info.sistema}</h3>
  <h3>Version de NodeJs: ${info.versionNode}</h3>
  <h3>Memoria total reservada: ${info.memoria}</h3>
  <h3>Path de ejecucion: ${info.path} </h3>
  <h3>Process id: ${info.idProceso}</h3>
  <h3>Carpeta del Proyecto: ${info.carpeta}</h3>
  `);
});

module.exports = routerInfo;
