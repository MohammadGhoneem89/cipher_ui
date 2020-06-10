import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import GroupSetupForm from './GroupSetupForm.jsx'
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import { SubmissionError } from 'redux-form'


class RoleSetupContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            initialValues: {
                groupDetail: initialState.groupDetail.data,
                pageActions: initialState.groupDetail.data.actions,

            },
            groupID: undefined,
            isLoading: true
        };

        this.submit = this.submit.bind(this);
    }

    componentWillMount() {
        let groupID = this.props.groupID;
        if (groupID) {
            this.setState({
                groupID: this.props.groupID,
                isLoading: true
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        if (this.state.groupID) {
            var request = { "id": this.state.groupID };
            this.props.actions.generalProcess(constants.getGroupDetail, request);
        }
        else {
            this.props.actions.generalProcess(constants.getGroupDetail, requestCreator.createGroupDetailRequest("-1"));
        }
        // Get Type Data in any case
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['USE_CASE']));

    }
    componentWillUnmount() {
    }


    submit(data) {
        data.id = data._id;
        var dataSubmit = {
            "action": "groupInsert",
            data
        }
        this.setState({ isLoading: true })
        window.scrollTo(0, 0)
        if (this.state.groupID)
            return this.props.actions.reduxFormProcess(constants.groupUpdate, dataSubmit)
                .catch((error) => {
                    throw new SubmissionError(error);
                });
        else
            return this.props.actions.reduxFormProcess(constants.groupInsert, dataSubmit)
                .catch((error) => {
                    throw new SubmissionError(error);
                });
    }



    componentWillReceiveProps(nextProps) {
        if (nextProps.groupDetail && nextProps.useCases) {

            let nodes = [...nextProps.groupDetail.nodes];
            let UINodes = [];
            let APINodes = [];

            for (let count = 0; count < nodes.length; count++) {
                let child = nodes[count];
                if (child.permissionType == 'UI')
                    UINodes.push(child)
                else
                    APINodes.push(child)
            }
            if (APINodes[0])
                APINodes[0].label = "API Permissions Core";
            if (APINodes[1])
                APINodes[1].label = "API Permissions" + " " + APINodes[1].useCase;


            if (!nextProps.groupDetail.type) {
                nodes = []
            }
            if (nextProps.groupDetail.type == 'UI') {
                nodes = [...UINodes]
            } else if (nextProps.groupDetail.type == 'API') {
                nodes = [...APINodes]
            }


            this.setState({
                groupDetail: {
                    ...nextProps.groupDetail,
                    checked: [..._.get(nextProps.groupDetail,'checked',[])],
                    nodes,
                    UINodes,
                    APINodes
                },
                pageActions: nextProps.pageActions,
                isLoading: false,
                useCases: nextProps.useCases
            });
        }
        if (!nextProps.groupDetail && nextProps.useCases) {

            this.setState({
                groupDetail: initialState.groupDetail.data.searchResult,
                pageActions: nextProps.pageActions,
                useCases: nextProps.useCases
            });
        }
    }

    render() {
        if (!this.state.isLoading) {

            return (

                <Portlet title={"Group"}>
                    <GroupSetupForm onSubmit={this.submit} initialValues={this.state.groupDetail} checked={this.state.checked} pageActions={this.state.pageActions}
                        expanded={this.state.expanded} useCases={this.state.useCases} />
                </Portlet>
            );
        }
        else
            return (<div className="loader">Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {
    let groupID = ownProps.params.groupID;
    if (groupID) {
        return {
            groupDetail: state.app.groupDetail.data.searchResult,
            pageActions: state.app.groupDetail.data.actions,
            groupID: ownProps.params.groupID,
            useCases: _.get(state.app, 'typeData.data.USE_CASE', undefined)
        };
    }
    else {
        return {
            groupDetail: state.app.groupDetail.data.searchResult,
            pageActions: state.app.groupDetail.data.actions,
            groupID: undefined,
            useCases: _.get(state.app, 'typeData.data.USE_CASE', undefined)
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}
RoleSetupContainer.displayName = "GSetup_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(RoleSetupContainer)