/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import Portlet from '../../common/Portlet.jsx';
/*container specific imports*/
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import DateControl from '../../common/DateControl.jsx'
import ModalBox from '../../common/ModalBox.jsx';
import ReactJson from 'react-json-view';
import * as requestCreator from '../../common/request.js';
class DispatchQueue extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchFilters: "", currentPageNo: 1, APIPayloadID: undefined, actions: [], isOpen: false, showdata: {}, response: {}, statusListEvent: [] };
        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        this.ActionHandlers = this.ActionHandlers.bind(this);
        this.closePopUP = this.closePopUP.bind(this);


    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID, isReQueued: false })
    }
    closePopUP() {
        this.setState({ isOpen: false })
    }
    getRequest() {
        let toDate = $("#toDate").find("input").val()
        let fromDate = $("#fromDate").find("input").val()
        let eventName = (document.getElementById('eventName') == null || document.getElementById('eventName') == undefined) ? "" : document.getElementById('eventName').value;
        let status = document.getElementById('status') == null ? "" : document.getElementById('status').value;
        var searchCriteria = {
        }

        if (toDate != "")
            searchCriteria.toDate = toDate;

        if (fromDate != "")
            searchCriteria.fromDate = fromDate;

        if (eventName != "")
            searchCriteria.eventName = eventName;

        if (status != "")
            searchCriteria.status = status;


        this.setState({ searchFilters: searchCriteria })

        var request = {
            "action": "EventListData",
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
        if (nextProps.typeData.data && nextProps.typeData.data.statusListEvent) {
            this.setState({ statusListEvent: nextProps.typeData.data.statusListEvent })
        }
    }
    componentWillMount() {



    }
    ActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "viewData":
                let data = this.props.DispatchQueueData.data.searchResult[index];
                let evtData = {}
                let resData = {}
                try {
                    evtData = JSON.parse(data.eventdata)
                    resData = JSON.parse(data.response)
                } catch (e) {
                    evtData = data.eventdata
                    resData = data.response
                }
                this.setState({ showdata: evtData, response:resData, isOpen: true })
                this.props.DispatchQueueData.data.searchResult
                break;
            case "ReQueue":
                if (index > -1) {
                    let a = this.props.DispatchQueueData.data.searchResult;
                    let id = a[index].internalid;
                    let request = {
                        eventID: id
                    }
                    this.setState({ isReQueued: true }, () => {
                        this.props.actions.generalProcess(constants.updateEventDispatcherStatus, request);
                    })

                    //this.props.actions.generalProcess(constants.getEventDispatcherStatus, this.getRequest());
                }
                break;
            default:
                break;
        }
    }
    searchCallBack(keyWord) {

    }
    componentWillUpdate() {
        if (this.state.isReQueued === true)
            this.setState({
                isReQueued: false
            }, function () {
                this.props.actions.generalProcess(constants.getEventDispatcherStatus, this.getRequest());
            });
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['statusListEvent']));
        this.props.actions.generalProcess(constants.getEventDispatcherStatus, this.getRequest());
        this.setState({ actions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/editEventRegistry/NEWEVENT", "children": [] }] })
    }
    formSubmit() {
        this.props.actions.generalProcess(constants.getEventDispatcherStatus, this.getRequest());
    }
    pageChanged(pageNo) {
        if (pageNo != undefined) {

            var request = "";

            if (this.state.searchFilters == undefined) {

                request = {
                    "action": "DispatchQueue",
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
                    "action": "DispatchQueue",
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }

            this.setState({ currentPageNo: pageNo })

            this.props.actions.generalProcess(constants.getEventDispatcherStatus, request);

        }
    }
    clearFields() {
        $('#DispatchQueue').find('input:text').val('');
        $('#DispatchQueue').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {

        if (this.props.DispatchQueueData.data) {
            return (
                <div>

                    <ModalBox isOpen={this.state.isOpen}>
                        <Portlet title={utils.getLabelByID("Event Details")} isPermissioned={true}>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <label className="control-label">{utils.getLabelByID("Event Data")}</label>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <pre> <ReactJson src={this.state.showdata} /></pre>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label className="control-label">{utils.getLabelByID("Reponse")}</label>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <pre> <ReactJson src={this.state.response} /></pre>
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
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("DispatchQueueFilters")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                                    </div>
                                </div>
                                <div className="portlet-body">
                                    <div className="form-body" id="DispatchQueue">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("APL_FromDate")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <DateControl id="fromDate" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("APL_ToDate")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <DateControl id="toDate" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">

                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("Event Name")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">
                                                            <input type="text" className="form-control" name="eventName" id="eventName" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div className="form-group col-md-4">
                                                            <label className="control-label">{utils.getLabelByID("Status")}</label>
                                                        </div>
                                                        <div className="form-group col-md-8">

                                                            <select id="status" name="status" className="form-control" >
                                                                <option value="">--select--</option>
                                                                {this.state.statusListEvent.map((option, index) => {
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
                    {console.log(this.props.DispatchQueueData.data.searchResult)}
                    <Portlet title={utils.getLabelByID("DispatchQueue")} isPermissioned={true}>
                        <Table componentFunction={this.ActionHandlers} fontclass="" gridColumns={utils.getGridColumnByName("DispatchQueueData")} gridData={this.props.DispatchQueueData.data.searchResult}
                            totalRecords={this.props.DispatchQueueData.pageData.totalRecords} searchCallBack={this.searchCallBack} pageSize={10}
                            pagination={true} pageChanged={this.pageChanged}
                            activePage={this.state.currentPageNo} />

                    </Portlet>


                </div>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

DispatchQueue.propTypes = {
    DispatchQueueData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {


    return {
        DispatchQueueData: state.app.EventDispatcherStatus,
        typeData: state.app.typeData,
        responseMessage: state.app.responseMessage
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
DispatchQueue.displayName = "DispatchQueue";
export default connect(mapStateToProps, mapDispatchToProps)(DispatchQueue);
