import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Wrapper from '../../common/Wrapper.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Input from '../../common/Input.jsx';
import Label from '../../common/Lable.jsx';
import Portlet from '../../common/Portlet.jsx';
import Combobox from '../../common/Select.jsx';
import Radio from '../../common/Radio.jsx';
import Table from '../../common/Datatable.jsx';
import PieChart from './PieChart.jsx';
//import { HorizontalBar } from 'react-chartjs-2';
import HorizontalBarChart from './HorizontalBarChart.jsx';
import Map from "./Map.jsx";
import { InfoWindow, withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { Bar } from 'react-chartjs-2';
//react-chartjs-2

const divStyle = {
    display: 'flex',
    alignItems: 'center'
  };

/*const data = {
    labels: ['a', 'b', 'c', 'd', 'e'],
    datasets: [
        {
            stack: 'stack1',
            label: 'data1',
            backgroundColor: 'rgba(255,99,132,0.1)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [1, 2, 3, 4, 5]
        },
        {
            stack: 'stack1',
            label: 'data2',
            backgroundColor: 'rgba(255,99,132,0.3)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [3, 1, 5, 6, 2]
        }
    ]
}

const data2 = {
    labels: ['f', 'g', 'h', 'i', 'j'],
    datasets: [
        {
            stack: 'stack1',
            label: 'data2',
            backgroundColor: 'rgba(255,99,132,0.1)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [1, 2, 3, 4, 5]
        }
    ]
}

*/
class SamplePieChart extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                <Wrapper title="Data Structure">

                    <Row>
                        <Col col="6">

                            <div className="innerbox whiteBox">
                                <div className="innerBox-title">
                                    <h5>Recon</h5>
                                </div>

                                <div className="innerBox-Content">
                                    <Row>
                                        <PieChart correct={70} problem={10} accepted={10} rejected={10} height={150} />
                                    </Row>
                                </div>
                            </div>

                        </Col>
                        <div className="col-md-6">
                            <div className="innerbox whiteBox">
                                <div className="innerBox-title">
                                    <h5>Attribute Wise Problems</h5>
                                </div>

                                <div className="innerBox-Content">


                                <HorizontalBarChart data={[{attribute:'eid', accepted: '4', reported: '8'}, {attribute:'flat', accepted: '6', reported: '9'}]} label={['Accepted', 'Problem Reported']}
                                       
                                       options={{
                                           responsive: true,
                                           maintainAspectRatio: true
                                       }} />
                                </div>
                            </div>
                        </div>
                    </Row>


                    <Row>
                        <div className="col-md-6">
                            <div className="innerbox whiteBox">
                                <div className="innerBox-title">
                                    <h5>Last X Days</h5>
                                </div>

                                <div className="innerBox-Content">
                                    <Row>
                                        <HorizontalBarChart a={3} b={5} c={1} d={2} e={4} label={'data2'}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} />
                                    </Row>
                                </div>
                            </div>
                        </div>
                        <div className style={divStyle}>

                            <h4>Customer Location</h4>
                            <div className="Original">
                                <img src={"http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"} width="50" height="50" />

                                <label>

                                    <b>Original</b>
                                </label>
                            </div>

                            <div className="Standing at">
                                <img src={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"} width="50" height="50" />

                                <label>

                                    <b>Standing At</b>
                                </label>
                            </div>

                            <div className="Corrected">
                                <img src={"http://maps.google.com/mapfiles/ms/icons/red-dot.png"} width="50" height="50" />

                                <label>

                                    <b>Corrected</b>
                                </label>
                            </div>
                        </div>
                        <br />
                        <div>

                            <Map
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJn2Pqx6Pe_faA0DLLWUkHo1iXEOBXBvs"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `200px` }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                                center={{ lat: 24.4539, lng: 54.3773 }}
                                zoom={13}
                                prelocation={[{
                                    id: 0,
                                    lat: 24.465931632571458,
                                    lng: 54.38462421700376
                                },
                                {
                                    id: 1,
                                    lat: 24.45999408740553,
                                    lng: 54.37346622750181

                                }
                                    //{
                                    //  id: 2,
                                    //lat: 24.46999418740553,
                                    //lng: 54.37846622750181

                                    //    }
                                ]}
                            />
                        </div>
                    </Row>
                    <Row>
                        <div className="col-md-6">
                            <div className="innerbox greenbox">
                                <div className="innerBox-title">
                                    <h5>CSS</h5>
                                </div>

                                <div className="innerBox-Content">
                                    <div className="insidecontent at-owner">
                                        <div className="row">
                                            <div className="col-md-10 col-md-offset-1 text-center">
                                                <div className="col-md-5">
                                                    <div className="cssimg"><img src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_thumb,h_256,w_256,f_auto,g_faces,z_0.7,q_auto:eco/zc0tdsiaoow8sskoonzb" /></div>
                                                </div>
                                                <div className="col-md-7 text-left">
                                                    <div className="personInfo">
                                                        <span className="Idno">ID: 3465461</span>
                                                        <h5 className="type">Type: Technician</h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </Row>



                </Wrapper>
            </div >
        )

    }
}

function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
SamplePieChart.displayName = "Sample PieChart";
export default connect(mapStateToProps, mapDispatchToProps)(SamplePieChart);


