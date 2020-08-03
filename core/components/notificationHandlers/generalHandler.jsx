import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../common/utils.js';
import * as actions from '../../actions/generalAction';


const DefaultHandler = ({ stateContainer }) => {
    return (<div>
        <div className="row">
            <div className={"col-md-12"}>
                <div className={"col-md-12"}>
                    <div className=" col-md-3">
                        <label className="control-label bold">{utils.getLabelByID("Notification Text")}</label>
                    </div>
                    <div className=" col-md-9">
                        <label
                            className="control-label ">{`${stateContainer.text}`}</label>
                    </div>
                    <div className=" col-md-3">
                        <label className="control-label bold">{utils.getLabelByID("Type")}</label>
                    </div>
                    <div className=" col-md-9">
                        <label className="control-label ">{stateContainer.type}</label>
                    </div>

                    <div className=" col-md-3">
                        <label className="control-label bold">{utils.getLabelByID("User ID")}</label>
                    </div>
                    <div className=" col-md-9">
                        <label className="control-label ">{stateContainer.userID}</label>
                    </div>

                    <div className=" col-md-3">
                        <label className="control-label bold">{utils.getLabelByID("Data")}</label>
                    </div>
                    <div className=" col-md-9">
                       <pre style={{height:"300px"}}>{stateContainer.data}</pre>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};



const SampleHandleForm = ({ stateContainer }) => {
    return (<div>this is test data {JSON.stringify(stateContainer)}</div>);
};

class Handler extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {}
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.data) {
            this.setState({ data: nextProps.data })
        }
    }
    render() {
        switch (this.props.handler) {
            case "TEST":
                return (<SampleHandleForm stateContainer={this.props.data} />)
            default:
                return (<DefaultHandler stateContainer={this.props.data} />)
        }

    }

}


function mapStateToProps(state, ownProps) {
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}
export default connect(mapStateToProps, mapDispatchToProps)(Handler);