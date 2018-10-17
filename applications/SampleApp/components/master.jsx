import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class OrgSearchContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillReceiveProps(nextProps) {
  }

  componentDidMount() {

  }

  render() {
    return <div>
      <a href="https://drive.google.com/drive/folders/1RNkLklihGzQpCFli-ED7n1Hbjyt66g3H?usp=sharing"  target="_blank" style={{"fontSize": "20px"}}>Download the guide</a>
      {this.props.children}
      </div>;
  }
}

function mapStateToProps(state, ownProps) {
  return {};

}

function mapDispatchToProps(dispatch) {
  return {};
}

OrgSearchContainer.displayName = "ESearch_Heading";

export default connect(mapStateToProps, mapDispatchToProps)(OrgSearchContainer)