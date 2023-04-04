import { pool } from "../connectDB.js";

export class DatabaseFind
{

    async find_by_id (table, id) {
        let command = `select * from ${table} where ${table}_ID = '${id}'`;
        let data = await pool.promise().query(command);
        if (data[0].length > 0) {
            return data[0];
        }
        else {
            return null;
        }
    }

    async find_by_title (table, title) {
        let command = `select * from ${table} where title = '${title}'`;
        let data = await pool.promise().query(command);
        if (data[0].length > 0) {
            return data[0];
        }
        else {
            return null;
        }
    }


    async find_by_email (table, email) {
        let command = `select * from ${table} where email = '${email}'`;
        let data = await pool.promise().query(command);
        if (data[0].length > 0) {
            console.log("🚀 ~ file: DatabaseFind.js:33 ~ find_by_email ~ 0:", data[0])
            
            return data[0];
        }
        else {
            return null;
        }
    }

    async find_by_phone_number( phone)
    {
        let command = `select * from User where phone_number = '${phone}'`;
        let data = await pool.promise().query(command);
        if (data[0].length > 0) {
            return data[0];
        }
        else {
            return null;
        }
    }
}