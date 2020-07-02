import React from 'react';
import * as utils from './utils.js';
import {Select} from "antd";

class Combobox extends React.Component {

  prepareOptions = (selectObject) => {
    let options = [];
    for (let [index, optionValue] of selectObject.entries()) {

      options.push(<option key={this.props.fieldname + index} value={optionValue.value}>{optionValue.label}</option>)
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

  render() {
    if (!this.props.isDDL)
      return (
        <div className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>
          <input
            id={this.props.fieldname} name={this.props.fieldname}
            className="form-control"
            disabled={this.props.disabled ? true : false}
            value={this.props.selected || _.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, "")}
            type="text"
            list={`id_${this.props.fieldname}`}
            autoComplete={'off'}
            style={this.props.style ? this.props.style : {}}
            className={this.props.className ? this.props.className : 'form-control'}
            placeholder={this.props.placeholder ? this.props.placeholder : ''}
            onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'combobox', this.props.dataSource[this.props.typeName])}
          />
          {(this.props.state.errors && this.props.state.errors[this.props.fieldname]) &&
          <span className="help-block">{this.props.state.errors[this.props.fieldname]}</span>}
          {(this.props.state.errors && this.props.state.errors[this.props.fieldname]) &&
          <i style={this.props.errorIconStyle} className="fa fa-exclamation-triangle"/>
          }
          <datalist id={`id_${this.props.fieldname}`}>
            {this.prepareOptions(_.get(this.props.dataSource, this.props.typeName, []))}
          </datalist>


        </div>
      );
    else
      return (
        <div className={`col-md-${this.props.columns} ${this.getColour(this.props.status)}`}>
          <select
            id={this.props.fieldname} name={this.props.fieldname}
            className="form-control"
            disabled={this.props.disabled ? true : false}
            value={this.props.selected || _.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, "")}
            type="text"
            list={`id_${this.props.fieldname}`}
            autoComplete={'off'}
            style={this.props.style ? this.props.style : {}}
            className={this.props.className ? this.props.className : 'form-control'}
            placeholder={this.props.placeholder ? this.props.placeholder : ''}
            onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'combobox', this.props.dataSource[this.props.typeName])}
            multiple={this.props.multiple}
          >
            {(this.props.state.errors && this.props.state.errors[this.props.fieldname]) &&
            <span className="help-block">{this.props.state.errors[this.props.fieldname]}</span>}
            {(this.props.state.errors && this.props.state.errors[this.props.fieldname]) &&
            <i style={this.props.errorIconStyle} className="fa fa-exclamation-triangle"/>
            }
            <option key="" value="">--select--</option>
            {this.prepareOptions(_.get(this.props.dataSource, this.props.typeName, []))}
          </select>

        </div>
      );
  }
}

export default Combobox;