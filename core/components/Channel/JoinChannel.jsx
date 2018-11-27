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

class Joinchannel extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentPageNo: 1, isLoading: false };
        // this.pageChanged = this.pageChanged.bind(this);
        // this.fetchListData = this.fetchListData.bind(this);
        // this.formSubmit = this.formSubmit.bind(this);
    }


    formSubmit(e) {
        e.preventDefault();
        this.fetchListData();
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
                                        <span className="caption-subject">{utils.getLabelByID("JoinChannel")}</span></div>
                                    <div className="tools">
                                        <a href="javascript:;" className="collapse" data-original-title title> </a>

                                    </div>
                                </div>
                                <div className="portlet-body" id="Channel">
                                    <div className="form-body ">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Network")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select id="LIST-DDL" name="LIST-DDL" className="form-control">
                                                        <option key="LIST-DDL" value="LIST-DDL">LIST-DDL</option>

                                                    </select>
                                                </div>

                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Channel_Name")}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <select id="LIST" name="LIST" className="form-control">
                                                        <option key="LIST" value="LIST">LIST</option>

                                                    </select>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("PeerList")}</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <Table gridColumns={utils.getGridColumnByName("PeerList")}
                                                    gridData={[{ peername: "peer()", Network: "RECON 1", action: "Join Channel" }]}
                                                    title={utils.getLabelByID("PeerList")}
                                                    fontclass=""
                                                    TableClass="portlet light bordered sdg_portlet"
                                                    totalRecords={10}
                                                    // searchCallBack={this.searchCallBack} 
                                                    // pageSize={5}
                                                    // pageChanged={this.pageChanged}
                                                    pagination={false}
                                                // activePage={this.state.pageNumner}
                                                />


                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group col-md-4">
                                                    <label className="control-label">{utils.getLabelByID("Join_Status")}</label>
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

export default connect(mapStateToProps, mapDispatchToProps)(Joinchannel);
