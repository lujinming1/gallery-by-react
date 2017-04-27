import React, {Component} from 'react';
import '../style/component/controllerUnit.css';

class ControllerUnit extends Component {

  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){

    if(this.props.arrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }


    event.preventDefault();
    event.stopPropagation();
  }

  render(){
    var controllerUnitClassName = "controller-unit";
    if(this.props.arrange.isCenter){
      controllerUnitClassName += " con-is-center";
      if(this.props.arrange.isInverse){
        controllerUnitClassName += " con-is-inverse";
      }
    }



    return (
      <span className={controllerUnitClassName}
      onClick={this.handleClick}></span>
    );
  }
}

export default ControllerUnit;
