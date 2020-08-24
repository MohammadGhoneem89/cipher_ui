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
  requestSample: undefined,
  variations: [],
  isOpen: false,
  isHmacOpen: false,
  generateHMAC: "",
  list: []
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
    this.closePopUP = this.closePopUP.bind(this);
    this.HmacPopUP = this.HmacPopUP.bind(this);
    this.generateHmac = this.generateHmac.bind(this);
  }


  closePopUP() {
    let toggle = !this.state.isOpen;
    this.setState({ isOpen: toggle })
  }

  HmacPopUP() {
    let toggle = !this.state.isHmacOpen;
    this.setState({ isHmacOpen: toggle })
  }

  generateHmac() {
    let privatekey = document.getElementById('privatekey') == null ? "" : document.getElementById('privatekey').value;
    let sharedSec = document.getElementById('sharedSec') == null ? "" : document.getElementById('sharedSec').value;
    let body = document.getElementById('body') == null ? "" : document.getElementById('body').value;
    if (!privatekey || !sharedSec || !body) {
      return alert('all fields are required');
    }
    let bodyFinal;
    try {
      bodyFinal = JSON.stringify(JSON.parse(body))
    } catch (e) {
      return alert('body must be a valid json');
    }

    this.props.actions.generalProcess(constants.generateHMAC, { privatekey, sharedSec, body: bodyFinal });
    // crypto.
  }

  componentWillMount() {

  }

  onEdit(data) {
    this.setState({ request: data.updated_src })
  }


  onLoadSample(uri, request) {
    if (this.state.requestSample)
      this.setState({ request: this.state.requestSample });
    else
      alert("No Request Sample Found!");
  }

  onRunApi(uri, request) {
    axios.post(uri, request)
      .then(res => {

        //return res;
        this.setState({ response: res.data });
        $(window).scrollTop($('#responseData').offset().top - 300);
      }).catch((ex) => {
        alert(ex.message);
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
      smartcontract: this.props.smartcontract
    }
    // request params
    // response params
    // ------
    this.props.actions.generalProcess(constants.APIDocsContarct, req);
    this.props.actions.generalProcess(constants.getTypeDataList)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.apiDocsContarct) {
      let list = []
      nextProps.apiDocsContarct.forEach((elem) => {
        let strArr = [];
        let reqFields = _.get(elem, 'RequestMapping.fields', [])
        reqFields.forEach(element => {
          strArr.push(`${element.IN_FIELD} (${element.IN_FIELDDT})`)
        });
        console.log(JSON.stringify(reqFields));

        let rules = _.get(elem, 'rules', [])
        rules.forEach((elemi) => {
          list.push({
            "ruleName": elemi.BlockRuleName,
            "function": elemi.smartcontractFunc,
            "consortium": elemi.consortiumText,
            "channel": elemi.channelText,
            "smartcontract": elemi.smartcontract,
            "type": elemi.type,
            "args": `["${strArr.join("\", ")}"]`,
            "sampleArgs": elem.sampleArgs,
            "sampleResponse": elem.sampleResponse,
            "sampleEvents": elem.sampleEvents
          })

        })
        this.setState({ isloading: false, list })
      })
    }
  }


  getDocumentation() {
    return (<DocumentComponent containerState={this.state} />);
    //   }
    // let resp = [];
    // for (let useCase in this.state.RouteList) {
    //   for (let route in this.state.RouteList[useCase]) {
    //     let request = this.state.request;
    //     if (!this.state.request)
    //       request = _.get(this.state.RouteList, `${useCase}.${route}.requestSchema`, null);

    //     let response = this.state.response;
    //     if (!this.state.response)
    //       response = _.get(this.state.RouteList, `${useCase}.${route}.responseSchema`, null);
    //     resp.push(<DocumentComponent initialValues={this.state.RouteList[useCase][route]} useCase={useCase}
    //       route={route} request={request} response={response} baseurl={constants.baseUrl}
    //       PG={request} onEdit={this.onEdit} onDelete={this.onDelete} onAdd={this.onAdd}
    //       onLoadSample={this.onLoadSample} onRunApi={this.onRunApi}
    //       containerState={this.state}
    //       HmacPopUP={this.HmacPopUP}
    //       generateHmac={this.generateHmac}
    //       closePopUP={this.closePopUP} />);
    //   }
    // }
    // return (resp);
    // return []
  }

  render() {
    return (

      <div>
        <div className="row">
          <div className="col-md-12 ">
            <div className="portlet light bordered sdg_portlet" style={{ marginBottom: "0px" }}>
              <div className="portlet-title">
                <div className="caption">
                  <span className="caption-subject">SmartContract Documentation</span>
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
    smartcontract: ownProps.params.smartcontract,
    // useCase: ownProps.params.useCase,
    // route: ownProps.params.route,
    enumList: state.app.enumList.data,
    generateHMAC: _.get(state.app, 'generateHMAC.data.generatedHMAC', undefined),
    apiDocsContarct: _.get(state.app, 'apiDocsContarct.data', undefined)
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

Documentation.displayName = "Documentation_Heading";
export default connect(mapStateToProps, mapDispatchToProps)(Documentation);

