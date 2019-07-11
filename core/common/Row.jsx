import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from './utils';

class Row extends React.Component {

    render() {
        return (
            <div className="row" style={{padding:"2px"}}>
                {/* <div className={`col-md-${this.props.col || 12}`}> */}
                    {this.props.children}
                {/* </div> */}
            </div >
        );
    }
}

export default Row;