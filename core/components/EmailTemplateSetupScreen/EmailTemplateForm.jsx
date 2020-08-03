import React from 'react';
import {reduxForm} from 'redux-form';
import RichTextEditor from 'react-rte';
import Portlet from '../../common/Portlet.jsx';
import * as utils from '../../common/utils.js';
import {DropdownInput, TextInput, DataList} from '../../common/FormControls.jsx';
import ActionButton from '../../common/ActionButtonNew.jsx';
import validate from './validate.js';

class EmailTemplateForm extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      templateTextEng: RichTextEditor.createEmptyValue(),
      templateTextArabic: RichTextEditor.createEmptyValue()
    };
    this.submit = this.submit.bind(this);
    this.updateState = this.updateState.bind(this);
    this.richTextEngChange = this.richTextEngChange.bind(this);
    this.richTextArabicChange = this.richTextArabicChange.bind(this);
    this.performAction = this.performAction.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    let templateTextEng = this.props.containerState.emailTemplateDetail.templateTextEng;
    let templateTextArabic = this.props.containerState.emailTemplateDetail.templateTextEng;
    if (templateTextEng || templateTextArabic) {
      this.setState({
        templateTextEng: RichTextEditor.createValueFromString(templateTextEng, 'html'),
        templateTextArabic: RichTextEditor.createValueFromString(templateTextArabic, 'html')
      });
    }
    // if(this.props.containerState.emailTemplateDetail)

  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  updateState(data) {
    this.setState(data);
  }

  // addEnglishPlaceHolder(e){
  //
  //     // window.test = this.state.templateTextEng;
  //
  //     const editorState = this.state.templateTextEng.getEditorState();
  //
  //     const contentState = editorState.getCurrentContent();
  //     const selectionState = editorState.getSelection();
  //     const key = selectionState.getAnchorKey();
  //     const blocksAfter =  contentState.getBlockMap().skipUntil(function (_, k) {
  //         return k === key;
  //     }).toArray();
  //     const blocksBefore =  contentState.getBlockMap().takeUntil(function (_, k) {
  //         return k === key;
  //     }).toArray();
  //
  //     let index= selectionState.getAnchorOffset();
  //     let data = blocksAfter[0].text;
  //     let d1 = data.substring(0,index);
  //     let d2 = data.substring(index,data.length);
  //     let finalData = "<p>" + d1 + e.target.value + d2 + "</p>";
  //     let totalData = "";
  //     for(let i=0;i<blocksBefore.length;i++){
  //         totalData +="<p>" +blocksBefore[i].text + "</p>";
  //     }
  //     totalData +=finalData;
  //     for(let i=1;i<blocksAfter.length;i++){
  //         if (blocksAfter[i].text===""){
  //             totalData +="<p>" + "&nbsp;" + "</p>";
  //         }
  //         else {
  //             totalData +="<p>" +blocksAfter[i].text + "</p>";
  //         }
  //
  //     }
  //     this.setState({templateTextEng: RichTextEditor.createValueFromString(totalData, 'html')});
  //
  // }
  // addArabicPlaceHolder(e){
  //     const editorState = this.state.templateTextArabic.getEditorState();
  //     const contentState = editorState.getCurrentContent();
  //     const selectionState = editorState.getSelection();
  //     const key = selectionState.getAnchorKey();
  //     const blocksAfter =  contentState.getBlockMap().skipUntil(function (_, k) {
  //         return k === key;
  //     }).toArray();
  //     const blocksBefore =  contentState.getBlockMap().takeUntil(function (_, k) {
  //         return k === key;
  //     }).toArray();
  //
  //     let index= selectionState.getAnchorOffset();
  //     let data = blocksAfter[0].text;
  //     let d1 = data.substring(0,index);
  //     let d2 = data.substring(index,data.length);
  //     let finalData = "<p>" + d1 + e.target.value + d2 + "</p>";
  //     let totalData = "";
  //     for(let i=0;i<blocksBefore.length;i++){
  //         totalData +="<p>" +blocksBefore[i].text + "</p>";
  //     }
  //     totalData +=finalData;
  //     for(let i=1;i<blocksAfter.length;i++){
  //         if (blocksAfter[i].text===""){
  //             totalData +="<p>" + "&nbsp;" + "</p>";
  //         }
  //         else {
  //             totalData +="<p>" +blocksAfter[i].text + "</p>";
  //         }
  //
  //     }
  //
  //     this.setState({templateTextArabic: RichTextEditor.createValueFromString(totalData, 'html')});
  //
  // }

  performAction(actionObj) {
    if (actionObj.label === "Reset") {
      this.props.reset();
    }
  }

  submit(data) {
    data.templateTextEng = this.state.templateTextEng.toString('html');
    data.templateTextArabic = this.state.templateTextArabic.toString('html');
    return this.props.onSubmit(data);
  }

  richTextEngChange(templateTextEng) {
    this.setState({templateTextEng});
  }

  richTextArabicChange(templateTextArabic) {
    this.setState({templateTextArabic});
  }

  render() {
    const {handleSubmit, pristine, reset, submitting, initialValues, containerState, containerProps} = this.props;

    return (
      <div>
        <form autoComplete="off" role="form" onSubmit={handleSubmit(this.submit)}>
          <Portlet className={"portlet light "} title={"Create Email Template"}>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <TextInput name="templateName"
                           label={utils.getLabelByID("ETEMP_templateName")}
                           type="text"
                />
              </div>
              <div className="col-md-6 col-sm-6"/>
              <div className="col-md-6 col-sm-6">
                <DropdownInput name="templateType" options={containerState.templateTypes}
                               label={utils.getLabelByID("ETEMP_templateType")}
                />
              </div>
            </div>
          </Portlet>
          <Portlet className={"portlet light "} title={"English Text"}>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <TextInput name="subjectEng"
                           label={utils.getLabelByID("ETEMP_subjectEng")}
                           type="text"
                />
              </div>
              <div className="col-md-6 col-sm-6">
                <DataList name="placeHolderEng"
                          list={"PlaceHolders"}
                          options={containerState.placeHolders}
                          label={utils.getLabelByID("ETEMP_placeHolder")}
                />
              </div>
            </div>
            <div style={{marginTop: "15px"}}>
              <RichTextEditor
                value={this.state.templateTextEng}
                onChange={this.richTextEngChange}
                autoFocus={true}
              />
            </div>
          </Portlet>
          <Portlet className={"portlet light "} title={"Arabic Text"}>
            <div className="row">
              <div className="col-md-6 col-sm-6">
                <TextInput name="subjectArabic"
                           label={utils.getLabelByID("ETEMP_subjectArabic")}
                           type="text"
                />
              </div>
              <div className="col-md-6 col-sm-6">
                <DataList name="placeHolderArabic"
                          list={"PlaceHolders"}
                          options={containerState.placeHolders}
                          label={utils.getLabelByID("ETEMP_placeHolder")}
                />
              </div>
            </div>
            <div style={{marginTop: "15px"}}>
              <RichTextEditor
                value={this.state.templateTextArabic}
                onChange={this.richTextArabicChange}
              />
            </div>
          </Portlet>
          <div className="clearfix">
            <ActionButton actionList={containerState.emailTemplateDetail.actions} performAction={this.performAction}
                          submitting={submitting} pristine={pristine}/>
            {/*<button type="submit" className="pull-right btn green" disabled={submitting}>*/}
            {/*Save*/}
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
  form: 'EmailTemplateForm', // a unique identifier for this form
  validate
})(EmailTemplateForm);