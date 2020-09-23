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
import HorizontalBarChartNew from '../../common/charts/HorizontalBarChartNew.jsx';
import HorizontalStackedBarChart from '../../common/charts/horizontalStackedBarChart.jsx';
import PieChart from '../../common/charts/PieChart.jsx';
import VerticalBarChart from '../../common/charts/VerticalBarChart.jsx';
import MultiLineChart from '../../common/charts/multiLineChart.jsx';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import moment from 'moment';

import { Multiselect } from 'multiselect-react-dropdown';

import jsonData from '../../common/dummyData/dashboard.json';
import bankColors from '../../../config/bank-colors';
import DashboardFilters from './dashboardFilters.jsx';
import AutomaticallyTextSizingChart from '../../common/charts/automaticallyTextSizingChart.jsx';
import BubbleChart from '../../common/charts/react-bubble-chart.jsx';
import { indexOf } from 'lodash';

let interval;
class EcommerceDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedYears: [],
            options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
            selectedQuarters: [],
            selectedMonths: [],
            selectedZone: [],
            regions: [],
            typeData: undefined,
            getDashboardData: undefined,
            fromDateWrkBrd: moment().subtract(29, 'days').format('DD/MM/YYYY'),
            toDateWrkBrd: moment().format('DD/MM/YYYY'),
            CBVLabels: undefined,
            CBVData: undefined,
            hsTitile: 'E-Commerce Company',
            topHS: { option: 'E-Commerce Company' },
            isLoading: false,
            ecommerce: '001',
            tracking: {
                courier: "",
                ecommerce: ""
            }
        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.customActionHandler = customActionHandler.bind(this);
        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
        this.sendCall = this.sendCall.bind(this);
        this.generalActionHandler = gen.generalHandler.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    componentDidMount() {

        //  for (let req = 0; req <= 4;) {
        //     console.log(req);
        this.getGraphData()
        // }
        //  }
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData,
            requestCreator.createTypeDataRequest([
                'dc-hsCodeFilter',
            ]));

        this.props.actions.generalProcess(constants.orgList, { action: "entityList", page: { currentPageNo: 1, pageSize: 100 } });
        // this.props.actions.generalProcess(constants.getDashboardData, {
        //     action: 'getDashboardData',
        //     searchCriteria: {
        //         startDate: this.state.fromDateWrkBrd,
        //         endDate: this.state.toDateWrkBrd,
        //         ecommerce: this.state.ecommerce
        //     }
        // })
        // interval = setInterval(() => {
        //     this.props.actions.generalProcess(constants.getDashboardData, {
        //         action: 'getDashboardData',
        //         searchCriteria: {
        //             startDate: this.state.fromDateWrkBrd,
        //             endDate: this.state.toDateWrkBrd,
        //             ecommerce: this.state.ecommerce,
        //             trackCourier: this.state.tracking.courier,
        //             trackEcommerce: this.state.tracking.ecommerce
        //         }
        //     })
        // }, 10000);
    }

    graphRequestBody(widget) {
        let obj = {
            "body": {
                "widgetId": `widget${widget}`,
                "valueType": "byCount",
                "outputWidgetType": "pieChart",
                "period": {
                    "year": this.state.selectedYears,
                    "quarter": this.state.selectedQuarters,
                    "month": this.state.selectedMonths,
                    "fromDate": this.state.fromDate,
                    "toDate": this.state.toDate
                },
                "zone": {
                    "freezone": {
                        "freezoneAll": false,
                        "freezones": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "warehouse": {
                        "warehouseAll": false,
                        "warehouses": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "isMainland": false
                },
                "providers": {
                    "providerAll": true,
                    "eCommmerce": {
                        "eCommerceAll": false,
                        "eCommerce": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "logistics": {
                        "logisticsAll": false,
                        "logistics": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "courier": {
                        "courierAll": false,
                        "couriers": [
                            "",
                            "",
                            ""
                        ]
                    }
                }
            }
        }
    }

    async getGraphData() {
        // for (let req = 0; req <=2;) {
        //     console.log(req);
        // }
        let array = [1, 2, 3, 4, 5, 7];
        array.filter(async x => {
            console.log(x);
            let obj = {
                "body": {
                    "widgetId": `widget${x}`,
                    "valueType": "byCount",
                    "outputWidgetType": "pieChart",
                    "period": {
                        "year": [
                            "",
                            "",
                            ""
                        ],
                        "quarter": [
                            "",
                            "",
                            ""
                        ],
                        "month": [
                            "",
                            "",
                            ""
                        ],
                        "fromDate": "",
                        "toDate": ""
                    },
                    "zone": {
                        "freezone": {
                            "freezoneAll": false,
                            "freezones": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "warehouse": {
                            "warehouseAll": false,
                            "warehouses": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "isMainland": false
                    },
                    "providers": {
                        "providerAll": true,
                        "eCommmerce": {
                            "eCommerceAll": false,
                            "eCommerce": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "logistics": {
                            "logisticsAll": false,
                            "logistics": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "courier": {
                            "courierAll": false,
                            "couriers": [
                                "",
                                "",
                                ""
                            ]
                        }
                    }
                }
            }
            await this.props.actions.generalAjxProcess(constants.getGraphDashboardData, obj).then(res => {
                // req++
            });
        })
        //  req++
        // if (req == 1) {
    }

    graphCreator(graphProps) {
        console.log(graphProps, 'GP');
        // dummyProps.widgetData.map(widget => {
        if (graphProps.widgetData.widgetType == 'pieChart') {
            let labels = [];
            let values = [];

            graphProps.widgetData.graphData.data.forEach(data => {
                // console.log(data);
                labels.push(data.label)
                values.push(data.count)
            })
            let chart = <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={labels} data={values} height={120}
                // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
                backgroundColor={['#9e9e9e', '#ff9800', '#2196f3']} />

            this.setState({
                [graphProps.widgetData.widgetId]: chart
            })
        }

        if (graphProps.widgetData.widgetType == '2ValueBar-Horizontal') {
            let x = [];
            let y = [];
            // let z = [];
            let dataArray = [];
            let minRange = 0;
            let maxRange = 0;
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    // z.push(data.zIndex.value)
                })
            } else {

                let sortedValueArray = graphProps.widgetData.graphData.axisData.yAxis.value.sort((a, b) => a - b);
                maxRange = sortedValueArray[sortedValueArray.length - 1]
                graphProps.widgetData.graphData.data.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    let obj = {
                        entityName: data.xIndex.value,
                        value: data.yIndex.value,
                    }
                    dataArray.push(obj);
                })
                this.setState({
                    dataArray
                })
            }

            console.log(x);
            console.log(y);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <HorizontalBarChartNew minRange={10} maxRange={maxRange} stepSize={5} height={120} key={Math.random()}
                data={dataArray || []} labels={['Companies']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} backgroundColors={['#ff9800', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            this.setState({
                [graphProps.widgetData.widgetId]: chart
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueBar-Horizontal') {
            let x = [];
            let y = [];
            let z = [];
            let dataArray = [];
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    z.push(data.zIndex.value)
                })
            } else {
                graphProps.widgetData.graphData.data.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    if (data.zIndex && !z.includes(data.zIndex.value)) {
                        z.push(data.zIndex.value)
                    }
                    if (data.zIndex && data.zIndex.value == z[0]) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value1: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    } else if (data.zIndex) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value2: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    }

                })
                this.setState({
                    dataArray
                })
            }

            console.log(x);
            console.log(y);
            console.log(z);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()}
                data={dataArray || []} labels={z} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2']} backgroundColors={['#ff9800', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            this.setState({
                [graphProps.widgetData.widgetId]: chart
            })
        } if (graphProps.widgetData.widgetType == '3ValueBar-Vertical') {
            let x = [];
            let y = [];
            let z = [];
            let dataArray = [];
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    z.push(data.zIndex.value)
                })
            } else {
                graphProps.widgetData.graphData.data.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    if (data.zIndex && !z.includes(data.zIndex.value)) {
                        z.push(data.zIndex.value)
                    }
                    if (data.zIndex && data.zIndex.value == z[0]) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value1: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    } else if (data.zIndex) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value2: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    }

                })
                this.setState({
                    dataArray
                })
            }

            console.log(x);
            console.log(y);
            console.log(z);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()}
                data={dataArray || []} labels={z} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2']} backgroundColors={['#ff9800', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            this.setState({
                [graphProps.widgetData.widgetId]: chart
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'NextProps');
        // let dummyProps = {
        //     widgetData: {
        //         "widgetId": "widget1",
        //         "widgetType": "pieChart",
        //         "graphTitle": "Free Zone Wise Transactions",
        //         "graphData": {
        //             "data": [
        //                 {
        //                     "label": "Dubai south",
        //                     "count": 19
        //                 },
        //                 {
        //                     "label": "DAFZA",
        //                     "count": 30
        //                 },
        //                 {
        //                     "label": "JAFZA",
        //                     "count": 51
        //                 }
        //             ]
        //         }
        //     }
        // }
        Object.keys(nextProps).map((key, index) => {
            if (key.startsWith('widget') && Object.keys(nextProps[key]).length != 0) {
                this.graphCreator(nextProps[key]);
            }
        })
        // if (nextProps.widgetData.startsWith('widget')) {
        //     // graphCreator
        //     // dummyProps.widgetData.map(widget => {
        //     if (nextProps.widgetData.widgetType == 'pieChart') {
        //         let labels = [];
        //         let values = [];

        //         nextProps.widgetData.graphData.data.forEach(data => {
        //             // console.log(data);
        //             labels.push(data.label)
        //             values.push(data.count)
        //         })
        //         let chart = <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={labels} data={values} height={120}
        //             // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
        //             backgroundColor={['#9e9e9e', '#ff9800', '#2196f3']} />

        //         this.setState({
        //             [nextProps.widgetData.widgetId]: chart
        //         })
        //         if (nextProps.widgetData.widgetType == '3ValueBar-Horizontal') {
        //             let x = [];
        //             let y = [];
        //             let z = [];
        //             let dataArray = [];
        //             if (nextProps.widgetData.widgetId.toggle == 'value') {
        //                 nextProps.widgetData.graphData.byValue.forEach(data => {
        //                     // console.log(data);
        //                     x.push(data.xIndex.value)
        //                     y.push(data.yIndex.value)
        //                     z.push(data.zIndex.value)
        //                 })
        //             } else {
        //                 nextProps.widgetData.graphData.byCount.forEach(data => {
        //                     // console.log(data);
        //                     x.push(data.xIndex.value)
        //                     y.push(data.yIndex.value)
        //                     if (!z.includes(data.zIndex.value)) {
        //                         z.push(data.zIndex.value)
        //                     }
        //                     if (data.zIndex.value == z[0]) {
        //                         let obj = {
        //                             entityName: data.xIndex.value,
        //                             value1: data.yIndex.value,
        //                             type: data.zIndex.value
        //                         }
        //                         dataArray.push(obj);
        //                     } else {
        //                         let obj = {
        //                             entityName: data.xIndex.value,
        //                             value2: data.yIndex.value,
        //                             type: data.zIndex.value
        //                         }
        //                         dataArray.push(obj);
        //                     }

        //                 })
        //                 this.setState({
        //                     dataArray
        //                 })
        //             }

        //             // console.log(x);
        //             // console.log(y);
        //             // console.log(z);
        //             // console.log(dataArray);
        //             let chart = <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()}
        //                 data={dataArray || []} labels={z} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2']} backgroundColors={['#ff9800', '#2196f3']}
        //                 options={{
        //                     responsive: true,
        //                     maintainAspectRatio: true
        //                 }} />

        //             this.setState({
        //                 [nextProps.widgetData.widgetId]: chart
        //             })
        //         }
        //     }

        // }
        // if (dummyProps.widgetData) {
        //     // dummyProps.widgetData.map(widget => {
        //         if (dummyProps.widgetData.widgetType == 'pieChart') {
        //             let labels = [];
        //             let  values = [];

        //             dummyProps.widgetData.graphData.data.forEach(data => {
        //                 if (data.label) {
        //                     labels.push(data.label)
        //                 } else {
        //                     values.push(data.count)
        //                 }
        //             })
        //            let chart = <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={[labels.toString()]} data={[values.toString()]} height={120}
        //             // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
        //             backgroundColor={['#9e9e9e', '#ff9800', '#2196f3']} />

        //             this.setState({
        //                 [dummyProps.widgetData.widgetId]: chart
        //             })
        //         }
        //     // })
        // }
        if (jsonData.dashboardData && jsonData.dashboardData.barGraphAmountData) {
            this.setState({
                isLoading: false
            })
            let bankNames = []
            jsonData.dashboardData.barGraphAmountData.map(bank => {
                bankNames.push(bank.bankCode)
            })
            this.setState({
                bankNames,
                dashboardData: {
                    barGraphAmountData: jsonData.dashboardData.barGraphAmountData,
                    barGraphSubmissionData: jsonData.dashboardData.barGraphSubmissionData
                }
            })
        }

        if (jsonData.dashboardData) {
            this.setState({
                firstTile: jsonData.dashboardData.firstTile,
                secondTile: jsonData.dashboardData.secondTile,
                thirdTile: jsonData.dashboardData.thirdTile,
                fourthTile: jsonData.dashboardData.fourthTile,
            })
        }

        if (jsonData.dashboardData && jsonData.dashboardData.lineGraphData && this.state.bankNames && this.state.bankNames.length > 0) {
            this.setState({
                isLoading: false
            })
            let lineGraphData = [...jsonData.dashboardData.lineGraphData];
            let dataPoints = [];
            let convertedGraphData = [];
            // let name;
            lineGraphData.map((data, index) => {
                let dpObj = {
                    bankCode: data.bankCode,
                    label: moment(data.date.split('T')[0]).format('Do') + ' ' + moment(data.date.split('T')[0]).format('MMMM'),
                    y: +data.count
                }
                // name = data.bankCode
                dataPoints.push(dpObj)
            })

            this.state.bankNames.forEach((bank, index) => {
                let dataPointsNew = [];
                dataPoints.filter(data => {
                    if (bank == data.bankCode) {
                        dataPointsNew.push(data);
                    }
                })
                // console.log(this.getBankColors(bank))
                let obj = {
                    type: "line",
                    name: bank,
                    // color: "#" + ((1 << 24) * Math.random() | 0).toString(16),
                    color: this.getBankColors(bank)[0].color,
                    showInLegend: true,
                    dataPoints: dataPointsNew,
                }
                convertedGraphData.push(obj);
            })
            // console.log(convertedGraphData, "CGGGGG");
            this.setState({
                convertedGraphData
            })
        }
        if (jsonData.dashboardData && jsonData.dashboardData.pieChartData) {
            let financedCount = 0;
            let rejectedCount = 0;
            let purgedCount = 0;
            this.setState({
                isLoading: false
            })
            jsonData.dashboardData.pieChartData.map(data => {
                if (data.bankStatus == 'FINANCED') {
                    financedCount = + data.count;
                }
                if (data.bankStatus == 'REJECTED') {
                    rejectedCount = + data.count;
                }
                if (data.bankStatus == 'PURGED') {
                    purgedCount = + data.count;
                }

            })
            let calculatedScore = financedCount + rejectedCount + purgedCount;
            let financedRemainder = financedCount / calculatedScore;
            let rejectedRemainder = rejectedCount / calculatedScore;
            let purgedRemainder = purgedCount / calculatedScore;

            let financedPercentage = Math.round(financedRemainder * 100);
            let rejectedPercentage = Math.round(rejectedRemainder * 100);
            let purgedPercentage = Math.round(purgedRemainder * 100);

            this.setState({
                financedPercentage,
                rejectedPercentage,
                purgedPercentage
            })
        }

        if (jsonData.dashboardData != null && jsonData.dashboardData.ruleData.length == 0) {
            this.setState({
                ruleData: []
            })
        } else if (jsonData.dashboardData != null) {
            this.setState({
                ruleData: jsonData.dashboardData.ruleData
            })
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
            labels: ["Finalized", "HAWB Created", "Export Cleared", "Delivered", "Return By Customer", "Undelivered", "Import Cleared", "Partial Return", "Full Return"],
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

        // console.log('to check the case', fromDate, toDate)
        this.props.actions.generalProcess(constants.getDashboardData, {
            action: 'getDashboardData',
            searchCriteria: {
                startDate: fromDate,
                endDate: toDate,
                trackCourier: this.state.tracking.courier,
                trackEcommerce: this.state.tracking.ecommerce
            }
        })
    }

    sendCall = (topHS) => {
        this.setState({
            topHS: { option: topHS },
            hsTitile: topHS
        });
        if (topHS && topHS === 'E-Commerce Company') {
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: moment(this.state.fromDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    endDate: moment(this.state.toDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    ecommerce: '001',
                    trackCourier: this.state.tracking.courier,
                    trackEcommerce: this.state.tracking.ecommerce
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
                    ecommerce: '002',
                    trackCourier: this.state.tracking.courier,
                    trackEcommerce: this.state.tracking.ecommerce
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
                    ecommerce: '003',
                    trackCourier: this.state.tracking.courier,
                    trackEcommerce: this.state.tracking.ecommerce
                }
            })
            this.setState({
                ecommerce: '003'
            })
        }
    }

    componentWillUnmount() {
        // console.log('interval', interval);
        clearInterval(interval)
        // console.log('interval', interval);

    }

    applyFilter() {
        this.props.actions.generalProcess(constants.getDashboardData, {
            action: 'getDashboardData',
            searchCriteria: {
                startDate: this.state.fromDateWrkBrd,
                endDate: this.state.toDateWrkBrd,
                ecommerce: this.state.ecommerce,
                trackCourier: this.state.tracking.courier,
                trackEcommerce: this.state.tracking.ecommerce
            }
        })
    }

    clearFilter() {
        this.setState({
            tracking: {
                courier: "",
                ecommerce: ""
            }
        })
    }

    getBankColors(name) {
        return bankColors.filter(bank => {
            if (name == bank.name) {
                // console.log(bank.color)
                return bank.color
            }
        })
    }

    selectYear(value) {
        console.log(value);
        let array = [...this.state.selectedYears];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedYears: array
        })

    }

    selectQuarters(value) {
        console.log(value);
        let array = [...this.state.selectedQuarters];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedQuarters: array
        })

    }
    selectMonths(value) {
        console.log(value);
        let array = [...this.state.selectedMonths];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedMonths: array
        })

    }

    selectZone(value) {
        let array = [...this.state.selectedZone];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedZone: array
        })

    }

    render() {
        console.log("state-->", this.state)
        console.log("props-->", this.props)
        if (!this.state.isLoading)
            return (
                <Wrapper daterange={true} onDateChange={this.dateChangeWorkboard} title="Workboard">

                    <div className="portlet light bordered sdg_portlet">
                        <div className="row p-0">
                            <div className="col-md-2">
                                <div className="bg-blue-period">
                                    <span>
                                        Period
                </span>
                                </div>


                            </div>
                            <div className="col-md-10">
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Year
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2017')} checked={this.state.selectedYears.includes('2017')} name="2017" id="option1" />
                                                <label className={this.state.selectedYears.includes('2017') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2017
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-3 p-0">
                                        <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2018')} checked={this.state.selectedYears.includes('2018')} name="2018" id="option1" />
                                                <label className={this.state.selectedYears.includes('2018') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2018
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                        <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2019')} checked={this.state.selectedYears.includes('2019')} name="2019" id="option1" />
                                                <label className={this.state.selectedYears.includes('2019') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2019
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                        <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2020')} checked={this.state.selectedYears.includes('2020')} name="2020" id="option1" />
                                                <label className={this.state.selectedYears.includes('2020') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2020
                            </label>
                                            </div>
                                        </div>




                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Quarter
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option1" /> Quarter 1
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option2" /> Quarter 2
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option3" /> Quarter 3
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option4" /> Quarter 4
                            </label>
                                            </div>
                                        </div>




                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Monthly
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option1" /> 1
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option2" /> 2
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option3" /> 3
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option4" /> 4
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option5" /> 5
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option6" /> 6
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option7" /> 7
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option8" /> 8
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option9" /> 9
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option10" /> 10
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option11" /> 11
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option12" /> 12
                            </label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Date
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-2 p-0">
                                            <div className="bg-grey">
                                                <span>
                                                    From
                            </span>
                                            </div>
                                        </div>
                                        <div className="col-md-4 p-0">
                                            <input type="text" id="exampleForm2" className="form-control" />
                                        </div>

                                        <div className="col-md-2 p-0">
                                            <div className="bg-grey">
                                                <span>
                                                    To
                            </span>
                                            </div>

                                        </div>

                                        <div className="col-md-4 p-0">
                                            <input type="text" id="exampleForm2" className="form-control" />
                                        </div>


                                    </div>

                                </div>


                            </div>


                        </div>

                        <div className="row p-0 mt-1">
                            <div className="col-md-2">
                                <div className="bg-blue-period zone">
                                    <span>
                                        Zone
                            </span>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="row">
                                    <div className="col-xs-12 p-0">
                                        <nav>
                                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                <div className="col-md-12 p-0">
                                                    <a onClick={() => this.selectZone('All')} className={this.state.selectedZone.includes('All') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All</a>
                                                    <a onClick={() => this.selectZone('freeZone')} className={this.state.selectedZone.includes('freeZone') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Free Zone</a>
                                                    <a onClick={() => this.selectZone('customWarehouse')} className={this.state.selectedZone.includes('customWarehouse') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Custom Warehouse</a>
                                                    <a onClick={() => this.selectZone('mainLand')} className={this.state.selectedZone.includes('mainLand') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Mainland</a>
                                                </div>
                                            </div>
                                        </nav>
                                        <div className="tab-content py-3 px-3 px-sm-0 mt-2" id="nav-tabContent">
                                            <div className="tab-pane fade active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <div className="row">
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div className="form-group mb-2">
                                                    <input type="hidden" name="data[Server][0][id]" className="form-control" value="1" id="Server0Id" />
                                                    <div className="controls">
                                                        {/* <input type="hidden" name="data[Server][0][Vm]" value="" id="Server0Vm_">  */}
                                                        {/* <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="" value="ctrlr0451483t">All</option>
                                                                <option data-img="20x20/ffffff/000000" value="ipr0451483t">Dubai Airport Freezone</option>
                                                                <option data-img="20x20/000000/000000" value="ldap0451483t">Dubai South</option>
                                                                <option data-img="20x20" value="proxy0451483t">Custom Warehouse</option>
                                                            </optgroup>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                <div className="form-group mb-2">
                                                    {/* <input type="hidden" name="data[Server][0][id]" className="form-control" value="1" id="Server0Id">  */}
                                                    <div className="controls">

                                                        {/* <input type="hidden" name="data[Server][0][Vm]" value="" id="Server0Vm_">  */}
                                                        {/* <Multiselect
                                                            options={this.state.options}
                                                            displayValue="key"
                                                            showCheckbox={true}
                                                        /> */}
                                                        {/* <Multiselect
                                                            options={this.state.options} // Options to display in the dropdown
                                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                            onSelect={this.onSelect} // Function will trigger on select event
                                                            onRemove={this.onRemove} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        /> */}
                                                        {/* <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="" value="ctrlr0451483t">All</option>
                                                                <option data-img="20x20/ffffff/000000" value="ipr0451483t">Dubai Airport Freezone</option>
                                                                <option data-img="20x20/000000/000000" value="ldap0451483t">Dubai South</option>
                                                                <option data-img="20x20" value="proxy0451483t">Custom Warehouse</option>
                                                            </optgroup>
                                                        </select> */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>







                    </div>

                    <div className="row">
                        <div className="">
                            {/* <div className="col-md-12">
                                <DashboardFilters />
                            </div> */}
                            <div className="col-md-6">
                                <Portlet title={"Free Zone Wise Transactions"} noCollapse={false}>

                                    <div className="refresh-img-div">
                                        <div className="content-toggle">
                                            <label htmlFor="">Volume</label>
                                            <label className="switch">
                                                <input type="checkbox" />
                                                <span className="slider round"></span>
                                            </label>
                                            <label htmlFor="">Value</label>
                                        </div>
                                        <img className="refresh-img" src="\assets\Resources\images\refresh.svg" alt="" />
                                    </div>
                                    {this.state.widget1}
                                    {/* <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={['FINANCED', 'REJECTED', 'PURGED']} data={[this.state.financedPercentage, this.state.rejectedPercentage, this.state.purgedPercentage]} height={120}
                                        // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
                                        backgroundColor={['#9e9e9e', '#ff9800', '#2196f3']} /> */}
                                </Portlet>
                            </div>
                            <div className="col-md-6">
                                <Portlet title={"Rule Performance"} noCollapse={true} style={{ height: '216px' }}>
                                    <div className="refresh-img-full-div">
                                        <img className="refresh-img-full" src="\assets\Resources\images\refresh.svg" alt="" />
                                    </div>
                                    {/* <h2 id="downloadPdf" onClick={() => this.CreatePDFfromHTML('rule-graph')}>DOWNLOAD PDF</h2> */}
                                    <div id="rule-graph" className="col-md-12">
                                        {/* <a href="#" onClick={() => this.downloadRuleCSV(this.props.dashboardData.ruleData)} className="btn-success">Download CSV</a> */}
                                        {this.state.widget7}
                                        {/* {this.state.ruleData && (
                                            <VerticalBarChart key={Math.random()} data={[..._.get(this.state, 'ruleData', [])]} labels={['Hit Count', 'Not Hit Count']} stack="multiple" dataLabelsAttribute="riskname" dataValuesAttributes={["hitcount", "nothitcount"]} backgroundColors={['#ff9800', '#2196f3']}
                                         height={150} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                        )} */}
                                    </div>

                                </Portlet>
                            </div>
                        </div>

                    </div>
                    <div className="row">
                        <div className="">
                            {/* <Portlet title={"BANKS"} noCollapse={true} style={{ height: '350px' }}> */}
                            <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"Top 3 E-Commerce, Logistics and Courier Companies"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img" src="\assets\Resources\images\refresh.svg" alt="" />
                                        </div>
                                        {this.state.widget5}
                                        {/* <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#ff9800']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} /> */}

                                    </Portlet>
                                }
                            </div>
                            <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"E-Commerce Trade AED"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img" src="\assets\Resources\images\refresh.svg" alt="" />
                                        </div>

                                        {this.state.widget4}
                                        {/* <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#2196f3']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} /> */}

                                    </Portlet>
                                }
                            </div>
                            {/* <div className="col-md-6">
                                <Portlet title={"Top 5 Banks by Invoice Submission Amount"} noCollapse={false}>
                                    <HorizontalStackedBarChart minRange={100} maxRange={6500} stepSize={50} height={120} key={Math.random()} data={_.get(this.state.dashboardData, 'barGraphAmountData', [])} labels={['sum']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["sum"]} backgroundColors={['#ff9800']}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true
                                        }} />

                                </Portlet>
                            </div> */}
                        </div>

                    </div>
                    <div className="row">
                        <div className="">
                            {/* <Portlet title={"BANKS"} noCollapse={true} style={{ height: '350px' }}> */}
                            <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"Top E-Commerce Companies"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img" src="\assets\Resources\images\refresh.svg" alt="" />
                                        </div>
                                        {/* <BubbleChart /> */}
                                        {/* <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#ff9800']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} /> */}

                                    </Portlet>
                                }
                            </div>
                            <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"Top Exporting Countries"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img" src="\assets\Resources\images\refresh.svg" alt="" />
                                        </div>
                                        <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#2196f3']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} />

                                    </Portlet>
                                }
                            </div>
                            {/* <div className="col-md-6">
                                <Portlet title={"Top 5 Banks by Invoice Submission Amount"} noCollapse={false}>
                                    <HorizontalStackedBarChart minRange={100} maxRange={6500} stepSize={50} height={120} key={Math.random()} data={_.get(this.state.dashboardData, 'barGraphAmountData', [])} labels={['sum']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["sum"]} backgroundColors={['#ff9800']}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true
                                        }} />

                                </Portlet>
                            </div> */}
                        </div>

                    </div>
                    <div className="row">
                        <Portlet title={"Rule Performance"} noCollapse={true} style={{ height: '550px' }}>
                            <div className="refresh-img-full-div">
                                <img className="refresh-img-full" src="\assets\Resources\images\refresh.svg" alt="" />
                            </div>
                            {/* <h2 id="downloadPdf" onClick={() => this.CreatePDFfromHTML('rule-graph')}>DOWNLOAD PDF</h2> */}
                            <div id="rule-graph" className="col-md-12">
                                {/* <a href="#" onClick={() => this.downloadRuleCSV(this.props.dashboardData.ruleData)} className="btn-success">Download CSV</a> */}
                                {this.state.ruleData && (
                                    <VerticalBarChart key={Math.random()} data={[..._.get(this.state, 'ruleData', [])]} labels={['Hit Count', 'Not Hit Count']} stack="multiple" dataLabelsAttribute="riskname" dataValuesAttributes={["hitcount", "nothitcount"]} backgroundColors={['#ff9800', '#2196f3']}
                                        /* options={{
                                            responsive: true,
                                            maintainAspectRatio: true
                                        }} */ height={100} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                )}
                            </div>

                        </Portlet>

                    </div>
                    <Portlet title="Order Tracking">

                    </Portlet>

                </Wrapper>
            );
        else
            return (<div className="loader" > {utils.getLabelByID("Loading")}</div>)
    }
}

let dataArray = [];

function mapStateToProps(state, ownProps) {
    console.log(state, 'state =========');
    console.log(dataArray, 'DaTA ARRAY =========');
    let widgetId = 0;
    // if (state.app.data && Object.keys(state.app.data).length > 0) {
    //     if (widgetId != state.app.data.widgetData.widgetId) {
    //         widgetId = state.app.data.widgetData.widgetId;
    //         dataArray.push(state.app.data.widgetData)
    //     }
    // }
    return {
        // widgetData: _.get(state.app, 'data.widgetData', []),
        // widgetData: dataArray,
        widget1: _.get(state.app, 'widget1', {}),
        widget2: _.get(state.app, 'widget2', {}),
        widget3: _.get(state.app, 'widget3', {}),
        widget4: _.get(state.app, 'widget4', {}),
        widget5: _.get(state.app, 'widget5', {}),
        //  dataArray.push(state.app.data && Object.keys(state.app.data).length > 0 ? state.app.data.widgetData : []),
        typeData: _.get(state.app.typeData, 'data', undefined),
        getDashboardData: _.get(state.app, 'getDashboardData', undefined),
        entityList: state.app.entityList
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
function customActionHandler(formname, fieldname, type, e) {
    let value = e.target.value;
    this.sendCall(value)
}
EcommerceDashboard.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(EcommerceDashboard);