const productos = [
    {
        id: "acc001",
        nombre: "Cable de Clock externo",
        descripcion: "Descripcion: Cable de Clock externo",
        categoria: "Accesorios",
        precio: 500,
        imagen: "../media/acc001-cableclock.png",
    },
    {
        id: "acc002",
        nombre: "Cable MIDI 5 pines",
        descripcion: "Descripcion: Cable MIDI 5 pines",
        categoria: "Accesorios",
        precio: 1500,
        imagen: "../media/acc002-cablemidi.png",
    },
    {
        id: "acc003",
        nombre: "Cable RCA a mimiplug 3.5mm",
        descripcion: "Descripcion: Cable RCA a mimiplug 3.5mm",
        categoria: "Accesorios",
        precio: 1000,
        imagen: "../media/acc003-cablercaplug.png",
    },
    {
        id: "acc004",
        nombre: "Cable RCA 2m",
        descripcion: "Descripcion: Cable RCA 2m",
        categoria: "Accesorios",
        precio: 900,
        imagen: "../media/acc004-cablercarca.jpg",
    },
    {
        id: "acc005",
        nombre: "Cable plug 2.5 no balanceado",
        descripcion: "Descripcion: Cable plug 2.5 no balanceado",
        categoria: "Accesorios",
        precio: 300,
        imagen: "../media/acc005-cabletrs.png",
    },



    {
        id: "drm001",
        nombre: "Novation Circuit Rhythm",
        descripcion: "Descripcion: Novation Circuit Rhythm Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo est culpa venia similique quae earum inventore distinctio nemo dicta fuga, id dolorem, reprehenderit a harum suscipit itaque natus vitae expedita.",
        categoria: "DrumMachines",
        precio: 8000,
        imagen: "../media/drm001-circuit.png",
    },
    {
        id: "drm002",
        nombre: "Roland SH4D",
        descripcion: "Descripcion: Roland SH4D",
        categoria: "DrumMachines",
        precio: 10000,
        imagen: "../media/drm002-sh4d.png",
    },
    {
        id: "drm003",
        nombre: "Roland TR-8S",
        descripcion: "Descripcion: Roland TR-8S",
        categoria: "DrumMachines",
        precio: 15000,
        imagen: "../media/drm003-tr8s.png",
    },





    {
        id: "sft001",
        nombre: "Ableton Live 12",
        descripcion: "Descripcion: Ableton Live 12",
        categoria: "Software",
        precio: 2500,
        imagen: "../media/sft001-ableton.png",
    },
    {
        id: "sft002",
        nombre: "Imageline FL Studio 13",
        descripcion: "Descripcion: Imageline FL Studio 13",
        categoria: "Software",
        precio: 2400,
        imagen: "../media/sft002-flstudio.png",
    },
    {
        id: "sft003",
        nombre: "Valhalla Supermasive",
        descripcion: "Descripcion: Valhalla Supermasive",
        categoria: "Software",
        precio: 2000,
        imagen: "../media/sft003-valhalla.png",
    },
    {
        id: "sft004",
        nombre: "Roland Zenology ALL INCLUSIVE",
        descripcion: "Descripcion: Roland Zenology ALL INCLUSIVE",
        categoria: "Software",
        precio: 2600,
        imagen: "../media/sft004-zenology.png",
    },



    {
        id: "syn001",
        nombre: "Roland JX-08",
        descripcion: "Descripcion: Roland JX-08",
        categoria: "Sinterizador",
        precio: 2500,
        imagen: "../media/syn001-jx08.png",
    },
    {
        id: "syn002",
        nombre: "Arturia Minifreak",
        descripcion: "Descripcion: Arturia Minifreak",
        categoria: "Sinterizador",
        precio: 3000,
        imagen: "../media/syn002-minifreak.png",
    },
    {
        id: "syn003",
        nombre: "Behringer ProVS mini",
        descripcion: "Descripcion: Behringer ProVS mini",
        categoria: "Sinterizador",
        precio: 1500,
        imagen: "../media/syn003-provsmini.png",
    },
    {
        id: "syn004",
        nombre: "Korg Wavestate MKII",
        descripcion: "Descripcion: Korg Wavestate MKII",
        categoria: "Sinterizador",
        precio: 3500,
        imagen: "../media/syn004-wavestate.png",
    },

];

//console.log(productos.find((producto) => producto.id === "syn001"));
const contenedorDeProductos = document.querySelector("#contenedorDeProductos");
const botonesMenu = document.querySelectorAll(".botonMenu");
const elTituloMain = document.querySelector("#tituloMain");

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
           <button class="itemAgregar" id="${producto.categoria}">Agregar</button>
        </div>
        
`
        contenedorDeProductos.append(contenedorDiv);
    });
};

cargarProductos(productos); //--------------------------------SE CARGAN LOS PRODUCTOS A LA GRILLA


// console.log(botonesMenu);



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



/*<div class="item"> <!------------------PRODUCTO-->
                    <img class="itemImagen" src="./media/drm001-circuit.png" alt="">
                    <p class="itemInfo">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo est culpa veniam
                        similique quae earum inventore distinctio nemo dicta fuga, id dolorem, reprehenderit a harum
                        suscipit itaque natus vitae expedita.</p>
                    <div class="itemSubMenu">
                        <h3 class="itemTitulo">Arturia Minifreak</h3>
                        <p class="itemPrecio">1000</p>
                        <button class="itemAgregar">Agregar</button>
                    </div>
                </div><!-------------------------------FIN PRODUCTO-->*/