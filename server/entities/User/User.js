import bcrypt from "bcrypt";

export class User
{
    constructor(Full_name, Email, Address, Role, Phone_number, Birthday, Password, Profile_picture)
    {
        this.Full_name = Full_name;
        this.Email = Email;
        this.Address = Address;
        this.Role = Role;
        this.Phone_number = Phone_number;
        this.Birthday = Birthday;
        this.Password = Password;
        this.Profile_picture = Profile_picture;
    }

    init (id) {
        this.id = id;
    }

    transfer_data() {
        let obj = {
          Full_name: this.Full_name,
          password: this.password,
          Phone_number: this.Phone_number,
          email: this.email,
          Profile_picture: this.Profile_picture,
          role: this.role,
        };
        return obj;
    }
    
    async save() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        databaseUser.saveUser("User", this.transfer_data());
    }


    async read() {
        let data = await database.read("User", this.id);
        
        if (data.length) {
          this.login = data[0].login;
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
        if (this.login) await database.update("User", "login", this.login, this.id);
        if (this.full_name) await database.update("User", "full_name", this.full_name, this.id);
        if (this.email) await database.update("User", "email", this.email, this.id);
        if (this.role) await database.update("User", "role", this.role, this.id);
    }
    
    async delete() {
        await database.delete("User", this.id);
    }

    
}