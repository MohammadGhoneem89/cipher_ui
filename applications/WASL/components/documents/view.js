/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as utils from '../../../../core/common/utils.js';
import * as actions from '../../../../core/actions/generalAction';
import Portlet from '../../../../core/common/Portlet.jsx';
import generalAPI from '../../../../core/api/generalAPI';
import * as constants from '../../../../core/constants/Communication.js';
import  _ from 'lodash';

class ViewDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      key: '',
      docName: '',
      infoData: {}
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {}

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  search = () => {
    this.setState({isLoading: true});
    generalAPI.getData(constants.ipfsInfo, {hash: this.state.hash})
      .then((res)=>{
        this.setState({
          isLoading: false,
          infoData: _.get(res, 'info.data', {})
        });
      });
  };

  download = () =>{
    this.setState({isLoading: true});
    generalAPI.getData(constants.ipfsView, {hash: this.state.hash, key: this.state.key})
      .then((res)=>{
      this.setState({isLoading: false});
        if(res.type && res.data){
          this.setState({docName: `${this.state.hash}.${res.type}`}, () => {
            const dlnk = document.getElementById('dwnldLnk');
            dlnk.href = `data:image/${res.type};base64,${res.data}`;
            dlnk.click();
          });
        }
      });
  };

  render() {
    if (this.state.isLoading)
      return (<div className="loader">{utils.getLabelByID("Loading")}</div>);

    return (
    <div className="document-view-ipfs">
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
              <button type="submit" className="btn green" onClick={this.search}> {utils.getLabelByID("Search")} </button>
            </div>
          </div>
        </div>
        <Portlet title="Information">
          <div className="row">
              <div className="col-md-12">
                <label className="col-md-2" style={{fontWeight: "bolder"}}>{utils.getLabelByID("Size")} :</label>
                <label className="col-md-6">{_.get(this.state, 'infoData.CumulativeSize', '-')}</label>
              </div>
              <div className="col-md-12">
                <label className="col-md-2" style={{fontWeight: "bolder"}}>{utils.getLabelByID("Block Size")} :</label>
                <label className="col-md-6">{_.get(this.state, 'infoData.BlockSize', '-')}</label>
              </div>
              <div className="col-md-12">
                <label className="col-md-2" style={{fontWeight: "bolder"}}>{utils.getLabelByID("Link Size")} :</label>
                <label className="col-md-6">{_.get(this.state, 'infoData.LinksSize', '-')}</label>
              </div>
              <div className="col-md-12">
                <label className="col-md-2" style={{fontWeight: "bolder"}}>{utils.getLabelByID("Data Size")} :</label>
                <label className="col-md-6">{_.get(this.state, 'infoData.DataSize', '-')}</label>
              </div>
          </div>
          <div className="row">
            <div className="form-group col-md-12">
              <div className="btn-toolbar pull-right">
                <button type="submit" className="btn green"
                        data-toggle="modal" data-target="#myModal"
                        onClick={this.fetch}> {utils.getLabelByID("Download")} </button>
              </div>
            </div>
          </div>
        </Portlet>
      </Portlet>
      <div id="myModal" className="modal fade" role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">&times;</button>
              <h4 className="modal-title">{utils.getLabelByID("Download File")}</h4>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label className="control-label">{utils.getLabelByID("Enter the key")}</label>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <input type="text" className="form-control" name="key" onChange={this.onChange} value={this.state.key}/>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn green" onClick={this.download} data-dismiss="modal">{utils.getLabelByID("Download")}</button>
            </div>
            <a id='dwnldLnk' download={this.state.docName} style={{display:"none"}}/>
          </div>
        </div>
      </div>
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
