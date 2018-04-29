import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

import moment from 'moment';
import { Bar } from 'react-chartjs-2';

var fullDate=[];
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth()-1);
class BarChartExceptions extends React.Component {

    
    
    constructor(props) {
        super(props);
        this.state= {
            rangePlot:{},
            
        }

    }

    componentDidMount() {


    }

    checkEvents(data) {

        if(data.length>0){
            switch(data[0]._datasetIndex){
                case 0: browserHistory.push("/transactionList"+"?prams="+fullDate[data[0]._index]);
                break;
                case 1: browserHistory.push("/exceptionList"+"?prams="+fullDate[data[0]._index]);
                break;
                default: browserHistory.push("/transactionList"+"?prams="+fullDate[data[0]._index]);

                break;

            }
           
         
          

        }

       
        
          
    }
    
    
    getRange(toDate,fromDate){
        fullDate=[];
        let range=[];
        let start = moment(fromDate, 'DD/MM/YYYY').valueOf();
        let end = moment(toDate, 'DD/MM/YYYY').valueOf();
        while(start <= end){
	 	    range.push(moment(start).format('DD'));
            fullDate.push(moment(start).format('DD/MM/YYYY'));
	 	    start = moment(start).add(1, 'days').valueOf(); //date increase by 1
	    }
        return {range}
    }
    componentWillMount() {
           
        var  retVal= this.getRange(this.props.toDate,this.props.fromDate);
        
        this.setState({ rangePlot: retVal});
    }
     componentWillReceiveProps() {
           
        var  retVal= this.getRange(this.props.toDate,this.props.fromDate);
        
        this.setState({ rangePlot: retVal});
    }
    
    getFromDisplay(date)
    {

        var dateObjectTo = new Date(date);
        var dd = dateObjectTo.getDate();
        var mm = dateObjectTo.getMonth()+1; //January is 0!
        var yyyy = dateObjectTo.getFullYear();
        return dd+'/'+mm+'/'+yyyy;
        

    }



    render() {
       
        
        const dta = {
            labels: this.state.rangePlot.range,

            datasets: [{
                backgroundColor: 'rgba(0, 87, 0, 1)',
                borderColor: 'rgba(0, 87, 0, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 87, 0, 1)',
                hoverBorderColor: 'rgba(0, 87, 0, 1)',
                label: 'Reconciled',
                data: this.props.reconciledData
            },
            {
                backgroundColor: 'rgba(255,1,1,1)',
                borderColor: 'rgba(255,1,1,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,1,1,0.7)',
                hoverBorderColor: 'rgba(255,1,1,1)',
                label: 'Exception',
                data: this.props.exceptionData
            }]
        };

        return (
            
                <div className="col-lg-9 bordered" style={{ paddingLeft: "10px", paddingRight: " 10px" }}>
                    <div className="dashboard-stat2 bordered" style={{ minHeight: "310px"}}>
								
                        <Bar
                            data={dta}
                            
                            getElementAtEvent={this.checkEvents}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    xAxes: [{
                                        stacked: true
                                    }],
                                    yAxes: [{
                                        stacked: true
                                    }]
                                }
                            }}
                        />
                       
                    </div>
                                   
                    </div>
                );


    }
}

Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days);
    return date;
}
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date (currentDate));
            currentDate = currentDate.addDays(1);
        }
    return dateArray;
}
export default BarChartExceptions;