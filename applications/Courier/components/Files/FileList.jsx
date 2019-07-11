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
import * as gen from '../../common/generalActionHandler'

class FileList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            fileList: undefined,
            searchCriteria: undefined,
            pageData: undefined
        }
        this.generalActionHandler = gen.generalHandler.bind(this);
        this.pageChanged = this.pageChanged.bind(this);
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.fileList, {
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
            this.props.actions.generalProcess(constants.fileList, request);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.fileList) {
            this.setState({
                isLoading: false,
                fileList: nextProps.fileList.data.searchResult.fileList,
                pageData: nextProps.fileList.pageData
            })
        }
    }

    ActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Delete":
                let result = confirm("Are you you want to delete?");
                if (result) {
                    if (index > -1) {
                        let a = this.state.relationshipData;
                        a.splice(index, 1);
                        this.setState({ relationshipData: a });
                    }
                }
                break;
            default:
                break;
        }
    }

    search = () => {
        this.props.actions.generalProcess(constants.fileList, {
            "searchCriteria": {
                filename: this.state.searchCriteria.filename
            },
            "page": {
                "pageSize": 10,
                "currentPageNo": 1
            }
        });
    }

    addStream = () => {
        this.props.history.push('/etisalat/addStream')
    }

    render() {
        if (!this.state.isLoading) {
            console.log("state->", this.state)
            return (
                <Wrapper title="Files">
                    <Row>
                        <Col col="6">
                            <Label text="File Name:" columns='3' />
                            <Input fieldname='filename' formname='searchCriteria' columns='8' style={{}}
                                state={this.state} actionHandler={this.generalActionHandler} />
                        </Col>
                        <Col col="6">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-left">
                                    <button type="button" className="btn default" onClick={this.search}>{'Search'}</button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <br />
                    <br />
                    <Row>
                        <Table
                            search={true}
                            pagination={true}
                            gridColumns={utils.getGridColumnByName("fileList")}
                            gridData={this.state.fileList}
                            // componentFunction={this.ActionHandlers}
                            pageSize={10}
                            totalRecords={this.state.pageData.totalRecords}
                            pageChanged={this.pageChanged}
                            activePage={this.state.pageData.currentPageNo}
                        />
                    </Row>
                </Wrapper>
            )
        } else {
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
        }
    }
}


function mapStateToProps(state, ownProps) {
    return {
        isLoading: true,
        fileList: _.get(state.app, 'getFileList', undefined)
    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
FileList.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(FileList);