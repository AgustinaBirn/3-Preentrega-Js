import Swal from "sweetalert2";
import { rootApp } from "../../main"
import usersManager from "../managers/users.manager";
import  loginPage  from "../pages/loginPage.html?raw";
import { StockApp } from "./StockApp";
import { Register } from "./register";


export const Login = () => {
    rootApp.innerHTML = "";
    rootApp.innerHTML = loginPage;
    
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let loginForm = document.querySelector("#loginForm");
    let registerLink = document.querySelector("#registerLink");

    loginForm.onsubmit = async (e) => {
        e.preventDefault();
        console.log(email.value);
        console.log(password.value);
        const status = await usersManager.loginUser(email.value, password.value);
        console.log(status);

        if(status){
            StockApp();

        } else{
            Swal.fire({
                title: "Email o contraseña inválidos"
            });
        }
    };

    registerLink.onclick = () => {
        Register();
    }
}