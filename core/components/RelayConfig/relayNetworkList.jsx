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


class RelayNetworkList extends React.Component {

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
        // alert(JSON.stringify(nextProps))
        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData
            });
        }
    }
    componentWillMount() {}
    searchCallBack(keyWord) {}
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getRelayNetworkListData, this.getRequest());
        this.setState({ actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/editRelayNetwork/NEW", "children": [] }] })
    }
    formSubmit() {

        this.props.actions.generalProcess(constants.getRelayNetworkListData, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "RelayNetworkList",
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
                    "action": "RelayNetworkListData",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getRelayNetworkListData, request);

        }
    }
    clearFields() {
        $('#RelayNetworkListData').find('input:text').val('');
        $('#RelayNetworkListData').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {

        if (this.props.RelayNetworkListData && this.props.RelayNetworkListData.data) {
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
                                    <div className="form-body" id="RelayNetworkListData">
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

                    <Portlet title={utils.getLabelByID("RelayNetworkList")} isPermissioned={true} 
                    actions={this.state.actions}>
                        <Table fontclass="" gridColumns={utils.getGridColumnByName("RelayNetworkListData")} gridData={this.props.RelayNetworkListData.data.searchResult}
                            totalRecords={this.props.RelayNetworkListData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={10}
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

RelayNetworkList.propTypes = {
    RelayNetworkListData: PropTypes.object,
    children: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    return {
        RelayNetworkListData: _.get(state.app, 'RelayNetworkList',undefined)
    };
}
function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

RelayNetworkList.displayName = "RelayNetworkList";
export default connect(mapStateToProps, mapDispatchToProps)(RelayNetworkList);
