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
import axios from 'axios'
const initialState = {
  RouteList: {},
  MappingConfigList: {},
  typeData: {},
  // dropDownItems:[],
  isLoading: false,
  isCustom: true,
  enumList: {},
  request: undefined,
  response: undefined,
  requestSample:undefined
};
class Documentation extends React.Component {

  constructor(props) {
    super(props)
    this.state = cloneDeep(initialState)
    
    this.onLoadSample = this.onLoadSample.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onRunApi = this.onRunApi.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }


  componentWillMount() {

  }
  onEdit(data) {
    this.setState({ request: data.updated_src })
  }
  onLoadSample(uri, request) {
    if(this.state.requestSample)
      this.setState({ request: this.state.requestSample });
    else
      alert("No Request Sample Found!");
  }
  onRunApi(uri, request) {
    axios.post(uri, request)
    .then(res => {
     
      //return res;
      this.setState({ response: res.data });
      $(window).scrollTop($('#responseData').offset().top-300);
    }).catch((ex)=>{
      alert (ex.message);
    });
  }
  onAdd(data) {
    this.setState({ request: data.updated_src })
  }
  onDelete(data) {
    this.setState({ request: data.updated_src })
  }

  componentDidMount() {
    //alert(this.props.useCase)
    let req = {
      useCase: this.props.useCase,
      route: this.props.route
    }
    this.props.actions.generalProcess(constants.APIDocs, req);
    this.props.actions.generalProcess(constants.getTypeDataList)
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.enumList) {
      this.setState({ enumList: nextProps.enumList })
    }
    if (nextProps.RouteListData) {
      let routemap = nextProps.RouteListData;
      let reqSample=undefined;
      for (let useCase in routemap) {
        for (let route in routemap[useCase]) {
          let request = {}
          let requestPG = {}
          let response = {}

          if (routemap[useCase][route].isValBypass === false) {
            routemap[useCase][route].RequestMapping.forEach(element => {
              _.set(request, element.IN_FIELD, `${element.IN_FIELDDT}`);
              _.set(requestPG, element.IN_FIELD, `${element.IN_FIELDDT}`);

            });
            routemap[useCase][route].ResponseMapping.forEach(element => {
              _.set(response, element.MAP_FIELD, `${element.MAP_FIELDDT}`);
            });
          } else {
            routemap[useCase][route].ResponseMapping = [];
            routemap[useCase][route].RequestMapping = []
          }

          if (routemap[useCase][route].isSimulated === true) {
            response = JSON.parse(routemap[useCase][route].simulatorResponse);
          }
          reqSample = routemap[useCase][route].sampleRequest
          _.set(routemap, `${useCase}.${route}.requestSchema`, request)
          _.set(routemap, `${useCase}.${route}.responseSchema`, response)

        }
      }
      this.setState({ requestSample:reqSample, RouteList: routemap })
    }
  }


  getDocumentation() {
    let resp = [];
    for (let useCase in this.state.RouteList) {
      for (let route in this.state.RouteList[useCase]) {
        let request = this.state.request;
        if (!this.state.request)
          request = _.get(this.state.RouteList, `${useCase}.${route}.requestSchema`, null);

        let response = this.state.response;
        if (!this.state.response)
          response = _.get(this.state.RouteList, `${useCase}.${route}.responseSchema`, null);
        resp.push(<DocumentComponent initialValues={this.state.RouteList[useCase][route]} useCase={useCase} route={route} request={request} response={response} baseurl={constants.baseUrl} PG={request} onEdit={this.onEdit} onDelete={this.onDelete} onAdd={this.onAdd} onLoadSample={this.onLoadSample} onRunApi={this.onRunApi} />);
      }
    }
    return (resp);
  }
  render() {
    return (

      <div>
        <div className="row">
          <div className="col-md-12 ">
            <div className="portlet light bordered sdg_portlet" style={{ marginBottom: "0px" }}>
              <div className="portlet-title">
                <div className="caption">
                  <span className="caption-subject">API Documentation</span></div>
                <div className="tools">
                  <a className="btn btn-default upercase" href="javascript:;"

                    style={{
                      height: "30px",
                      fontSize: "12px"
                    }}
                  > export </a>
                </div>
              </div>
              <div className="portlet-body">
                <div className="form-body" id="clear">
                  <div className="row">
                    <div className="col-md-12">
                      {this.getDocumentation()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
    enumList: state.app.enumList.data
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}
Documentation.displayName = "Documentation_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(Documentation);

