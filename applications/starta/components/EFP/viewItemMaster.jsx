/*standard imports*/
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form'
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import { baseUrl } from '../../../../core/constants/Communication.js';
import QRCodeJquery from '../../../../core/common/QRCodeJquery.jsx';
import ActionButton from '../../../../core/common/ActionButtonNew.jsx';
import * as requestCreator from '../../../../core/common/request.js';
import * as utils from '../../../../core/common/utils.js';
import Portlet from '../../../../core/common/Portlet.jsx';

class ViewItemMaster extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      getItemMasterView: undefined,
      page: {
        pageSize: 10,
        currentPageNo: 1
      },
      isLoading: false,
      typeData: undefined
    };
  }
  componentWillUnmount() {
  //  clearInterval(this.timerID);
  }
  getRequest = () => {
    console.log(this.props.params.id, "this.props.params.idcccccccccc")
    let searchCriteria = {};
    let item = this.props.params.id;
    if (item !== "") {
      searchCriteria.item = item;
    }
    let request = {

      "bypassSimu": true,
      "body": {
        "page": {
          "currentPageNo": 1,
          "pageSize": 10
        },
        "searchCriteria": {
          "itemID": item
        }
      }

    };
   // this.props.actions.generalProcess(constants.getItemMasterView, request);
  }
  componentDidMount() {

    // this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['itemCategory']));
    // this.props.actions.generalProcess(constants.getItemMasterView, this.getRequest());
    //this.timerID = setInterval(() => this.getRequest(), 2000);
    //window.scrollTo(0, 0);

  }

  componentWillReceiveProps(nextProps) {
    // if (nextProps.getItemMasterView && nextProps.typeData) {
    //   this.setState({
    //     getItemMasterView: nextProps.getItemMasterView,
    //     typeData: nextProps.typeData,
    //     isLoading: false
    //   });
    // }
  }
  render() {

    if (this.state.isLoading) {
      return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
    }
    // if (this.props.getItemMasterView[0]) {
      return (

        <div>
          <div className="portlet light bordered">
            <div className="portlet-body">
              <div className="row">
                <div className="portlet-body form" style={{ paddingLeft: "20px" }}>
                  <form className="form-horizontal" role="form">
                    <div className="form-body" style={{ paddingLeft: "18px" }}>
                      <div className="col-md-8">
                        <div className="row">
                          <label className="control-label" style={{ fontWeight: "bold" }} >
                            {/* {utils.getLabelByID("ITEM ID # " + this.props.getItemMasterView[0].itemID)} */}
                          </label>

                        </div>
                        <br />
                        <div className="row">
                          <div className="form-group col-md-3">
                            <label className="control-label" style={{ fontWeight: "bold" }}>
                              {utils.getLabelByID("Supplier Item ID : ")}
                            </label>
                          </div>
                          <div className="form-group col-md-8">
                            <label className="control-label" >
                              {/* {this.props.getItemMasterView[0].supplierItemID} */}
                            </label>
                          </div>


                        </div>
                        <div className="row">

                          <div className="form-group col-md-3">
                            <label className="control-label" style={{ fontWeight: "bold" }}>
                              {utils.getLabelByID("Size : ")}
                            </label>
                          </div>
                          <div className="form-group col-md-8">
                            <label className="control-label" >
                              {/* {this.props.getItemMasterView[0].size} */}
                            </label>
                          </div>

                        </div>


                        <div className="row">

                          <div className="form-group col-md-3">
                            <label className="control-label" style={{ fontWeight: "bold" }}>
                              {utils.getLabelByID("Manufacturer: ")}
                            </label>
                          </div>
                          <div className="form-group col-md-8">
                            <label className="control-label" >
                              {/* {this.props.getItemMasterView[0].manufacturer} */}
                            </label>
                          </div>


                        </div>


                        <div className="row">
                          <div className="form-group col-md-3">
                            <label className="control-label" style={{ fontWeight: "bold" }}>
                              {utils.getLabelByID("Description : ")}
                            </label>
                          </div>
                          <div className="form-group col-md-8">
                            <label className="control-label" >
                              {/* {this.props.getItemMasterView[0].description} */}
                            </label>
                          </div>
                        </div>
                        <div className="row">

                          <div className="form-group col-md-3">
                            <label className="control-label" style={{ fontWeight: "bold" }}>
                              {utils.getLabelByID("Category : ")}
                            </label>
                          </div>
                          <div className="form-group col-md-9" style={{ paddingTop: "8px" }}>
                            <ul type="none">
                              {/* <li>{this.state.getItemMasterView[0].categorysegment1}</li>
                              <li>{this.state.getItemMasterView[0].categorysegment2}</li>
                              <li>{this.state.getItemMasterView[0].categorysegment3}</li>
                              <li>{this.state.getItemMasterView[0].categorysegment4}</li> */}
                            </ul>
                          </div>


                        </div>

                      </div>

                      <div className="col-md-4" style={{ padding: "10px", height: "200px", width: "200px" }}>
                        {/* <img className="img-thumbnail img-rounded" src={this.state.getItemMasterView[0].image} /> */}
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <Portlet title={utils.getLabelByID("AVAILABLE INVENTORY")}>
                <div className="row" >
                  <div className="col-md-2"></div>
                  <div className="col-md-4" style={{ textAlign: "", padding: "5px" }}>
                    <div className="row">
                      <img className="img-thumbnail img-rounded" src='/assets/Resources/emiratesLogo.png' style={{ marginLeft: "215px", height: "150px", width: "180px" }} />
                    </div>
                    <div className="row">
                      <div className="stat-wrap">
                        <div>
                          {/* <span className="stat-number">{this.props.getItemMasterView[0].emiratesInventory}</span> */}
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="col-md-4" style={{ textAlign: "", padding: "5px" }}>
                    <div className="row">
                      <img className="img-thumbnail img-rounded" src='/assets/Resources/Apparel.png' style={{ height: "150px", width: "180px", marginLeft: "25px" }} />
                    </div>
                    <div className="row">
                      <label className="control-label" style={{ textAlign: "left", height: "100px", width: "100px", fontSize: "70px" }}>

                        <div className="stat-wrap">
                          <div>
                            {/* <span className="stat-number">{this.props.getItemMasterView[0].supplierInventory}</span> */}
                          </div>
                        </div>
                      </label>
                    </div>

                  </div>

                  <div></div><div></div>
                  <div></div>

                </div>

              </Portlet>

            </div>
          </div>
        </div>
      );
    }

  // }
}

function mapStateToProps(state, ownProps) {
  // console.log(state.app.getItemMasterView.searchResult, "@@@@@@@@@@@@@@@@@@2")
  return {
    // getItemMasterView: state.app.getItemMasterView.searchResult,
    // typeData: state.app.typeData.data
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

ViewItemMaster.displayName = "VIEW ITEM MASTER";
export default connect(mapStateToProps, mapDispatchToProps)(ViewItemMaster);