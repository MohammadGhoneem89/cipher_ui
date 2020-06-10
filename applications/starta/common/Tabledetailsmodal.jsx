import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class Tabledetailsmodal extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }

    componentDidMount() {
        $('#myModal').modal('show');
    }

    // componentWillUnmount() {
    //     $('#myModal').modal('hide');
    // }

    render() {

        let form;
        if (this.props.detailsTitle == "Edit Details") {
            form = (
                <div key={this.props.rowData.id}>
                    <div className="col-md-6 fieldspace"><input type="text" className="form-control" value={this.props.rowData.id} /></div>
                    <div className="col-md-6 fieldspace"><input type="text" className="form-control" value={this.props.rowData.name} /></div>
                    <div className="col-md-6 fieldspace"><input type="text" className="form-control" value={this.props.rowData.email} /></div>
                    <div className="col-md-6 fieldspace"><input type="text" className="form-control" value={this.props.rowData.cell} /></div>
                    <div className="col-md-6 fieldspace"><input type="text" className="form-control" value={this.props.rowData.productname} /></div>
                    <div className="col-md-6 fieldspace"><input type="text" className="form-control" value={this.props.rowData.price} /></div>
                </div>
            )
        }
        else {
            form = (
                <div key={this.props.rowData.id}>
                    <div className="col-md-6">{this.props.rowData.id}</div>
                    <div className="col-md-6">{this.props.rowData.name}</div>
                    <div className="col-md-6">{this.props.rowData.email}</div>
                    <div className="col-md-6">{this.props.rowData.cell}</div>
                    <div className="col-md-6">{this.props.rowData.productname}</div>
                    <div className="col-md-6">{this.props.rowData.price}</div>
                </div>
            )
        }

        return (
            <div className="col-md-12">
                <div className="row">
                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">{this.props.detailsTitle}</h4>
                                </div>
                                <div className="modal-body clearfix">
                                    {form}
                                </div>
                                <div className="modal-footer">
                                    <div className="col-md-6"><button className="btn btn-danger fluid_Btn" data-dismiss="modal"> Close</button></div>
                                    <div className="col-md-6"><button onClick={this.props.detailsButton} className="btn btn-success fluid_Btn"> SUBMIT</button></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Tabledetailsmodal;