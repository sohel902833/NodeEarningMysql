const express=require('express')
const dotenv=require('dotenv')
const cors=require('cors')
const bodyParser=require('body-parser')
const {connection}=require('./connection/connection')
const mysql = require('mysql');
const util = require("util"); 
const {createTables} = require('./connection/createTables');


const app=express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
dotenv.config();
app.use(express.json())


connection.query = util.promisify(connection.query).bind(connection);
connection.connect(function(err) {
    if (err) {
        console.log("Database Connection Failed")
    }else{
        console.log("Database Connected!");
    }
   });
createTables();


 app.use('/api/user',require('./routes/userRoutes'))
 app.use('/api/withdraw',require('./routes/withdrawRoutes'))
 app.use('/api/admin',require('./routes/adminRoutes'))
 app.use('/api/instant',require('./routes/instanceWithdrawRoutes'))
 app.use('/api/version',require('./routes/versionRoutes'))



function errorHandler(err,req,res,next){
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({error:err})
}

const port=process.env.PORT


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})
