import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Portlet from '../../../common/Portlet.jsx';
import Table from '../../../common/Datatable.jsx';
import { SubmissionError } from 'redux-form'
import initialState from '../../../reducers/initialState.js';
import * as actions from '../../../actions/generalAction';
import ModalBox from '../../../common/ModalBox.jsx';
import * as utils from '../../../common/utils.js';
import * as constants from '../../../constants/Communication.js';
import * as requestCreator from '../../../common/request.js';
import ConsortiumSetupForm from './ConsortiumSetupForm.jsx'
import ParticipantsComponent from './ParticipantsComponent.jsx'
import SmartContractComponent from './SmartContractComponent.jsx'
import ActionButton from '../../../common/ActionButtonNew.jsx';
import OrganizationForm from './OrganizationForm.jsx'
import DeploySmartContact from './DeploySmartContractForm.jsx'
import NodeSetupForm from './NodeSetupForm.jsx'

class BlockchainSetupContainer extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            consortiumDetail: { ...initialState.consortiumDetail.data },
            viewConsortiumData: {},
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
            netactions: []
        };

        this.submit = this.submit.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updateOrganizations = this.updateOrganizations.bind(this);
        this.updateNodes = this.updateNodes.bind(this);
        this.compileSmartContract = this.compileSmartContract.bind(this);
        this.deploySmartContact = this.deploySmartContact.bind(this);
        this.loadSmartContract = this.loadSmartContract.bind(this);
        this.editconsortium = this.editconsortium.bind(this);
        this.addnetwork = this.addnetwork.bind(this)
    }
    editconsortium() {
        browserHistory.push(`/CreateConsortium/${this.props.consortiumID}`)
    }
    addnetwork() {
        browserHistory.push(`/CreateConsortium/${this.props.consortiumID}`)
    }
    componentWillMount() {

    }

    componentDidMount() {
        window.scrollTo(0, 0);

        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Cipher_blockchainType', 'Cipher_smartContactStatus', 'BLCHN_TYPE', 'UseCase']));

        if (this.props.consortiumID) {
            this.props.actions.generalProcess(constants.getConsortiumDetails, { _id: this.props.consortiumID });
            // this.props.actions.generalProcess(constants.getConsortiumDetails, requestCreator.createConsortiumDetailRequest(this.props.consortiumID));
        }



    }

    componentWillUnmount() {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.viewConsortium && nextProps.typeData) {
            this.setState({
                //  consortiumID: nextProps.consortiumID,
                consortiumDetail: nextProps.viewConsortium,
                typeData: nextProps.typeData,
                isLoading: false
            });
        }
        this.setState({ netactions: [{ "value": "1002", "type": "pageAction", "label": "Add New Network", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/editNetwork/NEW", "children": [] }] })
        this.setState({ chnlactions: [{ "value": "1002", "type": "pageAction", "label": "ADD", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/CreateChannel/NEW", "children": [] }] })
        this.setState({ scactions: [{ "value": "1002", "type": "pageAction", "label": "ADD ", "labelName": "COM_AB_Add", "actionType": "PORTLET_LINK", "iconName": "fa fa-plus", "URI": "/CreateSmartContract/NEW", "children": [] }] })


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
        let consortiumDetail = { ...this.state.consortiumDetail };

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
    loadSmartContract(data) {
        let consortiumID = this.state.consortiumDetail._id;
        let bindingID = this.state.consortiumDetail.deployedContracts[data.index].bindingId;

        let URL = '/cipher/consortiums/' + consortiumID + '/smartContracts/' + bindingID;
        browserHistory.push(URL);
    }
    deploySmartContact(data) {
        if (data) {
            console.log(data);
            let request = {
                _id: this.props.consortiumID,
                index: this.state.consortiumDetail.smartContractTemplates[this.state.index]._id,
                params: (() => {
                    if (data.params) {
                        return data.params.map(item => {
                            return isNaN(item) ? item : parseInt(item);
                        });
                    }
                    return [];
                })(),
                channels: Object.keys(data.channels)
            };
            this.props.actions.generalProcess(constants.smartContractDeploy, requestCreator.createDeploySmartContractRequest(request));
            this.setState({ deployModelsOpen: false });
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
                            index: this.state.consortiumDetail.channelData.length
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
                            index: this.state.consortiumDetail.channelData.length
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
            let networkList = this.state.consortiumDetail.networkData;
            networkList.forEach(element => {
                let actions = [
                    {
                        "value": "1003",
                        "type": "componentAction",
                        "label": "View",
                        "params": "",
                        "iconName": "icon-docs",
                        "URI": [
                            "/editNetwork/"
                        ]
                    }];
                element.actions = actions;
                element.createdBy = element.createdBy.userID
            });



            let channelList = this.state.consortiumDetail.channelData;
            channelList.forEach(element => {
                let actions = [
                    {
                        "value": "1003",
                        "type": "componentAction",
                        "label": "View",
                        "params": "",
                        "iconName": "icon-docs",
                        "URI": [
                            "/CreateChannel/"
                        ]
                    }];
                element.actions = actions;
                element.createdBy = element.createdBy.userID
            });
            let smartList = this.state.consortiumDetail.smartContractList;
            smartList.forEach(element => {
                let actions = [
                    {
                        "value": "1003",
                        "type": "componentAction",
                        "label": "View",
                        "params": "",
                        "iconName": "icon-docs",
                        "URI": [
                            "/CreateSmartContract/"
                        ]
                    }];
                element.actions = actions;
                element.createdBy = element.createdBy.userID
            });

            return (
                <div>
                    <ModalBox isOpen={this.state.organizationModalIsOpen}>
                        <OrganizationForm onSubmit={this.updateOrganizations} updateState={this.updateState} />
                    </ModalBox>
                    <ModalBox isOpen={this.state.nodeModalIsOpen}>
                        <NodeSetupForm onSubmit={this.updateNodes} updateState={this.updateState}
                            containerState={this.state} />
                    </ModalBox>
                    <ModalBox isOpen={this.state.deployModelsOpen}>
                        <DeploySmartContact onSubmit={this.deploySmartContact} containerState={this.state}
                            index={this.state.index} updateState={this.updateState}
                        />
                    </ModalBox>
                    <Portlet title={"Consortium Detail"}>
                        <ConsortiumSetupForm onSubmit={this.submit}
                            initialValues={{
                                consortiumName: this.state.consortiumDetail.consortiumData.ConsortiumName,
                                consortiumType: this.state.consortiumDetail.consortiumData.type
                            }}
                            containerState={this.state}
                            containerProps={this.props} />


                        <div className="tabbable-line boxless">
                            <ul className="nav nav-tabs">
                                <li className="active">
                                    <a href="#tab_1_1" data-toggle="tab"
                                        style={{ fontWeight: "Bold", fontSize: "17px" }}>Participants</a>
                                </li>
                                <li>
                                    <a href="#tab_1_2" data-toggle="tab"
                                        style={{ fontWeight: "Bold", fontSize: "17px" }}>Networks</a>
                                </li>
                                <li>
                                    <a href="#tab_1_3" data-toggle="tab"
                                        style={{ fontWeight: "Bold", fontSize: "17px" }}>Channels</a>
                                </li>
                                <li>
                                    <a href="#tab_1_4" data-toggle="tab"
                                        style={{ fontWeight: "Bold", fontSize: "17px" }}>Smart Contracts</a>
                                </li>
                                <li>
                                    <a href="#tab_1_6" data-toggle="tab"
                                        style={{ fontWeight: "Bold", fontSize: "17px" }}>Business Apps</a>
                                </li>
                            </ul>
                        </div>
                        <div className="tabbable-line">
                            <div className="tab-content">
                                <div className="tab-pane active" id="tab_1_1">
                                    <ParticipantsComponent updateState={this.updateState} containerState={this.state} editconsortium={this.editconsortium} />
                                </div>
                                <div className="tab-pane" id="tab_1_2">
                                    {/* <Portlet title={"Network List"} isPermissioned={true}
                                        actions={this.state.netactions}> */}
                                    {/* <Table
                                            pagination={false}
                                            export={false}
                                            search={false}
                                            gridType={"CipherNode"}
                                            gridColumns={utils.getGridColumnByName("NetworkListData")}
                                            gridData={networkList || []}
                                        /> */}
                                    {networkList.map((element, key) => {
                                        let finalPerm=_.cloneDeep(this.state.netactions);
                                        let perm = {
                                            "value": "1002",
                                            "type": "pageAction",
                                            "label": "Edit Network",
                                            "labelName": "COM_AB_EditNet",
                                            "actionType": "PORTLET_LINK",
                                            "iconName": "fa fa-edit",
                                            "URI": `/editNetwork/${element._id}`,
                                            "children": []
                                        }
                                        finalPerm.push(perm)
                                        return (
                                            <div key={key} className="row" style={{
                                                border: "2px #80808045 dashed",
                                                padding: "5px",
                                                margin: "1px"
                                            }}>

                                                <div className="row">
                                                    <div className="col-md-12 form-group" style={{
                                                        padding: "25px"
                                                    }}>
                                                        <span>
                                                            <div className="row">
                                                                <div className="col-md-3">
                                                                    <div className="col-md-1">
                                                                        <i className="icon-globe" style={{ fontSize: "25px", padding: "5px", marginBottom: "25px" }}> </i>
                                                                    </div>
                                                                    <div className="col-md-11">
                                                                        <label className="form-group control-label col-md-7 uppercase" style={{
                                                                            textAlign: "left",
                                                                            fontWeight: "bold",
                                                                            textDecoration: "underline"
                                                                        }}>{element.networkName}</label>
                                                                    </div>

                                                                </div>
                                                                <div className="col-md-9">
                                                                    <div className="col-md-12 pull-right" style={{ padding: "26px" }}>
                                                                        <ActionButton actionList={finalPerm} performAction={this.addnetwork} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12 form-body from-group">
                                                                    <div className="col-md-6">
                                                                        <div className="col-md-4">
                                                                            <label className="label-bold">{utils.getLabelByID("Type")}</label>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <input type="text" className="form-control ekycinp" name="name" disabled value={element.type} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="col-md-6">
                                                                        <div className="col-md-4">
                                                                            <label className="label-bold">{utils.getLabelByID("MSP ID / Constellation")}</label>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <input type="text" className="form-control ekycinp" name="name" disabled value={element.mspid} />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="col-md-12">
                                                                        <label className="form-group control-label col-md-7" style={{
                                                                            textAlign: "left",
                                                                            fontWeight: "bold",
                                                                            textDecoration: "underline"
                                                                        }}>{utils.getLabelByID("Peers")}</label>
                                                                        <div className="col-md-12">

                                                                            <Table
                                                                                pagination={false}
                                                                                export={false}
                                                                                search={false}
                                                                                gridType={"CipherNode"}
                                                                                gridColumns={utils.getGridColumnByName("peerListOrgWOA")}
                                                                                gridData={element.peerList || []}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <div className="col-md-12">
                                                                        <label className="form-group control-label col-md-7" style={{
                                                                            textAlign: "left",
                                                                            fontWeight: "bold",
                                                                            textDecoration: "underline"
                                                                        }}>{utils.getLabelByID("Users")}</label>
                                                                        <div className="col-md-12">

                                                                            <Table
                                                                                pagination={false}
                                                                                export={false}
                                                                                search={false}
                                                                                gridType={"CipherNode"}
                                                                                gridColumns={utils.getGridColumnByName("userListOrgWOA")}
                                                                                gridData={element.peerUser || []}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                    {/* </Portlet> */}
                                </div>
                                <div className="tab-pane" id="tab_1_3">
                                    <Portlet title={"Channels Detail"} isPermissioned={true}
                                        actions={this.state.chnlactions}>
                                        <Table
                                            pagination={false}
                                            export={false}
                                            search={false}
                                            gridColumns={utils.getGridColumnByName("ChannelListData")}
                                            componentFunction={""}
                                            gridData={channelList || []}
                                            totalRecords={0}
                                        />
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <div className="col-md-12">
                                                <div className="note note-warning" style={{ textAlign: "center" }}>
                                                    Edit consortium to associate more <strong>channels</strong>. <a href="javascript:" onClick={this.editconsortium}> (Edit)</a> </div>
                                            </div>
                                        </div>
                                    </Portlet>
                                </div>
                                {/* <div className="tab-pane" id="tab_1_4">
                                    <SmartContractComponent updateState={this.updateState} containerState={this.state}
                                        onCompile={this.compileSmartContract} />
                                </div> */}
                                <div className="tab-pane" id="tab_1_4">
                                    <Portlet title={"Smart Contracts"}
                                        isPermissioned={true}
                                        actions={this.state.scactions}
                                    >
                                        <Table
                                            pagination={false}
                                            export={false}
                                            search={false}
                                            gridColumns={utils.getGridColumnByName("SmartContractListData")}
                                            gridData={smartList}
                                            totalRecords={0}
                                        />
                                    </Portlet>
                                </div>
                                <div className="tab-pane" id="tab_1_6">
                                    <Portlet title={"Business Apps"}>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="col-md-12">
                                                    <div className="icheck-list">
                                                        {this.state.typeData.UseCase.map((sd, index) => (
                                                            <label key={index} className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                                                                <label>{sd.label}</label>
                                                                <input type="checkbox" className="form-control" disabled={true} checked={this.state.consortiumDetail.consortiumData.selectedUseCaseList.indexOf(sd.value) > -1 ? true : false} />
                                                                <span></span>
                                                            </label>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row" style={{ marginTop: "20px" }}>
                                            <div className="col-md-12">
                                                <div className="note note-warning" style={{ textAlign: "center" }}>
                                                    Edit consortium to add more builness <strong>use cases</strong>. <a href="javascript:" onClick={this.editconsortium}> (Edit)</a> </div>
                                            </div>
                                        </div>
                                    </Portlet>
                                </div>
                            </div>

                        </div>
                    </Portlet>
                </div >

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
    console.log(state.app.consortiumDetail)
    return {
        viewConsortium: state.app.viewConsortium.data,
        // consortiumDetail: state.app.consortiumDetail.data,
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