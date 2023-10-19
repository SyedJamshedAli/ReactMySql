const data={
    users:require('../model/user.json'),
    setUsers:function (data){this.users=data}
};


const getAllusers=(req,res)=>{
        res.json(data.users)
}


const createNewUser=(req,res)=>{
const newUser={
    id: data.users[data.users.length-1].id+1||1,
    "name":req.body.name,
    "email":req.body.email,
    "password":req.body.password

}
if(!newUser.name || !newUser.email || !newUser.password)
    return res.status(400).json({'message':'Name,email and password is required'})

//data.setUsers(newUser);
data.setUsers([...data.users,newUser]);
return res.status(201).json(data);
}



const updateUser=(req,res)=>{

    const user=data.users.find(user=>user.id=== parseInt(req.body.id));
    if(!user){return res.status(400).json({"message":`User ID ${req.body.id} not found`})}
    if (req.body.name) user.name=req.body.name;
    if (req.body.email) user.email=req.body.email;
    if (req.body.password) user.password=req.body.password;
    const filteredUserData=data.users.filter(user=>user.id!==parseInt(req.body.id));
    const newUserArray=[...filteredUserData,user]
    
    data.setUsers(newUserArray.sort((a,b)=> a.id > b.id ? 1 : a.id < b.id ? -1 : 0 ) );
    res.json(data.users);

   /* res.json({
        "Put":req.body.firstname,
        "Put_":req.body.lastname
    })*/
}

const deleteUser=(req,res)=>{
    res.json({
        "delete":req.body.firstname,
        "delete_":req.body.lastname
    })
}

const getUser=(req,res)=>{
    res.json({
        "urlParam":req.params.id        
    })
}

module.exports={
    getAllusers,createNewUser,updateUser,deleteUser,getUser
}