import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import * as utils from '../common/utils.js';

class QRCode extends React.Component {

	constructor(props, context) {
		super(props, context);

		this.state = {
			typeNumber: props.typeNumber,
			errorCorrectionLevel: props.errorCorrectLevel,
			qrString: props.qrString
		};
	}

	componentDidMount() {
		//this.genrateQRCode();
	}

	componentWillMount() {
		
	}
	genrateQRCode()
	{
		
				var typeNumber = this.props.typeNumber;
				var errorCorrectionLevel = this.props.errorCorrectLevel;
				var qr = qrcode(typeNumber, errorCorrectionLevel);
				qr.addData(this.props.qrString);
				qr.make();
				document.getElementById('placeHolder').innerHTML = qr.createImgTag();

	}

	render() {
		
		return (
			<div>
			<div id="placeHolder">

				<input type="button" value="Display QR Code" onClick={this.genrateQRCode.bind(this)} />

			</div>
			
			</div>			
		
		);
		
	}
}
export default QRCode;