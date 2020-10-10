import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class AnchorComp extends React.Component {
    constructor() {
        super();
        this.invokeAnchorButton = this.invokeAnchorButton.bind(this);
    }

    invokeAnchorButton() {
        this.props.invokeAnchorButtonhandlar(this.props.rowData);
    }

    render() {
        return (
            <div>
                <a className="table-anchor-btn" onClick={this.invokeAnchorButton}>{this.props.anchotDisplayName}</a>
            </div>
        );
    }
}

export default AnchorComp;

