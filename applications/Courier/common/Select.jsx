import React from 'react';

class Combobox extends React.Component {

    prepareOptions = (selectObject) => {
        let options = [];
        for (let [index, optionValue] of selectObject.entries()) {
            options.push(<option key={this.props.fieldname + index} value={optionValue.value}>{optionValue.label}</option>)
        }
        return options;
    }
    getColour(status="") {
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
        return (
            <div className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>
                <input
                    id={this.props.fieldname} name={this.props.fieldname}
                    onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'combobox')}
                    className="form-control"
                    disabled={this.props.disabled ? true : false}
                    // onClickCapture={this.clearValue.bind(this)}
                    value={this.props.selected || _.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, "")}
                    type="text" list={`id_${this.props.fieldname}`}
                    autoComplete = {'off'}
                />
                <datalist id={`id_${this.props.fieldname}`}>
                    <option key="Select" value="">Select</option>
                    {this.prepareOptions(_.get(this.props.dataSource, this.props.typeName, []))}
                </datalist >
            </div>
        );
    }
}

export default Combobox;
