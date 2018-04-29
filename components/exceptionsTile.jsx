import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class ExceptionTileUnit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
       }
		
    }
    navigateToNext(URI){
        browserHistory.push(URI);
    }
    componentDidMount() {

         var tileData;
         if(this.props.data == null){

            tileData = 
            {
                "id": 1,
                "title": "N/A",
                "percentage": "percentage",
                "value": "percentage"
            }
        
         }
       else{
           tileData = this.props.data;
       }

        this.setState({ tileData: tileData});
    }

    componentWillMount() {
    }
	

   render() {
	  
		   
		   return (
							<div>

							

                     <div className="col-lg-3" style={{paddingLeft: "10px", paddingRight: "10px"}}>
                              <div className="dashboard-stat2 bordered overDueBlk" onClick={this.navigateToNext.bind(this,this.props.data.URI)} style={{minHeight: "284px"}}>
                                <div className="row">
                                  <div className="col-sm-12 ">
                 
                                    <h3 className="text-success text-center" ><i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{this.props.data.value}</h3>
                        <p className="text-success text-center" >Over Due By</p>
                                    <div className="clearfix"></div>
                                    <p className="text-success text-center days" >{this.props.data.overDue} Days</p>
                                   </div>
                                </div>
                             
                              </div>
                            </div>


								
				</div>
        );
		   
	  
        
    }
}

export default ExceptionTileUnit;