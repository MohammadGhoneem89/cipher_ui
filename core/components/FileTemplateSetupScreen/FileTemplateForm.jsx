import React from 'react';
import { reduxForm } from 'redux-form';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';
import { CheckboxInput, CheckboxList, DropdownInput, TextInput } from '../../common/FormControls.jsx';
import ActionButton from '../../common/ActionButtonNew.jsx';
import Table from '../../common/Datatable.jsx';
import FieldMappingForm from './FieldMappingForm.jsx';
import RulesForm from './RulesForm.jsx';
import validate from './validate.js';
import Row from '../../common/Row.jsx';
import Input from '../../common/Input.jsx';
import Label from '../../common/Lable.jsx';;
import Combobox from '../../common/Select.jsx';
import Col from '../../common/Col.jsx';
import * as gen from '../../common/generalActionHandler'

const TemplateDetails = ({ error, initialValues, containerState, updateState, state, generalHandler, formState, onTypeChange, onEndpointSelect, onTableSelect }) => {
  return (
    <Portlet title={utils.getLabelByID("Template Details")} className={"portlet light"}>
      <div className="row">
        <div className="col-md-6 col-sm-6">
          <TextInput name="templateName"
                     label={utils.getLabelByID("FTEMP_templateName")}
                     type="text"
          />
        </div>

        <div className="col-md-6 col-sm-6">
          <DropdownInput name="fileType" options={containerState.fileTypes}
                         label={utils.getLabelByID("FTEMP_fileType")} onChange={onTypeChange}
          />
        </div>
      </div>
      <div className="row">

        {!formState.isDBSelect && <div className="col-md-6 col-sm-6">
          <TextInput name="fileNameRegEx"
                     label={utils.getLabelByID("FTEMP_fileName")}
                     type="text"
          />
        </div>}

        {!formState.isDBSelect && <div className="col-md-6 col-sm-6">
          <TextInput name="separator"
                     label={utils.getLabelByID("FTEMP_separator")}
                     type="text"
          />
        </div>}

        {!formState.isDBSelect && <div className="col-md-6 col-sm-6">
          <TextInput name="XMLMainTag"
                     label={utils.getLabelByID("Watch Path")}
                     type="text"
          />
        </div>}
        {!formState.isDBSelect && <div className="col-md-3 col-sm-3">
          <TextInput
            name="skipTopLines"
            label={utils.getLabelByID("FTEMP_skipTopLines")}
            type="number"
          />
        </div>}
        {!formState.isDBSelect && <div className="col-md-3 col-sm-3">
          <TextInput
            name="skipBottomLines"
            label={utils.getLabelByID("FTEMP_skipBottomLines")}
            type="number"
          />
        </div>}
        {formState.isDBSelect && <div className="col-md-6 col-sm-6">
          <DropdownInput name="endpoint" options={containerState.endpointList || []}
                         label={utils.getLabelByID("End Point")} onChange={onEndpointSelect} disabled={containerState.endpointList ? false : true}
          />
        </div>}
        {formState.isDBSelect && <div className="col-md-6 col-sm-6">
          { //////////for CBCM. TO be fixed later
            /* <DropdownInput name="table" options={containerState.tableList || []}
            label={utils.getLabelByID("Table")} onChange={onTableSelect} disabled={containerState.tableList ? false : true}
          /> */}
          <TextInput
            name="table"
            label={utils.getLabelByID("Table")}
            type="text"
          />
        </div>}
      </div>
    </Portlet>
  );
};

