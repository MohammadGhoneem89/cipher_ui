import React from 'react';
import * as utils from '../../common/utils.js';
import * as constants from '../../constants/Communication.js';
import DateControl from '../../common/DateControl.jsx'
import * as dates from '../../common/dates.js';
let count = -1;
let getValue = ""
class paramFilter extends React.Component {

    constructor(props, context) {

        super(props, context);
        // console.log(props, "###############")
        if (props.params) {
            // console.log(props.params, "000000")
            this.state = {
                filter: props.params,
               
            };
        }
 
        this.generateFilters = this.generateFilters.bind(this);
    }

    componentDidMount() {
        window.scrollTo(0, 0);
    }

    componentWillMount() {
    }

    getTextBox(filter) {
    
        return (
            <div className="row">
                {this.state.filter &&
                    // this.state.filter.map((filter,index)=>
                    <div className="form-group col-md-12">
                        <div className="col-md-4">
                            <label className="control-label" style={{ textAlign: 'center', padding: '15px' }}>{utils.getLabelByID(filter["name"])}</label>
                        </div>
                        <div className="col-md-4">
                            <input type="text" className="form-control"
                                id={filter["name"]}
                                onChange={this.props.onParamChange}
                                defaultValue={filter.value}
                                disabled={this.props.isEnabled == false} />
                        </div>
                    </div>
                    // )
                }
            </div>
        )

    }

    getDropDown(filter) {
        let list = [];
        console.log("getDropdown")
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
        console.log("getmultiselect")
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
                <DateControl id={filter["name"]} />
            </div>
        </div>)
    }

    generateFilters(filter) {
        if (filter === undefined)
            return "";
        else if (filter["type"] === "textbox" || !this.props.isEnabled)
            return this.getTextBox(filter);

        else if (filter["type"] === "multipleSelectionList")
            return this.getMultiSelectList(filter);

        else if (filter["type"] === "dropdown")
            return this.getDropDown(filter);

        else if (filter["type"] === "datetime")
            return this.getDateFilter(filter)

        else
            return (<div></div>)

    }

    clearFields() {
        $('#filterForm').find('input:text').val('');
        $('#filterForm').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
    }

    onChange(filterId, element) {
        if (filterId === "Entity") {
            let selectedValues = [];
            Object.keys(element.options).map((item) => {
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
                {this.state.error &&
                    <div className="alert alert-danger" style={{ textAlign: "center" }}>
                        <strong>Error!</strong> {this.state.error} </div>}
                <div className="row">
                {/* {console.log(this.state.filter[0],"-----------------------------------------")} */}
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