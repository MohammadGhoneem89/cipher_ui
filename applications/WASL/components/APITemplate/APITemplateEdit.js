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


class APITemplateEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            modalIsOpen: false,
            gridData: [],
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
                name: _.get(nextProps, 'findAPITemplateById.name'),
                data:  JSON.stringify(_.get(nextProps, 'findAPITemplateById.data'))
            });
        }
    }

    getDataById = () => {
        if (this.props.routeParams.id !== 'create') {
            this.setState({isLoading: true});
            this.props.actions.generalProcess(constants.findAPITemplateById,  this.props.routeParams);
        }
        else{
            this.setState({isLoading: false});
        }
    };

    insertJson = () => {
        let valid  = true;
        let data;
            try{
                data = JSON.parse(this.state.data)
            }
            catch (err){
                valid = false;
                toaster.showToast("JSON is not correct", "ERROR");
            }
       if(valid){
        let json = {
            data: data,
            name: this.state.name
        };
        if (this.props.routeParams.id !== 'create') {
            json.id = this.props.routeParams.id;
        }
        this.props.actions.generalProcess(constants.upsertAPITemplate, json);
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
                                value={_.get(this.state, 'name', '')} 
                                onChange={this.onChange}/>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="col-md-6">
                                <label className="label-bold">{utils.getLabelByID("API Payload")}</label>
                                <textarea placeholder="JSON Goes here ..." type="text" className="form-control ekycinp" rows="18" name="data" 
                                value={_.get(this.state, 'data', '')} 
                                onChange={this.onChange}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group col-md-6">
                                <div className="btn-toolbar pull-right">
                                    <button type="submit" className="btn green" onClick={this.insertJson}>{utils.getLabelByID("Save")}</button>{"  "}
                                    <button type="button" className="btn default" onClick={this.back}>{utils.getLabelByID("Back")} </button>
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
    };
}

function mapDispatchToProps(dispatch) {
    return {actions: bindActionCreators(actions, dispatch)}

}

APITemplateEdit.displayName = "API Template Edit";
export default connect(mapStateToProps, mapDispatchToProps)(APITemplateEdit);
