let productosEnCarrito = localStorage.getItem("productos-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);
const contenedorCarritoVacio = document.querySelector("#carritoVacio");
const contenedorCarritoItems = document.querySelector("#carritoItems");
const contenedorCarritoMenuBottom = document.querySelector("#carritoMenuBottom");
const contenedorCarritoCompra = document.querySelector("#carritoCompra");
let botonTrash = document.querySelectorAll(".carritoItemEliminar");
const botonVaciarCarrito = document.querySelector("#carritoMenuBottomVaciar");
const totalDeLaCompra = document.querySelector("#totalCompra");
const botonComprar = document.querySelector("#carritoMenuBottomFinalizar")

// const contenedorCarritoVacioMensaje = document.querySelector("#carritoVacioMensaje"); //-----------------

function cargarProductosEnCarrito() {



    if (productosEnCarrito && productosEnCarrito.length > 0) { //&& productosEnCarrito.lenght > 0






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
    actualizarTotales()

}

cargarProductosEnCarrito()









function actualizandoBotonesEliminar() {
    botonTrash = document.querySelectorAll(".carritoItemEliminar");

    botonTrash.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {


    //----------TOSTIFY

    Toastify({
        text: "Atencion! El item fue eliminado",
        duration: 2000,
        //destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        avatar: "../icon/exclamacion.png",
        style: {
            fontSize: "1.5rem",
            color: " #ebf306",
            background: "linear-gradient(to right, #fe9f9f, #a10101)",
        },
        onClick: function () { } // Callback after click
    }).showToast();




    // -----------------




    const idBoton = e.currentTarget.id;
    // const itemEliminado = productosEnCarrito.find(producto => producto.id === idBoton); //Trae todo el objeto

    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton)




    productosEnCarrito.splice(index, 1);

    cargarProductosEnCarrito()


    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
    // localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));

}



// -------------------- vaciar carrito

botonVaciarCarrito.addEventListener("click", vaciarCarrito);




function vaciarCarrito() {

    // SWEET ALERT ----- VACIAR CARRITO

    Swal.fire({
        title: "Atencion!!",
        text: "Estas seguro que quieres vaciar el carrito?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#eabdfd",
        confirmButtonText: "Si, quiero vaciar el carrito"
    }).then((result) => {
        if (result.isConfirmed) {

            productosEnCarrito.length = 0;
            localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosEnCarrito()


            Swal.fire({
                title: "El carrito fue vaciado",
                text: "Selecciona nuevamente algún item de la tienda",
                icon: "success"
            });
        }
    });


    // sweet alert fin--------------------------



    // productosEnCarrito.length = 0;
    // localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));
    // cargarProductosEnCarrito()
}

function actualizarTotales() {
    totalCompra.innerText = "$" + productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    //totalCompra.innerText = productosEnCarrito.reduce((acc, producto)=> acc + (producto.precio * producto.cantidad), 0);
}


// --------------------- comprar carrito


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("carritoInicio");
    contenedorCarritoItems.classList.add("carritoInicio");
    contenedorCarritoMenuBottom.classList.add("carritoInicio");
    contenedorCarritoCompra.classList.remove("carritoInicio");
    // contenedorCarritoVacioMensaje.classList.remove("carritoInicio"); //-----------------


Swal.fire({
  title: "Compra exitosa!",
  text: "Muchas gracias por tu compra, recibirás un correo de confirmación.",
  icon: "success"
});


}



// <p class="carritoVacio">No has seleccionado ningún item para ser feliz.</p>
// <div class="carritoItems carritoInicio">
// <div class="carritoMenuBottom carritoInicio"> ACCIONES DEL CARRITO
// <p class="carritoCompra carritoInicio" id="carritoCompra">Compra felizmente realizada con exito.</p>