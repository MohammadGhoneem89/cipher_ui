/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import * as actions from '../../../../core/actions/generalAction';
import Row from '../../common/Row.jsx';
import Input from '../../common/Input.jsx';
import Textarea from '../../common/Textarea.jsx';
import Label from '../../common/Lable.jsx';
import Portlet from '../../common/Portlet.jsx';
import Combobox from '../../common/Select.jsx';
import Radio from '../../common/Radio.jsx';
import Table from '../../common/Datatable.jsx';
import * as requestCreator from '../../../../core/common/request.js';
import * as coreConstants from '../../../../core/constants/Communication.js'
import * as utils from '../../../../core/common/utils.js';
import CheckBox from '../../common/CheckBox.jsx';
import CheckList from '../../common/CheckList.jsx';
import * as constants from '../../../../core/constants/Communication';
import DateTimeField from "react-bootstrap-datetimepicker";
import RichTextEditor from 'react-rte';
import * as gen from '../../common/generalActionHandler';
import Document from '../../common/Document.jsx';

class ProductCatalogue extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            addProduct: {},
            value: ""
            // disabled: false

        };

        this.generalHandler = gen.generalHandler.bind(this);
        this.insertJson = this.insertJson.bind(this);
        this.stringToNumber = this.stringToNumber.bind(this);
    }

    componentWillMount() {
        console.log(!_.isEmpty(this.props.id), "ITEM ID FROM PROPS")
        if (!_.isEmpty(this.props.id)) {
            this.getItemDetail(this.props.id);
        }

    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.id", nextProps.id, "nextProps.getItemCatalogue", nextProps.getItemCatalogue)
        let stateObject = _.clone(this.state);
        if (nextProps.getItemCatalogue.searchResult) {
            stateObject.addProduct = nextProps.getItemCatalogue.searchResult;
        }
        if (nextProps.typeData) {
            stateObject.typeData = nextProps.typeData;
        }
        stateObject.isLoading = false;

        this.setState(stateObject);
    }

    componentDidMount() {

        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'color', 'classification', 'material'
            ]));
        window.scrollTo(0, 0);
    }
    handleOnChange = (e) => {
        this.setState({
            value: e.target.value
        })
       
    }
    getItemDetail = (id) => {
        alert("getitemdetail func")
        this.props.actions.generalProcess(constants.getItemCatalogue,
            {
                "body": {
                    "page": {
                        "currentPageNo": 1,
                        "pageSize": 10
                    },
                    "searchCriteria": {
                        "itemCode": id
                    }
                }
            });
    }
    submitForm() {
    }

    updateState = (data) => {
        this.setState(data);
    }

    getParentState = () => {
        return this.state
    }

    insertJson() {
        this.stringToNumber('addProduct', ['leadTime', 'price', 'printTime'])
        this.props.actions.generalAjxProcess(constants.addItemCatalogue, {
            body: {
                ...this.state.addProduct
            }
        }).then(result => {
            result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
        });
    }

    redirectToList = () => {
        browserHistory.push('/starta/itemCatalogueList')
    }
    stringToNumber(formName, fieldArray) {
        let Obj = {};
        for (let key of fieldArray) {
            Obj = this.state[formName]
            console.log(Obj, "Obj")
            if (Obj[key] != undefined) {
                Obj[key] = Number(Obj[key])
            }
        }
        console.log(Obj, "++++ UPDATED obj")
        this.setState({
            [formName]: { ...Obj }
        })

    }
    onWorkOnDataChange = (formname, fieldname, type, e) => {
        let value = e.target.value;
        let checked = e.target.checked;
        let prevState = _.get(this.state, `${formname}.${fieldname}`, [])
        if (checked && prevState.indexOf(value) === -1) {
            prevState.push(value)
        } else {
            prevState.splice(prevState.indexOf(value), 1)
        }
        let formdata = _.get(this.state, formname, {});
        _.set(formdata, fieldname, prevState);
        this.setState({
            [formname]: formdata
        })
    }

    render() {
        //console.log("this state getItemCatalogue", this.state.typeData)
        console.log(this.state.data ? this.state.data : "waiting for response from addItemCatalogue")
        if (!this.state.isLoading)

            return (

                <Row>
                    <Portlet title='product catalogue'>
                        <Row>
                            <Label text="Item Code:" columns='1' />
                            <Input fieldname='itemCode' formname='addProduct' columns='5' state={this.state} actionHandler={this.generalHandler} className="form-control"
                                disabled={this.props.getItemCatalogue.length > 0 ? "disabled" : ""}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].itemCode : ""} />
                            <Label text="Name:" columns='1' />
                            <Input fieldname='name' formname='addProduct' columns='5' state={this.state}
                                // ref={addProduct}
                                actionHandler={this.generalHandler} 
                              // value={this.state.value}
                                // onChange={this.handleOnChange}
                                className="form-control"
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].name : ""} />

                        </Row>
                        <br />
                        <Row>
                            <Label text="Lead Time:" columns='1' />
                            <Input fieldname='leadTime' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number'
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].leadTime : ""} />
                            <Label text="Print Time:" columns='1' />
                            <Input fieldname='printTime' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number'
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].printTime : ""} />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Part Num:" columns='1' />
                            <Input fieldname='partNumber' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control"
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].partNumber : ""} />
                            <Label text="Classification:" columns='1' />
                            <Combobox fieldname='classification' formname='addProduct' columns='5' style={{}}
                                state={this.state} typeName="classification" dataSource={this.state.typeData}
                                selected={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].classification : ""}
                                multiple={false}
                                actionHandler={this.generalHandler} className="form-control"
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].classification : ""} />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Material:" columns='1' />
                            <Combobox fieldname='material' formname='addProduct' columns='5' style={{}}
                                state={this.state} typeName="material"
                                dataSource={this.state.typeData}
                                selected={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].material : ""}
                                multiple={false}

                                actionHandler={this.generalHandler} className="form-control"
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].material : ""} />
                            <Label text="Color:" columns='1' />

                            <CheckList fieldname='color' formname='addProduct' columns='5' style={{}}
                                state={this.state}
                                typeName="color"
                                dataSource={this.state.typeData}
                                selected={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].color : ""}

                                actionHandler={this.onWorkOnDataChange}
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].color : ""}
                            />
                            {/* <Combobox fieldname='color' formname='addProduct' columns='5' style={{}}
                                state={this.state} typeName="color" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} className="form-control" /> */}
                        </Row>
                        <br />
                        <Row>
                            <Label text="Model Vol:" columns='1' />
                            <Input fieldname='modelVolume' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number'
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].modelVolume : ""} />
                            <Label text="Support Vol:" columns='1' />
                            <Input fieldname='supportVolume' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number'
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].supportVolume : ""} />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Price:" columns='1' />
                            <Input fieldname='price' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number'
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].price : ""} />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Description" columns='1' />
                            <Textarea fieldname='description' formname='addProduct' rows="5"
                                columns='7' style={{ color: 'blue' }} actionHandler={this.generalHandler}
                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].description : undefined}
                            />
                            <Label text="Is Active" columns='1' />
                            <CheckBox fieldname='itemStatus' formname='addProduct' value={false}
                                columns='1' style={{}} actionHandler={this.generalHandler}

                                disabled={false}
                                value={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].itemStatus : ""} />
                        </Row>
                        <br />
                        <Row>
                            <Document initState={this.state} updateState={this.updateState} getParentState={this.getParentState}
                                allowedFileType=".xml , .csv , .xls" acceptedFiles="Files to be uploaded with extention *.xml, *.xls or *.csv" />
                        </Row>
                        <br />
                        <Row>
                            <button type="submit" className="btn green" style={{ float: "right" }} disabled={this.props.getItemCatalogue.length > 0 ? "disabled" : ""} onClick={this.insertJson}>{utils.getLabelByID("Save")}</button>{"  "}
                        </Row>
                    </Portlet>

                </Row>
            );
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    // console.log(state.app,"STATE.APP")
    return {
        id: _.get(ownProps.params, 'id', ''),
        getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
        typeData: state.app.typeData.data
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
ProductCatalogue.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogue);
