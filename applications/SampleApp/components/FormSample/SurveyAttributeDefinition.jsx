import React from 'react';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as utils from '../../../../core/common/utils.js';
import Table from '../../../../core/common/Datatable.jsx';

const SurveyAttributeDefinition = ({ onSubmit, initialValues = {}, parent }) => {
  let surveyChoices = parent.state.surveyChoices || initialValues.surveyChoices || [];
  function surveyQuestionTypeSelected(e) {
    parent.setState({ surveyQuestionType: e.target.value })
  }
  function addSurveyChoices(e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});

    let items = parent.state.surveyChoices || [];
    items.push(data);
    parent.setState({ surveyChoices: items });
  }



  function actionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Delete":
        if (index > -1) {
          let surveyChoices = parent.state.surveyChoices;
          console.log(parent.state);
          surveyChoices.splice(index, 1);
          parent.setState(surveyChoices);
        }
        break;
    }
  }

  return (
    <form className="form-horizontal" encType='application/json' role="form" onSubmit={onSubmit}>

      <div className="col-md-12" style={{marginBottom:"20px"}}>
        <label className="form-group control-label col-md-12 uppercase" style={{
          textAlign: "left",
          fontWeight: "bold"
        }}>{utils.getLabelByID("eKYC_SurveyAttributeDef")}</label>
      </div>
      <br />
      <div className="row" >
        <div className={parent.state.surveyQuestionType === "MCQ" ? "col-md-6" : "col-md-12"}>
          <div className="form-body">
            <div className="row">
              <div className="col-md-12 ">




                <div className={parent.state.surveyQuestionType === "MCQ" ? "col-md-12" : "col-md-6"}>
                  <div className="form-group col-md-4">
                    <label className="label-bold">{utils.getLabelByID("eKYC_QuestionType")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <select id="type" name="type" className="form-control ekycinp" onChange={surveyQuestionTypeSelected}>
                      <option value="">{utils.getLabelByID("RA_Select")}</option>
                      <option value="MCQ">{utils.getLabelByID("MCQ")}</option>
                      <option value="Text">{utils.getLabelByID("Text")}</option>

                      {/* {parent.state.typeData.KYC_QUESTION_TYPE.map((item, key) => {
                                                return <option value={item.value} key={key}>{item.label}</option>
                                            })} */}
                    </select>
                  </div>
                </div>



                <div className="col-md-12 ">
                  <div className="row">
                    <div className={parent.state.surveyQuestionType === "MCQ" ? "col-md-12" : "col-md-6"}>
                      <div className="form-group col-md-4">
                        <label className="label-bold">{utils.getLabelByID("eKYC_Attribute_Name")}</label>
                      </div>
                      <div className="form-group col-md-8">
                        <input className="form-control ekycinp" name="attributeName" type="text" />

                      </div>
                    </div>


                    {/*Attribute Expiry*/}
                    <div className={parent.state.surveyQuestionType === "MCQ" ? "col-md-12" : "col-md-6"}>
                      <div className="form-group col-md-4">
                        <label className="label-bold">{utils.getLabelByID("eKYC_Attribute_Expiry")}</label>
                      </div>
                      <div className="form-group col-md-8">
                        <div className="icheck-list">
                          <label className="mt-checkbox mt-checkbox-outline" style={{ marginLeft: "0px", marginTop: "0px" }}>
                            <label></label>
                            <input type="checkbox" className="form-control ekycinp" name="attributeExpiry" />
                            <span></span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>


                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <label className="form-group control-label col-md-12 uppercase" style={{
                        textAlign: "left",
                        fontWeight: "bold"
                      }}>{utils.getLabelByID("eKYC_SurveyQuestion")}</label>
                    </div>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <div className="form-group col-md-12">
                        <textarea className="form-control ekycinp" name="surveyQuestion" rows="4" cols="150" style={{ resize: "none" }} />
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
        {parent.state.surveyQuestionType === "MCQ" && <div className="col-md-6">
          <form className="form-horizontal" encType='application/json' role="form" onSubmit={addSurveyChoices}>
            <div className="col-md-12 ">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group col-md-4">
                    <label className="label-bold">{utils.getLabelByID("eKYC_ChoiceText")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <input className="form-control ekycinp" name="text" type="text" />
                  </div>
                </div>

              </div>


              <div className="row">
                <div className="col-md-12">
                  <div className="form-group col-md-4">
                    <label className="label-bold">{utils.getLabelByID("eKYC_ChoiceDescription")}</label>
                  </div>
                  <div className="form-group col-md-8">
                    <input className="form-control ekycinp" name="description" type="text" />
                  </div>
                </div>
              </div>

            </div>
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="col-md-12">
                    <div className="col-md-12">
                      <div className="btn-toolbar pull-right">
                        <button type="submit" className="btn btn-default"><i
                          className="fa fa-plus" />{' '}{utils.getLabelByID("Add")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br />
            <div className="col-md-12" style={{ paddingRight: "70px" }}>
              <div className="col-md-12">
                <div className="col-md-12">
                  <label className="form-group control-label col-md-12 uppercase" style={{
                    textAlign: "left",
                    fontWeight: "bold"
                  }}>{utils.getLabelByID("Choice List")}</label>
                </div>
              </div>

              {surveyChoices.map(item => {
                item.actions = [{
                  label: "Delete",
                  iconName: "fa fa-trash",
                  actionType: "COMPONENT_FUNCTION"
                }];
              })}

              <Table
                pagination={false}
                export={false}
                search={false}
                gridColumns={utils.getGridColumnByName("SurveyAttributeDefMCQ")}
                componentFunction={actionHandlers}
                gridData={surveyChoices}
                totalRecords={surveyChoices.length}
              />
            </div>
          </form>

        </div>}
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="btn-toolbar pull-right">
                  <button type="submit" className="btn btn-default"><i
                    className="fa fa-plus" />{' '}{utils.getLabelByID("Add")}
                  </button>
                </div>
              </div>
            </div></div></div>
      </div>
      <br />
    </form >
  )
};
export default SurveyAttributeDefinition;
