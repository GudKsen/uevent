import mysql from 'mysql2'
import path from 'path'
import fs from 'fs'

const __dirname = path.resolve();
var pathToJson = path.resolve(__dirname, "database/config.json");
const config = JSON.parse(fs.readFileSync(pathToJson, "utf8"));

const pool = mysql.createPool(config);

export {pool}