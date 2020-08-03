import React from 'react';
import { browserHistory } from 'react-router';

import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import * as utils from '../common/utils.js';

var fullDate = [];
var x = new Date();
x.setDate(1);
x.setMonth(x.getMonth() - 1);

class CommonBarChart extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            rangePlot: {},

        }
        this.checkEvents = this.checkEvents.bind(this);

    }

    componentDidMount() {


    }

    checkEvents(data) {
    }


    getRange(toDate, fromDate) {
        fullDate = [];
        let range = [];
        let start = moment(fromDate, 'DD/MM/YYYY').valueOf();
        let end = moment(toDate, 'DD/MM/YYYY').valueOf();
        while (start <= end) {
            range.push(moment(start).format('DD'));
            fullDate.push(moment(start).format('DD/MM/YYYY'));
            start = moment(start).add(1, 'days').valueOf(); //date increase by 1
        }
        return { range }
    }

    componentWillMount() {

        var retVal = this.getRange(this.props.toDate, this.props.fromDate);
        this.setState({ rangePlot: retVal});
    }

    componentWillReceiveProps() {

        var retVal = this.getRange(this.props.toDate, this.props.fromDate);
        this.setState({ rangePlot: retVal });
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
            labels: this.props.labels,

            datasets: []
        };
        // if(this.props.legends[0]){
            dta.datasets.push({
                backgroundColor: 'rgba(0, 87, 0, 1)',
                borderColor: 'rgba(0, 87, 0, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(0, 87, 0, 1)',
                hoverBorderColor: 'rgba(0, 87, 0, 1)',
                label: this.props.legends[0],
                data: this.props.chartData.firstBar
            });
        // }
        // if(this.props.legends[1]){
            // dta.datasets.push({
            //     backgroundColor: 'rgba(0, 126, 189, 0.6)',
            //     borderColor: 'rgba(0, 126, 189, 0.6)',
            //     borderWidth: 1,
            //     hoverBackgroundColor: 'rgba(0, 115, 255, 1)',
            //     hoverBorderColor: 'rgba(0, 115, 255, 1)',
            //     label: this.props.legends[1],
            //     data: this.props.chartData.secondBar
            // });
        // }
        // if(this.props.legends[2]){
            // dta.datasets.push({
            //     backgroundColor: '#F1C40F',
            //     borderColor: '#F1C40F',
            //     borderWidth: 1,
            //     hoverBackgroundColor: '#F1C40F',
            //     hoverBorderColor: '#F1C40F',
            //     label: this.props.legends[2],
            //     data: this.props.chartData.thirdBar
            // });
        // }
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
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: this.props.graphLabels.xaxis
                                    }
                                }],
                                yAxes: [{
                                    stacked: true,
                                    scaleLabel: {
                                        display: true,
                                        labelString: this.props.graphLabels.yaxis
                                    }
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

export default CommonBarChart;