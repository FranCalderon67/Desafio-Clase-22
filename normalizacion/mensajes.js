// import { normalize, schema } from "normalizr";
const norm = require("normalizr");
// Definimos un esquema de autor
const schemaAuthor = new norm.schema.Entity("author", {}, { idAttribute: "email" });

// Definimos un esquema de mensaje
const schemaMensaje = new norm.schema.Entity("post", { author: schemaAuthor }, { idAttribute: "id" });

// Definimos un esquema de posts
const schemaMensajes = new norm.schema.Entity("posts", { mensajes: [schemaMensaje] }, { idAttribute: "id" });

const normalizarMensajes = (mensajesConId) => norm.normalize({ id: "mensajes", mensajes: mensajesConId }, schemaMensajes);

module.exports = { normalizarMensajes };
