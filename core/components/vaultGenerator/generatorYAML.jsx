/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { browserHistory } from 'react-router';

import * as utils from '../../common/utils.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import Portlet from '../../common/Portlet.jsx';
import * as toaster from '../../common/toaster.js';
import * as requestCreator from '../../common/request.js';
import ReactJson from 'react-json-view';
import YAML from 'json-to-pretty-yaml'

class vault extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            templateName: "",
            isLoading: true,
            modalIsOpen: false,
            gridData: [],
            typeData: [],
            getTemplatesListView: [],
            ElementList: [],
            data: {}
        };
    }

    componentDidMount() {
        this.getDataById();
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Template_Type']));
        this.props.actions.generalProcess(constants.getTemplatesListView, { "typeName": "ConfigYaml" });
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.findAPITemplateById)) {
            this.setState({
                id: _.get(nextProps, 'findAPITemplateById._id', undefined),
                type: _.get(nextProps, 'findAPITemplateById.type'),
                name: _.get(nextProps, 'findAPITemplateById.name'),
                data: JSON.stringify(_.get(nextProps, 'findAPITemplateById.data'), 0, 2)
            });
        }
        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData,
                isLoading: false
            });
        }
        if (nextProps.getTemplatesListView.data) {
            this.setState({
                getTemplatesListView: nextProps.getTemplatesListView.data
            });
        }
        if (nextProps.ElementList.data) {
            this.setState({
                ElementList: nextProps.ElementList.data
            });
        }
        if (nextProps.ElementList.response) {
            this.setState({
                data: nextProps.ElementList.response
            });
        }

    }

    getDataById = () => {
        if (this.props.routeParams.id !== 'create') {
            this.setState({ isLoading: true });
            this.props.actions.generalProcess(constants.findAPITemplateById, this.props.routeParams);
        }
        else {
            this.setState({ isLoading: false });
        }
    };

    insertJson = () => {
        let flag = false;
        let request = { templateName: this.state.templateName };
        this.state.ElementList.forEach((element) => {
            let x = _.get(element, 'attributeDefaultValue', undefined)
            if (!x) {
                flag = true;
            } else {
                _.set(request, element.attributeName, x)
            }
        });
        if (flag === true || this.state.templateName === "") {
            alert("All Fields are required!");
            return;
        }

        console.log(JSON.stringify(request))
        this.props.actions.generalProcess(constants.generateConfig, request);

    };

    onChange = (e) => {
        let value = e.target.value;
        this.setState({
            [e.target.name]: value
        });
        this.props.actions.generalProcess(constants.getFieldsVault, { "id": value });
    };
    onChangeDyna = (e) => {
        let ElementList=this.state.ElementList

        let value = e.target.value;
        let x= parseInt(e.target.name)
        if(x>=-1){
            ElementList[x].attributeDefaultValue=value;
            this.setState({
                ElementList: ElementList
            });
        }  


    };
    back = () => {
        browserHistory.push('/apiTemplate');
    };

    render() {
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);

        return (
            <div>
                <Portlet title={''}>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <div className="col-md-4">
                                        <label className="label-bold">{utils.getLabelByID("Select Template")}</label>
                                    </div>
                                    <div className="col-md-8">
                                        <select id="templateName" name="templateName" onChange={this.onChange} className="form-control" >
                                            <option value="">--select--</option>
                                            {this.state.getTemplatesListView.map((option, index) => {
                                                return (
                                                    <option key={index} value={option.value}>{option.text}</option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{ display: this.state.templateName ? "block" : "none" }}>
                                {this.state.ElementList.map((option, index) => {
                                    return (
                                        <div key={index} className="form-group  col-md-6">
                                            <div className="col-md-4">
                                                <label className="label-bold">{utils.getLabelByID(_.startCase(option.displayName))}</label>
                                            </div>
                                            <div className="col-md-8">
                                                <input type="text" className="form-control ekycinp" name={index}
                                                    value={this.state.ElementList[index].attributeDefaultValue}
                                                    onChange={this.onChangeDyna} />
                                            </div>
                                        </div>)
                                })}

                            </div>

                        </div>
                    </div>

                    <div className="row" style={{ display: this.state.templateName ? "block" : "none" }}>
                        <div className="form-group col-md-12">

                            {/* <div className="col-md-12">
                                <label className="label-bold">{utils.getLabelByID("Final Config")}</label>
                                <pre><ReactJson name={utils.getLabelByID("Output JSON")} src={this.state.data} /></pre>
                            </div> */}

                            <div className="col-md-12">
                                <label className="label-bold">{utils.getLabelByID("Final Config Yaml")}</label>
                                <pre>{YAML.stringify(this.state.data)}</pre>
                            </div>

                        </div>
                    </div>
                    <div className="row" style={{ display: this.state.templateName ? "block" : "none" }}>
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.insertJson}>{utils.getLabelByID("Generate")}</button>{"  "}
                                    <button type="button" className="btn default" onClick={this.back}>{utils.getLabelByID("Back")} </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Portlet>

            </div>
        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        findAPITemplateById: _.get(state.app, 'findAPITemplateById.data', {}),
        getTemplatesListView: state.app.getTemplatesListView,
        typeData: state.app.typeData.data,
        ElementList: state.app.ElementList,
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}

vault.displayName = "Generate Vault Config";
export default connect(mapStateToProps, mapDispatchToProps)(vault);
