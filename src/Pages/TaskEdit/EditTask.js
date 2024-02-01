import React,{ useState } from 'react'
import './EditTask.css'
import { Link,useNavigate,useParams } from 'react-router-dom'
import { RouteVariables } from '../../util/RouteVariables'
import toast from 'react-hot-toast'
import { userRequest } from '../../Helper/Interceptor'
import { ApiEndPoints } from '../../util/apiRoutes'

function EditTask() {
 
  const { taskId } = useParams();


  const navigate=useNavigate()
  const [edittask, seteditTask] = useState('')

  
  const handleChange = (e) => {

    seteditTask(e.target.value.trim());
  };




  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation: Check if the task is empty
    if ( edittask === '') {
      toast.error('Please enter something.');
      return;
    }


    userRequest({
      url:`${ApiEndPoints.editTask}/${taskId}`,
      method:'put',
      data:{ task: edittask },
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
  }
  return (
   <>
   <div >
   
    <div className='btnback'>
    <Link to={RouteVariables.TaskList}><button className='Edittaskbackbtn'>Back</button></Link>
    </div>
    <div className='Editformcontent'>
    <h1 >MAKE A CHANGE</h1>
    <form className='Editform'  onSubmit={handleSubmit}>
      
        <input className='editinput' name='task' id='task' placeholder='Make an Edit' type='text' onChange={handleChange} />
        <br/>
        <button className='Editbtn'>Edit</button>
    </form>
    </div>
   
    

   </div>


   </>
  )
}

export default EditTask
