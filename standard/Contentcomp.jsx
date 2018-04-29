import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class Contentcomp extends React.Component {

    render() {
        return (
            <div className="col-md-6">
                <div className="row">
                    <h4>{this.props.title}</h4>
                    <br />
                    <p>{this.props.content}</p>
                    <br />
                    <input type="button" className="btn btn-Default success_Btn" value={this.props.buttonvalue} />
                </div>
            </div>
        );
    }
}

export default Contentcomp;