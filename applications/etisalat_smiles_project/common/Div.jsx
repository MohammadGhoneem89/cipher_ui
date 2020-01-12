import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from './utils';

class Div extends React.Component {

    render() {
        return (
            <div style={this.props.style ? this.props.style : {}}
                className={this.props.className ? this.props.className : ''}>
                {this.props.children}
            </div >
        );
    }
}

export default Div;