/*standard imports*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as requestCreator from '../../common/request.js';

import Portlet from '../../common/Portlet.jsx';
/*container specific imports*/
import Table from '../../common/Datatable.jsx';


import * as utils from '../../common/utils.js';


import * as constants from '../../constants/Communication.js';


class List extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Container: {},
      searchFilters: "", 
      currentPageNo: 1, 
      APIPayloadID: undefined, 
      actions: [], 
      typeData: undefined,
      listData: [],
      pageData: undefined,
    }
    this.pageChanged = this.pageChanged.bind(this);


  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.typeData) {
      this.setState({
        typeData: nextProps.typeData,
      });
    }
    if (nextProps.listData) {
      let parsedData = nextProps.listData.map(item=>{
        return {
          ...JSON.parse(item.tranxData),
          actions: [{
            URI: ["/addDocType"],
            iconName: "icon-docs",
            label: "View",
            params: "",
            type: "componentAction",
            value: "1003",
        }]}
      })
      this.setState({
        pageData: parsedData,
        listData: parsedData.slice(0,10)
      })
    }
  }

  componentWillMount() {

  }

  searchCallBack(keyWord) {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES'])); 
    this.props.actions.generalProcess(constants.getDocumentTypeList);
    this.setState({
      actions: [{
        "value": "1002",
        "type": "pageAction",
        "label": "ADD",
        "labelName": "COM_AB_Add",
        "actionType": "PORTLET_LINK",
        "iconName": "fa fa-plus",
        "URI": "/addDocType/NEW",
        "children": []
      }]
    })
  }

  getRequest() {
    let documentTypeName = document.getElementById('documentTypeName') == null ? "" : document.getElementById('documentTypeName').value;
    let ownerOrgType = document.getElementById('ownerOrgType') == null ? "" : document.getElementById('ownerOrgType').value;
    let documentName = document.getElementById('documentName') == null ? "" : document.getElementById('documentName').value;

    var searchCriteria = {}

    if (documentTypeName != "")
      searchCriteria.documentTypeName = documentTypeName

    if (ownerOrgType != "")
      searchCriteria.ownerOrgType = ownerOrgType
    if (documentName != "")
      searchCriteria.documentName = documentName


    this.setState({searchFilters: searchCriteria})

    var request = {
      "action": "mappingData",
      searchCriteria,
      "page": {
        "currentPageNo": 1,
        "pageSize": 10
      }
    }
    this.setState({currentPageNo: 1})

    return request;
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
    // this.props.actions.generalProcess(constants.getADHReportList, this.getRequest());
    let data = this.state.pageData.filter(item=>{
      return (item.name==this.state.Container.documentName && 
        item.documentType==this.state.Container.documentTypeName &&
        item.ownerOrgCode==this.state.Container.ownerOrgType)
    });

    this.setState({
      listData:data
    });
    
  }

  pageChanged(pageNo) {
    if (pageNo != undefined) {

      var request = "";

      if (this.state.searchFilters == undefined) {

        request = {
          "action": "ApiListData",
          "searchCriteria": {},
          "page": {
            "currentPageNo": pageNo,
            "pageSize": 10
          }
        }
      } else {
        var searchCriteria = this.state.searchFilters
        request = {
          "action": "ApiListData",
          searchCriteria,
          "page": {
            "currentPageNo": pageNo,
            "pageSize": 10
          }
        }
      }

      var pageData = Object.assign([],this.state.pageData)
      if(this.state.pageData.length-(pageNo*10)>0){
        console.log("there",pageNo)
        this.setState({
          currentPageNo: pageNo,
          listData:pageData.slice((pageNo*10)-10,pageNo*10)
        })
    }
    else{
      console.log("here",pageNo)
      this.setState({
        currentPageNo: pageNo,
        listData:pageData.slice((pageNo*10)-10,this.state.pageData.length)
      })
    }

      // this.props.actions.generalProcess(constants.getADHReportList, request);
      //this.props.actions.generalProcess(constants.getDocumentTypeList);

    }
  }

  clearFields() {
    $('#ApiListData').find('input:text').val('');
    $('#ApiListData').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
    this.setState({
      currentPageNo: 1,
      Container:{},
      listData:this.state.pageData
    })
  }


  render() {
    console.log(this.state,"SSSSS")
    if (this.state.pageData) {
      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">
                  <div className="caption">
                    <span className="caption-subject">{utils.getLabelByID("Document Type Filters")}</span></div>
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
                              <label className="control-label">{utils.getLabelByID("Document Name")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text"   value={this.state.Container.documentName}
                                onChange={this.onInputChange} className="form-control" name="documentName" id="documentName"/>
                            </div>
                          </div>
                          {this.state.typeData?<div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Owner Org Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                            <select  className="form-control" name="ownerOrgType" id="ownerOrgType"
                            value={this.state.Container.ownerOrgType}
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
                          </div>:null}
                          <div className="col-md-6">
                            <div className="form-group col-md-4">
                              <label className="control-label">{utils.getLabelByID("Document Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                              <input type="text" className="form-control"  value={this.state.Container.documentTypeName}
                                onChange={this.onInputChange}  name="documentTypeName" id="documentTypeName"/>
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

          <Portlet title={utils.getLabelByID("Document List")} isPermissioned={true}
                   actions={this.state.actions}>
            <Table fontclass=""
                   gridColumns={utils.getGridColumnByName("DocumentTypeList")}
                   gridData={this.state.listData}
                   totalRecords={this.state.pageData.length}
                  //  searchCallBack={this.searchCallBack}
                   pageSize={10}
                   pagination={true} pageChanged={this.pageChanged}
                   export={false}
                   search={true}
                   activePage={this.state.currentPageNo}/>
          </Portlet>


        </div>
      );

    } else
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
  }
}

List.propTypes = {
  listData: PropTypes.array,
  children: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    listData: _.get(state.app, 'documentTypeList', undefined),
    // pageData: _.get(state.app, 'ADHReportList.ADHReportList.data.pageData', undefined),
    typeData: state.app.typeData.data
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

List.displayName = "Document Type List";
export default connect(mapStateToProps, mapDispatchToProps)(List);