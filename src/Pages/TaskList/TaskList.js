import React,{useState,useEffect} from 'react';
import './TaskList.css';
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Header from '../../component/Header/Header'
import { ApiEndPoints } from '../../util/apiRoutes';
import { RouteVariables } from '../../util/RouteVariables';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { userRequest } from '../../Helper/Interceptor'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
function TaskList() {

const [taskData,setTaskData]=useState([])
const [droppableId, setDroppableId] = useState('drop');
useEffect(() => {
  // Generate a unique droppableId using a combination of a base string and a timestamp
  const uniqueId = `uniqueTaskboard_${Date.now()}`;
  setDroppableId(uniqueId);

  // Fetch task data
  getTaskData();
}, []);

  const navigate = useNavigate()
  

  const getTaskData=async()=>{
    userRequest({
      url:ApiEndPoints.getTaskData,
      method:'get',
   }).then((response)=>{

       
          if (response.data.success) {
           
            setTaskData(response.data.TaskData)
          }
          else {

              toast.error(response.data.message)
          }
      
   }).catch((error)=>{
    
     console.log(error);
      
    toast.error('Sorry, this file is not acceptable.');
    
   
   })
  }
  useEffect(()=>{
    getTaskData()

  },[])


  // deleting task 
  const handleDeleteTask = async (taskId) => {
    console.log(taskId)
    try {
      console.log("gioo")
      const response = await userRequest({
        url: `${ApiEndPoints.deleteTask}/${taskId}`,
        method: 'delete',
      });
      if (response.data.success) {
        toast.success(response.data.message);
        
        const updatedTasks = taskData.filter(task => task._id !== taskId);
        setTaskData(updatedTasks);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete task');
    }
  };
  // handling edit click
  const  handleEditTask=async(taskId)=>{
    navigate(`${RouteVariables.EditTask}/${taskId}`);
  }

  function handleOnDragEnd(result){
    if(!result.destination) return
          const items =Array.from(taskData)
          const [reorderedItem]=items.splice(result.source.index,1)
          items.splice(result.destination.index,0,reorderedItem)
          setTaskData(items)
  }
  return (
    <>
    <Header />
    <div className='todopannel'>
      <div className='todoheadding'>
        <h1>Task List</h1>
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
     
        <Droppable droppableId={droppableId}>
          {(provided) => (
            <div id={droppableId} {...provided.droppableProps} ref={provided.innerRef} className='taskboard'>
              {taskData.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      className='addedtask'
                    >
                      <h2>{task.task}</h2>
                      <MdDelete style={{ fontSize: "30px", color: "purple" }} onClick={() => handleDeleteTask(task._id)} />
                      <FaRegEdit style={{ fontSize: "30px", color: 'red' }} onClick={() => handleEditTask(task._id)} />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  </>
  );
}

export default TaskList;
