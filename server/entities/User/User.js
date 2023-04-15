import bcrypt from "bcrypt";

import { Database } from "../../database/DB_Functions/Database.js"
import { DatabaseFind } from "../../database/DB_Functions/DatabaseFind.js";
import { DatabaseGet } from "../../database/DB_Functions/DatabaseGet.js";
import { DatabaseDelete } from "../../database/DB_Functions/DatabaseDelete.js";
let database = new Database();

export class User
{
    constructor(Full_name, Email, Country, City, Role, Phone_number, Birthday, Password, Profile_picture)
    {
        this.full_name = Full_name;
        this.email = Email;
        this.country = Country;
        this.city = City;
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
          country: this.country,
          city: this.city,
          birthday: this.birthday
        };
        return obj;
    }
    
    async save() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        let db = new DatabaseFind();
        let role_id = await db.find_by_title("Role", this.role);
        let obj = this.transfer_data();
        // console.log(transfer_data());
        obj.Role_ID = role_id[0].Role_ID;
        database.save("User", obj);
    }


    async read() {
        let data = await database.read("User", this.id);
        let db = new DatabaseFind();
        let role = await db.find_by_id("Role", data[0].Role_ID);
        
        if (data.length) {
          this.User_ID = data[0].User_ID;
          this.phone_number = data[0].phone_number;
          this.password = data[0].password;
          this.full_name = data[0].full_name;
          this.email = data[0].email;
          this.role = role[0].title;
          this.id = data[0].User_ID;
          this.country = data[0].country;
          this.city = data[0].city;
          this.profile_picture = data[0].profile_picture;
          this.birthday = data[0].birthday;
          return data;
        }
        return null;
        
    }

    reset_password(password) {
        this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        return database.update("User", "password", this.password, this.id);
    }
    
    async update() {
        console.log("Phone number " + this.profile_picture);
        if (this.phone_number && this.phone_number !== undefined && this.phone_number !== "undefined") 
            await database.update("User", "phone_number", this.phone_number, this.id);

        if (this.full_name && this.full_name !== undefined && this.full_name !== "undefined") 
            await database.update("User", "full_name", this.full_name, this.id);

        if (this.email && this.email !== undefined && this.email !== "undefined") 
            await database.update("User", "email", this.email, this.id);


        if (this.role && this.role !== undefined && this.role !== "undefined") {
            let db = new DatabaseFind();
            let role_id = await db.find_by_title("Role", this.role);
            await database.update("User", "Role_ID", role_id[0].Role_ID, this.id);
        }

        // if (this.country ) await database.update("User", "country", this.country, this.id);
        // if (this.city) await database.update("User", "city", this.city, this.id);
        if (this.profile_picture 
            && this.profile_picture !== undefined 
            && this.profile_picture !== "undefined" 
            && this.profile_picture !== "null") 
            {
                console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa");
              await database.update("User", "profile_picture", this.profile_picture, this.id);  
            }
            

        if (this.birthday && this.birthday !== undefined && this.birthday !== "undefined") 
            await database.update("User", "birthday", this.birthday, this.id);

        if (this.password && this.password !== undefined && this.password !== "undefined") 
            await database.update("User", "password", this.password, this.id);
    }
    
    async delete() {
        let db = new DatabaseGet();
        let company = await db.get_company_by_userID(this.id);
        let comments = await db.get_comments_by_user_id(this.id);
        if (comments)
        {
            for (let comment of comments)
            {
                await database.delete("Comment", comment.Comment_ID)
            }
        }
        let db_delete = new DatabaseDelete();
        let events = await db.get_events_by_company(company[0].Company_ID);
        if (events)
        {
            for (let event of events) {
                await database.delete("Price", event.Price_ID);
                await database.delete("Location", event.Location_ID);
                
                db_delete.delete_by_eventId("Event_Theme", event.Event_ID);
                await database.delete("Event", event.Event_ID);
                
            }
        }
        
        db_delete.delete_by_userId("Organizer_Company",this.id);
        await database.delete("Company", company[0].Company_ID);
        await database.delete("Location", company[0].Location_ID);
        
        await database.delete("User", this.id);
    }

    async readAll()
    {
        let allUsers = await database.readAll("User");
        if (allUsers)
        {
            for (let i = 0; i < allUsers.length; i++)
            {
                let db = new DatabaseFind();
                let role = await db.find_by_id("Role", allUsers[i].Role_ID);
                console.log("🚀 ~ file: User.js:112 ~ role:", role)
                allUsers[i].role = role[0].title;
            }
        }
        return allUsers;
    }

    async getCompanyData()
    {
        let db = new DatabaseGet();
        return await db.get_company_by_userID(this.id);
    }
}