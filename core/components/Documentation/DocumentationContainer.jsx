/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from '../../common/request.js';
import DocumentComponent from './DocumentComponent.jsx';
import cloneDeep from 'lodash/cloneDeep';
import Portlet from '../../common/Portlet.jsx';
import { Scrollbars } from 'react-custom-scrollbars';
const initialState = {
  RouteList: {},
  MappingConfigList: {},
  typeData: {},
  // dropDownItems:[],
  isLoading: false,
  isCustom: true
};
class Documentation extends React.Component {

  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)

  }

  componentWillMount() {

  }

  componentDidMount() {
    //alert(this.props.useCase)
    let req = {
      useCase: this.props.useCase,
      route: this.props.route
    }
    this.props.actions.generalProcess(constants.APIDocs, req);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.RouteListData) {
      this.setState({ RouteList: nextProps.RouteListData })
    }
  }


  getDocumentation() {
    let resp = [];
    for (let useCase in this.state.RouteList) {
      for (let route in this.state.RouteList[useCase]) {
        let request = {}
        let response = {}
        if (this.state.RouteList[useCase][route].isValBypass === false) {
          this.state.RouteList[useCase][route].RequestMapping.forEach(element => {
            _.set(request, element.IN_FIELD, `${element.IN_FIELDDT}`);
          });

          this.state.RouteList[useCase][route].ResponseMapping.forEach(element => {
            _.set(response, element.MAP_FIELD, `${element.MAP_FIELDDT}`);
          });
        } else {
          this.state.RouteList[useCase][route].ResponseMapping=[];
          this.state.RouteList[useCase][route].RequestMapping=[]
        }
        
        if(this.state.RouteList[useCase][route].isSimulated===true) {
          response=JSON.parse(this.state.RouteList[useCase][route].simulatorResponse);
        }
        resp.push(<DocumentComponent initialValues={this.state.RouteList[useCase][route]} useCase={useCase} route={route} request={request} response={response} baseurl={constants.baseUrl} />);
      }
    }
    return (resp);
  }
  render() {
    return (
      <div className="login" >

        <div className="content" style={{
          width: "95%",
          height: "90% ",
          top: "-5% ",
          borderRadius: "0px",
          overflowY: "scroll"
        }}><div class="logo"></div>


          <div className="row">
            {this.getDocumentation()}


          </div>

        </div>

      </div>


    )
  }
}

Documentation.propTypes = {
  children: PropTypes.object,
  typeData: PropTypes.object,
  RouteListData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    RouteListData: state.app.RouteList.data,
    useCase: ownProps.params.useCase,
    route: ownProps.params.route,
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
Documentation.displayName = "Documentation_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(Documentation);

