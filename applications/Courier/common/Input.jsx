import React from 'react';
import ReactDOM from 'react-dom';
import * as utils from './utils';

class Input extends React.Component {
    constructor(props) {
        super(props)
        console.log('props form', this.props)
    }
    getColour(status="") {
        switch (status) {
            case "ACCEPTED":
                return "form-group has-success"
            case "PENDING":
                return "form-group has-warning"
            case "REJECTED":
                return "form-group has-error"
            default:
                return "form-group"
        }
    }
    render() {
        return (
            <div className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>
                <input type={this.props.type ? this.props.type : "text"} name={this.props.fieldname} disabled={this.props.disabled || false} value={this.props.value || _.get(this.props.state, `${this.props.formname}.${[this.props.fieldname]}`, "")} style={this.props.style ? this.props.style : {}} className={'form-control'}
                    onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'textbox')} />
            </div>
        );
    }
}

export default Input;