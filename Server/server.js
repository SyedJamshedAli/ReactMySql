import  express  from "express"
import mysql, { createConnection } from "mysql"
import cors from "cors"
import  jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"

const app= express();
app.use(express.json())
app.use(cors)
app.use(cookieParser)

const db=createConnection({
    host:'locahost',
    user:'jam',
    password:'123456',
    database:'signup'
})


app.post('/signup',(req,res)=>{
    console.log('in api')
    const sql="insert into login ('name','email','password') values (?)" 
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
  db.query(sql,[values],(err,data)=>{

    if(err) return res.json("Error");
    return res.json(data);
  })    

      
})
app.listen(8085,()=>{
  console.log('Server is running at 8081')
  })
