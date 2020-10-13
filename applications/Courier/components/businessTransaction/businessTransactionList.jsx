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
import Combobox from '../../../../core/common/Select.jsx';
import AnchorComp from '../../common/AnchorComp.jsx';

import Col from '../../common/Col.jsx';;
import Table from '../../common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';
import * as gen from '../../common/generalActionHandler'
import Portlet from '../../common/Portlet.jsx';
import Checklist from '../../common/CheckList.jsx';
// import HorizontalBarChart from '../../common/charts/HorizontalChartBar.jsx';
import PieChart from '../../common/charts/PieChart.jsx';
import { Bar, Line } from 'react-chartjs-2';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import TileUnitNew from '../../../../core/common/TileUnitNew.jsx';
import HorizontalbarChartTechnician from '../../common/charts/HorizontalbarChartTechnician.jsx';
import moment from 'moment';
import VerticalBarChart from '../../common/charts/VerticalBarChart.jsx';

import processorData from './processorData.json';
import stageData from './stageData.json';
import documentData from './documentData.json';
import jsonData from '../../common/dummyData/dashboard.json';
import ModalBox from '../../../../core/common/ModalBox.jsx';


let interval;
class BusinessTransaction extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Container: {
                "processor" : "ALL"
            },
            currentPageNo: 1,
            isOpen: false,
            isLoading: true,
            jsonData : undefined,
            selectedStages : ["Pre Submission", "Post Submission"],
            selectedDocuments : ["Declaration", "NR Claim", "Deposit Claim"],
            transactionList: [],
            declarationBarCharts: [],
            nrClaimBarCharts: [],
            depClaimBarCharts: [],
            tilesData: {},
            businessTransOrigList : [],
            businessTransDataList : [],
            businessTransCriticalList : [],
            businessTransWarnList : [],
            widget2Loading: true,
            widget3Loading : true,
            attentionItems : [],
            totalRecords: 0,
            businessTransDataError:[],
            monitoringInterval:undefined,
            currentActiveTab: 'Declaration',
            criticalBtn: false,
            warnBtn: false,
            transactionMonitoringScale : [
                {
                    "fromState" : "Waiting Generation",
                    "toState" : "Signature Pending",
                    "warnInterval" : 180,
                    "criticalInterval" : 300,
                    "isMonitor" : true,
                    "isOptional" : false
                },
                {
                    "fromState" : "Signature Pending",
                    "toState" : "Signed-Ready Submission",
                    "warnInterval" : 180,
                    "criticalInterval" : 300,
                    "isMonitor" : true,
                    "isOptional" : false
                },
                {
                    "fromState" : "Signed-Ready Submission",
                    "toState" : "Submission Failure",
                    "warnInterval" : 180,
                    "criticalInterval" : 300,
                    "isMonitor" : true,
                    "isOptional" : false
                },
                {
                    "fromState" : "Signed-Ready Submission",
                    "toState" : "Submission Success",
                    "warnInterval" : 180,
                    "criticalInterval" : 300,
                    "isMonitor" : false,
                    "isOptional" : false
                },
                {
                    "fromState" : "Submission Failure",
                    "toState" : "Waiting Generation",
                    "warnInterval" : 180,
                    "criticalInterval" : 300,
                    "isMonitor" : true,
                    "isOptional" : true
                },
                {
                    "fromState" : "Submission Success",
                    "toState" : "Pending Status",
                    "warnInterval" : 86400,
                    "criticalInterval" : 172800,
                    "isMonitor" : true,
                    "isOptional" : true
                }
            ],
            declarationProcessors: [
                {
                  "name": "ALL",
                  "imageURL": "/assets/Resources/images/all.png"
                },
                {
                  "name": "DHL",
                  "imageURL": "/assets/Resources/images/dhl.png"
                },
                {
                  "name": "Dubai Customs",
                  "imageURL": "/assets/Resources/images/dubai-south.png"
                },
                {
                  "name": "Amazon",
                  "imageURL": "/assets/Resources/images/noon.png"
                },
                {
                  "name": "FedEx",
                  "imageURL": "/assets/Resources/images/fedex.jpg"
                },
                ,
                {
                  "name": "Noon",
                  "imageURL": "/assets/Resources/images/noon.png"
                },
                {
                    "name": "Agility",
                    "imageURL": "/assets/Resources/images/agility_logo_appicon.png"
                },
                {
                    "name": "Aramex",
                    "imageURL": "/assets/Resources/images/aramex_icon.png"
                }
              ],
            demoIntervalTime:[
                [2, 0], // 1  mins
                [2, 1], // 2  hours
                [5, 0], // 3  mins
                [2, 0], // 4  mins
                [2, 1], // 5 hours
                [2, 1], // 6 hours  
                [2, 0], // 7 mins
                [2, 1], // 8 hours
                [2, 0], // 9 mins
                [2, 1], // 10 hours
                [2, 1], // 11 hours
                [20, 1], // 12 hours
                [2, 1], // 13 hours
                [2, 1], // 14 hours
                [2, 0], // 15 mins
                [2, 0], // 16 mins
                [2, 1], // 17 hours
                [2, 1], // 18  hours 
                [2, 0], // 19 mins
                [2, 1], // 20 hours
                [1, 2], // 21 days
            ]

        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
        this.closePopUP = this.closePopUP.bind(this);
        this.showPopUP = this.showPopUP.bind(this);
        this.clearFields = this.clearFields.bind(this);

    //    this.processorHandler = this.processorHandler(this);
