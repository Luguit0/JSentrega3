let carrito = [];
let cards = document.getElementById("cards");
let btnComprar = document.getElementById("btnComprar");

function ajustararticulos() {
    for (const producto of articulos) {
        cards.innerHTML += `
        <div class="card container-fluid col-sd-3">
        <img src=../images/${producto.imagen}.jpg class="card-img-top" alt=${producto.imagen}>
        <div class="card-body">
            <h3 class="card-text">${producto.nombre.toUpperCase()}</h3>
            <p class="card-text">$ ${producto.precio}</p>
            <button id='btn${producto.id}' class="btn btn-ligth">Comprar</button>
        </div>
        </div>
    `;
    }
    articulos.forEach((producto) => {
        document
            .getElementById(`btn${producto.id}`)
            .addEventListener("click", function () {
                agregarCarrito(producto);
            });
    });
}
ajustararticulos();

function agregarCarrito(productoComprar) {
    carrito.push(productoComprar);
    const jsonStorage = (clave, valor) => { localStorage.setItem(clave, valor) };
    jsonStorage(`listaArticulos`, JSON.stringify(productoComprar));
    console.log(jsonStorage)
    const storageJson = JSON.parse(localStorage.getItem(`listaArticulos`));
    console.log(storageJson);
    Swal.fire({
        imageUrl: `../images/${productoComprar.imagen}.jpg`,
        imageWidth: 250,
        imageHeight: 250,
        imageAlt: productoComprar.nombre,
        title: productoComprar.nombre.toUpperCase(),
        text: "Agregado a tu carro de compras!",
        width: 400,
        showConfirmButton: false,
        timer: 1750,
        background: `#f0e8e8`,
        //color: ``,
        showClass: {
            popup: "animate__animated animate__jackInTheBox",
        },
        hideClass: {
            popup: "animate__animated animate__zoomOutDown",
        },
    });
    document.getElementById("tBody").innerHTML += `
    <tr>
        <td>${productoComprar.nombre.toUpperCase()}</td>
        <td>${productoComprar.precio}</td>
        <td><button id='btn${productoComprar.id
        }' class="btn btn-ligth"><i class="fa-solid fa-trash-can"></i></button></td>
    </tr>
    `;
    let totalCarrito = carrito.reduce((acumulador, prod) => acumulador + prod.precio, 0);
    document.getElementById("totalPagar").innerText = `El total de tu compra es: $ ${totalCarrito * 1.21} con iva incluido`;
}

btnComprar.onclick = () => {
    carrito = [];
    document.getElementById("tBody").innerHTML = "";
    document.getElementById("totalPagar").innerText = "";
    localStorage.clear();
    sessionStorage.clear();
    console.clear();
    Swal.fire({
        imageAlt: btnComprar.nombre,
        title: `Gracias por tu compra!`,
        text: `En breve nos comunicaremos contigo`,
        width: 400,
        showConfirmButton: false,
        timer: 3000,
        background: `#f0e8e8`,
        ///color: ``,
        showClass: {
            popup: "animate__animated animate__flip",
        },
        hideClass: {
            popup: "animate__animated animate__fadeOutTopRight",
        },
    });
};
