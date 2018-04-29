import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class Confirmationmodal extends React.Component {

    componentDidMount() {
        $('#myModal').modal('show');
    }

    componentWillUnmount() {
        $('#myModal').modal('hide');
    }

    render() {

        return (
            <div className="col-md-12">
                <div className="row">

                    <div className="modal fade" id="myModal" role="dialog">
                        <div className="modal-dialog modal-sm">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">{this.props.conftitle}</h4>
                                </div>
                                <div className="modal-body">
                                    <p>{this.props.confcontent}</p>
                                </div>
                                <div className="modal-footer">
                                    <div className="col-md-6"><button className="btn btn-danger fluid_Btn loading-button" data-dismiss="modal"><img className="loader" src="images/button-loader.gif" alt="" /> Close</button></div>
                                    <div className="col-md-6"><button onClick={this.props.confirmButton} className="btn btn-success fluid_Btn loading-button"><img className="loader" src="images/button-loader.gif" alt="" /> OK</button></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Confirmationmodal;