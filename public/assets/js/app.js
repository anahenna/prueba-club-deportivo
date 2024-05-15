
const formAddDeporte = document.querySelector('#form-add-deporte')
const inputNombre = document.querySelector('#input-nombre')
const inputPrecio = document.querySelector('#input-precio')
const deporteList = document.querySelector('#deporte-list')
const formUpdateDeporte = document.querySelector('#form-update-deporte')
const inputUpdateDeporte = document.querySelector('#input-update-deporte')
const inputUpdatePrecio = document.querySelector('#input-update-precio')
let idUpdate;

formAddDeporte.addEventListener('submit', async (event) => {
    event.preventDefault()
    const nombre = inputNombre.value
    const precio = inputPrecio.value

    const res = await fetch(`/deportes/create?nombre=${nombre}&precio=${precio}`)
    const data = await res.json()
    console.log(data)
    getDeportes()

    inputNombre.value = '';
    inputPrecio.value = '';
})

const getDeportes = async () => {
    const res = await fetch('/deportes')
    const data = await res.json()

    deporteList.innerHTML = ''
    data.forEach(item => {
        deporteList.innerHTML += `
        <li class="my-3 fs-5 align-middle" >
        ◽ ${item.nombre} - $${item.precio}
        <button onclick="deleteDeporte('${item.id}')" class="btn btn-danger ms-2">Eliminar</button>
        <button onclick="formUpdate('${item.id}', '${item.nombre}', '${item.precio}')" class="btn btn-info">Actualizar</button>
        </li>
        `
    })
}
getDeportes()

const deleteDeporte = async (id) => {
    const res = await fetch(`/deportes/delete/${id}`)
    const data = await res.json()
    console.log(data)
    getDeportes()
}

const formUpdate = (id, nombre, precio) => {
    inputUpdateDeporte.value = nombre;
    inputUpdatePrecio.value = precio;
    idUpdate = id;
};

formUpdateDeporte.addEventListener('submit', async (event) => {
    event.preventDefault();
    const nombre = inputUpdateDeporte.value;
    const precio = inputUpdatePrecio.value;
    const res = await fetch(`/deportes/update/${idUpdate}?nombre=${nombre}&precio=${precio}`);
    const data = await res.json();
    console.log(data);
    getDeportes();

    inputUpdateDeporte.value = '';
    inputUpdatePrecio.value = '';
});