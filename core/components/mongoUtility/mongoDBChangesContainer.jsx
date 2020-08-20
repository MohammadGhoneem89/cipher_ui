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
import * as toaster from '../../common/toaster.js';

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
                currentModelCount: this.state.mongodbSchemaChanges[index].count,
            })
        } else {
            if (this.state.mongodbSchemaChanges[index].new_documents.count > 0) {
                this.setState({
                    currentModelName: this.state.mongodbSchemaChanges[index].modelName,
                    currentNewDocIndex: this.state.mongodbSchemaChanges[index].new_documents.data[0],
                })
            }
            if (this.state.mongodbSchemaChanges[index].updated_documents.count > 0) {
                this.setState({
                    currentModelName: this.state.mongodbSchemaChanges[index].modelName,
                    currentUpdatedDocIndex: this.state.mongodbSchemaChanges[index].updated_documents.data[0],
                })
            }
        }
    }

    ActionHandlers({ actionName, index }) {

        this.setCurrentCollectionName(index);
        switch (actionName) {
            case "View New Documents":
                this.loadDefaultDocument(index, "new");
                break;
            case "View Updated Documents":
                this.loadDefaultDocument(index, "updated");
                break;
            case "Migrate Collection":
                this.setState({ isOpenMigrationAlert: true, currentModelIndex: index })
                break;
            default:
                break;
        }
    }

    componentWillUnmount() {
        console.log("backListener")
        super.componentWillUnmount();
        this.backListener();
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
                        { "label": "Migrate Collection", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" }
                    ]
                } else {
                    elem.actions = [
                        { "label": "View New Documents", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" },
                        { "label": "View Updated Documents", "iconName": "fa fa-pen", "actionType": "COMPONENT_FUNCTION" }
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
        this.backListener = browserHistory.listen(location => {
            console.log(location.action)
            if (location.action === "POP") {
                browserHistory.push('/mongoUtility');
                this.state.mongodbSchemaChanges = {}
            }
        });
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.mongodbSchemaProfiles);
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
                currentModelName: this.state.mongodbSchemaChanges[index].modelName,
                currentNewDocIndex: 0,
                currentNewDoc: this.state.mongodbSchemaChanges[index].new_documents.data[0],
                isOpenNewDocumentsModal: true,
                currentModelIndex: index
            })
        } else {

            let document = this.state.mongodbSchemaChanges[index].updated_documents.data[0];
            this.setState({
                currentModelName: this.state.mongodbSchemaChanges[index].modelName,
                currentUpdatedDocIndex: 0,
                currentUpdatedDoc: document,
                destinationUpdatedDoc: Object.assign({}, document.destination),
                sourceUpdatedDoc: Object.assign({}, document.source),
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
                currentUpdatedDocIndex: index,
                currentUpdatedDoc: document,
                destinationUpdatedDoc: Object.assign({}, document.destination),
                sourceUpdatedDoc: Object.assign({}, document.source)
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
            currentUpdatedDoc: document,
            destinationUpdatedDoc: Object.assign({}, document.destination),
            sourceUpdatedDoc: Object.assign({}, document.source)

        })
    }

    migrateDBChange(type) {

        if (type == "newCollection") {
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
        } else if (type == "newDocument") {

            let data = {
                "source_url": this.state.source,
                "destination_url": this.state.destination,
                "modelName": this.state.currentModelName,
                "type": "updated",
                "document": this.state.currentNewDoc
            }
            // this.setState({
            //     isMigrating: true
            // });
            this.props.actions.generalProcess(constants.applyMongoDBChanges, requestCreator.applyMongodbSchemaChanges({
                data
            }));
        } else if (type == "updatedDocument") {
            let data = {
                "source_url": this.state.source,
                "destination_url": this.state.destination,
                "modelName": this.state.currentModelName,
                "type": "updated",
                "document": this.state.currentUpdatedDoc.source
            }
            // this.setState({
            //     isMigrating: true
            // });
            this.props.actions.generalProcess(constants.applyMongoDBChanges, requestCreator.applyMongodbSchemaChanges({
                data
            }));
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
    diffUsingJS(viewType) {
        try {
            document.getElementById("documentsdiffoutput").innerHTML = ""
        }
        catch (val) {

        }
        "use strict";
        var byId = function (id) { return document.getElementById(id); },
            base = difflib.stringAsLines(byId("baseText") == undefined ? "" : byId("baseText").value),
            newtxt = difflib.stringAsLines(byId("newText") == undefined ? "" : byId("newText").value),
            sm = new difflib.SequenceMatcher(base, newtxt),
            opcodes = sm.get_opcodes(),
            diffoutputdiv = byId("documentsdiffoutput"),
            contextSize = byId("contextSize") == undefined ? "" : byId("contextSize").value;

        diffoutputdiv.innerHTML = "";
        contextSize = contextSize || null;

        diffoutputdiv.appendChild(diffview.buildView({
            baseTextLines: base,
            newTextLines: newtxt,
            opcodes: opcodes,
            baseTextName: "Previous JSON",
            newTextName: "Current JSON",
            contextSize: contextSize,
            viewType: viewType
        }));

    }
    convertJSONToString(value) {

        let document = value, key = '_id'
        for (key in document) {
            if (document.hasOwnProperty(key) && key == "_id") {

                delete document[key];
            }
        }

        if (document) {
            return JSON.stringify(document, null, 4);
        }
        else {
            return '';
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
                                export={false}
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
                                        <h3 className="modal-title">{"Do you want to migrate following collection from source to destination?"}</h3>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="form-group col-md-12">
                                        <label className="control-label">{"Collection Name: "}{this.state.currentModelName}</label><br />
                                        <label className="control-label">{"Documents Count: "}{this.state.currentModelCount}</label>
                                    </div>
                                </div>
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default dark" onClick={this.migrateDBChange.bind(this, "newCollection")} >{"Migrate"}</button>
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
                                    <div className="form-group col-md-3">
                                        <div className="btn-toolbar pull-left">
                                            <button type="button" className="btn btn-default" onClick={this.loadPrevious_NewDocuments} disabled={!this.loadPrevious_NewDocuments}>{"Prev"}</button>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="btn-toolbar text-center">
                                            1/1
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.loadNext_NewDocuments} disabled={!this.loadNext_NewDocuments}>{"Next"}</button>
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
                                            <button type="button" className="btn btn-default dark" onClick={this.migrateDBChange.bind(this, "newDocument")} >{"Migrate"}</button>
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
                                    <div className="form-group col-md-3">
                                        <div className="btn-toolbar pull-left">
                                            <button type="button" className="btn btn-default" onClick={this.loadPrevious_UpdatedDocuments} disabled={!this.loadPrevious_UpdatedDocuments}>{"Prev"}</button>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <div className="btn-toolbar text-center">
                                            1/2
                                        </div>
                                    </div>
                                    <div className="form-group col-md-3">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.loadNext_UpdatedDocuments} disabled={!this.loadNext_UpdatedDocuments}>{"Next"}</button>
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
                                <div className="col-md-12">
                                    <label className="control-label bold">{"Model Name: "}{this.state.currentModelName}</label>
                                </div>
                                <div className="form-group col-md-12 pull-left">
                                    <label className="control-label bold">Documents' difference: </label> <button type="submit" className="btn green" onClick={this.diffUsingJS.bind(this, 0)}>{"View Comparison"} </button>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="col-md-12">
                                    <textarea id="newText" style={{ display: "none" }} value={this.convertJSONToString(this.state.sourceUpdatedDoc)} />
                                    <textarea id="baseText" style={{ display: "none" }} value={this.convertJSONToString(this.state.destinationUpdatedDoc)} />
                                    <div id="documentsdiffoutput">
                                    </div>
                                </div>
                            </div>
                            <div className="row" >
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default dark" onClick={this.migrateDBChange.bind(this, "updatedDocument")} >{"Migrate"}</button>
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