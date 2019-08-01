import React from 'react';
import ReactDOM from 'react-dom';
import * as utils from './utils';

class Radio extends React.Component {
    prepareRadioCtrl = (radioObject) => {
        let options = []
        for (let [index, ctrlData] of radioObject.entries()) {
            console.log(_.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, ""))
            options.push(
                <label key={`${this.props.fieldname}-${index + 1}`} className="btn btn-transparent btn-md active pull-left text-left"> <input
                    type="radio"
                    value={ctrlData.value}
                    name={this.props.fieldname}
                    checked={_.get(this.props.state, `${this.props.formname}.${this.props.fieldname}`, "") == ctrlData.value ? true : false}
                    key={`${this.props.fieldname}-${index}`}
                    className="PostCSS pull-left"
                    disabled={this.props.disabled ? this.props.disabled : false}
                    onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'radiolist')} /> {ctrlData.label}</label>
            )
        }

        return options;
    }

    render() {
        console.log(this.props.formname)
        return (
            <div className={`col-md-${this.props.columns}`} style={{ paddingLeft: this.props.paddingLeft || "0px" }}>
                {this.prepareRadioCtrl(_.get(this.props.dataSource, this.props.typeName, []))}
            </div>
        );
    }
}

export default Radio;


