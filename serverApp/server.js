import  express  from "express"
import mysql, { createConnection } from "mysql"
import cors from "cors"
import  jwt  from "jsonwebtoken"
import bcrypt from "bcrypt"
import cookieParser from "cookie-parser"
 
const app= express();

const port=process.env.Port||3500
app.use((req,res,next)=>{
    console.log(`${req.method} - ${req.path}`);
    next();
})

const whitelist=['http://localhost:3000'];
const corsOptions={
    origin:(origin,callback)=>{
        if(whitelist.indexOf(origin)!== -1 || !origin){
            callback(null,true);
        }else
        {
            callback(new Error('not Allowed by cors'))
        }
    },
    optionsSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));

app.use(express.json())

app.use(cookieParser)

app.use('/account','./api/account.js')

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

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
    })
  