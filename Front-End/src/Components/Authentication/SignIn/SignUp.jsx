import React, { useState } from 'react'
import axios from 'axios'

import './SignUp.css'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../../App/Nav/Nav'
import Footer from '../../App/Footer/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from '../Controllers/UserSlice'

const SignUp = () => {
     const dispatch = useDispatch()
     const {message}= useSelector(state => state.authInfo)
  const navigate = useNavigate()
  const [seePassword, setSeePassword] = useState(false)
  const [errorField,setErrorField] = useState('')
  const initialUser = {
     name : '',
     email : '',
     password : ''
  }
  const [user,setUser]=useState(initialUser);
  
 const handleChange=(e)=>{
     const {name, value} = e.target;
     setUser({...user, [name]:value})
     setMessage('')
 }

  const handleSubmit=(e)=>{
     e.preventDefault();
     axios.post('http://localhost:8000/register',user)
     .then((res)=>{
          navigate('/login')
          setUser(initialUser)
     }).catch((err)=>{         
          dispatch(setMessage(err.response.data.message))
          setErrorField(err.response.data.field)
     })
  }
  return (
    <div>
          <Nav />
          <div className='sing-up-section'>
               <form onSubmit={handleSubmit}>
                    <div className='fullname-fild'>
                         <label htmlFor="name">Full Name</label>
                         <input type="text" id='fullname' name='name'
                         onChange={handleChange} 
                         value={user.name} required/>
                    </div>
                    <div className='email-fild'>
                         <label htmlFor="email">Email</label>
                         <input type="email" id='email' name='email'
                         onChange={handleChange} 
                         value={user.email} required/>
                         <p className='message'>{errorField === 'email' && message}</p>
                    </div>
                    <div className='password-div'>
                         <label htmlFor='password'>Password</label>
                         <div className='password-field'>
                              <input type={seePassword ? 'text' : 'password'} id='password' name='password'
                              onChange={handleChange} 
                              value={user.password} required/>
                              {user.password.length > 0 && 
                              <button type='button' onClick={(e)=>{
                                   e.preventDefault()
                                   setSeePassword(!seePassword)
                                   }} className='seePassword-btn'>
                                   <i className={`fa-solid ${seePassword ? 'fa-eye-slash': 'fa-eye'}` }></i>
                              </button>}
                         </div>
                         <p className='message'>{errorField === 'password' && message}</p>
                    </div>
                    <button type='submit' className='Sing-up-btn'>Sign Up</button>
                    <div className='forgot_singup'>
                         <Link to='/find-user' className='forgot_password'>Forgot Password</Link>
                         <Link to='/login' className='sing_up'>Login</Link>
                    </div>
               </form>
          </div>
          <Footer />
    </div>
  )
}

export default SignUp