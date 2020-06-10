/*standard imports*/
import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import { browserHistory } from 'react-router';

import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import * as constants from '../../../../core/constants/Communication.js';
import Portlet from '../../../../core/common/Portlet.jsx';
import * as toaster from '../../../../core/common/toaster.js';
import ReactJson from 'react-json-view';

class APITemplateTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            payload: '',
            data: {}
        };
    }

    componentDidMount() {
        this.getDataById();
        window.scrollTo(0, 0);
    }

    componentWillReceiveProps(nextProps) {
        if(!_.isEmpty(nextProps.findAPITemplateById)){
            this.setState({ 
                isLoading: false,
                name: _.get(nextProps, 'findAPITemplateById.name')
            });
        }
        if(!_.isEmpty(nextProps.testAPITemplate)){
            this.setState({ 
                isLoading: false,
                data: _.get(nextProps, 'testAPITemplate.data')
            });
        }
    }

    getDataById = () => {
        this.props.actions.generalProcess(constants.findAPITemplateById,  this.props.routeParams);
    };

    submitJSON = () => {
       let valid  = true;
       let data = {};
       try{
        data = JSON.parse(this.state.payload)
       }
       catch (err){
           valid = false;
           toaster.showToast("JSON is not correct", "ERROR");
       }
       if(valid){
        let payload = {
            name: this.state.name,
            data: data
        }
        this.setState({isLoading: true});
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.testAPITemplate,  payload);
       }
       
    };
    onChange = (e) => {
        let value = e.target.value;
    
        this.setState({
          [e.target.name]: value
        });
    
      };
      back = () => {
        browserHistory.push('/apiTemplate');
      };
    render() {
        if (this.state.isLoading)
            return (<div className="loader"> {utils.getLabelByID("loading")}</div>);

        return (
            <div>
                <Portlet title={''}>
                <div className="row">
                        <div className="form-group col-md-12">
                            <div className="col-md-6">
                                <label className="label-bold">{utils.getLabelByID("Name")}</label>
                                <input type="text" className="form-control ekycinp" name="name" 
                                value={_.get(this.state, 'name', '')} readOnly/>
                            </div>
                        </div>
                </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-6">
                                <label className="label-bold">{utils.getLabelByID("Input JSON")}</label>
                                <textarea placeholder="JSON Goes here ..." type="text" className="form-control ekycinp" rows="18" 
                                name="payload" onChange={this.onChange} value={this.state.payload}/>
                            </div>
                            <div className="col-md-6">
                                <ReactJson name={utils.getLabelByID("Output JSON")} src={this.state.data} />
                            </div>
                        </div>
                    </div>
<br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-12">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.submitJSON}>{utils.getLabelByID("Test")}</button>{"  "}
                                    <button type="button" className="btn default" onClick={this.back}>{utils.getLabelByID("Back")}</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </Portlet>

            </div>
        );

    }
}

function mapStateToProps(state, ownProps) {
    return {
        findAPITemplateById: _.get(state.app, 'findAPITemplateById.data', {}),
        testAPITemplate: _.get(state.app, 'testAPITemplate', {})
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}

}

APITemplateTest.displayName = "API Template Test";
export default connect(mapStateToProps, mapDispatchToProps)(APITemplateTest);
