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


class NetworkList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined }
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);


    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }

    getRequest() {
       let networkName = document.getElementById('networkName') == null ? "" : document.getElementById('networkName').value;
        let mspid = document.getElementById('mspid') == null ? "" : document.getElementById('mspid').value;

        var searchCriteria = {
        }

        if (networkName != "")
            searchCriteria.networkName = networkName

        if (mspid != "")
            searchCriteria.mspid = mspid

      

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
        console.log(JSON.stringify(request))


        return request;
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData) {
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
        this.props.actions.generalProcess(constants.getNetworkListData, this.getRequest());
        this.setState({ actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/editNetwork/NEW", "children": [] }] })
    }
    formSubmit() {

        this.props.actions.generalProcess(constants.getNetworkListData, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "NetworkList",
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
                    "action": "NetworkListData",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getNetworkListData, request);

        }
    }
    clearFields() {
        $('#NetworkListData').find('input:text').val('');
        $('#NetworkListData').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {

        if (this.props.NetworkListData && this.props.NetworkListData.data) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("NetworkListDataFilters")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="NetworkListData">
                                        <div className="row">
                                            <div className="col-md-12">

                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("NAU_networkName")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="networkName" id="networkName" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("NAU_MSPID")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="mspid" id="mspid" /> 
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-actions right">
                                                    <div className="form-group col-md-12">
                                                        <div className="btn-toolbar pull-right">

                                                            <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                            {"  "}
                                                            <button type="button" className="btn default" onClick={this.clearFields} >{utils.getLabelByID("Clear")}</button>
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

                    <Portlet title={utils.getLabelByID("NetworkList")} isPermissioned={true} 
                    actions={this.state.actions}>
                        <Table fontclass="" gridColumns={utils.getGridColumnByName("NetworkListData")} gridData={this.props.NetworkListData.data.searchResult}
                            totalRecords={this.props.NetworkListData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={10}
                            pagination={true} pageChanged={this.pageChanged} export={false} search={true}
                            activePage={this.state.currentPageNo} />
                    </Portlet>


                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

NetworkList.propTypes = {
    NetworkListData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        NetworkListData: state.app.NetworkList
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
NetworkList.displayName = "NetworkList";
export default connect(mapStateToProps, mapDispatchToProps)(NetworkList);
