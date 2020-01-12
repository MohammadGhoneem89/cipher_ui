/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';

import Portlet from '../../common/Portlet.jsx';
/*container specific imports*/
import TileUnit from '../../common/tileUnit.jsx';
import Table from '../../common/Datatable.jsx';
import BarChartExceptions from '../../common/barChart.jsx'
import * as utils from '../../common/utils.js';


import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import DateControl from '../../common/DateControl.jsx'


class MappingList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined }
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        // this.downloadStruct = this.downloadStruct.bind(this);
        // this.getStructRequest = this.getStructRequest.bind(this)

    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }

    getRequest() {
       let mappingName = document.getElementById('mappingName') == null ? "" : document.getElementById('mappingName').value;
       let mappingType = document.getElementById('requestType') == null ? "" : document.getElementById('requestType').value;

        var searchCriteria = {
        }

        if (mappingName != "")
            searchCriteria.mappingName = mappingName

        if (mappingType != "")
            searchCriteria.mappingType = mappingType

      

        this.setState({ searchFilters: searchCriteria })

        var request = {
            "action": "mappingData",
            searchCriteria,
            "page": {
                "currentPageNo": 1,
                "pageSize": 10
            }
        }
        this.setState({ currentPageNo: 1 })
        return request;
    }
    // getStructRequest(){
    //     console.log("downloadStruct---------------------------------")
    //     let searchCriteria = {};
    //     let mappingName = document.getElementById('mappingName') == null ? "" : document.getElementById('mappingName').value;
       
    //             searchCriteria.mappingName = mappingName;

    //         this.setState({ searchFilters: searchCriteria })

    //         let  request = {
    //             "action": "mappingData",
    //             searchCriteria,
    //             "page": {
    //                 "currentPageNo": 1,
    //                 "pageSize": 10
    //             }
    //         }
    //         console.log("sending request downloadStruct---------------------------------")
    //         return request;
        
    // }
    // downloadStruct() {
    //     if (document.getElementById('mappingName').value == "") {
    //         alert("mappingName Required !")
    //     }
    //     else {
    //         this.props.actions.generalProcess(constants.createDynamicStruct,
    //              this.getStructRequest());
    //     }
    // }
    componentWillReceiveProps(nextProps) {
        
        if (nextProps.typeData && nextProps.createDynamicStruct) {
            console.log(nextProps.createDynamicStruct,"++++++++++++++++++++++++++++")
            this.setState({
                typeData: nextProps.typeData
            });
        }
    }
    componentWillMount() {



    }
    searchCallBack(keyWord) {

    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getMappingListData, this.getRequest());
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['DFM_FROMATTYPE']));
        this.setState({ actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/editMapping/NEWMAPPING", "children": [] }] })
    }
    formSubmit() {

        this.props.actions.generalProcess(constants.getMappingListData, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "MappingListData",
                    "searchCriteria": {
                    },
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            } else {
                var searchCriteria = this.state.searchFilters
                request = {
                    "action": "MappingListData",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getMappingListData, request);

        }
    }
    clearFields() {
        $('#MappingListData').find('input:text').val('');
        $('#MappingListData').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }

    
    render() {

        if (this.props.MappingListData && this.props.MappingListData.data) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("MappingListDataFilters")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title />
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="MappingListData">
                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_RequestName")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="mappingName" id="mappingName" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("MAU_RequestType")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select id="requestType" name="requestType" onChange={this.onMappingTypeChange} value={this.state.mappingType} className="form-control">
                                                            <option key="ALL" value="ALL">ALL</option>
                                                                {this.state.typeData && this.state.typeData.DFM_FROMATTYPE && this.state.typeData.DFM_FROMATTYPE.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-actions right">
                                                    <div className="form-group col-md-12">
                                                        <div className="btn-toolbar pull-right">

                                                            <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                            {"  "}
                                                            <button type="button" className="btn default" onClick={this.clearFields} >{utils.getLabelByID("Clear")}</button>
                                                            {/* <button type="button" className="btn green" onClick={this.downloadStruct} >{utils.getLabelByID("GetStruct")} </button> */}
                                                            
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

                    <Portlet title={utils.getLabelByID("MappingList")} isPermissioned={true}
                        actions={this.state.actions}>
                        <Table fontclass="" 
                        gridColumns={utils.getGridColumnByName("MappingListData")} 
                        gridData={this.props.MappingListData.data.searchResult}
                            totalRecords={this.props.MappingListData.pageData.totalRecords} 
                            searchCallBack={this.searchCallBack} pageSize={10}
                            pagination={true} pageChanged={this.pageChanged} 
                            export={false} search={true}
                            activePage={this.state.currentPageNo} />
                    </Portlet>


                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

MappingList.propTypes = {
    MappingListData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        createDynamicStruct :state.app.createDynamicStruct,
        MappingListData: state.app.MappingList,
        typeData: state.app.typeData.data
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
MappingList.displayName = "MappingList";
export default connect(mapStateToProps, mapDispatchToProps)(MappingList);
