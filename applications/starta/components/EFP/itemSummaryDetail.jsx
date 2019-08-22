/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';

import CircularProgressbar from 'react-circular-progressbar';
/*container specific imports*/
import Table from '../../../../core/common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
import ModalBox from '../../../../core/common/ModalBox.jsx';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as moment from 'moment';
import * as constants from '../../../../core/constants/Communication.js';
import * as requestCreator from '../../../../core/common/request.js';
import DateControl from '../../../../core/common/DateControl.jsx'
import Countdown from 'react-countdown-now';
let interval;
class ItemSummaryDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFilters: "", gridData: [], orderDetail: {}, currentPageNo: 1, auditLogID: undefined, isLoading: false, pageData: {
                "pageSize": 10,
                "currentPageNo": 1,
                "totalRecords": 0
            },

            countDownDisplay: '',
            timerID: 0,
            customer: "",
            userType: "",
            SLATime: 0,
            SLABurstTime: 0,
            SLATotal: 0,
            move: "DOWN",
            isLoading: true,
            isPO: true,
            isAck: false,
            isSub: false,
            isSubAck: false,
            isSubcontractor: false,
            isSubProd: false,
            isSubQual: false,
            isSubShip: false,
            isSubRecv: false,
            isInv: false,
            isPaid: false,
            gridDataOrig: [],
            selectedOrderID: "",
            isRecv: false,
            gridData: [],
            slaData: [],
            gridDataSubOrder: [],
            columnSub: ['Week', 'Demand', 'Emirates', 'Supplier', 'Fullfillment', "Suggestion", "Risks"],
            custInfo: {
                supplierName: ""
            },
            subOrder: [],
            isOpenEmirates: false,
            reciepts: [],
            subStatus: 1,
            mainStatus: 1,
            lastStatusTimeSub: 0,
            lastStatusTimeMain: 0
        };


        this.settle = this.settle.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        // this.getSuborder = this.getSuborder.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.closePopUP = this.closePopUP.bind(this);


    }
    settle() {
        // alert(constants.settlement)
        this.props.actions.generalProcess(constants.settlement, {
            "bypassSimu": true,
            // "body": {
            "orderID": this.state.orderDetail.orderID,
            "supplierID": this.state.orderDetail.supplierID,
            "customerID": this.state.orderDetail.customerID,
            "amount": this.state.orderDetail.orderAmount
            // }
        });
    }

    timer() {
        var now = new Date().getTime();
        let countDownDate = this.state.SLABurstTime * 1000;
        console.log(countDownDate)
        if (this.state.move == 'DOWN') {
            var distance = countDownDate - now;
            // alert (distance)
            // $('#counterStamp').addClass('stmpgrn');
        } else {
            var distance = now - countDownDate;
        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        let display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        //document.getElementById("counterStamp").innerHTML = display;
        if (distance < 0) {
            //clearInterval(x);
            this.setState({ countDownDisplay: 'EXPIRED', isBurst: true })
        }
        else
            this.setState({ countDownDisplay: display })
    }
    renderPopupBody(type) {
        this.setState({ isOpenEmirates: true })
    }
    closePopUP() {
        this.setState({ isOpenEmirates: false })
    }

    getRequest() {

        var request = {
            "bypassSimu": true,
            // body: {

            "itemCode": this.props.id,
            "startDate": 1554799276,
            // }
        }
        this.setState({ currentPageNo: 1 })
        console.log(JSON.stringify(request))

        return request;
    }

    getSuborder(orderID) {
        if (orderID != "Main") {
            this.setState({
                selectedOrderID: orderID,
                isSubcontractor: true
            }, () => {


            });

        } else {
            this.setState({
                selectedOrderID: "",
                isSubcontractor: false
            }, () => {

            });

        }

    }
    renderStatus(orderID) {
        alert(status)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.orderDetail && nextProps.orderDetail.invData) {
            this.setState({
                gridData: nextProps.orderDetail.gridData || [],
                invData: nextProps.orderDetail.invData,
                isLoading: false
            });
        }
    }
    componentWillMount() {

        if (this.props.suborderid) {
            this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
                this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
            })
        } else {
            this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
        }
    }

    refresh() {
        if (this.props.suborderid) {
            this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
                this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
            })
        } else {
            this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
            interval = setTimeout(() => {
                this.refresh();
            }, 10000);
        }
    }

    searchCallBack(keyWord) {

    }
    componentWillUnmount() {
        clearInterval(this.state.timerID);
        clearTimeout(interval)
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        let timerID = setInterval(this.timer.bind(this), 1000);
        this.setState({ timerID })
        this.refresh()
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Audit_Events', 'Collections']));
    }
    formSubmit() {
        if (this.props.suborderid) {
            this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
                this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
            })
        } else {
            this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
        }
    }

    clearFields() {
        $('#auditLogList').find('input:text').val('');
        $('#auditLogList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }

    getTable() {

        return (<div className="col-md-12 " style={{ width: "100%", marginTop: "24px" }}>
            <div className="table100 ver1 m-b-110">
                <div className="table100-body js-pscroll ps ps--active-y">
                    <table>
                        <thead className="table100-head">
                            <tr className="row100 head">
                                {this.state.columnSub.map((val, index) => {
                                    return (<th key={index} style={{ fontSize: "18px", fontWeight: "600" }} className={`cell100 `}>{val}</th>)
                                })}
                            </tr>
                        </thead>
                        <tbody style={{ borderRadius: "40px" }}>
                            {
                                this.state.gridData.map((val, index) => {
                                    // alert(JSON.stringify(val))

                                    return (
                                        <tr key={index} className={(index % 2) == 0 ? 'row100' : 'row100 table-red_bg2'} >
                                            <td className="cell100 td_1" style={{ fontSize: "18px", overflowX: "auto", width: "150px" }}>
                                                <div>
                                                    <span style={{ fontSize: "22px" }}>{val.week}</span> <br />
                                                    <span style={{ color: "#d71923", fontSize: "18px" }}>{moment.unix(val.weekStart).format("DD") + " - " + moment.unix(val.weekEnd).format("DD")}</span><br />
                                                    <span style={{ color: "#80808094", fontSize: "18px" }}>{moment.unix(val.weekStart).format("MMMM")} </span><br />


                                                </div>


                                            </td>
                                            <td className="cell100 td_1" style={{ fontSize: "18px", overflowX: "auto", width: "150px" }}>
                                                <div>
                                                    <b style={{ fontSize: "30px" }}>{val.demandBuisness + val.demandAI}</b> <br />
                                                    <span style={{ fontSize: "20px" }}>Business: {val.demandBuisness}</span><br />
                                                    <span style={{ fontSize: "20px" }}>AI Engine: {val.demandAI}</span><br />
                                                </div>
                                            </td>

                                            <td className="cell100 td_1" style={{ fontSize: "30px", fontWeight: "600", width: "150px" }}>{val.emiratesStock} </td>
                                            <td className="cell100 td_1" style={{ fontSize: "30px", fontWeight: "600", width: "150px" }}>{val.supplierStock} </td>
                                            <td className="cell100 td_1 " style={{ fontSize: "18px", overflowX: "auto", width: "150px" }}>


                                                {val.orderDelivered > -1 &&


                                                    <svg width="100" height="30" style={{ marginTop: "30px", marginLeft: "30px" }}>
                                                        <rect width="100" height="30" fill="#ddd" rx="0" ry="0"></rect>
                                                        <rect width={val.orderDelivered} height="30" rx="0" ry="0" fill={val.orderDelivered >= 100 ? "#4e9525" : (val.orderDelivered >= 50 ? "#fd5f00" : "#df0054")}></rect>
                                                        <text x="35" z="80" y="19" height="30" fontFamily="Verdana" fontWeight="bold" fontSize="13" fill={val.orderDelivered >= 80 ? "#FFF" : "#000"}> {val.orderDelivered} % </text>
                                                    </svg>


                                                }
                                            </td>
                                            <td className="cell100 td_1" style={{ fontSize: "18px", overflowX: "auto", width: "250px" }}>
                                                {val.status.split("~").map((element, ind) => {

                                                    if (val.status2 == "On Time" && element != "")
                                                        return (<span>
                                                            <b> {element}</b> <img width="40" src="/assets/truckgreen.png" /><br />
                                                        </span>)
                                                    else if (val.status2 == "Delayed" && element != "")
                                                        return (<span>
                                                            <b>{element}</b> <img width="40" src="/assets/truckIcon.png" /><br />
                                                        </span>)
                                                    else if (element != "")
                                                        return (
                                                            <span><img width="30" src="https://banner2.kisspng.com/20180318/kte/kisspng-warning-sign-barricade-tape-hazard-yellow-clip-art-caution-tape-border-5aae80f816fde7.3518304915213857200942.jpg" />  {element} <br /></span>
                                                        )
                                                })}
                                            </td>
                                            <td className="cell100 td_1" style={{ fontSize: "18px", overflowX: "auto", color: "red", width: "350px" }}>{
                                                val.risks.split("~").map((element, ind) => {
                                                    console.log(">>>>>>>>>>>>>>>>>>>>>", val.status2)
                                                    if (val.status2 == "On Time" && element != "")
                                                        return (<span className="blinking">
                                                            <b> {element}</b> <img width="40" src="/assets/truckgreen.png" /><br />
                                                        </span>)
                                                    else if (val.status2 == "Delayed" && element != "")
                                                        return (<span className="blinking">
                                                            <b>{element}</b> <img width="40" src="/assets/truckIcon.png" /><br />
                                                        </span>)
                                                    else
                                                        return (
                                                            <span className="blinking">{element} <br /></span>
                                                        )
                                                })
                                            }</td>
                                        </tr>
                                    )

                                })
                            }

                            {/* <tr className="row100 table-red_bg">
                                <td className="cell100 td_1" >{totalSub.itemDescription} </td>
                                <td className="cell100 ">{totalSub.itemCode}</td>
                                <td className="cell100 ">{totalSub.quantityTotal}</td>
                                <td className="cell100 ">{totalSub.quantitySubAck}</td>
                                <td className="cell100 ">{totalSub.quantitySubProd}</td>
                                <td className="cell100 ">{totalSub.quantitySubQual}</td>
                                <td className="cell100 ">{totalSub.quantitySubShip}</td>
                                <td className="cell100 ">{totalSub.quantitySubRecv}</td>
                            </tr> */}


                        </tbody>
                    </table>
                    <div className="ps__rail-x" style={{ left: "0px", bottom: "-581px" }}>
                        <div className="ps__thumb-x" tabindex="0" style={{ left: "0px", width: "0px" }}></div>
                    </div>
                </div>
            </div>
        </div>
        );
    }


    render() {
        if (this.state.isLoading == false) {
            return (
                <div>
                    <div className="portlet light  " style={{ height: "1400px", border: "0px solid #e7ecf1" }}>

                        <div className="order-card col-md-12" style={{ height: "1400px" }}>
                            <nav className="main-nav">
                                <ul className="nav-ul">
                                    <li className="pull-left"><img src="http://s1.thingpic.com/images/TE/2ruPcqZhM4cAWXy1E8ASbibT.png" height="20" style={{ paddingRight: "10px" }} />Previous</li>

                                    <li className="viewby-txt"><img src="/assets/order_screen_files/view-icon.png" style={{ paddingRight: "10px" }} />VIEW BY</li>
                                    <li><button className="order-btn">DAY</button></li>
                                    <li><button className="orderweekly-btn">WEEKLY</button></li>
                                    {/* <i className="fa weekly-icon"></i> */}
                                    <li><button className="order-btn">MONTHLY</button></li>
                                    <li className="pull-right">
                                        Next
                                        <img src="https://broadstream.com/wp-content/uploads/2016/02/red-arrow-right.svg" height="50" style={{ paddingRight: "10px" }} />

                                    </li>
                                </ul>
                            </nav>
                            <div className="row"  >
                                <div className="col-md-12">
                                    <div className="col-md-12">
                                        <div className="col-md-12" style={{ padding: "10px", backgroundColor: "#413738", border: "2px solid #433838" }}  >

                                            <div className="col-md-2" >
                                                <img src={this.state.invData.data.image} style={{ height: "191px", marginLeft: "-15px", marginTop: "5px", border: "2px solid white" }} />
                                            </div>
                                            <div className="col-md-10" >
                                                <h5 style={{ color: "white", fontSize: "18px", fontWeight: "600" }} >{this.state.invData.data.description} </h5><hr />
                                                <h6 style={{ color: "white", fontSize: "15px" }} >itemCode: {this.state.invData.data.itemID}</h6>
                                                <h6 style={{ color: "white", fontSize: "15px" }} >Category: {this.state.invData.data.categorysegment1}</h6>
                                                <h6 style={{ color: "white", fontSize: "15px" }} >Category1: {this.state.invData.data.categorysegment2}</h6>
                                                <h6 style={{ color: "white", fontSize: "15px" }} >Category2: {this.state.invData.data.categorysegment3}</h6>
                                                <h6 style={{ color: "white", fontSize: "15px" }}>Category3: {this.state.invData.data.categorysegment4}</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">



                                    <div className="order-content" style={{ width: "100%" }}>
                                        <div className="order-delay-card2">

                                            {/* <h2 className="hub">Item wise summary</h2> */}
                                            {this.getTable()}



                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

ItemSummaryDetail.propTypes = {
    children: PropTypes.object,
    typeData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    return {
        orderDetail: state.app.orderDetail,
        typeData: state.app.typeData.data,
        id: ownProps.params.id,
        suborderid: ownProps.params.suborderid,

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
ItemSummaryDetail.displayName = "Order Fullfillment Detail";
export default connect(mapStateToProps, mapDispatchToProps)(ItemSummaryDetail);
