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

function getRangeRandom(low,high){
   return Math.ceil(Math.random() * (high - low) + low);

}

function get30DegRandom(){
  return (Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30);

}


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      imgsArrangeArr : [
      /*  {
          pos: {
            left:'0',
            top:'0'
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }*/
      ]
    };
    this.rearrange = this.rearrange.bind(this);
    this.inverse = this.inverse.bind(this);
    this.center = this.center.bind(this);
  }

  Constant:{
    centerPos:{
      left:0,
      top:0
    },
    hPosRange:{ //shui ping fang xiang qu zhi fan wei
      leftSecX:[0,0],
      rightSecX:[0,0],
      y : [0,0]
    },
    vPosRange:{ //chui zhi fang xiang qu zhi fan wei
      x:[0,0],
      topY:[0,0]
    }
  };

  inverse(index){
    return function(){
      var imgsArrangeArr = this.state.imgsArrangeArr;
      imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
      this.setState({
        imgsArrangeArr : imgsArrangeArr
      });

    }.bind(this);
  }

  center(index){
    return function(){
      this.rearrange(index);
    }.bind(this);
  }


  rearrange(centerIndex) {
    var imgsArrangeArr = this.state.imgsArrangeArr,
        Constant = this.Constant,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeLeftSecX = hPosRange.leftSecX,
        hPosRangeRightSecx = hPosRange.rightSecX,
        hPosRangeY = hPosRange.y,
        vPosRangeTopY = vPosRange.topY,
        vPosRangeX = vPosRange.x,

        imgsArrangeTopArr = [],
        topImgNum = Math.floor(Math.random()*2), //shang fang qu yu qu 0 huo 1 ge
        topImgSpliceIndex = 0,

        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex,1);

        imgsArrangeCenterArr[0] = {
          pos : centerPos,
          rotate : 0,
          isCenter: true
        }


        topImgSpliceIndex = Math.ceil(Math.random() *
                (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(
                  topImgSpliceIndex,topImgNum);
        imgsArrangeTopArr.forEach(function (value,index){
          imgsArrangeTopArr[index] = {
            pos : {
                top : getRangeRandom(vPosRangeTopY[0],vPosRangeTopY[1]),
                left : getRangeRandom(vPosRangeX[0],vPosRangeX[1])
            },
            rotate : get30DegRandom(),
            isCenter:false
          }
        });

        for (var i = 0, j = imgsArrangeArr.length, k = j / 2;
          i < j; i++){
            var hPosRangeLORX = null;

            if(i < k){
              hPosRangeLORX = hPosRangeLeftSecX;
            }else{
              hPosRangeLORX = hPosRangeRightSecx;
            }

            imgsArrangeArr[i] = {
              pos : {
                  top : getRangeRandom(hPosRangeY[0],hPosRangeY[1]),
                  left : getRangeRandom(hPosRangeLORX[0],hPosRangeLORX[1])
              },
              rotate : get30DegRandom(),
              isCenter: false
            }
          }

          if(imgsArrangeTopArr && imgsArrangeTopArr[0]){
            imgsArrangeArr.splice(topImgSpliceIndex,0,
              imgsArrangeTopArr[0]);
          }

          imgsArrangeArr.splice(centerIndex,0,
                  imgsArrangeCenterArr[0]);
          this.setState({imgsArrangeArr : imgsArrangeArr});

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
        halfImgH = Math.ceil(imgH / 2);

    this.Constant = {
      centerPos : {
        left : halfStageW - halfImgW,
        top : halfStageH - halfImgH
      },
      hPosRange:{ //shui ping fang xiang qu zhi fan wei
        leftSecX:[-halfImgW,
                  halfStageW - halfImgW * 3],
        rightSecX :[halfStageW + halfImgW,
                   stageW - halfImgW ],
        y : [-halfImgH,
             stageH - halfImgH]
      },
      vPosRange:{ //chui zhi fang xiang qu zhi fan wei
        x:[halfStageW - imgW,halfStageW],
        topY:[-halfImgH,halfStageH - halfImgH * 3]
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
          },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }
      imgFigures.push(<ImgFigure data={value}
                ref={'imgFigure'+index}
                 arrange={this.state.imgsArrangeArr[index]}
                 inverse={this.inverse(index)}
                 center={this.center(index)}  />)
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
