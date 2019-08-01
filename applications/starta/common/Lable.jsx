import React from 'react';

class Lable extends React.Component {

    render() {
        return (
            <div className={`col-md-${this.props.columns || 12}`}>
                <label style={{...this.props.style, wordWrap: "inherit"}} className="pull-left bold" >{this.props.text}</label>
            </div>
        );
    }
}

export default Lable;