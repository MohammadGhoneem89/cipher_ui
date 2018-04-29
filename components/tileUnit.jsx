import React from 'react';
import {browserHistory} from 'react-router';

class TileUnit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            i: 0
        }
        this.incrementIterator = this.incrementIterator.bind(this);
    }

    incrementIterator() {
        console.log(this.state.i);
        this.setState({i: this.state.i + 1})
        return this.state.i;
    }

    componentDidMount() {
        this.setState({i: 0})
    }

    componentWillMount() {
        this.setState({i: 0})
    }


    navigateToNext(URI) {
        if (URI) {
            browserHistory.push(URI);
        }
    }

    abbreviateNumber(value) {
        let newValue = value;
        if (value >= 1000) {
            let suffixes = ["", "K", "M", "B", "T"];
            let suffixNum = Math.floor(("" + value).length / 3);
            let shortValue = '';
            for (let precision = 2; precision >= 1; precision--) {
                shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum) ) : value).toPrecision(precision));
                let dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
                if (dotLessShortValue.length <= 2) {
                    break;
                }
            }
            if (shortValue % 1 !== 0){
                let shortNum = shortValue.toFixed(1);
            }
            newValue = shortValue + suffixes[suffixNum];
        }
        return newValue;
    }

    render() {

        return (
            <div>


                {this.props.data.map((td, index) => (



                    <a href="javascript:;" className={"dsh_blued" + (index + 1).toString()} key={index.toString()}
                       onClick={this.navigateToNext.bind(this, td.actionURI)}
                       style={{cursor: td.actionURI ? "" : "context-menu"}}>
                        <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                            <div className="dashboard-stat2 ">
                                <div className="display">
                                    <div className="number">
                                        <h3 className={"font-blued" + (index + 1).toString() + "-sharp"}><span
                                            data-counter="counterup"
                                            data-value="10">{this.abbreviateNumber(td.value)}</span></h3>
                                        <small>{td.title}</small>
                                    </div>
                                </div>
                                {td.percentageTag!==false && <div className="progress-info">
                                    <div className="progress"><span style={{width: (td.percentage || "0") + "%"}}
                                                                    className={"progress-bar progress-bar-success blued" + (index + 1).toString() + "-sharp"}> <span
                                        className="sr-only">{td.percentage}% progress</span> </span></div>
                                    <div className="status">
                                        <div className="status-title"> {td.percentageTag || "PROGRESS"} </div>
                                        <div className="status-number"> {(td.percentage || "0")}%</div>
                                    </div>
                                </div>}

                            </div>
                        </div>
                    </a>

                ))
                }
            </div>
        );


    }
}

export default TileUnit;