
import React from 'react';
// import Portlet from '../../../common/Portlet.jsx';
import * as utils from '../../../common/utils.js';
import FileUploader from '../../../common/FileUploader.jsx';
import Table from '../../../common/Datatable.jsx';
import { CheckboxInput, CheckboxList, DateInput, DropdownInput, TextInput } from '../../../common/FormControls.jsx';





const CreateConsortiumForm = ({ updateState, initState, onInputChangeUseCase, onInputChange, formSubmit, addParticipant, onInputParticapant, ActionHandlers, onInputChangeCbl }) => {

    return (
        <div className="form-body" >
            <div>
                <div className="row">
                    <div className="col-md-12 ">
                        <div className="portlet light bordered sdg_portlet">
                            <div className="portlet-title">
                                <div className="caption">
                                    <span className="caption-subject">{utils.getLabelByID("Consortium")}</span></div>
                                <div className="tools">
                                    <a href="javascript:;" className="collapse" data-original-title title> </a>

                                </div>
                            </div>
                            <div className="portlet-body" id="Consortium">
                                <div className="form-body ">

                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Consortium_Name")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <input className="form-control" name="ConsortiumName" value={initState.ConsortiumData.ConsortiumName} onChange={onInputChange} type="text"></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("Blockchain Type")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <select id="type" name="type" onChange={onInputChange} value={initState.ConsortiumData.type} className="form-control">
                                                    <option key="" value="">--select--</option>
                                                    {
                                                        initState.typeData.BLCHN_TYPE.map((option, index) => {
                                                            return (
                                                                <option key={index} value={option.value}>{option.label}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" >
                                        <label className="form-group control-label col-md-7 bold" style={{
                                            textAlign: "left",
                                            marginLeft: "6px"
                                        }}>{utils.getLabelByID("particapantDefinition")}</label>

                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("OrganizationName")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <select id="organizationName" name="organizationName" onChange={onInputParticapant} value={initState.ParticapantData.organizationName} className="form-control">
                                                    <option key="" value="">--select--</option>
                                                    {
                                                        initState.orgTypeList.map((option, index) => {
                                                            return (
                                                                <option key={index} value={option.value}>{option.label}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-4">
                                                <label className="control-label">{utils.getLabelByID("ParticapantType")}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <select id="particapantType" name="particapantType" onChange={onInputParticapant} value={initState.ParticapantData.particapantType} className="form-control">
                                                    <option key="" value="">--select--</option>
                                                    {
                                                        initState.typeData.PATRICIPANT_TYPE.map((option, index) => {
                                                            return (
                                                                <option key={index} value={option.value}>{option.label}</option>
                                                            );
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-actions right">
                                                <div className="form-group col-md-12">
                                                    <div className="btn-toolbar pull-right">
                                                        <button type="submit" className="btn btn-default" onClick={addParticipant}> <i className="fa fa-plus"></i> {"  "}{utils.getLabelByID("Add Participant")} </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label className="control-label bold">{utils.getLabelByID("Participants")}</label>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group col-md-12">
                                                <Table gridColumns={utils.getGridColumnByName("ParticipantsList")}
                                                    gridData={initState.participants}
                                                    fontclass=""
                                                    componentFunction={ActionHandlers}
                                                    pagination={false}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row" style={{marginTop:"20px"}}>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label className="control-label bold">{utils.getLabelByID("CM_useCase")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-12">
                                                    <div className="icheck-list">
                                                        {initState.typeData.UseCase.map((sd, index) => (
                                                            <label key={index} className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                                                                <label>{sd.label}</label>
                                                                <input type="checkbox" className="form-control" onChange={onInputChangeUseCase} name={"iscbList-" + index} id={"iscbList-" + index} checked={sd.isChecked && sd.isChecked === true ? true : false} />
                                                                <span></span>
                                                            </label>
                                                        ))
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{marginTop:"20px"}}>
                                        <div className="col-md-6">
                                            <div className="form-group col-md-12">
                                                <label className="control-label bold">{utils.getLabelByID("Channels")}</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-12">
                                                    <div className="icheck-list">
                                                        {initState.channelTypeList.length > 0 && initState.channelTypeList.map((sd, index) => (
                                                            <label key={index} className="mt-checkbox mt-checkbox-outline" style={{ marginBottom: "0px", marginTop: "0px" }}>
                                                                <label>{sd.label}</label>
                                                                <input type="checkbox" className="form-control" onChange={onInputChangeCbl} name={"iscbListChannel-" + index} id={"iscbListChannel-" + index} checked={sd.isChecked && sd.isChecked === true ? true : false} />
                                                                <span></span>
                                                            </label>
                                                        ))
                                                        }{
                                                            initState.channelTypeList.length == 0 &&
                                                            <div> <i style={{ color: "grey" }}>Please select particapants</i></div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-actions right">
                                            <div className="form-group col-md-12">
                                                <div className="btn-toolbar pull-right ">
                                                    <button type="submit" onClick={formSubmit} className="btn btn-info" > Save </button>
                                                </div>
                                            </div>
                                        </div>
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
export default CreateConsortiumForm