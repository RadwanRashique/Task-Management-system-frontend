import React from 'react'
import {Routes,Route} from 'react-router-dom'

import UserSignUp from '../Pages/Register/UserSignUp'
import UserLogin from '../Pages/Login/UserLogin'
import TaskList from '../Pages/TaskList/TaskList'
import AddTask from '../Pages/TaskADD/AddTask'
import EditTask from '../Pages/TaskEdit/EditTask'
import { RouteVariables } from './RouteVariables'
import UserPublicRoute from '../component/PublicRoutes'
import UserProtectedRoute from '../component/ProtectedRoute'


function AppRoutes() {
  return (
 <>
 <Routes>
 < Route  path={RouteVariables.UserSignUp}   element={<UserPublicRoute><UserSignUp/></UserPublicRoute>} />
 < Route  path={RouteVariables.UserLogin}   element=    {<UserPublicRoute><UserLogin/></UserPublicRoute>}  />
 < Route  path={RouteVariables.TaskList}   element={<UserProtectedRoute><TaskList/></UserProtectedRoute>} />
 < Route  path={RouteVariables.AddTask}   element={<UserProtectedRoute><AddTask/></UserProtectedRoute>} />
 < Route  path={`${RouteVariables.EditTask}/:taskId`}   element={<UserProtectedRoute><EditTask/></UserProtectedRoute>} />
 </Routes>
 

 
 </>
  )
}

export default AppRoutes
