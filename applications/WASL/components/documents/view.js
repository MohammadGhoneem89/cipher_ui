/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import Portlet from '../../../../core/common/Portlet.jsx';

class ViewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      key: ''
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {

  }

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetch = () => {

  };

  render() {
    if (this.state.isLoading)
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>);

    return (
      <Portlet title="IPFS Document">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group col-md-4">
              <label className="control-label">{utils.getLabelByID("Hash")}</label>
            </div>
            <div className="form-group col-md-8">
              <input type="text" className="form-control" name="hash" onChange={this.onChange} value={this.state.hash}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group col-md-4">
              <label className="control-label">{utils.getLabelByID("Key")}</label>
            </div>
            <div className="form-group col-md-8">
              <input type="text" className="form-control" name="key" onChange={this.onChange} value={this.state.key}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <div className="btn-toolbar pull-right">
              <button type="submit" className="btn green" onClick={this.fetch}> {utils.getLabelByID("Fetch")} </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12" style={{textAlign: "center"}}>
            <img src="https://www.w3schools.com/css/img_5terre.jpg"/>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <div className="btn-toolbar pull-right">
              <button type="submit" className="btn green" onClick={this.fetch}> {utils.getLabelByID("Download")} </button>
            </div>
          </div>
        </div>
      </Portlet>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) }
}

ViewDocument.displayName = "View Document";
export default connect(mapStateToProps, mapDispatchToProps)(ViewDocument);
