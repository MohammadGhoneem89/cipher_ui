import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class QRCodeJquery extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
        };
    }

    componentDidMount() {
        {this.createQRCode()}

    }

    componentWillMount() {

    }
    createQRCode() {
        if (this.props.qrString != undefined) {
            
            var img = new Image();
            img.src = "../images/lock.png";
            var options = {
                render: 'canvas',

                minVersion: 6,
                maxVersion: 35,

                ecLevel: this.props.errorCorrectionLevel,

                left: 0,
                top: 0,

                size: this.props.size,

                fill: '#333333',

                background: "#ffffff",

                text: this.props.qrString,

                radius: 0.5,

                quiet: 0,

                mode: 0,

                mSize: 0.11,
                mPosX: 0.5,
                mPosY: 0.5,

                label: 'no label',
                fontname: 'Ubuntu',
                fontcolor: '#ff9818',


                image: img
            }
            try {
                document.getElementById("placeHolderQRCode").innerHTML = ""
                $(placeHolderQRCode).qrcode(options);
            }
            catch (val) {

            }
        }
    }


    render() {
        if(this.props.qrString)
        return (
            <div>
                <div id="placeHolderQRCode" >
                </div>
             </div>

        );
        else
        return (<div> </div>)


    }
}
export default QRCodeJquery;