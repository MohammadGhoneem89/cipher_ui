/*standard imports*/
import React, {PropTypes} from 'react';
import * as actions from '../../actions/generalAction';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Portlet from '../../common/Portlet.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Input from '../../common/Input.jsx';
import Label from '../../common/Lable.jsx';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../common/utils.js';
import DateControl from '../../common/DateControl.jsx';
import * as constants from '../../constants/Communication.js';
import * as gen from '../../common/generalActionHandler'
import Document from '../../common/Document.jsx'

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fileList: undefined,
      searchCriteria: {},
      pageData: undefined,
      documents: [],
    };
    this.generalActionHandler = gen.generalHandler.bind(this);
    this.pageChanged = this.pageChanged.bind(this);
    this.fromDate = this.fromDate.bind(this);
    this.toDate = this.toDate.bind(this);
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
    console.log("pageNo", pageNo);
    if (pageNo !== undefined) {
      var request = "";
      if (this.state.searchCriteria === undefined) {
        request = {
          "page": {
            "currentPageNo": pageNo,
            "pageSize": 10
          }
        }
      } else {
        var searchCriteria = _.clone(this.state.searchCriteria);
        request = {
          searchCriteria,
          "page": {
            "currentPageNo": pageNo,
            "pageSize": 10
          }
        }
      }
      this.setState({currentPageNo: pageNo});
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

  ActionHandlers({actionName, index}) {
    switch (actionName) {
      case "Delete":
        let result = confirm("Are you you want to delete?");
        if (result) {
          if (index > -1) {
            let a = this.state.relationshipData;
            a.splice(index, 1);
            this.setState({relationshipData: a});
          }
        }
        break;
      default:
        break;
    }
  }

  search = () => {
    let searchCriteria = _.clone(this.state.searchCriteria);
    this.props.actions.generalProcess(constants.fileList, {
      searchCriteria,
      "page": {
        "pageSize": 10,
        "currentPageNo": 1
      }
    });
  };

  getParentState = () => {
    return this.state
  };

  updateState = (data) => {
    this.setState(data);
  };

  fromDate(date) {
    let searchCriteria = _.clone(this.state.searchCriteria);
    searchCriteria.fromDate = date;
    this.setState({
      searchCriteria
    })
  }

  toDate(date) {
    let searchCriteria = _.clone(this.state.searchCriteria);
    searchCriteria.toDate = date;
    this.setState({
      searchCriteria
    })
  }

  render() {
    if (!this.state.isLoading) {
      console.log("state->", this.state);
      return (
        <div>
          <Portlet title="Data Import Filter">
            <Row>
              <Col col="6">
                <Label text="From Date:" columns='3'/>
                <Col col="9">
                  <DateControl id="fromECD" dateChange={this.fromDate}/>
                </Col>
              </Col>
              <Col col="6">
                <Label text="To Date:" columns='3'/>
                <Col col="9">
                  <DateControl id="toECD" dateChange={this.toDate}/>
                </Col>
              </Col>
            </Row>
            <br/>
            <Row>
              <Col col="6">
                <Label text="Name:" columns='3'/>
                <Input fieldname='filename' formname='searchCriteria' columns='9' style={{}}
                       state={this.state} actionHandler={this.generalActionHandler}/>
              </Col>
            </Row>
            <Row>
              <Col col="6"/>
              <Col col="6">
                <div className="form-group col-md-12">
                  <div className="btn-toolbar pull-right">
                    <button type="button" className="btn green"
                            onClick={this.search}>{'Search'}</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Portlet>
          <Portlet title="Data Import List">
            <Row>
              <Col>
                <Table
                  search={true}
                  pagination={true}
                  gridColumns={utils.getGridColumnByName("fileList")}
                  gridData={_.get(this.state, 'fileList', [])}
                  // componentFunction={this.ActionHandlers}
                  pageSize={10}
                  totalRecords={this.state.pageData.totalRecords}
                  pageChanged={this.pageChanged}
                  activePage={this.state.pageData.currentPageNo}
                />
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col>
                <h3><Label text="Upload Files" style={{textAlign: "left"}}/></h3>
              </Col>
            </Row>
            <Row>
              <Col>
                <Document initState={this.state} updateState={this.updateState}
                          getParentState={this.getParentState} allowedFileType=".xml , .csv , .xls"
                          acceptedFiles="Files to be uploaded with extention *.xml, *.xls or *.csv"/>
              </Col>
            </Row>
          </Portlet>
        </div>
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

  return {actions: bindActionCreators(actions, dispatch)}

}

FileList.displayName = "Data Import";
export default connect(mapStateToProps, mapDispatchToProps)(FileList);
