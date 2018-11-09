/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../../../core/common/request.js';
import APIDefScreenForm from './APIDefScreenForm.jsx';
class APIDefinitionScreen extends React.Component {

  constructor(props) {
    super(props)
    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      APIDefinitionAddUpdate: {},
      RequestMapping: {},
      ResponseMapping: {},
      typeData: {},
      // dropDownItems:[],
      isLoading: true

    };

  }

  componentWillMount() {

  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getAPIDefinitionAddUpdate);
    this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['API_Authtypes']));
    
  }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.APIDefinitionAddUpdate.data );
    if (nextProps.APIDefinitionAddUpdate.data && nextProps.typeData.data )
    // && nextProps.ResponseMapping && nextProps.RequestMapping) {
    {
      this.setState({
        APIDefinitionAddUpdate: nextProps.APIDefinitionAddUpdate.data,
        typeData: nextProps.typeData.data,   
        isLoading: false
      });
    }
  }

  formSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});
    function deepJSON(dataSource) {      
      let dataKeys = Object.keys(dataSource);
      dataKeys.map((keyElement) => {        
        let keys = keyElement.split(".");
        if (keys.length > 1) {
          keyElement.split('.').reduce((o, i, j) => {
            if (j === keys.length - 1) {
              const value = dataSource[keyElement];
              delete dataSource[keyElement];
              return o[i] = value;
            }
            else {
              if (o[i]) {
                return o[i];
              }
              else {
                return o[i] = {};
              }
            }
          }, dataSource);
        }
      })
      return dataSource;
    }


    let request = {
      action: "APIDefinations",
      data: deepJSON(data)
    };
    this.props.actions.reduxFormProcess(constants.updateBlockchainAccountList, request)
  }
  // onInputChange = (e) => {
  //   this.setState({
  //     [e.target.name]: e.target.value
  //   })
  // }
  submit = () => {
    this.setState({ formSubmitted: true });
  }
  render() {

     let dropDownItems = [
      {
        "label": "Label1",
        "value": "Value1"
      },
      {
        "label": "Label2",
        "value": "Value2"
      },
      {
        "label": "Label3",
        "value": "Value3"
      }
    ]
    if (this.state.isLoading) {
      return (<div className="loader">isLoading...</div>)
    }
    return (
      <APIDefScreenForm onSubmit={this.formSubmit} dropdownItems={dropDownItems} initialValues={this.state.APIDefinitionAddUpdate} typeData={this.state.typeData} />)
  }
}

APIDefinitionScreen.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  APIDefinitionAddUpdate: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    APIDefinitionAddUpdate: state.app.APIDefinitionAddUpdate,
    typeData: state.app.typeData
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
APIDefinitionScreen.displayName = "APIDefinitionScreen_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(APIDefinitionScreen);

