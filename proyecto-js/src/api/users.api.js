
// Obtener todos los usuario bd
const getUsers = async () => {
    const answer = await fetch("http://localhost:3000/users");
    const data = await answer.json();
    console.log(data);

    return data;
}
// Registro de usuario // method: POST

const registerUser = async (user) => {
    const answer = await fetch("http://localhost:3000/users",{
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "content-type": "application/json; charset=UTF-8",
        },
    } );
    const data = await answer.json();
    console.log(data);

    return data;

}

export default{
    getUsers,
    registerUser
}

