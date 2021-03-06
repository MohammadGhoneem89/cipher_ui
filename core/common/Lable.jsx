import React from 'react';

class Lable extends React.Component {

    render() {
        return (
            <div className={`col-md-${this.props.columns || 12}`} style={{ ...this.props.divStyle }}>

                <label style={{ ...this.props.style, wordWrap: "inherit" }} className={this.props.className ? this.props.className : 'form-group'} >{this.props.text}
                    {this.props.children}
                    {this.props.required && (
                        <span style={{color:'red'}}>
                            *
                        </span>
                    )}
                </label>
            </div>
        );
    }
}

export default Lable;