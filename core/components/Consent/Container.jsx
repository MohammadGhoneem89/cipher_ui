/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import Form from './Form.jsx';

import cloneDeep from 'lodash/cloneDeep';
import {forEach} from "react-bootstrap/cjs/ElementChildren";
import { timeThursdays } from 'd3';

const initialState = {
  Container: {},
  List: [],
  typeData: [],
  groupList: [],
  columnList: [],
  resultSet: [],
  isEdit: true,
  isLoading: true,
  formLoading:false,
  isCustom: true,
  loadedOnce: false,
  gridLoading: false,
  getEndpointListView: [],
  text: "Please wait while your request is being processed."
};

class Container extends React.Component {

  constructor(props) {
    super(props)
    this.ActionHandlers = this.ActionHandlers.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.state = cloneDeep(initialState);
  }

  clearFieldsPeer() {
    $('#form').find('input:text').val('');
    $('#form').find('textarea').val('');
  }


  componentDidMount() {

    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['ORG_TYPES'])); // Org types (entities)
    if (this.props.id !== "NEW") {
      this.setState({
        isLoading:false,
        isEdit:false
      })
      this.props.actions.generalAsyncProcess(constants.getDocumentType, {
        "body": {
          "document_type":this.props.id //"COO"
        }
      }).then(res=>{
        console.log(res,"ASDADSDASSA");
        if(res.result.key){
          this.setState({
            isLoading:false,
            Container:{
              name:res.result.name,
              description:res.result.description,
              ownerOrgType:res.result.ownerOrgCode,
              documentType:res.result.documentType
            }
          })
        }
        else{
          this.setState({
            isLoading:false
          })
          alert("Document Not Found");
        }
        
      });
    
    }
    else{
      this.setState({
        loadedOnce: false,
        gridLoading: false,
        isLoading:false,
        Container:{}
      })
    }
   
  }

  componentWillMount() {
    this.props.actions.updateStore({
      Container: {}
    });
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.typeData) {
      this.setState({
        typeData: nextProps.typeData,
        // isLoading: false
      });
    }
    if (nextProps.Container) {
      this.setState({
        Container: nextProps.Container
      });
    }
  }

  onInputChange = (e) => {
    let value;
    if (e.target.name.indexOf('is') === 0) {
      value = $("#" + e.target.name).is(":checked");
    } else {
      value = e.target.value;
    }
    let Container = _.cloneDeep(this.state.Container);
    if (e.target.id == 'group') {
      let values = $('#group').val();
      _.set(Container, e.target.id, values)
    } else {
      _.set(Container, e.target.id, value)
    }
    // this.state.networkConfig[e.target.name] = e.target.name;
    console.log(JSON.stringify(Container))
    this.setState({
      Container: Container
    })
  }

  submit = (e) => {

    let Container = _.cloneDeep(this.state.Container);
    if (
      _.isEmpty(Container.documentType) ||
      _.isEmpty(Container.ownerOrgType) ||
      _.isEmpty(Container.description) ||
      _.isEmpty(Container.name)
    ) {
      alert("All fields are required");
      return false;
    }
    
    this.setState({
      formLoading:true
    })
    
    let body = {
      "body":{
      "document_name":Container.name,
      "description":Container.description,
      "owner_org_type":Container.ownerOrgType,
      "document_type":Container.documentType
      }
    }

    console.log(body,"yyyyyyyyyyyyyyyy");

    let url;

    if(this.props.id !== "NEW"){
      url=constants.updateDocumentType;
    }
    else{
      url=constants.addDocumentType
    }

    this.props.actions.generalAsyncProcess(url, body).then(res=>{
      if(res.messageStatus=="OK"){
            this.setState({
              formLoading: false
            });
          this.props.history.push("/documentList")
      }
    }).catch(err=>{
      this.setState({
        formLoading: false
      });
      alert("Something happened. Please try again.");
      return false;
    });
  }


  render() {
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
  

    return (<Form flag={this.state.update} ActionHandlers={this.ActionHandlers}  formLoading={this.state.formLoading}
                  typeData={this.state.typeData} isOwner={this.state.isEdit} onInputChange={this.onInputChange}
                  onSubmit={this.submit} testQuery={this.test}
                  state={this.state}/>)


  }

  ActionHandlers({actionName, index}) {
    switch (actionName) {
      case "delete":
        if (index > -1) {
          let tempState = this.state.List;
          tempState.splice(index, 1);
          this.setState({List: tempState});
        }
        break;
      default:
        break;
    }
  }
}


Container.propTypes = {
  children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  console.log(ownProps,"AAAAAA")
  return {
    Container: _.get(state.app, 'documentContainer.data', undefined),
    typeData: _.get(state.app, 'typeData.data', []),
    id: ownProps.params.id,
    message: _.get(state.app, 'Message', undefined),
  };
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(actions, dispatch)}
}

Container.displayName = "Add Document Type";
export default connect(mapStateToProps, mapDispatchToProps)(Container);

