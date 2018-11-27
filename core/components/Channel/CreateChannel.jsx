/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
/*container specific imports*/
import Table from '../../common/Datatable.jsx';
import * as utils from '../../../core/common/utils.js';
import * as constants from '../../../core/constants/Communication.js';
import * as requestCreator from '../../../core/common/request.js';
import DateControl from '../../../core/common/DateControl.jsx'

class CreateChannel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentPageNo: 1, isLoading: false };
        this.pageChanged = this.pageChanged.bind(this);
        // this.fetchListData = this.fetchListData.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }
    componentWillMount() {
        // this.fetchListData(1);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.sampleListData !== nextProps.sampleListData) {
        //   this.setState({
        //     isLoading: false
        //   });
        // }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    pageChanged(pageNo) {
        this.setState({ currentPageNo: pageNo });
        this.fetchListData(pageNo);
    }
    formSubmit(e) {
        e.preventDefault();
        this.fetchListData();
    }
    fetchListData(currentPageNo) {
        let toDate = $("#toDate").find("input").val();
        let fromDate = $("#fromDate").find("input").val();
        let textbox = document.getElementById('textbox') == null ? "" : document.getElementById('textbox').value;

        let filtersData = {
            "fromDate": fromDate,
            "toDate": toDate,
            "textbox": textbox,
        };
        let searchRequest = {
            "currentPageNo": currentPageNo || this.state.currentPageNo,
            "pageSize": 5,
            "data": filtersData || {}
        };
        this.setState({ currentPageNo: 1, isLoading: true });
        this.props.actions.generalProcess(constants.getSampleListData, searchRequest);

    }

    clearFields() {
        $('#sampleListView').find('input:text').val('');
        $('#sampleListView').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }


    render() {
        //if (this.props.sampleListData.gridData) {
        return (
            <form onSubmit={this.formSubmit.bind(this)}>
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="caption">
                                        <span className="caption-subject">{utils.getLabelByID("Channel")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>

                                    </div>
                                </div>
                                <div className="portlet-body" id="Channel">
                                    <div className="form-body ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Channel_Name")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <input className="form-control" id="CN" type="text"></input>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Channel_Name")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <button className="btn btn-default" type="text">Upload</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Create_Channel")}</label>
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <input className="form-check-input" style={{width: '23px', height: '20px'}} type="checkbox"></input>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Network")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select id="network" name="network" onChange={this.onMappingTypeChange} value={this.state.mappingType} className="form-control">
                                                        <option key="network" value="network">Network LIST</option>

                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Create_Status")}</label>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group col-md-12">
                                                    <textarea disabled className="form-control" id="createstatus" rows="4" cols="150" type="text">
                                                       
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div></div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-actions right">
                                                <div className="form-group col-md-12">
                                                    <div className="btn-toolbar pull-right ">
                                                        <button type="submit" className="btn btn-info" > Create & Save </button>
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
                

            </form >

        );
    }
    // else
    //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}


function mapStateToProps(state, ownProps) {
    return {


    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(CreateChannel);
