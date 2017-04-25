import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import getImageURL from './util';
import ImgFigure from './component/ImgFigure'
//get image address
var imageDatas = require('./data/imageDatas.json')
//get image url
imageDatas = getImageURL(imageDatas);

class App extends Component {
  render() {

    var controllerUnits = [],
        imgFigures = [];
    imageDatas.forEach(function (value) {
      imgFigures.push(<ImgFigure data={value} />)
    })
    return (
      <section className="stage">
        <section className="img-sec">
          {imgFigures}
        </section>
        <nav className="controller-nav">
        {controllerUnits}
        </nav>
      </section>
    );
  }
}

export default App;
