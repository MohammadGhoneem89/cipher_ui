import React from 'react';

class Input extends React.Component {
    render() {
        return (
            <div className={`col-md-${this.props.columns}`} style={this.props.divStyle ? this.props.divStyle : {}}>
                <textarea style={{ ...this.props.style }} id={this.props.fieldname} name={this.props.fieldname} rows={this.props.rows}
                    cols={this.props.cols}
                    className={'form-control'}
                    placeholder={_.get(this.props, "placeholder", "")}
                    value={this.props.value ||
                        _.get(this.props.state, `${this.props.formname}.${[this.props.fieldname]}`, "")}
                    disabled={this.props.disabled}
                    onChange={this.props.actionHandler.bind(this, this.props.formname, this.props.fieldname, 'textarea')} >
                    {this.props.children}
                </textarea>
            </div>
        );
    }
}

export default Input;