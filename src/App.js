import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import logo from './logo.svg';
import './App.css';
import getImageURL from './util';
import ImgFigure from './component/ImgFigure'
//get image address
var imageDatas = require('./data/imageDatas.json')
//get image url
imageDatas = getImageURL(imageDatas);

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgsArrangeArr : [
      /*  {
          pos: {
            left:'0',
            top:'0'
          }
        }*/
      ]
    };
    this.rearrange = this.rearrange.bind(this);
  }

  Constant:{
    centerPos:{
      left:0,
      right:0
    },
    hPosRang:{ //shui ping fang xiang qu zhi fan wei
      leftSecX:[0,0],
      rightSecX:[0,0],
      y : [0,0]
    },
    vPosRang:{ //chui zhi fang xiang qu zhi fan wei
      x:[0,0],
      top:[0,0]
    }
  };

  rearrange(centerIndex) {

  }

  //zu jian jia zai hou ,wei mei zhang tu pian ji suan qi wei zhi s
  componentDidMount(){

    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW / 2),
        halfStageH = Math.ceil(stageH / 2);

    var imgFigureDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgFigureDOM.scrollWidth,
        imgH = imgFigureDOM.scrollHeight,
        halfImgW = Math.ceil(imgW / 2),
        halfImgH = Math.ceill(imgH / 2);

    this.Constant = {
      centerPos : {
        lef : halfStageW - halfImgW,
        top : halfStageH - halfImgH
      },
      hPosRang:{ //shui ping fang xiang qu zhi fan wei
        leftSecX:[-halfImgW,
                  halfStageW - halfImgW * 3],
        rightSecX:[halfStageW + halfImgW,
                   stageW - halfImgW ],
        y : [-halfImgH,
             halfStageH - halfImgH]
      },
      vPosRang:{ //chui zhi fang xiang qu zhi fan wei
        x:[halfStageW - imgW,
           halfStageW],
        top:[-halfImgH,
              halfStageH - halfImgH * 3]
      }
    };

    this.rearrange(0);

  }

  render() {

    var controllerUnits = [],
        imgFigures = [];
    imageDatas.forEach(function (value, index) {
      if(!this.state.imgsArrangeArr[index]){
        this.state.imgsArrangeArr[index] = {
          pos:{
            left:0,
            top:0
          }
        }
      }
      imgFigures.push(<ImgFigure data={value} ref={'imgFigure'+index} />)
    }.bind(this));
    return (
      <section className="stage" ref="stage">
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
