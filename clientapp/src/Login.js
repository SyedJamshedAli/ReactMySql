import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidations'
import axios from 'axios';
const Login = () => {
  const [values,setValues]=useState({
    email:'',
    pwd:''
  })
const [errors,setErrors]=useState({})
const navigate=useNavigate();
  const handleSubmit=(e)=>{
    console.log(values);
e.preventDefault();
setErrors(Validation(values))
axios.post('http://localhost:3500/auth',values)
.then(res=>{
  alert(res.data)
  console.log(res.data.accessToken)
  if(res.data.accessToken)
 { navigate('/')}
else
{alert("Error");}
})
  }

  const handleInput=(event)=>{
    setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
    setErrors(Validation(values))
  }
  return (
    <div className='d-flex justify-content-center align-item-center' >
      <div className='bg-white p-3 rounded w-35'>
        <h2>Login </h2>
      <form action="" onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input onChange={handleInput} type="email" placeholder='Enter Email' name='email' className='form-control rounded-0'/>
            <span>{errors.email && <span className='text-danger'>{errors.email}</span>}</span>


        </div>
        <div>
          <label htmlFor="pwd">Password</label>
          <input onChange={handleInput} type="password" placeholder='Enter Password' name='pwd' className='form-control rounded-0' />
          <span>{errors.pwd && <span className='text-danger'>{errors.pwd}</span>}</span>
        </div>
        <button type="submit" className='btn btn-success w-100'><strong>Login</strong></button>
<p>You agree with terms and conditions</p>
<Link to='/Signup' className='btn btn-default border w-100 bg-light'>Create Account</Link >
        
      </form>
      </div>
</div>

  )
}

export default Login