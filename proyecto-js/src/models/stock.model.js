import { v4 as generateID } from "uuid";
export const createProduct = (text, tall, units) => {
    let newProduct = {
        id: generateID(),
        name: text,
        tall: tall,
        units: units
    }

    return newProduct;
}


