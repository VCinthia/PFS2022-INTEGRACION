const listaCiudades = () => 
    fetch('http://localhost:3000/ciudad').then((respuesta) => respuesta.json());

const eliminarCiudad = (id) => {
    console.log('Eliminar a ->', id);
    return fetch(`http://localhost:3000/ciudad/${id}`, {
        method: 'DELETE',
    })
}

export const ciudadServices = {
    listaCiudades,
    eliminarCiudad,
};
