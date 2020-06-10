/*standard imports*/
import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../core/actions/generalAction";
import OptionalStatus from "./OptionalStatus.jsx";


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
import ModalBox from "../../../core/common/ModalBox.jsx";
import { thresholdScott } from "d3";

class LoyaltyTokenRateManagement extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            totalRecords: 10,
            pageSize: 5,
            currentPageNo: 1,
            searchCriteria: {},
            searchCriteria: {},
            show: false,
            valid: true,

            Range: [],

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
        this.updateState = this.updateState.bind(this);
        this.showModel = this.showModel.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }
    updateState(data) {
        this.setState(data);
    }

    showModel = ({ actionName, index }) => {
        if (index > -1) {
            // let rates = this.state.gridData[index].AEDSlab;
            // let rangeArr = [];
            // rates.forEach(obj => {
            //     console.log("HEREE! >> ", obj)
            //     let rangeString = {}
            //     rangeString.slab = obj.fromPoint + " - " + obj.toPoint
            //     rangeString.value = obj.AEDValue
            //     console.log(" \n\nRANGE OBJ>> ", rangeString)
            //     rangeArr.push({ ...rangeString })
            //     console.log(" \n\nRANGE AARR>> ", rangeArr)

            // })
            // console.log("--VALUES--> \n\n", rangeArr)
            // this.setState({
            //     Range: rangeArr
            // })

            //grid display..
            let rates = this.state.gridData[index].AEDSlab;
            this.setState({
                Range: rates
            })



        }
        this.setState({
            show: true
        })
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

    optionalStatusModalBoxItem = () => {

        return (
            <div>
                <OptionalStatus
                    value={this.state.optionalStatusValue}
                    handleSubmit={this.optionalStatusHandleSubmit}
                    onUpdate={this.optionalStatusUpdateValue}
                    closePortlet={this.optionalStatusModalBoxChangeState}
                    options={this.getOptionalOptions()}
                />
            </div>
        )
    };

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

                console.log("\n\n\n GRID DATA >> ", data)
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

    closePopup() {
        this.setState({
            show: false
        })
    }

    render() {



        return (

            <div className="row">
                <ModalBox isOpen={this.state.show}>
                    <Portlet title={"AED Slabs"}>


                        <div className="row">
                            <div className="row">
                                <div style={{ padding: "0 15" }}>
                                    <Table
                                        gridColumns={utils.getGridColumnByName('AEDSlabList')}
                                        gridData={this.state.Range || []}
                                        componentFunction={this.slabActionHandler}
                                    />
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

                <Table
                    gridColumns={utils.getGridColumnByName("LoyaltyTokenList")}
                    //gridData={[{"serial_no": "1","offerId": "12212222","partner": "555222","merchant": "ACCURAL","description": "100045"}]}
                    gridData={this.state.gridData}
                    //totalRecords={this.state.totalRecords}
                    pageSize={10}
                    //pageChanged={this.pageChanged}
                    pagination={true}
                    activePage={this.state.currentPageNo}
                    componentFunction={this.showModel}

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