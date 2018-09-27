import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from './utils';

class Footer extends React.Component {

    render() {
        return (

            <div className="page-footer-inner"> {utils.getLabelByID("Footer")}
                <div className="scroll-to-top">
                    <i className="icon-arrow-up"/>
                </div>
            </div>




        );
    }
}

export default Footer;