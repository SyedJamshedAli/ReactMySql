import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './SignupValidation'
import axios from 'axios'
const Signup = () => {
const [values,SetValues]=useState({
    
    email:'',
    password:''
})

const [errors,setErrors]=useState([])

const handleInput = (event)=>{
    SetValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
//console.log(values)
}
const navigate=useNavigate();
const handleSubmit=(e)=>{
e.preventDefault();
setErrors(Validation(values))
alert('check');
if(errors.email==="" && errors.password==="")
    {
      alert('call api')
       axios.post('http://localhost:3500/register',values)
       .then(res=>{
        navigate('/login')
        console.log(res)
      })
       .catch(err=>console.log(err))
    }
}

    return (
    <div className='d-flex justify-content-center align-item-center' >
    <div className='bg-white p-3 rounded w-35'>
        <h2>Signup</h2>
    <form action="" onSubmit={handleSubmit}>
    <div className='mb-3'>
        <label htmlFor="name">Name</label>
        <input type="name" onChange={handleInput} name='name' placeholder='Enter Name' className='form-control rounded-0'/>
        <span>{errors.name && <span className='text-danger'>{errors.name}</span>}</span>

      </div>
      <div className='mb-3'>
        <label htmlFor="email">Email</label>
        <input type="email" onChange={handleInput} placeholder='Enter Email' name='email' className='form-control rounded-0'/>
        <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>

      </div>
      <div className='mb-3'>
        <label htmlFor="password">Password</label>
        <input type="password" onChange={handleInput} placeholder='Enter Password' name='password' className='form-control rounded-0' />
        <span>{errors.password && <span className='text-danger'>{errors.password}</span>}</span>
      </div>
      <button className='btn btn-success w-100'><strong>Sign Up</strong></button>
<p>You agree with terms and conditions</p>
<Link to='/' className='btn btn-default border w-100 bg-light'>Login</Link >
      
    </form>
    </div>
</div>
  )
}

export default Signup