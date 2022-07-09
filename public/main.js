const socket = io();

// const usuario = document.getElementById("user").value;

// const texto = document.getElementById("text").value;
// const formMensaje = document.getElementById("formularioMensaje");

// const enviarMensaje = () => {
//   const nombre = document.getElementById("name").value;
//   const apellido = document.getElementById("lastName").value;
//   const edad = document.getElementById("age").value;
//   const alias = document.getElementById("alias");
//   const avatar = document.getElementById("avatar").value;

//   const mensaje = {
//     autor: {
//       email: usuario,
//       nombre: nombre,
//       apellido: apellido,
//       edad: edad,
//       alias: alias,
//       avatar: avatar,
//     },
//     texto: texto,
//   };
//   formMensaje.reset();
//   socket.emit("new_message", mensaje);
//   // Si no hacemos return false el formulario va a querer hacer un post a '/' y no queremos que lo haga
//   return false;
// };

// const crearEtiquetasMensaje = (mensaje) => {
//   const { usuario, texto, hora } = mensaje;
//   return `
//     <div>
//     <p style='color:brown'>${hora}</p>
//         <strong style='color:blue'><span>${usuario}:</span></strong>
//         <i style='color:green'>${texto}</i>
//     </div>
//     `;
// };

// const agregarMensajes = (mensajes) => {
//   if (mensajes !== "") {
//     const mensajesFinal = mensajes.map((mensaje) => crearEtiquetasMensaje(mensaje)).join(" ");
//     document.getElementById("messages").innerHTML = mensajesFinal;
//   }
// };

// socket.on("messages", (messages) => agregarMensajes(messages));

// MENSAJES

/* --------------------- DESNORMALIZACIÓN DE MENSAJES ---------------------------- */
// Definimos un esquema de autor
const schemaAuthor = new normalizr.schema.Entity("author", {}, { idAttribute: "id" });

// Definimos un esquema de mensaje
const schemaMensaje = new normalizr.schema.Entity("post", { author: schemaAuthor }, { idAttribute: "_id" });

// Definimos un esquema de posts
const schemaMensajes = new normalizr.schema.Entity("posts", { mensajes: [schemaMensaje] }, { idAttribute: "id" });
/* ----------------------------------------------------------------------------- */

const inputUsername = document.getElementById("username");
const inputMensaje = document.getElementById("text");
const btnEnviar = document.getElementById("btnEnviar");

const enviarMensaje = document.getElementById("formularioMensaje");
enviarMensaje.addEventListener("submit", (e) => {
  e.preventDefault();

  const mensaje = {
    author: {
      email: inputUsername.value,
      nombre: document.getElementById("firstname").value,
      apellido: document.getElementById("lastname").value,
      edad: document.getElementById("age").value,
      alias: document.getElementById("alias").value,
      avatar: document.getElementById("avatar").value,
    },
    text: inputMensaje.value,
  };

  socket.emit("new_message", mensaje);
  enviarMensaje.reset();
  inputMensaje.focus();
});

function crearEtiquetaMensaje(mensajes) {
  return mensajes
    .map((mensaje) => {
      return `
        <div>
             <b style="color:blue;">${mensaje.author.email}</b>
            <span style="color:brown;">${mensaje.fyh}</span> :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt="AVATAR">
        </div>
    `;
    })
    .join(" ");
}

socket.on("messages", (mensajesN) => {
  const mensajesNormSize = JSON.stringify(mensajesN).length;
  console.log(mensajesN, mensajesNormSize);

  const mensajesD = normalizr.denormalize(mensajesN.result, schemaMensajes, mensajesN.entities);
  console.log(mensajesD.id);
  console.log(mensajesD.mensajes);
  const mensajesDsize = JSON.stringify(mensajesD).length;
  console.log(mensajesD, mensajesDsize);

  const porcentajeC = parseInt((mensajesNormSize * 100) / mensajesDsize);
  console.log(`Porcentaje de compresión ${porcentajeC}%`);
  document.getElementById("compresion-info").innerText = porcentajeC;

  const html = crearEtiquetaMensaje(mensajesD.mensajes);
  document.getElementById("mensajes").innerHTML = html;
});

inputUsername.addEventListener("input", () => {
  const hayEmail = inputUsername.value.length;
  const hayTexto = inputMensaje.value.length;
  inputMensaje.disabled = !hayEmail;
  btnEnviar.disabled = !hayEmail || !hayTexto;
});

inputMensaje.addEventListener("input", () => {
  const hayTexto = inputMensaje.value.length;
  btnEnviar.disabled = !hayTexto;
});

//Productos
const enviarProducto = (e) => {
  let name = document.getElementById("nombreProducto").value;
  let price = document.getElementById("precioProducto").value;
  let image = document.getElementById("imagenProducto").value;
  const producto = { name, price, image };
  name = "";
  price = "";
  image = "";
  socket.emit("new_products", producto);
  return false;
};

const crearEtiquetasProductos = (producto) => {
  const { name, image, price } = producto;
  return `
  <div>
  <div class="card" style="width: 18rem;">
    <img src=${image} class="card-img-top" alt="IMAGEN" />
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">Precio ${price}</p>
    </div>
  </div>
</div>`;
};

const agregarProducto = (producto) => {
  if (producto !== "") {
    const productoFinal = producto.map((producto) => crearEtiquetasProductos(producto)).join("<br>");

    document.getElementById("productos").innerHTML = productoFinal;
  } else {
    document.getElementById("productos").innerHTML = "<h2>No hay productos</h2>";
  }
};

socket.on("products", (products) => agregarProducto(products));
