import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';


class StatusBar extends React.Component {

    constructor(props, context) {
        super(props, context);
        
    }

    componentDidMount() {
    }

    componentWillMount() {
       
    }
    GetStatus(stat,selectedIndex){
        console.log("status: "+stat+"  "+"selectedIndex: "+selectedIndex)
        if((this.props.statusList.indexOf(stat)+1)<=selectedIndex)
            return "Active";
        else
            return "inActive";
        
    }
    GetStatusStep(statusName,currentStatusIndex, currentState)
    {
        let index  = this.props.statusList.indexOf(statusName)
        
        if(index < currentStatusIndex)
            return(<span className="number bg-blue bg-font-blue"> {currentState} </span>)
        else
            return(<span className="number bg-grey bg-font-black"> {currentState} </span>)
    }
    render() {


        if(this.props.statusList && this.props.status){
                let selectedIndex=this.props.statusList.indexOf(this.props.status)+1;
                let progress=(selectedIndex/this.props.statusList.length)*100;                                
        return (
            <div>

                       </div>

        );
        }else{

            return (<div>Empty/Invalid Arguments</div>)
        }
        

    }
}
export default StatusBar;