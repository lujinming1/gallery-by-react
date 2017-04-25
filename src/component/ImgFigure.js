import React, {Component} from 'react';
import '../style/component/imgFigure.css'


class ImgFigure extends Component {

  render(){
    return (
      <figure className="img-figure">
        <img src={this.props.data.imageURL}
              alt={this.props.data.title}/>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
        </figcaption>
      </figure>

    );
  }



}

export default ImgFigure;
