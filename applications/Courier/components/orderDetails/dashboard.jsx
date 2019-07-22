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
import moment from 'moment'
let interval;
class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            regions: [],
            typeData: undefined,
            getDashboardData: undefined,
            fromDateWrkBrd: moment().subtract(29, 'days').format('YYYY-MM-DD'),
            toDateWrkBrd: moment().format('YYYY-MM-DD'),
            CBVLabels: undefined,
            CBVData: undefined,
            hsTitile: 'E-Commerce Company',
            topHS:{option: 'E-Commerce Company'},
            isLoading: true,
            ecommerce: '001'
        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.customActionHandler = customActionHandler.bind(this);
        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
        this.sendCall = this.sendCall.bind(this)
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData,
            requestCreator.createTypeDataRequest([
                'dc-hsCodeFilter'
            ]));
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: this.state.fromDateWrkBrd,
                    endDate: this.state.toDateWrkBrd,
                    ecommerce: this.state.ecommerce
                }
            })
            interval = setInterval(() => {
                this.props.actions.generalProcess(constants.getDashboardData, {
                    action: 'getDashboardData',
                    searchCriteria: {
                        startDate: this.state.fromDateWrkBrd,
                        endDate: this.state.toDateWrkBrd,
                        ecommerce: this.state.ecommerce
                    }
                })
            }, 10000);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData && nextProps.getDashboardData) {
            let CBVLabels = []
            let CBVData = []
            let courierByValue = _.get(nextProps, 'getDashboardData.data.courierByValue', []);
            courierByValue.forEach(element => {
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

        let orderTracking = _.get(this.state, 'getDashboardData.orderTracking', undefined);

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
                    data: orderTracking ? [orderTracking.FINALIZED, orderTracking.HAWBCREATED, orderTracking.EXPORTCLEARED, orderTracking.DELIVERED, orderTracking.RETURNBYCUSTOMER, orderTracking.UNDELIVERED, orderTracking.IMPORTCLEARED, orderTracking.PARTIALRETURN, orderTracking.FULLRETURN] : []
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

        console.log('to check the case', fromDate, toDate)
        this.props.actions.generalProcess(constants.getDashboardData, {
            action: 'getDashboardData',
            searchCriteria: {
                startDate: moment(fromDate, 'YYYY-MM-DD').startOf('day'),
                endDate: moment(toDate, 'YYYY-MM-DD').startOf('day')
            }
        })
    }

    sendCall = (topHS) => {
        this.setState({
            topHS:{option: topHS},
            hsTitile: topHS
        });
        if (topHS && topHS === 'E-Commerce Company') {
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: moment(this.state.fromDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    endDate: moment(this.state.toDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    ecommerce: '001'
                }
            })
            this.setState({
                ecommerce: '001'
            })
        }
        else if (topHS && topHS === 'Destination Country') {
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: moment(this.state.fromDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    endDate: moment(this.state.toDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    ecommerce: '002'
                }
            })
            this.setState({
                ecommerce: '002'
            })
        } else if (topHS && topHS === 'HS Code') {
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: moment(this.state.fromDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    endDate: moment(this.state.toDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    ecommerce: '003'
                }
            })
            this.setState({
                ecommerce: '003'
            })
        }
    }

    componentWillUnmount() {
        console.log('interval', interval);
        clearInterval(interval)
        console.log('interval', interval);

    }

    render() {
        console.log("state-->", this.state)
        if (!this.state.isLoading)
            return (
                <Wrapper daterange={true} onDateChange={this.dateChangeWorkboard} title="Workboard">

                    <div className="row">
                        <TileUnit col="4" data={[{
                            "id": 1, "title": "Couriers", "value": _.get(this.state, 'getDashboardData.summary.couriers', 0),
                            "actionURI": "", "overDue": "", "fontClass": "green-steel", "percentageTag": false
                        }, {
                            "id": 2, "title": "Orders",
                            "value": _.get(this.state, 'getDashboardData.summary.orders', 0), "actionURI": "", "overDue": "", "fontClass": "green-turquoise",
                            "percentageTag": false
                        }, {
                            "id": 3, "title": "Returns", "value": _.get(this.state, 'getDashboardData.summary.returns', 0),
                            "actionURI": "", "overDue": "", "fontClass": "green-meadow", "percentageTag": false
                        }]} />
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
                    <Portlet title={'Top ' + this.state.hsTitile}>
                        <Row>
                            <Col col="6">
                                <Label text="Option" columns="3"></Label>
                                <Combobox fieldname='option' formname='topHS' columns='8' style={{}}
                                    state={this.state} typeName="dc-hsCodeFilter"
                                    dataSource={this.state.typeData} multiple={false} actionHandler={this.customActionHandler} />
                            </Col>
                        </Row>
                        {/* <Row>
                            <h2><Label text={}></Label></h2>
                        </Row> */}
                        <Row>
                            <Col>
                                <HorizontalbarChartTechnician key={Math.random()} data={_.get(this.state, 'getDashboardData.topStats', [])} labels={["Export Declarations"]} stack="single" dataLabelsAttribute="hsCode" dataValuesAttributes={["expDec"]} backgroundColors={['#337ab7']} />
                            </Col>
                        </Row>
                    </Portlet>

                    <div className="row">
                        <Col col="6">
                            <Portlet title="Analysis By Value">
                                <PieChart key={Math.random()} labels={['Return', 'Delivered']} data={[_.get(this.state, 'getDashboardData.analysisByValue.return', 0), _.get(this.state, 'getDashboardData.analysisByValue.delivered', 0)]} height={200} backgroundColor={['#4472C4', '#ED7D31']} />
                            </Portlet>
                        </Col>
                        <Col col="6">
                            <Portlet title="Courier By Value">
                                <PieChart key={Math.random()} labels={this.state.CBVLabels} data={this.state.CBVData} height={200} backgroundColor={['#F8CA00', '#BD1550', '#70C92F']} />
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
        getDashboardData: _.get(state.app, 'getDashboardData', undefined)
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
function customActionHandler(formname, fieldname, type, e) {
    let value = e.target.value;
    this.sendCall(value)
}
Dashboard.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);