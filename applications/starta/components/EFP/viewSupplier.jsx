/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import { baseUrl } from '../../../../core/constants/Communication.js';
import QRCodeJquery from '../../../../core/common/QRCodeJquery.jsx';
import ActionButton from '../../../../core/common/ActionButtonNew.jsx';
import * as requestCreator from '../../../../core/common/request.js';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import Steps from '../../../../core/common/Steps.jsx';
import { isThisSecond } from 'date-fns';


class viewSupplier extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: {},
            getSupplierMasterView: undefined,
            isLoading: true,
            page: {
                pageSize: 10,
                currentPageNo: 1
            }
        }
    }
    componentWillMount() {
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getSupplierMasterView, this.getRequest());
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.getSupplierMasterView, "DATAAAAAAAAAAAA")
        if (nextProps.getSupplierMasterView) {
            this.setState({
                getSupplierMasterView: nextProps.getSupplierMasterView,
                isLoading: false
            });
            console.log(this.state.getSupplierMasterView, "&&&&&&&&&&&&&77")
        }

    }

    getRequest = () => {
        this.setState({ isLoading: true });
        console.log(this.props.params.id, "this.props.params.idcccccccccc")
        let supplierID = this.props.params.id;
        
        let request = {

            "bypassSimu": true,
            "body": {
                "page": {
                    "currentPageNo": 1,
                    "pageSize": 10
                },
                "searchCriteria": {
                    "supplierID":supplierID
                }
            }
        };
        this.props.actions.generalProcess(constants.getSupplierMasterView,request);;
    }

    render() {

        if (!this.state.isLoading) {
            return (
                <div>
                    <div className="portlet light bordered">
                        <div className="portlet-body">
                            <div className="row">
                                <div className="portlet-body form" style={{ paddingLeft: "20px" }}>
                                    <form className="form-horizontal" role="form">
                                        <div className="form-body" style={{ paddingLeft: "18px" }}>
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <label className="control-label" style={{
                                                        fontWeight: "bold"
                                                    }}>
                                                        {utils.getLabelByID("SUPPLIER CODE  #   " + this.props.getSupplierMasterView[0].supplierID)}
                                                    </label>
                                                </div>
                                                <br />
                                                <div className="row">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label" >{utils.getLabelByID("SUPPLIER NAME : ")}</label>
                                                    </div>
                                                    <div className="form-group col-md-8">
                                                        <label className="control-label" >{this.props.getSupplierMasterView[0].supplierName}</label>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label" >{utils.getLabelByID("SUPPLIER COUNTRY : ")}</label>
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label className="control-label" >{this.props.getSupplierMasterView[0].supplierCountry}</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4" style={{ paddingLeft: "90px" }}>
                                                <img className="img-thumbnail img-rounded" style={{ height: "180px" }} src={this.props.getSupplierMasterView[0].logo} />
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
console.log(state.app.getSupplierMasterView.searchResult,"5555555555555555")
    return {
        getSupplierMasterView: state.app.getSupplierMasterView.searchResult,
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

viewSupplier.displayName = "VIEW SUPPLIER";
export default connect(mapStateToProps, mapDispatchToProps)(viewSupplier);