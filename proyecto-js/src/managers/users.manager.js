import { User } from "../models/users.model";
import  usersApi  from "../api/users.api";

// Registrar usuario
const registerUser = async (name, lastname, email, password) => {
    const newUser = new User(name, lastname, email, password)

    // guardar usuario en bd
    await usersApi.registerUser(newUser);
}


// Buscar usuario por email 
const lookingUserByEmail = async (email) => {
    // obtener todos los usuarios de bd
    let users = await usersApi.getUsers();

    // Buscar si el email está registrado en bd
    let user = users.find((user) => user.email === email);
    
    console.log(user);
    return user
}

// Login usuario
const loginUser = async (email, password) => {
    // buscar si existe el usuario
    let user = await lookingUserByEmail(email);

    // retornar false si no existe
    if (!user){
        return false
    }

    // verificar si coincide la contraseña
    if (user.password !== password){
        return false;
    }

    // guardar los datos del usuario en el session storage
    sessionStorage.setItem("user", JSON.stringify(user));

    return user;
}

export default {
    registerUser,
    loginUser
}
