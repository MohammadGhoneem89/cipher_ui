import React from 'react';
import { reduxForm } from 'redux-form';
import 'react-dropzone-component/styles/filepicker.css'
import '../../../node_modules/dropzone/dist/min/dropzone.min.css';
import Table from '../../common/Datatable.jsx';
import FileUploader from '../../common/FileUploader.jsx';
import Portlet from '../../common/Portlet.jsx';
import ModalBox from '../../common/ModalBox.jsx';
import ExceptionListForm from './ExceptionListForm.jsx';
import * as utils from '../../common/utils.js';



import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../common/FormControls.jsx';


const FormSection1 = ({ initialValues, updateState, state }) => {
    let exceptionActions = [
        {
            type: "link",
            className: "btn btn-default",
            label: "ADD",
            icon: "plus",
            actionHandler: updateState.bind(this, {
                exceptionListModalIsOpen: true,
                index: state.exceptionList.length
            })
        }
    ];
    let weekStartDay = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];
    let weekEndDay = [
        { value: "Sunday", label: "Sunday" },
        { value: "Monday", label: "Monday" },
        { value: "Tuesday", label: "Tuesday" },
        { value: "Wednesday", label: "Wednesday" },
        { value: "Thursday", label: "Thursday" },
        { value: "Friday", label: "Friday" },
        { value: "Saturday", label: "Saturday" },
    ];
    return (
      <div>
          <div className="row">
              <div className="col-md-12 col-sm-12">
                  <div className="col-md-3 col-sm-3">
                      <DropdownInput name="weekStartDay" options={weekStartDay}
                                     label="Week Start Day" />
                  </div>
                  <div className="col-md-3 col-sm-3">
                      <DropdownInput name="weekEndDay" options={weekEndDay}
                                     label="Week End Day" />
                  </div>
              </div>
          </div>
          <div className="row" style={{ padding: "15px" }}>
              <div className="col-md-12 col-sm-12">
                  <Portlet title={"Exception List"} actions={exceptionActions}>
                      <Table
                        pagination={true}
                        export={false}
                        search={false}
                        gridColumns={utils.getGridColumnByName("workingCaledarExceptionList")}
                        gridData={state.exceptionList ? state.exceptionList : []}
                        totalRecords={state.exceptionList ? state.exceptionList.length : 0}
                      />
                  </Portlet>
              </div>
          </div>
      </div>
    )
};


class WorkingCalSetupForm extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            exceptionListModalIsOpen: false,
            index: undefined,
            exceptionList: []
        };

        this.updateState = this.updateState.bind(this);
        this.updateExceptionList = this.updateExceptionList.bind(this);
        this.submit = this.submit.bind(this);

    }

    updateState(data) {
        this.setState(data);
    }
    updateExceptionList(data) {
        data.exceptionList[this.state.index].actions = [{
            name: "Edit",
            icon: "fa fa-edit",
            type: "function"
        }];
        this.setState({
            exceptionListModalIsOpen: false,
            exceptionList: data.exceptionList
        });
    }
    submit(data) {
        data.exceptionList = this.state.exceptionList;
        return this.props.onSubmit(data);
    }
    componentWillReceiveProps(nextProps) {
        if (!this.state.selectedReconType) {
            this.setState({
                exceptionList: nextProps.initialValues.exceptionList

            });
        }
    }

    componentWillMount() {
    }

    componentDidMount() {
    }
    renderCalendar(exceptionList) {

        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,basicWeek,basicDay'
            },
            defaultDate: '2017-10-12',
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: exceptionList
        });
    }

    render() {
        const { handleSubmit, pristine, reset, submitting, initialValues } = this.props;
        return (
          <div>
              <form>
              </form>
              <ModalBox isOpen={this.state.exceptionListModalIsOpen}>
                  <ExceptionListForm onSubmit={this.updateExceptionList} initialValues={this.state}
                                     index={this.state.index} updateState={this.updateState} />

              </ModalBox>
              <form role="form" onSubmit={handleSubmit(this.submit)}>
                  <FormSection1 initialValues={initialValues} updateState={this.updateState} state={this.state} />


                  <div id='calendar' style={{ paddingLeft: "200px", width: "1000" }}></div>

                  {this.renderCalendar(initialValues.exceptionList)}
                  <div className="pull-right">
                      <button type="submit" className="btn green" disabled={submitting}>
                          Submit
                      </button>
                      <button type="button" className="btn btn-default" disabled={pristine || submitting}
                              onClick={reset}>
                          Clear Values
                      </button>
                  </div>
              </form>
          </div>
        );
    }
}
export default reduxForm({
    form: 'WorkingCalSetupForm', // a unique identifier for this form
    enableReinitialize: true
})(WorkingCalSetupForm);