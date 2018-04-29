import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class errorMessage extends React.Component {

    constructor(props) {
        super(props);
    }
	showToast () { 
		if(this.props.errorData.displayToUser)
			switch(this.props.errorData.status){
				 case "ERROR": toastr.error(this.props.errorData.errorDescription);
				 break;
				 case "INFO": toastr.info(this.props.errorData.errorDescription);
				 break;
				 case "WARNING" : toastr.warning(this.props.errorData.errorDescription);
				 break;
				 default: toastr.success(this.props.errorData.errorDescription);
				 break;
			}
			 
			
	}
	componentWillReceiveProps() {
		this.showToast();
	}
	
	
	
   render() {
	   
	   
	   return (<div></div>);}
}

export default errorMessage;