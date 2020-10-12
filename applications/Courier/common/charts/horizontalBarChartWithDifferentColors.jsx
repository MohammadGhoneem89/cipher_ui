import React, { Component } from "react"
import { HorizontalBar, Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import * as actions from '../../../../core/actions/generalAction';
import { bindActionCreators } from 'redux';

class HorizontalBarChartWithDifferentColors extends React.Component {

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
                if(dataElementObject[0] == this.props.dataLabelsAttribute && !dataLabels.includes(dataElementObject[1])) {
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
            console.log(i, 'I KI LENGHT');
       if (datasets.length == 0) {
            datasets.push(
                {
                    stack: this.props.stack == "single" ?  'stack1' : 'stack'+0+1,
                    label: labels,
                    // backgroundColor: this.props.separateColors ? this.getColors(0) : backgroundColors[0],
                    backgroundColor: this.props.sortedColors,
                    borderColor: this.props.sortedColors,
                    borderWidth: 1,
                    hoverBackgroundColor: this.props.sortedColors,
                    hoverBorderColor: this.props.sortedColors,
                    data: refinedData[0]
                }
            )
        } 
        // else {
        //     datasets.push(
        //         {
        //             label: labels[i],
        //             // backgroundColor: this.props.separateColors ? this.getColors(0) : backgroundColors[0],
        //             backgroundColor: backgroundColors[i],
        //         }
        //     )
        // }
            console.log(parseInt(refinedData[0]));
        }

        this.state = {
            labels: dataLabels,
            datasets: datasets
        }
        this.abbreviateNumber = this.abbreviateNumber.bind(this);
    }
    getColors(x) {
        if (x == 0) {
            return '#f58709'
        } else if (x == 1) {
            return '#ae8b4b'
        } else {
            return '#2196f3'
        }
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
        console.log(this.props);
        let self = this;
        return (
            <div style={{display: 'flex', flexDirection: 'column'}} id="chart">
                <div style={{display: 'flex', alignItems: 'center'}}>
                    {this.props.labels.map((label, index) => {
                        return (
                       <div style={{display: 'flex',
                        alignItems: 'center'}}><div style={{backgroundColor: this.props.backgroundColors[index], width: '30px', height: '10px', margin: '0px 7px'}}></div> <span style={{fontWeight: '600'}}>{label}</span></div>
                       )
                    })}
                </div>
                <HorizontalBar
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets,
                        sortedLabels: this.props.sortedLabels
                    }}
                    height={this.props.height}
                    options={{
                        scales: {
                            xAxes: [{
                                barPercentage: 1,
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
                            }],
                            // yAxes: [{
                            //     scaleLabel: {
                            //         fontSize: "5px"
                            //     }
                            // }]
                        },
                        legend: {
                            display: false,
                        },
                        plugins: {
                            datalabels: {
                                font: {
                                    size:"16px",
                                    weight: "800"
                                },
                                color: 'white',
                                formatter: function(value, ctx) {
                                    return null;
                                },
                            }
                        },
                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    // console.log(tooltipItem, 'tooltipItem');
                                    // console.log(data, "DATA");
                                    var label = data.sortedLabels[tooltipItem.index] || '';
                
                                    // if (label) {
                                    //     label += ': ';
                                    // }
                                    // label += Math.round(tooltipItem.yLabel * 100) / 100;
                                    return  label + ': ' + data.datasets[0].data[tooltipItem.index];
                                }
                            }
                        }
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

export default connect(mapStateToProps, mapDispatchToProps)(HorizontalBarChartWithDifferentColors);