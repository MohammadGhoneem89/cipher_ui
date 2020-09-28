import React, { Component } from "react"
import { HorizontalBar, Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../../../../core/actions/generalAction';
import { bindActionCreators } from 'redux';

class HorizontalBarChart extends React.Component {

    constructor(props) {
        super(props);

        let data = [...this.props.data]
        let dataValuesAttributes = [...this.props.dataValuesAttributes]
        let dataLabels = []
        let refinedData = []
        data.forEach(dataElement => {
            Object.entries(dataElement).forEach(dataElementObject => {
                console.log("dataElementObjectKey-->", dataElementObject[0])
                console.log("dataElementObjectValue-->", dataElementObject[1])
                if (dataElementObject[0] == this.props.dataLabelsAttribute) {
                    dataLabels.push(dataElementObject[1])
                }
                else {
                    dataValuesAttributes.forEach((dataValuesAttribute, index) => {
                        console.log("dataLabel-->", dataValuesAttribute)
                        console.log("index-->", index)
                        if (dataElementObject[0] == dataValuesAttribute) {
                            console.log("inside if")
                            if (!refinedData[index]) {
                                refinedData[index] = []
                            }
                            refinedData[index].push(dataElementObject[1])
                        }
                    })
                }
            })
        })
        console.log("dataValuesAttributes-->", dataValuesAttributes)
        console.log("refinedData-->", refinedData)

        let labels = [...this.props.labels]
        let datasets = []
        let backgroundColors = [...this.props.backgroundColors]
        for (let i = 0; i < labels.length; i++) {
            datasets.push(
                {
                    stack: this.props.stack == "single" ? 'stack1' : 'stack' + i + 1,
                    label: labels[i],
                    backgroundColor: backgroundColors[i],
                    borderColor: backgroundColors[i],
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundColors[i],
                    hoverBorderColor: backgroundColors[i],
                    data: refinedData[i]
                }
            )
        }
        console.log("datasets1--->", datasets)

        this.state = {
            labels: labels,
            datasets: datasets
        }
    }

    render() {
        console.log("data-->", this.props.data)
        return (
            <div id="chart">
                <HorizontalBar
                    data={{
                        labels: this.state.labels,
                        datasets: [
                            {
                                backgroundColor: "#337ab7",
                                borderColor: "#337ab7",
                                borderWidth: 1,
                                data: (5)["5", "6", "9", "11", "22"],
                                hoverBackgroundColor: "#337ab7",
                                hoverBorderColor: "#337ab7",
                                label: "Export Declarations",
                                stack: "stack1"
                            }
                        ]
                    }}
                    options={{
                        scales: {
                            xAxes: [{
                                ticks: {
                                    stepSize: 1
                                }
                            }],
                            yAxes: [{
                                barThickness: 15
                            }]
                        },
                        plugins: {
                            datalabels: {
                                font: {
                                    size: "22px",
                                    weight: "800"
                                },
                                color: 'white',
                                formatter: function (value, ctx) {
                                    return null;
                                },
                            }
                        },
                        tooltips: {
                            // enabled: false
                            // custom: function(value, ctx) {
                            //     console.log(JSON.stringify(value))
                            //     return value;
                        },
                    }
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChart);