const { Router } = require("express");
const usuario = require("../daos/daoUsuario.js");
const routerUsuario = Router();

routerUsuario.post("/signin", (req, res) => {
    const nuevoUsuario = req.body;
    if(nuevoUsuario.mail === "" || nuevoUsuario.password === ''){
        res.status(400).send({error:"Datos incompletos"})
    }else{
        await usuario.agregarItem(usuario)
        res.redirect('/login')
    }
});

module.exports = routerUsuario;
