import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import MongoDBChangesForm from './mongoDBChangesForm.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';
import ReactJson from 'react-json-view';

class newDocumentsModalLayout extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

class updatedDocumentsModalLayout extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}

class MongoDBChangesContainer extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            isMigrating: false,
            schemaProfiles: [],
            mongodbSchemaChanges: {
                data: []
            },
            loadingSchemaChanges: false,
            schemaChangesList: [],
            filterCriteria: undefined,
            groupList: undefined,
            isLoading: false,
            pageNo: 1,
            actions: [{
                "value": "1002",
                "type": "pageAction",
                "label": "ADD",
                "labelName": "COM_AB_Add",
                "actionType": "PORTLET_LINK",
                "iconName": "fa fa-plus",
                "URI": "/groupSetup",
                "children": []
            }]
        };
        this.ActionHandlers = this.ActionHandlers.bind(this);
        this.submit = this.submit.bind(this);
        this.showSingleSchemaChange = this.showSingleSchemaChange.bind(this);
        this.closeNewDocumentsModal = this.closeNewDocumentsModal.bind(this);
        this.closeUpdatedDocumentsModal = this.closeUpdatedDocumentsModal.bind(this);
        this.closeMigrationAlertModal = this.closeMigrationAlertModal.bind(this);
        this.updateState = this.updateState.bind(this);
        this.loadPrevious_NewDocuments = this.loadPrevious_NewDocuments.bind(this);
        this.loadNext_NewDocuments = this.loadNext_NewDocuments.bind(this);
        this.loadPrevious_UpdatedDocuments = this.loadPrevious_UpdatedDocuments.bind(this);
        this.loadNext_UpdatedDocuments = this.loadNext_UpdatedDocuments.bind(this);

    }

    updateState(data) {
        console.log(data)
        //this.setState(data);
    }

    setCurrentCollectionName(index) {
        if (this.state.mongodbSchemaChanges[index].type == "new") {
            this.setState({
                currentModelName: this.state.mongodbSchemaChanges[index].modelName,
            })
        } else {
            if (this.state.mongodbSchemaChanges[index].new_documents.count > 0) {
                this.setState({
                    currentNewDocIndex: this.state.mongodbSchemaChanges[index].new_documents.data[0],
                })
            }
            if (this.state.mongodbSchemaChanges[index].updated_documents.count > 0) {
                this.setState({
                    currentUpdatedDocIndex: this.state.mongodbSchemaChanges[index].updated_documents.data[0],
                })
            }
        }
    }

    ActionHandlers({ actionName, index }) {

        this.setCurrentCollectionName(index);
        switch (actionName) {
            case "view New Documents":
                this.loadDefaultDocument(index, "new");
                break;
            case "view Updated Documents":
                this.loadDefaultDocument(index, "updated");
                break;
            case "migrateCollection":
                this.setState({ isOpenMigrationAlert: true, currentModelIndex: index })
                break;
            default:
                break;
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.profiles) {
            console.log(nextProps.profiles)

            let profiles = nextProps.profiles.map((profile) => {
                let prof = {}
                prof.label = profile.name;
                prof.value = profile._id;
                return prof;
            })

            this.setState({
                schemaProfiles: profiles,
                isLoading: nextProps.isLoading
            });

        }
        if (nextProps.mongodbSchemaChanges) {
            nextProps.mongodbSchemaChanges.data.forEach((elem, index) => {
                if (elem.type == "new") {
                    elem.actions = [
                        { "label": "migrateCollection", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" }
                    ]
                } else {
                    elem.actions = [
                        { "label": "view New Documents", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" },
                        { "label": "view Updated Documents", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" }
                    ]
                }

            })
            this.setState({
                mongodbSchemaChanges: nextProps.mongodbSchemaChanges.data,
                isLoading: nextProps.isLoading,
                loadingSchemaChanges: false,
                source: nextProps.mongodbSchemaChanges.source,
                destination: nextProps.mongodbSchemaChanges.destination,
                profile: nextProps.mongodbSchemaChanges.profile
            });

        }
        if (nextProps.upsertMongodbChange) {
            let array = [...this.state.mongodbSchemaChanges];
            array.splice(this.state.currentModelIndex, 1);
            this.setState({
                isMigrating: false,
                mongodbSchemaChanges: array
            })

            console.log(this.state.mongodbSchemaChanges);
            // remove that object from schema changes
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.mongodbSchemaProfiles);
    }

    loadURL(url) {
        browserHistory.push(url);
    }

    submit(data) {
        this.setState({
            loadingSchemaChanges: true
        });
        this.props.actions.generalProcess(constants.getMongoDBChanges, requestCreator.createGetMongodbSchemaChanges({
            data
        }));
    }

    closeNewDocumentsModal() {
        this.setState({ isOpenNewDocumentsModal: false })
    }
    closeUpdatedDocumentsModal() {
        this.setState({ isOpenUpdatedDocumentsModal: false })
    }
    closeMigrationAlertModal() {
        this.setState({ isOpenMigrationAlert: false })
    }

    loadDefaultDocument(index, type) {

        if (type == "new") {
            this.setState({
                currentNewDocIndex: 0,
                currentNewDoc: this.state.mongodbSchemaChanges[index].new_documents.data[0],
                isOpenNewDocumentsModal: true,
                currentModelIndex: index
            })
        } else {
            this.setState({
                currentUpdatedDocIndex: 0,
                currentUpdatedDoc: this.state.mongodbSchemaChanges[index].updated_documents.data[0],
                isOpenUpdatedDocumentsModal: true,
                currentModelIndex: index
            })
        }

    }

    loadPrevious_NewDocuments() {
        //this.setState({ isOpenMigrationAlert: false })
        console.log(this.state.currentNewDocIndex)
        let current = this.state.currentNewDocIndex,
            newDocArrSize = this.state.mongodbSchemaChanges[this.state.currentModelIndex].new_documents.data.length;

        if (current === 0) {
            let index = newDocArrSize - 1,
                new_document = this.state.mongodbSchemaChanges[this.state.currentModelIndex].new_documents.data[index];
            this.setState({
                currentNewDocIndex: index,
                currentNewDoc: new_document
            })
        } else {
            let index = current - 1,
                new_document = this.state.mongodbSchemaChanges[this.state.currentModelIndex].new_documents.data[index];
            this.setState({
                currentNewDocIndex: index,
                currentNewDoc: new_document
            })
        }
    }

    loadNext_NewDocuments() {
        //this.setState({ isOpenMigrationAlert: false })
        console.log(this.state.currentNewDocIndex)

        let current = this.state.currentNewDocIndex + 1,
            newDocArrSize = this.state.mongodbSchemaChanges[this.state.currentModelIndex].new_documents.data.length,
            next = current % newDocArrSize,
            new_document = this.state.mongodbSchemaChanges[this.state.currentModelIndex].new_documents.data[next];

        this.setState({
            currentNewDocIndex: next,
            currentNewDoc: new_document
        })
    }

    loadPrevious_UpdatedDocuments() {
        //this.setState({ isOpenMigrationAlert: false })
        console.log(this.state.currentUpdatedDocIndex)
        let current = this.state.currentUpdatedDocIndex,
            newDocArrSize = this.state.mongodbSchemaChanges[this.state.currentModelIndex].updated_documents.data.length;

        if (current === 0) {
            let index = newDocArrSize - 1,
                document = this.state.mongodbSchemaChanges[this.state.currentModelIndex].updated_documents.data[index];
            this.setState({
                currentUpdatedDocIndex: index,
                currentUpdatedDoc: document
            })
        } else {
            let index = current - 1,
                document = this.state.mongodbSchemaChanges[this.state.currentModelIndex].updated_documents.data[index];
            this.setState({
                currentUpdatedDoc: index,
                currentUpdatedDoc: document
            })
        }
    }

    loadNext_UpdatedDocuments() {
        //this.setState({ isOpenMigrationAlert: false })
        console.log(this.state.currentUpdatedDocIndex)
        let current = this.state.currentUpdatedDocIndex + 1,
            newDocArrSize = this.state.mongodbSchemaChanges[this.state.currentModelIndex].updated_documents.data.length,
            next = current % newDocArrSize,
            document = this.state.mongodbSchemaChanges[this.state.currentModelIndex].updated_documents.data[next];

        this.setState({
            currentUpdatedDocIndex: next,
            currentUpdatedDoc: document
        })
    }

    migrateDBChange(type) {

        if (type == "new") {
            let data = {
                "source_url": this.state.source,
                "destination_url": this.state.destination,
                "modelName": this.state.currentModelName,
                "type": "new",
                "document": {}
            }
            // this.setState({
            //     isMigrating: true
            // });
            this.props.actions.generalProcess(constants.applyMongoDBChanges, requestCreator.applyMongodbSchemaChanges({
                data
            }));
        } else {
            console.log("upsert")
        }

    }

    showSingleSchemaChange(modelName, documentType, index) {
        // documentType: new/update

        let modelData = this.state.mongodbSchemaChanges.filter(function (element) {
            return element.modelName == modelName;
        });

        if (documentType == "new") {
            this.setState({
                currentModelName: modelName,
                documentData: modelData[0].new_documents.data[index],
                documentType: "new"
            })
        } else if (documentType == "updated") {
            this.setState({
                currentModelName: modelName,
                prevDocumentData: modelData[0].updated_documents.data[index].source,
                documentData: modelData[0].updated_documents.data[index].destination,
                documentType: "updated"
            })
        }

    }

    render() {
        console.log(this.state.mongodbSchemaChanges)
        if (!this.state.isLoading)
            return (
                <div>
                    <Portlet title={"Mongo-DB Utility"}>
                        <MongoDBChangesForm
                            onSubmit={this.submit}
                            schemaProfiles={this.state.schemaProfiles}
                            updateState={this.updateState} />
                        <Portlet title={"Identified Changes"} isPermissioned={true}>
                            {this.state.loadingSchemaChanges ? <div className="loader" > Loading...</div> : <Table
                                pagination={false}
                                export={true}
                                search={false}
                                gridColumns={utils.getGridColumnByName("mongoDBChangesGrid")}
                                gridData={this.state.mongodbSchemaChanges}
                                componentFunction={this.ActionHandlers}
                            />}
                        </Portlet>
                    </Portlet>
                    <ModalBox isOpen={this.state.isOpenMigrationAlert}>
                        <Portlet title={"Missing Collection Alert"} isPermissioned={true}>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <h3 className="modal-title">{"Do you want to migrate new collection from source to destination?"}</h3>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <label className="control-label">{"Collection Name: "}{this.state.currentModelName}</label>
                                    </div>
                                </div>
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default dark" onClick={this.migrateDBChange.bind(this, "new")} >{"Migrate"}</button>
                                            <button type="button" className="btn btn-default" onClick={this.closeMigrationAlertModal} disabled={this.state.isMigrating}>{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Portlet>
                    </ModalBox>
                    <ModalBox isOpen={this.state.isOpenNewDocumentsModal}>
                        <Portlet title={"Collection Difference alert"} isPermissioned={true}>
                            <div className="row" >
                                <div className="form-actions right">
                                    <div className="form-group col-md-6">
                                        <div className="btn-toolbar pull-left">
                                            <button type="button" className="btn btn-default" onClick={this.loadPrevious_NewDocuments} >{"Prev"}</button>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.loadNext_NewDocuments} >{"Next"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="form-group col-md-12">
                                    <h3 className="modal-title">{"Do you want to migrate "}{this.state.documentType} {" document?"}</h3>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="form-group col-md-3">
                                    <label className="control-label bold">{"Model Name:"}</label>
                                </div>
                                <div className="form-group col-md-9">
                                    <label className="control-label">{this.state.currentModelName}</label>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <pre> <ReactJson src={this.state.currentNewDoc} /></pre>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.closeNewDocumentsModal} disabled={this.state.isMigrating}>{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Portlet>
                    </ModalBox>
                    <ModalBox isOpen={this.state.isOpenUpdatedDocumentsModal}>
                        <Portlet title={"Collection Difference alert"} isPermissioned={true}>
                            <div className="row" >
                                <div className="form-actions right">
                                    <div className="form-group col-md-6">
                                        <div className="btn-toolbar pull-left">
                                            <button type="button" className="btn btn-default" onClick={this.loadPrevious_UpdatedDocuments} >{"Prev"}</button>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.loadNext_UpdatedDocuments} >{"Next"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="form-group col-md-12">
                                    <h3 className="modal-title">{"Do you want to migrate "}{this.state.documentType} {" document?"}</h3>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="form-group col-md-3">
                                    <label className="control-label bold">{"Model Name:"}</label>
                                </div>
                                <div className="form-group col-md-9">
                                    <label className="control-label">{this.state.currentModelName}</label>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <pre> <ReactJson src={this.state.currentUpdatedDoc} /></pre>
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.closeUpdatedDocumentsModal} disabled={this.state.isMigrating}>{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Portlet>
                    </ModalBox>
                </div >
            );
        else
            return (<div className="loader" > Loading...</div>)
    }
}

function mapStateToProps(state, ownProps) {

    return {
        profiles: _.get(state.app, "getMongodbSchemaProfiles.data", null),
        mongodbSchemaChanges: _.get(state.app, "mongodbSchemaChanges", null),
        isLoading: false
    }

}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

MongoDBChangesContainer.displayName = "MongoDBChangesContainer";

export default connect(mapStateToProps, mapDispatchToProps)(MongoDBChangesContainer)