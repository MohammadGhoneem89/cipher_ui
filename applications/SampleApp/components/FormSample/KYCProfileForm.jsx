/*standard imports*/
import React, { PropTypes } from 'react';
import $ from 'jquery';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as utils from '../../../../core/common/utils.js';
import DateControl from '../../../../core/common/DateControl.jsx'
import Table from '../../../../core/common/Datatable.jsx';
import SurveyAttributeDefinition from './SurveyAttributeDefinition.jsx'

const KYCProfileForm = ({ postBlockChain, onSubmit, initialValues = {}, parent }) => {
  let attributes = parent.state.attributes || initialValues.attributes || [];
  let survey = parent.state.survey || initialValues.survey || [];


  function addAttribute(e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);

    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});

    data.isRequired = !!data.isRequired; //Checkbox value requirement
    let items = parent.state.attributes || [];
    items.push(data);
    console.log(JSON.stringify(items));
    parent.setState({ attributes: items });
  }


  function addSurvey(e) {
    e.preventDefault();
    e.stopPropagation();
    const formData = new FormData(e.target);
    const data = Array.from(formData.entries()).reduce((memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }), {});
    data.attributeExpiry = !!data.attributeExpiry; //Checkbox value requirement
    data.choices = parent.state.surveyChoices;
    let items = parent.state.survey || [];
    items.push(data);
    parent.setState({ survey: items, surveyChoices: undefined });
  }

  function actionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Delete":
        if (index > -1) {
          let attributes = parent.state.attributes;
          attributes.splice(index, 1);
          parent.setState(attributes);
        }
        break;
    }
  }

  function surveysActionHandlers({ actionName, index }) {
    switch (actionName) {
      case "Delete":
        if (index > -1) {
          let survey = parent.state.survey;
          survey.splice(index, 1);
          parent.setState(survey);
        }
        break;
    }
  }

  return (

    <Portlet title={utils.getLabelByID("eKYC_KYCProfileDetail")}>
      <form className="form-horizontal" encType='application/json' role="form" onSubmit={onSubmit}>
        <div className="form-body">
          <div className="row">
            <div className="col-md-12 ">
              {/*Profile Name*/}

              <div className="form-group col-md-6">
                <div className="col-md-4">
                  <label className="label-bold">{utils.getLabelByID("Profile Name")}</label>
                </div>
                <div className="col-md-8">
                  <input name="profileName" className="form-control ekycinp" defaultValue={initialValues.profileName} />
                </div>
              </div>


              {/*Sector*/}

              <div className="form-group col-md-6">
                <div className="col-md-4">
                  <label className="label-bold">{utils.getLabelByID("Sector")}</label>
                </div>
                <div className="col-md-8">
                  <select name="sector" className="form-control ekycinp">
                    <option value="">{utils.getLabelByID("RA_Select")}</option>
                    {parent.state.typeData.KYC_PROFILE_SECTORS.map((item, key) => {
                      return <option value={item.value} key={key} selected={initialValues.sector === item.value ? "selected" : ""}>{item.label}</option>
                    })}
                  </select>
                </div>
              </div>



              {/*Country*/}
              <div className="form-group col-md-6">
                <div className="col-md-4">
                  <label className="label-bold">{utils.getLabelByID("Country")}</label>
                </div>
                <div className="col-md-8">
                  <select name="country" className="form-control ekycinp">
                    <option value="">{utils.getLabelByID("RA_Select")}</option>
                    {parent.state.typeData.KYC_PROFILE_COUNTRY.map((item, key) => {
                      return <option value={item.value} key={key} selected={initialValues.sector === item.value ? "selected" : ""}>{item.label}</option>
                    })}
                  </select>
                </div>
              </div>

              {/*Profile Type*/}
              <div className="form-group col-md-6">
                <div className="col-md-4">
                  <label className="label-bold">{utils.getLabelByID("Profile Type")}</label>
                </div>
                <div className="col-md-8">
                  <select name="profileType" className="form-control ekycinp">
                    <option value="">{utils.getLabelByID("RA_Select")}</option>
                    {parent.state.typeData.KYC_PROFILE_TYPE.map((item, key) => {
                      return <option value={item.value} key={key} selected={initialValues.sector === item.value ? "selected" : ""}>{item.label}</option>
                    })}
                  </select>
                </div>
              </div>

              {/*Active*/}

              <div className="form-group col-md-6">
                <div className="col-md-4">
                  <label className="label-bold">{utils.getLabelByID("Active")}</label>
                </div>
                <div className="form-group col-md-8">
                  <div className="icheck-list">
                    <label className="mt-checkbox mt-checkbox-outline" style={{ marginLeft: "15px", marginTop: "0px" }}>
                      <label></label>
                      <input type="checkbox" className="form-control ekycinp" name="isActive" value="" checked={initialValues.isActive} />
                      <span></span>
                    </label>
                  </div>
                </div>
              </div>


            </div>
          </div>
          <div className="col-md-12 " >
            <AttributeForm onSubmit={addAttribute} initialValues={initialValues} parent={parent} />


            <div className="col-md-12" style={{ paddingRight: "60px" }}>
              {attributes.map(item => {
                item.viewName = item.alias.split('-')[0];
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
                gridColumns={utils.getGridColumnByName("kycProfileElements")}
                componentFunction={actionHandlers}
                gridData={attributes}
                totalRecords={attributes.length}
              />
            </div>
          </div>
          <SurveyAttributeDefinition onSubmit={addSurvey} initialValues={initialValues} parent={parent} />
          <div className="col-md-12" style={{ paddingRight: "50px" }}>
            <div className="col-md-12">
              {survey.map(item => {
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
                gridColumns={utils.getGridColumnByName("KYCSurveyList")}
                componentFunction={surveysActionHandlers}
                gridData={survey}
                totalRecords={survey.length}
              />
            </div>
          </div>

          <div className="row" style={{ marginTop: "2%" }}>
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="col-md-12">
                  <div className="btn-toolbar pull-right">
                    <a type="submit" className="btn btm-default" style={{marginTop:"3px"}} onClick={postBlockChain} disabled={!parent.state.attributesType}>
                    <i className="fa fa-plus" />{' '}{utils.getLabelByID("Post On Blockchain")}</a>
                    <button className="btn green" >
                      <i className="fa fa-paper-plane" />{' '}{utils.getLabelByID("Submit")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Portlet>);
};


const AttributeForm = ({ postBlockChain, onSubmit, initialValues, parent }) => {
  return <form className="form-horizontal" encType='application/json' role="form" onSubmit={onSubmit}>
    <div className="row" style={{ marginTop: "2%" }}>
      <div className="col-md-12">
        <label className="form-group control-label col-md-12 uppercase" style={{
          textAlign: "left",
          fontWeight: "bold"
        }}>{utils.getLabelByID("Attribute Association")}</label>
      </div>
      <br />
      <br />
      {/*Type*/}
      <div className="form-group col-md-6">
        <div className="col-md-4">
          <label className="label-bold">{utils.getLabelByID("Type")}</label>
        </div>
        <div className="col-md-8">
          <select name="type" className="form-control ekycinp" onChange={(e) => {
            parent.setState({ attributesType: e.target.value });
          }}>
            <option value="">{utils.getLabelByID("RA_Select")}</option>
            {parent.state.typeData.KYC_PROFILE_ASSOCIATION_TYPE.map((item, key) => {
              return <option value={item.value} key={key}>{item.label}</option>
            })}
          </select>
        </div>
      </div>

      {/*alias - Attribute*/}





      {parent.state.attributesType === "Attribute" &&
        <div className="form-group col-md-6">
          <div className="col-md-4">
            <label className="label-bold">{utils.getLabelByID("Attribute")}</label>
          </div>
          <div className="col-md-8">
            <select name="alias" className="form-control ekycinp">
              <option value="">{utils.getLabelByID("RA_Select")}</option>
              {parent.state.typeData.attributeList.map((item, key) => {
                return <option value={item.label + "-" + item.value} key={key}>{item.label}</option>
              })}
            </select>
          </div>
        </div>}

      {/*alias - Group*/}





      {parent.state.attributesType === "Group" &&

        <div className="form-group col-md-6">
          <div className="col-md-4">
            <label className="label-bold">{utils.getLabelByID("Group")}</label>
          </div>
          <div className="col-md-8">
            <select name="alias" className="form-control ekycinp" defaultValue={""}>
              <option value="">{utils.getLabelByID("RA_Select")}</option>
              {parent.state.typeData.attributeGroupList.map((item, key) => {

                return <option value={item.label + "-" + item.value} key={key}>{item.label}</option>
              })}
            </select>
          </div>
        </div>}


      {/*Section Name*/}
      <div className="form-group col-md-6">
        <div className="col-md-4">
          <label className="label-bold">{utils.getLabelByID("Section Name")}</label>
        </div>
        <div className="col-md-8">
          <input name="section" className="form-control ekycinp" />
        </div>
      </div>

      {/*Document Required*/}

      <div className="form-group col-md-6">
        <div className="col-md-4">
          <label className="label-bold">{utils.getLabelByID("Required")}</label>
        </div>
        <div className="form-group col-md-8">
          <div className="icheck-list">
            <label className="mt-checkbox mt-checkbox-outline" style={{ marginLeft: "15px", marginTop: "0px" }}>
              <label></label>
              <input type="checkbox" className="form-control ekycinp" name="isRequired" value="true" />
              <span></span>
            </label>
          </div>
        </div>
      </div>


      <div className="col-md-12">
        <div className="col-md-12">
          <div className="col-md-12">
            <div className="col-md-12">
              <div className="col-md-12">
                <div className="btn-toolbar pull-right">

                  <button type="submit" className="btn green" disabled={!parent.state.attributesType}><i
                    className="fa fa-plus" />{' '}{utils.getLabelByID("Add")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
};




export default KYCProfileForm;


