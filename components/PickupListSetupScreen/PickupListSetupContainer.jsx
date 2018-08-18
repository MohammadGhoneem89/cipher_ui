import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Portlet from '../../common/Portlet.jsx';
import {SubmissionError} from 'redux-form'
import initialState from '../../reducers/initialState.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import PickupListSetupForm from  './PickupListSetupForm.jsx';

class PickupListSetupContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pickupListDetail: undefined,
      pickupListID: undefined,
      consortiumNames: undefined,
      index: undefined,
      isLoading: true
    };

    this.submit = this.submit.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (this.props.pickupListID) {
      this.props.actions.generalProcess(constants.getPickupListDetail, requestCreator.createPickupListDetailRequest(this.props.pickupListID));
    }
  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pickupListDetail !== this.state.pickupListDetail) {

      this.setState({
        pickupListID: nextProps.pickupListID,
        pickupListDetail: nextProps.pickupListDetail,
        isLoading: false
      });
    }

  }

  updateState(data) {
    this.setState(data);
  }

  submit(data) {
    // if (this.state.pickupListID) {
    //   data._id = this.state.pickupListID; //Hack to avoid replication.
    //   return this.props.actions.reduxFormProcess(constants.consortiumUpdate, requestCreator.createBlockchainUpdateRequest(data))
    //     .catch((error) => {
    //       throw new SubmissionError(error);
    //     });
    // }
    // else
    //   return this.props.actions.reduxFormProcess(constants.consortiumInsert, requestCreator.createBlockchainInsertRequest(data))
    //     .catch((error) => {
    //       throw new SubmissionError(error);
    //     });
  }

  render() {
    if (!this.state.isLoading) {
      return (
        <div>
          <Portlet title={"PickupListDetail"}>
            <PickupListSetupForm onSubmit={this.submit}
                                 initialValues={this.state.pickupListDetail}
                                 containerState={this.state}
                                 containerProps={this.props}/>
          </Portlet>
        </div>
      );
    }
    else {
      return (<div className="loader">Loading...</div>);
    }
  }
}

function mapStateToProps(state, ownProps) {
  let getTypeDataDetailByID;
  let typeName;
  let pickupListDetail;
  if(state.app.getTypeDataDetailByID.data){
    getTypeDataDetailByID = state.app.getTypeDataDetailByID.data;
    typeName = state.app.getTypeDataDetailByID.data.typeName;
    pickupListDetail = getTypeDataDetailByID.data?  getTypeDataDetailByID :  (getTypeDataDetailByID.data=getTypeDataDetailByID[typeName]);
  }

  return {
    pickupListDetail,
    pickupListID: ownProps.params.pickupListID,
    typeData: state.app.typeData.data,
    readOnly: ownProps.params.mode === "view"
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

PickupListSetupContainer.displayName = "PickupListSetup_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(PickupListSetupContainer);