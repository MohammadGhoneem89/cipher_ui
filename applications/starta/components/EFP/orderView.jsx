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
import { Timeline, TimelineEvent } from 'react-event-timeline'
import ModalBoxSla from '../../common/ModalBox.jsx';
let interval;
class OrderView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchFilters: "", gridData: [], orderDetail: {}, currentPageNo: 1, auditLogID: undefined, isLoading: false, pageData: {
                "pageSize": 10,
                "currentPageNo": 1,
                "totalRecords": 0,

            },
            tiles: true,
            countDownDisplay: '', timerID: 0,
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
            lastStatusTimeMain: 0,
            SLADetail: [],
            isOpenSLA: false,
        };

        this.settle = this.settle.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        // this.getSuborder = this.getSuborder.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.closePopUP = this.closePopUP.bind(this);

        this.renderSLAPopupBody = this.renderSLAPopupBody.bind(this);
        this.closeSLAPopUP = this.closeSLAPopUP.bind(this);

        this.getSLADetail = this.getSLADetail.bind(this);
        this.renderTimelineEvents = this.renderTimelineEvents.bind(this);
        this.getStatusForTimeline = this.getStatusForTimeline.bind(this);
        this.transformOrderStatus = this.transformOrderStatus.bind(this);
    }
    settle() {
        // alert(constants.settlement)
        this.props.actions.generalProcess(constants.settlement, {
            "bypassSimu": true,
            "body": {
                "orderID": this.state.orderDetail.orderID,
                "supplierID": this.state.orderDetail.supplierID,
                "customerID": this.state.orderDetail.customerID,
                "amount": this.state.orderDetail.orderAmount
            }
        });
    }

    timer() {
        var now = new Date().getTime();
        let countDownDate = this.state.SLABurstTime * 1000;
        // console.log(countDownDate)
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

    renderSLAPopupBody(type) {
        this.setState({ isOpenSLA: true })
    }


    closePopUP() {
        this.setState({ isOpenEmirates: false })
    }

    closeSLAPopUP() {
        this.setState({ isOpenSLA: false })
    }

    getRequest() {

        var request = {
            "bypassSimu": true,
            body: {
                "orderID": this.props.id
            }
        }
        this.setState({ currentPageNo: 1 })
        // console.log(JSON.stringify(request))

        return request;
    }

    getSuborder(orderID) {
        if (orderID != "Main") {
            this.setState({
                selectedOrderID: orderID,
                isSubcontractor: true,
                tiles: false
            }, () => {
                this.renderSubStatus()
                this.calculateSLAmain()

            });

        } else {
            this.setState({
                selectedOrderID: "",
                isSubcontractor: false,
                tiles: true
            }, () => {
                this.renderMainStatus()
                this.calculateSLAmain()
            });

        }

    }
    renderStatus(orderID) {
        alert(status)
    }

    determineStatus(order) {
        // console.log(JSON.stringify(order))

        let totalSLATime = 0
        for (let i = 0; i < order.sla.length; i++) {
            // console.log("order.sla" + order.sla[i])
            totalSLATime += order.sla[i].duration / 1000
        }
        // console.log("total sla " + totalSLATime)

        let actualTime = Math.round((new Date()).getTime() / 1000) - order.dateCreated
        //let actualTime = 1555308812 - order.dateCreated
        // console.log("actualTime: " + actualTime)

        let SLAToCurrent = 0

        if (order.status == "PO") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "ACK") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "SUBORDER") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "ACK-SUBORDER") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (order.status == "PROD") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER" || order.sla[i].fromStage == "ACK-SUBORDER" && order.sla[i].toStage == "PROD") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "QC") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER" || order.sla[i].fromStage == "ACK-SUBORDER" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "SHIPPED" || order.status == 'Shipped') {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER" || order.sla[i].fromStage == "ACK-SUBORDER" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC" || order.sla[i].fromStage == "QC" && order.sla[i].toStage == "SHIPPED") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "RECIEVED" || order.status == "RECIEVED1") {
            for (let i = 0; i < order.sla.length; i++) {
                if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK" || order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER" || order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER" || order.sla[i].fromStage == "ACK-SUBORDER" && order.sla[i].toStage == "PROD" || order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC" || order.sla[i].fromStage == "QC" && order.sla[i].toStage == "SHIPPED" || order.sla[i].fromStage == "SHIPPED" && order.sla[i].toStage == "RECEIVED1" || order.sla[i].fromStage == "SHIPPED" && order.sla[i].toStage == "RECEIVED") {
                    SLAToCurrent += order.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (order.status == "Invoiced" || order.status == "INVOICED" || order.status == "RECEIVED2" || order.status == "PAID" || order.status == "Paid") {
            SLAToCurrent = totalSLATime
            actualTime = order.invoiceTime - order.dateCreated
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        if (actualTime >= totalSLATime) {
            // console.log(actualTime)
            // console.log(SLAToCurrent)

            let seconds = actualTime - SLAToCurrent

            let d = Math.floor(seconds / (3600 * 24));
            let h = Math.floor(seconds % (3600 * 24) / 3600);
            let m = Math.floor(seconds % 3600 / 60);
            let s = Math.floor(seconds % 60);

            let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
            let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
            let mDisplay = ""
            let sDisplay = ""
            if (d <= 0) {
                mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
                if (h <= 0) {
                    sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                }
            }
            return {
                value: "Delayed By " + dDisplay + hDisplay + mDisplay + sDisplay,
                type: "red"
            }
        }
        else if (actualTime < totalSLATime) {
            if (actualTime - SLAToCurrent <= 0) {
                return {
                    value: "On Time",
                    type: "green"
                }
            }
            else {
                let seconds = actualTime - SLAToCurrent
                let d = Math.floor(seconds / (3600 * 24));
                let h = Math.floor(seconds % (3600 * 24) / 3600);
                let m = Math.floor(seconds % 3600 / 60);
                let s = Math.floor(seconds % 60);

                let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
                let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
                let mDisplay = ""
                let sDisplay = ""
                if (d <= 0) {
                    mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
                    if (h <= 0) {
                        sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
                    }
                }
                return {
                    value: "Expected Delay By " + dDisplay + hDisplay + mDisplay + sDisplay,
                    type: "orange"
                }

            }
        }
    }

    getTimeBreakUp(seconds) {

        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 60);

        let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
        let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
        let mDisplay = ""
        let sDisplay = ""
        if (d <= 0) {
            mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
            if (h <= 0) {
                sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            }
        }
        return sDisplay;
    }

    getSLADetail(order) {
        let SLADetail = []
        let SLAToCurrent = 0;



        for (let i = 0; i < order.sla.length; i++) {

            if (order.sla[i].fromStage == "PO" && order.sla[i].toStage == "ACK") {
                SLAToCurrent = order.sla[i].duration / 1000
                let SLADetailItem = {
                    "state": "Purchase Order  - Acknowledged By Supplier",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.ackTime - order.dateCreated)
                }
                SLADetail.push(SLADetailItem)
            }
            else if (order.sla[i].fromStage == "ACK" && order.sla[i].toStage == "SUBORDER") {
                SLAToCurrent = order.sla[i].duration / 1000
                let SLADetailItem = {
                    "state": "Acknowledged By Supplier - Place Suborder",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.SubOrderTime - order.ackTime)
                }
                SLADetail.push(SLADetailItem)
            }
            /*else if (order.sla[i].fromStage == "SUBORDER" && order.sla[i].toStage == "ACK-SUBORDER") {
                SLAToCurrent = order.sla[i].duration / 1000          
                let SLADetailItem = {
                    "state": "Place Suborder - Suborder Acknowledged",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.ackTime - order.dateCreated)
                }
                SLADetail.push(SLADetailItem)
            }*/
            /*else if (order.sla[i].fromStage == "ACK-SUBORDER" && order.sla[i].toStage == "PROD") {
                SLAToCurrent = order.sla[i].duration / 1000          
                let SLADetailItem = {
                    "state": "Suborder Acknowledged - Production",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.ackTime - order.dateCreated)
                }
                SLADetail.push(SLADetailItem)
            }*/
            else if (order.sla[i].fromStage == "PROD" && order.sla[i].toStage == "QC") {
                SLAToCurrent = order.sla[i].duration / 1000
                let SLADetailItem = {
                    "state": "Production - Quality Check",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.QCTime - order.prodTime)
                }
                SLADetail.push(SLADetailItem)
            }
            else if (order.sla[i].fromStage == "QC" && order.sla[i].toStage == "SHIPPED") {
                SLAToCurrent = order.sla[i].duration / 1000
                let SLADetailItem = {
                    "state": "Quality Check - Shipped",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.shippedTime - order.QCTime)
                }
                SLADetail.push(SLADetailItem)
            }
            if (order.sla[i].fromStage == "SHIPPED" && order.sla[i].toStage == "RECIEVED") {

                SLAToCurrent = order.sla[i].duration / 1000
                let SLADetailItem = {
                    "state": "Shipped - Received by Supplier",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.received1Time - order.shippedTime)
                }
                SLADetail.push(SLADetailItem)
            }
            if (order.sla[i].fromStage == "RECIEVED" && order.sla[i].toStage == "RECIEVED2") {
                SLAToCurrent = order.sla[i].duration / 1000
                let SLADetailItem = {
                    "state": "Received by Supplier - Received by Emirates",
                    "SLA": this.getTimeBreakUp(SLAToCurrent),
                    "actualTime": this.getTimeBreakUp(order.invoiceTime - order.received1Time)
                }
                SLADetail.push(SLADetailItem)
            }
            //return SLAToCurrent;
            // console.log('======================' + JSON.stringify(SLADetail))

        }
        return SLADetail;
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.orderDetail.order) {
            let data = nextProps.orderDetail;
            // alert(JSON.stringify(data.gridDataSubOrder))
            let dataMainGrid = data.gridData;
            let recList = []
            let dataSubGrid = data.gridDataSubOrder;

            if (dataSubGrid) {
                dataSubGrid.forEach((element) => {
                    data.contract.additionalInfo.forEach((elem) => {
                        if (element.itemCode == elem.itemCode) {
                            element.image = elem.image
                        }
                    })
                });
            }

            dataMainGrid.forEach((element) => {
                data.contract.additionalInfo.forEach((elem) => {
                    if (element.itemCode == elem.itemCode) {
                        element.image = elem.image
                    }
                })
            });
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
                isLoading: false,

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
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>", this.state.orderDetail.dateCreated)
        //  alert(JSON.stringify(sladata))
        if (this.state.isSubcontractor) {
            if (sladata.length == 8) {
                let min = this.state.subStatus;

                // for (let i = 0; i < min && i < 7; i++) {
                sladata.forEach((elem) => {
                    SLATillNow += elem.duration || 0
                })


                let y = new Date().getTime() / 1000 - this.state.orderDetail.dateCreated
                if (y >= SLATillNow) {
                    this.setState({
                        SLATotal: SLATillNow,
                        SLABurstTime: 0,
                        isBurst: true
                    })
                } else {
                    this.setState({
                        SLATotal: SLATillNow,
                        SLABurstTime: this.state.orderDetail.dateCreated + SLATillNow / 1000,
                        isBurst: false
                    })
                }
            }
        } else {
            if (sladata.length == 8) {
                let min = this.state.mainStatus;

                sladata.forEach((elem) => {
                    SLATillNow += elem.duration || 0
                })
                let y = new Date().getTime() / 1000 - this.state.orderDetail.dateCreated
                if (y >= SLATillNow) {
                    this.setState({
                        SLATotal: SLATillNow,
                        SLABurstTime: 0,
                        isBurst: true
                    })
                } else {
                    this.setState({
                        SLATotal: SLATillNow,
                        SLABurstTime: this.state.orderDetail.dateCreated + SLATillNow / 1000,
                        isBurst: false
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
            }, 5000);
        }
    }

    searchCallBack(keyWord) {

    }
    componentWillUnmount() {
        // clearInterval(this.state.timerID);
        clearTimeout(interval)
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        // let timerID = setInterval(this.timer.bind(this), 5000);
        // this.setState({ timerID })
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
            return (<div className="col-md-12 " style={{ marginTop: "20px" }}>
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
                <div className="col-md-12 " style={{ marginTop: "20px" }}>
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
                                            {
                                                (this.state.userType == "SUPPLIER" ||
                                                    this.state.userType == "CUSTOMER") && this.state.isInv == true &&
                                                <li>Order Recieved Date: </li>

                                            }
                                            {
                                                (this.state.userType == "SUPPLIER" ||
                                                    this.state.userType == "CUSTOMER") && this.state.isInv == true &&
                                                <li>Order Expected Date: </li>
                                            }


                                        </ul>
                                    </div>
                                    <div className="col-md-6">
                                        <ul style={{ listStyle: "none", color: "#000", fontSize: "16px" }}>
                                            <li>{this.state.orderDetail.dateCreated ? moment.unix(this.state.orderDetail.dateCreated).format('DD/MM/YYYY') : "N/A"}</li>
                                            <li>{this.state.custInfo.supplierEndDate}</li>
                                            <li>{this.state.orderDetail.desigantion}</li>
                                            {
                                                (this.state.userType == "SUPPLIER" ||
                                                    this.state.userType == "CUSTOMER") && this.state.isInv == true &&
                                                <li>{this.state.orderDetail.invoiceTime ? moment.unix(this.state.orderDetail.invoiceTime).format('DD/MM/YYYY hh:mm:ss') : "N/A"}</li>


                                            }
                                            {
                                                (this.state.userType == "SUPPLIER" ||
                                                    this.state.userType == "CUSTOMER") && this.state.isInv == true &&
                                                <li> {moment.unix(this.state.orderDetail.dateCreated + this.state.SLATotal / 1000).format('DD/MM/YYYY hh:mm:ss')}</li>

                                            }

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
                                                    <td className="cell100 td_1" ><img src={val.image} className="user_img" />{val.itemDescription} </td>
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
                            <div className="ps__thumb-x" tabIndex="0" style={{ left: "0px", width: "0px" }}></div>
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
                                    total.quantitySubQual += val.quantitySubQual;

                                    total.quantityAck += val.quantityAck;
                                    total.quantitySub += val.quantitySub;
                                    total.quantityRecv += val.quantityRecv;

                                    return (
                                        <tr key={index} className="row100 ">
                                            <td className="cell100 td_1" ><img src={val.image} className="user_img" />{val.itemDescription} </td>
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
                            <div className="ps__thumb-x" tabIndex="0" style={{ left: "0px", width: "0px" }}></div>
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
            if (this.state[type] == statusCode) {
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
                    {/* <li className={this.state.isSubShip ? "done" : "inactive"}>
                        <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                            <span className="number">
                            </span>
                            <span className="desc">
                                <i className="fa fa-check"></i>Shipped</span>
                        </a>
                        <i className="fa fa-long-arrow-right" aria-hidden="true"> {this.renderSLA(6, "subStatus")} </i>
                    </li> */}
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

    getStatusForTimeline(stage) {
        let totalSLATime = 0
        for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
            totalSLATime += this.state.orderDetail.sla[i].duration / 1000
        }
        console.log("totalsla " + totalSLATime)

        let actualTime = 0
        switch (stage) {
            case "ACK":
                actualTime = this.state.orderDetail.ackTime - this.state.orderDetail.dateCreated;
                break;
            case "SUBORDER":
                actualTime = this.state.orderDetail.SubOrderTime - this.state.orderDetail.dateCreated;
                break;
            case "ACK-SUBORDER":
                actualTime = this.state.orderDetail.AckSuborderTime - this.state.orderDetail.dateCreated;
                break;
            case "PROD":
                actualTime = this.state.orderDetail.prodTime - this.state.orderDetail.dateCreated;
                break;
            case "QC":
                actualTime = this.state.orderDetail.QCTime - this.state.orderDetail.dateCreated;
                break;
            case "SHIPPED":
                actualTime = this.state.orderDetail.shippedTime - this.state.orderDetail.dateCreated;
                break;
            case "RECEIVED1":
                actualTime = this.state.orderDetail.received1Time - this.state.orderDetail.dateCreated;
                break;
            case "RECEIVED2":
                actualTime = this.state.orderDetail.invoiceTime - this.state.orderDetail.dateCreated;
                break;
            case "INVOICED":
                actualTime = this.state.orderDetail.invoiceTime - this.state.orderDetail.dateCreated;
                break;
            case "PAID":
                actualTime = this.state.orderDetail.invoiceTime - this.state.orderDetail.dateCreated;
                break;
        }
        console.log("actual" + actualTime)
        if (actualTime <= 0)
            actualTime = Math.round((new Date()).getTime() / 1000) - this.state.orderDetail.dateCreated
        console.log("actual" + actualTime)

        let SLAToCurrent = 0

        if (stage == "PO") {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            console.log("PO SLAToCurrent: " + SLAToCurrent)
        }

        if (stage == "ACK") {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            console.log("ACK SLAToCurrent: " + SLAToCurrent)
        }

        if (stage == "SUBORDER") {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK" || this.state.orderDetail.sla[i].fromStage == "ACK" && this.state.orderDetail.sla[i].toStage == "SUBORDER") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            console.log("SUborder SLAToCurrent: " + SLAToCurrent)
        }

        if (stage == "ACK-SUBORDER") {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK" || this.state.orderDetail.sla[i].fromStage == "ACK" && this.state.orderDetail.sla[i].toStage == "SUBORDER" || this.state.orderDetail.sla[i].fromStage == "SUBORDER" && this.state.orderDetail.sla[i].toStage == "ACK-SUBORDER") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            console.log("ack-suborder SLAToCurrent: " + SLAToCurrent)
        }

        if (stage == "PROD") {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK" || this.state.orderDetail.sla[i].fromStage == "ACK" && this.state.orderDetail.sla[i].toStage == "SUBORDER" || this.state.orderDetail.sla[i].fromStage == "SUBORDER" && this.state.orderDetail.sla[i].toStage == "ACK-SUBORDER" || this.state.orderDetail.sla[i].fromStage == "ACK-SUBORDER" && this.state.orderDetail.sla[i].toStage == "PROD") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            console.log("prod SLAToCurrent: " + SLAToCurrent)
        }

        else if (stage == "QC") {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK" || this.state.orderDetail.sla[i].fromStage == "ACK" && this.state.orderDetail.sla[i].toStage == "SUBORDER" || this.state.orderDetail.sla[i].fromStage == "SUBORDER" && this.state.orderDetail.sla[i].toStage == "ACK-SUBORDER" || this.state.orderDetail.sla[i].fromStage == "ACK-SUBORDER" && this.state.orderDetail.sla[i].toStage == "PROD" || this.state.orderDetail.sla[i].fromStage == "PROD" && this.state.orderDetail.sla[i].toStage == "QC") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            console.log("qc SLAToCurrent: " + SLAToCurrent)
        }

        else if (stage == "SHIPPED" || stage == 'Shipped') {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK" || this.state.orderDetail.sla[i].fromStage == "ACK" && this.state.orderDetail.sla[i].toStage == "SUBORDER" || this.state.orderDetail.sla[i].fromStage == "SUBORDER" && this.state.orderDetail.sla[i].toStage == "ACK-SUBORDER" || this.state.orderDetail.sla[i].fromStage == "ACK-SUBORDER" && this.state.orderDetail.sla[i].toStage == "PROD" || this.state.orderDetail.sla[i].fromStage == "PROD" && this.state.orderDetail.sla[i].toStage == "QC" || this.state.orderDetail.sla[i].fromStage == "QC" && this.state.orderDetail.sla[i].toStage == "SHIPPED") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        else if (stage == "RECEIVED" || stage == "RECEIVED1") {
            for (let i = 0; i < this.state.orderDetail.sla.length; i++) {
                if (this.state.orderDetail.sla[i].fromStage == "PO" && this.state.orderDetail.sla[i].toStage == "ACK" || this.state.orderDetail.sla[i].fromStage == "ACK" && this.state.orderDetail.sla[i].toStage == "SUBORDER" || this.state.orderDetail.sla[i].fromStage == "SUBORDER" && this.state.orderDetail.sla[i].toStage == "ACK-SUBORDER" || this.state.orderDetail.sla[i].fromStage == "ACK-SUBORDER" && this.state.orderDetail.sla[i].toStage == "PROD" || this.state.orderDetail.sla[i].fromStage == "PROD" && this.state.orderDetail.sla[i].toStage == "QC" || this.state.orderDetail.sla[i].fromStage == "QC" && this.state.orderDetail.sla[i].toStage == "SHIPPED" || this.state.orderDetail.sla[i].fromStage == "SHIPPED" && this.state.orderDetail.sla[i].toStage == "RECEIVED1" || this.state.orderDetail.sla[i].fromStage == "SHIPPED" && this.state.orderDetail.sla[i].toStage == "RECEIVED") {
                    SLAToCurrent += this.state.orderDetail.sla[i].duration / 1000
                }
            }
            console.log("received1 SLAToCurrent: " + SLAToCurrent)
        }

        else if (stage == "Invoiced" || stage == "INVOICED" || stage == "RECEIVED2" || stage == "PAID" || stage == "Paid") {
            SLAToCurrent = totalSLATime
            actualTime = this.state.orderDetail.invoiceTime - this.state.orderDetail.dateCreated
            // console.log("SLAToCurrent: " + SLAToCurrent)
        }

        let seconds = actualTime - SLAToCurrent

        let d = Math.floor(seconds / (3600 * 24));
        let h = Math.floor(seconds % (3600 * 24) / 3600);
        let m = Math.floor(seconds % 3600 / 60);
        let s = Math.floor(seconds % 60);

        let dDisplay = d > 0 ? d + (d == 1 ? " day " : " days ") : "";
        let hDisplay = h > 0 ? h + (h == 1 ? " hour " : " hours ") : "";
        let mDisplay = ""
        let sDisplay = ""
        if (d <= 0) {
            mDisplay = m > 0 ? m + (m == 1 ? " minute " : " minutes ") : "";
            if (h <= 0) {
                sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            }
        }

        if (actualTime >= totalSLATime) {
            // console.log(actualTime)
            // console.log(SLAToCurrent)

            return "Delayed By " + dDisplay + hDisplay + mDisplay + sDisplay
        }
        else if (actualTime < totalSLATime) {
            if (actualTime - SLAToCurrent <= 0) {
                return "On Time"
            }
            else {
                return "Delayed By " + dDisplay + hDisplay + mDisplay + sDisplay
            }
        }


    }



    renderTimelineEvents() {
        let events = [];
        //PO
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("PO")}
                createdAt={new Date(this.state.orderDetail.dateCreated * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">shopping_cart</i>}
                iconColor='#6fba1c'
                titleStyle={{ fontWeight: 'bold' }}
            >
                On Time
                        </TimelineEvent>)
        }

        //ACK
        if (this.state.orderDetail.status == "PO") {
            events.push(<TimelineEvent title={this.transformOrderStatus("ACK")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">check</i>}
                iconColor={this.getStatusForTimeline("ACK") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("ACK")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("ACK")}
                createdAt={new Date(this.state.orderDetail.ackTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">check</i>}
                iconColor={this.getStatusForTimeline("ACK") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("ACK")}
            </TimelineEvent>)
        }

        //SUBORDER
        if (this.state.orderDetail.status == "PO") {
            events.push(<TimelineEvent title={this.transformOrderStatus("SUBORDER")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">reorder</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                Pending
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "ACK") {
            events.push(<TimelineEvent title={this.transformOrderStatus("SUBORDER")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">reorder</i>}
                iconColor={this.getStatusForTimeline("SUBORDER") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("SUBORDER")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("SUBORDER")}
                createdAt={new Date(this.state.orderDetail.SubOrderTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">reorder</i>}
                iconColor={this.getStatusForTimeline("SUBORDER") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("SUBORDER")}
            </TimelineEvent>)
        }

        //ACK-SUBORDER
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK") {
            events.push(<TimelineEvent title={this.transformOrderStatus("ACK-SUBORDER")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">check_circle</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                Pending
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "SUBORDER") {
            events.push(<TimelineEvent title={this.transformOrderStatus("ACK-SUBORDER")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">check_circle</i>}
                iconColor={this.getStatusForTimeline("ACK-SUBORDER") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("ACK-SUBORDER")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("ACK-SUBORDER")}
                createdAt={new Date(this.state.orderDetail.AckSuborderTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">check_circle</i>}
                iconColor={this.getStatusForTimeline("ACK-SUBORDER") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("ACK-SUBORDER")}
            </TimelineEvent>)
        }

        //PROD
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER") {
            events.push(<TimelineEvent title={this.transformOrderStatus("PROD")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">settings</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("PROD")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "ACK-SUBORDER") {
            events.push(<TimelineEvent title={this.transformOrderStatus("PROD")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">settings</i>}
                iconColor={this.getStatusForTimeline("PROD") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("PROD")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("PROD")}
                createdAt={new Date(this.state.orderDetail.prodTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">settings</i>}
                iconColor={this.getStatusForTimeline("PROD") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("PROD")}
            </TimelineEvent>)
        }

        //QC
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER") {
            events.push(<TimelineEvent title={this.transformOrderStatus("QC")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">search</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                Pending
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "PROD") {
            events.push(<TimelineEvent title={this.transformOrderStatus("QC")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">search</i>}
                iconColor={this.getStatusForTimeline("QC") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("QC")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("QC")}
                createdAt={new Date(this.state.orderDetail.QCTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">search</i>}
                iconColor={this.getStatusForTimeline("QC") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("QC")}
            </TimelineEvent>)
        }

        //SHIPPED
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD") {
            events.push(<TimelineEvent title={this.transformOrderStatus("SHIPPED")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">local_shipping</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                Pending
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "QC") {
            events.push(<TimelineEvent title={this.transformOrderStatus("SHIPPED")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">local_shipping</i>}
                iconColor={this.getStatusForTimeline("SHIPPED") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("SHIPPED")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("SHIPPED")}
                createdAt={new Date(this.state.orderDetail.shippedTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">local_shipping</i>}
                iconColor={this.getStatusForTimeline("SHIPPED") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("SHIPPED")}
            </TimelineEvent>)
        }

        //RECEIVED1
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC") {
            events.push(<TimelineEvent title={this.transformOrderStatus("RECEIVED1")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">receipt</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                Pending
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "SHIPPED") {
            events.push(<TimelineEvent title={this.transformOrderStatus("RECEIVED1")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">receipt</i>}
                iconColor={this.getStatusForTimeline("RECEIVED1") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("RECEIVED1")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("RECEIVED1")}
                createdAt={new Date(this.state.orderDetail.received1Time * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">receipt</i>}
                iconColor={this.getStatusForTimeline("RECEIVED1") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("RECEIVED1")}
            </TimelineEvent>)
        }

        //RECEIVED2
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED") {
            events.push(<TimelineEvent title={this.transformOrderStatus("RECEIVED2")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">receipt</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                Pending
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "RECEIVED1") {
            events.push(<TimelineEvent title={this.transformOrderStatus("RECEIVED2")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">receipt</i>}
                iconColor={this.getStatusForTimeline("RECEIVED2") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("RECEIVED2")}
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("RECEIVED2")}
                createdAt={new Date(this.state.orderDetail.invoiceTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">receipt</i>}
                iconColor={this.getStatusForTimeline("RECEIVED2") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("RECEIVED2")}
            </TimelineEvent>)
        }

        //PAID
        if (this.state.orderDetail.status == "PO" || this.state.orderDetail.status == "ACK" || this.state.orderDetail.status == "SUBORDER" || this.state.orderDetail.status == "ACK-SUBORDER" || this.state.orderDetail.status == "PROD" || this.state.orderDetail.status == "QC" || this.state.orderDetail.status == "SHIPPED" || this.state.orderDetail.status == "RECEIVED1" || this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED") {
            events.push(<TimelineEvent title={this.transformOrderStatus("PAID")}
                createdAt="Pending"
                icon={<i className="material-icons md-18">attach_money</i>}
                iconColor="#6fba1c"
                titleStyle={{ fontWeight: 'bold' }}
            >
                "Pending"
            </TimelineEvent>)
        }
        else if (this.state.orderDetail.status == "PAID") {
            events.push(<TimelineEvent title={this.transformOrderStatus("PAID")}
                createdAt={new Date(this.state.orderDetail.paidTime * 1000).toLocaleString()}
                icon={<i className="material-icons md-18">attach_money</i>}
                iconColor={this.getStatusForTimeline("PAID") == "On Time" ? "#6fba1c" : "red"}
                titleStyle={{ fontWeight: 'bold' }}
            >
                {this.getStatusForTimeline("PAID")}
            </TimelineEvent>)
        }

        return events
    }

    transformOrderStatus = (stage) => {
        switch (stage) {

            case "PO": { stage = "Purchase Order"; break; };
            case "QC": { stage = "Quality Check"; break; };
            case "SHIPPED": { stage = "Shipped"; break; };
            case "ACK": { stage = "Acknowledged By Supplier"; break; };
            case "PROD": { stage = "Production"; break; };
            case "SUBORDER": { stage = "Place Suborder"; break; };
            case "ACK-SUBORDER": { stage = "Suborder Acknowledged"; break; };
            case "RECEIVED1": { stage = "Received By Supplier"; break; };
            case "RECEIVED": { stage = "Received By Supplier"; break; };
            case "RECEIVED2": { stage = "Received By Emirates"; break; };
            case "INVOICED": { stage = "Received By Emirates"; break; };
            case "PAID": { stage = "Paid"; break; };
            default: return stage
        }
        return stage;
    }

    render() {
        if (this.state.isLoading == false) {
            // {console.log("-----"+JSON.stringify(this.state.orderDetail))}
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

                    <ModalBoxSla isOpen={this.state.isOpenSLA} width='35%' left= '40%'>
                        <Portlet title={utils.getLabelByID("Order Timeline")} isPermissioned={true}>
                            
                                <div className="bg-info text-center">
                                    <Timeline>
                                        {this.renderTimelineEvents()}

                                    </Timeline>
                                </div>
                            <div className="row" >
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.closeSLAPopUP} >{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Portlet>
                    </ModalBoxSla>




                    <div className="portlet light  " style={{ border: "0px solid #e7ecf1" }}>
                        <div className="row">
                            <div className="order-card col-md-12" style={{ height: "1000px" }}>
                                <div className="col-md-12">


                                    <div className="order_sidebar-bg " style={{ height: "-webkit-fill-available" }}>
                                        <label className="order-sidebar-btn"><i className="fa order-sidebar-icon"></i></label>
                                        <div className=""></div>
                                        <aside id="sidebar" className="sidebar sidebar-default open order_sidebar" role="navigation" >
                                            <div className="sidebar-header order-delay-sidebar-header header-cover" style={{ backgroundImage: `url(${this.state.custInfo.logo})` }}>
                                            </div>
                                            <div className="order_no_title">
                                                <h4>Order No. </h4><hr /><h5>{this.state.orderDetail.orderID ? this.state.orderDetail.orderID : "N/A"} </h5>
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
                                                                        <button className="btn btn white  btn-outline" onClick={this.getSuborder.bind(this, val.subOrderID)} style={{ width: "90%" }} >{val.subOrderID}</button>
                                                                    </div>
                                                                    <br />
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                    { // this.state.customer == "SUPP" &&
                                                        <div >
                                                            <div className="order_no_title">
                                                                <button className="btn btn white  btn-outline" onClick={this.getSuborder.bind(this, "Main")} style={{ width: "90%" }} >Main Order</button>
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
                                        {/* {(this.state.orderDetail.status == "RECEIVED2" || this.state.orderDetail.status == "INVOICED" || this.state.orderDetail.status == "PAID") && <h3 className={this.determineStatus(this.state.orderDetail).type} style={{ textAlign: "center", padding: "5px" }}>{this.determineStatus(this.state.orderDetail).value}</h3>} */}
                                        <h3 className={this.determineStatus(this.state.orderDetail).type} style={{ textAlign: "center", padding: "5px" }}>{this.determineStatus(this.state.orderDetail).value}</h3>
                                        <div className="order-delay-card">

                                            {this.renderStatus()}
                                            {this.getTable()}
                                            {/* {console.log("tiles status", this.state.isInv, "user", this.state.userType)} */}
                                            {(this.state.userType == "SUPPLIER" ||
                                                this.state.userType == "CUSTOMER") && !!this.state.tiles &&
                                                < div className="row">
                                                    <div className="col-md-12 "
                                                        style={{
                                                            marginTop: "20px",
                                                            display: this.state.isInv == true ? 'block' : 'none'
                                                        }}>
                                                        {/* {console.log("tiles status", this.state.isInv, "user", this.state.userType)} */}
                                                        <div className="col-md-3 " >
                                                            <div className="table100 ver1 m-b-110" style={{ width: "220px" }}>
                                                                <div className="table100-head orderdetails-table">
                                                                    <div className="order-title">Order Amount</div>
                                                                </div>
                                                                <div className="" style={{ marginTop: "24px" }}>
                                                                    <div className="col-md-12 orderdetail-txt">

                                                                        <div className="col-md-12 text-center">
                                                                            <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>{(Math.round(this.state.orderDetail.orderAmount)).toLocaleString()}</h4>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <i className="fa fa-minus" style={{
                                                            position: "absolute",
                                                            top: "90px",
                                                            fontSize: "15px",
                                                            marginLeft: " -50px"
                                                        }} aria-hidden="true"></i>
                                                        <div className="col-md-3 " >
                                                            {console.log("tINSIDE BLOCKS")}
                                                            <div className="table100 ver1 m-b-110" style={{ width: "220px" }}>
                                                                <div className="table100-head orderdetails-table" >
                                                                    <div className="order-title">Penalty</div>
                                                                </div>
                                                                <div className="" style={{ marginTop: "24px" }}>
                                                                    <div className="col-md-12 orderdetail-txt">

                                                                        <div className="col-md-12 text-center">
                                                                            <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>{(Math.round(this.state.orderDetail.penalty)).toLocaleString()}</h4>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <i className="fa fa-minus" style={{
                                                            position: "absolute",
                                                            top: "90px",
                                                            fontSize: "15px",
                                                            marginLeft: " -50px"
                                                        }} aria-hidden="true"></i>

                                                        <div className="col-md-3 " >
                                                            {console.log("tINSIDE BLOCKS")}
                                                            <div className="table100 ver1 m-b-110" style={{ width: "220px" }}>
                                                                <div className="table100-head orderdetails-table">
                                                                    <div className="order-title">Rebate</div>
                                                                </div>
                                                                <div className="" style={{ marginTop: "24px" }}>
                                                                    <div className="col-md-12 orderdetail-txt">

                                                                        <div className="col-md-12 text-center">
                                                                            <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>{(Math.round(this.state.orderDetail.discount)).toLocaleString()}</h4>
                                                                        </div>


                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <i className="fa fa-equal" style={{
                                                            position: "absolute",
                                                            top: "90px",
                                                            fontWeight: "800",
                                                            fontSize: "32px",
                                                            marginLeft: " -50px"
                                                        }} aria-hidden="true"></i>
                                                        <div className="col-md-3 " >
                                                            {/* {console.log("tINSIDE BLOCKS")} */}
                                                            <div className="table100 ver1 m-b-110" style={{ width: "220px" }}>
                                                                <div className="table100-head orderdetails-table" style={{ width: "220px" }}>
                                                                    <div className="order-title">Total </div>
                                                                </div>
                                                                <div className="" style={{ marginTop: "24px" }}>
                                                                    <div className="col-md-12 orderdetail-txt">

                                                                        <div className="col-md-12 text-center">
                                                                            <h4 style={{ fontWeight: "800", padding: "26px", fontSize: "32px" }}>{(Math.round((this.state.orderDetail.orderAmount - this.state.orderDetail.penalty - this.state.orderDetail.discount))).toLocaleString()}</h4>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            }
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
                                                        this.state.isInv == true && this.state.isPaid == false && this.state.userType == "CUSTOMER" &&
                                                        <button type="button" onClick={this.settle.bind(this)} className="btn green">Settle</button>
                                                    }

                                                    {
                                                        this.state.userType == "SUBSUPPLIER" &&
                                                        <button type="submit" className="btn green">Update Status Sub-Supplier</button>
                                                    }

                                                    {

                                                        <button type="submit" onClick={this.renderSLAPopupBody.bind("RECIEPT")} className="btn green">View SLA</button>
                                                    }






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
OrderView.displayName = "__ORD";
export default connect(mapStateToProps, mapDispatchToProps)(OrderView);
