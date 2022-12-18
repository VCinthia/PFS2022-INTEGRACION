import { ciudadServices } from "./ciudad.api";
import { CiudadController } from "./ciudad.controller";

const crearNuevaLinea = (id , nombre) => {
    const linea = document.createElement("div");
    const contenido = `
    <div class="populares__card">
        <img class="populares__card___imagen" src="../../img/ciudades.jpg"></img>
        <div class="populares__card___base">
            <div class="populares__card___header">
                <div class="populares__principal ">

                    <!--BOTON ELIMINAR-->
                        <button class="populares__boton btn-delete" type="button" id="${id}">                             
                        <i class="populares__icon fas fa-trash-alt"></i>

                    <!--BOTON EDITAR-->                
                        </button>                        
                            <a class="populares__boton btn__edit populares__boton btn__edit" type="submit" href="../editarProducto.html?id=${id}">                                           
                            <i class="populares__icon fas fa-edit"  >
                            </i>            
                            </a>                                            
                        </button>
                </div> 
                <h5 class="populares__card___titulo">${nombre}</h5>
            </div>
        </div>
    </div>`
    ;

    linea.innerHTML = contenido;//transforma la const linea en html con su contenido
    const btn = linea.querySelector('button');
    btn.addEventListener('click',() => {
        const id = btn.id;
        ciudadServices
            .eliminarCiudad(id)
            .then((respuesta) => {
                console.log(respuesta);
            })
            .catch((err) => alert("Ocurrió un error en la eliminación"));
    });

   
    return linea;//lo devuelve para que se muestre
}

const table = document.querySelector('[data-card]')//llama a traves a colocar en la clase 'data-table' la constante 'table'-> es importante las [ ]

ciudadServices
    .listaCiudades()
    .then((data) => {
        data.forEach(({nombre, id}) => {// ver en Notion JS CRUD captura de otra manera de hacerlo
            const nuevaLinea = crearNuevaLinea(nombre, id);
            table.appendChild(nuevaLinea);
        });
    })
    .catch((error) => alert("Ocurrio un error en ciudadServices"));