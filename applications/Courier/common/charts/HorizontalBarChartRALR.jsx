import React, { Component } from "react"
import { HorizontalBar, Bar } from 'react-chartjs-2';


class HorizontalBarChartRALR extends React.Component {

    constructor(props) {
        super(props);

        const data = this.props.chartData
        // [
        // {
        //     rulename: "rule1",
        //     resolved: 1,
        //     initiated:2,
        //     rejected: 4,
        //     pending: 1
        // },
        // {
        //     rulename: "rule2",
        //     resolved: 5,
        //     initiated:2,
        //     rejected: 6,
        //     pending: 2
        // }
        // ]

        let labels = []
        let resolved = []
        let initiated = []
        let rejected = []
        let pending = []

        for (let i = 0; i < data.length; i++) {
            labels.push(data[i].rulename);
            resolved.push(data[i].resolved);
            initiated.push(data[i].initiated);
            rejected.push(data[i].rejected);
            pending.push(data[i].pending);
        }

        this.state = {
            labels: labels,
            datasets: [
                {
                    stack: 'stack1',
                    label: "Corrected",
                    backgroundColor: '#4DD43F',
                    borderColor: '#368B2D',
                    borderWidth: 1,
                    hoverBackgroundColor: '#3FAB33',
                    hoverBorderColor: '#286421',
                    data: resolved
                },
                {
                    stack: 'stack2',
                    label: "Initiated",
                    backgroundColor: '#4692CC',
                    borderColor: '#0B6B9A',
                    borderWidth: 1,
                    hoverBackgroundColor: '#4692B7',
                    hoverBorderColor: '#07415D',
                    data: initiated
                },
                {
                    stack: 'stack3',
                    label: "Rejected",
                    backgroundColor: '#F55B49',
                    borderColor: '#961506',
                    borderWidth: 1,
                    hoverBackgroundColor: '#DF3824',
                    hoverBorderColor: '#5E0D04',
                    data: rejected
                },
                {
                    stack: 'stack4',
                    label: "Pending",
                    backgroundColor: '#F5F548',
                    borderColor: '#CCCB08',
                    borderWidth: 1,
                    hoverBackgroundColor: '#E7E625',
                    hoverBorderColor: '#909005',
                    data: pending
                }
            ]
        }


    }

    render() {


        return (
            <div id="chart">
                <HorizontalBar
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets
                    }}
                    height={80}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true,
                       
                        scales: {
                            xAxes: [{
                                ticks: {
                                    stepSize: 1
                                }
                            }]
                        },
                        plugins: {
                            datalabels: {
                                font: {
                                    weight: "0"
                                },
                                color: 'white',
                                formatter: function (value, ctx) {
                                    // let percentage = (value * 100 / sum).toFixed(0) + "%";
                                    return null;
                                },
                            }
                        }
                    }}
                />
            </div>
        );
    }



}
export default HorizontalBarChartRALR;