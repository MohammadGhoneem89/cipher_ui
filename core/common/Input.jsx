import React from 'react';
import ReactDOM from 'react-dom';
import * as utils from './utils';

class Input extends React.Component {
    constructor(props) {
        super(props)
        //console.log('props form', this.props)
    }

    getColour(status = "") {
        switch (status) {
            case "ACCEPTED":
                return "form-group has-success"
            case "PENDING":
                return "form-group has-warning"
            case "REJECTED":
                return "form-group has-error"
            case "ERROR":
                return "form-group has-error"
            default:
                return "form-group"
        }
    }

    render() {
        // {console.log(this.props.type,"this.props.type")}
        return (

            <div className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>
                {/* {console.log(this.props.type,"this.props.type")} */}
                <input type={this.props.type ? this.props.type : "text"}
                    name={this.props.fieldname}
                    min={this.props.min ? this.props.min : 0}
                    disabled={this.props.disabled || false}
                    value={this.props.value ||
                        _.get(this.props.state, `${this.props.formname}.${[this.props.fieldname]}`, "")}
                    style={this.props.style ? this.props.style : {}}
                    className={this.props.className}
                    onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'textbox')}
                    placeholder={this.props.placeholder}
                />

                <div id="passwd" className="user-pwd" style={{ color: 'red', fontStyle: 'italic', width: 'auto', fontSize: '12px', position: 'absolute' }}>

                    {this.props.fieldname != "password" && (this.props.state.errors && this.props.state.errors[this.props.fieldname]) && <span className="help-block">{this.props.state.errors[this.props.fieldname]}</span>}
                    {this.props.fieldname != "password" && (this.props.state.errors && this.props.state.errors.errors && this.props.state.errors.errors[this.props.fieldname]) && <span className="help-block">{this.props.state.errors.errors[this.props.fieldname].message}</span>}

                    {this.props.fieldname != "password" && (this.props.state.errors && this.props.state.errors[this.props.fieldname]) && <i style={this.props.errorIconStyle} className="fa fa-exclamation-triangle" />}
                    {this.props.fieldname != "password" && (this.props.state.errors && this.props.state.errors.errors && this.props.state.errors.errors[this.props.fieldname]) && <i style={this.props.errorIconStyle} className="fa fa-exclamation-triangle" />}
                </div>

            </div>
        );
    }
}

export default Input;