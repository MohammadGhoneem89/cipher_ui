import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';


class Steps extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = { countDownDisplay: '', timerID: 0 }
    }

    componentDidMount() {

        if (this.props.displayTicker && this.props.displayTicker == true) {
            
            let timerID = 0;
            timerID = setInterval(this.timer.bind(this), 1000);
            this.setState({timerID})

        }


    }

    componentWillMount() {

    }
    componentWillUnmount() {
        clearInterval(this.state.timerID);
    }
    timer() {


        var now = new Date().getTime()
        let countDownDate = this.props.SLA;


        if (this.props.move == 'DOWN') {
            var distance = countDownDate - now;
            $('#counterStamp').addClass('stmpgrn');

        } else {
            var distance = now - countDownDate;


        }

        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        let display = days + ' Days,  ' + hours + "h: " + minutes + "m: " + seconds + "s ";
        display = display.toString().replace('-', '')

        //document.getElementById("counterStamp").innerHTML = display;

        if (distance < 0) {
            //clearInterval(x);
            this.setState({ countDownDisplay: 'EXPIRED' })
        }
        else
            this.setState({ countDownDisplay: display })
    }

    getArrow(index, statusLength) {
        if (index != statusLength - 1)
            return (<i className="fa fa-long-arrow-right" aria-hidden="true"></i>)
    }
    getLiCSS(sd) {
        if (sd.type && sd.type == 'ERROR')
            return 'inactive err'
        else if (sd.status == false)
            return 'inactive'
        else
            return 'done'

    }
    displayTicker(statusList, index) {
        if (this.props.displayTicker && this.props.displayTicker == true) {
            
            if (this.props.SLAStatus == statusList[index].label && this.props.move !='NONE' && statusList.length -1 !=index)
            {
                return (<span id="counterStamp">{this.state.countDownDisplay} </span>)
            }
        }
    }
    render() {
        return (<div>


            <div className="form-wizard">
                <ul className="nav nav-pills nav-justified steps">
                    {this.props.statusList.map((sd, index) => (
                        <li className={this.getLiCSS(sd)}>
                            <a href="#tab1" data-toggle="tab" className="step" aria-expanded="false">
                              {console.log(sd,"TEXT")}
                                <span className={'number'}> {sd.text ||index + 1} </span>
                                <span className="desc">
                                    <i className="fa fa-check"></i> {sd.label} </span>
                            </a>
                            {this.displayTicker(this.props.statusList, index)}
                            {this.getArrow(index, this.props.statusList.length)}
                        </li>

                    ))
                    }
                </ul>
            </div>
        </div>)

    }
}
export default Steps;