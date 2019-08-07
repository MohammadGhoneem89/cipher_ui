/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Row from '../../common/Row.jsx';
import Input from '../../common/Input.jsx';
import Textarea from '../../common/Textarea.jsx';
import Label from '../../common/Lable.jsx';
import Portlet from '../../common/Portlet.jsx';
import Combobox from '../../common/Select.jsx';
import Radio from '../../common/Radio.jsx';
import Table from '../../common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
import CheckBox from '../../common/CheckBox.jsx';
import CheckList from '../../common/CheckList.jsx';
import * as constants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';
import DateTimeField from "react-bootstrap-datetimepicker";
import RichTextEditor from 'react-rte';
import * as gen from '../../common/generalActionHandler';
import Document from '../../common/Document.jsx';

class ProductCatalogue extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            isLoading: false,
            addProduct: {}
        };

        this.generalHandler = gen.generalHandler.bind(this);
        this.insertJson = this.insertJson.bind(this);
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }
    componentDidMount() {

    }


    submitForm() {
    }

    updateState = (data) => {
        this.setState(data);
    }

    getParentState = () => {
        return this.state
    }

    insertJson () {
        console.log('add object => ', this.state.addProduct)
        this.props.actions.generalProcess(constants.addItemCatalogue, {
            body: {
                ...this.state.addProduct
            }
        });
    }


    render() {
        if (!this.state.isLoading)
            return (
                <Row>
                    <Portlet title='product catalogue'>
                        <Row>
                            <Label text="Item Code:" columns='1' />
                            <Input fieldname='itemCode' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" />
                            <Label text="Name:" columns='1' />
                            <Input fieldname='name' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" />

                        </Row>
                        <br />
                        <Row>
                            <Label text="Lead Time:" columns='1' />
                            <Input fieldname='leadTime' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                            <Label text="Print Time:" columns='1' />
                            <Input fieldname='printTime' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Part Num:" columns='1' />
                            <Input fieldname='partNumber' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" />
                            <Label text="Classification:" columns='1' />
                            <Combobox fieldname='classification' formname='addProduct' columns='5' style={{}}
                                state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} className="form-control" />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Material:" columns='1' />
                            <Combobox fieldname='material' formname='addProduct' columns='5' style={{}}
                                state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} className="form-control" />
                            <Label text="Color:" columns='1' />
                            <Combobox fieldname='color' formname='addProduct' columns='5' style={{}}
                                state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} className="form-control" />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Model Vol:" columns='1' />
                            <Input fieldname='modelVol' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                            <Label text="Support Vol:" columns='1' />
                            <Input fieldname='supportVol' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Price:" columns='1' />
                            <Input fieldname='price' formname='addProduct' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Description" columns='1' />
                            <Textarea fieldname='description' formname='addProduct' rows="5"
                                columns='7' style={{}} actionHandler={this.generalHandler} />
                            <Label text="Is Active" columns='1' />
                            <CheckBox fieldname='isActive' formname='addProduct' value={false}
                                columns='1' style={{}} actionHandler={this.generalHandler} />
                        </Row>
                        <br />
                        <Row>
                            <Document initState={this.state} updateState={this.updateState} getParentState={this.getParentState}
                                allowedFileType=".xml , .csv , .xls" acceptedFiles="Files to be uploaded with extention *.xml, *.xls or *.csv" />
                        </Row>
                        <br />
                        <Row>
                        <button type="submit" className="btn green" onClick={this.insertJson}>{utils.getLabelByID("Save")}</button>{"  "}
                        </Row>
                    </Portlet>

                </Row>
            );
        else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

function mapStateToProps(state, ownProps) {
    console.log(state.app)
    return {
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}

function onWorkOnDataChange(formname, fieldname, type, e) {
    console.log('event', formname, fieldname, type, e);

    let value = e.target.value;
    let checked = e.target.checked;
    let cons = this.state.conditions;
    let prevState = _.get(this.state, `${formname}.${fieldname}`, [])
    if (checked && prevState.indexOf(value) === -1) {
        prevState.push(value)
        cons.push({
            label: value,
            value
        });
    } else {
        prevState.splice(prevState.indexOf(value), 1);
        if (cons && cons.length) {
            console.log('eeeeeeeee', cons[0]['value'], value);
            let conds = []
            for (let elems of cons) {
                if (elems.value !== value) {
                    conds.push(elems);
                }
            }
            // const spliced = cons.map(elem=>{ 
            //     console.log('eeeeeeeee', elem);
            //     elem.value !== value});
            cons = conds;
        }
    }
    let formdata = _.get(this.state, formname, {});
    _.set(formdata, fieldname, prevState);
    // _.set(this.state, formname, formdata);

    console.log('formdata', formdata, prevState)

    this.setState({
        [formname]: formdata
    })
    this.state.conditions = cons;
    console.log('formnam11e', (this.state));

}
ProductCatalogue.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(ProductCatalogue);
