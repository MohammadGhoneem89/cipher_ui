import * as utils from './utils.js';
import { Select } from "antd";
import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';
import * as constants from '../constants/Communication.js';
import _ from 'lodash';
import * as requestCreator from './request.js';


class ComboboxChain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            viewBag: [],
            typeList: {},
            formList: []
        }
    }

    prepareOptions = (typename) => {
        let optionsList = _.get(this.state.typeList, elem, [])
        let options = [];
        optionsList.forEach((optionValue, index) => {
            options.push(<option key={typename + index} value={optionValue.value}>{optionValue.label}</option>)
        })
        return options;
    }
    onChangeLocal() {

    }

    componentWillReceiveProps(nextProps) {
        let typeList = this.state.typeList;
        let formList = this.state.formList;
        if (nextProps.typeData) {
            for (let key of nextProps.typeData) {
                _.set(typeList, key, nextProps.typeData[key]);
                formList.push(key);
            }
        }
        this.setState({
            typeList,
            formList
        })
    }
    componentDidMount() {
        this.props.actions.generalProcess(constants.getTypeData, requestCreator.createTypeDataRequest([this.props.typeName], 'typeDataChain')); // Org types (entities)
    }

    getColour(status = "") {
        switch (status) {
            case "OK":
                return "form-group has-success"
            case "WARNING":
                return "form-group has-warning"
            case "ERROR":
                return "form-group has-error"
            default:
                return "form-group"
        }
    }

    render() {

        let view = []
        this.state.formList.forEach((elem) => {
            view.push(
                <div className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>
                    <select
                        id={elem} name={elem}
                        className="form-control"
                        disabled={this.props.disabled ? true : false}
                        value={this.props.selected || _.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, "")}
                        type="text"
                        list={`id_${elem}`}
                        autoComplete={'off'}
                        style={this.props.style ? this.props.style : {}}
                        className={this.props.className ? this.props.className : 'form-control'}
                        placeholder={this.props.placeholder ? this.props.placeholder : ''}
                        onChange={this.onChangeLocal(this, this.props.formname, elem, 'combobox')}
                        multiple={this.props.multiple}
                    >
                        <option key="" value="">--select--</option>
                        {this.prepareOptions(elem)}
                    </select>
                </div>)
        })
        return (
            <div>
                {view}
            </div>
        );

    }
}
ComboboxChain.propTypes = {
    typeData: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        typeData: _.get(state.app, 'typeDataChain.data', undefined),
    };

}

function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxChain);
