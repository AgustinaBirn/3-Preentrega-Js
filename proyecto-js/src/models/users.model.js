import { v4 as generateID } from "uuid"

export class User {
    constructor(name, lastname, email, password) {
        this.id = generateID();
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }
}

