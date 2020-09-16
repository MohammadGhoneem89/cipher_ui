/*standard imports*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';


/*container specific imports*/
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';


import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import DateControl from '../../common/DateControl.jsx';
import Portlet from '../../common/Portlet.jsx';
import * as Loaders from '../../common/loaders.jsx';

import flatten from "flat";


class ChangeTracking extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchFilters: "", 
      currentPageNo: 1, 
      auditLogID: undefined,
      consortium: [],
      selectedConsortium: undefined,
      selectedChannel: undefined,
      selectedSmartcontract:undefined,
      smartcontract: [],
      privateCollection:[],
      selectedCollection:undefined,
      smKey:"",
      getEndpointListView: [],
      selectedEndpoint:undefined,
      allColumns:[],
      gridColumns:[],
      revData:[],
      isLoading:false
    }
    // this.pageChanged = this.pageChanged.bind(this);
    // this.formSubmit = this.formSubmit.bind(this);
    // this.getRequest = this.getRequest.bind(this);
    // this.renderPopupBody = this.renderPopupBody.bind(this);
    this.onInputRuleEngine = this.onInputRuleEngine.bind(this);


  }

  // renderPopupBody(dataID) {
  //   this.setState({auditLogID: dataID})
  // }

  onInputRuleEngine (e) {
    //  BlockRuleName consortiumName channelName smartcontract
    //getConsortiumTypeList
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    // let pLoad = {};

    if (e.target.name == 'channel') {
      // pLoad.selectedConsortium = this.state.selectedConsortium;
      // pLoad.channelID = value
      this.setState({
        selectedChannel: value
      })
    }

    if (e.target.name == 'consortium') {
      // pLoad.selectedConsortium = value
      this.setState({
        selectedConsortium: value
      })
    }

    if (e.target.name == 'smartcontract') {
      this.setState({
        selectedSmartcontract: value
      })
    }

    if (e.target.name == 'privateCollection') {
      this.setState({
        selectedCollection: value
      });
     
    }

    if (e.target.name == 'smKey') {
      this.setState({
        smKey: value
      })
    }

    if (e.target.name == 'endpoint') {
      let body={
        channelname:this.state.selectedChannel,
        smartcontract:this.state.selectedSmartcontract,
        endpoint:value
      }
      // let body={
      //   "channelname":"vehiclechannel",
      //   "smartcontract":"rta_vehicle_project",
      //   "endpoint":"CouchDB-RTA"
      // }
      console.log("bodyyyyyyy",body);
      this.setState({
        selectedEndpoint: value
      })
      // get pvcollections
      this.props.actions.generalProcess(constants.getCollectionList,body);
    }
    


  }


  componentWillReceiveProps(nextProps){
    console.log(nextProps,"Next PROPSSSSs")
    if (nextProps.ConsortiumTypeData.data && nextProps.ConsortiumTypeData.data.consortium) {
      this.setState({
        consortium: nextProps.ConsortiumTypeData.data.consortium,
        channel: nextProps.ConsortiumTypeData.data.channel,
        smartcontract: nextProps.ConsortiumTypeData.data.smartcontract
      });
    }
    if (nextProps.getEndpointListView.data) {
      this.setState({
        getEndpointListView: nextProps.getEndpointListView.data.filter(item=>{
          return item.dbType=="couchdb";
        })
      });
    }
    if(nextProps.getCollectionList){
      console.log(nextProps.getCollectionList,"MMMMMMMMMMMMMMMMM")
      this.setState({
        privateCollection:nextProps.getCollectionList
      })
    }
    if(nextProps.getRevisionsList){
      this.setState({
        isLoading:false
      })
      console.log(nextProps.getRevisionsList,"RRRRRRRRRRRrr");
      this.handleData(nextProps.getRevisionsList);
      // this.setState({
      //   privateCollection:nextProps.getCollectionList
      // })
    }
    if(!nextProps.getRevisionsList){
      this.setState({
        isLoading:false
      })
    }
  }

  // // componentWillMount() {

  // //   this.props.actions.generalProcess(constants.getAuditLogListData, this.getRequest());

  // // }

  searchCallBack(keyWord) {

  }

  componentDidMount() {
    // window.scrollTo(0, 0);
    this.setState({
      gridColumns:[
        { alias: "Field", key: "field", type: "string" },
        { alias: "REV-NO-1", key: "REV-NO-1", type: "revString" },
        { alias: "REV-NO-2", key: "REV-NO-2", type: "revString" },
        { alias: "REV-NO-3", key: "REV-NO-3", type: "revString" },
        { alias: "Latest", key: "latest", type: "revLatest" }
      ]
    })
    this.props.actions.generalProcess(constants.getConsortiumTypeList);
    this.props.actions.generalProcess(constants.getEndpointListView);
  }

  handleData(data){
    if(data["latest"]){
    this.addGridColoumns(data);
    let latest= data.latest;
    delete latest["_id"];
    delete latest["_rev"];
    delete latest["documentName"];
    delete latest["key"];
    delete latest["~version"];
    delete latest["_revisions"];
    this.dataMatrix(data,flatten(latest));
    }
   
   
}

  dataMatrix(data,fields){
    console.log("datataaa",data);
    console.log("whole objecttt",flatten(data));
    console.log("fieldssssssss",fields);

    let revData=[];
    let prunData= Object.assign({},data);
    delete prunData["latest"];
    Object.keys(fields).forEach(k=>{
        console.log(k,"KKKKKKKk");
        let previous=fields;
        let record={};
        record["field"]=k;
        record["latest"]=fields[k];

        if(!Object.keys(prunData).length){
          record["REV-NO-1"]="not found";
          record["REV-NO-2"]="not found";
          record["REV-NO-3"]="not found";
        }

        Object.keys(prunData).forEach(j=>{
            let flatData=flatten(prunData[j]);
            if(!flatData.hasOwnProperty(k)){
              record[j]="not found";
              console.log(record,"AAAAAA")
            }
            else{
              if(flatData[k]==previous[k]){
                record[j]="no change";
                console.log(record,"BBBBBBBB")
              }
              else{
                record[j]=flatData[k];
                console.log(record,"CCCCCCCC")
              }
            }
            previous=flatten(prunData[j]);
        });
        revData.push(record);
    })
    console.log("revData",revData);
    this.setState({revData})
  }

  addGridColoumns(data){
    let rows= Object.assign({},data);
    delete rows["latest"];
    let  allColumns = [];
    let columns = []
    let count=0;
    let keysLength =  Object.keys(rows).length;

    if(keysLength>=0 && keysLength<3){
      columns=[
        { alias: "Field", key: "field", type: "string" },
        { alias: "REV-NO-1", key: "REV-NO-1", type: "revString" },
        { alias: "REV-NO-2", key: "REV-NO-2", type: "revString" },
        { alias: "REV-NO-3", key: "REV-NO-3", type: "revString" },
        { alias: "Latest", key: "latest", type: "revLatest" }
      ]
      allColumns.push(columns);
    }
    else{
      Object.keys(rows).forEach(k=>{
        columns.push({ alias: `${k}`, key: `${k}`, type: "revString" });
        count++;
        if(count==3){
          let dp = Object.assign([],columns);
          columns.reverse();
          columns.unshift({ alias: "Field", key: "field", type: "string" });
          columns.push({ alias: "Latest", key: "latest", type: "revLatest" });
          allColumns.push(columns);
          columns=Object.assign([],dp);
          columns.shift();
          count=2;
        }
      });
    }
    

    console.log(allColumns,"Alll coullllllllllllllll");
    this.setState({
      allColumns,
      gridColumns:allColumns[0],
    })
    
  }

  formSubmit() {
    // const data = {
    //   "latest": {
    //       "Foo": "bar",
    //       "sampleobjArr": [
    //           {
    //               "Test": "op"
    //           }
    //       ],
    //       "sampleobj": {
    //           "Test": "top"
    //       }
    //   },
    //   "Rev-4": {
    //     "Foo": "bary"
    //   },
    //   "Rev-3": {
    //     "Foo": "barz"
    //   },
    //   "Rev-2": {
    //     "Foo": "barz"
    // },
    //   "Rev-1": {
    //       "Foo": "barz",
    //       "sampleobj": {
    //         "Test": "top"
    //     }
          
    //   }
     
      
    // };
    // this.handleData(data);
    if(this.state.selectedChannel && this.state.selectedSmartcontract && this.state.selectedEndpoint && this.state.selectedCollection && this.state.smKey){
      this.setState({
        isLoading:true
      })
      // let body = {
      //   "channelname":"prwchannel",
      //   "smartcontract":"dpw",
      //   "endpoint":"CouchDB-RTA",
      //   "pvtcollection":"vehiclechannel_rta_vehicle_project%24%24p%24b%24m%24w_%24v%24c%24c",
      //   "key":"T272276772575"
      //  }
      let body = {
        "channelname":this.state.selectedChannel,
        "smartcontract":this.state.selectedSmartcontract,
        "endpoint":this.state.selectedEndpoint,
        "pvtcollection":this.state.selectedCollection,
        "key":this.state.smKey
      }
      console.log(body,"Bodyyyyyyyyyyyyyyyyyyyy");
      this.props.actions.generalProcess(constants.getDocumentRevesions,body);
    }
  }

  pageChanged(pageNo) {
    console.log(pageNo,"YOOOOOOOOOO")
    if (pageNo != undefined) {
      const allColumns=this.state.allColumns;
      const revData=this.state.revData;
      this.setState({
        currentPageNo: pageNo,
        gridColumns:allColumns[pageNo-1],
        revData:[],
      });

      setTimeout(()=>{
        this.setState({
          revData:revData,
        });
      },3)
      

    }
  }

  clearFields() {
    $('#auditLogList').find('input:text').val('');
    $('#auditLogList').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }

  handlePrev(){
    let current = this.state.currentPageNo;
    if(current<this.state.allColumns.length){
      this.setState({
        currentPageNo:current+1,
        gridColumns:this.state.allColumns[current],
      })
    }
  }

  handleNext(){
    let current = this.state.currentPageNo;
    if(current>1){
      this.setState({
        currentPageNo:current-1,
        gridColumns:this.state.allColumns[current-2],
      })
    }
  }


  render() {
    console.log(this.state,"SSSSSSSSSSSSSSSSSSS")
    if (this.props.ConsortiumTypeData.data) {

      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">
                <div className="caption">
                    <span className="caption-subject">{utils.getLabelByID("ChangeTrackingFilters")}</span></div>
                  <div className="tools">
                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                  </div>
                </div>
                <div className="portlet-body">
                  <div className="form-body" id="auditLogList">
                    <div className="row">
                      {/* <div className="col-md-6">
                        <div className="form-group col-md-4">
                          <label className="control-label">{utils.getLabelByID("APL_ToDate")}</label>
                        </div>
                        <div className="form-group col-md-8">
                          <DateControl id="toDate"/>
                        </div>
                      </div> */}
                     <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Consortium Name")}</label>
                                <div className="form-group col-md-8">
                                  <select id="consortium" name="consortium" onChange={this.onInputRuleEngine}
                                    value={this.state.selectedConsortium} className="form-control">
                                      <option disabled selected value> -- SELECT CONSORTIUM -- </option>
                                    {
                                      this.state.consortium.map((option, index) => {
                                        return (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Channel Name")}</label>
                                <div className="form-group col-md-8">
                                  <select name="channel" id="channel" onChange={this.onInputRuleEngine}
                                    value={this.state.selectedChannel} className="form-control">
                                       <option disabled selected value> -- SELECT CHANNEL -- </option>
                                    {
                                      this.state.channel.map((option, index) => {
                                        return (
                                          <option key={index} value={option.label.split("|")[0].trim()}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Smartcontract Name")}</label>
                                <div className="form-group col-md-8">
                                  <select name="smartcontract" id="smartcontract" onChange={this.onInputRuleEngine}
                                    value={this.state.selectedSmartcontract} className="form-control">
                                      <option disabled selected value> -- SELECT SMART CONTRACT -- </option>
                                    {
                                      this.state.smartcontract.map((option, index) => {
                                        return (
                                          <option key={index} value={option.label}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("Endpoint")}</label>
                                <div className="form-group col-md-8">
                                <select name="endpoint" id="endpoint" onChange={this.onInputRuleEngine}
                                    value={this.state.selectedEndpoint} className="form-control">
                                      <option disabled selected value> -- SELECT ENDPOINT -- </option>
                                    {
                                      this.state.getEndpointListView.map((option, index) => {
                                        return (
                                          <option key={index} value={option.text}>{option.text}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("PrivateCollection")}</label>
                                <div className="form-group col-md-8">
                                <select name="privateCollection" id="privateCollection" onChange={this.onInputRuleEngine}
                                    value={this.state.selectedCollection} className="form-control">
                                      <option disabled selected value> -- SELECT COLLECTION -- </option>
                                    {
                                      this.state.privateCollection.map((option, index) => {
                                        return (
                                          <option key={index} value={option.value}>{option.label}</option>
                                        );
                                      })
                                    }
                                  </select>
                                </div>
                              </div>
                            </div>

                            {/* <div className="col-md-6">
                              <div className="form-group">
                                <label className="form-group control-label col-md-4" style={{
                                  textAlign: "left",
                                  fontWeight: "normal"
                                }}>{utils.getLabelByID("PrivateCollection")}</label>
                                <div className="form-group col-md-8">
                                  <input type="text" className="form-control" value={this.state.privateCollection} name="privateCollection" onChange={this.onInputRuleEngine}
                                    id="privateCollection" />
                                </div>
                              </div>
                            </div> */}

                            <div className="col-md-12">
                              <div className="form-group">
                                <label className="form-group control-label col-md-2" style={{
                                  textAlign: "left",
                                  fontWeight: "bold",
                                  fontSize:"18px"
                                }}>{utils.getLabelByID("KEY")}</label>
                                <div className="form-group col-md-10">
                                  <input type="text" className="form-control" value={this.state.smKey} name="smKey" onChange={this.onInputRuleEngine}
                                    id="smKey" 
                                  />
                                </div>
                              </div>
                            </div>

                           

                    </div>
                    
                  

                    <div className="row">
                      <div className="col-md-12">
                        <div className="col-md-12">
                          <div className="pull-right">
                            <button type="submit" className="btn green"
                                    onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                            {"  "}
                            <button type="button" className="btn default"
                                    onClick={this.clearFields}>{utils.getLabelByID("Clear")}</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
            {this.state.isLoading && Loaders.dotted()}
            <Portlet  title={utils.getLabelByID("ChangeTrackingListData")} >
              <div className="row">
                <div className="col-md-6"  style={{display:"flex",justifyContent:"flex-start"}}>
                <button type="button" disabled={this.state.currentPageNo>=this.state.allColumns.length?true:false} className="btn default" onClick={()=>this.handlePrev()}
                                   >{utils.getLabelByID("prev")}</button>
                </div>
                <div className="col-md-6" style={{display:"flex",justifyContent:"flex-end"}}>
                <button type="button" disabled={this.state.currentPageNo==1?true:false} className="btn default" onClick={()=>this.handleNext()}
                                   >{utils.getLabelByID("next")}</button>
                </div>
              </div>
              <Table fontclass=""
                    //  TableClass="portlet light bordered sdg_portlet"
                     gridColumns={this.state.gridColumns}
                     gridData={this.state.revData}
                     totalRecords={this.state.allColumns.length}
                    //  searchCallBack={this.searchCallBack} 
                     pageSize={1}
                    //  pagination={true} 
                    //  pageChanged={this.pageChanged.bind(this)} 
                    //  search={true}
                    //  renderPopupBody={this.renderPopupBody} 
                    //  activePage={this.state.currentPageNo}
                    //  searchCriteria={this.state.searchFilters} 
                     gridType={"auditLogList"} 
              />
              </Portlet>
            </div>
          </div>
          {/* <div className="modal fade in modal-overflow" id="modelWindows" tabIndex="-1" role="basic" aria-hidden="true"
               style={{display: "none", paddingTop: "10"}}>
            <div className="modal-dialog" style={{width: "1050"}}>
              <div className="modal-content" style={{padding: "10px"}}>
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal"><span
                    aria-hidden="true">&times;</span><span className="sr-only">{utils.getLabelByID("TLP_Close")}</span>
                  </button>
                  <h3 className="modal-title">{utils.getLabelByID("AuditLogDetail")}</h3>
                </div>

                {<div className="modal-body" id="popup">
                  <AuditLogDetail auditLogID={this.state.auditLogID}/>

                </div>
                }

              </div>
            </div>
          </div> */}
        </div>
      );

    } else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

ChangeTracking.propTypes = {
  ConsortiumTypeData: PropTypes.object,
  children: PropTypes.object,
  typeData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    typeData: state.app.typeData.data,
    ConsortiumTypeData: state.app.ConsortiumTypeData,
    getEndpointListView: state.app.getEndpointListView,
    getCollectionList:state.app["collectionNameList"]?state.app.collectionNameList:"",
    getRevisionsList:state.app["result"]?state.app.result:""
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

ChangeTracking.displayName = "Change Tracking";
export default connect(mapStateToProps, mapDispatchToProps)(ChangeTracking);
