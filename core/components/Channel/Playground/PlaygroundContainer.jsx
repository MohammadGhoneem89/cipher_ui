/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../actions/generalAction';
/*container specific imports*/
import PlaygroundForm from './PlaygroundForm.jsx'
const initialState = {
    Playground: {
        "Channel Name": "",
        "SmartContract Name": "",
        "Function Name": "",
        "Request Type": "",
    },

    typeData: {},
    dropDownItems: [],
    isLoading: true,
};
class PlayGround extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentPageNo: 1, isLoading: false };
        this.pageChanged = this.pageChanged.bind(this);
        // this.fetchListData = this.fetchListData.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
    }
    componentWillMount() {
        // this.fetchListData(1);
    }

    componentWillReceiveProps(nextProps) {
        // if (this.props.sampleListData !== nextProps.sampleListData) {
        //   this.setState({
        //     isLoading: false
        //   });
        // }
    }
    componentDidMount() {
        window.scrollTo(0, 0);
    }
    pageChanged(pageNo) {
        this.setState({ currentPageNo: pageNo });
        this.fetchListData(pageNo);
    }
    formSubmit(e) {
        e.preventDefault();
        this.fetchListData();
    }
    fetchListData(currentPageNo) {


    }

    clearFields() {

    }


    render() {
        //if (this.props.sampleListData.gridData) {
        return (
            
 <PlaygroundForm/> 
        );
    }
    // else
    //   return (<div className="loader">{utils.getLabelByID("Loading")}</div>)

}


function mapStateToProps(state, ownProps) {
    return {


    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}

export default connect(mapStateToProps, mapDispatchToProps)(PlayGround);
