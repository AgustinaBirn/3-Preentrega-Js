import { rootApp } from "../../main";
import usersManager from "../managers/users.manager";
import registerPage from "../pages/registerPage.html?raw";
import { Login } from "./Login";


export const Register = () => {
    rootApp.innerHTML = "";
    rootApp.innerHTML = registerPage;

    let name = document.querySelector("#name");
    let lastname = document.querySelector("#lastname");
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    let registerForm = document.querySelector("#registerForm");

    registerForm.onsubmit = async (e) => {
        e.preventDefault();
        const status = usersManager.registerUser(name.value, lastname.value, email.value, password.value);
         
        if(status){
            Login();
        }
    }
}


