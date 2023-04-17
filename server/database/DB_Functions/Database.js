import { pool } from "../connectDB.js";

export class Database
{
    // save = (table, set) => {
    //     let command = `insert into ${table} set ?`;
    //     pool.query(command, set, (err, row) => {
    //         if (err) {
    //             console.error(err.message);
    //         }
    //     });
    // }


    save = async (table, set) => {
        console.log("\n save \n")
        let command = `insert into ${table} set ? `;
        let data = await pool.promise().query(command, set).catch(err => {
            
            console.error(err.message);
            return new Error(err.message);
        });
        return data[0].insertId;
    }

    // saveSub = async (table, set) => {
    //     let command = `insert into ${table} set ? `;
    //     let data = await pool.promise().query(command, set).catch(err => {
            
    //         console.error(err.message);
    //         return new Error(err.message);
    //     });
    //     return data[0].insertId;
    // }

    read = async (table, id) => {
        let command = `select * from ${table} where ${table}_ID = "${id}"`;
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return new Error(err.message);
        });
        return result[0];
    }

    availabeSub = async (table, one, id, two, andId) => {
        console.log("\n available \n")
        let command = `select * from ${table} where User_ID = "${id}" and Company_ID = "${andId}"`;
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return new Error(err.message);
        });
        console.log("🚀 ~ file: Database.js:52 ~ result ~ result:", result[0])

       

        if(result[0].length > 0){
            return "yes";
        }else return "no";
    }

    readSub = async (table, one, id) => {
        
        let command = `select * from ${table} where ${one}_ID = "${id}"`;
        
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return new Error(err.message);
        });
        return result[0];
    }

    readSubByUser = async(id) =>
    {
        let command2 = `select Company.* from Subscribed_User 
        inner join Company on Subscribed_User.Company_ID = Company.Company_ID
        where Subscribed_User.User_ID = User_ID = ${id}`;
        let result = await pool.promise().query(command2).catch(err => {
            console.error(err.message);
            return new Error(err.message);
        });
        return result[0];
    }

    update = async (table, column, value, id) => {
        
        let command_update = `update ${table} set ${column} = '${value}' where ${table}_ID = ${id}`;
        
        console.log("🚀 ~ file: Database.js:42 ~ update= ~ command_update:", command_update)
        let result = await pool.promise().query(command_update).catch(err => {
            console.error(err.message);
            return err;
        });
        return result;
    }

    delete = async (table, id) => {
        console.log("\n delete \n")
        let command = `delete from ${table} where ${table}_ID = "${id}"`;
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return err;
        });
        if (result[0] === undefined) {
            return new Error("Can't delete");
        }
        else {
            return result;
        }
    }

    deleteSub = async (table, one, id, two, andId) => {
        let command = `delete from ${table} where ${one}_ID = "${id}" and ${two}_ID = "${andId}"`;
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return err;
        });
        if (result[0] === undefined) {
            return new Error("Can't delete");
        }
        else {
            return result;
        }
    }

    readAll = async (table) => {
        let command = `select * from ${table}`;
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return err;
        })
        return result[0];
    }
}

