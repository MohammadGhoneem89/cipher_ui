import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as utils from '../../common/utils.js';
import Portlet from '../../common/Portlet.jsx';
import * as Loaders from '../../common/loaders.jsx';
import Table from '../../standard/Datatable.jsx';
import * as Communication from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';


class CommissionPreview extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isLoading: true,
            commissionTemplateDetail: {
                ...initialState.commissionTemplateDetail.data
            }
        };
    }

    componentDidMount() {
        this.props.containerProps.actions.generalProcess(Communication.getCommissionTemplateDetails,
            requestCreator.createCommissionTemplateDetailRequest(this.props.commissionTemplateID));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.commissionTemplateDetail._id === this.props.commissionTemplateID) {
            this.setState({
                isLoading: false,
                commissionTemplateDetail: nextProps.commissionTemplateDetail
            });
        }
    }

    render() {
        let response = {};
        let contactsActions = [
            {
                type: "icon",
                className: "btn btn-default",
                label: utils.getLabelByID("Add"),
                icon: "close",
                actionHandler: this.props.updateState.bind(this, {previewModalIsOpen: false})
            }
        ];

        if (!this.state.isLoading) {
            return (
                <Portlet title={"CTEMP_Preview"} actions={contactsActions} noCollapse={true}>
                    <b>{utils.getLabelByID("CTEMP_templateName")}:</b> {this.props.commissionTemplateDetail.templateName}

                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            <Table
                                pagination={false}
                                export={false}
                                search={false}
                                gridColumns={utils.getGridColumnByName("CTEMP_templatePreview")}
                                gridData={this.props.commissionTemplateDetail.commissionDetails || []}
                                totalRecords={response.commissionDetails ? response.commissionDetails.length : 0}
                            />
                        </div>
                    </div>
                </Portlet>
            );
        }
        else {
            return (
                <Portlet title={"CTEMP_Preview"} actions={contactsActions} noCollapse={true}>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                            {this.state.isLoading && Loaders.dotted()}
                        </div>
                    </div>
                </Portlet>

            );
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        commissionTemplateDetail: state.app.commissionTemplateDetail.data,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommissionPreview);