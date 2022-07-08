const socket = io();

const enviarMensaje = () => {
  const usuario = document.getElementById("autor").value;
  const texto = document.getElementById("text").value;
  const hora = String(new Date().toDateString() + " " + new Date().toLocaleTimeString());
  const mensaje = { usuario, texto, hora };
  socket.emit("new_message", mensaje);
  // Si no hacemos return false el formulario va a querer hacer un post a '/' y no queremos que lo haga
  return false;
};

const crearEtiquetasMensaje = (mensaje) => {
  const { usuario, texto, hora } = mensaje;
  return `
    <div>
    <p style='color:brown'>${hora}</p>
        <strong style='color:blue'><span>${usuario}:</span></strong>
        <i style='color:green'>${texto}</i>
    </div>
    `;
};

const agregarMensajes = (mensajes) => {
  if (mensajes !== "") {
    const mensajesFinal = mensajes.map((mensaje) => crearEtiquetasMensaje(mensaje)).join(" ");
    document.getElementById("messages").innerHTML = mensajesFinal;
  }
};

socket.on("messages", (messages) => agregarMensajes(messages));

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
    console.log(document.getElementById("productos"));
    document.getElementById("productos").innerHTML = productoFinal;
  } else {
    document.getElementById("productos").innerHTML = "<h2>No hay productos</h2>";
  }
};

socket.on("products", (products) => agregarProducto(products));
