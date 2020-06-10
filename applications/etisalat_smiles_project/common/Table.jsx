import React, {Component} from 'react';

import $ from 'jquery';

$.DataTable = require('datatables.net');


class Table extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      title: this.props.title,
      dataGridTable: undefined,
      gridColumns: Object.assign([], this.props.gridColumns),
      gridData: Object.assign([], this.props.gridData),
      paging: this.props.paging,
      export: this.props.export
    };

  }

  render() {
    
    return (
 
            <div className="portlet light bordered">
                                <div className="portlet-title">
                                    <div className="caption font-dark">
                                        <i className="icon-settings font-dark"></i>
                                        <span className="caption-subject bold uppercase"> Managed Table</span>
                                    </div>
                                    <div className="actions">
                                        <div className="btn-group btn-group-devided" data-toggle="buttons">
                                            <label className="btn btn-transparent dark btn-outline btn-circle btn-sm active">
                                                <input type="radio" name="options" className="toggle" id="option1"/>Actions</label>
                                            <label className="btn btn-transparent dark btn-outline btn-circle btn-sm">
                                                <input type="radio" name="options" className="toggle" id="option2"/>Settings</label>
                                        </div>
                                    </div>
                                </div>


          <div className="portlet-body">
                                    <div className="table-toolbar">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="btn-group">
                                                    <button id="sample_editable_1_2_new" className="btn sbold green"> Add New
                                                        <i className="fa fa-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="btn-group pull-right">
                                                    <button className="btn green  btn-outline dropdown-toggle"  data-toggle="dropdown">Tools
                                                        <i className="fa fa-angle-down"></i>
                                                    </button>
                                                    <ul className="dropdown-menu pull-right">
                                                        <li>
                                                            <a href="javascript:;">
                                                                <i className="fa fa-print"></i> Print </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:;">
                                                                <i className="fa fa-file-pdf-o"></i> Save as PDF </a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript:;">
                                                                <i className="fa fa-file-excel-o"></i> Export to Excel </a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
									
									
									<table id="DataGrid" className="table table-striped table-bordered table-hover table-checkable order-column" width="100%"/>
      
									
						</div>
                      </div>    
                 
                   
        
    );
  }

  componentDidMount() {
    let _this = this;


    $(document).ready(function () {
      let table = $('#DataGrid').DataTable({
        columns: _this.props.gridColumns,
        data: _this.props.gridData,
        paging: _this.props.paging,
        dom: 'Bfrtip',
        
        buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
        ]
      });
      $( table.cells().nodes() ).removeClass( 'highlight' );
    });
  }

  componentWillUnmount() {
    $('#DataGrid')
      .DataTable()
      .destroy(true);
  }

}
export default Table;