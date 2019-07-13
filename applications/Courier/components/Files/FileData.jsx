/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as actions from '../../../../core/actions/generalAction';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Wrapper from '../../common/Wrapper.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Input from '../../common/Input.jsx';
import Label from '../../common/Lable.jsx';
import Portlet from '../../common/Portlet.jsx';
import Combobox from '../../common/Select.jsx';
import Radio from '../../common/Radio.jsx';
import PortletDefault from '../../../../core/common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import DateControl from '../../../../core/common/DateControl.jsx';
import * as constants from '../../constants/appCommunication.js';
import * as coreConstants from '../../../../core/constants/Communication.js';
import * as gen from '../../common/generalActionHandler'
import TileUnit from '../../../../core/common/tileUnit.jsx';
import ModalBox from '../../../../core/common/ModalBox.jsx';
import ReactJson from 'react-json-view';
import * as requestCreator from '../../../../core/common/request.js';

class FileData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fileDetails: undefined,
            fileData: undefined,
            searchCriteria: {
                status: undefined,
                rulename: undefined
            },
            pageData: undefined,
            isOpen: false,
            modalData: undefined,
            modalRawData: undefined,
            typeData: undefined
        }
        this.generalActionHandler = gen.generalHandler.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
        this.ActionHandlers = this.ActionHandlers.bind(this);
        this.closePopUP = this.closePopUP.bind(this);
        this.generalHandler = gen.generalHandler.bind(this);
    }

    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'dc-status'
            ]));

        this.props.actions.generalProcess(constants.fileData, {
            "id": this.props.params.id,
            "page": {
                "pageSize": 10,
                "currentPageNo": 1
            }
        });
    }

    pageChanged(pageNo) {
        console.log("pageNo", pageNo)
        if (pageNo != undefined) {
            var request = "";
            if (this.state.searchFilters == undefined) {
                request = {
                    "id": this.props.params.id,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }
            else {
                var searchCriteria = this.state.searchCriteria
                request = {
                    searchCriteria,
                    "page": {
                        "currentPageNo": pageNo,
                        "pageSize": 10
                    }
                }
            }
            this.setState({ currentPageNo: pageNo });
            this.props.actions.generalProcess(constants.fileData, request);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fileData && nextProps.typeData) {
            let fileData = [...nextProps.fileData.data.searchResult.fileData]
            let under_process = 0
            let processed = 0
            let failed = 0

            fileData.forEach((element, index) => {

                let elmt = {}

                if(element.body) {
                    elmt = _.clone(element.body)
                }
                else {
                    elmt = _.clone(element)
                }

                if (Object.entries(elmt.filerow)[0]) {
                    let entry = Object.entries(elmt.filerow)[0]
                    fileData[index].column1 = entry[0] + " : " + entry[1]
                }
                else {
                    fileData[index].column1 = ""
                }

                if (Object.entries(elmt.filerow)[1]) {
                    let entry = Object.entries(elmt.filerow)[1]
                    fileData[index].column2 = entry[0] + " : " + entry[1]
                }
                else {
                    fileData[index].column2 = ""
                }

                if (Object.entries(elmt.filerow)[2]) {
                    let entry = Object.entries(elmt.filerow)[2]
                    fileData[index].column3 = entry[0] + " : " + entry[1]
                }
                else {
                    fileData[index].column3 = ""
                }

                if (fileData[index].status == 2 || fileData[index].status == 4) {
                    failed++
                }
                else if (fileData[index].status == 3) {
                    processed++
                }
                else if (fileData[index].status == 1 || fileData[index].status == 5) {
                    under_process++
                }

                fileData[index].status = this.getStatus(fileData[index].status)
            })

            this.setState({
                isLoading: false,
                fileDetails: nextProps.fileData.data.searchResult.fileDetails,
                fileDataUnchanged: [...nextProps.fileData.data.searchResult.fileData],
                fileData: fileData,
                pageData: nextProps.fileData.pageData,
                failed: failed,
                processed: processed,
                under_process: under_process,
                typeData: nextProps.typeData
            })
        }
    }

    getStatus(statusCode) {
        switch (statusCode) {
            case 1:
                return "Under Process"
            case 2:
                return "Failed"
            case 3:
                return "Processed"
            case 4:
                return "Failed"
            case 5:
                return "Under Process"
            default:
                return "N/A"
        }
    }

    getStatusCode(status) {
        switch (status) {
            case "Under Process":
                return [1, 5]
            case "Failed":
                return [2, 4]
            case "Processed":
                return [3]
            default:
                return undefined
        }
    }

    ActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "view":

                this.setState({
                    isOpen: true,
                    modalData: this.state.fileDataUnchanged[index].filerow,
                    modalRawData: this.state.fileDataUnchanged[index].row,
                    modalError: this.state.fileDataUnchanged[index].error
                })
                break;
                // case "ReQueue":
                //     if (index > -1) {
                //         let a = this.props.DispatchQueueData.data.searchResult;
                //         let id = a[index].internalid;
                //         let request = {
                //             eventID: id
                //         }
                //         this.setState({ isReQueued: true }, () => {
                //             this.props.actions.generalProcess(constants.updateEventDispatcherStatus, request);
                //         })

                //         //this.props.actions.generalProcess(constants.getEventDispatcherStatus, this.getRequest());
                //     }
                break;
            default:
                break;
        }
    }

    closePopUP() {
        this.setState({ isOpen: false })
    }

    search = () => {

        this.props.actions.generalProcess(constants.fileData, {
            "id": this.props.params.id,
            "searchCriteria": {
                status: this.getStatusCode(this.state.searchCriteria.status ? this.state.searchCriteria.status : undefined),
                rulename: this.state.searchCriteria.rulename ? this.state.searchCriteria.rulename : undefined
            },
            "page": {
                "pageSize": 10,
                "currentPageNo": 1
            }
        });

        this.setState({
            searchCriteria: {
                status: undefined,
                rulename: undefined
            },
        })
    }



    render() {
        if (!this.state.isLoading) {
            console.log("state->", this.state)
            return (
                <div>
                    <ModalBox isOpen={this.state.isOpen}>
                        <Portlet title={utils.getLabelByID("Row Data")} isPermissioned={true}>
                            <Row>
                                <Label text="Before Transformation" />
                            </Row>
                            <Row>
                                <pre style={{ textAlign: "left" }}> <ReactJson src={this.state.modalRawData} /></pre>
                            </Row>
                            <Row>
                                <Label text="After Transformation" style={{ textAlign: "left" }} />
                            </Row>
                            <Row>
                                <pre style={{ textAlign: "left" }}> <ReactJson src={this.state.modalData} /></pre>
                            </Row>
                            <Row>
                                <Label text="Error" style={{ textAlign: "left" }} />
                            </Row>
                            <Row>
                                <pre style={{ textAlign: "left" }}> <p>{this.state.modalError}</p></pre>
                            </Row>
                            <Row>
                                <div className="form-actions right">
                                    <div className="form-group col-md-12">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn btn-default" onClick={this.closePopUP} >{utils.getLabelByID("Close")}</button>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </Portlet>
                    </ModalBox>
                    <Wrapper title="File Details" identity={this.state.fileDetails[0].name}>
                        <div className="row">
                            <TileUnit data={[{ "id": 1, "title": "Total", "value": this.state.fileData.length, "actionURI": "", "overDue": "", "fontClass": "green-steel", "percentageTag": false }, { "id": 2, "title": "Under Process", "value": this.state.under_process, "actionURI": "", "overDue": "", "fontClass": "green-turquoise", "percentageTag": false }, { "id": 3, "title": "Failed", "value": this.state.failed, "actionURI": "", "overDue": "", "fontClass": "green-meadow", "percentageTag": false }, { "id": 4, "title": "Processed", "value": this.state.processed, "actionURI": "", "overDue": "", "fontClass": "green-meadow", "percentageTag": false },]} />
                        </div>
                        <Portlet title="Data">
                            <Row>
                                <Col col="6">
                                    <Label text="Status:" columns='3' />
                                    <Combobox fieldname='status' formname='searchCriteria' columns='8' style={{}}
                                        state={this.state} typeName="dc-status"
                                        dataSource={this.state.typeData} multiple={false} actionHandler={this.generalHandler} />
                                </Col>
                                <Col col="6">
                                    <Label text="Rule Name:" columns='3' />
                                    <Input fieldname='rulename' formname='searchCriteria' columns='8' style={{}}
                                        state={this.state} actionHandler={this.generalActionHandler} />
                                </Col>
                            </Row>
                            <Row>
                                <Col col="6"></Col>
                                <Col col="6">
                                    <div className="form-group col-md-11">
                                        <div className="btn-toolbar pull-right">
                                            <button type="button" className="btn default" onClick={this.search}>{'Search'}</button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Table
                                    search={true}
                                    pagination={true}
                                    gridColumns={utils.getGridColumnByName("fileData")}
                                    gridData={this.state.fileData}
                                    componentFunction={this.ActionHandlers}
                                    pageSize={10}
                                    totalRecords={this.state.pageData.totalRecords}
                                    pageChanged={this.pageChanged}
                                    activePage={this.state.pageData.currentPageNo}
                                />
                            </Row>
                        </Portlet>
                    </Wrapper>
                </div>
            )
        } else {
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        fileData: _.get(state.app, 'getFileData', undefined),
        typeData: _.get(state.app.typeData, 'data', undefined)
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
FileData.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(FileData);