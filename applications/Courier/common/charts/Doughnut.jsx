import React, { Component } from "react"
import { Doughnut } from 'react-chartjs-2'
import ChartDataLabels  from 'chartjs-plugin-datalabels'



class DoughnutChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            labels: this.props.labels || [],
            datasets: [{
                data: this.props.data,
                backgroundColor: this.props.backgroundColor
            }],
        }
    }

    render() {
        const chartOptions = {
            responsive: true,
            plugins: {
                datalabels: {
                    font: {
                        weight: "800"
                    },
                    color: 'white',
                    formatter: function(value) {
                        return value;
                    },
                }
            }
        }
        return (
            <div id="chart">
                <Doughnut
                    data={{
                        labels: this.state.labels,
                        datasets: this.state.datasets
                    }}
                    height={this.props.height}
                    options={chartOptions}
                />
            </div>
        );
    }
}
export default DoughnutChart;