class FileTemplateForm extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      fieldsModalIsOpen: false,
      ruleModalIsOpen: false,
      fields: [],
      rules: [],
      ruleType: undefined,
      index: 0,
      internalFields: [],
      columnNos: [],
      rulesList: [],
      selectedRuleMapp: [],
      selectedIndex: -1,
      isDBSelect: false
    };
    this.submit = this.submit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.addFields = this.addFields.bind(this);
    this.addRule = this.addRule.bind(this);
    this.detailsActionHandlers = this.detailsActionHandlers.bind(this);
    this.ActionHandlersRules = this.ActionHandlersRules.bind(this);
    this.mappActionHandlers = this.mappActionHandlers.bind(this);
    this.performAction = this.performAction.bind(this);
    this.generalHandler = gen.generalHandler.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(">>>>>>>>>>>??? ", nextProps);
    // if(this.state.isDBSelect && this.state.fields.length == 0 && nextProps.containerState.fields.length != 0) {
    //   this.setState({ fields: nextProps.containerState.fields })
    // }
    if(nextProps.initialValues.fields.toString() != nextProps.containerState.fields.toString()) {
      this.setState({ fields: nextProps.containerState.fields })
    }
    else if (nextProps.initialValues.fields && this.state.fields.length === 0) {
      this.setState({ fields: nextProps.initialValues.fields, ruleList: nextProps.rulesList });
    }

    this.setState({ rulesList: nextProps.rulesList });
  }

  componentWillMount() {

  }

  componentDidMount() {
    if (this.props.containerState.fileTemplateDetail.fileType == 'Database') {
      this.setState({ isDBSelect: true, fields: this.props.containerState.fileTemplateDetail.fields }, () => {
        this.props.onDBSelect(true);
        this.props.onEndpointSelect({ target: { value: this.props.containerState.fileTemplateDetail.endpoint } })
        this.props.onTableSelect({ target: { value: this.props.containerState.fileTemplateDetail.table } })
      })
    }
  }

  updateState(data) {
    this.setState(data);
  }

  onTypeChange(event) {
    if (event.target.value === 'Database') {
      this.setState({ isDBSelect: true }, this.props.onDBSelect(true));
    }
    else {
      this.setState({ isDBSelect: false }, this.props.onDBSelect(false));
    }
  }

  submit(data) {
    data.fields = this.state.fields;
    data.rules = this.state.rules;
    data.rulesList = this.state.rulesList;
    this.state.rulesList.forEach((elem) => {
      // console.log(elem.mappList.length)
      if (!elem.mappList || elem.mappList.length == 0) {
        alert("mapping must be defined for all rules!")
        return;
      }
    })
    return this.props.onSubmit(data);
  }

  addFields(data) {
    data.fields[this.state.index].actions = [
      {
        label: utils.getLabelByID("Edit"),
        iconName: "fa fa-edit",
        actionType: "COMPONENT_FUNCTION"
      },
      {
        label: utils.getLabelByID("Delete"),
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }
    ];
    let field = data.fields[this.state.index];
    if (field.functionName) {
      field.specialFunction = field.functionName + '(' + (field.param1 || null) + ',' + (field.param2 || null) + ')';
    }

    this.setState({
      fields: data.fields,
      fieldsModalIsOpen: false
    });
  }
  addRule(data) {
    console.log(data.rules);

    data.rules[this.state.index].actions = [

      {
        label: utils.getLabelByID("Edit"),
        iconName: "fa fa-edit",
        actionType: "COMPONENT_FUNCTION"
      },
      {
        label: utils.getLabelByID("Delete"),
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }
    ];

    this.setState({
      rules: data.rules,
      ruleModalIsOpen: false
    });
  }

  ActionHandlersRules({ actionName, index }) {
    switch (actionName) {
      case "Define Mapping":
        if (index > -1) {

          this.props.callinterface({ "route": this.state.rulesList[index].API })
          this.setState({
            ruleModalIsOpen: true,
            selectedRuleMapp: this.state.rulesList[index].mappList || [],
            selectedIndex: index
          });
        }
        break;
      case "Edit":
        if (index > -1) {
          let b = this.state.rulesList;
          let x = this.state.rulesList[index]
          b.splice(index, 1);
          this.setState({
            rulesList: b, routing: x
          });
        }
        break;
      case "Delete":
        if (index > -1) {
          let a = this.state.rulesList;
          a.splice(index, 1);
          this.setState({
            rulesList: a
          });
        }
        break;
    }
  }

  detailsActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Edit":
        let usedInternalField = [];
        let usedColumnNo = [];
        this.state.fields.map((item, index) => {
          usedInternalField.push(item.internalField);
          usedColumnNo.push(item.columnNo);
        });
        let internalFields = this.props.containerState.internalFields.filter(item => {
          return usedInternalField.indexOf(item.value) === -1 || this.state.fields[index].internalField === item.value;
        });
        let columnNos = this.props.containerState.columnNos.filter(item => {
          return usedColumnNo.indexOf(item.value) === -1 || this.state.fields[index].columnNo === item.value;
        });

        this.setState({
          internalFields,
          columnNos,
          index,
          fieldsModalIsOpen: true
        });
        break;
      case "Delete":
        if (index > -1) {
          let a = this.state.fields;
          a.splice(index, 1);
          this.setState({
            fields: a
          });
        }
        break;
    }
  }
  mappActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Delete":
        if (index > -1) {
          let a = this.state.selectedRuleMapp;
          a.splice(index, 1);
          this.setState({
            selectedRuleMapp: a
          });
        }
        break;
    }
  }
  addBtnClicked(type) {

    if (type === "mappedFieldsActions") {
      let usedInternalField = [];
      let usedColumnNo = [];
      this.state.fields.map((item, index) => {
        usedInternalField.push(item.internalField);
        usedColumnNo.push(item.columnNo);
      });

      let internalFields = this.props.containerState.internalFields.filter(item => {
        return usedInternalField.indexOf(item.value) === -1;
      });
      let columnNos = this.props.containerState.columnNos.filter(item => {
        return usedColumnNo.indexOf(item.value) === -1;
      });

      this.setState({
        internalFields,
        columnNos,
        index: this.state.fields.length,
        fieldsModalIsOpen: true
      });
    }
    else if (type === "rulesActions") {
      let usedInternalField = [];
      let usedColumnNo = [];
      this.state.fields.map((item, index) => {
        usedInternalField.push(item.internalField);
        usedColumnNo.push(item.columnNo);
      });

      let internalFields = this.props.containerState.internalFields.filter(item => {
        return usedInternalField.indexOf(item.value) === -1;
      });
      let columnNos = this.props.containerState.columnNos.filter(item => {
        return usedColumnNo.indexOf(item.value) === -1;
      });

      this.setState({
        internalFields,
        columnNos,
        index: this.state.fields.length,
        ruleModalIsOpen: true
      });
    }
  }
  addRouting() {
    if (!this.state.routing.ruleName || !this.state.routing.field || !this.state.routing.option || !this.state.routing.value || !this.state.routing.API) {
      alert("All Fields Are Required!!");
      return;
    }

    let interm = this.state.rulesList || [];
    if (!this.state.routing || !this.state.routing.mappList) {
      this.state.routing.mappList = [];
    }
    this.state.routing.actions = [
      {
        label: "Define Mapping",
        iconName: "fa fa-map",
        actionType: "COMPONENT_FUNCTION"
      },
      {
        label: utils.getLabelByID("Edit"),
        iconName: "fa fa-edit",
        actionType: "COMPONENT_FUNCTION"
      },
      {
        label: utils.getLabelByID("Delete"),
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }
    ];
    interm.push(this.state.routing)
    this.setState({ rulesList: interm, routing: {} })
  }
  addMapping() {

    if (!this.state.mapping.mapped || !this.state.mapping.incomming) {
      alert("All Fields Are Required!!");
      return;
    }
    let interm = this.state.selectedRuleMapp;

    this.state.mapping.actions = [
      {
        label: utils.getLabelByID("Delete"),
        iconName: "fa fa-trash",
        actionType: "COMPONENT_FUNCTION"
      }
    ];
    interm.push(this.state.mapping)
    this.setState({ selectedRuleMapp: interm, mapping: {} })
  }
  addMappingToList() {

    if (this.state.selectedIndex > -1) {
      let interm = this.state.selectedRuleMapp;
      let ruleList = this.state.rulesList;
      ruleList[this.state.selectedIndex].mappList = interm;
      this.setState({ ruleList: ruleList, selectedIndex: -1, ruleModalIsOpen: false })
    }
  }



  performAction(actionObj) {
    alert(actionObj)
    if (actionObj.label === "Reset") {
      this.props.reset();
    }
  }

  render() {
    const { handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps, onEndpointSelect, onTableSelect } = this.props;

    let mappedFieldsActions = [
      {
        type: "modal",
        className: "btn btn-default",
        label: utils.getLabelByID("Add"),
        icon: "plus",
        actionHandler: this.addBtnClicked.bind(this, "mappedFieldsActions")
      }
    ];
    let mapFieldActions = [
      {
        type: "icon",
        className: "btn btn-default",
        label: utils.getLabelByID("Add"),
        icon: "close",
        actionHandler: (() => { this.setState({ ruleModalIsOpen: false }) }).bind(this)
      }
    ];
    return (
      <div>
        <ModalBox isOpen={this.state.fieldsModalIsOpen}>
          <FieldMappingForm onSubmit={this.addFields} index={this.state.index} initialValues={this.state}
                            containerState={containerState} updateState={this.updateState}
                            state={this.state} />
        </ModalBox>

        <ModalBox isOpen={this.state.ruleModalIsOpen}>
          <Portlet title={utils.getLabelByID("Mapping")} actions={mapFieldActions}>
            <Row>
              <Col col="6">
                <Label text="incomming" columns="3"></Label>
                <Combobox fieldname='incomming' formname='mapping' columns='9' style={{}}
                          state={this.state} typeName="options"
                          dataSource={(() => {
                            let options = [];
                            this.state.fields.map(item => {
                              options.push({ label: item.fieldName, value: item.fieldName });
                            });
                            return { options };
                          })()} multiple={false} actionHandler={this.generalHandler} />
              </Col>
              <Col col="6">
                <Label text="mapped" columns="3"></Label>
                <Combobox fieldname='mapped' formname='mapping' columns='9' style={{}}
                          state={this.state} typeName="options"
                          dataSource={(() => {
                            return { options: this.props.fieldList };
                          })()} multiple={false} actionHandler={this.generalHandler} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="col-md-12">
                  <div className="btn-toolbar pull-right">
                    <a className="btn btn-default" href="javascript:;" onClick={this.addMapping.bind(this)}>{utils.getLabelByID("Add Mapping")} </a>
                  </div>
                </div>
                <Col col="12">
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("FTEMP_MappRules")}
                    componentFunction={this.mappActionHandlers}
                    gridData={this.state.selectedRuleMapp}
                    totalRecords={this.state.rules.length}
                  />
                </Col>
              </Col>
            </Row>
            <Row>
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="btn-toolbar pull-right">
                    <a className="btn green" href="javascript:;" onClick={this.addMappingToList.bind(this)}>{utils.getLabelByID("Save")} </a>
                  </div>
                </div>
              </div>
            </Row>
          </Portlet>

        </ModalBox>

        <form autoComplete="off" role="form" id="oldForm" onSubmit={handleSubmit(this.submit)}>
          <TemplateDetails initialValues={initialValues} containerState={containerState}
                           updateState={this.updateState} onTypeChange={this.onTypeChange} formState={this.state} onEndpointSelect={onEndpointSelect} onTableSelect={onTableSelect} />
          <Portlet title={utils.getLabelByID("MAU_mapField")} actions={mappedFieldsActions} >
            <Table
              pagination={false}
              export={false}
              search={false}
              gridColumns={utils.getGridColumnByName("FTEMP_fields")}
              componentFunction={this.detailsActionHandlers}
              gridData={this.state.fields}
              // gridData={this.state.isDBSelect ? containerState.fields : this.state.fields}
              totalRecords={this.state.isDBSelect ? containerState.fields.length : this.state.fields.length}
            />
          </Portlet>

          <Portlet title={utils.getLabelByID("FTEMP_filterRules")} >
            <Row>
              <Col col="3">
                <Label text="Field" columns="3"></Label>
                <Combobox fieldname='field' formname='routing' columns='9' style={{}}
                          state={this.state} typeName="options"
                          dataSource={(() => {
                            let options = [];
                            if (this.state.isDBSelect) {
                              containerState.fields.map(item => {
                                options.push({ label: item.fieldName, value: item.fieldName });
                              });
                            }
                            else {
                              this.state.fields.map(item => {
                                options.push({ label: item.fieldName, value: item.fieldName });
                              });
                            }
                            return { options };
                          })()} multiple={false} actionHandler={this.generalHandler} />
              </Col>
              <Col col="3">
                <Label text="op." columns="3"></Label>
                <Combobox fieldname='option' formname='routing' columns='9' style={{}}
                          state={this.state} typeName="options"
                          dataSource={(() => {
                            let options = [];
                            options.push({ label: '==', value: '==' });
                            options.push({ label: 'Regexp', value: 'Regexp' });
                            return { options };
                          })()} multiple={false} actionHandler={this.generalHandler} />
              </Col>
              <Col col="3">
                <Label text="Value" columns="3"></Label>
                <Input fieldname='value' formname='routing' state={this.state}
                       columns='9' style={{}} actionHandler={this.generalHandler} />
              </Col>
              <Col col="3">
                <Label text="Then" columns="3"></Label>
                <Combobox fieldname='API' formname='routing' columns='9' style={{}}
                          state={this.state} typeName="ApiList"
                          dataSource={this.props.containerState} multiple={false} actionHandler={this.generalHandler} />
              </Col>
              <Col col="3">
                <Label text="Name" columns="3"></Label>
                <Input fieldname='ruleName' formname='routing' state={this.state}
                       columns='9' style={{}} actionHandler={this.generalHandler} />
              </Col>
              <Col col="3">
                <Label text="Custom" columns="3"></Label>
                <Input fieldname='transformFunction' formname='routing' state={this.state}
                       columns='9' style={{}} actionHandler={this.generalHandler} />
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="col-md-12">
                  <div className="btn-toolbar pull-right">
                    <a className="btn btn-default" href="javascript:;" onClick={this.addRouting.bind(this)}>{utils.getLabelByID("Add Routing")} </a>
                  </div>
                </div>
                <Col col="12">
                  <Table
                    pagination={false}
                    export={false}
                    search={false}
                    gridColumns={utils.getGridColumnByName("FTEMP_FilterRules")}
                    componentFunction={this.ActionHandlersRules}
                    gridData={this.state.rulesList}
                    totalRecords={this.state.rules.length}
                  />
                </Col>
              </Col>
            </Row>
          </Portlet>



          <div className="clearfix">
            <ActionButton actionList={containerState.fileTemplateDetail.actions}
                          performAction={this.performAction}
                          submitting={submitting} pristine={pristine} />
            {/*<button type="submit" className="pull-right btn green" disabled={submitting}>*/}
            {/*Submit*/}
            {/*</button>*/}
            {/*<button type="button" className="pull-right btn default"*/}
            {/*disabled={pristine || submitting}*/}
            {/*onClick={reset}>*/}
            {/*Clear Values*/}
            {/*</button>*/}
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'FileTemplateForm', // a unique identifier for this form
  enableReinitialize: true,
  validate
})(FileTemplateForm);