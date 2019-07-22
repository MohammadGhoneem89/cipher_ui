import React, { Component } from "react"
import { HorizontalBar, Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../../../../core/actions/generalAction';
import { bindActionCreators } from 'redux';

class HorizontalBarChartTechnician extends React.Component {

    constructor(props) {
        super(props);
        // let data = [
        //     { technician: 'Abdullah', reported: '12'},
        //     { technician: 'Zubair', reported: '10'},
        //     { technician: 'Ibrahim', reported: '8'},
        //     { technician: 'Bilal', reported: '6'},
        //     { technician: 'Kamran', reported: '2'}
        // ]

        let data = this.props.data

        // let label = label

        let labels = []
        let reported = []

        for (let i of data) {
            labels.push(i.label);
            reported.push(i.expAuth);
        }

        console.log(Number(1000).toLocaleString('en'))

        this.state = {
            labels: labels,
            datasets: [
                {
                    stack: 'stack1',
                    // label: label[0],
                    backgroundColor: ['#FEC23F', '#FEB141', '#FF9D3F', '#FF9D3F', '#FF6941'],
                    borderColor: ['#FEC23F', '#FEB141', '#FF9D3F', '#FF9D3F', '#FF6941'],
                    borderWidth: 1,
                    hoverBackgroundColor: ['#FEC23F', '#FEB141', '#FF9D3F', '#FF9D3F', '#FF6941'],
                    hoverBorderColor: ['#FEC23F', '#FEB141', '#FF9D3F', '#FF9D3F', '#FF6941'],
                    // data: [1, 2, 3, 4, 5]
                    data: reported
                }

            ]
        }


    }

    render() {
        console.log("data-->", this.props.data)
        return (
            <div id="chart">
                <HorizontalBar height={50}
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                    }}
                    options={{
                        legend: {
                            display: false
                        },
                        scales: {
                            xAxes: [{
                                ticks: {
                                    min: 0,
                                    stepSize: 100,
                                    stepWidth: 100
                                },
                                categorySpacing: 0
                            }],
                            yAxes: [{
                                categorySpacing: 0,
                                barThickness: 15,
                                
                            }]
                        },
                        plugins: {
                            datalabels: {
                                font: {
                                    weight: "800"
                                },
                                color: 'white',
                                formatter: function(value, ctx) {
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

function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChartTechnician);