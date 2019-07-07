/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {browserHistory} from 'react-router';
import unescapejs from 'unescape-js';
import ShadowBox from '../../common/ShadowBox.jsx'
// import Steps from '../../../../core/common/Steps.jsx';
import Table from '../../../../core/common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as toaster from '../../../../core/common/toaster.js';
import * as requestCreator from '../../../../core/common/request.js';

class OrderDetailsContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      modalIsOpen: false,
      gridData: [],
      typeData: []
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

  }

  componentWillReceiveProps(nextProps) {

  }

  render() {
    let orderDetails = this.props.orderDetails;
    if (this.state.isLoading)
      return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
    return (
      <div className="portlet light" style={{"min-height": "854px"}}>
        <div className="row">
          <div className="col-md-12">
            <ul id="progressbar">
              {orderDetails.StatusList.map((item, key) => {
                return <li key={key} className={item.status ? "active" : ""}>{item.label}</li>
              })}
            </ul>


          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="orderno">
              <img src="/assets/Resources/ordericon.png" width="18px"/><label className="bold">Order
              #: <span>{orderDetails.orderID}</span></label>
            </div>
            <div className="hashno">
              <label className="bold">354843191535137876132161</label>
            </div>
          </div>
        </div>


        <div className="row">
          <div className="col-md-12">
            <div className="shadowBox Courierbox">
              <div className="row">
                <div className="col-md-6 text-center">
                  <div>
                    <h4 className="bold">E-commerce</h4>
                  </div>
                  <div><img src={orderDetails.eCommerceCompanyLogo} width="10%"/></div>
                  <span className="bold">{orderDetails.eCommerceCompanyName}</span>
                </div>
                <div className="col-md-6 text-center">
                  <div><h4 className="bold">Courier Company</h4></div>
                  <div><img src={orderDetails.courierCompanyLogo} width="10%"/></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <ShadowBox title="Bill To" icon="/assets/Resources/soldTo.png">
              <div className="row">
                <div className="col-md-3">
                  <label className="bold">Name:</label>
                </div>
                <div className="col-md-5">
                  <label>{orderDetails.soldTo}</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label className="bold">Address:</label>
                </div>
                <div className="col-md-5">
                  <label>{orderDetails.soldAddress}</label>
                </div>
              </div>
            </ShadowBox>
          </div>

          <div className="col-md-4">
            <ShadowBox title="Bill To" icon="/assets/Resources/Billto.png">
              <div className="row">
                <div className="col-md-3">
                  <label className="bold">Name:</label>
                </div>
                <div className="col-md-5">
                  <label>{orderDetails.billTo}</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-3">
                  <label className="bold">Address:</label>
                </div>
                <div className="col-md-5">
                  <label>{orderDetails.billToAddress}</label>
                </div>
              </div>
            </ShadowBox>
          </div>

          <div className="col-md-4">
            <ShadowBox title="Ship To" icon="/assets/Resources/shipto.png">
              <div className="row">
                <div className="col-md-3">
                  <label className="bold">Address:</label>
                </div>
                <div className="col-md-5">
                  <label>{orderDetails.shipAddress}</label>
                </div>
              </div>
            </ShadowBox>
          </div>
        </div>


        <div className="row">

          <div className="col-md-4">
            <div className="rowdata">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="bold">Total Value:</label>
                  </div>
                  <div className="col-md-4">
                    <label>{orderDetails.totalValue}</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="bold">City:</label>
                  </div>
                  <div className="col-md-4">
                    <label>N/A</label>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-4">
            <div className="rowdata">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="bold">No of Items:</label>
                  </div>
                  <div className="col-md-4">
                    <label>{orderDetails.noOfItems}</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="bold">Return Policy:</label>
                  </div>
                  <div className="col-md-4">
                    <label>{orderDetails.returnPolicy}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-md-4">
            <div className="rowdata">
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="bold">Currency:</label>
                  </div>
                  <div className="col-md-4">
                    <label>{orderDetails.currency}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div className="row">
          <div className="col-md-12">
            <div className="tab-pane in active">
              <div className="ui-regulartabs">
                <ul id="adHocTabs" className="nav nav-tabs">
                  <li id="fieldsTabLink" className="active"><a href="#OrderLine" data-toggle="tab">
                    <span> Order Line</span></a>
                  </li>
                  <li id="filtersTabLink"><a href="#HAWB" data-toggle="tab"> <span> HAWB</span></a></li>
                  <li id="groupsTabLink"><a href="#Shipping" data-toggle="tab"> <span> Shipping</span></a></li>
                  <li id="fieldsTabLink"><a href="#ExportDeclaration" data-toggle="tab">
                    <span> Export Declaration</span></a>
                  </li>
                  <li id="filtersTabLink"><a href="#Delivered" data-toggle="tab"> <span> Delivered</span></a>
                  </li>
                  <li id="groupsTabLink"><a href="#ReturnDetails" data-toggle="tab">
                    <span> Return Details</span></a></li>
                </ul>
              </div>
              <div className="tab-content ui-innertab ui-tabcontentbody">
                <div id="OrderLine" className="tab-pane in active ui-fieldtable">
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("orderLine")}
                    gridData={orderDetails.lineItems || []}
                    totalRecords={5}
                    pageChanged={() => {
                    }}
                    activePage={1}
                    pageSize={10}
                  />
                </div>
                <div id="HAWB" className="tab-pane">
                  {orderDetails.HAWB.map(item => {
                    return <div className="row">
                      <div className="col-md-6">
                        <label className="bold">AWB #:</label>
                        <label><span className="awbNO">{item.HAWBNumber}</span></label>
                      </div>
                      <div className="col-md-6 text-right">
                        <label className="bold">No Of Box:</label>
                        <label><span className="noofbox">{item.noOfBoxes}</span></label>
                      </div>
                      <div className="col-md-12 text-center">
                        <div className="shadowBox recipt">
                          <img src={item.HAWBImagePath} height="50%"/>
                        </div>
                      </div>
                    </div>;
                  })}

                </div>
                <div id="Shipping" className="tab-pane">
                  <div className="form-group">
                    {orderDetails.HAWB.map(item => {
                      let fields = [];
                      let keys = Object.keys(item.shippingDetails);
                      keys.map(key => {
                        console.log(item.shippingDetails, key);
                        fields.push(
                          <div className="row">
                            <span>
                        <div className="col-md-2">
                          <label className="bold">{key}</label>
                        </div>
                        <div className="col-md-2">
                          <label>{item.shippingDetails[key]}</label>
                        </div>
                      </span>
                          </div>);
                      });
                      return fields;
                    })}
                  </div>


                </div>
                <div id="ExportDeclaration" className="tab-pane">
                  <div className="form-group">
                    {orderDetails.ExportDeclaration.map(item => {
                      let fields = [];
                      let keys = Object.keys(item);
                      keys.map(key => {
                        fields.push(
                          <div className="row">
                            <span>
                        <div className="col-md-2">
                          <label className="bold">{key}</label>
                        </div>
                        <div className="col-md-2">
                          <label>{item[key]}</label>
                        </div>
                      </span>
                          </div>);
                      });
                      return fields;


                    })}

                  </div>

                </div>
                <div id="Delivered" className="tab-pane">
                  <div className="row">
                    <div className="col-md-12">
                      <Table
                        pagination={false}
                        export={false}
                        search={false}
                        gridColumns={utils.getGridColumnByName("delivery")}
                        gridData={orderDetails.lineItems.filter((item => {
                          return !item.isReturned && item.isDelivered;
                        })) || []}
                        totalRecords={5}
                        pageChanged={() => {
                        }}
                        activePage={1}
                        pageSize={10}
                      />
                    </div>
                  </div>
                </div>
                <div id="ReturnDetails" className="tab-pane">
                  <div className="row">
                    <div className="col-md-12">
                      <Table
                        pagination={false}
                        export={false}
                        search={false}
                        gridColumns={utils.getGridColumnByName("returnDelivery")}
                        gridData={orderDetails.lineItems.filter((item => {
                          return item.isReturned && item.isDelivered;
                        })) || []}
                        totalRecords={5}
                        pageChanged={() => {
                        }}
                        activePage={1}
                        pageSize={10}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <
        /div>
        );

        }
        }

        function mapStateToProps(state, ownProps) {

        return {
        orderDetails: state.app.orderDetails
      };
      }

        function mapDispatchToProps(dispatch) {
        return {actions: bindActionCreators(actions, dispatch)}

      }

        OrderDetailsContainer.displayName = "Order Details";
        export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsContainer);
