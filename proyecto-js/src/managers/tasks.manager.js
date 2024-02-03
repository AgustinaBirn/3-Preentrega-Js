
import { createProduct } from "../models/stock.model.js";
import { createButton } from "../elements/button.elements.js";
import { createCounterButton } from "../elements/button.elements.js";
import stockApi from "../api/stock.api.js";
import Swal from "sweetalert2";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

let filteredProducts;

const showStock = async (productContainer) => {
    // elimino los elementos del contenedor
    productContainer.innerHTML = "";

    let stockDB = await stockApi.getStock();
    let stock = filteredProducts || stockDB;

    console.log(stock);
    
    
    // recorrer el array stock y por cada elemento(producto) crea una tarjeta c/ sus elementos html
    stock.forEach( product => {
        // crear tarjeta con un div en el documento html
        let card = document.createElement("div");

        // agregar una clase con sus estilos
        card.className = "d-flex mt-3 justify-content-between align-items-center border border-2 rounden-2 p-3";
       
        // agregar estilos css para las clases

        card.innerHTML = `<p class= "align-self-end" >${product.name}  <br>Talle: ${product.tall} <br>Unidades: ${product.units}</p>`;
        
        // contenedor botones
        let buttonContainer = document.createElement("div");

        // boton edit
        let btnEdit = createButton( "Editar",  "btn",  "btn-warning", "ms-2");
        
        // evento del boton edit
        btnEdit.onclick = async () => {
                    
            buttonContainer.innerHTML="";

            // crear boton (+)
            let adderButton = createCounterButton("+", "id", "add");
            adderButton.onclick = async () => {
                // await stockApi.getUnitsStock(product.id,product.units)
                product.units++;
                counter.innerText = product.units;
                await stockApi.updateUnitsStock( product.id, product, product.units);
            }
            
            buttonContainer.appendChild(adderButton);
            
            // crear contador de unidades del producto
            let counter = document.createElement("strong");
            counter.setAttribute("id", "counter");
            counter.innerText =  product.units || 0;
            
            buttonContainer.appendChild(counter);
            
            // crear boton (-)
            let subtractButton = createCounterButton("-", "id", "subtract");
            subtractButton.onclick = async () => {
                if(product.units == 0){
                    return product.unitst == 0
                    } else{
                        product.units--
                    }
                    counter.innerText = product.units;
                    await stockApi.updateUnitsStock( product.id, product, product.units);
                }
                
                buttonContainer.appendChild(subtractButton);
                
                let btnEdit = createButton( "Guardar",  "btn","btn-success", "ms-2");
                btnEdit.onclick = async () => {
                    await stockApi.updateStock(product.id, product);
                    showStock(productContainer);
                }
                buttonContainer.appendChild(btnEdit);
                card.appendChild(buttonContainer);
        }
        // agregar boton edit a contenedor
        buttonContainer.appendChild(btnEdit);
        
        // boton eliminar
        let btnDelete = createButton("Eliminar", "btn", "btn-danger", "ms-2");
        
        // evento del boton eliminar
        btnDelete.onclick = () => deleteProduct(product.id);
        
        // agregar boton delete a contenedor
        buttonContainer.appendChild(btnDelete);
        

        // agregar contenedor botones a tarjeta
        card.appendChild(buttonContainer);

        // agregar tarjetas al contenedor de los productos
        productContainer.appendChild(card);
    });
}

const addProduct = async () => {
    // crear nuevo producto segun los datos/valor ingresados en el formulario
    let newProduct = createProduct(inputStock.value, inputTallStock.value, 0); 
    
    await stockApi.registerStock(newProduct);

    Toastify({
        text: `Agregaste ${inputStock.value} ${inputTallStock.value} al stock`,
        close: true,
        gravity: "bottom",
        position: "center",
        style: {
            color: "black",
            background: "#96c93d",
          },

    }).showToast();

    // llamar la funcion showStock para mostrar en pantalla todos los productos
    showStock(productContainer);
}




const deleteProduct = (idProduct) => {
    Swal.fire({
        title: "¿Seguro que quieres eliminar el producto?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Eliminar",
        confirmButtonColor: "green",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "red"
    })
    .then( async (ans) => {
        if(ans.isConfirmed){
            await stockApi.deleteStock(idProduct);
            
            Toastify({
                text: "Producto eliminado",
                close: true,
                gravity: "bottom",
                position: "center",
                style: {
                    color: "black",
                    background: "#96c93d",
                  }
        
            }).showToast();

            showStock(productContainer);
        }
    }) 
}

const filterProducts = async (nameProduct, productContainer) => {
    let stock = await stockApi.getStock();
    if(nameProduct === "pantalon") {
        filteredProducts = stock.filter(product => product.name === nameProduct)
        showStock(productContainer);
    } else if (nameProduct === "remera") {
        filteredProducts = stock.filter(product => product.name === nameProduct)
        showStock(productContainer);
    } else if (nameProduct === "vestido") {
        filteredProducts = stock.filter(product => product.name === nameProduct)
        showStock(productContainer);
    } else {
        filteredProducts = false;
        showStock(productContainer);
    }
}

export default {
    showStock,
    addProduct,
    deleteProduct,
    filterProducts
}

