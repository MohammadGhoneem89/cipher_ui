/*standard imports*/
import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Link, browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Portlet from '../../../../core/common/Portlet.jsx';
import UpdateBlockForm from './UpdateBlockForm.jsx';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as constants from '../../../../core/constants/Communication.js';


class UpdateBlockContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blockchainAccountList: undefined,
      pageData: {
        currentPageNo: 1,
        pageSize: 10
      },
      timerID: undefined,
      isLoading: true
    };//
    this.formSubmit = this.formSubmit.bind(this);


  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.blockchainAccountList) {

      this.setState({
        blockchainAccountList: nextProps.blockchainAccountList,
        pageData: nextProps.pageData,
        isLoading: false
      });

    }
  }


  componentDidMount() {
    window.scrollTo(0, 0);
    this.getScreenData();
    let _this = this;
    let timerID = setInterval(() => {
      _this.getScreenData();
    }, 5000);
    this.setState({timerID});
  }

  componentWillUnmount() {
    clearInterval(this.state.timerID);
  }

  pageChanged(pageNo) {
    let pageData  = this.state.pageData;
    pageData.currentPageNo = pageNo;
    this.setState({pageData});
  }

  getScreenData(data) {
    let request = data ? data : {
      pageData: this.state.pageData
    };

    this.props.actions.generalProcess(constants.getBlockchainAccountList, request);
  }

  formSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});
    console.log(data);

    let request = {
      action: "UpdateBlockchainAccountList",
      data
    };
    this.props.actions.reduxFormProcess(constants.updateBlockchainAccountList, request)
      .then(result=>{
       e.target.reset();
      });
  }

  clearFields() {
    $('.clear').find('input:text').val('');
    $('.clear').find('select').each(function () {
      $(this)[0].selectedIndex = 0;
    });
  }


  render() {

    //alert(this.state.isActive)
    if (!this.state.isLoading) {
      return (
        <div>
          <div className="row">
            <div className="col-md-12 ">
              <Portlet title={utils.getLabelByID("SampleBlockchain_AccountInfoInsert")}>
                <UpdateBlockForm submit={this.formSubmit}/>
              </Portlet>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12 ">
              <Portlet title={utils.getLabelByID("SampleBlockchain_AccountList")}>
                <Table
                  pagination={true}
                  export={true}
                  search={false}
                  gridType={"SampleBlockchain_AccountList"}
                  gridColumns={utils.getGridColumnByName("SampleBlockchain_AccountList")}
                  gridData={this.state.blockchainAccountList}
                  totalRecords={this.state.pageData.totalRecords}
                  pageChanged={this.pageChanged}
                  activePage={this.state.pageData.currentPageNo}
                  pageSize={this.state.pageData.pageSize}
                />
              </Portlet>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    blockchainAccountList: state.app.blockchainAccountList.data || [],
    pageData: state.app.blockchainAccountList.pageData
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

UpdateBlockContainer.displayName = "UpdateAccountsContainer";
export default connect(mapStateToProps, mapDispatchToProps)(UpdateBlockContainer);
