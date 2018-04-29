import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from '../common/utils.js';

class EntitySearchFilter extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            entityList: props.entityList
        };
    }

    componentDidMount() {

    }

    componentWillMount() {

    }
    genrateQRCode() {

    }

    render() {

        return (
            <div>
                
                    

                    <form action="#" className="horizontal-form">
                        <div className="form-body">
                                <div className="row">
                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <label className="control-label">From Date</label>
                                </div>
                                <div className="form-group col-md-8">
                                    <div className="input-group date" data-date="10/2012"  data-date-format="mm/yyyy" data-date-viewmode="years" data-date-minviewmode="months">
                                        <input type="text" className="form-control" readonly value={this.props.fromDate} />
                                        <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                    </div>
                                </div>


                            </div>
                            <div className="col-md-6">
                                <div className="form-group col-md-4">
                                    <label className="control-label">To Date</label>
                                </div>
                                <div className="form-group col-md-8">
                                    <div className="input-group date" data-date="10/2012" data-date-format="mm/yyyy" data-date-viewmode="years" data-date-minviewmode="months">
                                        <input type="text" className="form-control" value={this.props.toDate} readonly />
                                        <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                                    </div>
                                </div>


                            </div>
                        </div>
                             
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">PG Ref.No</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                            <input type="text" className="form-control" id="pgRefNo" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">SP Ref.No.</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                            <input type="text" className="form-control" id="sPRefNo" />
                                        </div>
                                    </div>

                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group col-md-4">
                                            <label className="control-label">Exception Type</label>
                                        </div>
                                        <div className="form-group col-md-8">
                                            <select name="cmbEntityList" id="cmbEntityList" className="form-control">
                                                <option value="-1" selected="selected">All</option>
                                                <option value="1901">SP-DEG</option>
                                                <option value="1902">DEG-PP</option>
                                            </select>

                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                    <div className="pull-right">
                                        <button type="submit" className="btn green">Search</button>
                                        <button type="button" className="btn default">Clear</button>
                                    </div>
                                    </div>
                                </div>
                                <div className="row">
                                </div>


                            
                        </div>
                    </form>

                
            </div>
        );

    }
}
export default EntitySearchFilter;