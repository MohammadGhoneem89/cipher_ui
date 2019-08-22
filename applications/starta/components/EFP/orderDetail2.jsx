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
            inpData: {},
            countDownDisplay: '', timerID: 0,
            customer: "",
            userType: "",
            SLATime: 0,
            percentage: 0,
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
            "itemCode1": this.props.id,
            "itemCode2": this.props.id,
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
        if (nextProps.orderDetail && nextProps.orderDetail.UNIFORM) {
            let inpData = nextProps.orderDetail.UNIFORM.Category;
            let deno = (parseInt(inpData.gdemandBuisness) + parseInt(inpData.gdemandAI) - (inpData.gemiratesStock + inpData.gsupplierStock));

            console.log(deno, ">>>>>", inpData.gorderRecieved)
            let percentage = 1
            if (deno > 0) {
                percentage = inpData.gorderRecieved / deno || 0
            }
            console.log(percentage)
            this.setState({
                inpData: inpData,
                percentage: Math.round((percentage * 1000)) / 10,
                isLoading: false
            });

        }
    }
    componentWillMount() {

        this.props.actions.generalProcess(constants.generalItems, {
            "categorySegment": "UNIFORM",
            "categorySegmentNo": "1"
        });
    }

    // refresh() {
    //     if (this.props.suborderid) {
    //         this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
    //             this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
    //         })
    //     } else {
    //         this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
    //         interval = setTimeout(() => {
    //             this.refresh();
    //         }, 10000);
    //     }
    // }

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
        // this.refresh()
        // this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Audit_Events', 'Collections']));
    }
    formSubmit() {
        if (this.props.suborderid) {
            this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
                // this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
            })
        } else {
            // this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
        }
    }

    clearFields() {
        $('#auditLogList').find('input:text').val('');
        $('#auditLogList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }
    getData(number) {
        browserHistory.push('/itemDetail2/EMIRATES')
    }
    getTable() {

        return (<div className="col-md-12 " style={{ width: "100%", marginTop: "24px" }}>
            <div className="table100 ver1 m-b-110">
                <div className="table100-body js-pscroll ps ps--active-y">
                    <table>
                        <thead className="table100-head">
                            <tr className="row100 head">
                                {this.state.columnSub.map((val, index) => {
                                    return (<th key={index} className={`cell100 `}>{val}</th>)
                                })}
                            </tr>
                        </thead>
                        <tbody style={{ borderRadius: "40px" }}>
                            {
                                this.state.gridData.map((val, index) => {
                                    // alert(JSON.stringify(val))

                                    return (
                                        <tr key={index} className={(index % 2) == 0 ? 'row100' : 'row100 table-red_bg2'} >
                                            <td className="cell100 td_1" >
                                                <div>
                                                    <b>{val.week}</b> <br />
                                                    <span style={{ color: "#d71923" }}>{moment.unix(val.weekStart).format("DD") + " - " + moment.unix(val.weekEnd).format("DD")}</span><br />
                                                    <span style={{ color: "#80808094", fontSize: "12px" }}>{moment.unix(val.weekStart).format("MMMM")} </span><br />


                                                </div>


                                            </td>
                                            <td className="cell100 td_1" >
                                                <div>
                                                    <b>{val.demandBuisness + val.demandAI}</b> <br />
                                                    <span style={{ fontWeight: "600", fontSize: "12px" }}>Business: {val.demandBuisness}</span><br />
                                                    <span style={{ fontWeight: "600", fontSize: "12px" }}>AI Engine: {val.demandAI}</span><br />
                                                </div>
                                            </td>

                                            <td className="cell100 td_1" style={{ fontSize: "18px", fontWeight: "600" }}>{val.emiratesStock} </td>
                                            <td className="cell100 td_1" style={{ fontSize: "18px", fontWeight: "600" }}>{val.supplierStock} </td>
                                            <td className="cell100 td_1 order-progressbar" style={{

                                                overflow: "hidden",
                                                display: "inline-block",
                                                whiteSpace: "nowrap"
                                            }}>

                                                {val.orderDelivered > -1 &&
                                                    <div>
                                                        <CircularProgressbar
                                                            className="CircularProgressbar"
                                                            percentage={val.orderDelivered}
                                                            text={`${val.orderDelivered}%`}
                                                        />
                                                    </div>
                                                }
                                            </td>
                                            <td className="cell100 td_1" style={{ fontSize: "16px" }}>{val.status}</td>
                                            <td className="cell100 td_1" style={{ fontSize: "16px" }}>{val.risks}</td>
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
        let anyRisk = false;
        let anyStatus = false;
        let anyDelay = false;
        if (this.state.isLoading == false) {
            return (
                <div>
                    <div className="portlet light  " style={{ border: "0px solid #e7ecf1" }}>
                        <div className="row">
                            <div className="order-card col-md-12" style={{ height: "1050px" }}>
                                <div className="col-md-12">


                                    <nav className="main-nav" >
                                        <ul className="nav-ul">
                                            <li className="viewby-txt"><img src="/assets/order_screen_files/view-icon.png" style={{ paddingRight: "10px" }} />VIEW BY</li>
                                            <li><button className="order-btn">DAY</button></li>
                                            <li><button className="orderweekly-btn">WEEKLY</button></li>
                                            {/* <i className="fa weekly-icon"></i> */}
                                            <li><button className="order-btn">MONTHLY</button></li>

                                        </ul>
                                    </nav>


                                    <div className="order-content" style={{ width: "100%" }}>
                                        <div className="order-card" style={{ height: "850px" }}>

                                            <div className="week-row">
                                                <ul>
                                                    <li className="nextweek-txt">NEXT 7<br /> WEEKS</li>
                                                    <li className="week-div">WEEK 1</li>
                                                    <li className="week-div">WEEK 2</li>
                                                    <li className="week-div">WEEK 3</li>
                                                    <li className="week-div">WEEK 4</li>
                                                    <li className="week-div">WEEK 5</li>
                                                    <li className="week-div">WEEK 6</li>
                                                    <li className="week-div" style={{ background: "antiquewhite" }}>WEEK 7</li>
                                                </ul>
                                            </div>
                                            <div className="col-md-12 text-center orderdetail_CircularProgressbar">
                                                <ul className="order-progressbar pg2" >
                                                    <li className="icons_27 " onClick={this.getData.bind(this, 1)} style={{ height: "170px" }}>
                                                        <CircularProgressbar
                                                            className="CircularProgressbar progressbar-hover"
                                                            percentage={100}
                                                            backgroundPadding={10}
                                                            initialAnimation={true}
                                                            text={`${100}%`}
                                                        />
                                                        {/* <span className="progressbar-icon"><img src="/assets/order_screen_files/skirt.png" /></span> */}
                                                        <label>EKCATE</label>
                                                    </li>
                                                    <li className="icons_27 progressbar_hover_active" onClick={this.getData.bind(this, 6)} style={{ height: "170px" }}>
                                                        <CircularProgressbar
                                                            className="CircularProgressbar progressbar-hover"
                                                            percentage={this.state.percentage}
                                                            backgroundPadding={10}
                                                            initialAnimation={true}
                                                            text={`${this.state.percentage}%`}
                                                        />
                                                        {/* <span className="progressbar-icon"><img src="/assets/order_screen_files/skirt.png" /></span> */}
                                                        <label>UNIFORM</label>
                                                    </li>
                                                    <li className="icons_27 " onClick={this.getData.bind(this, 1)} style={{ height: "170px" }}>
                                                        <CircularProgressbar
                                                            className="CircularProgressbar progressbar-hover"
                                                            percentage={100}
                                                            backgroundPadding={10}
                                                            initialAnimation={true}
                                                            text={`${100}%`}
                                                        />
                                                        {/* <span className="progressbar-icon"><img src="/assets/order_screen_files/skirt.png" /></span> */}
                                                        <label>GIVEAWAYS</label>
                                                    </li>
                                                    <li className="icons_27 " onClick={this.getData.bind(this, 2)} style={{ height: "170px" }}>
                                                        <CircularProgressbar
                                                            className="CircularProgressbar progressbar-hover"
                                                            percentage={100}
                                                            backgroundPadding={10}
                                                            initialAnimation={true}
                                                            text={`${100}%`}
                                                        />
                                                        {/* <span className="progressbar-icon"><img src="/assets/order_screen_files/skirt.png" /></span> */}
                                                        <label>EKCAT</label>
                                                    </li>
                                                </ul>
                                                <div className="order-timeline" style={{ width: "85%", border: "none" }}>
                                                    <div className="border border-red ">
                                                        <img src="/assets/order_screen_files/warning.png" style={{ paddingRight: "10px" }} />
                                                        {Array.from(new Set(this.state.inpData.grisks.split("|"))).map((val, ind) => {
                                                            // val.split("~").map((elem) => {
                                                            // if (elem)
                                                            if (val && !(val.indexOf("risk") > -1)) {
                                                                anyStatus = true;
                                                                return (<span>{val.replace(/~/g, ' - ')} Delayed <img width="40" src="/assets/truckIcon.png" /> </span>)
                                                            }
                                                        })
                                                        }
                                                        {!anyStatus && <span>no orders are delayed.</span>}
                                                        <hr className="pg4" />
                                                    </div>

                                                    <div className="border border-green" style={{ border: "none" }}>
                                                        <div className="pg7"><img src="/assets/order_screen_files/warning-green.png" style={{ paddingRight: "10px" }} />
                                                            {Array.from(new Set(this.state.inpData.gstatus.split("|"))).map((val, ind) => {
                                                                if (val && !(val.indexOf("risk") > -1)) {
                                                                    anyDelay = true
                                                                    return (<span>{val.replace(/~/g, ' - ')} On-time  <img width="40" src="/assets/truckgreen.png" /> </span>)
                                                                }
                                                            })}
                                                        </div>
                                                        {!anyDelay && <span>no orders are pending.</span>}
                                                        <hr className="pg8" />
                                                    </div>
                                                    <div className="border border-green" style={{ border: "none" }}>
                                                        <div className="pg5">
                                                            <ul style={{ padding: "0", margin: "30px" }}>
                                                                <li style={{ display: "inline-block", padding: "0", margin: "auto", position: "relative" }} >
                                                                    <img src="/assets/order_screen_files/warning-copy.png" style={{ paddingRight: "10px" }} />
                                                                    {
                                                                        Array.from(new Set(this.state.inpData.gstatus.split("|"))).map((val, ind) => {
                                                                            if (val.indexOf("risk") > -1) {
                                                                                anyRisk = true;
                                                                                return (<span>{val.replace(/~/g, ' - ')} </span>)
                                                                            }
                                                                        })
                                                                    }
                                                                    {!anyRisk && <span>no risks identified for any items shown above</span>}
                                                                </li>

                                                            </ul>
                                                        </div>
                                                        <hr className="pg6" />
                                                    </div>
                                                    <div style={{ marginBottom: "30%" }}></div>

                                                </div>
                                            </div>
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
        id1: ownProps.params.id1,
        id2: ownProps.params.id2,
        suborderid: ownProps.params.suborderid,

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
ItemSummaryDetail.displayName = "__ORD";
export default connect(mapStateToProps, mapDispatchToProps)(ItemSummaryDetail);
