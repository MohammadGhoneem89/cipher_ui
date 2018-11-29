import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';

import * as actions from '../../../actions/generalAction';
import * as utils from '../../../common/utils.js';
import {DataList, TextArea, TextInput} from '../../../common/FormControls.jsx';



const SmartContractUpload = props => {
    const {handleSubmit} = props;
    let name = [{label : "kashan", value : "kashan"},{label : "Mir", value : "Mir"}];

    return (
        <form autoComplete="off" role="form" onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Channel Name")}</label>
                            </div>
                            <div className="form-group col-md-8" style={{marginLeft : "-204px"}}>
                                <DataList
                                    name="channelName"
                                    list={"channelName"}
                                    options={name}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Smart Contract Name")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <TextInput name="subjectEng"
                                           type="text"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Smart Contract Version")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <TextInput name="subjectEng"
                                           type="text"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <TextArea id="endorsementPolicy" label={"Endorsement Policy"} />
                    </div>
                    <div className="col-md-12">
                        <TextArea id="privateCollection" label={"Private Collection"} />
                    </div>
                    <div className="col-md-12">
                        <TextArea id="indexInformation" label={"Index Information"} />
                    </div>
                    <div className="col-md-12">
                        <TextArea id="parameters" label={"Parameters"} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8">
                        <TextArea id="creationStatus" label={"Creation status"} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button type="button" className="btn default">
                                    Install
                                </button>
                                <button type="button" className="btn default">
                                    Instantiate
                                </button>
                                <button type="button" className="btn default">
                                    Upgrade
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};


export default reduxForm({
    form: 'SmartContractUpload', // a unique identifier for this form
})(SmartContractUpload);

