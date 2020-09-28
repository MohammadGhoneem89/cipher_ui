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

import jsonData from '../../common/dummyData/dashboard.json';
import bankColors from '../../../config/bank-colors';
import { Multiselect } from 'multiselect-react-dropdown';
import { data } from 'jquery';

let interval;
class DashboardFilters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
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

    componentDidMount() { }


    componentWillReceiveProps(nextProps) {

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

    render() {
        console.log("state", this.state)
        console.log("props", this.props)
        if (!this.state.isLoading)
            return (
                <div>
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
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" onClick={this.selectYear} checked={this.state.selectedYears.includes('2017')} name="2017" id="option1"  /> 2017
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="2018" id="option2"  /> 2018
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option3"  /> 2019
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option4"  /> 2020
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
                                                    <input type="radio" name="options" id="option1"  /> Quarter 1
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option2"  /> Quarter 2
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option3"  /> Quarter 3
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option4"  /> Quarter 4
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
                                                    <input type="radio" name="options" id="option1"  /> 1
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option2"  /> 2
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option3"  /> 3
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option4"  /> 4
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option5"  /> 5
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option6"  /> 6
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option7"  /> 7
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option8"  /> 8
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option9"  /> 9
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option10"  /> 10
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option11"  /> 11
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option12"  /> 12
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
                                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All</a>
                                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Free Zone</a>
                                                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Custom Warehouse</a>
                                                    <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Mainland</a>
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
                                                        <Multiselect
                                                            options={this.state.options} // Options to display in the dropdown
                                                            selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                                                            onSelect={this.onSelect} // Function will trigger on select event
                                                            onRemove={this.onRemove} // Function will trigger on remove event
                                                            displayValue="name" // Property name to display in the dropdown options
                                                        />
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

                </div>
            );
        else
            return (<div className="loader" > {utils.getLabelByID("Loading")}</div>)
    }
}

let dataArray = [];

function mapStateToProps(state, ownProps) {
    return {
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
DashboardFilters.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(DashboardFilters);