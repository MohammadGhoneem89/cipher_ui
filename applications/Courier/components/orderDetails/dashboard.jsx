/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Wrapper from '../../common/Wrapper.jsx';
import Row from '../../common/Row.jsx';
import Input from '../../common/Input.jsx';
import Label from '../../common/Lable.jsx';;
import Combobox from '../../common/Select.jsx';
import Col from '../../common/Col.jsx';;
import Table from '../../common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';
import * as gen from '../../common/generalActionHandler'
import Portlet from '../../common/Portlet.jsx';
import Checklist from '../../common/CheckList.jsx';
import HorizontalBarChart from '../../common/charts/HorizontalBarChart.jsx';
import PieChart from '../../common/charts/PieChart.jsx';
import { Bar, Line } from 'react-chartjs-2';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import HorizontalbarChartTechnician from '../../common/charts/HorizontalbarChartTechnician.jsx';

const data = {
    labels: ['Rule 1', 'Rule 2', 'Rule 3', 'Rule 4', 'Rule 5', 'Rule 6'],
    datasets: [
        {
            label: 'Rules',
            fill: false,
            backgroundColor: '#ed6b75',
            borderColor: '#ed6b75',
            borderWidth: 1,
            hoverBackgroundColor: '#ed6b75',
            hoverBorderColor: '#ed6b75',
            data: [65, 59, 80, 81, 56, 55]
        }
    ]
};

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: [],
            typeData: undefined,
            getRuleHitSummary: undefined,
            fromDateWrkBrd: '01/01/1970',
            toDateWrkBrd: '01/01/2020',
            isLoading: false
        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData,
            requestCreator.createTypeDataRequest([
                'et-FDHType'
            ]));
        //this.props.actions.generalProcess(constants.getRuleHitSummary, {})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData && nextProps.getRuleHitSummary) {
            this.setState({
                getRuleHitSummary: nextProps.getRuleHitSummary.data.searchResult,
                typeData: nextProps.typeData,
                isLoading: false
            });
        }
    }


    ActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Delete":
                let result = confirm("Are you you want to delete?");
                if (result) {
                    if (index > -1) {
                        let a = this.state.relationshipData;
                        a.splice(index, 1);
                        this.setState({ relationshipData: a });
                    }
                }
                break;
            default:
                break;
        }
    }

    getRuleHitData() {
        // let labels = []
        // let chartData = []
        // let searchResult = _.clone(this.state.getRuleHitSummary.ruleHit) 
        // searchResult.forEach(element => {
        //     labels.push(element.ruleId)
        //     chartData.push(parseInt(element.count))
        // });

        let data = {
            labels: ["Finalized", "HAWB Created", "Export Cleared", "Deliverd", "Return By Customer", "Undelivered", "Import Cleared", "Partial Return", "Full Return"],
            datasets: [
                {
                    label: '',
                    fill: false,
                    backgroundColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    borderColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    borderWidth: 1,
                    hoverBackgroundColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    hoverBorderColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    data: ["17", "26", "30", "19", "35", "30", "27", "30", "20"]
                }
            ]
        };
        return data
    }

    dateChangeWorkboard(toDate, fromDate) {
        this.setState({
            fromDateWrkBrd: fromDate,
            toDateWrkBrd: toDate
        });

        let request = {
            searchCriteria: {
                fromDate: fromDate,
                toDate: toDate
            }
        };
        //this.props.actions.generalProcess(constants.getRuleHitSummary, request);
    }

    render() {
        console.log("state-->", this.state)
        if (!this.state.isLoading)
            return (
                <Wrapper daterange={true} onDateChange={this.dateChangeWorkboard} title="Workboard">

                    <div className="row">
                        <TileUnit col="4" data={[{ "id": 1, "title": "Couriers", "value": 1, "actionURI": "", "overDue": "", "fontClass": "green-steel", "percentageTag": false }, { "id": 2, "title": "Orders", "value": 50, "actionURI": "", "overDue": "", "fontClass": "green-turquoise", "percentageTag": false }, { "id": 3, "title": "Returns", "value": 1, "actionURI": "", "overDue": "", "fontClass": "green-meadow", "percentageTag": false }]} />
                    </div>
                    <Portlet title="Order Tracking">
                        <Row>
                            <Col col="6">
                                <Label text="Courier" columns="3"></Label>
                                <Input fieldname='courier' formname='tracking' state={this.state}
                                    columns='8' style={{}} actionHandler={this.generalHandler} />
                            </Col>
                            <Col col="6">
                                <Label text="E-Commerce" columns="3"></Label>
                                <Input fieldname='ecommerce' formname='tracking' state={this.state}
                                    columns='8' style={{}} actionHandler={this.generalHandler} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Bar
                                    data={this.getRuleHitData()}
                                    width={50}
                                    height={250}
                                    options={{
                                        legend: {
                                            display: false,
                                        },
                                        maintainAspectRatio: false,
                                        scales: {
                                            xAxes: [{
                                                ticks: {
                                                    stepSize: 1
                                                },
                                                categorySpacing: 0
                                            }],
                                            yAxes: [{
                                                ticks: {
                                                    beginAtZero: true
                                                }
                                            }]
                                        },
                                        plugins: {
                                            datalabels: {
                                                formatter: function (value, ctx) {
                                                    return null;
                                                },
                                            }
                                        },
                                    }}
                                />
                            </Col>
                        </Row>
                    </Portlet>
                    <Portlet title="Top HS Code">
                        <Row>
                            <Col col="6">
                                <Label text="Option" columns="3"></Label>
                                <Combobox fieldname='option' formname='topHS' columns='8' style={{}}
                                    state={this.state} typeName="regions"
                                    dataSource={this.state} multiple={false} actionHandler={this.generalHandler} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <HorizontalbarChartTechnician key={Math.random()} data={[{ technician: "HS Code 1", reported: "5" }, { technician: "HS Code 2", reported: "6" }, { technician: "HS Code 3", reported: "9" }, { technician: "HS Code 4", reported: "11" }, { technician: "HS Code 5", reported: "22" }]} labels={["Export Declarations"]} stack="single" dataLabelsAttribute="hsCode" dataValuesAttributes={["expDec"]} backgroundColors={['#337ab7']} />
                            </Col>
                        </Row>
                    </Portlet>

                    <div className="row">
                        <Col col="6">
                            <Portlet title="Analysis By Value">
                                <PieChart labels={['Return', 'Return']} data={[1, 5]} height={200} backgroundColor={['#4472C4', '#ED7D31']} />
                            </Portlet>
                        </Col>
                        <Col col="6">
                            <Portlet title="Courier By Value">
                                <PieChart labels={['Courier 1', 'Courier 2', 'Courier 3']} data={[5, 2, 1]} height={200} backgroundColor={['#F8CA00', '#BD1550', '#70C92F']} />
                            </Portlet>
                        </Col>
                    </div>
                    

                    {/* <Row>
                        <div className="text-center">
                            <Checklist fieldname='eidList' formname='eid' columns='12' style={{}}
                                state={this.state}
                                typeName="et-FDHType"
                                dataSource={this.state.typeData}
                                actionHandler={this.generalHandler}
                            />
                        </div>
                    </Row>
                    <Row>
                        <Col col={6}>
                            <Label text='Region' columns='2' />
                            <Combobox fieldname='regions' formname='eid' columns='10' style={{}}
                                state={this.state} typeName="regions"
                                dataSource={this.state} multiple={false} actionHandler={this.generalHandler} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col col={6}>
                            <Label text="OLT:" columns='2' />
                            <Input fieldname='olt' formname='eid' state={this.state}
                                columns='10' style={{}} actionHandler={this.generalHandler} />
                        </Col>
                        <Col col={6}>
                            <Label text="FDH:" columns='2' />
                            <Input fieldname='fdh' formname='eid' state={this.state}
                                columns='10' style={{}} actionHandler={this.generalHandler} />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <div className="col-md-4">
                            <Portlet title="Recon">
                                <PieChart labels={['Reconciled', 'Exception', 'Pending', 'Manual Correct']} data={[5, 2, 3, 1]} height={200} backgroundColor={['#29b950', '#ed6b75', '#F1C40F', '#337ab7']}/>

                            </Portlet>
                        </div>
                        <div className="col-md-4">
                            <Portlet title="Notify">
                                <PieChart labels={['No Notifications', 'Un Handled', 'Pending']} data={[this.state.getRuleHitSummary.total - this.state.getRuleHitSummary.initiated - this.state.getRuleHitSummary.pending, this.state.getRuleHitSummary.initiated, this.state.getRuleHitSummary.pending ]} height={200} backgroundColor={['#29b950', '#ed6b75', '#F1C40F']} />

                            </Portlet>
                        </div>
                        <div className="col-md-4">

                            <div className="innerbox whiteBox at-connections">
                                <div className="innerBox-title">
                                    <h5 style={{ marginLeft: "10px" }}>Connections</h5>
                                </div>
                                <div className="innerBox-Content">
                                    <div className="insidecontent">
                                        <div className="row">
                                            <div className="col-md-10 col-md-offset-1 text-center">
                                                <div className="col-md-5">
                                                    <div className="ConDigit">
                                                        <h1>15</h1>
                                                    </div>
                                                </div>
                                                <div className="col-md-7 text-center">
                                                    <div className="BoxAction"><a href="#"><i className="fa fa-check" aria-hidden="true"></i></a></div>
                                                    <div className="ConnStatus">
                                                        <span>Corrections are Done</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <Portlet title="Records by Rules">
                                <Row>
                                    <div className="col-md-12">
                                        <Bar
                                            data={this.getRuleHitData()}
                                            width={50}
                                            height={250}
                                            options={{
                                                maintainAspectRatio: false,
                                                scales: {
                                                    xAxes: [{
                                                        ticks: {
                                                            stepSize: 1
                                                        },
                                                        categorySpacing: 0,
                                                        barThickness: 15
                                                    }],
                                                    yAxes: [{
                                                        ticks: {
                                                            beginAtZero: true
                                                        }
                                                    }]
                                                }
                                            }}
                                        />
                                    </div>
                                </Row>
                            </Portlet>
                        </Col>
                    </Row> */}
                </Wrapper>
            );
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}


function mapStateToProps(state, ownProps) {
    return {
        // listNotificationRules: _.get(state.app, 'listNotificationRules.data.searchResult', []),
        typeData: _.get(state.app.typeData, 'data', undefined),
        getRuleHitSummary: state.app.getRuleHitSummary,
        isLoading: true
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
Dashboard.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);