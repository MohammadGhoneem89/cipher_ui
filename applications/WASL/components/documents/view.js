/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import Portlet from '../../../../core/common/Portlet.jsx';
import TileUnit from '../../../../core/common/tileUnit.jsx';
import Table from '../../../../core/common/Datatable.jsx';

class ViewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      tiles: [{
        "actionURI": "",
        "fontClass": "green-steel",
        "id": 1,
        "overDue": "",
        "percentageTag": false,
        "title": "Documents",
        "value": 10
      }]
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
    <div className="document-view-ipfs">
      <div className="row">
        <TileUnit data={this.state.tiles}/>
      </div>
      <Portlet title="IPFS Documents">
        <div className="row">
          <div className="col-md-6">
            <div className="form-group col-md-4">
              <label className="control-label">{utils.getLabelByID("Hash")}</label>
            </div>
            <div className="form-group col-md-8">
              <input type="text" className="form-control" name="hash" onChange={this.onChange} value={this.state.hash}/>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-md-12">
            <div className="btn-toolbar pull-right">
              <button type="submit" className="btn green" onClick={this.fetch}> {utils.getLabelByID("Search")} </button>
            </div>
          </div>
        </div>
        <Table gridColumns={utils.getGridColumnByName("IPFSDocumentsList")}
               gridData={[]}
               totalRecords={0}
               searchCallBack={this.searchCallBack}
               pageSize={5}
               pageChanged={this.pageChanged}
               export={false}
               search={true}
               pagination={false}
               activePage={1}/>
      </Portlet>
    </div>
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
