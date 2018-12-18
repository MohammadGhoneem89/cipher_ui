/*standard imports*/
import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ReactToPrint from "react-to-print";
import * as actions from '../../actions/generalAction';
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import APIDocExport from './APIDocExport.js';
import * as toaster from '../../common/toaster.js';



class APIDocumentation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            useCases : [],
            orgTypes : [],
            APIListData : [],
            useCase : null
        }
    }

    componentWillMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['UseCase']));
        this.props.actions.generalProcess(constants.getEntityList, requestCreator.createEntityListRequest({
            currentPageNo: 1,
            pageSize: 1000
        }));
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    getTypeData = (UCtypeData,entityTypeData) => {
        if(UCtypeData && entityTypeData){
            this.setState({
                useCases : _.get(UCtypeData,'data.UseCase',[]),
                orgTypes : entityTypeData
            })
        }
    };

    componentWillReceiveProps(nextProps){
        if(nextProps.typeData){
            this.getTypeData(nextProps.typeData,nextProps.entityList);
        }
    }

    openDownloadWindow(type) {
        let useCase = $("#useCase").val() == null ? "" : $("#useCase").val();
        let orgTypes = $("#orgTypes").val() == null ? "" : $("#orgTypes").val();
        console.log(useCase);
        console.log(orgTypes);
        let searchCriteria = {};
        let url;
        if (_.isEmpty(useCase) || _.isEmpty(orgTypes)){
            toaster.showToast("UseCase and Organization must be provided", "ERROR");
        }else{
            searchCriteria.useCase = useCase;
            searchCriteria.orgTypes = orgTypes;
            searchCriteria.useCaseLabel = this.getUseCaseLabel(this.state.useCases, useCase);
            searchCriteria.entityLabel = this.getEntityLabel(this.state.orgTypes, orgTypes);

            let gridType = "getActiveAPIs";
            if (searchCriteria) {
                searchCriteria = JSON.stringify(searchCriteria);
                searchCriteria = b64EncodeUnicode(searchCriteria);
            }
            url = constants.baseUrl + '/export/Export?searchCriteria=' + searchCriteria + '&gridType=' + gridType + '&type=' + type + '&JWT=' + sessionStorage.token;
            url = url.replace('amp', '');
            window.open(url,'_blank');
        }

        function b64EncodeUnicode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
        }
    };

    getUseCaseLabel = (typeData,code) => {
        let label;
        for(let obj of typeData){
            if(obj.value === code){
                label = obj.label;
            }
        }
        return label;
    };

    getEntityLabel = (typeData,code) => {
        let label;
        for(let obj of typeData){
            if(obj.value === code){
                label = obj.label;
            }
        }
        return label;
    };

    render() {

            return (
                <div>
                    <div className="row">
                        <div className="row">
                            <div className="form-group col-md-6">
                                <label className="form-group control-label col-md-4">{utils.getLabelByID("UseCase")}</label>
                                <select name="useCase" id="useCase" className="form-control">
                                    <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                    {this.state.useCases.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>{option.label}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className="form-group col-md-6">
                                <label className="form-group control-label col-md-4">{utils.getLabelByID("Organization")}</label>
                                <select name="orgTypes" id="orgTypes" className="form-control">
                                    <option key="-1" value="">{utils.getLabelByID("RA_Select")} </option>
                                    {this.state.orgTypes.map((option, index) => {
                                        return (
                                            <option key={index} value={option.value}>{option.label}</option>
                                        );
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <div className="btn-toolbar pull-right">
                                        <button onClick={() => this.openDownloadWindow('pdf')}>
                                            <i className="fa fa-file-code-o"/>XML
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );

    }
}


function mapStateToProps(state, ownProps) {

    let apiListData = _.get(state.app, 'getActiveAPIs.data.WASL', []);
    let entityList = _.get(state.app, 'entityList.data.typeData.entityNames', []);

    return {
        typeData : state.app.typeData,
        ApiListData : apiListData,
        route : ownProps.params.route,
        entityList: entityList,
    };
}

function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
APIDocumentation.displayName = "API Documentation";
export default connect(mapStateToProps, mapDispatchToProps)(APIDocumentation);