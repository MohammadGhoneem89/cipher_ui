/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { browserHistory } from 'react-router';
import unescapejs from 'unescape-js';

import * as utils from '../../common/utils.js';
import * as actions from '../../actions/generalAction';
import * as constants from '../../constants/Communication.js';
import Portlet from '../../common/Portlet.jsx';
import * as toaster from '../../common/toaster.js';
import * as requestCreator from '../../common/request.js';
let initialState = {
    type: "",
    isLoading: true,
    modalIsOpen: false,
    gridData: [],
    typeData: [],
    data: ""
};
class APITemplateEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = _.cloneDeep(initialState)
    }

    componentDidMount() {
        this.getDataById();
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest(['Template_Type']));
    }

    componentWillReceiveProps(nextProps) {

        if (!_.isEmpty(nextProps.findAPITemplateById) && this.props.routeParams.id !== 'create') {
            let ctype = _.get(nextProps, 'findAPITemplateById.type');
            if (ctype == "ConfigYaml" || ctype == "text") {
                this.setState({
                    id: _.get(nextProps, 'findAPITemplateById._id', undefined),
                    type: _.get(nextProps, 'findAPITemplateById.type'),
                    name: _.get(nextProps, 'findAPITemplateById.name'),
                    data: _.get(nextProps, 'findAPITemplateById.data')
                });
            } else {
                this.setState({
                    id: _.get(nextProps, 'findAPITemplateById._id', undefined),
                    type: _.get(nextProps, 'findAPITemplateById.type'),
                    name: _.get(nextProps, 'findAPITemplateById.name'),
                    data: JSON.stringify(_.get(nextProps, 'findAPITemplateById.data'), 0, 2)
                });
            }
        }
        if (nextProps.typeData) {
            this.setState({
                typeData: nextProps.typeData,
                isLoading: false
            });
        }

    }

    getDataById = () => {
        if (this.props.routeParams.id !== 'create') {
            this.setState({ isLoading: true });
            this.props.actions.generalProcess(constants.findAPITemplateById, this.props.routeParams);
        }
        else {
            this.setState({
                isLoading: false,
                name: "",
                data: ""
            });
        }
    };

    insertJson = () => {
        let valid = true;
        let data;
        try {
            if (this.state.type == "ConfigYaml" || this.state.type == "text") {
                data = unescapejs(this.state.data)
            } else {
                data = JSON.parse(this.state.data)
            }
        }
        catch (err) {
            valid = false;
            toaster.showToast("JSON is not correct", "ERROR");
        }
        if (valid) {
            let json = {
                _id: _.get(this.state, 'id', undefined),
                data: data,
                name: this.state.name,
                type: this.state.type
            };
            if (this.props.routeParams.id !== 'create') {
                json.id = this.props.routeParams.id;
            }
            this.props.actions.generalProcess(constants.upsertAPITemplate, json);
        }

    };
    onChange = (e) => {
        let value = e.target.value;

        this.setState({
            [e.target.name]: value
        });

    };
    back = () => {
        browserHistory.push('/apiTemplate');
    };

    render() {
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);
        let data = _.get(this.state, 'data', '');
        return (
            <div>
                <Portlet title={''}>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <div className="col-md-6">
                                <label className="label-bold">{utils.getLabelByID("Name")}</label>
                                <input type="text" className="form-control ekycinp" name="name"
                                    value={_.get(this.state, 'name', '')}
                                    onChange={this.onChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="label-bold">{utils.getLabelByID("Type")}</label>
                                <select id="type" name="type" value={_.get(this.state, 'type', '')} onChange={this.onChange} className="form-control">
                                    <option value="">--Select--</option>
                                    {
                                        this.state.typeData.Template_Type && this.state.typeData.Template_Type.map((option, index) => {
                                            return (
                                                <option key={index} value={option.value}>{option.label}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-12">
                                <label className="label-bold">{utils.getLabelByID("API Payload")}</label>
                                <textarea type="text" className="form-control textareacipher" rows="18" name="data"
                                    value={unescapejs(this.state.data)}
                                    onChange={this.onChange} />
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.insertJson}>{utils.getLabelByID("Save")}</button>{"  "}
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
        typeData: state.app.typeData.data,
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}

APITemplateEdit.displayName = "API Template Edit";
export default connect(mapStateToProps, mapDispatchToProps)(APITemplateEdit);
