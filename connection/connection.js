const mysql=require('mysql')
const dotenv=require('dotenv')
dotenv.config();
const connectionData={
        host:process.env.HOST_NAME,
        user:process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
let connection = mysql.createConnection(connectionData);

module.exports={
    connection
}