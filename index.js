const itemsList = document.getElementById('itemsList')
const Libros = document.getElementById('Libros')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment();

let carrito = {}


document.addEventListener('DOMContentLoaded', ()=>{
    fetchData()
    // if (localStorage.getItem('carrito')) {
    //     carrito = JSON.parse(localStorage.getItem('carrito'))
    //     createCarrito()
    // }
})

document.addEventListener('click', e =>{
    addCarrito(e)
 })

const fetchData = async() =>{
    try {
        const res = await fetch('index.json')
        const data = await res.json()
        // console.log(data)
        createCards(data)
    } catch (error) {
        console.log(error)
    }
}

const createCards = data =>{
    data.forEach(Libro => {
        templateCard.querySelector('img').setAttribute("src", Libro.imgUrl)
        templateCard.querySelector('h5').textContent = Libro.Titulo
        templateCard.querySelector('.card-cantidad').textContent = Libro.CantidadDisponible
        templateCard.querySelector('.card-precio').textContent = Libro.Precio
        templateCard.querySelector('.card-carrito').textContent = Libro.Agregar
        templateCard.querySelector('.button').dataset.id = Libro.id
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    itemsList.appendChild(fragment)
}

const addCarrito = e =>{
    //  console.log(e.target)
    //  console.log(e.target.classList.contains('button'))
     if (e.target.classList.contains('button')) {      
     setCarrito(e.target.parentElement)
     }
    e.stopPropagation();
}

const setCarrito = objeto =>{
    //  console.log(objeto)
        const Libro = {
         id: objeto.querySelector('.button').dataset.id,
         Titulo: objeto.querySelector('h5').textContent,
         Precio: objeto.querySelector('.card-precio').textContent, 
         Agregar: parseInt(objeto.querySelector('input[name="AgregarCarrito"]').value)
     } 

      if (carrito.hasOwnProperty(Libro.id)) {
          Libro.Agregar = carrito[Libro.id].Agregar + Libro.Agregar
      }

      carrito[Libro.id] = {...Libro}
      createCarrito()
}


const createCarrito = () => {
    //console.log(carrito)
    Libros.innerHTML = ''
    Object.values(carrito).forEach(Libro =>{
        templateCarrito.querySelector('th').textContent = Libro.id, //Id libro
        templateCarrito.querySelectorAll('td')[0].textContent = Libro.Titulo //Titulo Libro
        templateCarrito.querySelectorAll('td')[1].textContent = Libro.Agregar // Cantidad
        templateCarrito.querySelector('.td2').textContent = Libro.Precio   
        templateCarrito.querySelector('span').textContent = Libro.Agregar   
        templateCarrito.querySelector('span').textContent = Libro.Agregar * Libro.Precio

    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
    })
    Libros.appendChild(fragment)

    createFooter()

    // localStorage.setItem('carrito', JSON.stringify(carrito))
}

const createFooter = () =>{
    footer.innerHTML = ''
    if(Object.keys(carrito).length === 0)
    {
        footer.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    const nPrecio = Object.values(carrito).reduce((acc,{Agregar, Precio}) => acc + Agregar * Precio,0)
    
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(templateFooter)
    footer.appendChild(fragment)

    const bntCancelar = document.getElementById('Cancelar-compra')
    bntCancelar.addEventListener('click', () => {
        carrito = {}
        createCarrito()
    })

            }

