import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Validation from './LoginValidations'

const Login = () => {
  const [values,setValues]=useState({
    email:'',
    password:''
  })
const [errors,setErrors]=useState({})
  const handleSubmit=(e)=>{
    console.log(values);
e.preventDefault();
setErrors(Validation(values))
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
          <label htmlFor="password">Password</label>
          <input onChange={handleInput} type="password" placeholder='Enter Password' name='password' className='form-control rounded-0' />
          <span>{errors.password && <span className='text-danger'>{errors.password}</span>}</span>
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