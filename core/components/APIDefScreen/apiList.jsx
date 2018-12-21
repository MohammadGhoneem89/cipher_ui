/*standard imports*/
import React, { PropTypes } from 'react';

import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/generalAction';
import Portlet from '../../common/Portlet.jsx';

import Table from '../../common/Datatable.jsx';
import BarChartExceptions from '../../common/barChart.jsx'
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';

class ApiList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchCriteria: "",
            // currentPageNo: 1,
            APIPayloadID: undefined,
            typeData: undefined,
            actions: undefined,
            pageData: {
                pageSize: 10,
                currentPageNo: 1,
                totalRecords: 25
            },
            isLoading: true,
        }

        this.pageChanged = this.pageChanged.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.getRequest = this.getRequest.bind(this);
        this.renderPopupBody = this.renderPopupBody.bind(this);
        // this.generateChaincode = this.generateChaincode.bind(this);
        this.b64EncodeUnicode = this.b64EncodeUnicode.bind(this);
    }
    renderPopupBody(dataID) {
        this.setState({ APIPayloadID: dataID })
    }
    b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }
    generateChaincode = () => {

        let searchCriteriaEncode = this.b64EncodeUnicode(JSON.stringify(this.state.searchCriteria));
        console.log(searchCriteriaEncode)
        let link = constants.baseUrl + '/API/core/downloadChainCode?searchCriteria=' + searchCriteriaEncode + '&JWT=' + sessionStorage.token;
        console.log(link, "$$$$$$$$$$$$$$$$$$$$$$")
        return link;
    }


    getRequest({ searchCriteria, pageNo }) {
        if (searchCriteria) {
            Object.keys(searchCriteria).forEach((key) => (searchCriteria[key] === "") && delete searchCriteria[key]);
        }
        let request = {
            "action": "getApiListData",
            "searchCriteria": searchCriteria || this.state.searchCriteria,
            "page": {
                "pageSize": this.state.pageData.pageSize,
                "currentPageNo": pageNo || 1
            }
        };
        this.props.actions.generalProcess(constants.getApiListData, request);
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.ApiListData.data) {
            this.setState({
                ApiListData: nextProps.ApiListData.data,
                pageData: nextProps.ApiListData.pageData,
                isLoading: false
            });
        }
    }
    componentWillMount() {
    }
    searchCallBack(keyWord) {
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.getRequest({});
        this.setState({
            actions:
                [{
                    "value": "1002",
                    "type": "pageAction",
                    "label": "ADD",
                    "labelName": "COM_AB_Add",
                    "actionType": "PORTLET_LINK",
                    "iconName": "fa fa-plus",
                    "URI": "/APIDefScreen/NEWCASE/NEWROUTE",
                    "children": []
                }]
        })
    }
    formSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Array.from(formData.entries()).reduce((memo, pair) => ({
            ...memo,
            [pair[0]]: pair[1],
        }), {});
        this.getRequest({ searchCriteria: data });
        console.log(JSON.stringify(data), data);
    }

    pageChanged(pageNo) {
        if (pageNo) {
            let pageData = this.state.pageData;
            pageData.currentPageNo = pageNo;
            this.setState({ pageData });
            this.getRequest({ pageNo });
        }
    }
    clearFields = () => {
        this.formRef.reset();
    }

    render() {

        let _this = this;
        function useCaseSelected(e) {

            const useCase = e.target.value;
            if (useCase) {
                _this.setState({ searchFilters: { useCase } });
            }
            else {
                _this.setState({ searchFilters: "" });
            }
        }

        if (!this.state.isLoading) {
            return (
                <form className="form-horizontal" ref={(el) => this.formRef = el} encType='application/json' role="form" onSubmit={this.formSubmit}>
                    <div className="form-body">
                        <div className="row">
                            <div className="col-md-12 ">
                                <div className="portlet light bordered sdg_portlet">
                                    <div className="portlet-title">
                                        <div className="caption">
                                            <span className="caption-subject">{utils.getLabelByID("ApiListDataFilters")}</span></div>
                                        <div className="tools">
                                            <a href="javascript:;" className="collapse" data-original-title title> </a>
                                        </div>
                                    </div>
                                    <div className="portlet-body">
                                        <div className="form-body" id="ApiListData">
                                            <div className="row">
                                                <div className="col-md-12">

                                                    <div className="row">

                                                        <div className="col-md-6">
                                                            <div className="form-group col-md-4">
                                                                <label className="control-label">{utils.getLabelByID("AAU_UseCase")}</label>
                                                            </div>
                                                            <div className="form-group col-md-8">
                                                                <input type="text" className="form-control" name="useCase" id="useCase" onBlur={useCaseSelected} />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group col-md-4">
                                                                <label className="control-label">{utils.getLabelByID("AAU_Route")}</label>
                                                            </div>
                                                            <div className="form-group col-md-8">
                                                                <input type="text" className="form-control" name="route" id="route" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-actions right">
                                                        <div className="form-group col-md-12">
                                                            <div className="btn-toolbar pull-right">

                                                                <button type="submit" className="btn green" onClick={this.formSubmit.bind(this)}>{utils.getLabelByID("Search")} </button>
                                                                {"  "}
                                                                <button type="button" className="btn default" onClick={this.clearFields} >{utils.getLabelByID("Clear")}</button>
                                                                {this.props.ApiListData.data.searchResult &&
                                                                    <a type="button" className="btn green" href={this.generateChaincode()} download>{utils.getLabelByID("Generate_ChainCode")}
                                                                    </a>
                                                                }
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

                        <Portlet
                            title={utils.getLabelByID("ApiList")}
                            isPermissioned={true}
                            actions={this.state.actions}>
                            <Table fontclass=""
                                gridColumns={utils.getGridColumnByName("ApiListData")}
                                gridData={this.props.ApiListData.data.searchResult}
                                totalRecords={this.props.ApiListData.pageData.totalRecords}
                                searchCallBack={this.searchCallBack}
                                pageSize={this.state.pageData.pageSize}
                                pagination={true}
                                pageChanged={this.pageChanged}
                                export={false}
                                search={true}
                                activePage={this.state.pageData.currentPageNo} />
                        </Portlet>
                    </div>
                </form>
            );

        }
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

ApiList.propTypes = {
    ApiListData: PropTypes.object,
    children: PropTypes.object,

};

function mapStateToProps(state, ownProps) {
    console.log(state.app.ApiListData, "renderrrrrrrrrrrrrrr")
    return {
        ApiListData: state.app.ApiListData,

    };
}
function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}
ApiList.displayName = "ApiList";
export default connect(mapStateToProps, mapDispatchToProps)(ApiList);
