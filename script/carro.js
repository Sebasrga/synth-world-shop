const productosEnCarrito = JSON.parse(localStorage.getItem("productos-carrito"));

const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoItems = document.querySelector("#carritoItems");
const contenedorCarritoMenuBottom = document.querySelector("#carritoMenuBottom");
const contenedorCarritoCompra = document.querySelector("#carritoCompra");
let botonTrash = document.querySelectorAll(".carritoItemEliminar");

// const contenedorCarritoVacioMensaje = document.querySelector("#carritoVacioMensaje"); //-----------------

function cargarProductosEnCarrito(){

if (productosEnCarrito) {



    contenedorCarritoVacio.classList.add("carritoInicio");
    contenedorCarritoItems.classList.remove("carritoInicio");
    contenedorCarritoMenuBottom.classList.remove("carritoInicio");
    contenedorCarritoCompra.classList.add("carritoInicio");

 // // contenedorCarritoVacioMensaje.classList.add("carritoInicio"); //----------------




    contenedorCarritoItems.innerHTML = "";


    productosEnCarrito.forEach(producto => {


        //<img class="itemImagen" src="./media/${producto.imagen}" alt="${producto.nombre}">

        const div = document.createElement("div");
        div.classList.add("carritoItem");
        div.innerHTML = `
                        <img class="carritoItemImagen" src="../media/${producto.imagen}" alt="${producto.nombre}">
                        <div class="carritoItemTitulo">
                            <small class="carritoItemSmall">Titulo</small>
                            <h3>${producto.nombre}</h3>
                        </div>
                        <div class="carritoItemCantidad">
                            <small class="carritoItemSmall">Cantidad</small>
                            <p>${producto.cantidad}</p>
                        </div>
                        <div class="carritoItemPrecio">
                            <small class="carritoItemSmall">Precio</small>
                            <p>${producto.precio}</p>
                        </div>
                        <div class="carritoItemSubtotal">
                            <small class="carritoItemSmall">Subtotal</small>
                            <p>${producto.precio * producto.cantidad}</p>
                        </div>
                        <button class="carritoItemEliminar" id="${producto.id}" ><img class="iconoTrashFormato" src="../icon/basura.png" alt=""></button>

`;

        contenedorCarritoItems.append(div);


    })



} else {
    contenedorCarritoVacio.classList.remove("carritoInicio");
    contenedorCarritoItems.classList.add("carritoInicio");
    contenedorCarritoMenuBottom.classList.add("carritoInicio");
    contenedorCarritoCompra.classList.add("carritoInicio");
// contenedorCarritoVacioMensaje.classList.remove("carritoInicio"); //-----------------
}


actualizandoBotonesEliminar();

}

cargarProductosEnCarrito()









function actualizandoBotonesEliminar() {
    botonTrash = document.querySelectorAll(".carritoItemEliminar");

    botonTrash.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e){
const idBoton = e.currentTarget.id;
// const itemEliminado = productosEnCarrito.find(producto => producto.id === idBoton); //Trae todo el objeto

const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)


console.log(productosEnCarrito);

productosEnCarrito.splice(index, 1);
console.log(productosEnCarrito);

cargarProductosEnCarrito()

}





// <p class="carritoVacio">No has seleccionado ningún item para ser feliz.</p>
// <div class="carritoItems carritoInicio">
// <div class="carritoMenuBottom carritoInicio"> ACCIONES DEL CARRITO
// <p class="carritoCompra carritoInicio" id="carritoCompra">Compra felizmente realizada con exito.</p>