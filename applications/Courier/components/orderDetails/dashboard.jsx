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

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: [],
            typeData: undefined,
            getDashboardData: undefined,
            fromDateWrkBrd: '01/01/1970',
            toDateWrkBrd: '01/01/2020',
            CBVLabels: undefined,
            CBVData: undefined,
            isLoading: true
        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData,
            requestCreator.createTypeDataRequest([
                'dc-hsCodeFilter'
            ]));
        this.props.actions.generalProcess(constants.getDashboardData, {})
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData && nextProps.getDashboardData) {
            let CBVLabels = []
            let CBVData = []

            nextProps.getDashboardData.data.courierByValue.forEach(element => {
                CBVLabels.push(element.name)
                CBVData.push(element.value)
            })

            this.setState({
                getDashboardData: nextProps.getDashboardData.data,
                typeData: nextProps.typeData,
                CBVLabels: CBVLabels,
                CBVData: CBVData,
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
                    data: [this.state.getDashboardData.orderTracking.finalized, this.state.getDashboardData.orderTracking.hawbCreated, this.state.getDashboardData.orderTracking.exportCleared, this.state.getDashboardData.orderTracking.delivered, this.state.getDashboardData.orderTracking.returnByCustomer, this.state.getDashboardData.orderTracking.undelivered, this.state.getDashboardData.orderTracking.importCleared, this.state.getDashboardData.orderTracking.partialReturn, this.state.getDashboardData.orderTracking.fullReturn]
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
                        <TileUnit col="4" data={[{ "id": 1, "title": "Couriers", "value": this.state.getDashboardData.summary.couriers, "actionURI": "", "overDue": "", "fontClass": "green-steel", "percentageTag": false }, { "id": 2, "title": "Orders", "value": this.state.getDashboardData.summary.orders, "actionURI": "", "overDue": "", "fontClass": "green-turquoise", "percentageTag": false }, { "id": 3, "title": "Returns", "value": this.state.getDashboardData.summary.returns, "actionURI": "", "overDue": "", "fontClass": "green-meadow", "percentageTag": false }]} />
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
                    <Portlet>
                        <Row>
                            <Col col="6">
                                <Label text="Option" columns="3"></Label>
                                <Combobox fieldname='option' formname='topHS' columns='8' style={{}}
                                    state={this.state} typeName="dc-hsCodeFilter"
                                    dataSource={this.state.typeData} multiple={false} actionHandler={this.generalHandler} />
                            </Col>
                        </Row>
                        <Row>
                            <h2><Label text={'Top '+this.state.getDashboardData.filterCriteria}></Label></h2>
                        </Row>
                        <Row>
                            <Col>
                                <HorizontalbarChartTechnician key={Math.random()} data={this.state.getDashboardData.topStats} labels={["Export Declarations"]} stack="single" dataLabelsAttribute="hsCode" dataValuesAttributes={["expDec"]} backgroundColors={['#337ab7']} />
                            </Col>
                        </Row>
                    </Portlet>

                    <div className="row">
                        <Col col="6">
                            <Portlet title="Analysis By Value">
                                <PieChart labels={['Return', 'Delivered']} data={[this.state.getDashboardData.analysisByValue.return, this.state.getDashboardData.analysisByValue.delivered]} height={200} backgroundColor={['#4472C4', '#ED7D31']} />
                            </Portlet>
                        </Col>
                        <Col col="6">
                            <Portlet title="Courier By Value">
                                <PieChart labels={this.state.CBVLabels} data={this.state.CBVData} height={200} backgroundColor={['#F8CA00', '#BD1550', '#70C92F']} />
                            </Portlet>
                        </Col>
                    </div>
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
        getDashboardData: state.app.getDashboardData
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
Dashboard.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);