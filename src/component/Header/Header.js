import React ,{useState,useEffect}from 'react'
import './Header.css'

import { useNavigate,Link } from 'react-router-dom';
import { RouteVariables } from '../../util/RouteVariables';
import { ApiEndPoints } from '../../util/apiRoutes';
import { userRequest } from '../../Helper/Interceptor';
import { FiMoon } from "react-icons/fi";

function Header() {
  const [userName,setUserName]= useState('User')
  
const navigate=useNavigate()
// handling logout
  const handleLogout=() => {
    localStorage.removeItem("token")
   
    navigate(RouteVariables.UserLogin)
    
  }

  // api call to get userName

  const getUserName=()=>{
    userRequest({
      url:ApiEndPoints.getUserName,
      method:'get'
   }).then((response)=>{
console.log(response,"3456789")
       
          if (response.data.success) {
              
            setUserName(response.data.userName)
          }
      
   }).catch((error)=>{
    
     console.error(error);
      
   })
  }
  useEffect(()=>{
    getUserName()
   
  },[])
  
  return (
    <>
    <div className='container'>
        <div>
        <h1>WellScribe</h1>
        </div>
       <div>
       <h3>Hello,{userName}</h3>
       </div>
        <div>
       <FiMoon size={30} style={{ marginTop: '10px' }}/>
        </div>
       <div>
     <Link to={RouteVariables.AddTask}> <button className='addTaskbutton'>Add Tasks+</button></Link> 
       </div>
       
       <div>
       <button  className='Logout' onClick={handleLogout}>Logout</button>
       </div>
    
    </div>
    </>
  )
  }

export default Header
