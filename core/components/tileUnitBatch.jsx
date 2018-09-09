import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class TileUnitBatch extends React.Component {

    constructor(props) {
        super(props);
       
		
    }

    componentDidMount() {

        
    }

    componentWillMount() {
    }
	

navigateToNext(URI){
        browserHistory.push(URI);
    }

   render() {
          return (
			   <div className="row">
				   <div >
						     <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="dashboard-stat2 st2 stgreen ">
                                <div className="display">
                                    <div className="number">
                                       <small>{this.props.TileDataPRE.title}</small>
                                        <h3 className="">
                                            <span data-counter="counterup" data-value="50000 AED">{this.props.TileDataPRE.value}</span>
                                          
                                        </h3>
                                        <h4 className="">
                                        <span style={{paddingLeft:"100px"}}data-counter="counterup" data-value={"Count: "+ this.props.TileDataPRE.count}>{"Count: " +(this.props.TileDataPRE.count)}</span>
                                          
                                        </h4>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                        
                                    </div>
                                    
                                </div>
                                
                                
                                <i className="fa fa-plus" aria-hidden="true"></i>
                            </div>
                            
                            
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="dashboard-stat2 st2 stpurple">
                                <div className="display">
                                    <div className="number">
                                       <small>{this.props.TileDataCPT.title}</small>
                                        <h3 className="">
                                            <span data-counter="counterup" data-value={this.props.TileDataCPT.value}>{this.props.TileDataCPT.value}</span>
                                          
                                        </h3>
                                        <h4 className="">
                                            <span style={{paddingLeft:"100px"}}data-counter="counterup" data-value={"Count: "+ this.props.TileDataCPT.count}>{"Count: " +(this.props.TileDataCPT.count)}</span>
                                          
                                        </h4>
                                        <i className="fa fa-plus" aria-hidden="true"></i>
                                        
                                    </div>
                                    
                                </div>
                                
                                
                                <i className="fa fa-minus" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="dashboard-stat2 st2 stgreen">
                                <div className="display">
                                    <div className="number">
                                       <small>{this.props.TileDataPPR.title}</small>
                                        <h3 className="">
                                            <span data-counter="counterup" data-value={this.props.TileDataPPR.value}>{this.props.TileDataPPR.value}</span>
                                          
                                        </h3>
                                        <h4 className="">
                                            <span style={{paddingLeft:"100px"}}data-counter="counterup" data-value={"Count: "+ this.props.TileDataPPR.count}>{"Count: "+ (this.props.TileDataPPR.count)}</span>
                                          
                                        </h4>
                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                        
                                    </div>
                                    
                                </div>
                                
                                
                                <i className="fa fa-equal" aria-hidden="true"></i>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="dashboard-stat2 st2 storange">
                                <div className="display">
                                    <div className="number">
                                       <small>{this.props.TileDataTP.title}</small>
                                        <h3 className="">
                                            <span data-counter="counterup" data-value={this.props.TileDataTP.value}>{this.props.TileDataTP.value}</span>
                                          
                                        </h3>
                                        <h4 className="">
                                            <span style={{paddingLeft:"100px"}}data-counter="counterup" ></span>
                                          
                                        </h4>
                                        
                                        <i className="fa fa-equal" aria-hidden="true"></i>
                                        
                                    </div>
                                    
                                </div>
                                
                                
                              
                            </div>
                        </div>
                   	</div>
				</div>
        );
		   
	  
        
    }
}

export default TileUnitBatch;