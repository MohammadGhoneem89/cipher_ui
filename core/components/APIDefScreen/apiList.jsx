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


class ApiList extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], typeData: undefined }
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.downloadChainCode = this.downloadChainCode.bind(this);
        this.getChaincodeRequest = this.getChaincodeRequest.bind(this)

    }

    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }
    getChaincodeRequest() {
        let useCase = document.getElementById('useCase') == null ? "" : document.getElementById('useCase').value;
        let route = document.getElementById('route') == null ? "" : document.getElementById('route').value;
        var searchCriteria = {
        }

        if (useCase != "")
            searchCriteria.useCase = useCase;

        if (route != "")
            searchCriteria.route = route;
console.log(route,"++++++++====route\n\n",searchCriteria);
        this.setState({ searchFilters: searchCriteria });

        var chaincodeRequest = {
            "action": "mappingData",
            searchCriteria,
            "page": {
                "currentPageNo": 1,
                "pageSize": 10
            }
        }
        this.setState({ currentPageNo: 1 })

        return chaincodeRequest;
    }

    downloadChainCode() {
        if ((document.getElementById('useCase').value) == "") {
            alert("UseCase Required !")
        }
        else {
            this.props.actions.generalProcess(constants.downloadChainCode,
                 this.getChaincodeRequest());
        }
    }

    getRequest() {
        let useCase = document.getElementById('useCase') == null ? "" : document.getElementById('useCase').value;
        let route = document.getElementById('route') == null ? "" : document.getElementById('route').value;

        var searchCriteria = {}

        if (useCase != "")
            searchCriteria.useCase = useCase

        if (route != "")
            searchCriteria.route = route



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

    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData && nextProps.downloadChainCode) {
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
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['USE_CASE']));
        this.props.actions.generalProcess(constants.getApiListData, this.getRequest());
        this.setState({ actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/APIDefScreen/NEWCASE/NEWROUTE", "children": [] }] })
    }
    formSubmit() {

        this.props.actions.generalProcess(constants.getApiListData, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "ApiListData",
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
                    "action": "ApiListData",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getApiListData, request);

        }
    }
    clearFields() {
        $('#ApiListData').find('input:text').val('');
        $('#ApiListData').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {

        if (this.props.ApiListData && this.props.ApiListData.data) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("ApiListDataFilters")}</span></div>
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
                                                            <label className="control-label">{utils.getLabelByID("MAU_useCase")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <select name="useCase" id="useCase" className="form-control">
                                                                <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                                                {this.state.typeData && this.state.typeData.USE_CASE && this.state.typeData.USE_CASE.map((option, index) => {
                                                                    return (
                                                                        <option key={index} value={option.value}>{option.label}</option>
                                                                    );
                                                                })}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("AAU_Route")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="route" id="route" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-actions right">
                                                    <div className="form-group col-md-12">
                                                        <div className="btn-toolbar pull-right">

                                                            <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                            {"  "}
                                                            <button type="button" className="btn default" onClick={this.clearFields} >{utils.getLabelByID("Clear")}</button>
                                                            <button type="button" className="btn green" onClick={this.downloadChainCode}>{utils.getLabelByID("Generate_ChainCode")}
                                                                <i className="fa fa-file-code-o"/>
                                                            </button>
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

                    <Portlet title={utils.getLabelByID("ApiList")} isPermissioned={true}
                             actions={this.state.actions}>
                        <Table fontclass=""
                               gridColumns={utils.getGridColumnByName("ApiListData")}
                               gridData={this.props.ApiListData.data.searchResult}
                               totalRecords={this.props.ApiListData.pageData.totalRecords}
                               searchCallBack={this.searchCallBack} pageSize={10}
                               pagination={true} pageChanged={this.pageChanged}
                               export={false}
                               search={true}
                               activePage={this.state.currentPageNo} />
                    </Portlet>


                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

ApiList.propTypes = {
    ApiListData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    return {
        ApiListData: state.app.ApiListData,
        downloadChainCode: state.app.downloadChainCode,
        typeData: state.app.typeData.data
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
ApiList.displayName = "ApiList";
export default connect(mapStateToProps, mapDispatchToProps)(ApiList);