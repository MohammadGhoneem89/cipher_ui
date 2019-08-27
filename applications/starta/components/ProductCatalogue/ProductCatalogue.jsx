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
import * as toaster from '../../../../core/common/toaster.js';
class ProductCatalogue extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: true,
            addProduct: {}

        };

        this.generalHandler = gen.generalHandler.bind(this);
        this.insertJson = this.insertJson.bind(this);
        this.stringToOtherTypes = this.stringToOtherTypes.bind(this);
    }

    componentWillMount() {


    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps.getItemCatalogue", nextProps.getItemCatalogue)
        if (nextProps.getItemCatalogue && nextProps.typeData) {
            this.setState({
                addProduct: nextProps.getItemCatalogue[0],
                typeData: nextProps.typeData,
                isLoading: false
            })
        }
    }

    componentDidMount() {
        console.log((this.props.id), "ITEM ID FROM PROPS")
        if (this.props.id) {
            console.log(this.props.id,"this.props.id")
            this.getItemDetail(this.props.id);
        }

        this.props.actions.generalProcess(coreConstants.getTypeData,
            requestCreator.createTypeDataRequest([
                'color', 'classification', 'material'
            ]));
        window.scrollTo(0, 0);
    }
    getItemDetail = (id) => {
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
        if (this.state && this.state.addProduct != undefined) {
            this.stringToOtherTypes('addProduct', ['leadTime', 'price', 'printTime'],['itemStatus'])

             this.setState({})
            if (!_.isEmpty(this.props.id)) {
                alert("updateItemCatalogue")
                this.props.actions.generalAjxProcess(constants.updateItemCatalogue, {
                    body: {
                        ...this.state.addProduct
                    }
                }).then(result => {
                    result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
                });
            }
            else {
                alert("addItemCatalogue")
                this.props.actions.generalAjxProcess(constants.addItemCatalogue, {
                    body: {
                        ...this.state.addProduct
                    }
                }).then(result => {
                    result.message.status == 'ERROR' ? alert(result.message.errorDescription) : this.redirectToList()
                });
            }
        } else {
            alert("All fields required!")
        }
    }

    redirectToList = () => {
        browserHistory.push('/strata/itemCatalogueList')
        toaster.showToast("Record updated successfully!");
    }
    stringToOtherTypes(formName, numbArray,boolArray) {
        let Obj = {};
        for (let key of numbArray) {
            Obj = this.state[formName]
            if (Obj && Obj[key] != undefined) {
                Obj[key] = Number(Obj[key])
            }
        }
        for (let key of boolArray) {
            Obj = this.state[formName]
            if (Obj && Obj[key] != undefined) {
                Obj[key] = Obj[key] == "true" ? true : false
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
        console.log(this.state.addProduct ? console.log(this.state.addProduct) : "waiting for response from addItemCatalogue")
        if (!this.state.isLoading)

            return (
                <Portlet title={utils.getLabelByID("Product Catalogue")} >
                    <Row>
                        <Label text="Item Code:" columns='1' />
                        <Input fieldname='itemCode' formname='addProduct' columns='5' state={this.state} actionHandler={this.generalHandler} className="form-control"
                            disabled={this.props.getItemCatalogue.length > 0 ? "disabled" : ""}
                        />
                        <Label text="Name:" columns='1' />
                        <Input fieldname='name' formname='addProduct'
                            columns='5'
                            state={this.state}
                            actionHandler={this.generalHandler}
                            className="form-control"
                            disabled={false} />

                    </Row>
                    <br />
                    <Row>
                        <Label text="Lead Time:" columns='1' />
                        <Input fieldname='leadTime' formname='addProduct' columns='5'
                            state={this.state}
                            actionHandler={this.generalHandler}
                            className="form-control" type='number'
                            disabled={false}
                        />
                        <Label text="Print Time:" columns='1' />
                        <Input fieldname='printTime' formname='addProduct' columns='5' state={this.state}
                            actionHandler={this.generalHandler} className="form-control" type='number'
                            disabled={false} />
                    </Row>
                    <br />
                    <Row>
                        <Label text="Part Num:" columns='1' />
                        <Input fieldname='partNumber' formname='addProduct'
                            columns='5' state={this.state}
                            actionHandler={this.generalHandler} className="form-control"
                            disabled={false} />
                        <Label text="Classification:" columns='1' />
                        <Combobox fieldname='classification' formname='addProduct' columns='5' style={{}}
                            state={this.state}
                            typeName="classification"
                            dataSource={this.state.typeData}
                            multiple={false}
                            actionHandler={this.generalHandler} className="form-control"
                            disabled={false}

                        />
                    </Row>
                    <br />
                    <Row>
                        <Label text="Material:" columns='1' />
                        <Combobox fieldname='material' formname='addProduct' columns='5' style={{}}
                            state={this.state} typeName="material"
                            dataSource={this.state.typeData}
                            multiple={false}
                            actionHandler={this.generalHandler} className="form-control"
                            disabled={false}
                        />
                        <Label text="Color:" columns='1' />

                        <CheckList fieldname='color' formname='addProduct' columns='5' style={{}}

                            state={this.state}
                            typeName="color"
                            dataSource={this.state.typeData}
                            checked={this.props.getItemCatalogue.length > 0 ? this.props.getItemCatalogue[0].color : this.state}
                            actionHandler={this.onWorkOnDataChange}
                            disabled={false}

                        /> </Row>
                    <br />
                    <Row>
                        <Label text="Model Vol:" columns='1' />
                        <Input fieldname='modelVolume' formname='addProduct' columns='5' state={this.state}
                            actionHandler={this.generalHandler} className="form-control"
                            type='number'
                            disabled={false}
                        />
                        <Label text="Support Vol:" columns='1' />
                        <Input fieldname='supportVolume' formname='addProduct' columns='5'
                            state={this.state}
                            actionHandler={this.generalHandler} className="form-control"
                            type='number'
                            disabled={false}
                        />
                    </Row>
                    <br />
                    <Row>
                        <Label text="Price:" columns='1' />
                        <Input fieldname='price' formname='addProduct'
                            columns='5'
                            state={this.state}
                            actionHandler={this.generalHandler} className="form-control" type='number'
                            disabled={false}
                        />
                    </Row>
                    <br />
                    <Row>
                        <Label text="Description" columns='1' />
                        <Textarea fieldname='description' formname='addProduct' rows="5"
                            state={this.state}
                            columns='7' style={{ color: 'blue' }}
                            actionHandler={this.generalHandler}
                            disabled={false}

                        />
                        <Label text="Is Active" columns='1' />
                        <CheckBox fieldname='itemStatus' formname='addProduct'
                            columns='1' style={{}} actionHandler={this.generalHandler}
                            disabled={false}
                        />
                    </Row>
                    <br />
                    <Row>
                        <Document initState={this.state} updateState={this.updateState} getParentState={this.getParentState}
                            allowedFileType=".xml , .csv , .xls" acceptedFiles="Files to be uploaded with extention *.xml, *.xls or *.csv" />
                    </Row>
                    <br />
                    <button type="submit" className="btn green" style={{ float: "right" }} onClick={this.insertJson}>{utils.getLabelByID("Save")}</button>{"  "}
                    <br />
                    <br />
                </Portlet>

            );
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    return {
        id: _.get(ownProps.params, 'id', ''),
        getItemCatalogue: _.get(state.app, 'getItemCatalogue.searchResult', []),
        updateItemCatalogue: _.get(state.app, 'updateItemCatalogue.searchResult', []),
        typeData: state.app.typeData.data
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
ProductCatalogue.displayName = "Product Catalogue";
export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogue);
