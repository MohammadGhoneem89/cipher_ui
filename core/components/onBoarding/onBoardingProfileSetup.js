/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import * as utils from '../../common/utils.js';
import * as actions from '../../actions/generalAction';
import * as requestCreator from '../../common/request.js';
import * as comm from '../../constants/Communication.js';

import ParamFilter from './paramFilter';

class onBoardingProfileSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            UseCase: [], isLoading: true,
            OnBoardingDBType: [], status: [],
            profileTypeData: [], params: [],
            tables: [], details: {}, isEnabled: true
        };
    }
    componentWillMount() {
        console.log(this.props.id,"@@@@@@@@@@@@222")
        console.log(!_.isEmpty(this.props.id),"~~~~~~")
        if (!_.isEmpty(this.props.id)) {
            this.getDetailData();
        }
        this.getTypeData();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.list) && (nextProps.typeData) && (nextProps.detail._id === nextProps.id) && !_.isEmpty(nextProps.detail)) {
            console.log(nextProps.detail, "++++++++++++")
            this.setState({
                isEnabled: false,
                details: nextProps.detail,
                UseCase: nextProps.typeData.USE_CASE,
                OnBoardingDBType: nextProps.typeData.OnBoardingDBType,
                profileTypeData: nextProps.list,
                status: nextProps.typeData.onBoardingStatus,
                isLoading: false,
                params: nextProps.detail.params
            });

        }
        if (!_.isEmpty(nextProps.list) && !_.isEmpty(nextProps.typeData)) {
            this.setState({
                UseCase: nextProps.typeData.USE_CASE,
                OnBoardingDBType: nextProps.typeData.OnBoardingDBType,
                profileTypeData: nextProps.list,
                status: nextProps.typeData.onBoardingStatus,
                isLoading: false
            });
        }
    }


    getTypeData = () => {
        let query = {
            "action": "getOnBoardingProStructList",
            "page": {
                "currentPageNo": 1,
                "pageSize": 1000
            },
            "searchCriteria": {}
        }
        this.props.actions.generalProcess(comm.getTypeData, requestCreator.createTypeDataRequest(['USE_CASE', 'OnBoardingDBType', 'onBoardingStatus', 'profileTypedata']));
        this.props.actions.generalProcess(comm.getOnBoardingProStructList, query);
        this.setState({ isLoading: true })
    }

    getDetailData = () => {
        this.props.actions.generalProcess(comm.getOnBoardingDetail, {
            "action": "getOnBoardingProfileDetail",
            "data": {
                "id": this.props.id
            }
        });
    }

    save = () => {
        let name = $("#name").val() == null ? "" : $("#name").val();
        let useCase = $("#useCases").val() == null ? "" : $("#useCases").val();
        let status = $("#status").val() == null ? "" : $("#status").val();
        let profile = $("#profile").val() == null ? "" : $("#profile").val();
        let dbType = $("#dbType").val() == null ? "" : $("#dbType").val();
        let destinationDB = $("#destinationDB").val() == null ? "" : $("#destinationDB").val();
        let Params = this.getParamVal(this.state, this.state.params);

        let json = {
            data: {
                name: name,
                useCase: useCase,
                DBType: dbType,
                destinationDB: destinationDB,
                profile: profile,
                status: status,
                params: Params,
                tables: this.state.tables
            }
        };
        if (this.props.id) {
            json.data._id = this.props.id;
            this.props.actions.generalProcess(comm.updateOnBoarding, json);
        }
        else {
            this.props.actions.generalProcess(comm.insertOnBoarding, json);
        }
    };


    onParamChange = (e) => {
        console.log(e.target.value,"target valueeee")
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    getParamVal = (state, param) => {
        let arr = [];
        console.log("PARAM",param)
        if (state && param) {
            //console.log(param,"I AM PARAM --------------------------------")
            for (let val of param) {
                if (!_.isEmpty(this.state[val.name])) {
                    arr.push({
                        value: this.state[val.name],
                        name: val.name
                    });
                }
            }
        }
        return arr;
    };

    getProfileVal = (e) => {
        let param = [];
        let table = [];
        for (let obj of this.state.profileTypeData) {
            if (obj.id === this.state.details._id) {

                console.log(obj.params, "I AM PARAM --------------------------------")
                console.log("++++", obj.params, "+_++++++")
                param = obj.params;
                table = obj.tables
                this.setState({
                    params: param,
                    tables: table,
                    // details: {
                    //     [e.target.name]: e.target.value
                    // }
                })
            }
        }
    }

    onChangeVal = (e) => {
        console.log(e.target.value)
        this.setState({

            details: {
                [e.target.name]: e.target.value
            }
        })
    };

    render() {
        if (this.state.isLoading) {
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        }
        return (
            <div>
                <div className="portlet light bordered sdg_portlet">
                    <div className="portlet-title">
                        <div className="caption">
                            <span className="caption-subject">{utils.getLabelByID("On Boarding Setup")}</span></div>
                        <div className="tools">
                            <a href="javascript:;" className="collapse" data-original-title title> </a>
                        </div>
                    </div>
                    <div className="row">

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Name")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="name" id="name" disabled={this.state.isEnabled == false}
                                    value={this.state.details.name} onChange={this.onChangeVal}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("MAU_useCase")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="useCases" id="useCases" disabled={this.state.isEnabled == false}
                                    value={this.state.details.useCase}
                                    className="form-control" onChange={this.onChangeVal}>
                                    <option key="-1" value=''>{utils.getLabelByID("RA_Select")} </option>
                                    {console.log(this.state.UseCase)}
                                    {this.state.UseCase && this.state.UseCase.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>{option.label}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>

                    </div>


                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Status")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="status" id="status" className="form-control" disabled>
                                    {/* {console.log("|||||||", this.state.details.status)} */}
                                    {this.state.status.map((option, index) => {
                                        return (
                                            <option key={index}
                                                value={option.value} selected={this.state.details.status == option.value}>{option.label}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Profile")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="profile" id="profile" value={this.state.details.profile} className="form-control"
                                    onChange={this.getProfileVal} disabled={this.state.isEnabled == false}>
                                    <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                    {this.state.profileTypeData && this.state.profileTypeData.map((option, index) => {
                                        return (

                                            <option key={index} value={option._id}>{option.name}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("Destination DB")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <input type="text" className="form-control" name="destinationDB" id="destinationDB"
                                    value={this.state.details.destinationDB} 
                                    disabled={this.state.isEnabled == false}
                                    onChange={this.onChangeVal}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group col-md-4">
                                <label className="control-label">{utils.getLabelByID("DB Type")}</label>
                            </div>
                            <div className="form-group col-md-8">
                                <select name="dbType" id="dbType" className="form-control" 
                                disabled={this.state.isEnabled == false}
                                    value={this.state.details.DBType} onChange={this.onChangeVal}>
                                    <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                    {this.state.OnBoardingDBType && this.state.OnBoardingDBType.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>{option.label}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                {!_.isEmpty(this.state.params) && 
                <div className="portlet light bordered sdg_portlet">
                    <div className="portlet-title">
                        <div className="caption">
                            <span className="caption-subject">{utils.getLabelByID("Setup Params")}</span>
                        </div>
                        <div className="tools">
                            <a href="javascript:;" className="collapse" data-original-title title> </a>
                        </div>
                    </div>
                    <div className="row">
                        <ParamFilter params={this.state.params}  isEnabled = {this.state.isEnabled} onParamChange={this.onParamChange} />

                    </div>
                </div>}
                {/* {this.state.details.params 
                    && 
                    <div className="portlet light bordered sdg_portlet">
                        <div className="portlet-title">
                            <div className="caption">
                                <span className="caption-subject">{utils.getLabelByID("Setup Params")}</span>
                            </div>
                            <div className="tools">
                                <a href="javascript:;" className="collapse" data-original-title title> </a>
                            </div>
                        </div>
                        <div className="row">
                            <ParamFilter isEnabled = {this.state.isEnabled} params={this.state.details.params} />

                        </div>
                    </div>
                } */}


                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12">

                            <div className="btn-toolbar pull-right">
                                <button type="submit" className="btn green"
                                    onClick={this.save} disabled={this.state.isEnabled == false}>Save</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        id: _.get(ownProps.params, 'id', ''),
        typeData: state.app.typeData.data,
        list: state.app.getOnBoardingProStructList.data.searchResult,
        detail: state.app.getOnBoardingProfileDetail.data

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
onBoardingProfileSetup.displayName = "onBoarding Profile Setup";
export default connect(mapStateToProps, mapDispatchToProps)(onBoardingProfileSetup);
