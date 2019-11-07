import React from 'react';
import ReactDOM from 'react-dom';
import * as utils from './utils';

class Checkbox extends React.Component {

    render() {
        return (

            <div className={`col-md-${this.props.columns}`}>

                <label key={1} className="mt-checkbox mt-checkbox-outline"
                    style={{ marginBottom: "0px", marginTop: "0px" }}>
                    <input type="checkbox" className="form-control"
                        name={this.props.fieldname}
                        checked={this.props.value}
                        onChange={this.props.actionHandler.bind(this, this.props.formname,
                            this.props.fieldname, 'checkbox')} />
                    <span></span>
                </label>

            </div>
        );
    }
}

export default Checkbox;