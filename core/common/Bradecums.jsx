import React from 'react';
import ReactDOM from 'react-dom';
import * as utils from './utils';



class Bradecums extends React.Component {
   render() {
       
      return (
	  
      <div className="breadcrumb"> <a className="breadcrumb-item" href={sessionStorage.firstScreen}>{utils.getLabelByID("breadcrumbHome")}</a> <span className="breadcrumb-item active">{this.props.componentName}</span> </div>

	  
  
      );
   }
}


export default Bradecums;