//        this.customActionHandler = customActionHandler.bind(this);
//        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
//        this.sendCall = this.sendCall.bind(this);
//        this.generalActionHandler = gen.generalHandler.bind(this);
        // this.applyFilter = this.applyFilter.bind(this);
        // this.clearFilter = this.clearFilter.bind(this);
    }

    downloadDummyCSV = (CSV) => {
        let keys = []
        if (CSV.length > 0) {
            keys = Object.keys(CSV[0])
        } else {
            toaster.showToast(utils.getLabelByID("No Records found for the selected booking date"), "ERROR")
            return
        }
        keys.splice(keys.indexOf("imageData"),1);
        keys.splice(keys.indexOf("errors"),1);
        keys.splice(keys.indexOf("orderInvoiceDecl"),1);
        keys.splice(keys.indexOf("lastActivity"),1);
        keys.splice(keys.indexOf("actions"),1);
        keys.splice(keys.indexOf("errorCt"),1);
        keys.splice(keys.indexOf("errorDescription"),1);
        // for(var i=0; i < keys.length; i++){
        //     if(typeof keys[i] === 'object' && keys[i] !== null)
        //         keys.splice(i,1);
        // }
        

        console.log("keys === ", keys);
        CSV = CSV.map((obj) => {
            let row = ``
            keys.forEach((key, index) => {
                if (index == keys.length - 1) {
                    row += `${obj[key]}`
                } else {
                    row += `${obj[key]},`
                }
            })
            return row
        })
        CSV.unshift(keys.join(","))
        CSV = CSV.join('\n');
        // const url = window.URL.createObjectURL(new Blob([CSV], { type: "application/vnd.ms-excel" }));
        const url = window.URL.createObjectURL(new Blob([CSV], { type: "text/plain" }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `exporting_${moment().format("MM_DD_YYYY_HH_mm_ss")}.csv`);
        document.body.appendChild(link);
        link.click();
    }



    setIntervalForMonitoring = () => {
        const monitoringInterval = setInterval(() => {
            this.commonActionExecutor()
            
        }, 10000);

        this.setState({monitoringInterval});
    }

    showPopUP(err) {
        console.log("errors ==== ",err);
        this.setState({
            businessTransDataError: err,
            isOpen: true
        })
    }

    closePopUP() {
        this.setState({ isOpen: false })
    }
    
    pageChanged(pageNo) {
        if (pageNo != undefined) {
    
          this.setState({currentPageNo: pageNo})
    
          this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget3", "listing"))
        }
      }

    processorHandler = (formname, fieldname, type, e) => {
        console.log('type', type, e);
        if (type == "combobox"){
            let value = e.target.value;
            let formdata = _.get(this.state, formname, {});
            _.set(formdata, e.target.name, value);
            this.setState({
                [formname]: formdata
            }, () => {
                console.log('formname', JSON.stringify(this.state[formname]));
            });

            this.commonActionExecutor()

        }
    }

    soapPayloadHandler = () => {
        console.log("SOAP Payload Handler")
    }

    

    componentDidMount() {
        window.scrollTo(0, 0);

        let courier = _.cloneDeep(courier);

        // courier.map((item)=>{
        //     console.log("item ==== ",item)
        // })
        
        this.setState({
            jsonData : {
                "processorData": processorData,
                "stage": stageData,
                "document": documentData
            }
        })
        this.commonActionExecutor()
    //    this.setIntervalForMonitoring();
    }

    componentWillUnmount() {
        clearInterval(this.state.monitoringInterval);
        console.log("BusinessTransaction Unmounting")
    }

    componentWillReceiveProps(nextProps) { // correction will be made after correction in api
        console.log("nextProps = ", nextProps);
        if(nextProps.widget1.data){
            let tilesData = _.cloneDeep(this.state.tilesData);
            console.log("next Props tilesData = ", tilesData);
            let data = nextProps.widget1.data.map((item) =>{
                let obj = {
                    [item.value] : item.label 
                }
                return obj;
            })
            this.setState({
                tilesData: data,
                widget1Loading: false,
                isLoading : false,
            });
        }

        if(nextProps.widget2.data && this.state.widget2Loading){
        //    let barChartData = _.cloneDeep(this.state.barChartData);
            console.log("next Props tilesData = ", nextProps.widget2.data);
            let declarationBarCharts= [];
            let nrClaimBarCharts= [];
            let depClaimBarCharts= [];

            let selectedDocuments = _.cloneDeep(this.state.selectedDocuments);
            for(let r=0; r<selectedDocuments.length; r++){
                let currGraph;
                if(selectedDocuments[r] === 'Declaration'){
                    currGraph = "declarationData"
                }
                if(selectedDocuments[r] === 'NR Claim'){
                    currGraph = "NRClaimData"
                }
                if(selectedDocuments[r] === 'Deposit Claim'){
                    currGraph = "depositClaimData"
                }
                let barchart = [];
                nextProps.widget2.data[currGraph].data.forEach((item) =>{
                    let xIndex = _.get(item, 'xIndex');
                    let yIndex = _.get(item, 'yIndex');
                    let zIndex = _.get(item, 'zIndex');
                    let find = false;
                    for(var i=0; i<barchart.length; i++){
                        if(barchart[i].riskName === xIndex.value){
                            let key = zIndex.value
                            barchart[i][key] = yIndex.value
                            find = true;
                            break;
                        }
                    }
                    if(!find){
                        let obj = {
                            "riskName":xIndex.value,
                            [zIndex.value]: yIndex.value 
                        }
                        barchart.push(obj);
                    }
                })
                if(selectedDocuments[r] === 'Declaration'){
                    declarationBarCharts = barchart
                }
                if(selectedDocuments[r] === 'NR Claim'){
                    nrClaimBarCharts = barchart
                }
                if(selectedDocuments[r] === 'Deposit Claim'){
                    depClaimBarCharts = barchart
                }
            }
            
            console.log("declarationBarCharts array  ==== ", declarationBarCharts);
            console.log("nrClaimBarCharts array  ==== ", nrClaimBarCharts);
            console.log("depClaimBarCharts array  ==== ", depClaimBarCharts);

            this.setState({
                declarationBarCharts,
                nrClaimBarCharts,
                depClaimBarCharts,
                widget2Loading: false
            }); 
        }

        if(nextProps.widget3.pageData && nextProps.widget3.data.searchResult){
            let businessTransDataList = [];
            let businessTransCriticalList = [];
            let businessTransWarnList = [];
            console.log("next Props businessTransDataList = ", nextProps.widget3.data.searchResult);
            let transactionMonitoringScale = _.cloneDeep(this.state.transactionMonitoringScale);
            let index = 0;
            nextProps.widget3.data.searchResult.forEach((item) => {
            //    searchResult.lenth()
                console.log("items === ", item);
                console.log("length ======= ",item.errors.length)
                let _item = _.cloneDeep(item);
                let target = -1;

                _item.imageData = _.find(this.state.declarationProcessors, {"name":_item.submittedBy}) ? _.find(this.state.declarationProcessors, {"name":_item.submittedBy}) : {"name":_item.submittedBy, "imageURL": ""}
                _item.orderInvoiceDecl = {"orderNo":_item.orderNo, "invoiceNo": _item.invoiceNo, "declarationNo" : _item.declarationNo};
                for(var i=0; i<transactionMonitoringScale.length; i++){
                    if(transactionMonitoringScale[i].fromState === _item.lastStage && transactionMonitoringScale[i].toState === _item.currentStage)
                    {
                        target = i;
                        break;
                    }
                }
                console.log("target ============ ", target)
                let format_arr = ["minutes", "hours", "days"];
         //       let lastDate = moment().subtract(parseInt((Math.random() * 10) + 1),format_arr[parseInt((Math.random() * 3))]).format("MM/DD/YYYY HH:mm:ss");  // dummy date
                let lastDate = moment().subtract(parseInt(this.state.demoIntervalTime[index][0]),format_arr[this.state.demoIntervalTime[index][1]]).format("MM/DD/YYYY HH:mm:ss");  // dummy date
                index++;
              //  let lastDate = moment.unix(item.lastActivityDateTime).format("MM/DD/YYYY HH:mm:ss") // actual logic

                let currTime = moment().format("MM/DD/YYYY HH:mm:ss")
                let seconds = moment(currTime).diff(moment(lastDate), "seconds")

                let years = moment(currTime).diff(moment(lastDate), "years")
                let months = moment(currTime).diff(moment(lastDate), "months")
                let weeks = moment(currTime).diff(moment(lastDate), "weeks")           
                let days = moment(currTime).diff(moment(lastDate), "days")
                let hours = moment(currTime).diff(moment(lastDate), "hours")
                let mins = moment(currTime).diff(moment(lastDate), "minutes")
                if(years > 0)
                    lastDate +=  " - " + years + " yr ago";
                else if(months > 0)
                    lastDate +=  " - " + months + " month ago";   
                else if(weeks > 0)
                    lastDate +=  " - " + weeks + " week ago";      
                else if(days > 0)
                    lastDate +=  " - " + days + " day ago" ;
                else if(hours > 0)
                    lastDate +=  " - " + hours + " hr ago";        
                else if(mins > 0)
                    lastDate +=  " - " + mins + " min ago";
                console.log("seconds -==== ", seconds);
                if(target !== -1){
                    if(seconds <= 0)
                    {
                        _item.lastActivity = {
                            "type": "",
                            "value": lastDate
                        }
                    }
                    
                    else
                    if(transactionMonitoringScale[i].criticalInterval <= seconds){
                        _item.lastActivity = {
                            "type": "critical",
                            "value": lastDate
                        }
                    }
                    else
                    if(transactionMonitoringScale[i].warnInterval <= seconds){

                        _item.lastActivity = {
                            "type": "warn",
                            "value": lastDate
                        }
                    }
                    else{
                        _item.lastActivity = {
                            "type": "",
                            "value": lastDate
                        }
                    }
                }
                else{
                    _item.lastActivity = {
                        "type": "",
                        "value": lastDate
                    }
                }
                
                if(_item.errors.length > 0){
                    _item.errorCt = _item.errors.length ,
                    _item.errorDescription={
                            errorDescription:_item.errors[0].errorDescription,
                            action : this.showPopUP,
                            errors:_item.errors
                        }
                }
                else{
                    _item.errorCt = "0",
                    _item.errorDescription={
                        errorDescription: "-",
                        action : this.showPopUP
                    }
                }

                _item.actions = [{
                    URI: ["/courier/orderDetails"],
                    iconName: "icon-docs",
                    label: "View",
                    params: "",
                    type: "componentAction",
                    value: "1003",
                }]
                console.log("_item ===== ",_item)
                if(_item.lastActivity.type === "critical")
                    businessTransCriticalList.push(_item);
                else if(_item.lastActivity.type === "warn")
                    businessTransWarnList.push(_item);                   
                businessTransDataList.push(_item);
            })
            

            console.log("finalListbusinessTransDataList", businessTransDataList);
            // let data = nextProps.widget1.data.map((item) =>{
            //     let obj = {
            //         [item.value] : item.label 
            //     }
            //     return obj;
            // })
            this.setState({
                businessTransOrigList : businessTransDataList,
                businessTransDataList,
                businessTransCriticalList,
                businessTransWarnList,
                widget3Loading: false,
                totalRecords: nextProps.widget3.pageData.totalRecords 
            });
        }

        if(nextProps.widget4.data){
            console.log("next Props attentionItems = ", nextProps.widget4.data);
            // businessTransDataList = nextProps.widget3.data.map((item) => {
            //         item.errorCode = item.errors[0].errorCode,
            //         item.errorDescription = item.errors[0].errorDescription,
            //         item.errors = ""
            // })
            


            // let data = nextProps.widget1.data.map((item) =>{
            //     let obj = {
            //         [item.value] : item.label 
            //     }
            //     return obj;
            // })
            this.setState({
                attentionItems: nextProps.widget4.data,
                widget4Loading: false
            });
        }
    }

    submitStageDocumentBtn(){
//        if(this.state.selectedStages.length > 0 || this.state.selectedDocuments.length > 0){
        this.commonActionExecutor()
//        }
    }

    commonActionExecutor = () => {
        this.setState({
            widget1Loading: true,
            widget2Loading: true,
            widget3Loading : true,
            widget4Loading : true
        })
        this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget1", "tiles"))
        this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget2", "Declaration Pipeline"))
        this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget3", "listing"))
        this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget4", "actionitems"))
    }

    selectStages(value) {
        console.log(value);
        let array = [...this.state.selectedStages];
        if (array.find((x, index) => value == x)) {
            array.splice(array.indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedStages: array
        })
        this.submitStageDocumentBtn();
    }
    selectDocuments(value) {
        console.log(value);
        let hit = false;
        let array = [...this.state.selectedDocuments];
        if (array.find((x, index) => value == x)) {
            if(array.length > 1){
                array.splice(array.indexOf(value), 1)
                hit = true;
            }
        } else {
            array.push(value);
            hit = true;
        }
        console.log(array);
        if(hit){
            this.setState({
                selectedDocuments: array,
                currentActiveTab : array[0] 
            }, () => { console.log("state updated") })
            if(this.state.selectedStages.includes("Pre Submission") && this.state.selectedDocuments.includes("NR Claim"))
                this.props.actions.generalAsyncProcess(constants.monitoringScreenData, this.applyFilter("widget1-stage-document", "listing"))
            else
                this.submitStageDocumentBtn();
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


    componentWillUnmount() {
        // console.log('interval', interval);
        // clearInterval(interval)
        // console.log('interval', interval);

    }

    submitListBtn() {
        this.setState({
            widget3Loading: true
        })
        this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget3", "listing"))     
    }

    exportBtnHandler = () => {
        this.downloadDummyCSV(this.state.businessTransDataList);

    }

    submitCriticalBtn(){
        

        let critical = !this.state.criticalBtn;
        let warn = this.state.warnBtn;

        if(!critical && !warn){
            this.setState({
                widget3Loading: true,
                businessTransDataList : this.state.businessTransOrigList,
                criticalBtn : critical
            })
        }
        else if(critical && warn){
            this.setState({
                widget3Loading: true,
                businessTransDataList : _.cloneDeep(this.state.businessTransCriticalList).concat(_.cloneDeep(this.state.businessTransWarnList)),
                criticalBtn : critical
            })
        }
        else if(!critical && warn){
            this.setState({
                widget3Loading: true,
                businessTransDataList : this.state.businessTransWarnList,
                criticalBtn : critical
            })
        }
        else{
            this.setState({
                widget3Loading: true,
                businessTransDataList : this.state.businessTransCriticalList,
                criticalBtn : critical
            })
        }

        setTimeout(() => {
            this.setState({
                widget3Loading: false,
                criticalBtn:critical
            })
        }, 1000);
    //    this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget3-processor-critical", "listing", "critical"))     
    }
    submitWarnBtn(){

        let critical = this.state.criticalBtn;
        let warn = !this.state.warnBtn;
        if(!critical && !warn){
            this.setState({
                widget3Loading: true,
                businessTransDataList : this.state.businessTransOrigList,
                warnBtn : warn
            })
        }
        else if(critical && warn){
            this.setState({
                widget3Loading: true,
                businessTransDataList : _.cloneDeep(this.state.businessTransCriticalList).concat(_.cloneDeep(this.state.businessTransWarnList)),
                warnBtn : warn
            })
        }
        else if(!critical && warn){
            this.setState({
                widget3Loading: true,
                businessTransDataList : this.state.businessTransWarnList,
                warnBtn : warn
            })
        }
        else{
            this.setState({
                widget3Loading: true,
                businessTransDataList : this.state.businessTransCriticalList,
                warnBtn : warn
            })
        }

        

        setTimeout(() => {
            this.setState({
                widget3Loading: false,
                warnBtn: warn
            })
        }, 1000);
    //    this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget3-processor-warning", "listing", "warn"))     
    }
    applyFilter(widgetId, widgetTitle, filter) {

        let orderNo = _.get(this.state.Container, "orderNo", "");
        let eCommOrgCode = _.get(this.state.Container, "orderNo", "");
        let invoiceNo = _.get(this.state.Container, "orderNo", "");
        let declarationNo = _.get(this.state.Container, "orderNo", "");
        
        return {
                "body": {
                    "widgetId":widgetId,
                    "widgetType": widgetTitle,
                    "searchCriteria": {
                        "processor": this.state.processor,
                        "stage": this.state.selectedStages,
                        "document": this.state.selectedDocuments,
                        "orderNo": orderNo,
                        "invoiceNo": invoiceNo,
                        "declarationNo": declarationNo,
                        "eCommOrgCode": eCommOrgCode,
                        "pageNo": this.state.currentPageNo,
                        "pageSize": 20,
                        "showWarningRecords": filter === "critical" ? true : false,
                        "showCriticalRecords": filter === "warn" ? true : false
                    }
            }
        }
    }

    clearFields() {
        $('#ApiListData').find('input:text').val('');
        $('#ApiListData').find('select').each(function () {
          $(this)[0].selectedIndex = 0;
        });
    
        this.setState({
          'page':{
            'currentPageNo':1
          },
          searchCriteria : {}
        })
        let request = {
          'body':{
            "action": "ApiListData",
            "page": {
              "currentPageNo": 1,
              "pageSize": 20
            }
          }
        }
        this.props.actions.generalProcess(constants.monitoringScreenData, this.applyFilter("widget3", "listing"))
    }
    render() {
        console.log("state-->", this.state)
        if (!this.state.isLoading)
            return (
                <div className="coreDiv">
                    <div className="row daterange_con">
                        <div className="col-md-12" style={{height:"60px", display:"flex", alignItems: "center", }}>
                            <div className="col-md-6" style={{fontSize: "16px", fontWeight: "700", textTransform: "uppercase"}}>
                                    <span className="caption-subject">Declaration Processor</span>
                            </div>
                            <div className="col-md-6" style={{ display: "flex",justifyContent: "flex-end"}}>
                                    <Combobox
                                        status={(this.state.errors && this.state.errors.process) ? "ERROR" : undefined}
                                        style={{marginTop: "14px"}}
                                        fieldname='processor'
                                        className="form-control"
                                        formname='Container'
                                        columns={6}
                                        allowValue={false}
                                        isDDL={true}
                                        selected={_.get(_.get(this.state.jsonData, 'processorData', []).filter(item =>
                                            item.key == _.get(this.state.Container, 'processor', '')
                                        ), `[${0}].value`, undefined)}
                                        placeholder={utils.getLabelByID('processes')}
                                        state={this.state}
                                        typeName="processorData"
                                        dataSource={_.get(this.state, "jsonData", {})}
                                        actionHandler={this.processorHandler}
                                    /> 
                            </div>
                        </div>
                    </div>                    

                    {/* <div className="row"  style={{ marginTop:"20px"}}>
                        <div className="col-md-6 form-group" style={{fontSize: "16px", fontWeight: "700", textTransform: "uppercase"}}>
                            <span className="caption-subject"></span>
                        </div>
                    </div> */}

                     <div className="col-md-12">
                        <div className="row mb-1">
                            <div className="col-md-3 p-0" >
                                <div className="bg-blue-year">
                                    <span>
                                        Stages
                                    </span>
                                </div>

                            </div>
                            <div className="col-md-9 p-0">
                                <div className="col-md-6 p-0">
                                    <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                        <input className="radio-input" type="radio" onClick={() => this.selectStages('Pre Submission')} checked={this.state.selectedStages.includes('Pre Submission')} name="Pre Submission" id="option1" />
                                            <label className={this.state.selectedStages.includes('Pre Submission') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                Pre Submission
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-6 p-0">
                                    <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                        <input className="radio-input" type="radio" onClick={() => this.selectStages('Post Submission')} checked={this.state.selectedStages.includes('Post Submission')} name="Post Submission" id="option1" />
                                            <label className={this.state.selectedStages.includes('Post Submission') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                Post Submission
                                        </label>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-12 form-group">
                        <div className="row mb-1">
                            <div className="col-md-3 p-0" >
                                <div className="bg-blue-year">
                                    <span>
                                        Documents
                                    </span>
                                </div>

                            </div>
                            <div className="col-md-9 p-0">
                                <div className="col-md-4 p-0">
                                    <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                        <input className="radio-input" type="radio" onClick={() => this.selectDocuments('Declaration')} checked={this.state.selectedDocuments.includes('Declaration')} name="Declaration" id="option1" />
                                            <label className={this.state.selectedDocuments.includes('Declaration') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                Declaration
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4 p-0">
                                    <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                        <input className="radio-input" type="radio" onClick={() => this.selectDocuments('NR Claim')} checked={this.state.selectedDocuments.includes('NR Claim')} name="NR Claim" id="option1" />
                                            <label className={this.state.selectedDocuments.includes('NR Claim') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                NR Claim
                                        </label>
                                    </div>
                                </div>
                                <div className="col-md-4 p-0">
                                    <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                        <input className="radio-input" type="radio" onClick={() => this.selectDocuments('Deposit Claim')} checked={this.state.selectedDocuments.includes('Deposit Claim')} name="Deposit Claim" id="option1" />
                                            <label className={this.state.selectedDocuments.includes('Deposit Claim') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                Deposit Claim
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <TileUnitNew col="col-auto" data={[{
                                "id": 1, "title": "Pre Submission-Declaration Queue", 
                                "value": _.find(this.state.tilesData, 'Pre Submission-Declaration Queue', 0) ? _.get(_.find(this.state.tilesData, 'Pre Submission-Declaration Queue', 0), 'Pre Submission-Declaration Queue',0) : 0,
                                "actionURI": "", "overDue": "", "fontClass": "green-steel", "percentageTag": false
                            }, {
                                "id": 2, "title": "Post Submission-Declaration Queue",
                                "value": _.find(this.state.tilesData, 'Post Submission-Declaration Queue', 0) ? _.get(_.find(this.state.tilesData, 'Post Submission-Declaration Queue', 0), 'Post Submission-Declaration Queue',0) : 0,
                                "percentageTag": false
                            }, {
                                "id": 3, "title": "Pre Submission-Claim Queue", 
                                "value": _.find(this.state.tilesData, 'Pre Submission-Claim Queue', 0) ? _.get(_.find(this.state.tilesData, 'Pre Submission-Claim Queue', 0), 'Pre Submission-Claim Queue',0) : 0,
                                "actionURI": "", "overDue": "", "fontClass": "green-meadow", "percentageTag": false
                            }, {
                                "id": 4, "title": "Post Submission-Claim Queue", 
                                "value": _.find(this.state.tilesData, 'Post Submission-Claim Queue', 0) ? _.get(_.find(this.state.tilesData, 'Post Submission-Claim Queue', 0), 'Post Submission-Claim Queue',0) : 0,
                                "actionURI": "", "overDue": "", "fontClass": "green-meadow", "percentageTag": false
                            }]} 
                        />
                    </div>
                    
                    <div className="row formgroup" ></div>

                    <div className="tab-pane in active formgroup" style={{ marginTop:"20px", marginBottom:"15px"}}>
                        <div className={'ui-regulartabs'}>
                            <ul id="adHocTabs" className="nav nav-tabs">
                                <li id="filtersTabLink" className={this.state.currentActiveTab === "Declaration" ? "active" : ""} ><a style={{ fontSize: '14px', color:"white", display: this.state.selectedDocuments.includes('Declaration') ? "block" : "none" }} href="#declarationTab" onClick= { ()=> this.setState({currentActiveTab: "Declaration"})} data-toggle="tab"> <span> Declaration </span></a></li>
                                <li id="filtersTabLink" className={this.state.currentActiveTab === "NR Claim" ? "active" : ""} ><a style={{ fontSize: '14px', color:"white", display: this.state.selectedDocuments.includes('NR Claim') ? "block" : "none" }} href="#nrClaimnTab" onClick= { ()=> this.setState({currentActiveTab: "NR Claim"})} data-toggle="tab"> <span> NR Claim </span></a></li>
                                <li id="filtersTabLink" className={this.state.currentActiveTab === "Deposit Claim" ? "active" : ""} ><a style={{ fontSize: '14px', color:"white", display: this.state.selectedDocuments.includes('Deposit Claim') ? "block" : "none"  }} href="#depositClaimTab" onClick= {()=> this.setState({currentActiveTab: "Deposit Claim"})} data-toggle="tab"> <span> Deposit Claim </span></a></li>
                            </ul>
                        </div>
                        <div style={{ display: "flex", flexFlow: "column", height: "450px"}} className="tab-content ui-tabcontentbody filetabs">
                            <div id={'declarationTab'} className={this.state.currentActiveTab === "Declaration" ? "tab-pane in active ui-fieldtable" : "tab-pane in ui-fieldtable"}>
                                <div className="col-md-12">
                                    <h3 style={{ display: "flex", justifyContent: "center", minHeight: "100px"}}>Declaration Pipeline</h3>
                                </div> 
                                
                                <div className="col-md-12">
                                    {!this.state.widget2Loading ? 
                                    <VerticalBarChart key="barChartWidget1" data={[..._.get(this.state, 'declarationBarCharts', [])]} labels={['Waiting Generation', 'Signature Pending', 'Signed-Ready Submission', 'Submission Failure']} stack="multiple" dataLabelsAttribute="riskName" 
                                                    dataValuesAttributes={['Waiting Generation', 'Signature Pending', 'Signed-Ready Submission', 'Submission Failure']} backgroundColors={['#4682B4', '#DC143C','#228B22', '#FFD700']}
                                    /* options={{
                                        responsive: true,
                                        maintainAspectRatio: true
                                    }} */ height={100} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                    :
                                    <div className="loader">{utils.getLabelByID("Loading")}</div>
                                    }
                                </div>
                            </div>
                            <div id={'nrClaimnTab'} className={this.state.currentActiveTab === "NR Claim" ? "tab-pane in active ui-fieldtable" : "tab-pane in ui-fieldtable"}>
                                <div className="col-md-12">
                                    <h3 style={{ display: "flex", justifyContent: "center", minHeight: "100px"}}>NR Claim Pipeline</h3>
                                </div>
                                <div className="col-md-12">
                                    {!this.state.widget2Loading ? 
                                    <VerticalBarChart key="barChartWidget2" data={[..._.get(this.state, 'nrClaimBarCharts', [])]} labels={['Waiting Generation', 'Signature Pending', 'Signed-Ready Submission', 'Submission Failure']} stack="multiple" dataLabelsAttribute="riskName" 
                                                    dataValuesAttributes={['Waiting Generation', 'Signature Pending', 'Signed-Ready Submission', 'Submission Failure']} backgroundColors={['#4682B4', '#DC143C','#228B22', '#FFD700']}
                                    /* options={{
                                        responsive: true,
                                        maintainAspectRatio: true
                                    }} */ height={100} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                    :
                                    <div className="loader">{utils.getLabelByID("Loading")}</div>
                                    }
                                </div>
                            </div>
                            <div id={'depositClaimTab'}  className={this.state.currentActiveTab === "Deposit Claim" ? "tab-pane in active ui-fieldtable" : "tab-pane in ui-fieldtable"}>
                                <div className="col-md-12">
                                    <h3 style={{ display: "flex", justifyContent: "center", minHeight: "100px"}}>Deposit Claim Pipeline</h3>
                                </div>
                                <div className="col-md-12">
                                    {!this.state.widget2Loading ? 
                                    <VerticalBarChart key="barChartWidget3" data={[..._.get(this.state, 'depClaimBarCharts', [])]} labels={['Waiting Generation', 'Signature Pending', 'Signed-Ready Submission', 'Submission Failure']} stack="multiple" dataLabelsAttribute="riskName" 
                                                    dataValuesAttributes={['Waiting Generation', 'Signature Pending', 'Signed-Ready Submission', 'Submission Failure']} backgroundColors={['#4682B4', '#DC143C','#228B22', '#FFD700']}
                                    /* options={{
                                        responsive: true,
                                        maintainAspectRatio: true
                                    }} */ height={100} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                    :
                                    <div className="loader">{utils.getLabelByID("Loading")}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <Portlet title={"Business Transactions"} noCollapse={false}>
                        <div className="form-group col-md-12">
            
                                <label style={{fontSize: "16px", marginRight: "20px", textTransform: "uppercase"}}>
                                    <span className="caption-subject">Attention Items</span>
                                </label>
                                <label className="control-label">{utils.getLabelByID("Critical")}</label>
                                {"  "}
                                <label type="button" className={!this.state.criticalBtn ? "btn btn-danger_cus" : "btn btn-danger_cus active"} style={{width: "70px", marginLeft: "10px", marginRight: "20px"}}
                                    onClick={this.submitCriticalBtn.bind(this)}>
                                        {console.log(_.get(_.find(this.state.attentionItems, {label:"Critical"}), 'value', 0))}
                                        {_.get(_.find(this.state.attentionItems, {label:"Critical"}), 'value', 0)}
                                </label>

                                {"  "}     
                                <label className="control-label">{utils.getLabelByID("Warn")}</label>
                                {"  "}
                                <label type="button" className={!this.state.warnBtn ? "btn btn-warning" : "btn btn-warning active" } style={{width: "70px", marginLeft: "10px", marginRight: "20px", borderRadius: "5px !important"}}
                                    onClick={this.submitWarnBtn.bind(this)}>
                                        {_.get(_.find(this.state.attentionItems, {label:"Warn"}), 'value', 0)}
                                </label>
                        </div>
                        <div className="col-md-12" style={{fontSize: "16px", fontWeight: "600", marginLeft:"-35px", textTransform: "uppercase", marginTop: "10px", marginBottom: "15px"}}>
                            <span className="caption-subject">DashBoard</span>
                        </div>
                        <div className="form-body" id="ApiListData">
                                <div className="row">
                                    <div className="col-md-12">

                                        <div className="row">                          
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Order No")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <Input
                                                        divStyle={{ padding: '0px', top: '10px',
                                                        position: 'absolute' }}
                                                        errorIconStyle={{
                                                        display:'none'
                                                        }}
                                                        status={(this.state.errors && this.state.errors.orderNo) ? "ERROR" : undefined}
                                                        fieldname='orderNo'
                                                        formname='Container'
                                                        disabled={false}
                                                        placeholder={utils.getLabelByID('')}
                                                        state={this.state}
                                                        actionHandler={this.generalHandler}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("E-Commerce")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <Input
                                                        divStyle={{ padding: '0px', top: '10px',
                                                        position: 'absolute' }}
                                                        errorIconStyle={{
                                                        display:'none'
                                                        }}
                                                        status={(this.state.errors && this.state.errors.eCommOrgCode) ? "ERROR" : undefined}
                                                        fieldname='eCommOrgCode'
                                                        formname='Container'
                                                        disabled={false}
                                                        placeholder={utils.getLabelByID('')}
                                                        state={this.state}
                                                        actionHandler={this.generalHandler}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>    

                                        <div className="row">                          
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Inovice No")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <Input
                                                        divStyle={{ padding: '0px', top: '10px',
                                                        position: 'absolute' }}
                                                        errorIconStyle={{
                                                        display:'none'
                                                        }}
                                                        status={(this.state.errors && this.state.errors.invoiceNo) ? "ERROR" : undefined}
                                                        fieldname='invoiceNo'
                                                        formname='Container'
                                                        disabled={false}
                                                        placeholder={utils.getLabelByID('')}
                                                        state={this.state}
                                                        actionHandler={this.generalHandler}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Declaration ID")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <Input
                                                        divStyle={{ padding: '0px', top: '10px',
                                                        position: 'absolute' }}
                                                        errorIconStyle={{
                                                        display:'none'
                                                        }}
                                                        status={(this.state.errors && this.state.errors.declarationNo) ? "ERROR" : undefined}
                                                        fieldname='declarationNo'
                                                        formname='Container'
                                                        disabled={false}
                                                        placeholder={utils.getLabelByID('')}
                                                        state={this.state}
                                                        actionHandler={this.generalHandler}
                                                        className="form-control"
                                                    />
                                                </div>
                                            </div>
                                        </div>  

                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right">
                                                <button type="submit" className="btn green"
                                                        onClick={this.submitListBtn.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                {"  "}
                                                <button type="button" className="btn default"
                                                        onClick={this.clearFields}>{utils.getLabelByID("Clear")}</button>

                                                </div>
                                            </div>
                                            </div>                     
                                    </div>
                                </div>
                            </div>
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-body">
                                    <Row>
                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right" style={{marginBottom:"-15px", marginRight:"-15px"}}>
                                                    <button type="submit" className="btn red btn-outline btn-circle" onClick={this.exportBtnHandler}>
                                                        <i className="fa fa-share" style={{fontSize: "14px", fontWeight: "700", marginRight:"5px"}} aria-hidden="true"></i>                                                        
                                                        <span className="hidden-xs">export</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>                            
                                    {!this.state.widget3Loading ? 
                                    <Table fontclass=""
                                        gridColumns={utils.getGridColumnByName("BusinessTransaction")}
                                        gridData={this.state.businessTransDataList}
                                        totalRecords={this.state.totalRecords}
                                        searchCallBack={this.searchCallBack}
                                        pageSize={20}
                                        pagination={true} pageChanged={this.pageChanged}
                                        export={false}
                                        search={true}
                                        activePage={this.state.currentPageNo}
                                    />
                                    :
                                    <div className="loader">{utils.getLabelByID("Loading")}</div>
                                    }
                                </div>
                            </div>
                    </Portlet>

                    {/* <Portlet title={utils.getLabelByID("Business Transactions")} isPermissioned={true}
                        actions={this.state.actions}>
                        
                    </Portlet> */}
                    <ModalBox isOpen={this.state.isOpen}>
                        <Portlet title={utils.getLabelByID("Errors")} isPermissioned={true}>                            
                            <Row>
                                <AnchorComp
                                    anchotDisplayName = {"SOAP Payload"}
                                    invokeAnchorButtonhandlar = {this.soapPayloadHandler}
                                />
                            </Row>
                            <Row>
                                <Label text="Exceptions" />
                            </Row>                            
                            <Row>
                                <Table fontclass=""
                                    gridColumns={utils.getGridColumnByName("BusinessTransactionError")}
                                    gridData={this.state.businessTransDataError}
                                    totalRecords={this.state.businessTransDataError.length}
                                    searchCallBack={this.searchCallBack}
                                    pageSize={10}
                                    pagination={false} pageChanged={this.pageChanged}
                                    export={false}
                                    search={true}
                                />
                            </Row>

                            <Row>
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.closePopUP} >{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Portlet>
                    </ModalBox>
                </div>
            );
        else
            return (<div className="loader" > {utils.getLabelByID("Loading")}</div>)
    }
}


function mapStateToProps(state, ownProps) {
    return {
        widget1: _.get(state.app, 'widget1', {}),
        widget2: _.get(state.app, 'widget2', {}),
        widget3: _.get(state.app, 'widget3', {}),
        widget4: _.get(state.app, 'widget4', {})
        // typeData: _.get(state.app.typeData, 'data', undefined),
        // getDashboardData: _.get(state.app, 'getDashboardData', undefined),
        // entityList: state.app.entityList
    };
}


function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
function customActionHandler(formname, fieldname, type, e) {
    let value = e.target.value;
    this.sendCall(value)
}
BusinessTransaction.displayName = "Buinsess Transaction Monitoring";
export default connect(mapStateToProps, mapDispatchToProps)(BusinessTransaction);