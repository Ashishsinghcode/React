import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';

import { useState } from 'react';

function App() {
  const [alert,setAlert]=useState(null)
  
  const handleAlert=(msg,type)=>{
    setAlert({
      msg:msg,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }
 
  return (
    <>
      <NoteState handleAlert={handleAlert}>
        <Router>
          <Navbar />
          <Alert message= {alert}/>
          <div className='container'>
            <Routes>
              <Route exact path='/' element={<Home/>} />
              <Route exact path='/about' element={<About />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    
    
    </>
  );
}

export default App;
