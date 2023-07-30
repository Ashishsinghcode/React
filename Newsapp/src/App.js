// import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  state ={
    progress:10,
  };
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
          height={3}
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <div className='container'>
            <Routes>
              <Route exact path="/" element={<News setProgress ={this.setProgress} apiKey={this.apiKey}  key="" pageSize={4} country="in" category="general" />} />
              <Route exact path="business" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="business" pageSize={8} country="in" category="business" />} />
              <Route exact path="/entertainment" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={8} country="in" category="entertainment" />} />
              <Route exact path="/general" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="general" pageSize={8} country="in" category="general" />} />
              <Route exact path="/health" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="health" pageSize={8} country="in" category="health" />} />
              <Route exact path="/science" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="science" pageSize={8} country="in" category="science" />} />
              <Route exact path="/sports" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={8} country="in" category="sports" />} />
              <Route exact path="/technology" element={<News setProgress ={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={8} country="in" category="technology" />} />
            </Routes>
          </div>

        </Router>
      </>
    )
  }
}

