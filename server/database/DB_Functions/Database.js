import { pool } from "../connectDB.js";

export class Database
{
    save = (table, set) => {
        let command = `insert into ${table} set ?`;
        pool.query(command, set, (err, row) => {
            if (err) {
                console.error(err.message);
            }
        });
    }

    read = async (table, id) => {
        let command = `select * from ${table} where ${table}_ID = "${id}"`;
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return new Error(err.message);
        });
        return result[0];
    }

    update = async (table, column, value, id) => {
        let command_update = `update ${table} set ${column} = '${value}' where ${table}_ID = ${id}`;
        let result = await pool.promise().query(command_update).catch(err => {
            console.error(err.message);
            return err;
        });
        return result;
    }

    delete = async (table, id) => {
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

    readAll = async (table) => {
        let command = `select * from ${table}`;
        let result = await pool.promise().query(command).catch(err => {
            console.error(err.message);
            return err;
        })
        return result[0];
    }
}

