
export const createProduct = (text, tall) => {
    let newProduct = {
        id: Date.now().toString(36),
        name: text,
        tall: tall,
        state: false
    }

    return newProduct;
}


