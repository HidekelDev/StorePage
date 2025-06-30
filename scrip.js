const API_URL = 'https://fakestoreapi.com/products';

async function fetchProductos() {
  const res = await fetch(API_URL);
  return await res.json();
}

function crearProductoCard(producto) {
  const div = document.createElement('div');
  div.className = 'col-md-4 col-lg-3 mb-4';

  div.innerHTML = `
    <div class="card h-100 shadow producto" style="cursor:pointer;">
      <img src="${producto.image}" class="card-img-top" alt="${producto.title}">
      <div class="card-body d-flex flex-column justify-content-between">
        <h6 class="card-title">${producto.title}</h6>
        <p class="card-text text-success fw-bold">$${producto.price}</p>
      </div>
    </div>
  `;
  div.addEventListener('click', () => mostrarModal(producto));
  return div;
}

function mostrarModal(producto) {
  const modalBody = document.getElementById('detalle-producto');
  modalBody.innerHTML = `
    <img src="${producto.image}" class="img-fluid mb-3" style="max-height: 250px; object-fit: contain; display: block; margin: 0 auto;">
    <h5>${producto.title}</h5>
    <p><strong>Precio:</strong> $${producto.price}</p>
    <p>${producto.description}</p>
  `;

  const modal = new bootstrap.Modal(document.getElementById('productModal'));
  modal.show();
}

async function mostrarProductos() {
  const productos = await fetchProductos();

  // Todos
  const lista = document.getElementById('lista-productos');
  productos.forEach(p => lista.appendChild(crearProductoCard(p)));

  // Ofertas: productos 1, 4 y 7 (índices 0, 3, 6)
  const ofertas = [productos[0], productos[3], productos[6]];
  const zonaOfertas = document.getElementById('zona-ofertas');
  ofertas.forEach(p => zonaOfertas.appendChild(crearProductoCard(p)));

  // Carrusel aleatorio
  const carruselContainer = document.getElementById("carrusel-items");
  const aleatorios = productos.sort(() => 0.5 - Math.random()).slice(0, 3);

  aleatorios.forEach((producto, index) => {
    const item = document.createElement("div");
    item.className = `carousel-item ${index === 0 ? 'active' : ''}`;

    item.innerHTML = `
      <div class="d-flex flex-column align-items-center text-center">
        <img src="${producto.image}" class="d-block mb-3" style="max-height: 200px; object-fit: contain;">
        <h5 class="text-white">${producto.title}</h5>
        <button class="btn btn-light mt-2" onclick='mostrarModal(${JSON.stringify(producto).replace(/'/g, "\\'")})'>
          Ver detalles
        </button>
      </div>
    `;
    carruselContainer.appendChild(item);
  });

}
mostrarProductos();

alert("¡Bienvenid@ a Hidekel Collections! Navega por nuestros productos y aprovecha las ofertas especiales.");