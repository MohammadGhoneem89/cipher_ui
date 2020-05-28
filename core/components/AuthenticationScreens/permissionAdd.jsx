import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../../actions/generalAction.js';
import * as constants from '../../constants/Communication.js';
import * as toaster from '../../common/toaster.js';
import brandConfig from '../../../assets/skins/default/brandConfig.json';
import Portlet from '../../common/Portlet.jsx';
import * as utils from "../../common/utils";
import Cookies from "js-cookie";
import * as requestCreator from "../../common/request";
import auth from "../../auth/authenticator";
import {browserHistory} from "react-router";
import Combobox from '../../../applications/starta/common/Select.jsx';
import * as gen from "../../common/generalActionHandler";

class PermissionAdd extends React.Component {


  constructor() {
    super();
    this.state = {
      form: {module: ""},
      pagelist: [],
      ddlModules: [],
      selectedModule: {}
    }
    this.comboBoxHandler = this.comboBoxHandler.bind(this);
    this.submit = this.submit.bind(this);
    // this.generalHandler = this.comboBoxHandlerNew.bind(this);

  }

  comboBoxHandler(formname, fieldname, type, typedata, e) {
    let newState = this.state.form;
    _.set(newState, fieldname, e.target.value);
    this.setState({form: newState})
    if (fieldname == 'module') {
      let nPl = _.get(this.state.modulePageMap, e.target.value, [])
      let selected = _.get(this.state.moduleList, e.target.value, [])
      this.setState({pageList: nPl, selectedModule: selected})
    }
  }

  componentDidMount() {
    this.props.actions.generalProcess(constants.getModuleConfigAll);
  }

  submit() {
    if (!this.state.form.module || !this.state.form.permission || !this.props.link) {
      return alert("Module and Page should be selected");
    }
    let finalpermission = this.state.selectedModule;
    let URI = _.get(finalpermission, `children[${this.state.form.permission}].URI`, []);
    URI.push(`/${this.props.link}`);
    _.set(finalpermission, `children[${this.state.form.permission}].URI`, URI);
    console.log(finalpermission,'',)
    this.props.actions.generalProcess(constants.updateModuleConfig, finalpermission);

  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.pList) {
      this.setState({
        ddlModules: nextProps.pList.ddlModules,
        modulePageMap: nextProps.pList.modulePageMap,
        moduleList: nextProps.pList.moduleList
      })
    }
  }


  render() {

    return (
      <div>
        <Portlet title={utils.getLabelByID("")}>
          <div className="row" style={{height: '100%'}}>
            <h3 className="text-center">Not Authorized Permission</h3>
            <br/>
            <div className="col-sm-offset-3 col-md-12">
              <div className="row">
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("API Route")}</label>
                    </div>

                    <div className="form-group col-md-8">
                      <label className="control-label bold">/{this.props.link}</label>
                    </div>

                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Module")}</label>
                    </div>

                    <Combobox
                      fieldname='module'
                      formname='form'
                      columns='8'
                      placeholder='Select Module'
                      style={{}}
                      state={this.state}
                      typeName="ddlModules"
                      dataSource={this.state}
                      multiple={false}
                      actionHandler={this.comboBoxHandler}
                      className="form-control"
                      disabled={false}
                      isDDL={true}
                    />

                  </div>
                </div>
                <div className="col-md-12">
                  <div className="col-md-6">
                    <div className="form-group col-md-4">
                      <label className="control-label">{utils.getLabelByID("Page")}</label>
                    </div>

                    <Combobox
                      fieldname='permission'
                      formname='form'
                      columns='8'
                      placeholder='Select Page'
                      style={{}}
                      state={this.state}
                      typeName={"pageList"}
                      dataSource={this.state}
                      multiple={false}
                      actionHandler={this.comboBoxHandler}
                      className="form-control"
                      disabled={false}
                      isDDL={true}
                    />

                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <div className="col-md-6">
                        <div className="col-md-12">
                          <div className="btn-toolbar pull-right">
                            <button type="submit" onClick={this.submit}
                                    className="btn green">{' '}{utils.getLabelByID("Update Module")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </Portlet>
      </div>
    );
  }

}


function mapStateToProps(state, ownProps) {
  return {
    pList: _.get(state.app, 'ModuleListAll.data', undefined),
    link: ownProps.params.link
  };
}

function mapDispatchToProps(dispatch) {

  return {actions: bindActionCreators(actions, dispatch)}

}

PermissionAdd.displayName = "__HIDEALL";

export default connect(mapStateToProps, mapDispatchToProps)(PermissionAdd);