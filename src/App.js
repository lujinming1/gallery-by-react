import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import getImageURL from './util.js';

//get image address
var imageDatas = require('./data/imageDatas.json')
//get image url
imageDatas = getImageURL(imageDatas);

class App extends Component {
  render() {
    return (
      <section className="stage">
        <section className="img-sec">
        
        </section>
        <nav className="controller-nav">
        </nav>
      </section>
    );
  }
}

export default App;
