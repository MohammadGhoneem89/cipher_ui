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
                  {orderDetails.HAWB.map(item => {
                    return <div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">MAWB #</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.shippingDetails.MAWBNumber}</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Flight No</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.shippingDetails.flightNo}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">FlighT Date</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.shippingDetails.flightDate}</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Port of Load</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.shippingDetails.portOfLoad}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Port of Exit</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.shippingDetails.exitPort}</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Cargo Handler</label>
                          </div>
                          <div className="col-md-2">
                            <label>{`${item.shippingDetails.cargoHandlerName}[${item.shippingDetails.cargoHandlerCode}]`}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Broker</label>
                          </div>
                          <div className="col-md-2">
                            <label>{`${item.shippingDetails.brokerName}[${item.shippingDetails.brokerCode}]`}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Agent </label>
                          </div>
                          <div className="col-md-2">
                            <label>{`${item.shippingDetails.agentName}[${item.shippingDetails.agentCode}]`}</label>
                          </div>
                        </div>
                      </div>
                      {orderDetails.HAWB > 0 && <hr/>}
                    </div>
                  })}

                </div>
                <div id="ExportDeclaration" className="tab-pane">
                  {orderDetails.ExportDeclaration.map(item => {
                    return <div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Declaration No</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.declarationNo}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Declaration Id</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.declarationID}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Version</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.version}</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Flight No</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.flightNo}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Batch Id</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.batchReqNo}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Clearnce status </label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.clearanceStatus}</label>
                          </div>
                        </div>
                      </div>
                      {item.error && <div className="alertbox">
                        <label className="errorcolr">Error</label>
                        <div className="errorbox">
                          {item.error}
                        </div>
                      </div>}
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Region Type</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.regimeType}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Declaration Type</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.declType}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Export Code Misal 2</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.exceptionCode}</label>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col-md-2">
                            <label className="bold">Transport Mode</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.transportMode}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">Invoice No</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.invoiceNo}</label>
                          </div>
                          <div className="col-md-2">
                            <label className="bold">No of pages</label>
                          </div>
                          <div className="col-md-2">
                            <label>{item.noOfPages}</label>
                          </div>
                        </div>
                      </div>
                      {orderDetails.ExportDeclaration.length > 0 && <hr/>}
                    </div>;
                  })}
                  <div className="linetext"><label className="bold">See line items in the order of declaration line
                    items</label></div>
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
                          return item.isDelivered;
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
                      {(() => {
                        let returnLines = orderDetails.lineItems.filter((item => {
                          return item.isReturned;
                        }));
                        let returnItems = [];
                        returnLines.map(orderLine => {
                          orderLine.importDeclarationReferences.map(item => {
                            returnItems.push({
                              description:orderLine.description,
                              quantity: orderLine.quantity,
                              statQuantity: item.statQuantity,
                              statUOM: item.statUOM,
                              returnQty: orderLine.returnQty,
                              returnStatQuantity: item.returnStatQuantity,
                              oldHAWBNo: orderLine.HAWBNumber,
                              exportDeclarationNo: item.exportDeclarationNo,
                              newAWB: item.newAWB,
                              importDeclarationNo: item.importDeclarationNo,
                              actions:[{label: "viewData", iconName: "fa fa-eye", actionType: "COMPONENT_FUNCTION"}]
                            });
                          });
                        });


                        return <Table
                          pagination={false}
                          export={false}
                          search={false}
                          gridColumns={utils.getGridColumnByName("returnDelivery")}
                          gridData={returnItems || []}
                          pageChanged={() => {
                          }}
                          activePage={1}
                          pageSize={10}
                        />

                      })()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>);

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
