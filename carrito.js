const Libros = document.getElementById('Libros')
const footer = document.getElementById('footer')
const templateFooter = document.getElementById('template-footer')
const templateCarrito = document.getElementById('template-carrito')



const createCarrito = () => {
    //console.log(carrito)
    Libros.innerHTML = ''
    Object.values(carrito).forEach(Libro =>{
        templateCarrito.querySelector('th').textContent = Libro.id,
        templateCarrito.querySelectorAll('td')[0].textContent = Libro.Titulo
        templateCarrito.querySelectorAll('td')[1].textContent = Libro.Agregar
        templateCarrito.querySelector('span').textContent = Libro.Agregar
        templateCarrito.querySelector('span').textContent = Libro.Agregar * Libro.Precio

    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
    })
    Libros.appendChild(fragment)
}
