/*standard imports*/
import React, { PropTypes } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import ReactToPrint from "react-to-print";
import * as actions from '../../actions/generalAction';
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import * as requestCreator from '../../common/request.js';
import APIDocExport from './APIDocExport.js';
import * as toaster from '../../common/toaster.js';



class test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            useCases: [],
            orgTypes: [],
            APIListData: [],
            useCase: null
        }
    }

    componentWillMount() {

    }

    componentDidMount() {
        // window.scrollTo(0, 0);
    }


    componentWillReceiveProps(nextProps) {

    }



    render() {

        return (

            <div className="row">

                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-12">
                            <div className="btn-toolbar pull-right">
                                <button >
                                    <a href="path_to_file" download="proposed_file_name">Download</a>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}


function mapStateToProps(state, ownProps) {

}

function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(test);
