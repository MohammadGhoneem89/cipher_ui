/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';


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
class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFilters: "", gridData: [], orderDetail: {}, currentPageNo: 1, auditLogID: undefined, isLoading: false, pageData: {
                "pageSize": 10,
                "currentPageNo": 1,
                "totalRecords": 0
            },
            countDownDisplay: '', timerID: 0,
            customer: "",
            userType: "",
            SLATime: 0,
            SLABurstTime: 0,
            move: "DOWN",
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
            columnMain: ['item Description', 'item Code', 'Order Placed', 'ACK', 'Sub Order', 'Sub Order Ack', 'Production', 'Quality', 'Shipped', 'Recv Supplier', 'Recv Customer',],
            columnSub: ['item Description', 'item Code', 'Sub Order', 'Sub Order Ack', 'Production', 'Quality', 'Shipped', 'Recv Supplier'],
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

        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        // this.getSuborder = this.getSuborder.bind(this);

        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.closePopUP = this.closePopUP.bind(this);


    }
    timer() {
        var now = new Date().getTime();
        let countDownDate = this.state.SLABurstTime;

        if (this.state.move == 'DOWN') {
            var distance = countDownDate - now;
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
            body: {
                "orderID": this.props.id
            }
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
                this.renderSubStatus()
                this.calculateSLAmain()

            });

        } else {
            this.setState({
                selectedOrderID: "",
                isSubcontractor: false
            }, () => {
                this.renderMainStatus()
                this.calculateSLAmain()
            });

        }

    }
    renderStatus(orderID) {
        alert(status)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.orderDetail.order) {
            let data = nextProps.orderDetail;
            // alert(JSON.stringify(data.gridDataSubOrder))
            let dataMainGrid = data.gridData;
            let recList = []
            let dataSubGrid = data.gridDataSubOrder;
            data.order.additionalInfo && data.order.additionalInfo.forEach((elem) => {
                elem.receipts && elem.receipts.forEach((recItm) => {
                    let item = {
                        itemDescription: elem.itemDescription,
                        receiptNo: recItm.receiptNo,
                        receiptDate: recItm.receiptDate,
                        receiptQuantity: recItm.receiptQuantity,
                        itemCode: elem.itemCode
                    }
                    recList.push(item)
                })
            })

            this.setState({
                reciepts: recList || [],
                custInfo: data.supplier,
                subOrder: data.subOrder || [],
                orderDetail: data.order,
                userType: sessionStorage.orgType,
                gridData: dataMainGrid,
                gridDataOrig: data.gridData,
                gridDataSubOrder: dataSubGrid,
                slaData: data.contract.SLA || [],
                isLoading: false
            }, () => {
                this.calculateSLAmain()
                if (this.state.isSubcontractor)
                    this.renderSubStatus()
                else
                    this.renderMainStatus();
            });

            // let dap = nextProps.getOrderList.searchResult || [];
            // dap.forEach((elem) => {
            //     let actions = [{
            //         "value": "1003",
            //         "type": "componentAction",
            //         "label": "View",
            //         "params": "",
            //         "iconName": "icon-docs",
            //         "URI": [
            //             "/viewOrder/"
            //         ]
            //     }];
            //     elem.actions = actions;
            // })
            // // alert(JSON.stringify(dap))
            // this.setState({

            //     isLoading: false
            // });
        }


        this.setState({

            isLoading: false
        });
    }
    renderMainStatus() {
        let min = 999
        let lastStatusTime = 0
        this.state.gridData.forEach(element => {
            if (element.status <= min) {
                min = element.status
                lastStatusTime = element.lastStatusTime
            }
        });

        if (this.state.orderDetail.status == "INVOICED") {
            min = 9;
        }
        if (this.state.orderDetail.status == "PAID") {
            min = 10;
        }
        this.setState({
            mainStatus: min,
            lastStatusTimeMain: lastStatusTime
        })

        switch (min) {
            case 1:
                this.setState({
                    isPO: true,
                    isAck: false,
                    isSub: false,
                    isSubAck: false,
                    isSubProd: false,
                    isSubQual: false,
                    isSubShip: false,
                    isSubRecv: false,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 2:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: false,
                    isSubAck: false,
                    isSubProd: false,
                    isSubQual: false,
                    isSubShip: false,
                    isSubRecv: false,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 3:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: false,
                    isSubProd: false,
                    isSubQual: false,
                    isSubShip: false,
                    isSubRecv: false,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 4:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: true,
                    isSubProd: false,
                    isSubQual: false,
                    isSubShip: false,
                    isSubRecv: false,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 5:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: true,
                    isSubProd: true,
                    isSubQual: false,
                    isSubShip: false,
                    isSubRecv: false,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 6:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: true,
                    isSubProd: true,
                    isSubQual: true,
                    isSubShip: false,
                    isSubRecv: false,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 7:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: true,
                    isSubProd: true,
                    isSubQual: true,
                    isSubShip: true,
                    isSubRecv: false,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 8:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: true,
                    isSubProd: true,
                    isSubQual: true,
                    isSubShip: true,
                    isSubRecv: true,
                    isInv: false,
                    isPaid: false
                })
                break;
            case 9:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: true,
                    isSubProd: true,
                    isSubQual: true,
                    isSubShip: true,
                    isSubRecv: true,
                    isRecv: true,
                    isInv: true,
                    isPaid: false
                })
                break;
            case 10:
                this.setState({
                    isPO: true,
                    isAck: true,
                    isSub: true,
                    isSubAck: true,
                    isSubProd: true,
                    isSubQual: true,
                    isSubShip: true,
                    isSubRecv: true,
                    isRecv: true,
                    isInv: true,
                    isPaid: true
                })
                break;
            default:
                break
        }
    }
    renderSubStatus() {
        let min = 999
        let lastStatusTime = 0
        if (this.state.isSubcontractor) {

            this.state.gridDataSubOrder.forEach(element => {

                if (element.subOrderId == this.state.selectedOrderID && element.status <= min) {
                    min = element.status

                    lastStatusTime = element.lastStatusTime
                }
            });

            this.setState({
                subStatus: min,
                lastStatusTimeSub: lastStatusTime
            })
            switch (min) {
                case 1:
                    this.setState({
                        isSub: true,
                        isSubAck: false,
                        isSubProd: false,
                        isSubQual: false,
                        isSubShip: false,
                        isSubRecv: false,
                    })
                    break;
                case 2:
                    this.setState({
                        isSub: true,
                        isSubAck: true,
                        isSubProd: false,
                        isSubQual: false,
                        isSubShip: false,
                        isSubRecv: false,
                    })
                    break;
                case 3:
                    this.setState({
                        isSub: true,
                        isSubAck: true,
                        isSubProd: true,
                        isSubQual: false,
                        isSubShip: false,
                        isSubRecv: false,
                    })
                    break;
                case 4:
                    this.setState({
                        isSub: true,
                        isSubAck: true,
                        isSubProd: true,
                        isSubQual: true,
                        isSubShip: false,
                        isSubRecv: false,
                    })
                    break;
                case 5:
                    this.setState({
                        isSub: true,
                        isSubAck: true,
                        isSubProd: true,
                        isSubQual: true,
                        isSubShip: true,
                        isSubRecv: false,
                    })
                    break;
                case 6:
                    this.setState({
                        isSub: true,
                        isSubAck: true,
                        isSubProd: true,
                        isSubQual: true,
                        isSubShip: true,
                        isSubRecv: true,
                    })
                    break;
                default:
                    break
            }
        }
    }

    calculateSLAsub() {
        let min = 999
        if (this.state.isSubcontractor) {

            this.state.gridDataSubOrder.forEach(element => {

                if (element.subOrderId == this.state.selectedOrderID && element.status <= min) {
                    min = element.status
                }
            });

            this.setState({
                subStatus: min
            })

        }
    }

    calculateSLAmain() {
        // let min = 999
        // if (this.state.isSubcontractor) {
        let sladata = this.state.slaData;

        let totalSLA = 0;
        let SLATillNow = 0;
        //  alert(JSON.stringify(sladata))
        if (this.state.isSubcontractor) {
            if (sladata.length == 8) {
                let min = this.state.subStatus;

                for (let i = 0; i < min && i < 7; i++) {
                    SLATillNow += sladata[i].duration || 0
                }

                let isBurst = false;
                let x = new Date().getTime() / 1000 - this.state.lastStatusTimeSub
                let y = new Date().getTime() / 1000 - this.state.orderDetail.dateCreated

                if (y >= SLATillNow) {
                    this.setState({
                        SLABurstTime: 0
                    })
                } else {
                    this.setState({
                        SLABurstTime: new Date().getTime() + y * 1000
                    })
                }
            }
        } else {
            if (sladata.length == 8) {
                let min = this.state.mainStatus;

                for (let i = 0; i < min && i < 8; i++) {
                    SLATillNow += sladata[i].duration || 0
                }
                let isBurst = false;

                // let x = this.state.lastStatusTimeMain - this.state.orderDetail.dateCreated
                // if (x >= SLATillNow) {
                //     this.setState({
                //         SLABurstTime: 0
                //     })
                // } else {
                //     this.setState({
                //         SLABurstTime: this.state.lastStatusTimeSub + SLATillNow
                //     })
                // }
                let y = new Date().getTime() / 1000 - this.state.orderDetail.dateCreated

                if (y >= SLATillNow) {
                    this.setState({
                        SLABurstTime: 0
                    })
                } else {
                    this.setState({
                        SLABurstTime: new Date().getTime() + y * 1000
                    })
                }
            }
        }




    }
    componentWillMount() {

        if (this.props.suborderid) {
            this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
                this.props.actions.generalProcess(constants.getOrderDetail, this.getRequest());
            })
        } else {
            this.props.actions.generalProcess(constants.getOrderDetail, this.getRequest());
        }
    }

    refresh() {
        if (this.props.suborderid) {
            this.setState({ isSubcontractor: true, selectedOrderID: this.props.suborderid }, () => {
                this.props.actions.generalProcess(constants.getOrderDetail, this.getRequest());
            })
        } else {
            this.props.actions.generalProcess(constants.getOrderDetail, this.getRequest());
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
                this.props.actions.generalProcess(constants.getOrderDetail, this.getRequest());
            })
        } else {
            this.props.actions.generalProcess(constants.getOrderDetail, this.getRequest());
        }
    }

    clearFields() {
        $('#auditLogList').find('input:text').val('');
        $('#auditLogList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }
    getmeta() {
        if (this.state.isSubcontractor) {
            let selectedContractor = {}
            this.state.subOrder.forEach((elem) => {
                if (elem.subOrderID == this.state.selectedOrderID) {
                    selectedContractor = elem
                }
            });
            return (<div className="col-md-12 " style={{ marginTop: "50px" }}>
                <div className="table100 ver1 m-b-110" >
                    <div className="table100-head orderdetails-table">
                        <div className="order-title">Order Details</div>
                    </div>
                    <div className="" style={{ marginTop: "24px" }}>
                        <div className="col-md-12 orderdetail-txt">
                            <div className="col-md-6 order_profile">
                                <div className="col-md-3">
                                    <h4 style={{ fontWeight: "600", padding: "13px" }}>Order Raised By:</h4>
                                </div>
                                <div className="col-md-9 order_profile_img">
                                    <img className="user_img_tag" src={selectedContractor.image} />
                                    <h4 style={{ padding: "23px" }}>{selectedContractor.name}</h4>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="col-md-6">
                                    <ul className="orderdetails_text2">
                                        <li>Requested Date:</li>
                                        <li>Needed By:</li>
                                        <li>Designation: </li>
                                    </ul>
                                </div>
                                <div className="col-md-6">
                                    <ul style={{ listStyle: "none", color: "#000", fontSize: "16px" }}>
                                        <li>{selectedContractor.dateCreated ? moment.unix(selectedContractor.dateCreated).format('DD/MM/YYYY') : "N/A"}</li>
                                        <li>{this.state.custInfo.supplierEndDate}</li>
                                        <li>{selectedContractor.desigantion}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        } else {

            return (
                <div className="col-md-12 " style={{ marginTop: "50px" }}>
                    <div className="table100 ver1 m-b-110" >
                        <div className="table100-head orderdetails-table">
                            <div className="order-title">Order Details</div>
                        </div>
                        <div className="" style={{ marginTop: "24px" }}>
                            <div className="col-md-12 orderdetail-txt">
                                <div className="col-md-6 order_profile">
                                    <div className="col-md-3">
                                        <h4 style={{ fontWeight: "600", padding: "13px" }}>Order Raised By:</h4>
                                    </div>
                                    <div className="col-md-9 order_profile_img">
                                        <img className="user_img_tag" src={this.state.orderDetail.image} />
                                        <h4 style={{ padding: "23px" }}>{this.state.orderDetail.name}</h4>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="col-md-6">
                                        <ul className="orderdetails_text2">
                                            <li>Requested Date:</li>
                                            <li>Needed By:</li>
                                            <li>Designation: </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul style={{ listStyle: "none", color: "#000", fontSize: "16px" }}>
                                            <li>{this.state.orderDetail.dateCreated ? moment.unix(this.state.orderDetail.dateCreated).format('DD/MM/YYYY') : "N/A"}</li>
                                            <li>{this.state.custInfo.supplierEndDate}</li>
                                            <li>{this.state.orderDetail.desigantion}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>)
        }
    }
    getTable() {
        let totalSub = {
            "subOrderId": "TOTAL",
            "itemDescription": "TOTAL",
            "itemCode": "--",
            "quantityTotal": 0,
            "quantitySubAck": 0,
            "quantitySubProd": 0,
            "quantitySubQual": 0,
            "quantitySubShip": 0,
            "quantitySubRecv": 0
        };

        let total = {
            "itemDescription": "TOTAL",
            "itemCode": "--",
            "quantityTotal": 0,
            "quantityAck": 0,
            "quantitySub": 0,
            "quantitySubAck": 0,
            "quantitySubProd": 0,
            "quantitySubQual": 0,
            "quantitySubShip": 0,
            "quantitySubRecv": 0,
            "quantityRecv": 0
        };
        if (this.state.isSubcontractor) {
            return (<div className="col-md-12 " style={{ marginTop: "-24px" }}>
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

                                    this.state.gridDataSubOrder.map((val, index) => {
                                        // alert(JSON.stringify(val))
                                        if (this.state.selectedOrderID == val.subOrderId || "TOTAL" == val.subOrderId) {
                                            totalSub.quantityTotal += val.quantityTotal;
                                            totalSub.quantitySubAck += val.quantitySubAck;
                                            totalSub.quantitySubProd += val.quantitySubProd;
                                            totalSub.quantitySubQual += val.quantitySubQual;
                                            totalSub.quantitySubShip += val.quantitySubShip;
                                            totalSub.quantitySubRecv += val.quantitySubRecv;

                                            return (
                                                <tr key={index} className="row100 ">
                                                    <td className="cell100 td_1" ><img src="/assets/order_detail_screen_files/user.png" className="user_img" />{val.itemDescription} </td>
                                                    <td className="cell100 ">{val.itemCode}</td>
                                                    <td className="cell100 ">{val.quantityTotal}</td>
                                                    <td className="cell100 ">{val.quantitySubAck}</td>
                                                    <td className="cell100 ">{val.quantitySubProd}</td>
                                                    <td className="cell100 ">{val.quantitySubQual}</td>
                                                    <td className="cell100 ">{val.quantitySubShip}</td>
                                                    <td className="cell100 ">{val.quantitySubRecv}</td>
                                                </tr>
                                            )
                                        }
                                    })
                                }

                                <tr className="row100 table-red_bg">
                                    <td className="cell100 td_1" >{totalSub.itemDescription} </td>
                                    <td className="cell100 ">{totalSub.itemCode}</td>
                                    <td className="cell100 ">{totalSub.quantityTotal}</td>
                                    <td className="cell100 ">{totalSub.quantitySubAck}</td>
                                    <td className="cell100 ">{totalSub.quantitySubProd}</td>
                                    <td className="cell100 ">{totalSub.quantitySubQual}</td>
                                    <td className="cell100 ">{totalSub.quantitySubShip}</td>
                                    <td className="cell100 ">{totalSub.quantitySubRecv}</td>
                                </tr>


                            </tbody>
                        </table>
                        <div className="ps__rail-x" style={{ left: "0px", bottom: "-581px" }}>
                            <div className="ps__thumb-x" tabindex="0" style={{ left: "0px", width: "0px" }}></div>
                        </div>
                    </div>
                </div>
            </div>
            );
        } else {
            return (<div className="col-md-12 " style={{ marginTop: "-24px" }}>
                <div className="table100 ver1 m-b-110">
                    <div className="table100-body js-pscroll ps ps--active-y">
                        <table>
                            <thead className="table100-head">
                                <tr className="row100 head">
                                    {this.state.columnMain.map((val, index) => {
                                        return (<th key={index} className={`cell100 `}>{val}</th>)
                                    })}
                                </tr>
                            </thead>
                            <tbody style={{ borderRadius: "40px" }}>



                                {this.state.gridData.map((val, index) => {
                                    total.quantityTotal += val.quantityTotal;
                                    total.quantitySubAck += val.quantitySubAck;
                                    total.quantitySubProd += val.quantitySubProd;
                                    total.quantitySubShip += val.quantitySubShip;
                                    total.quantitySubRecv += val.quantitySubRecv;
                                    total.quantityAck += val.quantityAck;
                                    total.quantitySub += val.quantitySub;
                                    total.quantityRecv += val.quantityRecv;

                                    return (
                                        <tr key={index} className="row100 ">
                                            <td className="cell100 td_1" ><img src="/assets/order_detail_screen_files/user.png" className="user_img" />{val.itemDescription} </td>
                                            <td className="cell100 ">{val.itemCode}</td>
                                            <td className="cell100 ">{val.quantityTotal}</td>
                                            <td className="cell100 ">{val.quantityAck}</td>
                                            <td className="cell100 ">{val.quantitySub}</td>
                                            <td className="cell100 ">{val.quantitySubAck}</td>
                                            <td className="cell100 ">{val.quantitySubProd}</td>
                                            <td className="cell100 ">{val.quantitySubQual}</td>
                                            <td className="cell100 ">{val.quantitySubShip}</td>
                                            <td className="cell100 ">{val.quantitySubRecv}</td>
                                            <td className="cell100 ">{val.quantityRecv}</td>
                                        </tr>
                                    )
                                })}
                                <tr className="row100 table-red_bg">
                                    <td className="cell100 td_1" >{total.itemDescription} </td>
                                    <td className="cell100 ">{total.itemCode}</td>
                                    <td className="cell100 ">{total.quantityTotal}</td>
                                    <td className="cell100 ">{total.quantityAck}</td>
                                    <td className="cell100 ">{total.quantitySub}</td>
                                    <td className="cell100 ">{total.quantitySubAck}</td>
                                    <td className="cell100 ">{total.quantitySubProd}</td>
                                    <td className="cell100 ">{total.quantitySubQual}</td>
                                    <td className="cell100 ">{total.quantitySubShip}</td>
                                    <td className="cell100 ">{total.quantitySubRecv}</td>
                                    <td className="cell100 ">{total.quantityRecv}</td>
                                </tr>
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
    }
    renderSLA(statusCode, type) {
        // let rep = this.calculateSLAmain();


        if (type == "subStatus") {
            if (this.state[type] + 1 == statusCode) {
                return (<span className={this.state.isBurst ? `timer burst` : 'timer'}>{this.state.countDownDisplay}  </span>);
            }
        } else {

            if (this.state[type] == statusCode) {
                return (<span className={this.state.isBurst ? `timer burst` : 'timer'}>{this.state.countDownDisplay}</span>);
            }
        }
    }
    renderStatus() {


        if (this.state.isSubcontractor) {

            return (<div className="form-wizard">
                <ul className="nav nav-pills nav-justified steps">

                    <li className={this.state.isSub ? "done" : "inactive"}>
                        <a href="#" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc"><i className="fa fa-check"></i>Place Sub Order</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(1, "subStatus")}</i>
                    </li>
                    <li className={this.state.isSubAck ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Acknoledge Sub-Supplier</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(2, "subStatus")}</i>
                    </li>
                    <li className={this.state.isSubProd ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Production</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(3, "subStatus")}</i>
                    </li>
                    <li className={this.state.isSubQual ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Quality Check</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(4, "subStatus")}</i>
                    </li>
                    <li className={this.state.isSubShip ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Shipped</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true"> {this.renderSLA(5, "subStatus")} </i>
                    </li>
                    <li className={this.state.isSubShip ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Shipped</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true"> {this.renderSLA(6, "subStatus")} </i>
                    </li>
                    <li className={this.state.isSubRecv ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Recieved By<br />Supplier</span>
                        </a>

                    </li>

                </ul>
            </div>
            )
        } else {

            return (<div className="form-wizard">
                <ul className="nav nav-pills nav-justified steps">
                    <li className={this.state.isPO ? "done" : "inactive"}>
                        <a href="#" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number"></span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Place Order
                </span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(1, "mainStatus")}</i>
                    </li>

                    <li className={this.state.isAck ? "done" : "inactive"}>
                        <a href="#" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc"><i className="fa fa-check"></i>Ack By Supplier</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(2, "mainStatus")}</i>
                    </li>
                    <li className={this.state.isSub ? "done" : "inactive"}>
                        <a href="#" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc"><i className="fa fa-check"></i>Place Sub Order</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(3, "mainStatus")}</i>
                    </li>
                    <li className={this.state.isSubAck ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Ack By Sub-Supplier</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(4, "mainStatus")}</i>
                    </li>
                    <li className={this.state.isSubProd ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Production</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(5, "mainStatus")}</i>
                    </li>
                    <li className={this.state.isSubQual ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Quality Check</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(6, "mainStatus")}</i>
                    </li>
                    <li className={this.state.isSubShip ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Shipped</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(7, "mainStatus")}</i>
                    </li>
                    <li className={this.state.isSubRecv ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Recieved By<br />Supplier</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true">{this.renderSLA(8, "mainStatus")}</i>
                    </li>
                    <li className={this.state.isSubRecv ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Recieved By<br />Emirates Group</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </li>
                    <li className={this.state.isInv ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Invoiced</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
                    </li>
                    <li className={this.state.isPaid ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Paid</span>
                        </a>

                    </li>

                </ul>
            </div>
            )
        }
    }

    render() {
        if (this.state.isLoading == false) {
            return (
                <div>

                    <ModalBox isOpen={this.state.isOpenEmirates}>
                        <Portlet title={utils.getLabelByID("Order Reciepts")} isPermissioned={true}>
                            <div className="row" >
                                <div className="col-md-12">

                                    <div className="row">
                                        <div className="col-md-12">
                                            <Table gridColumns={utils.getGridColumnByName("orderReciepts")} gridData={this.state.reciepts}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.closePopUP} >{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Portlet>
                    </ModalBox>
                    <div className="portlet light  " style={{ border: "0px solid #e7ecf1" }}>
                        <div className="row">
                            <div className="order-card col-md-12" style={{ height: "800px" }}>
                                <div className="col-md-12">


                                    <div className="order_sidebar-bg " style={{ height: "-webkit-fill-available" }}>
                                        <label className="order-sidebar-btn"><i className="fa order-sidebar-icon"></i></label>
                                        <div className="order-sidebar-circle"></div>
                                        <aside id="sidebar" className="sidebar sidebar-default open order_sidebar" role="navigation" >
                                            <div className="sidebar-header order-delay-sidebar-header header-cover" style={{ backgroundImage: `url(${this.state.custInfo.logo})` }}>
                                            </div>
                                            <div className="order_no_title">
                                                <h4>Order No.</h4><hr /><h5>{this.state.orderDetail.orderID ? this.state.orderDetail.orderID : "N/A"}</h5>
                                                <h6>0x89AB7865EF7654FFEE87658765</h6></div>
                                            <br /><br />
                                            <nav >
                                                <a href="#" id="menu-icon"></a>
                                                <ul className="nav-ul" style={{ zIndex: "800" }}>
                                                    {/* <li className="maxdelay-txt">Max Delay 5 Days<img src="/assets/order_detail_screen_files/hourglass-icon.png" /></li> */}
                                                    <li className="scancode"><img src="/assets/order_detail_screen_files/Qr-code.png" />Scan<br />QR Code</li>
                                                </ul>
                                            </nav>
                                            {
                                                this.state.userType == "SUPPLIER" &&
                                                <div style={{ marginTop: "110px" }} >
                                                    {/* suborders */}
                                                    {
                                                        // this.state.customer == "SUPP" &&
                                                        this.state.subOrder.map((val, index) => {
                                                            return (
                                                                <div key={index}>
                                                                    <div className="order_no_title">
                                                                        <button className="btn btn dark" onClick={this.getSuborder.bind(this, val.subOrderID)} style={{ width: "90%" }} >{val.subOrderID}</button>
                                                                    </div>
                                                                    <br />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    { // this.state.customer == "SUPP" &&
                                                        <div >
                                                            <div className="order_no_title">
                                                                <button className="btn btn dark" onClick={this.getSuborder.bind(this, "Main")} style={{ width: "90%" }} >Main Order</button>
                                                            </div>
                                                            <br />
                                                        </div>
                                                    }

                                                </div>
                                            }
                                            {/* end suborders */}
                                        </aside>
                                    </div>

                                    <div className="order-content">
                                        <div className="order-delay-card">
                                            {this.renderStatus()}
                                            {this.getTable()}
                                            {this.getmeta()}


                                            <div className="col-md-12" style={{ marginTop: "24px" }}>
                                                <div className="btn-toolbar pull-right">
                                                    {
                                                        this.state.userType == "CUSTOMER" &&
                                                        <button type="button" className="btn green">Update Status Customer</button>
                                                    }
                                                    {
                                                        this.state.userType == "CUSTOMER" &&
                                                        <button type="submit" onClick={this.renderPopupBody.bind("RECIEPT")} className="btn green">View Reciept</button>
                                                    }
                                                    {
                                                        this.state.userType == "SUPPLIER" &&
                                                        <button type="submit" className="btn green">Create Sub Order</button>
                                                    }
                                                    {
                                                        this.state.userType == "SUPPLIER" &&
                                                        <button type="button" className="btn green">Update Status Supplier</button>
                                                    }
                                                    {
                                                        this.state.userType == "SUBSUPPLIER" &&
                                                        <button type="submit" className="btn green">Update Status Sub-Supplier</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

OrderView.propTypes = {
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
OrderView.displayName = "Order Dettail(s)";
export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
