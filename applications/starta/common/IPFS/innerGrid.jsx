import React from 'react';
import * as utils from '../../../../core/common/utils.js';
import Pagination from '../../../../core/components/paginator.jsx';
import TableCell from './TableCell.jsx';

let _ = require('lodash');

let lastPage = 1;

class InnerGrid extends React.Component {

    constructor(props) {
        super(props);
console.log('inside inner grid')

        this.state = {
            exampleItems: [],
            pageOfItems: []
        };

        this.onChangePage = this.onChangePage.bind(this);
    }

    componentWillMount() {
        let exampleItems = _.range(1, this.props.totalRecords);
        this.setState({ exampleItems: exampleItems });
    }

    searchClicked(form) {

        let searchINP = $('#searchINP').val();

        //this.props.searchCallBack(searchINP);


    }

    onChangePage(pageNo) {
        this.setState({ pageOfItems: pageNo });


        if (lastPage != pageNo) {
            //console.log(pageNo);
            lastPage = pageNo;
            //this.props.pageChanged(pageNo);
        }

    }

    getSearch(searchFlag) {
        if (searchFlag && searchFlag === true) {
            return (
                <div className="input-group">

                    <input type="text" className="form-control" id="searchINP" name="input_group" placeholder="Search" />
                    <span className="input-group-addon">
                        <a href="javascript:;" onClick={this.searchClicked.bind(this)}><i className="fa fa-search" /></a>
                    </span>
                </div>
            );
        }


    }

    getExport(exportFlag) {
        if (exportFlag && exportFlag === true)
            return (
                <div className="btn-group pull-right">
                    <button className="btn green  btn-outline dropdown-toggle" data-toggle="dropdown">Export
                        <i className="fa fa-angle-down" />
                    </button>
                    <ul className="dropdown-menu pull-right">

                        <li>
                            <a href="javascript:;">
                                <i className="fa fa-file-pdf-o" /> PDF </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <i className="fa fa-file-excel-o" />Excel </a>
                        </li>
                    </ul>
                </div>
            );

    }

    getPagination(paginationFlag) {
        if (paginationFlag && paginationFlag === true) {
            return (
                <div className="pull-right">
                    <Pagination items={this.state.exampleItems} onChangePage={this.onChangePage} />
                </div>

            );
        }


    }

    displayNoRecordFoundRow(display) {
        /* return (
             //<tr key="1" >{utils.getLabelByID("Tabel_noRecordFoundMessage")}</tr>
         )*/
    }

    render() {


        if (this.props.gridData && this.props.gridData.length > 0)
            return (

                <div className="row">
                    <div className="col-md-12">

                        <div className="portlet-title">
                            <div>
                                
                                <h4 style={{fontWeight: "bold"}}>{this.props.title }</h4>
                            </div>

                        </div>


                        <div className="row">
                            <div className="col-md-12 ">
                                <table className="table table-bordered table-striped table-condensed flip-content">
                                    <thead className="flip-content">
                                        <tr>
                                            {
                                                this.props.gridColumns.map((sd, index) => {
                                                    return (
                                                        <th key={index.toString()}
                                                            className="text"> {utils.getLabelByID(sd.alias)} </th>

                                                    )
                                                })}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.gridData.map((rowData, index) => {
                                                return (
                                                    <tr key={index.toString()}>
                                                        {
                                                            this.props.gridColumns.map((colData, index2) => {
                                                                console.log("colData inner grid ", colData, rowData)
                                                                return (
                                                                    <TableCell key={index2.toString()}
                                                                        cellData={colData.type == "object" ? (rowData != null ? rowData: "") : rowData}
                                                                        type={colData.type}
                                                                        columnWidth={colData.width ? colData.width : ""} />
                                                                );
                                                            })
                                                        }
                                                    </tr>
                                                );
                                            })}
                                        {this.displayNoRecordFoundRow(this.props.gridData.length <= 0)}
                                    </tbody>
                                </table>


                            </div>
                        </div>
                    </div>
                </div>


            );
        else {
            return (<div />);
        }
    }
}

export default InnerGrid;