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
        let optionsList = _.get(this.state.typeList, typename, [])
        let options = [];
        optionsList.forEach((optionValue, index) => {
            options.push(<option key={typename + index} value={optionValue.value}>{optionValue.label}</option>)
        })
        return options;
    }
    onChangeLocal(formname, fieldname, type, e) {
        if (type == "textbox" || type == "radiolist" || type == "combobox" || type == "textarea") {
            let value = e.target.value;
            let formdata = _.get(this.state, formname, {});
            _.set(formdata, e.target.name, value);
            this.setState({
                [formname]: formdata
            }, () => {
                // console.log('DATA-->', JSON.stringify(this.state[formname]));
            });
        } else if (type == "checklist") {
            let value = e.target.value;
            let checked = e.target.checked;
            let prevState = _.get(this.state, `${formname}.${fieldname}`, [])
            if (checked && prevState.indexOf(value) === -1) {
                prevState.push(value)
            } else {
                prevState.splice(prevState.indexOf(value), 1);
            }
            let formdata = _.get(this.state, formname, {});
            _.set(formdata, fieldname, prevState);


            this.setState({
                [formname]: formdata
            })

            console.log('formnam11e', (this.state[formname]));
            // });
        } else if (type == "checkbox") {
            let value = e.target.checked;
            let formdata = _.get(this.state, formname, {});

            _.set(formdata, e.target.name, value);
            this.setState({
                [formname]: formdata
            }, () => {
                console.log('formname', JSON.stringify(this.state[formname]));
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        let typeList = this.state.typeList;
        let formList = this.state.formList;
        if (nextProps.typeDataChain) {
            console.log(JSON.stringify(nextProps.typeDataChain))
            let object = Object.keys(nextProps.typeDataChain)
            object.forEach((key) => {
                _.set(typeList, key, nextProps.typeDataChain[key]);
                formList.push(key);
            });
        }

        console.log(JSON.stringify(typeList), JSON.stringify(formList))
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
        this.state.formList.forEach((elem, index) => {
            view.push(
                <div key={index} className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>
                    <select
                        id={elem} name={elem}
                        className="form-control"
                        disabled={this.props.disabled ? true : false}
                        value={this.props.selected || _.get(this.state, `${this.props.formname}.${this.props.fieldname}`, "")}
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
    typeDataChain: PropTypes.object,
    children: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        typeDataChain: _.get(state.app, 'typeDataChain.data', undefined),
    };

}

function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(ComboboxChain);
