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
            isLoading: false
        };

        this.generalHandler = gen.generalHandler.bind(this);
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

    // onTimeChange(time) {
    //     let timeInMs = time - new Date().setHours(0, 0, 0);
    //     this.setState({
    //         ruleDefination: {
    //             ...this.state.ruleDefination,
    //             time: timeInMs
    //         }
    //     })
    // }

    render() {
        if (!this.state.isLoading)
            return (
                <Row>
                    <Portlet title='product catalogue'>
                        <Row>
                            <Label text="Item Code:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" />
                            <Label text="Name:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" />

                        </Row>
                        <br />
                        <Row>
                            <Label text="Lead Time:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' col umns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                            <Label text="Print Time:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Part Num:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" />
                            <Label text="Classification:" columns='1' />
                            <Combobox fieldname='stream' formname='ruleDefination' columns='5' style={{}}
                                state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} className="form-control" />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Material:" columns='1' />
                            <Combobox fieldname='stream' formname='ruleDefination' columns='5' style={{}}
                                state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} className="form-control" />
                            <Label text="Color:" columns='1' />
                            <Combobox fieldname='stream' formname='ruleDefination' columns='5' style={{}}
                                state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} className="form-control" />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Model Vol:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                            <Label text="Support Vol:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Price:" columns='1' />
                            <Input fieldname='ruleId' formname='ruleDefination' columns='5' state={this.state}
                                actionHandler={this.generalHandler} className="form-control" type='number' />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Description" columns='1' />
                            <Textarea fieldname='description' formname='ruleDefination' rows="5"
                                columns='7' style={{}} actionHandler={this.generalHandler} />
                            <Label text="Is Active" columns='1' />
                            <CheckBox fieldname='isActive' formname='ruleDefination' value={false}
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
                        {/* <Row>
                            <Label text="Description" columns='2' />
                            <Textarea fieldname='description' formname='ruleDefination' rows="5"
                                columns='9' style={{}} actionHandler={this.generalHandler} />
                        </Row>
                        <br />
                        {this.state.algorithmRule && <span><Row>
                            <Label text="Location:" columns='2' />

                            <Combobox fieldname='location' formname='ruleDefination' columns='9' style={{}}
                                state={this.state} typeName="listProcedures" dataSource={this.state}
                                multiple={false} actionHandler={this.generalHandler} />
                        </Row>
                            <br /></span>}
                        <Row>
                            <Label text="Type:" columns='2' />
                            <Radio fieldname='executionType' state={this.state} formname='ruleDefination' typeName="et-schedule" columns='9' style={{}}
                                dataSource={this.state.typeData} actionHandler={this.generalHandler} />
                        </Row>
                        <br />
                        <Row>
                            <Label text="Scheduled:" columns='2' />
                            <Combobox fieldname='scheduled' formname='ruleDefination' columns='4' style={{}}
                                state={this.state} typeName="et-streamNSchedule" dataSource={this.state.typeData}
                                multiple={false} actionHandler={this.generalHandler} />
                            <Label text="Time:" columns='1' />
                            <div className="col-md-4">
                                <DateTimeField
                                    mode="time"
                                    id="time"
                                    value={this.state.ruleDefination.time}
                                    onChange={this.onTimeChange}
                                />
                            </div>
                        </Row> */}
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
