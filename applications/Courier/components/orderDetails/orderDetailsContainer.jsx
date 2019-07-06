/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {browserHistory} from 'react-router';
import unescapejs from 'unescape-js';
// import Steps from '../../../../core/common/Steps.jsx';
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
              {orderDetails.StatusList.map((item) => {
                return <li className={item.status ? "active" : ""}>{item.label}</li>
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
            <div className="shadowBox squarebox">
              <div className="portletheading">
                <div className="caption"><span className="caption-subject">Sold To</span></div>
                <div className="titleicon"><img src="/assets/Resources/soldTo.png"/></div>
              </div>
              <div className="boxBody">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Name:</label>
                    </div>
                    <div className="col-md-5">
                      <label>MR XYZ</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Address:</label>
                    </div>
                    <div className="col-md-5">
                      <label>XYZ</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">City:</label>
                    </div>
                    <div className="col-md-3">
                      <label>Riyadh</label>
                    </div>
                    <div className="col-md-3">
                      <label className="bold">Country:</label>
                    </div>
                    <div className="col-md-3">
                      <label>KSA</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">City:</label>
                    </div>
                    <div className="col-md-5">
                      <label>Riyadh</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="shadowBox squarebox">
              <div className="portletheading">
                <div className="caption"><span className="caption-subject">BILL To</span></div>
                <div className="titleicon billto"><img src="/assets/Resources/Billto.png"/></div>
              </div>
              <div className="boxBody">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Address:</label>
                    </div>
                    <div className="col-md-5">
                      <label>XYZ</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">City:</label>
                    </div>
                    <div className="col-md-3">
                      <label>Riyadh</label>
                    </div>
                    <div className="col-md-3">
                      <label className="bold">Country:</label>
                    </div>
                    <div className="col-md-3">
                      <label>KSA</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">PO Box:</label>
                    </div>
                    <div className="col-md-3">
                      <label>53545</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="shadowBox squarebox">
              <div className="portletheading">
                <div className="caption"><span className="caption-subject">SHIP To</span></div>
                <div className="titleicon shipto"><img src="/assets/Resources/shipto.png"/></div>
              </div>
              <div className="boxBody">
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">Address:</label>
                    </div>
                    <div className="col-md-5">
                      <label>XYZ</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">City:</label>
                    </div>
                    <div className="col-md-3">
                      <label>Riyadh</label>
                    </div>
                    <div className="col-md-3">
                      <label className="bold">Country:</label>
                    </div>
                    <div className="col-md-3">
                      <label>KSA</label>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-3">
                      <label className="bold">PO Box:</label>
                    </div>
                    <div className="col-md-3">
                      <label>53545</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
                    <label>500</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="bold">City:</label>
                  </div>
                  <div className="col-md-4">
                    <label>CIF</label>
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
                    <label>123</label>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-4">
                    <label className="bold">Return Policy:</label>
                  </div>
                  <div className="col-md-4">
                    <label>NO Return</label>
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
                    <label>AED</label>
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
                  <div className="row">
                    <div className="col-md-12">
                      <table id="fieldTable" className="table table-bordered table-striped table-responsive">
                        <thead>
                        <tr>
                          <th>Field Name</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Action</th>
                        </tr>
                        </thead>
                        <tbody className="ui-sortable">
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div id="HAWB" className="tab-pane">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="bold">AWB #:</label>
                      <label><span className="awbNO">3516512345</span>3516512345</label>
                    </div>
                    <div className="col-md-6 text-right">
                      <label className="bold">No Of Box:</label>
                      <label><span className="noofbox">3</span>3</label>
                    </div>
                    <div className="col-md-12 text-center">
                      <div className="shadowBox recipt">
                        <img src="/assets/Resources/HAWB.png"/>
                      </div>
                      <table id="fieldTable" className="table table-bordered table-striped table-responsive">
                        <thead>
                        <tr>
                          <th>Field Name</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Action</th>
                        </tr>
                        </thead>
                        <tbody className="ui-sortable">
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div id="Shipping" className="tab-pane">
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">MAWB #</label>
                      </div>
                      <div className="col-md-2">
                        <label>321561</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">Flight No</label>
                      </div>
                      <div className="col-md-2">
                        <label>AL-47</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">FlighT Date</label>
                      </div>
                      <div className="col-md-2">
                        <label>10/10/2019</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">Port of Load</label>
                      </div>
                      <div className="col-md-2">
                        <label>DXB</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Port of Exit</label>
                      </div>
                      <div className="col-md-2">
                        <label>JEBEL ALI</label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">Cargo Handler</label>
                      </div>
                      <div className="col-md-2">
                        <label>Name [code]</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Broker </label>
                      </div>
                      <div className="col-md-2">
                        <label>Name [code]</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Agent </label>
                      </div>
                      <div className="col-md-2">
                        <label>Name [code]</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="ExportDeclaration" className="tab-pane">

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">Declaration Id</label>
                      </div>
                      <div className="col-md-2">
                        <label>653166</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Declaration Id</label>
                      </div>
                      <div className="col-md-2">
                        <label>3545153</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Version</label>
                      </div>
                      <div className="col-md-2">
                        <label>1</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">Flight No</label>
                      </div>
                      <div className="col-md-2">
                        <label>ABC</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Batch Id</label>
                      </div>
                      <div className="col-md-2">
                        <label>3214651</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Clearnce status </label>
                      </div>
                      <div className="col-md-2">
                        <label>Cleared</label>
                      </div>
                    </div>
                  </div>


                  <div className="alertbox">
                    <label className="errorcolr">Error</label>
                    <div className="errorbox">
                      dsfas5fsdf56
                    </div>
                  </div>


                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">Region Type</label>
                      </div>
                      <div className="col-md-2">
                        <label>653166</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Declaration Type</label>
                      </div>
                      <div className="col-md-2">
                        <label>3545153</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Export Code Misal 2</label>
                      </div>
                      <div className="col-md-2">
                        <label>1</label>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-2">
                        <label className="bold">Transport Mode</label>
                      </div>
                      <div className="col-md-2">
                        <label>ABC</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">Invoice No</label>
                      </div>
                      <div className="col-md-2">
                        <label>3214651</label>
                      </div>
                      <div className="col-md-2">
                        <label className="bold">No of pages</label>
                      </div>
                      <div className="col-md-2">
                        <label>Cleared</label>
                      </div>
                    </div>
                  </div>
                  <div className="linetext"><label className="bold">See line items in the order of declaration
                    line items</label></div>
                </div>
                <div id="Delivered" className="tab-pane">
                  <div className="row">
                    <div className="col-md-12">
                      <table id="fieldTable" className="table table-bordered table-striped table-responsive">
                        <thead>
                        <tr>
                          <th>Field Name</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Action</th>
                        </tr>
                        </thead>
                        <tbody className="ui-sortable">
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div id="ReturnDetails" className="tab-pane">
                  <div className="row">
                    <div className="col-md-12">
                      <table id="fieldTable" className="table table-bordered table-striped table-responsive">
                        <thead>
                        <tr>
                          <th>Field Name</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Alias</th>
                          <th>Expression</th>
                          <th>Action</th>
                        </tr>
                        </thead>
                        <tbody className="ui-sortable">
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        <tr>
                          <td>ApplicationDate.Date</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>Date</td>
                          <td>XYZ</td>
                          <td>None</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
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
