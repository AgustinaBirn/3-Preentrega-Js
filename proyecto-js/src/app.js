import htmlElements from "./elements/html.elements";
import tasksManager from "./managers/tasks.manager";

export const app = () => {
       // Ejecutar actividades iniciales
       console.log("Ejecutando aplicación");
       htmlElements.formStock.onsubmit = (event) => {
              event.preventDefault();
              tasksManager.addProduct();
       }
       tasksManager.showStock(tasksManager.stock);
       htmlElements.filterProducts.onchange = () => {
              console.log(htmlElements.filterProducts.value);
              tasksManager.filterProducts(htmlElements.filterProducts.value);
       }
}