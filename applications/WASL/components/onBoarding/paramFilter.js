import React from 'react';
import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication.js';
import DateControl from '../../../../core/common/DateControl.jsx'
import * as dates from '../../../../core/common/dates.js';

class paramFilter extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            filter : props.params
        };

        this.generateFilters = this.generateFilters.bind(this);
    }

    componentDidMount() {

    }

    componentWillMount() {

    }


    getTextBox(filter) {
        return (<div className="row">
                <div className="col-md-6">
                    <div className="form-group col-md-4">
                        <label className="control-label">{utils.getLabelByID(filter["name"])}</label>
                    </div>
                    <div className="form-group col-md-8">
                        <input type="text" className="form-control " id={filter["name"]} onChange={this.props.onParamChange}/>
                    </div>
                </div>
            </div>
        )

    }

    getDropDown(filter) {
        let list = [];

            return (
                <div className="col-md-6">
                    <div className="form-group col-md-4">
                        <label className="control-label">{utils.getLabelByID(filter["name"])}</label>
                    </div>
                    <div className="form-group col-md-8">
                        <select name={filter["name"]} id={filter["name"]} className="form-control">
                            {list.map((option, index) => {
                                return (
                                    <option key={index} value={option.value}>{option.label}</option>
                                );
                            })}
                        </select>
                    </div>
                </div>)

    }

    getMultiSelectList(filter) {
        let list = [];

        return (<div className="col-md-6">
            <div className="form-group col-md-4">
                <label className="control-label">{utils.getLabelByID(filter["label"])}</label>
            </div>
            <div className="form-group col-md-8">
                <select name={filter["id"]} id={filter["id"]} multiple="multiple" className="multi-select" style={{ width: "370" }}>
                    <option value="All" selected="true">All</option>
                    {list.map((option, index) => {
                        return (
                            <option key={index} value={option.value}>{option.label}</option>
                        );
                    })}
                </select>
            </div>
        </div>)
    }

    getDateFilter(filter) {
        return (<div className="col-md-6">
            <div className="form-group col-md-4">
                <label className="control-label">{utils.getLabelByID(filter["name"])}</label>
            </div>
            <div className="form-group col-md-8">
                <DateControl id={filter["name"]}/>
            </div>
        </div>)
    }

    generateFilters(filter) {
        if (filter === undefined)
            return "";

        if (filter["type"] === "textbox")
            return this.getTextBox(filter);

        else if (filter["type"] === "multipleSelectionList")
            return this.getMultiSelectList(filter);

        else if (filter["type"] === "dropdown")
            return this.getDropDown(filter);

        else if (filter["type"] === "datetime")
            return this.getDateFilter(filter)

    }

    clearFields() {
        $('#filterForm').find('input:text').val('');
        $('#filterForm').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }

    onChange(filterId, element){
        if(filterId==="Entity"){
            let selectedValues = [];
            Object.keys(element.options).map((item)=>{
                if (element.options[item].selected) {
                    selectedValues.push(element.options[item].value);
                }
            });
            console.log(selectedValues);
        }
    }

    render() {
        return (
            <div className="form-body" id="filterForm" key="filterForm">
                {this.state.error && <div className="alert alert-danger" style={{ textAlign: "center" }}>
                    <strong>Error!</strong> {this.state.error} </div>}
                <div className="row">
                    {this.generateFilters(this.state.filter[0])}
                    {this.generateFilters(this.state.filter[1])}
                </div>
                <div className="row">
                    {this.generateFilters(this.state.filter[2])}
                    {this.generateFilters(this.state.filter[3])}
                </div>
                <div className="row">
                    {this.generateFilters(this.state.filter[4])}
                    {this.generateFilters(this.state.filter[5])}
                </div>
                <div className="row">
                    {this.generateFilters(this.state.filter[6])}
                    {this.generateFilters(this.state.filter[7])}
                </div>
                <div className="row">
                    {this.generateFilters(this.state.filter[8])}
                    {this.generateFilters(this.state.filter[9])}
                </div>
                <div className="row">
                    {this.generateFilters(this.state.filter[10])}
                    {this.generateFilters(this.state.filter[11])}
                </div>

            </div>

        );

    }
}

export default paramFilter;