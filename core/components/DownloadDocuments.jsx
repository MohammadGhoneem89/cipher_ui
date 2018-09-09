import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from '../common/utils.js';

class DownloadDocuments extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			batchID: props.BatchID,			
		};
	}

	componentDidMount() {
		//this.genrateQRCode();
	}

	componentWillMount() {
		
	}
	render() {
		
		return (
			<div id="placeHolder">

				<input type="button" value={this.props.BatchID} />

			</div>			
		
		);
		
	}
}
export default DownloadDocuments;