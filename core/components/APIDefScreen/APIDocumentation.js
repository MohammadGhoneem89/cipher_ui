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
import axios from 'axios';

class APIDocumentation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            useCases: [],
            orgTypes: [],
            APIListData: [],
            useCase: null
        }
    }

    componentWillMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['UseCase', 'ORG_TYPES']));
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    getTypeData = (UCtypeData) => {
        if (UCtypeData) {
            this.setState({
                useCases: _.get(UCtypeData, 'data.UseCase', []),
                orgTypes: _.get(UCtypeData, 'data.ORG_TYPES', [])
            })
        }
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.typeData) {
            this.getTypeData(nextProps.typeData);
        }
    }
    getRequest() {
        let useCase = document.getElementById('useCase') == null ? "" : document.getElementById('useCase').value;

        var searchCriteria = {}

        if (useCase != "")
            searchCriteria.useCase = useCase

        this.setState({ searchFilters: searchCriteria })

        var request = {
            "action": "mappingData",
            searchCriteria,
            "page": {
                "currentPageNo": 1,
                "pageSize": 10
            }
        }
        this.setState({ currentPageNo: 1 })

        return request;
    }
    getApisList() {
        this.props.actions.generalAjxProcess(constants.getApiListData, this.getRequest()).then(res => {
            
            const headers = {
                'Content-Type': 'application/json',
                'token': sessionStorage.getItem('token')
            };
            let body = {
                templatePayload: {
                    data: res.ApiListData.data.searchResult
                }
            };

            body.templatePayload.templateId = "Let_059b3700-b554-11ea-8c61-ef43ff7b9999";
            body.templatePayload.template = {}
            body.templatePayload.template.templateId = "Let_059b3700-b554-11ea-8c61-ef43ff7b9999";
            body.templatePayload.template.templatePath = "../templates/apiTemplate.js"
            body.templatePayload.template.filePath = "/av-persistance/SAGP/SAGP-files"
            body.templatePayload.template.outputFileName = "api_documentation"
            body.templateName = "api_documentation"

            this.setState({ body: body })

            axios.post(constants.apiDocumentationLetter, body, {
                responseType: 'arraybuffer',
                headers: headers
            })
                .then(res => {
                    this.setState({
                        isLoading: false
                    })
                    const url = window.URL.createObjectURL(new Blob([res.data]
                        , { type: "application/pdf" }))
                    var link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', this.state.body.templateName + '.pdf');
                    document.body.appendChild(link);
                    link.click();
                })


        });
    }
    openDownloadWindow(type) {
        let useCase = $("#useCase").val() == null ? "" : $("#useCase").val();
        let orgTypes = $("#orgTypes").val() == null ? "" : $("#orgTypes").val();
        let searchCriteria = {};
        let url;
        if (_.isEmpty(useCase)) {
            toaster.showToast("UseCase must be provided", "ERROR");
        } else {
            searchCriteria.useCase = useCase;
            searchCriteria.orgTypes = orgTypes == '-1' ? '' : orgTypes;
            searchCriteria.useCaseLabel = this.getUseCaseLabel(this.state.useCases, useCase);
            searchCriteria.entityLabel = orgTypes == '' ? '' : this.getEntityLabel(this.state.orgTypes, orgTypes);

            console.log('orgTypes', orgTypes)
            let gridType = "getActiveAPIs";
            if (searchCriteria) {
                searchCriteria = JSON.stringify(searchCriteria);
                searchCriteria = b64EncodeUnicode(searchCriteria);
            }
            url = constants.reportUrl + '/export/Export?searchCriteria=' + searchCriteria + '&gridType=' + gridType + '&type=' + type + '&JWT=' + sessionStorage.token;
            url = url.replace('amp', '');
            window.open(url, '_blank');
        }

        function b64EncodeUnicode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
                function toSolidBytes(match, p1) {
                    return String.fromCharCode('0x' + p1);
                }));
        }
    };

    getUseCaseLabel = (typeData, code) => {
        let label;
        for (let obj of typeData) {
            if (obj.value === code) {
                label = obj.label;
            }
        }
        return label;
    };

    getEntityLabel = (typeData, code) => {
        let label;
        for (let obj of typeData) {
            if (obj.value === code) {
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
                                    <button type="submit" className="btn green" onClick={() => this.getApisList()}>Generate</button>
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

    return {
        typeData: state.app.typeData,
        ApiListData: apiListData,
        route: ownProps.params.route
    };
}

function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
APIDocumentation.displayName = "API Documentation";
export default connect(mapStateToProps, mapDispatchToProps)(APIDocumentation);
