/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Wrapper from '../../common/Wrapper.jsx';

import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';
import * as gen from '../../common/generalActionHandler'
import Portlet from '../../common/Portlet.jsx';
// import Checklist from '../../common/CheckList.jsx';
import HorizontalBarChartNew from '../../common/charts/horizontalBarChartNew.jsx';
// import HorizontalStackedBarChart from '../../common/charts/horizontalStackedBarChart.jsx';
import PieChart from '../../common/charts/PieChart.jsx';
import VerticalBarChart from '../../common/charts/VerticalBarChart.jsx';
// import MultiLineChart from '../../common/charts/multiLineChart.jsx';
// import TileUnit from '../../../../core/common/tileUnit.jsx';
import moment from 'moment';
import * as d3 from "d3";

import { indexOf } from 'lodash';
import Input from '../../../../core/common/Input.jsx';
import TextArea from '../../../../core/common/Textarea.jsx';
import Combobox from '../../../../core/common/Select.jsx';
import ComboBoxNew from '../../../../core/common/SelectNew.jsx';
import SankeyChart from '../../common/charts/d3-sankey-chart.jsx';
import BubbleChart from '../../common/charts/bubbleChart-CSBOX.js';

let interval;
class CreateWidget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widget1isLoading: true,
            widget2isLoading: true,
            widget3isLoading: true,
            widget4isLoading: true,
            widget5isLoading: true,
            widget6isLoading: true,
            widget7isLoading: true,
            widget8isLoading: true,
            widget9isLoading: true,
            widget20isLoading: true,
            widget21isLoading: true,
            widget22isLoading: true,
            widgetIds: [1, 2, 3, 4, 5, 6, 7, 10, 11, 20, 21, 22],
            selectedYears: [],
            options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
            selectedQuarters: [],
            selectedMonths: [],
            selectedZone: [],
            regions: [],
            typeData: undefined,
            getDashboardData: undefined,
            fromDate: moment().subtract(29, 'days').format('DD/MM/YYYY'),
            toDate: moment().format('DD/MM/YYYY'),
            selectedFromDate: moment().subtract(29, 'days').format('DD/MM/YYYY'),
            selectedToDate: moment().format('DD/MM/YYYY'),
            CBVLabels: undefined,
            CBVData: undefined,
            contentToggle: false,
            hsTitile: 'E-Commerce Company',
            topHS: { option: 'E-Commerce Company' },
            graphTypeArray: [
                {
                    label: 'Single-Value-Horizontal-Bar-Graph',
                    value: { "widgetData": { "widgetId": "widget5", "widgetType": "2ValueBar-Horizontal", "graphTitle": "Top 3 E-Commerce Companies", "graphData": { "axisData": { "xAxis": { "type": "string", "value": ["NAMSHI", "AL TAYER", "ARAMEX", "JOLLY CHIC", "NOON", "AMAZON"] }, "yAxis": { "type": "integer", "value": [0, 5000, 10000, 15000] } }, "data": [{ "xIndex": { "type": "string", "value": "JOLLY CHIC" }, "yIndex": { "type": "integer", "value": 5145 } }, { "xIndex": { "type": "string", "value": "NOON" }, "yIndex": { "type": "integer", "value": 9145 } }, { "xIndex": { "type": "string", "value": "AMAZON" }, "yIndex": { "type": "integer", "value": 11475 } }, { "xIndex": { "type": "string", "value": "ARAMEX" }, "yIndex": { "type": "integer", "value": 4147 } }, { "xIndex": { "type": "string", "value": "NAMSHI" }, "yIndex": { "type": "integer", "value": 457 } }, { "xIndex": { "type": "string", "value": "AL TAYER" }, "yIndex": { "type": "integer", "value": 2157 } }] } } }
                },
                {
                    label: 'Triple-Value-Horizontal-Bar-Graph',
                    value: { "widgetData": { "widgetId": "widget5", "widgetType": "3ValueBar-Horizontal", "graphTitle": "Top 3 E-Commerce, Logistics & Courier Companies", "graphData": { "axisData": { "xAxis": { "type": "string", "value": ["JOLLY CHIC", "NOON", "AMAZON", "ARAMEX", "FEDEX", "DHL", "AL FUTTAIM", "ALTRANS", "AGILITY"] }, "yAxis": { "type": "integer", "value": [0, 20, 40, 60, 80, 100] }, "zAxiz": { "type": "string", "value": ["E-Commerce", "Courier", "Logistics"] } }, "data": [{ "xIndex": { "type": "string", "value": "JOLLY CHIC" }, "yIndex": { "type": "integer", "value": 88 }, "zIndex": { "type": "string", "value": "E-Commerce" } }, { "xIndex": { "type": "string", "value": "NOON" }, "yIndex": { "type": "integer", "value": 77 }, "zIndex": { "type": "string", "value": "E-Commerce" } }, { "xIndex": { "type": "string", "value": "AMAZON" }, "yIndex": { "type": "integer", "value": 66 }, "zIndex": { "type": "string", "value": "E-Commerce" } }, { "xIndex": { "type": "string", "value": "ARAMEX" }, "yIndex": { "type": "integer", "value": 33 }, "zIndex": { "type": "string", "value": "Courier" } }, { "xIndex": { "type": "string", "value": "FEDEX" }, "yIndex": { "type": "integer", "value": 22 }, "zIndex": { "type": "string", "value": "Courier" } }, { "xIndex": { "type": "string", "value": "DHL" }, "yIndex": { "type": "integer", "value": 11 }, "zIndex": { "type": "string", "value": "Courier" } }, { "xIndex": { "type": "string", "value": "AL FUTTAIM" }, "yIndex": { "type": "integer", "value": 44 }, "zIndex": { "type": "string", "value": "Logistics" } }, { "xIndex": { "type": "string", "value": "ALTRANS" }, "yIndex": { "type": "integer", "value": 55 }, "zIndex": { "type": "string", "value": "Logistics" } }, { "xIndex": { "type": "string", "value": "AGILITY" }, "yIndex": { "type": "integer", "value": 33 }, "zIndex": { "type": "string", "value": "Logistics" } }] } } }
                },
                {
                    label: 'Double-Value-Horizontal-Bar-Graph',
                    value: { "widgetData": { "widgetId": "widget5", "widgetType": "2ValueBar-Vertical", "graphTitle": "Top 5 Export HS Codes", "graphData": { "axisData": { "xAxis": { "type": "string", "value": ["Gold", "Electronic", "Wood", "Auto", "Glass"] }, "yAxis": { "type": "float", "value": [0, 20000, 40000, 60000, 80000, 100000] } }, "data": [{ "xIndex": { "type": "string", "value": "Gold" }, "yIndex": { "type": "integer", "value": 74400 } }, { "xIndex": { "type": "string", "value": "Electronic" }, "yIndex": { "type": "integer", "value": 86100 } }, { "xIndex": { "type": "string", "value": "Wood" }, "yIndex": { "type": "integer", "value": 60800 } }, { "xIndex": { "type": "string", "value": "Auto" }, "yIndex": { "type": "float", "value": 70500 } }, { "xIndex": { "type": "string", "value": "Glass" }, "yIndex": { "type": "float", "value": 34700 } }] } } }
                },
                {
                    label: 'Pie-Chart',
                    value: { "widgetData": { "widgetId": "widget5", "widgetType": "pieChart", "graphTitle": "Free Zone Wise Transactions", "graphData": { "data": [{ "label": "Dubai south", "count": 19 }, { "label": "DAFZA", "count": 30 }, { "label": "JAFZA", "count": 51 }] } } }
                }
            ],
            isLoading: false,
            ecommerce: '001',
            tracking: {
                courier: "",
                ecommerce: ""
            },
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
        let self = this;


        $(document).ready(function () {
            $('.multiselect').multiselect({
                buttonWidth: 'auto',
                numberDisplayed: 15,
                enableHTML: true,
                optionLabel: function (element) {
                    return '<img src="' + $(element).attr('data-img') + '"> ' + $(element).text();
                },
                onChange: function (element, checked) {
                    $("ul.multiselect-container").find("input[type=checkbox]").each(function () {
                        var valueAttr = $(this).attr('value');
                        if (element.attr('value') == valueAttr) {
                            var checkParent = $(this).parent().parent().parent().hasClass('active');
                        }
                    });
                }
            });
        });
        // this.getGraphData()
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData,
            requestCreator.createTypeDataRequest([
                'graph_types'
            ]));

        this.props.actions.generalProcess(constants.orgList, { action: "entityList", page: { currentPageNo: 1, pageSize: 100 } });
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

        let array = [...this.state.widgetIds];
        array.filter(async x => {
            console.log(x);
            let obj = {
                "body": {
                    "widgetId": `widget${x}`,
                    "valueType": "", // byCount or byAmount
                    "outputWidgetType": "", // pieChart. 2Value-Bar Horizontal
                    "period": {
                        "year": this.state.selectedYears,
                        "quarter": this.state.selectedQuarters,
                        "month": this.state.selectedMonths,
                        "fromDate": this.state.selectedFromDate,
                        "toDate": this.state.selectedToDate
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

    async getSingleGraphData(id, searchCriteria) {

        let obj = {
            "body": {
                "widgetId": id == 1 ? `widget${id}-betweenDates` : `widget${id}`,
                "valueType": "", // byCount or byAmount
                "outputWidgetType": "", // pieChart. 2Value-Bar Horizontal
                "searchCritera": searchCriteria

            }
        }
        await this.props.actions.generalAjxProcess(constants.getGraphDashboardData, obj).then(res => {
            // req++
        });
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
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
            let chart = <PieChart onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={labels} data={values} height={180}
                // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
                backgroundColor={['#9e9e9e', '#ae8b4b', '#2196f3']} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
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
            let chart = <HorizontalBarChartNew minRange={0} maxRange={maxRange} stepSize={5} height={graphProps.widgetData.widgetId == 6 ? 420 : 180}
                data={dataArray || []} labels={graphProps.widgetData.widgetId == 'widget6' ? ['Countries'] : ['Companies']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} backgroundColors={['#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '2ValueBar-Vertical') {
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
                graphProps.widgetData.graphData.data.forEach((data, index) => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    let obj = {
                        entityName: data.xIndex.value,
                        // ['value'+index]: data.yIndex.value,
                        value: data.yIndex.value,
                    }
                    dataArray.push(obj);
                })
                this.setState({
                    dataArray
                })
            }

            console.log(x, '2VAlueX');
            console.log(y, '2ValueY');
            console.log(dataArray, 'DATAARRRRRRR');
            let valuesArray = [];
            // dataArray.map((x, index) => { 
            //     valuesArray.push(Object.keys(x)[1])
            // }
            //     );
            // console.log(valuesArray, 'VAAA');
            let chart = <VerticalBarChart data={dataArray} labels={['HS']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={["value"]} backgroundColors={['#2196f3']}
                height={250} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
            // <HorizontalBarChartNew minRange={10} maxRange={maxRange} stepSize={5} height={180} 
            //     data={dataArray || []} labels={['Companies']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} backgroundColors={['#ae8b4b', '#2196f3']}
            //     options={{
            //         responsive: true,
            //         maintainAspectRatio: true
            //     }} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueLine-Vertical') {
            let lineGraphData = [...graphProps.widgetData.graphData.data];
            let dataPoints = [];
            let convertedGraphData = [];
            // let name;
            lineGraphData.map((data, index) => {
                let dpObj = {
                    year: data.zIndex.value,
                    label: data.xIndex.value,
                    value: +data.yIndex.value
                }
                // name = data.bankCode
                dataPoints.push(dpObj)
            })

            graphProps.widgetData.graphData.axisData.zAxis.value.forEach((year, index) => {
                let dataPointsNew = [];
                dataPoints.filter(data => {
                    if (year == data.year) {
                        dataPointsNew.push(data);
                    }
                })
                let obj = {
                    type: "line",
                    name: year,
                    // color: "#" + ((1 << 24) * Math.random() | 0).toString(16),
                    color: index == 0 ? '#2196f3' : '#f58709',
                    showInLegend: true,
                    dataPoints: dataPointsNew,
                }
                convertedGraphData.push(obj);
            })
            // let x = [];
            // let y = [];
            // let z = [];
            // let dataArray = [];
            // if (graphProps.widgetData.widgetId.toggle == 'value') {
            //     graphProps.widgetData.graphData.byValue.forEach(data => {
            //         // console.log(data);
            //         x.push(data.xIndex.value)
            //         y.push(data.yIndex.value)
            //         z.push(data.zIndex.value)
            //     })
            // } else {
            //     graphProps.widgetData.graphData.data.forEach(data => {
            //         // console.log(data);
            //         x.push(data.xIndex.value)
            //         y.push(data.yIndex.value)
            //         if (data.zIndex && !z.includes(data.zIndex.value)) {
            //             z.push(data.zIndex.value)
            //         }
            //         if (data.zIndex && data.zIndex.value == z[0]) {
            //             let obj = {
            //                 entityName: data.xIndex.value,
            //                 value1: data.yIndex.value,
            //                 type: data.zIndex.value
            //             }
            //             dataArray.push(obj);
            //         } else if (data.zIndex) {
            //             let obj = {
            //                 entityName: data.xIndex.value,
            //                 value2: data.yIndex.value,
            //                 type: data.zIndex.value
            //             }
            //             dataArray.push(obj);
            //         }

            //     })
            // }
            this.setState({
                dataArray: convertedGraphData
            })

            // console.log(x);
            // console.log(y);
            // console.log(z);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <MultiLineChart dataPoints={convertedGraphData} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueBar-Horizontal') {
            let x = [];
            let y = [];
            let z = [];
            let sortedValueArray = [];
            let maxRange = 0;
            let dataArray = [];
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    z.push(data.zIndex.value)
                })
            } else {
                sortedValueArray = graphProps.widgetData.graphData.axisData.yAxis.value.sort((a, b) => a - b);
                maxRange = sortedValueArray[sortedValueArray.length - 1];
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
                    } else if (data.zIndex.value == z[1]) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value2: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    } else {
                        let obj = {
                            entityName: data.xIndex.value,
                            value3: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    }

                })
                this.setState({
                    dataArray
                })
            }

            console.log(x, 'X');
            console.log(y, 'Y');
            console.log(z, 'Z');

            let unique = z.filter(this.onlyUnique);
            console.log(unique, 'UNIQUE')
            console.log(dataArray, 'DATAARRRRRRR - multiple color bar chart');
            let chart = <HorizontalBarChartNew minRange={sortedValueArray[0]} maxRange={maxRange} stepSize={maxRange / 5} height={300}
                data={dataArray || []} labels={unique} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2', 'value3']} backgroundColors={['#f58709', '#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueBar-Vertical') {
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
            let chart = <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={180}
                data={dataArray || []} labels={z} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2']} backgroundColors={['#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == 'flagChart') {
            // this.createBubbleChart('', graphProps.widgetData.graphData.data, continentData);

            let chart = <CountryBubbleChart countryData={graphProps.widgetData.graphData.data} continents={continentData} />


            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == 'sankeyChart') {
            // this.createBubbleChart('', graphProps.widgetData.graphData.data, continentData);

            let chart = <SankeyChart data={graphProps.widgetData.graphData} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueBubble-Vertical') {

            let graphDataArray = [...graphProps.widgetData.graphData.data]
            let bubbleArray = [];
            graphDataArray.map(data => {
                let obj = {
                    title: data.xIndex.value,
                    category: data.zIndex.value,
                    views: data.yIndex.value
                }
                bubbleArray.push(obj)
            })
            console.log(bubbleArray, "BUBBLE ARRAY");
            let chart = <BubbleChart data={bubbleArray} useLabels />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
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

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);

        this.setState({
            graphTypes: nextProps.typeData.graph_types
        })
    }

    component

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

    refreshSingleWidget(widgetId) {
        let stateLabel = 'widget' + widgetId + 'isLoading';
        this.setState({
            [stateLabel]: true,
        })
        let searchCriteria;
        if (widgetId == 'widgetId2') {
            searchCriteria = { filter: { place: 'old', number: 7 } };
        }
        if (widgetId == 'widgetId3') {
            searchCriteria = { filter: { date: '12/2/1994', toDate: '01/10/1994' } };
        }
        if (widgetId == 'widgetId4') {
            searchCriteria = { filter: { some: '12/2/1994', thing: '01/10/1994' } };
        }
        if (widgetId == 'widgetId5') {
            searchCriteria = { body: { key: '12/2/1994', value: '01/10/1994' } };
        }
        this.getSingleGraphData(widgetId, searchCriteria);

    }

    renderGraph() {
        // let graphProps = {};
        // if (!this.state.response) {
        //     alert('Please Select Graph Type');
        //     return;
        // }
        this.setState({
            widget5isLoading: true
        })
        let graphProps;
        if (this.state.body && this.state.body.response) {
            graphProps = JSON.parse(this.state.body.response);
        } else {
            graphProps = JSON.parse(this.state.response);
        }
        setTimeout(() => {
            this.graphCreator(graphProps)
        }, 1000);
        // this.render();
    }

    saveGraph() {
        const { body } = this.state;
        let widgetPayload = JSON.parse(this.state.body.response);
        let obj = {
            widgetName: body.widgetName,
            widgetType: widgetPayload.widgetData.widgetType,
            widgetCaption: body.widgetCaption,
            status: 'Active',
            widgetEndpoint: body.widgetEndpoint,
            toggleValues: [body.label1, body.label2]
        }
        console.log('OBJ', obj);

        this.props.actions.generalProcess(constants.addWidgets, obj);
    }

    graphTypeHandler = (formname, fieldname, type, e) => {
        console.log(formname, fieldname, type, e);
        if (type == "textbox" || type == "radiolist" || type == "combobox" || type == "textarea") {
            let value = e.target.value;
            let formdata = _.get(this.state, formname, {});
            let errors = _.get(this.state, 'errors', {});
            this.state.graphTypes.filter(graph => {
                console.log(graph);
                console.log(value);
                let graphValue;
                if (graph.label == value) {
                    graphValue = JSON.stringify(graph.value);
                    console.log(graphValue);
                    this.setState({
                        body: {
                            response: graphValue
                        }
                    })
                    this.setState({
                        response: graphValue,
                    })
                }
            })
            console.log(value);
            _.set(formdata, e.target.name, value);
            _.set(errors, e.target.name, undefined);
            this.setState({
                [formname]: formdata,
                errors
            }, () => {
                // console.log('DATA-->', JSON.stringify(this.state[formname]));
            });
        }
    }

    toggleChange(e) {
        console.log(e.target.value);
        console.log(e.target.name);
        this.setState({
            contentToggle: !this.state.contentToggle
        })
    }

    scrollRight() {
        document.getElementById('scroll-container').scrollLeft += 350;
    }

    scrollLeft() {
        document.getElementById('scroll-container').scrollLeft -= 350;
    }

    selectSample(value) {
        this.setState({
            body: {
                response: JSON.stringify(value)
            }
        })
    }

    render() {
        console.log("state-->", this.state)
        console.log("props-->", this.props)
        if (!this.state.isLoading)
            return (
                <Wrapper title="E-Commerce Dashboard">
                    <Portlet title={'Widget Creator'}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-4"><label>Widget ID</label></div>
                                <div className="col-md-8">
                                    <Input
                                        divStyle={{ padding: '0' }}
                                        status={(this.state.errors && this.state.errors.passportNo) ? "ERROR" : undefined}
                                        fieldname='passportNo'
                                        // placeholder={utils.getLabelByID('Passport Number*')}
                                        formname='body'
                                        columns='12'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-4"><label>Name</label></div>
                                <div className="col-md-8">
                                    <Input
                                        divStyle={{ padding: '0' }}
                                        status={(this.state.errors && this.state.errors.widgetName) ? "ERROR" : undefined}
                                        fieldname='widgetName'
                                        // placeholder={utils.getLabelByID('Passport Number*')}
                                        formname='body'
                                        columns='12'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }} className="col-md-12">
                                <div className="col-md-2"><label>Graph Type</label></div>
                                <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-10">
                                    <div className="scroll-icons">
                                        <img onClick={this.scrollLeft} style={{ position: 'relative', right: '35px' }} src="\assets\Resources\images\left-chevron.png" alt="" />
                                    </div>
                                    <div id="scroll-container" className="scroll-container">
                                        {this.state.graphTypes && this.state.graphTypes.map(type => {
                                            return (
                                                <div className="item">
                                                    <div className="graph-title">
                                                        {type.label}
                                                    </div>
                                                    <div className="graph-select">
                                                        <button onClick={() => this.selectSample(type.value)} style={{ width: '120px' }} className="btn btn-primary">Select</button>
                                                    </div>
                                                    <img className="graph-img-preview" src={type.image} alt="" />
                                                </div>
                                            )
                                        })}
                                        {/* <div className="item">
                                            <img className="graph-img-preview" src="\assets\Resources\images\bar-graph1.png" alt="" />
                                        </div>
                                        <div className="item">
                                            <img className="graph-img-preview" src="\assets\Resources\images\bar-graph1.png" alt="" />
                                        </div>
                                        <div className="item">
                                            <img className="graph-img-preview" src="\assets\Resources\images\bar-graph1.png" alt="" />
                                        </div>
                                        <div className="item">
                                            <img className="graph-img-preview" src="\assets\Resources\images\bar-graph1.png" alt="" />
                                        </div> */}
                                    </div>
                                    <div className="scroll-icons">
                                        <img onClick={this.scrollRight} style={{ position: 'relative', left: '10px' }} src="\assets\Resources\images\right-chevron.png" alt="" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-4"><label>Caption</label></div>
                                <div className="col-md-8">
                                    <Input
                                        divStyle={{ padding: '0' }}
                                        status={(this.state.errors && this.state.errors.passportNo) ? "ERROR" : undefined}
                                        fieldname='widgetCaption'
                                        // placeholder={utils.getLabelByID('Passport Number*')}
                                        formname='body'
                                        columns='12'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-4"><label>Data Endpoint</label></div>
                                <div className="col-md-8">
                                    <Input
                                        divStyle={{ padding: '0' }}
                                        status={(this.state.errors && this.state.errors.widgetEndpoint) ? "ERROR" : undefined}
                                        fieldname='widgetEndpoint'
                                        // placeholder={utils.getLabelByID('Passport Number*')}
                                        formname='body'
                                        columns='12'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">

                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-12">
                                <div className="col-md-3"><label>X-Value Toggle</label></div>
                                <div className="col-md-1">
                                    <input name="valueToggle" onChange={e => this.toggleChange(e)} checked={this.state.contentToggle} type="checkbox" /></div>
                                {this.state.contentToggle && <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-3">
                                    <label htmlFor="">Label 1</label>
                                    <Input
                                        divStyle={{ padding: '0' }}
                                        status={(this.state.errors && this.state.errors.label1) ? "ERROR" : undefined}
                                        fieldname='label1'
                                        // placeholder={utils.getLabelByID('Passport Number*')}
                                        formname='body'
                                        columns='9'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                                }
                                {this.state.contentToggle && <div style={{ display: 'flex', alignItems: 'center' }} className="col-md-3">
                                    <label htmlFor="">Label 2</label>
                                    <Input
                                        divStyle={{ padding: '0' }}
                                        status={(this.state.errors && this.state.errors.label2) ? "ERROR" : undefined}
                                        fieldname='label2'
                                        // placeholder={utils.getLabelByID('Passport Number*')}
                                        formname='body'
                                        columns='9'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                                }
                            </div>
                            <div style={{
                                marginLeft: '15px',
                                marginTop: '10px'
                            }} className="col-md-1">
                                <label>Response</label>
                            </div>
                            <div style={{
                                marginLeft: '100px',
                                width: '920px'
                            }} className="col-md-9">
                                <TextArea
                                    divStyle={{ padding: '0px' }}
                                    status={(this.state.errors && this.state.errors.response) ? "ERROR" : undefined}
                                    fieldname='response'
                                    rows="6"
                                    cols="10"
                                    formname='body'
                                    value={this.state.body && this.state.body.response ? this.state.body.response : this.state.response}
                                    columns='12'
                                    placeholder={utils.getLabelByID('')}
                                    state={this.state}
                                    actionHandler={this.generalHandler}
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }} className="col-md-12">
                                <div style={{ marginTop: '25px' }}>
                                    <button className="btn btn-primary" onClick={() => this.renderGraph()}>Preview</button>
                                </div>
                                <div style={{ marginTop: '25px' }}>
                                    <button className="btn btn-primary" onClick={() => this.saveGraph()}>Save</button>
                                </div>
                            </div>
                        </div>
                    </Portlet>
                    {/* <Portlet title={"Search Filters"} noCollapse={false}>
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
                                            <input type="date" id="selectedFromDate" className="form-control" />
                                        </div>

                                        <div className="col-md-2 p-0">
                                            <div className="bg-grey">
                                                <span>
                                                    To
                            </span>
                                            </div>

                                        </div>

                                        <div className="col-md-4 p-0">
                                            <input type="date" id="selectedToDate" className="form-control" />
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
                                                    <div className="controls-dropdown">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\dafza.png" value="ipr0451483t">DAFZA</option>
                                                                <option data-img="\assets\Resources\images\dubai-south.png" value="ldap0451483t">Dubai South</option>
                                                                <option data-img="\assets\Resources\images\jafza.png" value="proxy0451483t">JAFZA</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                <div className="form-group mb-2">
                                                    <div className="controls-dropdown">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\1.png" value="ipr0451483t">Custom Warehouse 1</option>
                                                                <option data-img="\assets\Resources\images\2.png" value="ldap0451483t">Custom Warehouse 2</option>
                                                                <option data-img="\assets\Resources\images\3.png" value="proxy0451483t">Custom Warehouse 3</option>
                                                            </optgroup>
                                                        </select>
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

                        <div className="row p-0 mt-1">
                            <div className="col-md-2">
                                <div className="bg-blue-period zone">
                                    <span>
                                        Companies
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
                                                    <a onClick={() => this.selectZone('eCommerce')} className={this.state.selectedZone.includes('eCommerce') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-ecomm-tab" data-toggle="tab" href="#nav-ecomm" role="tab" aria-controls="nav-ecomm" aria-selected="false">E-Commerce</a>
                                                    <a onClick={() => this.selectZone('logistics')} className={this.state.selectedZone.includes('logistics') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-log-tab" data-toggle="tab" href="#nav-log" role="tab" aria-controls="nav-log" aria-selected="false">Logistics</a>
                                                    <a onClick={() => this.selectZone('courier')} className={this.state.selectedZone.includes('courier') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-about-tab" data-toggle="tab" href="#nav-courier" role="tab" aria-controls="nav-courier" aria-selected="false">Courier</a>
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
                                            <div className="tab-pane fade" id="nav-ecomm" role="tabpanel" aria-labelledby="nav-ecomm-tab">
                                                <div className="form-group mb-2">
                                                    <input type="hidden" name="data[Server][0][id]" className="form-control" value="1" id="Server0Id" />
                                                    <div className="controls">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\namshi.png" value="ipr0451483t">NAMSHI</option>
                                                                <option data-img="\assets\Resources\images\noon.png" value="proxy0451483t">NOON</option>
                                                                <option data-img="\assets\Resources\images\jolly-chic.png" value="ldap0451483t">JOLLY CHIC</option>
                                                                <option data-img="\assets\Resources\images\awok.png" value="ldap0451483t">AWOK</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-courier" role="tabpanel" aria-labelledby="nav-courier-tab">
                                                <div className="form-group mb-2">
                                                    <div className="controls">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\aramex.png" value="ipr0451483t">ARAMEX</option>
                                                                <option data-img="\assets\Resources\images\dhl.png" value="ldap0451483t">DHL</option>
                                                                <option data-img="\assets\Resources\images\fedex.png" value="proxy0451483t">FEDEX</option>
                                                            </optgroup>
                                                        </select>
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

                        <div className="row button-row">
                            <button onClick={() => this.getGraphData()} className="btn btn-primary search-button radio-selected">Search</button>
                        </div>







                    </Portlet> */}

                    <div className="row">

                        {/* <div className="col-md-6">
                            <Portlet title={"Top 3 E-Commerce, Logistics and Courier Companies"} style={{ height: 'auto', maxHeight: 'auto' }} noCollapse={false}>

                                <div className="refresh-img-div">
                                    <div className="content-toggle">
                                        <label htmlFor="">Volume</label>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                        <label htmlFor="">Value</label>
                                    </div>
                                    <img onClick={() => this.refreshSingleWidget(1)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget1isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget1} </div>
                                }

                            </Portlet>
                        </div> */}

                        {/* <div className="col-md-6">
                            <Portlet title={"E-COMMERCE TRANSACTIONS"} noCollapse={false} style={{ height: 'auto' }}>
                                <div className="refresh-img-div">
                                    <div className="content-toggle">
                                        <label htmlFor="">Volume</label>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                        <label htmlFor="">Value</label>
                                    </div>
                                    <img onClick={() => this.refreshSingleWidget(20)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget20isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget20} </div>
                                }
                                <div id="rule-graph" className="col-md-12">

                                </div>

                            </Portlet>
                        </div> */}


                    </div>
                    <div className="row">
                        {/* <div className="col-md-6">
                            <Portlet title={"E-COMMERCE TRADE (AED)"} noCollapse={false} style={{ height: 'auto' }}>
                                <div className="refresh-img-div">
                                    <img onClick={() => this.refreshSingleWidget(2)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget2isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget2} </div>
                                }

                            </Portlet>
                        </div> */}
                        {/* <div className="col-md-6">
                            <Portlet title={this.state.widget3 ? "CIF VALUE" : "Top Exporting Countries"} noCollapse={false} style={{ height: 'auto' }}>
                                <div className="refresh-img-div">
                                    <img onClick={() => this.refreshSingleWidget(3)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget3isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget3} </div>
                                }
                            </Portlet>
                        </div> */}
                    </div>
                    {/* <div className="row">
                        <div className="col-md-12">
                            <Portlet title={"TRANSACTION BY DESTINATION COUNTRY"} noCollapse={false} style={{ height: '900px' }}>
                                <div className="refresh-img-div">
                                    <img onClick={() => this.refreshSingleWidget(22)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget22isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget22} </div>
                                }
                            </Portlet>
                        </div>
                    </div> */}
                    <div className="row">
                        <div className="" style={{display: 'flex', justifyContent: 'center'}}>
                            <div className="col-md-6">
                                {this.state.widget5 && !this.state.widget5isLoading &&
                                    <Portlet title={this.state.body.widgetCaption} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            {this.state.contentToggle && <div className="content-toggle">
                                                <label htmlFor="">{this.state.body.label1}</label>
                                                <label className="switch">
                                                    <input type="checkbox" />
                                                    <span className="slider round"></span>
                                                </label>
                                                <label htmlFor="">{this.state.body.label2}</label>
                                            </div>}
                                            <img onClick={() => this.refreshSingleWidget(5)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                        </div>
                                        {this.state.widget5isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                            :
                                            <div>   {this.state.widget5} </div>
                                        }


                                    </Portlet>
                                }
                            </div>
                            {/* <div className="col-md-6">
                                <Portlet title={"Top Exporting Countries"} noCollapse={false}>
                                    <div className="refresh-img-div">
                                        <img onClick={() => this.refreshSingleWidget(6)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                    </div>
                                    {this.state.widget6isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                        :
                                        <div>   {this.state.widget6} </div>
                                    }


                                </Portlet>
                            </div>
                            <div className="col-md-6">
                                <Portlet title={"FREE ZONE WISE TRANSACTIONS"} noCollapse={false}>
                                    <div className="refresh-img-div">
                                        <img onClick={() => this.refreshSingleWidget(4)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                    </div>
                                    {this.state.widget4isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                        :
                                        <div>   {this.state.widget4} </div>
                                    }


                                </Portlet>
                            </div> */}

                        </div>

                    </div>
                    <div className="row">
                        <div className="">


                        </div>

                    </div>
                    {/* <div className="row">
                        <div className="col-md-6">
                            <Portlet title={"TOP 5 EXPORT HS CODES"} noCollapse={true}>
                                <div className="refresh-img-div">
                                    <img onClick={() => this.refreshSingleWidget(7)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget7isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget7} </div>
                                }
                            </Portlet>
                        </div>
                        <div className="col-md-6">
                            <Portlet title={"TOTAL E-COMMERCE TRANSACTIONS"} noCollapse={true}>
                                <div className="refresh-img-div">
                                    <img onClick={() => this.refreshSingleWidget(10)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget10isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget10} </div>
                                }

                            </Portlet>
                        </div>
                        <div className="col-md-12">
                            <Portlet title={"TRANSACTION FLOW (Hover on Elements to View Count)"} noCollapse={true}>
                                <div className="refresh-img-div">
                                    <img onClick={() => this.refreshSingleWidget(21)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget21isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget21} </div>
                                }

                            </Portlet>
                        </div>



                    </div> */}

                </Wrapper>
            );
        else
            return (<div className="loader" > {utils.getLabelByID("Loading")}</div>)
    }
}

let dataArray = [];

function mapStateToProps(state, ownProps) {
    return {
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
CreateWidget.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(CreateWidget);