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
                pageActions : initialState.groupDetail.data.actions,

            },
            groupID: undefined,
            isLoading: true
        };

        this.submit = this.submit.bind(this);
        this.updateNodesByType = this.updateNodesByType.bind(this);
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
        console.log("Data:")
        console.log(data)

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
            
            this.setState({
                groupDetail: nextProps.groupDetail,
                pageActions: nextProps.pageActions,
                isLoading: false,
                useCases: nextProps.useCases
            });
        }
        if (!nextProps.groupDetail && nextProps.useCases) {
            
            this.setState({
                groupDetail: initialState.groupDetail.data,
                pageActions: nextProps.pageActions,
                useCases: nextProps.useCases
            });
        }
    }
    updateNodesByType() {
        let nodes = this.props.groupDetail.nodes;
        let UINodes = [];
        let APINodes = [];

        for (let count = 0; count < nodes.length; count++) {
            let child = nodes[count];
            if (child.type == 'module' && child.label == "API Permissions")
                APINodes.push(child)
            else
                UINodes.push(child)
        }

        APINodes[0].label = "API Permissions Core"; //" " +  APINodes[0].useCase
        APINodes[1].label = "API Permissions" + " " + APINodes[1].useCase;
        this.props.groupDetail.UINodes = UINodes;
        this.props.groupDetail.APINodes = APINodes;

        this.props.groupDetail.nodes = [];
  
        if( this.props.groupDetail.type == 'API')
            this.props.groupDetail.nodes = APINodes;
        else if ( this.props.groupDetail.type == 'UI')
            this.props.groupDetail.nodes = UINodes;        

        console.log(this.props.groupDetail, ' GROUP_DETAIL')
    }

    render() {
        if (!this.state.isLoading) {
            this.updateNodesByType();

            return (

                <Portlet title={"Group"}>

                    <GroupSetupForm onSubmit={this.submit} initialValues={this.props.groupDetail} checked={this.state.checked} pageActions= {this.state.pageActions}
                        expanded={this.state.expanded} useCases = {this.state.useCases}/>
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