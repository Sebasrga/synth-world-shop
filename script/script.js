let productos = [];

fetch("./data/dbase.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos); //--------------------------------SE CARGAN LOS PRODUCTOS A LA GRILLA
    })

let usuarioLS = localStorage.getItem("usuario-ls");

const contenedorDeProductos = document.querySelector("#contenedorDeProductos");
const botonesMenu = document.querySelectorAll(".botonMenu");
const elTituloMain = document.querySelector("#tituloMain");
let botonesAgregarItem = document.querySelectorAll(".itemAgregar");
const cantidadItemsAgregados = document.querySelector("#cantidadItemsAgregados");
const login = document.querySelector("#login");
const logout = document.querySelector("#logout");

function cargarProductos(seleccionDeProductos) {
    contenedorDeProductos.innerHTML = "";
    seleccionDeProductos.forEach(producto => {
        const contenedorDiv = document.createElement("div");
        contenedorDiv.classList.add("item")
        contenedorDiv.innerHTML = `

        <img class="itemImagen" src="./media/${producto.imagen}" alt="${producto.nombre}">
        <p class="itemInfo">${producto.descripcion}</p>
        <div class="itemSubMenu">
            <h3 class="itemTitulo">${producto.nombre}</h3>
            <p class="itemPrecio">$${producto.precio}</p>
            <button class="itemAgregar" id="${producto.id}">Agregar</button>
        </div>
`
        contenedorDeProductos.append(contenedorDiv);
    });
    actualizandoBotonesAgregarItem()
};

botonesMenu.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesMenu.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id !== "todosLosProductos") {
            const botonMenuFiltro = productos.filter(producto => producto.categoria === e.currentTarget.id);
            cargarProductos(botonMenuFiltro);
            const laCategoria = productos.find(producto => producto.categoria === e.currentTarget.id);
            elTituloMain.innerText = laCategoria.categoria;
        } else {
            cargarProductos(productos);
            elTituloMain.innerText = "Todos los productos disponibles!"
        }
    })
})

function actualizandoBotonesAgregarItem() {
    botonesAgregarItem = document.querySelectorAll(".itemAgregar");

    botonesAgregarItem.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-carrito");

if (productosEnCarritoLS) {

    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarCantidadItemsAgregados();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {

    //----------TOSTIFY
    Toastify({
        text: "Agregado!",
        duration: 1000,
        newWindow: true,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        avatar: "./icon/destellos.png",
        style: {
            fontSize: "1.5rem",
            color: " #d6f8dd",
            background: "linear-gradient(to right, #01a001, #285500)",
        },
        onClick: function () { } // Callback after click
    }).showToast();
    // -----------------

    const idBotonAgregar = e.currentTarget.id;
    const productoAgregadoAlCarrito = productos.find(producto => producto.id === idBotonAgregar); //trae todo el objeto

    if (productosEnCarrito.some(producto => producto.id === idBotonAgregar)) { //verifico si ya existe
        const indiceProductoEnCarrito = productosEnCarrito.findIndex(producto => producto.id === idBotonAgregar)
        productosEnCarrito[indiceProductoEnCarrito].cantidad++;
    } else {
        productoAgregadoAlCarrito.cantidad = 1;
        productosEnCarrito.push(productoAgregadoAlCarrito);
    }

    actualizarCantidadItemsAgregados(); //Actualizacion de cantidad en carrito
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarCantidadItemsAgregados() {
    let cantidadItemsAgregadosUpdate = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    cantidadItemsAgregados.innerText = cantidadItemsAgregadosUpdate;
}


//    if (usuarioLS > 0) {
//      login.innerText = "hay usuario"
//    } else{
//     login.innerText = "no hay usuario"
//    }

