import React, { Component } from "react"
import { HorizontalBar, Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../../../../core/actions/generalAction';
import { bindActionCreators } from 'redux';

class HorizontalBarChartNew extends React.Component {

    constructor(props) {
        super(props);

        let data = [...this.props.data]
        let dataValuesAttributes = [...this.props.dataValuesAttributes]
        let dataLabels = []
        let refinedData = []
        console.log(dataValuesAttributes);
        console.log(data);
        data.forEach(dataElement => {
            console.log(dataElement);
            Object.entries(dataElement).forEach(dataElementObject => {
                if(dataElementObject[0] == this.props.dataLabelsAttribute) {
                    dataLabels.push(this.getLabel(dataElementObject[1]))
                }
                else {
                    dataValuesAttributes.forEach((dataValuesAttribute, index) => {
                        if(dataElementObject[0] == dataValuesAttribute) {
                            if(!refinedData[index]) {
                                refinedData[index] = []
                            }
                            refinedData[index].push(dataElementObject[1])
                        }
                    })
                }
            })
        })
        console.log(refinedData);
        let labels = [...this.props.labels]
        let datasets = []
        let backgroundColors = [...this.props.backgroundColors]
        for(let i = 0; i < labels.length; i++) {
            datasets.push(
                {
                    stack: this.props.stack == "single" ?  'stack1' : 'stack'+i+1,
                    label: labels[i],
                    backgroundColor: backgroundColors[i],
                    borderColor: backgroundColors[i],
                    borderWidth: 1,
                    hoverBackgroundColor: backgroundColors[i],
                    hoverBorderColor: backgroundColors[i],
                    data: refinedData[i]
                }
            )
            console.log(parseInt(refinedData[i]));
        }

        this.state = {
            labels: dataLabels,
            datasets: datasets
        }
        this.abbreviateNumber = this.abbreviateNumber.bind(this);
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

    abbreviateNumber(value) {
        let newValue = value;
        if (value >= 1000) {
            let suffixes = ["", "K", "M", "B", "T"];
            let suffixNum = Math.floor(("" + value).length / 3);
            let shortValue = '';
            for (let precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum) ) : value).toPrecision(precision));
                let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
                if (dotLessShortValue.length <= 2) {
                    break;
                }
            }
            if (shortValue % 1 !== 0){
                let shortNum = shortValue.toFixed(1);
            }
            newValue = shortValue + suffixes[suffixNum];
        }
        return newValue;
    }

    render() {
        console.log(this.state);
        let self = this;
        return (
            <div id="chart">
                <HorizontalBar
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                    }}
                    height={this.props.height}
                    options={{
                        scales: {
                            xAxes: [{
                                ticks: {
                                    // minRotation: 0,
                                    // maxRotation: 5,
                                    min: self.props.minRange,
                                    max: self.props.maxRange,
                                    stepSize: self.stepSize,
                                    callback: function(value, index, values) {
                                        // console.log(value);
                                        // if(parseInt(value) >= 1000){
                                        //     console.log(value);
                                            return self.abbreviateNumber(value);
                                        // } else {
                                        //   return value;
                                        // }
                                      }
                                }
                            }]
                        },
                        plugins: {
                            datalabels: {
                                font: {
                                    size:"22px",
                                    weight: "800"
                                },
                                color: 'white',
                                formatter: function(value, ctx) {
                                    return null;
                                },
                            }
                        },
                        tooltips: {
                            // enabled: false
                            // custom: function(value, ctx) {
                            //     return value;
                            },
                            // animation: {
                            //     duration: 0 // general animation time
                            // },
                            // hover: {
                            //     animationDuration: 0 // duration of animations when hovering an item
                            // },
                            // responsiveAnimationDuration: 0 // animation duration after a resize
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

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChartNew);