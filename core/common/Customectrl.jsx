import React from 'react';
import ReactDOM from 'react-dom';
import Contentcomp from './Contentcomp.jsx';
import Datatips from './Datatips.jsx';
import { Link, browserHistory } from 'react-router';

/*
getInitialState() {
    return {
    "isVisible": true
    };
}
componentDidMount() {
    this.setState({
    "isVisible": false
    })
}*/

/* if ({ this.state.showResults } == true) {
<div>
     show here
</div>
}*/
/* var sr;
if(this.state.showResults){
    sr = 'data-show'
}
else{
    sr = 'data-hide'
}*/

/*var stp1;
if (this.state.step1) {
    stp1 = 'data-show'
}
else {
    stp1 = 'data-hide'
}*/

class Customectrl extends React.Component {

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);

        this.handleClick = this.handleClick.bind(this);
        this.changeStatus = this.changeStatus.bind(this);

        this.state = {
            buttonvalue: "SUBMIT",
            title: "Title Here",
            content: "Description Text Here",

            checked1: true,
            checked2: false,

            data: 'Initial data...',
            isToggleOn: true,
            showResults: false,

            step1: true,
            step2: false,
            step3: false,

            rdata1: true,
            rdata2: false,
            rdata3: false,

            component1: true,
            component2: false,
            bgColor: 'red'

        }
    }

    ronshowData(value) {
        if (value == 'apple') {
            this.setState({ rdata1: true, rdata2: false, rdata3: false });
        }
        else if (value == 'orange') {
            this.setState({ rdata1: false, rdata2: true, rdata3: false });
        }
        else if (value == 'mango') {
            this.setState({ rdata1: false, rdata2: false, rdata3: true });
        }
    }

    onShow() {
        this.setState({ showResults: !this.state.showResults });
    }

    handleClick() {
        this.setState(prevState => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    changeStatus() {
        this.setState({ data: 'Data updated...' })
    }

    handleChange() {
        this.setState({
            checked1: !this.state.checked1
        })
    }

    handleChange2() {
        this.setState({
            checked2: !this.state.checked2
        })
    }

    st1() {
        this.setState({ step1: false, step2: true, step3: false });
    }

    st2() {
        this.setState({ step1: false, step2: false, step3: true });
    }

    st3() {
        this.setState({ step1: true, step2: false, step3: false });
    }

    rollView() {
        this.setState({ component1: false, component2: true });
    }

    addRoll() {
        this.setState({ component1: true, component2: false });
    }

    colorchangeHendal() {
        this.setState({ bgColor: 'blue' });
    }

    bgChange(e) {

        var id = e.target.id;
        switch (e.target.id) {
            case "btn1":
                this.setState({ btnChange: !this.state.btnChange });
                break

            case "btn2":
                this.setState({ btnChange2: !this.state.btnChange2 });
                break
        }
        console.log(e);

    }


    render() {

        const sr = this.state.showResults ? 'data-show' : 'data-hide';

        const togglecheck1 = this.state.checked1 ? '' : 'data-hide';
        const togglecheck2 = this.state.checked2 ? '' : 'data-hide';

        const radiodata1 = this.state.rdata1 ? '' : 'data-hide';
        const radiodata2 = this.state.rdata2 ? '' : 'data-hide';
        const radiodata3 = this.state.rdata3 ? '' : 'data-hide';

        const stp1 = this.state.step1 ? 'data-show' : 'data-hide';
        const stp2 = this.state.step2 ? 'data-show' : 'data-hide';
        const stp3 = this.state.step3 ? 'data-show' : 'data-hide';

        const com1show = this.state.component1 ? 'data-show' : 'data-hide';
        const com2show = this.state.component2 ? 'data-show' : 'data-hide';

        const btnColorchange = this.state.btnChange ? 'btnDeactive' : 'btnActive';
        const btnColorchange1 = this.state.btnChange2 ? 'btnDeactive' : 'btnActive';

        return (
            <div className="row">

                <div className="col-md-12">
                    <Contentcomp buttonvalue={this.state.buttonvalue} content={this.state.content} title={this.state.title} />
                </div>
                <div className="col-md-12 margin-top">
                    <button onClick={this.colorchangeHendal.bind(this)} style={{ backgroundColor: this.state.bgColor }}>Button</button>
                    <br /><br />
                    <button id="btn1" onClick={this.bgChange.bind(this)} className={btnColorchange}>Button</button>
                    <button id="btn2" onClick={this.bgChange.bind(this)} className={btnColorchange1}>Button</button>

                </div>

                <div className="col-md-12 margin-top">
                    <h4>Checkbos Button Ctrl</h4>
                    <input type="checkbox" checked={this.state.checked1} onChange={this.handleChange} />
                    <input type="checkbox" checked={this.state.checked2} onChange={this.handleChange2} />
                    <br />
                    <div className={togglecheck1}>show hide div with check 1</div>
                    <div className={togglecheck2}>show hide div with check 2</div>
                </div>

                <div className="col-md-12 margin-top">
                    <h4>Radio Button Ctrl</h4>
                    <label style={{ 'display': 'inline-block' }}><input type="radio" value="apple" name="a" checked={this.state.rdata1} onClick={this.ronshowData.bind(this, 'apple')} /> apple</label>
                    <label style={{ 'display': 'inline-block' }}><input type="radio" value="orange" name="a" checked={this.state.rdata2} onClick={this.ronshowData.bind(this, 'orange')} /> orange</label>
                    <label style={{ 'display': 'inline-block' }}><input type="radio" value="mango" name="a" checked={this.state.rdata3} onClick={this.ronshowData.bind(this, 'mango')} /> mango</label>
                    <br />
                    <div className={radiodata1}>apple data</div>
                    <div className={radiodata2}>orange data</div>
                    <div className={radiodata3}>mango data</div>
                </div>

                <div className="col-md-12 margin-top">
                    <h4>Forms Step Ctrl</h4>
                    <div className={stp1}><button onClick={this.st1.bind(this)}>step1</button><br />step 1 data here
                </div>
                    <div className={stp2}><button onClick={this.st2.bind(this)}>step2</button><br />step 2 data here
                </div>
                    <div className={stp3}> <button onClick={this.st3.bind(this)}>step3</button><br />step 3 data here
                </div>
                </div>

                <div className="col-md-12 margin-top">
                    <h4>Change Button Text Ctrl</h4>
                    <button onClick={this.handleClick}>{this.state.isToggleOn ? 'SEND' : 'SUBMIT'}</button>
                    <br /><br />
                    <h4>Change State Ctrl</h4>
                    <button onClick={this.changeStatus}>CLICK</button>
                    <br /><br />
                    <p>{this.state.data}</p>
                    <br />
                    <h4>Onclick Show Content Ctrl</h4>
                    <button onClick={this.onShow.bind(this)}>CLICKSHOW</button>
                    <div className={sr}>show hide div with data 1</div>
                    <br />
                </div>


                <div className="col-md-12 margin-top">

                    <div className={com1show}>
                        <button onClick={this.rollView.bind(this)}>addRoll</button><br />
                        component1
                </div>

                    <div className={com2show}>
                        <button onClick={this.addRoll.bind(this)}>backRollview</button><br />
                        component2
                <Datatips />
                    </div>

                </div>


            </div>
        );
    }
}

export default Customectrl;