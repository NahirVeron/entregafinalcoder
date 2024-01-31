
document.addEventListener('DOMContentLoaded', function () {
    const productosContainer = document.querySelector('.productos-container');
    const carritoBoton = document.querySelector('.carrito-botons');
    const contadorCarrito = document.querySelector('.contador');
    const vaciarCarritoBoton = document.querySelector('.vaciar-carrito'); // Agregamos la referencia al botón de vaciar carrito
    const carrito = [];

    

// Función para renderizar los productos
function renderizarProductos(productos) {
    productosContainer.innerHTML = '';

    productos.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.classList.add('producto');

        productoElement.innerHTML = `
            <img src="./imagenes/${producto.imagen}" alt="${producto.nombre}">
            <div class="producto-informacion">
                <h3 class="titulo">${producto.nombre}</h3>
                <p class="precio">$${producto.precio}</p>
            </div>
            <button class="agregar" data-id="${producto.id}">Agregar</button>
        `;

        productosContainer.appendChild(productoElement);
    });
}

// ... (código posterior)


    // Función para obtener productos desde el servidor (usando fetch)
    function obtenerProductos() {
        fetch('productos.json')  
            .then(response => response.json())
            .then(productos => {
                renderizarProductos(productos);
            })
            .catch(error => console.error('Error al obtener los productos:', error));
    }

    // Función para agregar productos al carrito
    function agregarAlCarrito(id) {
        const productoExistente = carrito.find(item => item.id === id);

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            const producto = {
                id,
                nombre,
                precio,
                cantidad,
            };

            carrito.push(producto);
        }

        actualizarCarrito();
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
        console.log('Carrito vaciado');
    }

    // Función para actualizar el carrito en el DOM y en Local Storage
    function actualizarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
        contadorCarrito.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    }

    // Evento clic en el botón "Agregar" de cada producto
    productosContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('agregar')) {
            const id = parseInt(event.target.dataset.id);
            agregarAlCarrito(id);
        }
    });

    // Evento clic en el botón del carrito
    carritoBoton.addEventListener('click', function () {
        // Aquí puedes redirigir a la página del carrito o abrir un modal con los productos del carrito
        console.log('Mostrar carrito');
    });

    // Evento clic en el botón "Vaciar Carrito"
    if (vaciarCarritoBoton) {
        vaciarCarritoBoton.addEventListener('click', function () {
            vaciarCarrito();
        });
    }

    // Inicialización: cargar productos y obtener el carrito desde Local Storage
    obtenerProductos();
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito.push(...JSON.parse(carritoGuardado));
        actualizarCarrito();
    }
});
