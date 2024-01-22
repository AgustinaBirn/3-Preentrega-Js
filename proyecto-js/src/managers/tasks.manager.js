import { createProduct } from "../models/stock.model.js";
import htmlElements from "../elements/html.elements.js";
import { createButton } from "../elements/button.elements.js";
import { createCounterButton } from "../elements/button.elements.js";

let stock = JSON.parse(localStorage.getItem("stock")) || [];

const showStock = (stock) => {
    // elimino los elementos del contenedor
    htmlElements.productContainer.innerHTML = "";
    console.log(stock);
    
    // recorrer el array stock y por cada elemento(producto) crea una tarjeta c/ sus elementos html
    stock.forEach( product => {
        // crear la tarjeta con un div en el documento html
        let card = document.createElement("div");
        // agregar una clase con sus estilos
        card.className = "d-flex mt-3 justify-content-between align-items-center border border-2 rounden-2 p-3";
        // agregar linea html para el texto de cada tarjeta (productos)
        // agregar estilos css para las clases
        card.innerHTML = `<p class= " ${product.state ? "text-decoration-line-through"  : "align-self-end" }">${product.name}  <br>Talle: ${product.tall} <br>Unidades: ${product.units}</p>`;
    
        product.units =  0;
        // contenedor botones
        let buttonContainer = document.createElement("div");
        
        // crear boton (+)
        let adderButton = createCounterButton("+", "id", "add");
        adderButton.onclick = () => {
            product.units++;
            counter.innerText = product.units;
            localStorage.setItem("stock", JSON.stringify(stock));
        }

        buttonContainer.appendChild(adderButton);

        // crear contador de unidades del mismo producto
        let counter = document.createElement("strong");
        counter.setAttribute("id", "counter");
        counter.innerText =  product.units;

        buttonContainer.appendChild(counter);

        // crear boton (-)
        let subtractButton = createCounterButton("-", "id", "subtract");;
        subtractButton.onclick = () => {
            if(product.units == 0){
                return product.units == 0
            } else{
                product.units--
            }
            counter.innerText = product.units;
            localStorage.setItem("stock", JSON.stringify(stock));
        }

        buttonContainer.appendChild(subtractButton);


        // boton modificar
        let btnEdit = createButton(`${product.state ? "Guardar" : "Editar"}`,  "btn", `${product.state ? "btn-success" : "btn-warning"}`, "ms-2");
        
        // evento del boton modificar
        btnEdit.onclick = () => {
            changeStateProduct(product.id);
        }
        // agregar botones a contenedor
        buttonContainer.appendChild(btnEdit);

        // boton eliminar
        let btnDelete = createButton("Eliminar", "btn", "btn-danger", "ms-2");
        
        // evento del boton eliminar
        btnDelete.onclick = () => deleteProduct(product.id);
        
        // agregar botones a contenedor
        buttonContainer.appendChild(btnDelete);
        
        
        // agregar contenedor a tarjetas
        card.appendChild(buttonContainer);

        // agregar tarjetas al contenedor de los productos
        htmlElements.productContainer.appendChild(card);
    });
}


const addProduct = (event) => {
    // crear nuevo producto segun los datos/valor ingresados en el formulario
    let newProduct = createProduct(htmlElements.inputStock.value, htmlElements.inputTallStock.value); 
    
    // agregar nuevo producto al array stock
    stock.push(newProduct);
    
    // vincular/agregar el stock al localStorage
    localStorage.setItem("stock", JSON.stringify(stock));
    console.log(stock);

    // llamar la funcion showStock para mostrar en pantalla todos los productos
    showStock(stock);
}


const changeStateProduct = (idProduct) => {
    // buscar la posición índice del producto dentro del array stock
    let index = stock.findIndex(product => product.id === idProduct);

    // modificar valor booleano de state de false a true y a la inversa
    stock[index].state = !stock[index].state;

    // actualizar state en localStorage con el array actualizado
    localStorage.setItem("stock", JSON.stringify(stock));

    console.log(stock[index].state);
    showStock(stock);
}



const deleteProduct = (idProduct) => {
    // filtrar todo el stock con los productos que no coincidan con el id, para descartar el producto que SI coincide
    // genera nuevo array de productos
    stock = stock.filter( product => product.id != idProduct);

    // guardar el nuevo array de stock en el localStorage para que al actualizar la app mantenga productos del nuevo array
    localStorage.setItem("stock", JSON.stringify(stock));
    
    // mostrar nuevo array stock
    showStock(stock);
}

const filterProducts = (nameProduct) => {
    if(nameProduct === "pantalon") {
        let filteredProducts = stock.filter(product => product.name === nameProduct)
        showStock(filteredProducts);
    } else if (nameProduct === "remera") {
        let filteredProducts = stock.filter(product => product.name === nameProduct)
        showStock(filteredProducts);
    } else if (nameProduct === "vestido") {
        let filteredProducts = stock.filter(product => product.name === nameProduct)
        showStock(filteredProducts);
    } else {
        showStock(stock);
    }
}

export default {
    stock,
    showStock,
    addProduct,
    changeStateProduct,
    deleteProduct,
    filterProducts
}