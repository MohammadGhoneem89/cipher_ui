/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";


//import Table from "../common/Datatable.jsx"
import Table from '../../../core/common/Datatable.jsx';
import * as utils from '../../../core/common/utils.js';
//import * as utils from '../common/utils.js';
//import { DropdownInput } from '../common/FormControls.jsx';

//import Combobox from '../common/Select.jsx';
import Combobox from '../../../core/common/Select.jsx';
import * as gen from '../common/generalActionHandler'
import Label from '../common/Lable.jsx';
import Portlet from '../common/Portlet.jsx';
import moment from 'moment';
//import image from "../../../assets/imgs/courier.jpg";
import _ from 'lodash';
import * as requestCreator from '../../../core/common/request.js';
import * as coreConstants from '../../../core/constants/Communication.js'
import * as constants from '../../etisalat_smiles_project/constants/appCommunication.js';
import Input from '../../../core/common/Input.jsx';

class LoyaltyTokenRateManagement extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords: 10,
            pageSize: 5,
            currentPageNo: 1,
            searchCriteria: {},
            searchCriteria: {},
            valid: true,
            gridData: []
            // gridData: [
            //     { "serial_no": "1", "tokenProg": { "name": "SMILES", "imageURL": "/imgs/logos/SMILES.png" }, "orgCode": "555222", "aedRate": "ACCURAL" },
            //     { "serial_no": "1", "tokenProg": { "name": "SMILES", "imageURL": "/assets/imgs/logos/SMILES.png" }, "orgCode": "555222", "aedRate": "ACCURAL" },
            //     { "serial_no": "1", "tokenProg": { "name": "SMILES", "imageURL": "/assets/imgs/logos/SMILES.png" }, "orgCode": "555222", "aedRate": "ACCURAL" },
            //     { "serial_no": "1", "tokenProg": { "name": "SMILES", "imageURL": "/assets/imgs/logos/SMILES.png" }, "orgCode": "555222", "aedRate": "ACCURAL" },
            //     { "serial_no": "1", "tokenProg": { "name": "SMILES", "imageURL": "/assets/imgs/logos/SMILES.png" }, "orgCode": "555222", "aedRate": "ACCURAL" },
            // ]
        }
        this.generalHandler = gen.generalHandler.bind(this);
    }

    componentWillMount() {
    }

    componentDidMount() {
        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'listOfferStatus',
                'InitiateSettlementPartner'
            ]));
        this.props.actions.generalProcess(constants.getOrgCodeData, {});

    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (nextProps.getOrgCode.length > 0) {
            let gridData = [];
            let data = {}
            nextProps.getOrgCode.forEach((element, index) => {
                data = {
                    ...element
                }
                data.img = {
                    imageURL: element.img,
                    name: element.programCode
                }
                data.serial_no = index + 1;

                gridData.push({ ...data })
            });


            this.setState({
                gridData
            })
        }
        this.setState({
            typeData: nextProps.typeData
        })

        console.log("DDDDDDDDDDD", nextProps.typeData)
    }

    render() {



        return (

            <div className="row">



                <Table
                    gridColumns={utils.getGridColumnByName("LoyaltyTokenList")}
                    //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                    gridData={this.state.gridData}
                    //totalRecords={this.state.totalRecords}
                    pageSize={10}
                    //pageChanged={this.pageChanged}
                    pagination={true}
                    activePage={this.state.currentPageNo}
                />



            </div>


        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.app)
    return {
        getOrgCode: _.get(state.app, 'getAllOrgMap.data.searchResult', []),
        typeData: _.get(state.app, 'typeData.data', null),
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

LoyaltyTokenRateManagement.displayName = "Loyalty Token List";
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoyaltyTokenRateManagement);