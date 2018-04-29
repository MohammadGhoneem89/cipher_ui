import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tileData: []
        }
    }

    componentDidMount() {

         var tileData;
         if(this.props.data == null){

             tileData = [
            {
                "id": 1,
                "title": "N/A",
                "percentage": "percentage",
                "value": "percentage"
            }
        ]
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
			
			
			
               
                            {this.state.tileData.map((td, index) => (
							
								
                                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
								<div className="dashboard-stat2 ">
                                <div className="display">
                                    <div className="number">
                                        <h3 className="font-blue-sharp">
                                            <span data-counter="counterup" >{td.value}</span>
                                        </h3>
                                        <small>{td.title}</small>
                                    </div>
                                    <div className="icon">
                                        <i className="icon-basket"></i>
                                    </div>
                                </div>
                                <div className="progress-info">
                                    <div className="progress">
                                        <span style={{width: "100%"}} className="progress-bar progress-bar-success blue-sharp">
                                            <span className="sr-only">{td.percentage}% progress</span>
                                        </span>
                                    </div>
                                    <div className="status">
                                        <div className="status-title"> progress </div>
                                        <div className="status-number"> {td.percentage}% </div>
                                    </div>
                                </div> 
				</div>
				</div>
                            ))}
                    
            </div>
        );
    }
}

export default Tile;