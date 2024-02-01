
import './App.css';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './util/AppRoutes';
import {Toaster }from 'react-hot-toast'



function App() {
  return (
  <>
  <BrowserRouter>
  <Toaster/>
  
  <AppRoutes/>
  </BrowserRouter>
 
  </>
  );
}

export default App;
