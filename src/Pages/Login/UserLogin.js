import React, { useState } from 'react';
import './UserLogin.css'
import toast from 'react-hot-toast';
import {  Link, useNavigate } from 'react-router-dom';
import { ApiEndPoints } from '../../util/apiRoutes';
import { userRequest } from '../../Helper/Interceptor';
import { RouteVariables } from '../../util/RouteVariables'
function UserLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
console.log(formData)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (formData.email.trim() === '' || formData.password.trim() === '') {
      toast.error('Please fill in all fields');
      return;
    }

    userRequest({
      url:ApiEndPoints.userLogin,
      method:'post',
      data:formData
   }).then((response)=>{
console.log(response,"3456789")
       
          if (response.data.success) {
              toast.success(response.data.message)
              
              localStorage.setItem("token", response.data.token)
              navigate(RouteVariables.TaskList)
              
          }
          else {

              toast.error(response.data.message)
          }
      
   }).catch((error)=>{
    
     console.log(error);
      
    toast.error('Sorry, this file is not acceptable.');
    
   
   })
      }
  return (
   <>
   <div className='logincontainer'>

   <div className='login-box'>
    <h2>Login</h2>
    <form  onSubmit={handleSubmit}>
        <div className='inputdiv'>
        <label htmlFor='email'>Email</label>
        <br/>
            <input id='password' type='email' name='email' onChange={handleChange} />
            <br/>
            <label htmlFor='password'>Password</label>
            <br/>
            <input id='password' type='text' name='password' onChange={handleChange}/>
           
          
        </div>

        <button>Login</button>
        <h3 className='signqus'>Don't have an account?</h3>
        <Link to={RouteVariables.UserSignUp}><a className='backtosingup'>SignUp</a></Link>
            
           
        
    </form>

   </div>
   </div>
   
   </>
  )
}

export default UserLogin
