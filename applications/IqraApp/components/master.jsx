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