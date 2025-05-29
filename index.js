import axios from 'axios';

const args = process.argv.slice(2); // Corta los primeros elementos

const [metodo, producto] = args; //Crea dos variables a partir del array args (ej: [delete, producto/1])

const IDproducto = parseInt(producto.split('/')[1]); //Crea una variable con el nro del producto

let url = `https://fakestoreapi.com/products`;


async function peticion() {

    try {
        let response;
        let data;
        switch (metodo) {
            case "GET":
                response = await axios.get(url);
                data = response.data;
                mostrar_productos(data);
                break;
            case "POST":
                const nuevoProducto = crear_producto();
                response = await axios.post(url, nuevoProducto);
                data = response.data;
                console.log(data)
                break;
            case "DELETE":
                response = await axios.delete(`${url}/${IDproducto}`);
                eliminar_producto();
                break;
            default:
                console.log("Ingreso un metodo desconocido.");

        };
    } catch (error) {
        console.error("Error", error.message);
    };
};

function mostrar_productos(data) {
    if (IDproducto < data.length) {
        console.log(data.find((element) => element.id === IDproducto));
    } else if (isNaN(IDproducto)) {
        console.log(data);
    } else {
        console.log("te fuiste");
    };
};

function eliminar_producto() {
    console.log(`El producto nro: ${IDproducto} se ha eliminado.`)
};

function crear_producto() {
    let [nombre, precio, categoria] = args.slice(2);
    let nuevo = { title: nombre, price: precio, category: categoria };
    return nuevo;
};


peticion();