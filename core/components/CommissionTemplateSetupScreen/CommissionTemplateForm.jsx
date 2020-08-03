import React from 'react';
import {reduxForm} from 'redux-form';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import * as utils from '../../common/utils.js';
import {TextInput} from '../../common/FormControls.jsx';
import Table from '../../common/Datatable.jsx';
import CommissionDetailsForm from './CommissionDetailsForm.jsx';
import ActionButton from '../../common/ActionButtonNew.jsx';
import validate from './validate.js';
import { SubmissionError }  from 'redux-form/lib/SubmissionError'

class CommissionTemplateForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
        detailModalIsOpen: false,
        commissionDetails: [],
        selectedFeeType: undefined,
        error:undefined,
    };
    this.submit = this.submit.bind(this);
    this.addDetails = this.addDetails.bind(this);
    this.updateState = this.updateState.bind(this);
    this.detailsActionHandlers = this.detailsActionHandlers.bind(this);
    this.commissionTemplateActions = this.commissionTemplateActions.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialValues.commissionDetails && this.state.commissionDetails.length === 0) {
      this.setState({commissionDetails: nextProps.initialValues.commissionDetails});
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  updateState(data) {
    this.setState(data);
  }

  submit(data) {
    data.commissionDetails = this.state.commissionDetails;
    return this.props.onSubmit(data);
  }

  dateValidation(tableData,formData){
      let startDate = new Date(formData.startDate);
      let endDate = new Date(formData.endDate);
      let cardType = formData.categoryType;
      let tableStartDate = '';
      let tableEndDate = '';
      startDate = startDate.getTime();
      endDate = endDate.getTime();

      for(let i = 0; i<tableData.commissionDetails.length-1; i++){
          tableStartDate =  new Date(tableData.commissionDetails[i].startDate);
          tableEndDate =  new Date(tableData.commissionDetails[i].endDate);
          tableStartDate = tableStartDate.getTime();
          tableEndDate = tableEndDate.getTime();

          if(tableData.commissionDetails[i].categoryType == cardType){
                if((startDate <= tableEndDate && startDate >= tableStartDate) || (endDate <= tableEndDate && endDate >= tableStartDate)){

                    return false
                }
          }
      }

    return true
  }

  addDetails(data) {
    if(this.dateValidation(data,data.commissionDetails[this.state.index])){

        data.commissionDetails[this.state.index].actions = [
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
            detailModalIsOpen: false,
            commissionDetails: data.commissionDetails,
            error: ""

        });
    }else{
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
        return sleep(1000) // simulate server latency
            .then(() => {
                this.setState({
                    error: "date already exists"
                });
            })




    }

  }

  detailsActionHandlers({actionName, index}) {
    switch (actionName) {
      case "Edit":
        this.setState({
          detailModalIsOpen: true,
          index
        });
        break;
      case "Delete":
        if (index > -1) {
          let a = this.state.commissionDetails;
          a.splice(index, 1);
          this.setState({
            commissionDetails: a
          });
        }
        break;
    }
  }

  commissionTemplateActions() {
    return [
      {
        type: "modal",
        className: "btn btn-default",
        label: utils.getLabelByID("Add"),
        icon: "plus",
        actionHandler: this.updateState.bind(this, {
          detailModalIsOpen: true,
          index: this.state.commissionDetails.length
        })
      }
    ];
  }

  performAction(actionObj) {
    if (actionObj.label === "Reset") {
      this.props.reset();
    }
  }

  render() {
    const {handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps} = this.props;

    return (
      <div>

        <ModalBox isOpen={this.state.detailModalIsOpen}>

          <CommissionDetailsForm onSubmit={this.addDetails}
                                 initialValues={this.state}
                                 containerState={containerState}
                                 formState={this.state}
                                 updateState={this.updateState}
                                 index={this.state.index}

          />
        </ModalBox>
        
          <Portlet title={utils.getLabelByID("Details")} actions={this.commissionTemplateActions()}>
            <Table
              pagination={false}
              export={false}
              search={false}
              gridColumns={utils.getGridColumnByName("CTEMP_templateDetail")}
              componentFunction={this.detailsActionHandlers}
              gridData={this.state.commissionDetails}
              totalRecords={this.state.commissionDetails.length}
            />
          </Portlet>
          <div className="clearfix">
            <ActionButton actionList={containerState.commissionTemplateDetail.actions}
                          performAction={this.performAction}
                          submitting={submitting} pristine={pristine}/>
          </div>
    
      </div>
    );
  }
}

export default reduxForm({
  form: 'CommissionTemplateForm', // a unique identifier for this form
  validate
})(CommissionTemplateForm);