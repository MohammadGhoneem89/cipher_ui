import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

import moment from 'moment';
import { Bar } from 'react-chartjs-2';

var fullDate=[];
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth()-1);
class BarChartLine extends React.Component {
    
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
        /*
            switch(data[0]._datasetIndex){
                case 0: browserHistory.push("/transactionList"+"?prams="+fullDate[data[0]._index]);
                break;
                case 1: browserHistory.push("/exceptionList"+"?prams="+fullDate[data[0]._index]);
                break;
                default: browserHistory.push("/transactionList"+"?prams="+fullDate[data[0]._index]);
                break;

            }
            */

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
        //var  retVal= this.getRange(this.props.toDate,this.props.fromDate);
        var  retVal=this.props.monthList;
        this.setState({ rangePlot: retVal});
    }
     componentWillReceiveProps() {
        var  retVal=this.props.monthList;   
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
            labels: this.props.durationData,

            datasets: [{
                
                borderColor: 'rgb(32, 142, 239)',
                borderWidth: 1,
                type:'line',
                fill: false,
                hoverBackgroundColor: 'rgb(32, 142, 239)',
                hoverBorderColor: 'rgb(32, 142, 239)',
                label: 'Transactions Frequency',
                data: this.props.tranCountData
            }]
        };

        return (
            
                <div className="col-lg-12 bordered" style={{ paddingLeft: "10px", paddingRight: " 10px" }}>
                    <div className="dashboard-stat2 bordered" style={{ minHeight: "497px"}}>
								
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
export default BarChartLine;