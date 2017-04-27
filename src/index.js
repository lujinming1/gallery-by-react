import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

window.onresize = function(){
  window.location.reload();
  window.location.href = "";
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
