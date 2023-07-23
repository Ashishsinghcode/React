import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

export default class App extends Component {
  render() {
    return (
     <>
     <Navbar/>
     <div className='container'>
      <News pageSize={4}/>
     </div>
     </>
    )
  }
}

