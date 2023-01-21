import bcrypt from "bcrypt";

import { Database } from "../../database/DB_Functions/Database.js"
let database = new Database();

export class User
{
    constructor(Full_name, Email, Address, Role, Phone_number, Birthday, Password, Profile_picture)
    {
        this.full_name = Full_name;
        this.email = Email;
        this.address = Address;
        this.role = Role;
        this.phone_number = Phone_number;
        this.birthday = Birthday;
        this.password = Password;
        this.profile_picture = Profile_picture;
    }

    init (id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          full_name: this.full_name,
          password: this.password,
          phone_number: this.phone_number,
          email: this.email,
          profile_picture: this.profile_picture,
          role: this.Role,
          address: this.Address,
          birthday: this.Birthday
        };
        return obj;
    }
    
    async save() {
        this.password = bcrypt.hashSync(this.Password, bcrypt.genSaltSync(10));
        // databaseUser.saveUser("User", this.transfer_data());
        database.save("User", this.transfer_data());
    }


    async read() {
        let data = await database.read("User", this.id);
        
        if (data.length) {
          this.phone_number = data[0].phone_number;
          this.password = data[0].password;
          this.full_name = data[0].full_name;
          this.email = data[0].email;
          this.role = data[0].role;
          this.id = data[0].User_ID;
        }
    }

    reset_password(password) {
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return database.update("User", "password", this.password, this.id);
    }
    
    async update() {
        if (this.phone_number) await database.update("User", "phone_number", this.phone_number, this.id);
        if (this.full_name) await database.update("User", "full_name", this.full_name, this.id);
        if (this.email) await database.update("User", "email", this.email, this.id);
        if (this.role) await database.update("User", "role", this.role, this.id);
    }
    
    async delete() {
        await database.delete("User", this.id);
    }

    
}