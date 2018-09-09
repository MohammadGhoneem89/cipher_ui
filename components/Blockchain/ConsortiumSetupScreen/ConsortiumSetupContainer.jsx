import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import { browserHistory } from 'react-router';
import {connect} from 'react-redux';
import Portlet from '../../../core/common/Portlet.jsx';
import Table from '../../../core/standard/Datatable.jsx';
import {SubmissionError} from 'redux-form'
import initialState from '../../../core/reducers/initialState.js';
import * as actions from '../../../core/actions/generalAction';
import ModalBox from '../../../core/common/ModalBox.jsx';
import * as utils from '../../../core/common/utils.js';
import * as constants from '../../../constants/Communication.js';
import * as requestCreator from '../../../core/common/request.js';
import ConsortiumSetupForm from './ConsortiumSetupForm.jsx'
import ParticipantsComponent from './ParticipantsComponent.jsx'
import SmartContractComponent from './SmartContractComponent.jsx'
import OrganizationForm from './OrganizationForm.jsx'
import DeploySmartContact from './DeploySmartContractForm.jsx'
import NodeSetupForm from './NodeSetupForm.jsx'

class BlockchainSetupContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            consortiumDetail: {...initialState.consortiumDetail.data},
            consortiumID: undefined,
            consortiumNames: undefined,
            index: undefined,
            checked: [],
            expanded: [],
            typeData: undefined,
            isLoading: true,
            readOnly: false,
            compileRequestSent: false,
            organizationModalIsOpen: false,
            deployModelsOpen: false,
            nodeModalIsOpen: false,
        };

        this.submit = this.submit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateOrganizations = this.updateOrganizations.bind(this);
        this.updateNodes = this.updateNodes.bind(this);
        this.compileSmartContract = this.compileSmartContract.bind(this);
        this.deploySmartContact = this.deploySmartContact.bind(this);
        this.loadSmartContract = this.loadSmartContract.bind(this);
    }

    componentWillMount() {

    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Cipher_blockchainType', 'Cipher_smartContactStatus']));
        if (this.props.consortiumID) {
            this.props.actions.generalProcess(constants.getConsortiumDetails, requestCreator.createConsortiumDetailRequest(this.props.consortiumID));
        }
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.consortiumDetail && nextProps.typeData) {
            let consortiumDetail = this.props.consortiumID ? nextProps.consortiumDetail : {
                ...this.state.consortiumDetail,
                actions: nextProps.consortiumDetail.actions || []
            };

            this.setState({
                consortiumID: nextProps.consortiumID,
                consortiumDetail: consortiumDetail,
                typeData: nextProps.typeData,
                isLoading: false
            });
        }

    }

    updateState(data) {
        this.setState(data);
    }

    updateOrganizations(organizationDetails) {
        let org = {
            "value": organizationDetails.name,
            "label": organizationDetails.name,
            "children": [
                {
                    "value": "6",
                    "label": "Node:172.16.11.14,10051,Orderer"
                },
                {
                    "value": "7",
                    "label": "Node:172.16.11.14,10060,Committer"
                }
            ]
        };
        let consortiumDetail = {...this.state.consortiumDetail};

        let orgs = consortiumDetail.participants.orgs || [];
        consortiumDetail.participants.orgs = orgs;
        orgs.push(org);
        this.setState({
            organizationModalIsOpen: false,
            consortiumDetail: consortiumDetail
        });
    };

    updateNodes() {
        alert("YES");
    }

    compileSmartContract(data) {
        if (data && data.files && data.files.length > 0) {
            let request = {
                _id: this.props.consortiumID,
                ...data.details,
                files: data.files
            };
            this.props.actions.generalProcess(constants.smartContractCompile, requestCreator.createCompileSmartContractRequest(request));

        }
    };
    loadSmartContract(data){
        let consortiumID = this.state.consortiumDetail._id;
        let bindingID = this.state.consortiumDetail.deployedContracts[data.index].bindingId;

        let URL = '/cipher/consortiums/'+consortiumID+'/smartContracts/'+bindingID;
        browserHistory.push(URL);
    }
    deploySmartContact(data){
        if(data){
            console.log(data);
            let request = {
                _id: this.props.consortiumID,
                index: this.state.consortiumDetail.smartContractTemplates[this.state.index]._id,
                params: (()=>{
                    if(data.params){
                        return data.params.map(item=>{
                            return isNaN(item)? item: parseInt(item);
                        });
                    }
                    return [];
                })(),
                channels: Object.keys(data.channels)
            };
            this.props.actions.generalProcess(constants.smartContractDeploy, requestCreator.createDeploySmartContractRequest(request));
            this.setState({deployModelsOpen: false});
        }
    }

    submit(data) {
        if (this.state.consortiumID) {
            data._id = this.state.consortiumID; //Hack to avoid replication.
            return this.props.actions.reduxFormProcess(constants.consortiumUpdate, requestCreator.createBlockchainUpdateRequest(data))
                .catch((error) => {
                    throw new SubmissionError(error);
                });
        }
        else
            return this.props.actions.reduxFormProcess(constants.consortiumInsert, requestCreator.createBlockchainInsertRequest(data))
                .catch((error) => {
                    throw new SubmissionError(error);
                });
    }

    render() {
        if (!this.state.isLoading) {
            let actions = {
                channelActions: [
                    {
                        type: "link",
                        className: "btn btn-default",
                        label: "ADD",
                        icon: "plus",
                        actionHandler: this.updateState.bind(this, {
                            servicesModalIsOpen: true,
                            index: this.state.consortiumDetail.channels.length
                        })
                    }
                ],
                participantsActions: [
                    {
                        type: "link",
                        className: "btn btn-default",
                        label: "Add Org",
                        icon: "plus",
                        actionHandler: this.updateState.bind(this, {
                            organizationModalIsOpen: true,
                            index: this.state.consortiumDetail.channels.length
                        })
                    },
                    {
                        type: "link",
                        className: "btn btn-default",
                        label: "Add Node",
                        icon: "plus",
                        actionHandler: this.updateState.bind(this, {
                            nodeModalIsOpen: true
                        })
                    },
                    {
                        type: "link",
                        className: "btn btn-default",
                        label: "Delete",
                        icon: "trash",
                        actionHandler: this.updateState.bind(this, {
                            servicesModalIsOpen: true
                        })
                    }
                ]
            };

            return (
                <div>
                    <ModalBox isOpen={this.state.organizationModalIsOpen}>
                        <OrganizationForm onSubmit={this.updateOrganizations} updateState={this.updateState}/>
                    </ModalBox>
                    <ModalBox isOpen={this.state.nodeModalIsOpen}>
                        <NodeSetupForm onSubmit={this.updateNodes} updateState={this.updateState}
                                       containerState={this.state}/>
                    </ModalBox>
                    <ModalBox isOpen={this.state.deployModelsOpen}>
                        <DeploySmartContact onSubmit={this.deploySmartContact} containerState={this.state}
                                            index={this.state.index} updateState={this.updateState}
                        />
                    </ModalBox>
                    <Portlet title={"Consortium Detail"}>
                        <ConsortiumSetupForm onSubmit={this.submit}
                                             initialValues={{
                                                 consortiumName: this.state.consortiumDetail.consortiumName,
                                                 consortiumType: this.state.consortiumDetail.consortiumType
                                             }}
                                             containerState={this.state}
                                             containerProps={this.props}/>

                        <div className="tabbable-line boxless">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab_1_1" data-toggle="tab"
                                       style={{fontWeight: "Bold", fontSize: "17px"}}>Participants</a>
                                </li>
                                <li>
                                    <a href="#tab_1_2" data-toggle="tab"
                                       style={{fontWeight: "Bold", fontSize: "17px"}}>Nodes</a>
                                </li>
                                <li>
                                    <a href="#tab_1_3" data-toggle="tab"
                                       style={{fontWeight: "Bold", fontSize: "17px"}}>Channels</a>
                                </li>
                                <li>
                                    <a href="#tab_1_4" data-toggle="tab"
                                       style={{fontWeight: "Bold", fontSize: "17px"}}>Smart Contracts</a>
                                </li>
                                <li>
                                    <a href="#tab_1_5" data-toggle="tab"
                                       style={{fontWeight: "Bold", fontSize: "17px"}}>Deployed Contracts</a>
                                </li>
                                <li>
                                    <a href="#tab_1_6" data-toggle="tab"
                                       style={{fontWeight: "Bold", fontSize: "17px"}}>Business Apps</a>
                                </li>
                            </ul>
                        </div>
                        <div className="tabbable-line">
                            <div className="tab-content">
                                <div className="tab-pane active" id="tab_1_1">
                                    <ParticipantsComponent updateState={this.updateState} containerState={this.state}/>
                                </div>
                                <div className="tab-pane" id="tab_1_2">
                                    <Portlet title={"Nodes List"}>
                                        <Table
                                            pagination={false}
                                            export={false}
                                            search={false}
                                            gridType={"CipherNode"}
                                            gridColumns={utils.getGridColumnByName("cipherNodeSearch")}
                                            gridData={this.state.consortiumDetail.nodes || []}
                                        />
                                    </Portlet>
                                </div>
                                <div className="tab-pane" id="tab_1_3">
                                    <Portlet title={"Channels Detail"}
                                             actions={this.state.readOnly ? false : actions.channelActions}>
                                        <Table
                                            pagination={false}
                                            export={false}
                                            search={false}
                                            gridColumns={utils.getGridColumnByName("cipherChannels")}
                                            componentFunction={""}
                                            gridData={this.state.consortiumDetail.channels}
                                            totalRecords={0}
                                        />
                                    </Portlet>
                                </div>
                                <div className="tab-pane" id="tab_1_4">
                                    <SmartContractComponent updateState={this.updateState} containerState={this.state}
                                                            onCompile={this.compileSmartContract}/>
                                </div>
                                <div className="tab-pane" id="tab_1_5">
                                    <Portlet title={"Deployed Contracts"}>
                                        <Table
                                            pagination={false}
                                            export={false}
                                            search={false}
                                            gridColumns={utils.getGridColumnByName("cipherDeployedSmartContract")}
                                            componentFunction={this.loadSmartContract}
                                            gridData={this.state.consortiumDetail.deployedContracts}
                                            totalRecords={0}
                                        />
                                    </Portlet>
                                </div>
                                <div className="tab-pane" id="tab_1_6">
                                    <Portlet title={"Business Apps"}
                                             actions={this.state.readOnly ? false : actions.channelActions}>
                                        <Table
                                            pagination={false}
                                            export={false}
                                            search={false}
                                            gridColumns={utils.getGridColumnByName("cipherBusinessApplication")}
                                            componentFunction={""}
                                            gridData={this.state.consortiumDetail.businessApplication}
                                            totalRecords={0}
                                        />
                                    </Portlet>
                                </div>
                            </div>
                        </div>
                    </Portlet>
                </div>

            );
        }
        else {
            return (<div className="loader">Loading...</div>);
        }
    }
}

BlockchainSetupContainer.propTypes = {
    consortiumDetail: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    let consortiumID = ownProps.params.consortiumID;
    return {
        consortiumDetail: state.app.consortiumDetail.data,
        consortiumID: consortiumID,
        typeData: state.app.typeData.data,
        readOnly: ownProps.params.mode === "view"
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

BlockchainSetupContainer.displayName = "ConsortiumSetup_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(BlockchainSetupContainer);