import { rootApp } from "../../main"
import tasksManager from "../managers/tasks.manager";
import stockAppPage from "../pages/stockApp.html?raw"

export const StockApp = () => {
    rootApp.innerHTML = "";

    let stockApp = document.createElement("div");
    stockApp.innerHTML = stockAppPage;

    rootApp.appendChild(stockApp);
    let formStock = document.querySelector("#formStock");
    let inputStock = document.querySelector("#inputStock");
    let inputTallStock = document.querySelector("#inputTallStock");
    let productContainer = document.querySelector("#productContainer");
    let filterProducts = document.querySelector("#filterProducts");

    tasksManager.showStock(productContainer);

    formStock.onsubmit = (event) => {
        event.preventDefault();
        tasksManager.addProduct(inputStock, inputTallStock, 0)
    }

    filterProducts.onchange = () => {
        tasksManager.filterProducts(filterProducts.value, productContainer)
    }
}