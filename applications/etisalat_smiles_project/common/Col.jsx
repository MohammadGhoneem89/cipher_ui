import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from './utils';

class Col extends React.Component {

    render() {
        return (
                <div className={`col-md-${this.props.col || 12 } ${this.props.className ||''}`} style={this.props.style ? this.props.style : {}}>
                    {this.props.children}
                </div>
        );
    }
}

export default Col;