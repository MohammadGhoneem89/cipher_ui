/*standard imports*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as requestCreator from '../../common/request.js';

import Portlet from '../../common/Portlet.jsx';
import * as Loaders from '../../common/loaders.jsx';


import * as utils from '../../common/utils.js';


import * as constants from '../../constants/Communication.js';


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Container: {},
      typeData: undefined,
      entityMap: undefined,
      documentTypeList:undefined,
      formLoading:false,
      consentStatus:"",
      validTill:""
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.typeData) {
      this.setState({
        typeData: nextProps.typeData,
      });
    }
    if (nextProps.entityNames.length) {
      // let entityMap = {}
      // nextProps.entityNames.forEach((elem) => {
      //   let elemEnt = _.get(entityMap, elem.orgType, []);

      //   elemEnt.push({
      //     "label": elem.value,
      //     "value": elem.value
      //   })
      //   _.set(entityMap, elem.orgType, elemEnt);
      // })
      this.setState({
        entityMap:nextProps.entityNames
      });
    }
    if (nextProps.documentTypeList.length) {
      let documentTypeList = []
            nextProps.documentTypeList.forEach((elem) => {
              let parsedData = JSON.parse(elem.tranxData);  
              let elemEnt = _.get(documentTypeList, parsedData.key, {});
    
              elemEnt = {
                "label": `${parsedData.name} - ${parsedData.key}`,
                "value": parsedData.key
              }
              documentTypeList.push(elemEnt);
            })
      this.setState({
        documentTypeList
      });
    }
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({     // Get Orgs (entities)
      "currentPageNo": 1,
      "pageSize": 1
    }));
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES'])); 
    this.props.actions.generalProcess(constants.getDocumentTypeList);
  }


  onInputChange = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let Container = _.cloneDeep(this.state.Container);
    if (e.target.id == 'group') {
      let values = $('#group').val();
      _.set(Container, e.target.id, values)
    } else {
      _.set(Container, e.target.id, value)
    }
    // this.state.networkConfig[e.target.name] = e.target.name;
    console.log(JSON.stringify(Container))
    this.setState({
      Container: Container
    })
  }

  formSubmit() {
    let Container = _.cloneDeep(this.state.Container);
    if (
      _.isEmpty(Container.documentType) ||
      _.isEmpty(Container.orgCode) ||
      _.isEmpty(Container.unifiedID) ||
      _.isEmpty(Container.documentNo)
    ) {
      alert("All fields are required");
      return false;
    }
    
    this.setState({
      formLoading:true
    })
    
    let body = {
      "body":{
      "unifiedID":Container.unifiedID,
      "documentType":Container.documentType,
      "orgCode":Container.orgCode,
      "documentNo":Container.documentNo
      }
    }

    console.log(body,"yyyyyyyyyyyyyyyy");

 

    this.props.actions.generalAsyncProcess(constants.fetchConsentStatus, body).then(res=>{
      if(res.messageStatus=="OK"){
            this.setState({
              formLoading: false,
              consentStatus:res.result.status,
              validTill:moment.unix(res.result.validity).format("DD/MM/YYYY")
            });
          
      }
      else{
        this.setState({
          formLoading: false,
          consentStatus:"NOT FOUND",
          validTill:""
        });
      }
    }).catch(err=>{
      this.setState({
        formLoading: false
      });
      alert("Something happened. Please try again.");
      return false;
    });
    
  }



  clearFields() {
    $('#ApiListData').find('input:text').val('');
    $('#ApiListData').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
    this.setState({
      Container:{},
      consentStatus:"",
      validTill:""
    })
  }


  render() {
    console.log(this.state,"SSSSS")
    if (this.state.typeData && this.state.documentTypeList) {
      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">
                  <div className="caption">
                    <span className="caption-subject">{utils.getLabelByID("Consent Filters")}</span></div>
                  <div className="tools">
                    <a href="javascript:;" className="collapse" data-original-title title> </a>
                  </div>
                </div>
                <div className="portlet-body">
                  <div className="form-body" id="ApiListData">
                    <div className="row">
                      <div className="col-md-12">

                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Unified ID")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text"   value={this.state.Container.unifiedID}
                                onChange={this.onInputChange} className="form-control" id="unifiedID"/>
                            </div>
                          </div>
                          {this.state.documentTypeList?<div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Document Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                            <select  className="form-control" id="documentType"
                            value={this.state.Container.documentType}
                                onChange={this.onInputChange}
                                >
                              <option key="" value="">--select--</option>
                              {
                                this.state.documentTypeList.map((option, index) => {
                                  return (
                                  <option key={index} value={option.value}>{option.label}</option>
                                  );
                                })
                              }
                            </select>
                            </div>
                          </div>:null}
                          {/* {this.state.typeData?<div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Owner Org Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                            <select  className="form-control" id="orgType"
                            value={this.state.Container.orgType}
                                onChange={this.onInputChange}
                                >
                              <option key="" value="">--select--</option>
                              {
                                this.state.typeData.ORG_TYPES &&
                                this.state.typeData.ORG_TYPES.map((option, index) => {
                                  return (
                                    <option key={index} value={option.value}>{option.label}</option>
                                  );
                                })
                              }
                            </select>
                            </div>
                          </div>:null} */}
                         {this.state.entityMap?<div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Org Code")}</label>
                            </div>
                            <div className="form-group col-md-8">
                            <select  className="form-control" id="orgCode"
                            value={this.state.Container.orgCode}
                                onChange={this.onInputChange}
                                >
                              <option key="" value="">--select--</option>
                              {
                                 this.state.entityMap.map((option, index) => {
                                  return (
                                    <option key={index} value={option.value}>{option.value}</option>
                                  );
                                })
                              }
                            </select>
                            </div>
                          </div>:null}
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Document No")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control"  value={this.state.Container.documentNo}
                                onChange={this.onInputChange}  id="documentNo"/>
                            </div>
                          </div>
                        </div>

                        <div className="form-actions right">
                          <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                              <button type="submit" className="btn green"
                                      onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                              {"  "}
                              <button type="button" className="btn default"
                                      onClick={this.clearFields.bind(this)}>{utils.getLabelByID("Clear")}</button>

                            </div>
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
            {this.state.formLoading && Loaders.dotted()}
            <Portlet  title={utils.getLabelByID("Consent Status View")} >
            {!this.state.consentStatus?<div className="row">
                <div className="col-md-12 text-center">
                  NO DATA FOUND
                </div>
              </div>:
              <div className="row">
                {this.state.consentStatus=="NOT FOUND" && <div>
              <div className="col-md-12 text-center">
                <p className="h4" style={{fontWeight:"bold"}}>No consent found for the document</p>
                
              </div>
              <div className="col-md-12 text-center">
                <img src="assets/imgs/thumbsdown.png" style={{height:300,width:300,margin:"10px 0px"}}/>
              </div>
              </div>
              }
              {this.state.consentStatus=="GRANT" && <div>
                <div className="col-md-12 text-center">
                  <p className="h4" style={{fontWeight:"bold"}}>Consent is valid till : {this.state.validTill}</p>
                  
                </div>
                <div className="col-md-12 text-center">
                <img src="assets/imgs/thumbsup.png" style={{height:300,width:300,margin:"10px 0px"}}/>
              </div>
              </div>
              }
              {this.state.consentStatus=="REVOKE" && <div>
              <div className="col-md-12 text-center">
                <p className="h4" style={{fontWeight:"bold"}}>Consent is Revoked</p>
                
              </div>
              <div className="col-md-12 text-center">
                <img src="assets/imgs/exclaimation-sign-01.png" style={{height:300,width:300,margin:"10px 0px"}}/>
              </div>
              </div>
              }
              {this.state.consentStatus=="EXPIRED" && <div>
              <div className="col-md-12 text-center">
                <p className="h4" style={{fontWeight:"bold"}}>Consent is Expired</p>
                
              </div>
              <div className="col-md-12 text-center">
                <img src="assets/imgs/ban.png" style={{height:300,width:300,margin:"10px 0px"}}/>
              </div>
              </div>
              }
             

            </div>}
              </Portlet>
            </div>
          </div>


        </div>
      );

    } else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

List.propTypes = {
  // listData: PropTypes.array,
  children: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    // listData: _.get(state.app, 'documentTypeList', undefined),
    // pageData: _.get(state.app, 'ADHReportList.ADHReportList.data.pageData', undefined),
    entityNames: _.get(state.app, 'entityList.data.typeData.entityNames', []),
    typeData: _.get(state.app, 'typeData.data', []),
    documentTypeList : _.get(state.app, 'documentTypeList', [])
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Current Consent Status";
export default connect(mapStateToProps, mapDispatchToProps)(List);