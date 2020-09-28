import React, { Component } from "react"
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../../../../core/actions/generalAction';
import { bindActionCreators } from 'redux';

class VerticalBarChart extends React.Component {

    constructor(props) {
        super(props);

        let data = [...this.props.data]
        let dataValuesAttributes = [...this.props.dataValuesAttributes]
        let dataLabels = []
        let refinedData = []
        data.forEach(dataElement => {
            Object.entries(dataElement).forEach(dataElementObject => {
                if (dataElementObject[0] == this.props.dataLabelsAttribute) {
                    dataLabels.push(this.getLabel(dataElementObject[1]))
                }
                else {
                    dataValuesAttributes.forEach((dataValuesAttribute, index) => {
                        if (dataElementObject[0] == dataValuesAttribute) {
                            if (!refinedData[index]) {
                                refinedData[index] = []
                            }
                            refinedData[index].push(dataElementObject[1])
                        }
                    })
                }
            })
        })
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
        this.state = {
            labels: dataLabels,
            datasets: datasets
        }
        console.log(this.state, 'VERTICAL"S STATE');
    }

    getLabel(label) {
        switch (label) {
            case "dropD":
                return "Drop D"
            case "eid":
                return "EID"
            case "flat":
                return "Flat"
            case "splitter":
                return "Splitter Port"
            case "x":
                return "X"
            case "y":
                return "Y"
            default:
                return label;
        }
    }

    render() {
        return (
            <div id="chart">
                <Bar
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                    }}
                    height={this.props.height}
                    options={{
                        ...this.props.options,
                        scales: {
                            yAxes: [{
                                scaleLabel: this.props.yAxesLabel || {}
                            }],
                            xAxes: [{
                                scaleLabel: this.props.xAxesLabel || {},
                                barPercentage: 1,
                                ticks: {
                                    stepSize: 1
                                }
                            }]
                        },
                        plugins: {
                            datalabels: {
                                font: {
                                    size: "12px",
                                    weight: "800"
                                },
                                color: 'white',
                                formatter: function (value, ctx) {
                                    // console.log('value: ',value)
                                    // console.log('ctx: ',ctx)
                                    return null;
                                },
                            }
                        },
                        tooltips: {
                            // enabled: false
                            // custom: function(value, ctx) {
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

export default connect(mapStateToProps, mapDispatchToProps)(VerticalBarChart);