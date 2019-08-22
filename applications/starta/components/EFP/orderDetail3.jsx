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
import _ from 'lodash';
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
            itemList: [{
                "category": "HIJAB",
                "percentage": 0
            },
            {
                "category": "SHOESCCBLK",
                "percentage": 0
            },
            {
                "category": "SHOESCCCB",
                "percentage": 0
            },
            {
                "category": "SHOESCCRR",
                "percentage": 0
            },
            {
                "category": "SHOESCCTAN",
                "percentage": 0
            }],
            countDownDisplay: '', timerID: 0,
            customer: "",
            userType: "",
            SLATime: 0,
            SLABurstTime: 0,
            SLATotal: 0,
            move: "DOWN",
            isLoading: false,
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
            lastStatusTimeMain: 0,

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

    getRequest(seg) {

        var request = {
            "bypassSimu": true,
            // body: {
            // "categorySegment": seg
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


        // alert(status)
    }
    componentWillReceiveProps(nextProps) {

        if (nextProps.orderDetail && nextProps.orderDetail.SHOESCCCB && !this.state.isItemView) {
            // alert(JSON.stringify(nextProps.orderDetail.SHOESCCCB));
            let inpData = nextProps.orderDetail.SHOESCCCB.Category;
            let itemlist = this.state.itemList;


            let deno = (parseInt(inpData.gdemandBuisness) + parseInt(inpData.gdemandAI) - (inpData.gemiratesStock + inpData.gsupplierStock));
            console.log(deno)
            let percentage = 1
            if (deno > 0) {
                percentage = inpData.gorderRecieved / deno || 0
            }
            // if (percentage > 0) {
            //     percentage = 0.0
            // }

            this.state.itemList[2].percentage = Math.round((percentage * 1000)) / 10
            this.setState({
                inpData: inpData,
                itemlist: itemlist,
                SHOESCCCB: nextProps.orderDetail.SHOESCCCB,
                isLoading: false
            });

        }

        if (nextProps.orderDetail && nextProps.orderDetail.SHOESCCRR && !this.state.isItemView) {

            let inpData = nextProps.orderDetail.SHOESCCRR.Category;
            let itemlist = this.state.itemList;

            let deno = (parseInt(inpData.gdemandBuisness) + parseInt(inpData.gdemandAI) - (inpData.gemiratesStock + inpData.gsupplierStock));
            console.log(deno)
            let percentage = 1
            if (deno > 0) {
                percentage = inpData.gorderRecieved / deno || 0
            }
            // if (percentage > 0) {
            //     percentage = 0.0
            // }

            itemlist[3].percentage = Math.round((percentage * 1000)) / 10
            // alert(JSON.stringify(itemlist[3].percentage));
            this.setState({
                itemlist: itemlist,
                SHOESCCRR: nextProps.orderDetail.SHOESCCRR,
                isLoading: false
            });

        }

        if (nextProps.orderDetail && nextProps.orderDetail.HIJAB && !this.state.isItemView) {

            let inpData = nextProps.orderDetail.HIJAB.Category;
            let itemlist = this.state.itemList;
            let deno = (parseInt(inpData.gdemandBuisness) + parseInt(inpData.gdemandAI) - (inpData.gemiratesStock + inpData.gsupplierStock));
            console.log(deno)
            let percentage = 1
            if (deno > 0) {
                percentage = inpData.gorderRecieved / deno || 0
            }
            // if (percentage > 0) {
            //     percentage = 0.0
            // }

            itemlist[0].percentage = Math.round((percentage * 1000)) / 10
            // alert(JSON.stringify(itemlist[0].percentage));
            this.setState({
                itemlist: itemlist,
                HIJAB: nextProps.orderDetail.HIJAB,
                isLoading: false
            });


        }
        if (nextProps.orderDetail && nextProps.orderDetail.SHOESCCBLK && !this.state.isItemView) {

            let inpData = nextProps.orderDetail.SHOESCCBLK.Category;
            let itemlist = this.state.itemList;
            let deno = (parseInt(inpData.gdemandBuisness) + parseInt(inpData.gdemandAI) - (inpData.gemiratesStock + inpData.gsupplierStock));
            console.log(deno)
            let percentage = 1
            if (deno > 0) {
                percentage = inpData.gorderRecieved / deno || 0
            }
            // if (percentage > 0) {
            //     percentage = 0.0
            // }

            itemlist[1].percentage = Math.round((percentage * 1000)) / 10
            // alert(JSON.stringify(itemlist[1].percentage));
            this.setState({
                itemlist: itemlist,
                SHOESCCBLK: nextProps.orderDetail.SHOESCCBLK,
                isLoading: false
            });

        }

        if (nextProps.orderDetail && nextProps.orderDetail.SHOESCCTAN && !this.state.isItemView) {
            let inpData = nextProps.orderDetail.SHOESCCTAN.Category;
            let itemlist = this.state.itemList;
            let deno = (parseInt(inpData.gdemandBuisness) + parseInt(inpData.gdemandAI) - (inpData.gemiratesStock + inpData.gsupplierStock));
            console.log(deno)
            let percentage = 1
            if (deno > 0) {
                percentage = inpData.gorderRecieved / deno || 0
            }
            // if (percentage > 0) {
            //     percentage = 0.0
            // }

            itemlist[4].percentage = Math.round((percentage * 1000)) / 10
            // alert(JSON.stringify(itemlist[0].percentage));
            this.setState({
                SHOESCCTAN: nextProps.orderDetail.SHOESCCTAN,
                itemlist: itemlist,
                isLoading: false
            });
        }

    }
    componentWillMount() {


        // if (this.props.suborderid) {
        //     // this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
        //     //     this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
        //     // })
        // } else {
        // this.props.actions.generalProcess(constants.getItemDetail, this.getRequest());
        // }
    }

    refresh() {

        this.setState({ isSubcontractor: true }, () => {
            this.props.actions.generalProcess(constants.generalItems, { "categorySegment": "HIJAB" });
            this.props.actions.generalProcess(constants.generalItems, { "categorySegment": "SHOESCCBLK" });
            this.props.actions.generalProcess(constants.generalItems, { "categorySegment": "SHOESCCCB" });
            this.props.actions.generalProcess(constants.generalItems, { "categorySegment": "SHOESCCRR" });
            this.props.actions.generalProcess(constants.generalItems, { "categorySegment": "SHOESCCTAN" });
        })

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
    getData(orderID, ind) {
        if (this.state.isItemView == true) {
            let id = this.state.itemList[ind].key
            browserHistory.push("/itemSummaryDetail/" + id)
        }
        let x = _.get(this.state, orderID, undefined);
        let newArr = [];
        this.setState({
            itemlist: newArr,
            isItemView: true
        });

        x.ItemList.forEach((element) => {
            let inpData = element.summary;
            let deno = (parseInt(inpData.demandBuisness) + parseInt(inpData.demandAI) - (inpData.emiratesStock + inpData.supplierStock));
            let percentage = 1
            if (deno > 0) {
                percentage = inpData.orderRecieved / deno || 0
            }
            // if (percentage > 0) {
            //     percentage = 0.0
            // }
            newArr.push({
                category: element.detail.data.description,
                key: element.detail.data.key,
                percentage: Math.round((percentage * 1000)) / 10
            })
        });
        // alert(JSON.stringify(newArr))
        this.state.itemList = newArr;
        this.setState({
            itemlist: newArr,
            isItemView: true
        });
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



                                                    {
                                                        this.state.itemList.map((val, ind) => {
                                                            return (
                                                                <li key={ind} className="icons_27 " onClick={this.getData.bind(this, val.category, ind)} style={{ height: "170px" }}>
                                                                    <CircularProgressbar
                                                                        className="CircularProgressbar progressbar-hover"
                                                                        percentage={val.percentage}
                                                                        backgroundPadding={10}
                                                                        initialAnimation={true}
                                                                        text={`${val.percentage}%`}
                                                                    />
                                                                    {/* <span className="progressbar-icon"><img src="/assets/order_screen_files/skirt.png" /></span> */}
                                                                    <label>{val.category}</label>
                                                                </li>
                                                            );
                                                        })}
                                                </ul>

                                                <div className="order-timeline" style={{ width: "85%", border: "none" }}>
                                                    <div className="border border-red ">
                                                        <img src="/assets/order_screen_files/warning.png" style={{ paddingRight: "10px" }} />
                                                        {this.state.inpData && Array.from(new Set(this.state.inpData.grisks.split("|"))).map((val, ind) => {
                                                            // val.split("~").map((elem) => {
                                                            // if (elem)
                                                            if (val && !(val.indexOf("risk") > -1)) {
                                                                anyStatus = true;
                                                                return (<span>{val.replace(/~/g, ' - ')} Delayed  </span>)
                                                            }
                                                        })
                                                        }
                                                        {!anyStatus && <span>no orders are delayed.</span>}<img width="40" src="/assets/truckIcon.png" />
                                                        <hr className="pg4" />
                                                    </div>

                                                    <div className="border border-green" style={{ border: "none" }}>
                                                        <div className="pg7"><img src="/assets/order_screen_files/warning-green.png" style={{ paddingRight: "10px" }} />
                                                            {this.state.inpData && Array.from(new Set(this.state.inpData.gstatus.split("|"))).map((val, ind) => {
                                                                if (val && !(val.indexOf("risk") > -1)) {
                                                                    anyDelay = true;
                                                                    return (<span>{val.replace(/~/g, ' - ')} On-time  </span>)
                                                                }

                                                            })}
                                                            {!anyDelay && <span>no orders are pending.</span>} <img width="40" src="/assets/truckgreen.png" />
                                                        </div>
                                                        <hr className="pg8" />
                                                    </div>
                                                    <div className="border border-green" style={{ border: "none" }}>
                                                        <div className="pg5">
                                                            <ul style={{ padding: "0", margin: "30px" }}>
                                                                <li style={{ display: "inline-block", padding: "0", margin: "auto", position: "relative" }} >
                                                                    <img src="/assets/order_screen_files/warning-copy.png" style={{ paddingRight: "10px" }} />
                                                                    {
                                                                        this.state.inpData && Array.from(new Set(this.state.inpData.gstatus.split("|"))).map((val, ind) => {
                                                                            if (val.indexOf("risk") > -1) {
                                                                                anyRisk = true;
                                                                                return (<span>{val.replace(/~/g, ' - ')}</span>)
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
