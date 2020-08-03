import React from "react";
import ReactToPrint from "react-to-print";
import Documentation from "../Documentation/DocumentationContainer.jsx";

class GeneratePDF extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => {
                        return (<div className="tools" style={{
                            position: "absolute",
                            zIndex: "10",
                            marginLeft: "93%",
                            marginTop: "20px"}}>
                            <a className="btn btn-default upercase" href="#"
                               style={{
                                   height: "30px",
                                   fontSize: "12px"
                               }}
                            > export </a>
                        </div>);
                    }}
                    content={() => this.componentRef}
                />
                <Documentation params={this.props.params} ref={el => (this.componentRef = el)} />
            </div>
        );
    }
}

export default GeneratePDF;
