import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import ReactModal from 'react-modal';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
import moment from 'moment';


class MultiLineChart extends Component {
    constructor() {
        super();
        this.state = {
            showModal: false,
            dataPoints: []
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.dataPoints) {
            this.setState({
                dataPoints: nextProps.dataPoints
            })
        }
    }

    render() {
        console.log(this.props, '==========');
        console.log(this.state, '====STATE======');
        const options = {
            animationEnabled: true,
            //exportEnabled: true,
            theme: "light2", //"light1", "dark1", "dark2"
            data: this.state.dataPoints
            // data: [
            //     {
            //         type: "line",
            //         name: "Footfall",
            //         color: "#369EAD",
            //         showInLegend: true,
            //         dataPoints: [
            //             { label: 'FAB', bankCode: 'a12B', x: 12, y: 10 },
            //             { label: "orange", bankCode: 'a12c', x: 12, y: 15 },
            //             { label: "banana", bankCode: 'a12a', x: 12, y: 25 },
            //             { label: "mango", bankCode: 'a12c', x: 12, y: 30 },
            //             { label: "grape", bankCode: 'a12d', x: 12, y: 28 },
            //             { label: "apple", bankCode: 'a12e', x: 12, y: 1 },
            //             { label: "orange", bankCode: 'a12f', x: 12, y: 25 },
            //             { label: "banana", bankCode: 'a12g', x: 12, y: 35 },
            //             { label: "mango", bankCode: 'a12h', x: 12, y: 20 },
            //             { label: "grape", bankCode: 'a12i', x: 12, y: 58 }
            //         ]
            //     },
            //     {
            //         name: "Mango",
            //         color: "#369EAD",
            //         showInLegend: true,
            //         type: "line",
            //         dataPoints: [
            //             { label: "apple", y: 1 },
            //             { label: "orange", y: 25 },
            //             { label: "banana", y: 35 },
            //             { label: "mango", y: 20 },
            //             { label: "grape", y: 58 }
            //         ]
            //     },
            //     {
            //         type: "line",
            //         name: "Footfall",
            //         color: "#369EAD",
            //         showInLegend: true,
            //         dataPoints: [
            //             { label: "apple", y: 120 },
            //             { label: "orange", y: 45 },
            //             { label: "banana", y: 15 },
            //             { label: "mango", y: 10 },
            //             { label: "grape", y: 58 }
            //         ]
            //     }
            // ]
        }
        return (
            <div>
                {/* <ReactModal 
           isOpen={this.state.showModal}
           contentLabel="CanvasJS Chart within React Modal"
        > */}
                {/* <button onClick={this.handleCloseModal}>Close Modal</button> */}
                <CanvasJSChart options={options} />
                {/* </ReactModal> */}
            </div>
        );
    }
}

const props = {};

export default MultiLineChart
