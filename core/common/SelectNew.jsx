import React from 'react';
import * as utils from './utils.js';
class ComboBoxNew extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.emptyState = this.emptyState.bind(this);
    }
    prepareOptions = (selectObject) => {
        let options = [];
        for (let [index, optionValue] of selectObject.entries()) {
            if (this.props.allowValue) {
                options.push(<option key={this.props.fieldname + index} value={optionValue.value}>{optionValue.label}</option>)
            } else {
                options.push(<option key={this.props.fieldname + index}>{optionValue.label}</option>)
            }
        }
        return options;
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
    emptyState(field) {
       console.log(field);
        document.getElementById(field).value= '';
        let obj = {
            target: {
                value: '',
                name: field
            }
        }
        this.props.actionHandler(this.props.formname, this.props.fieldname, 'combobox', obj);
        
    }

    render() {
        return (
            <div style={this.props.divStyle ? this.props.divStyle : {}} className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>


                <input
                    id={this.props.fieldname} name={this.props.fieldname}
                    onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'combobox')}
                    className="form-control"
                    disabled={this.props.disabled ? true : false}
                    value={this.props.selected || _.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, "")}
                    type="text" list={`id_${this.props.fieldname}`}
                    autoComplete={'off'}
                    style={this.props.style ? this.props.style : {}}
                    className={this.props.className ? this.props.className : ''}
                    placeholder={this.props.placeholder ? this.props.placeholder : ''}
                />
                {_.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, "") && this.props.removeOption ? <span onClick={this.emptyState.bind(this, this.props.fieldname)} style={sessionStorage.getItem('lang') == 'EN' ? 
                {
                   position: 'absolute',
                   right: '15px',
                   bottom: '7px',
                   fontSize: '14px',
                   fontWeight: 500,
                   color: '#cac8c8',
                   zIndex: 9999,
                   background: 'white',
                   border: '1px solid',
                   borderRadius: '20px!important',
                   width: '20px',
                   height: '20px',
                   textAlign: 'center',
                   lineHeight: '19px',
                } : {
                    position: 'absolute',
                    left: '16px',
                    bottom: '7px',
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#cac8c8',
                    zIndex: 9999,
                    background: 'white',
                    border: '1px solid',
                    borderRadius: '20px!important',
                    width: '20px',
                    height: '20px',
                    textAlign: 'center',
                    lineHeight: '19px',
                 } }>X</span> : ''}
                {(this.props.state.errors && this.props.state.errors[this.props.fieldname]) && <span className="help-block">{this.props.state.errors[this.props.fieldname]}</span>}
                {(this.props.state.errors && this.props.state.errors[this.props.fieldname]) && <i className={sessionStorage.getItem('lang') == 'EN' ? 'fa fa-exclamation-triangle right' : 'fa fa-exclamation-triangle left'} />
                }
                <datalist id={`id_${this.props.fieldname}`}>
                    {this.prepareOptions(_.get(this.props.dataSource, this.props.typeName, []))}
                </datalist >


            </div>
        );
    }
}

export default ComboBoxNew;
