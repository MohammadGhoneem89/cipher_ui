import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/generalAction.js';
import * as constants from '../../constants/Communication.js';
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import TemplateListForm from './template-list-form.jsx';
import * as utils from '../../common/utils.js';
import ModalBox from '../../common/ModalBox.jsx';

class TemplateList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.submit = this.submit.bind(this);
        // this.processRequest = this.processRequest.bind(this);

        this.state = {
            filterCriteria: undefined,
            acquirerList: undefined,
            pageSize: 10,
            currentPageNo: 1, 
            sortData: undefined,
            isLoading: false,
            searchData: null,
            // gridData: [
            //     { "country": {imgURL: 'https://restcountries.eu/data/ala.svg', name: 'IRELAND'}, "applicantNum": "555222", "fullName": "7899", "status": "Pending", "result": "Negative", "actions": [{
            //     "value": "4014",
            //     "type": "componentAction",
            //     "label": "View",
            //     "params": "",
            //     "iconName": "fa fa-eye",
            //     "URI": ["/lab/viewApplication"]
            // }] },
            //     { "country": {imgURL: 'https://restcountries.eu/data/ala.svg', name: 'IRELAND'}, "applicantNum": "555222", "fullName": "7899", "status": "Pending", "result": "Negative", "actions": [{
            //     "value": "4014",
            //     "type": "componentAction",
            //     "label": "View",
            //     "params": "",
            //     "iconName": "fa fa-eye",
            //     "URI": ["/lab/viewApplication"]
            // }] },
            //     { "country": {imgURL: 'https://restcountries.eu/data/ala.svg', name: 'IRELAND'}, "applicantNum": "555222", "fullName": "7899", "status": "Pending", "result": "Negative", "actions": [{
            //     "value": "4014",
            //     "type": "componentAction",
            //     "label": "View",
            //     "params": "",
            //     "iconName": "fa fa-eye",
            //     "URI": ["/lab/viewApplication"]
            // }] },
            //     { "country": {imgURL: 'https://restcountries.eu/data/ala.svg', name: 'IRELAND'}, "applicantNum": "555222", "fullName": "7899", "status": "Pending", "result": "Negative", "actions": [{
            //     "value": "4014",
            //     "type": "componentAction",
            //     "label": "View",
            //     "params": "",
            //     "iconName": "fa fa-eye",
            //     "URI": ["/lab/viewApplication"]
            // }] },
            //     { "country": {imgURL: 'https://restcountries.eu/data/ala.svg', name: 'IRELAND'}, "applicantNum": "555222", "fullName": "7899", "status": "Pending", "result": "Negative", "actions": [{
            //     "value": "4014",
            //     "type": "componentAction",
            //     "label": "View",
            //     "params": "",
            //     "iconName": "fa fa-eye",
            //     "URI": ["/lab/viewApplication"]
            // }] },
            // ]
        };
        this.pageChanged = this.pageChanged.bind(this);
        this.sortList = this.sortList.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if ( nextProps.searchData) {
        console.log(nextProps);
        let actions = [{
            "value": "4014",
            "type": "componentAction",
            "label": "View",
            "params": "",
            "iconName": "fa fa-eye",
            "URI": ["/templateList/"]
        },
        {
            "value": "4014",
            "type": "componentAction",
            "label": "Test",
            "params": "",
            "iconName": "fa fa-eye",
            "URI": ["/templateList/test"]
        }];
        // let searchData = [];
        let data = {};
        let result = nextProps.searchData.map(obj => {
            obj.actions = actions;
            return obj;
        })
       
        this.setState({
            searchData: result,
            // currentPageNo: nextProps.searchData.pageData.pageNo,
            // currentPageSize: nextProps.searchData.pageData.pageSize,
            // totalRecords: nextProps.searchData.pageData.totalRecords,
            // sortData: nextProps.searchData.pageData.sortData,
            isLoading: nextProps.isLoading
        });
    }
    if (nextProps.searchData.length == 0) {
        this.setState({
            isLoading: false,
        })
    }
    }

    componentDidMount() {
        console.log('MOUNT');
        setTimeout(() => {
            this.getInitialData();
        }, 0);
    }

    getInitialData(){
        let obj = { 
            body: {
            name: '',
            applicationNo: '',
            pageNo: this.state.currentPageNo,
            pageSize: 10,
            "page": {
                "pageSize": 10,
                sortData: this.state.sortData
            },
        }
    }
        this.props.actions.generalProcess(constants.getAllLetters, obj);
        // this.setState({ isLoading: true });
    }

    submit(data) {
        console.log(data);
        let obj = {
            // body: {...data}
            body: {
                givenName: data.givenName ? data.givenName.trim() : '',
                surname: data.surname ? data.surname.trim() : '',
                applicationNo: data.applicationNo ? data.applicationNo.trim() : '',
                passportNo: data.passportNo ? data.passportNo.trim() : '',
                EID: data.EID ? data.EID.trim() : '',
                URN: data.URN ? data.URN.trim() : '',
            }
        }
        console.log(obj);
        obj.body.pageNo = 1;
        obj.body.pageSize = 10;
        this.props.actions.generalProcess(
            constants.getApplicationBySearchCriteria,
            obj
        );
        this.setState({ filterCriteria: data, activePage: 1 });
    }

    pageChanged(pageNo) {
        this.setState({
            currentPageNo: pageNo
        }, () => this.getInitialData())
    }


    sortList(sortData) {
        console.log(sortData);
        let newSortObj;
        if (sortData.applicationNos) {
            newSortObj = {
                applicationNo: ''
            }
            newSortObj.applicationNo = sortData.applicationNos 
            this.setState({ sortData: sortData, newSortObj: newSortObj });
            let obj = {
                "body": {
                    "action": "acquirerList",
                    "page": {
                        "pageSize": 10,
                        sortData: newSortObj
                    },
                    "pageNo": this.state.currentPageNo,
                    "pageSize": 10
                }
            }    
            
        this.props.actions.generalProcess(
            constants.getApplicationBySearchCriteria, obj
        );
        } else {
            this.setState({ sortData: sortData });
            let obj = {
                "body": {
                    "action": "acquirerList",
                    "page": {
                        "pageSize": 10,
                        sortData
                    },
                    "pageNo": this.state.currentPageNo,
                    "pageSize": 10
                }
            }    
            
        this.props.actions.generalProcess(
            constants.getApplicationBySearchCriteria, obj
        );
        }
    }


    resetFilter = () => {
        console.log(this.state.filterCriteria, 'FCCCCCCCCC');
        this.setState({
          filterCriteria : undefined,
          activePage: 1
        }, () => {
          this.getInitialData();
        })
      }

      showModal = ({ actionName, index }) => {
        this.setState({
            show: true
        })
    }

      render() {
          console.log(this.state);
        if (this.state.searchData != null)
        {
           return (
               <div>
                   <Portlet title={utils.getLabelByID('Search')}>
                       <TemplateListForm onSubmit={this.submit} newProps={this.props} initialValues={this.state.filterCriteria} state={this.state} resetFilter={this.resetFilter}/>

                   </Portlet>
                   <Portlet title={utils.getLabelByID('Letters')} isPermissioned={true} 
                   // actions={this.state.acquirerList.data.actions}
                   >
                       <Table
                           pagination={true}
                           export={false}
                           search={false}
                           gridType={'acquirer'}
                           gridColumns={utils.getGridColumnByName('letterTable')}
                           gridData={this.state.searchData}
                           totalRecords={this.state.searchData.length}
                           pageChanged={this.pageChanged}
                           activePage={this.state.currentPageNo}
                           pageSize={this.state.pageSize}
                           searchCriteria={this.state.filterCriteria}
                           headerClick={this.sortList}
                           sortData={this.state.sortData}
                           componentFunction={this.showModal}
                       />
                   </Portlet>

                   <ModalBox isOpen={this.state.show}>
                    <Portlet title={"AED Slabs"}>


                        <div className="row">
                            <div className="row">
                                <label htmlFor="">Enter Payload</label>
                                <div style={{ padding: "0 15" }}>
                                   <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>

                            <div className="btn-toolbar pull-right">
                                <button type="submit" onClick={this.closePopup} className="pull-right btn green">
                                    {utils.getLabelByID("Close")}
                                </button>
                            </div>
                        </div>
                    </Portlet>

                </ModalBox>
                   
               </div>
           );
               }
               else
               return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
       
   }
}

function mapStateToProps(state, ownProps) {
    if (state.app.getAllLetters) {
        return {
            searchData: state.app.getAllLetters,
            isLoading: false
        };
    } else {
        return {
            searchData: null,
            isLoading: false
        };
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    };
}

TemplateList.displayName = 'Letter Templates';

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TemplateList);
