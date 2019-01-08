/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import ModalBox from '../../../../core/common/ModalBox.jsx';

import BeneficiaryInfo from './BeneficiaryInfo.js';


class PaymentAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      modalIsOpen: false,
      gridData: [],
      beneficiaries: [],
      index: 0,
      paymentDetail: {}
    };
    this.updateState = this.updateState.bind(this);
  }

  componentWillMount() {
    this.getDataById()
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.paymentDetail && (nextProps.paymentDetail._id === nextProps.id)) {
      this.setState({
        isLoading: false,
        paymentDetail: nextProps.paymentDetail,
        beneficiaries: _.get(nextProps.paymentDetail, 'beneficiaryInfo', [])
      });
    }
    else {
      this.setState({
        isLoading: false
      });
    }
  }

  updateState(data) {
    this.setState(data);
  }

  getDataById = () => {
    if (this.props.id !== '') {
      this.setState({isLoading: true});
      this.props.actions.generalProcess(constants.getPaymentDetail, {
        "action": "getPaymentDetail",
        "data": {
          "id": this.props.id
        }
      });
    }
  };

  insertJson = () => {
    let name = $("#name").val() == null ? "" : $("#name").val();
    let code = $("#code").val() == null ? "" : $("#code").val();

    let json = {
      data: {
        name: name,
        code: code,
        beneficiaryInfo: this.state.beneficiaries
      }
    };

    if (this.props.id) {
      json.data._id = this.props.id;
      this.props.actions.generalProcess(constants.updatePayment, json);
    }
    else {
      this.props.actions.generalProcess(constants.insertPayment, json);
    }
  };

  sendToBlockchain = () => {
    let body = {
      name: $("#name").val() == null ? "" : $("#name").val(),
      code: $("#code").val() == null ? "" : $("#code").val(),
      beneficiaryData: {}
    };
    this.state.beneficiaries.map((item) => {
      body.beneficiaryData[item.key] = item.value;
    });
    body.beneficiaryData = JSON.stringify(body.beneficiaryData);
    this.props.actions.generalProcess(constants.insertPaymentMetaInfo, {body});

  };

  actionHandlers = ({actionName, index}) => {
    switch (actionName) {
      case "Delete":
        if (index > -1) {
          let beneficiaries = this.state.beneficiaries;
          beneficiaries.splice(index, 1);
          this.setState(beneficiaries);
        }
        break;
    }
  };

  updateBeneficiaryInfo = (data) => {
    this.setState({
      modalIsOpen: false,
      beneficiaries: data.beneficiaries
    });
  }

  render() {
    let _this = this;
    let addAction = [
      {
        type: "link",
        className: "btn btn-default",
        label: utils.getLabelByID("Add"),
        icon: "plus",
        actionHandler: _this.updateState.bind(_this, {
          modalIsOpen: true,
          index: this.state.beneficiaries.length
        })
      }];


    if (this.state.isLoading)
      return (<div className="loader"> {utils.getLabelByID("loading")}</div>);

    return (
      <div>
        <Portlet title={utils.getLabelByID("Payment Type Detail")}>

          <div className="row">

            <div className="form-group col-md-12">
              <div className="col-md-4">
                <label className="label-bold">{utils.getLabelByID("Name")}</label>
                <input type="text" className="form-control ekycinp" name="name" id="name"
                       defaultValue={_.get(this.state, 'paymentDetail.name', '')}/>
              </div>
              <div className="col-md-4">
                <label className="label-bold">{utils.getLabelByID("Code")}</label>
                <input type="text" className="form-control ekycinp" name="code" id="code"
                       defaultValue={_.get(this.state, 'paymentDetail.code', '')}/>
              </div>
            </div>

          </div>

          <Portlet title={"Beneficiary Info"} isPermissioned={false} actions={addAction}>
            {this.state.beneficiaries.map(item => {
              item.action = [{
                label: "Delete",
                iconName: "fa fa-trash",
                actionType: "COMPONENT_FUNCTION"
              }];
            })}
            <Table
              gridColumns={utils.getGridColumnByName("paymentAdd")}
              gridData={this.state.beneficiaries}
              componentFunction={this.actionHandlers}
            />
          </Portlet>

          <div className="row">
            <div className="col-md-12">
              <div className="form-group col-md-12">
                <div className="btn-toolbar pull-right">
                  <button type="submit" className="btn green" onClick={this.sendToBlockchain}>
                    {utils.getLabelByID("WASL_SEND_TO_BC")}
                  </button>
                  <button type="submit" className="btn green" onClick={this.insertJson}>
                    {utils.getLabelByID("Save")}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </Portlet>

        <ModalBox isOpen={this.state.modalIsOpen}>
          <BeneficiaryInfo
            onSubmit={this.updateBeneficiaryInfo}
            initialValues={this.state}
            index={this.state.index}
            updateState={this.updateState}
          />
        </ModalBox>

      </div>
    );

  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: _.get(ownProps.params, 'id', ''),
    paymentDetail: _.get(state.app, 'getPaymentDetail.data', {}),
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}

}

PaymentAdd.displayName = "Payment Add";
export default connect(mapStateToProps, mapDispatchToProps)(PaymentAdd);
