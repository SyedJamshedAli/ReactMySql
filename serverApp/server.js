const express=require('express');
const app= express();
const path=require('path');
const cors=require('cors');
const port=process.env.Port||3500
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const mysql=require('mysql');
const createConnection=mysql.createConnection;
const corsOptions=require('./config/corsOptions')

app.use((req,res,next)=>{
    console.log(`${req.method} - ${req.path}`);
    next();
})


app.use(cors(corsOptions));

app.use(express.urlencoded({extended:false}));

app.use(express.json())

//app.use(cookieParser)

//Server Static Files
//app.use('/',express.static(path.join(__dirname,'/public')))

//Routes
app.use('/register',require('./routes/register'));
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

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
    })
  