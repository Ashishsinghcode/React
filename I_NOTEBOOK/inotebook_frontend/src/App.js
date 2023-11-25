import './App.css';
import About from './component/About';
import Home from './component/Home';
import Navbar from './component/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Alert from './component/Alert';

import { useState } from 'react';
import Login from './component/Login';
import Signup from './component/Signup';

function App() {
  const [alert, setAlert] = useState(null)

  const handleAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <>
      <NoteState handleAlert={handleAlert}>
        <Router>
          <Navbar handleAlert={handleAlert}/>
          <div className='sticky-top'>
            <Alert message={alert} />
          </div>
          <div className='container'>
            <Routes>
              {/* {localStorage.getItem('token')? <Route exact path='/' element={<Home />} />:<Route exact path='/home' element={<Login handleAlert={handleAlert} />} />}

              {localStorage.getItem('token') ? <Route exact path='/login' element={<Login handleAlert={handleAlert}/>}/>:<Route exact path='/' element={<Login handleAlert={handleAlert}/>}/>}
               */}
              <Route exact path='/' element={<Navigate to ={localStorage.getItem('token')?"/home":"/login"}/>}/>
              <Route exact path='/home' element={<Home />} />
              <Route exact path='/login' element={<Login handleAlert={handleAlert}/>}/>
              <Route exact path='/about' element={<About />} />
              <Route exact path='/signup' element={<Signup handleAlert={handleAlert} />} />
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
