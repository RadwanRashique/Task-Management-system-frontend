
import React, { useState } from 'react'
import './Addtask.css'
import { Link,useNavigate } from 'react-router-dom'
import { RouteVariables } from '../../util/RouteVariables'
import toast from 'react-hot-toast'
import { userRequest } from '../../Helper/Interceptor'
import { ApiEndPoints } from '../../util/apiRoutes'
function AddTask() {

  const navigate=useNavigate()
  const [task, setTask] = useState('')
  
  const handleChange = (e) => {

   

    setTask(e.target.value.trim());
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation: Check if the task is empty
    if ( task === '') {
      toast.error('Please enter something.');
      return;
    }


    userRequest({
      url:ApiEndPoints.addTaskData,
      method:'post',
      data:{ task: task },
   }).then((response)=>{
console.log(response,"3456789")
       
          if (response.data.success) {
              toast.success(response.data.message)
              
           
              navigate(RouteVariables.TaskList)
              
          }
          else {

              toast.error(response.data.message)
          }
      
   }).catch((error)=>{
    
     console.log(error);
      
    toast.error('Sorry, this file is not acceptable.');
    
   
   })
  };
  return (
   <>
   <div className='addtaskcontainer'>
    <div className='btnback'>
    <Link to={RouteVariables.TaskList}><button className='addtaskbackbtn'>Back</button></Link>
    </div>
    <div className='formcontent'>
    <h1 >What's New ?</h1>
    <form onSubmit={handleSubmit}>
  
        <input className='addinput' name='task' id='task' placeholder='Write Your Task Here' type='text' onChange={handleChange} />
        <br/>
        <button className='addbtn'>Add</button>
    </form>
    </div>
   
    

   </div>


   </>
  )
}

export default AddTask
