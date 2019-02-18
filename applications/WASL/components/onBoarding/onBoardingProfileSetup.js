/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../constants/appCommunication.js';
import * as requestCreator from '../../../../core/common/request.js';
import * as comm from '../../../../core/constants/Communication.js';

import ParamFilter from './paramFilter';

class onBoardingProfileSetup extends React.Component {
    constructor(props) {
        super(props);
        this.state = { UseCase : [], isLoading: true, OnBoardingDBType : [], profileTypeData : [], params : [], tables : [], details :{}};
    }
    componentWillMount() {
        if (!_.isEmpty(this.props.id)) {
            this.getDetailData();
        }
        this.getTypeData();
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.list) && (nextProps.detail._id === nextProps.id) && !_.isEmpty(nextProps.detail)) {
            this.setState({
                details: nextProps.detail,
                UseCase : nextProps.typeData.USE_CASE,
                OnBoardingDBType : nextProps.typeData.OnBoardingDBType,
                profileTypeData : nextProps.list,
                isLoading: false,
            });

        }
        if(!_.isEmpty(nextProps.list) && !_.isEmpty(nextProps.typeData)){
            this.setState({
                UseCase : nextProps.typeData.USE_CASE,
                OnBoardingDBType : nextProps.typeData.OnBoardingDBType,
                profileTypeData : nextProps.list,
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
            "searchCriteria" : {}
        }
        this.props.actions.generalProcess(comm.getTypeData, requestCreator.createTypeDataRequest(['USE_CASE','OnBoardingDBType']));
        this.props.actions.generalProcess(comm.getOnBoardingProStructList, query);
        this.setState({isLoading : true})
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
        let Params = this.getParamVal(this.state,this.state.params);

        let json = {
            data: {
                name: name,
                useCase: useCase,
                DBType : dbType,
                destinationDB : status,
                profile : profile,
                status : status,
                params : Params,
                tables : this.state.tables
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
        this.setState({
            [e.target.id] : e.target.value
        });
    };

    getParamVal = (state,param) => {
        let arr = [];
        if(state && param){
            for(let val of param){
                if(!_.isEmpty(this.state[val.name])){
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
        for(let obj of this.state.profileTypeData){
           if(obj.id === this.state.details._id){
               param = obj.params;
               table = obj.tables
               this.setState({
                   params : param,
                   tables : table,
                   details :{
                       [e.target.name] : e.target.value
                   }
               })
           }
        }
    }

    onChangeVal = (e) => {
       this.setState({
           details :{
               [e.target.name] : e.target.value
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
                                    <input type="text" className="form-control" name="name" id="name"
                                           value={this.state.details.name} onChange={this.onChangeVal}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <label className="control-label">{utils.getLabelByID("MAU_useCase")}</label>
                                </div>
                                <div className="form-group col-md-8">
                                    <select name="useCases" id="useCases" value={this.state.details.useCase} className="form-control" onChange={this.onChangeVal}>
                                        <option key="-1" value=''>{utils.getLabelByID("RA_Select")} </option>
                                        {this.state.UseCase.map((option, index) => {
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
                                    <input type="text" className="form-control" name="status" id="status"
                                           value={this.state.details.status} onChange={this.onChangeVal}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <label className="control-label">{utils.getLabelByID("Profile")}</label>
                                </div>
                                <div className="form-group col-md-8">
                                    <select name="profile" id="profile" value={this.state.details.profile} className="form-control" onChange={this.getProfileVal}>
                                        <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                        {this.state.profileTypeData.map((option, index) => {
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
                                           value={this.state.details.destinationDB} onChange={this.onChangeVal}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <label className="control-label">{utils.getLabelByID("DB Type")}</label>
                                </div>
                                <div className="form-group col-md-8">
                                    <select name="dbType" id="dbType" className="form-control" value={this.state.details.DBType} onChange={this.onChangeVal}>
                                        <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                        {this.state.OnBoardingDBType.map((option, index) => {
                                            return (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            );
                                        })}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!_.isEmpty(this.state.params) && <div className="portlet light bordered sdg_portlet">
                        <div className="portlet-title">
                            <div className="caption">
                                <span className="caption-subject">{utils.getLabelByID("Setup Params")}</span></div>
                            <div className="tools">
                                <a href="javascript:;" className="collapse" data-original-title title> </a>
                            </div>
                        </div>
                        <div className="row">
                            <ParamFilter params = {this.state.params} onParamChange={this.onParamChange}/>

                        </div>
                    </div>}


                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.save}>Save</button>
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
        list : state.app.getOnBoardingProStructList.data.searchResult,
        detail : state.app.getOnBoardingProfileDetail.data

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
onBoardingProfileSetup.displayName = "onBoarding Profile Setup";
export default connect(mapStateToProps, mapDispatchToProps)(onBoardingProfileSetup);
