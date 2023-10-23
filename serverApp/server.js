require('dotenv').config();
const express=require('express');
const app= express();
const path=require('path');
const cors=require('cors');
const port=process.env.Port||3500
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const createConnection=mysql.createConnection;
const corsOptions=require('./config/corsOptions');
const verifyJWT=require('./middleware/verifyJWT');
const cookieParser=require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose=require('mongoose');
const connectDB=require('./config/dbConn');


connectDB();

app.use((req,res,next)=>{
    console.log(`${req.method} - ${req.path}`);
    next();
})

//handle options credentails checks before cors
//and fetch cookies credential requiremen
app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));

app.use(express.json())

//middleware for cookies
app.use(cookieParser());

//Server Static Files
//app.use('/',express.static(path.join(__dirname,'/public')))


//Routes
app.use('/register',require('./routes/register'));
app.use('/auth',require("./routes/auth"))
app.use('/refresh',require("./routes/refresh"))
app.use('/logout',require("./routes/logout"))

app.use(verifyJWT);
app.use('/account',require('./routes/api/account.js'));
const db=createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'signup'
})

app.get('/',(req,res)=>{
    res.send("done");
})
app.post('/signup',(req,res)=>{
    console.log('in api')
    const sql="insert into `signup`.`login` ('name','email','password') values (?)" 
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
    ]
    console.log(values.toString())
        db.query(sql,[values],(err,data)=>{

            if(err) return res.json(err.message);
            return res.json(data);
        })    
    
})

mongoose.connection.once('open',()=>{
    console.log('connected to mongoo db');
    app.listen(port,()=>{
        console.log(`Server is running at ${port}`)
        })
    
})
  