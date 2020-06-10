import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

import moment from 'moment';
import { Bar } from 'react-chartjs-2';

var fullDate = [];
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth() - 1);
class BarChartExceptions extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            rangePlot: [],
            listdates:[]

        }

    }

    componentDidMount() {


    }

    checkEvents(data) {

        if (data.length > 0) {
            switch (data[0]._datasetIndex) {
                case 0: browserHistory.push("/transactionList" + "?prams=" + fullDate[data[0]._index]);
                    break;
                case 1: browserHistory.push("/exceptionList" + "?prams=" + fullDate[data[0]._index]);
                    break;
                default: browserHistory.push("/transactionList" + "?prams=" + fullDate[data[0]._index]);

                    break;

            }




        }




    }
    componentWillMount() {
      
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data && nextProps.data.listdates ) {
            this.setState({ listdates: nextProps.data.listdates });
        }
    }

    getFromDisplay(date) {

        var dateObjectTo = new Date(date);
        var dd = dateObjectTo.getDate();
        var mm = dateObjectTo.getMonth() + 1; //January is 0!
        var yyyy = dateObjectTo.getFullYear();
        return dd + '/' + mm + '/' + yyyy;


    }



    render() {
       

        const dta = {
            labels: this.state.listdates,

            datasets: [{
                backgroundColor: 'rgba(0, 87, 0, 1)',
                borderColor: 'rgba(0, 87, 0, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 87, 0, 1)',
                hoverBorderColor: 'rgba(0, 87, 0, 1)',
                label: 'Confirmed',
                data: this.props.data.listConfirmed
            },
            {
                backgroundColor: '#FFD54F',
                borderColor: '#FFD54F',
                borderWidth: 1,
                hoverBackgroundColor: '#FFCD2B',
                hoverBorderColor: '#FFCD2B',
                label: 'Unconfirmed',
                data: this.props.data.listPending
            },
            {
                backgroundColor: '#FF0000',
                borderColor: '#FF0000',
                borderWidth: 1,
                hoverBackgroundColor: '#FF0000',
                hoverBorderColor: '#FF0000',
                label: 'Rejected',
                data: this.props.data.listRejected
            }]
        };

        return (

            <div className="col-lg-12 bordered" style={{ paddingLeft: "10px", paddingRight: " 10px" }}>
                <div className="dashboard-stat2 bordered" style={{ minHeight: "310px" }}>

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

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf())
    date.setDate(date.getDate() + days);
    return date;
}
function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}
export default BarChartExceptions;