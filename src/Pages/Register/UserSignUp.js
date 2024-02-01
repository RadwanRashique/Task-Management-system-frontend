import React, { useState } from 'react';
import './UserSignUp.css';
import toast from 'react-hot-toast';
import { ApiEndPoints } from '../../util/apiRoutes';
import { userRequest } from '../../Helper/Interceptor';
import { useNavigate } from 'react-router-dom'; 
import { RouteVariables } from '../../util/RouteVariables'


function UserSignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validations


    if (!formData.username || !formData.password || !formData.phone || !formData.email ||  !formData.confirmPassword) {
      return toast.error("Please fill all details");
    }
    if (formData.username.trim() === "") {
      return toast.error("Enter your name.");
    } else if (!/^[a-zA-Z\s]+$/.test(formData.username)) {
      return toast.error("Name can only contain letters and spaces.");
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(formData.email.toLowerCase())) {
      toast.error('Please enter a valid Gmail address');
      return;
    }

    if (/^\d+$/.test(formData.phone) &&formData. phone.length === 10) {
    } else {
      return toast.error("Please enter your valid 10-digit mobile number.");
    }
    if (formData.password.length <= 5) {
      return toast.error("Please enter a minimum of 6 characters for the password.");
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Mismatch");
      return;
    }

    // api calling
    userRequest({
      url:ApiEndPoints.userSignUp,
      method:'post',
      data:formData,


    }).then((response)=>{
    
          if (response.data.success) {
            toast.success(response.data.message);
            navigate(RouteVariables.UserLogin);
          } else {
            toast.error(response.data.message);
          }

    }).catch((error)=>{
            console.log(error);
      
          toast.error('Sorry, this file is not acceptable.');
      
    })
  };
  return (
    <>
    
    <div className='Container'>
      <h1>SignUp</h1>
      
    <h4>Register and  Manage Your Task</h4>
      <div >

<div className='ContainerForm'>

    
<form  onSubmit={handleSubmit} >
   
<label forhtml='username'>Enter Your Name</label>
<br/>
<input id="username"  name='username' type='text' placeholder='Name' onChange={handleChange}/>
<br/>
<label forhtml='email'>Enter Your Email</label>
<br/>
<input id="email"  name='email' type='email'  placeholder='Email' onChange={handleChange}/>
<br/>
<label forhtml='phone'>Enter Your Phone</label>
<br/>
<input id="phone"  name='phone' type='number' placeholder='Phone' onChange={handleChange}/>
<br/>
<label forhtml='password'>Enter Your Password</label>
<br/>
<input id="password"  name='password' type='text'  placeholder='Password'onChange={handleChange}/>
<br/>
<label forhtml='confirmPassword'>Conform password</label>
<br/>
<input id="confirmPassword"  name='confirmPassword' type='text' placeholder='ConformPassword' onChange={handleChange}  />

<br/>
<button className='Regbtn'>Register</button>

        
        
</form>


</div>
      </div>

    </div>
    </>
    
  )
}

export default UserSignUp
