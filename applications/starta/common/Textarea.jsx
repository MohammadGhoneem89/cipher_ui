import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <div className={`col-md-${this.props.columns}`}>
                <textarea id={this.props.fieldname} name={this.props.fieldname} rows={this.props.rows}
                    cols={this.props.cols} className={'form-control'} value={this.props.value}
                     disabled={this.props.disabled}
                    onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'textarea')} >
                        {this.props.children}
                </textarea>
            </div>
        );
    }
}

export default Input;