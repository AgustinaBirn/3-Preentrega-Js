
const getStock = async () => {
    const answer = await fetch("http://localhost:3000/stock");
    const data = await answer.json();
    console.log(data);

    return data;
}

const getStockById = async (id) => {
    const answer = await fetch(`http://localhost:3000/stock/${id}`);
    const data = await answer.json();
    console.log(data);

    return data;
}



const registerStock = async (product) => {
    const answer = await fetch("http://localhost:3000/stock",{
        method: "POST",
        body: JSON.stringify(product),
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    } );
    const data = await answer.json();
    console.log(data);

    return data;
}

const updateStock = async (id,product) => {
    const answer = await fetch(`http://localhost:3000/stock/${id}`,{
        method: "PUT",
        body: JSON.stringify(product),
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    } );
    const data = await answer.json();

    return data;
}

const updateUnitsStock = async (id, product, units) => {
    const answer = await fetch(`http://localhost:3000/stock/${id}`,{
        method: "PUT",
        body: JSON.stringify(product, units),
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    } );
    const data = await answer.json();

    return data;
}

const deleteStock = async (id) => {
    const answer = await fetch(`http://localhost:3000/stock/${id}`,{
        method: "DELETE",
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    } );
    const data = await answer.json();
    console.log(data);

    return data;
}

export default{
    getStock,
    getStockById,
    registerStock,
    updateStock,
    updateUnitsStock,
    deleteStock
}




