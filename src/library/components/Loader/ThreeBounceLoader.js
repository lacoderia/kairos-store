import React, { Component } from 'react';
import './three-bounce-loader.css';

class ThreeBounceLoader extends Component {

  render(){

    return(
      <div className="sk-three-bounce">
        <div className="sk-child sk-bounce1"></div>
        <div className="sk-child sk-bounce2"></div>
        <div className="sk-child sk-bounce3"></div>
      </div>
    )
  }
}

export default ThreeBounceLoader;