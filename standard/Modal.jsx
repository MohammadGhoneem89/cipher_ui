import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class Modal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // rdata3: false
            formsDtat: [],
            buttonActions: []

        }
        // this.addMyDetail;
        // onClick={this.addMyDetail.bind(this)}
        // this.addMyDetail = this.addMyDetail.bind(this);
    }

    componentWillMount() {
        //script load
        var script = document.createElement("script");
        script.src = "./js/modal-jquery-trigger.js";
        script.async = true;
        document.body.appendChild(script);
        //script load end
    }

    componentDidMount() {

        $('#myModal1').modal('show');

        var formsDtat;
        if (this.props.data == null) {

            formsDtat = [
                {
                    "id": 1,
                    "lable": "Name",
                    "type": 'text',
                    "className": 'form-control',
                    "placeholder": 'Enter Name',
                    "ctrlType": "textfield"
                },
                {
                    "id": 2,
                    "lable": "Email",
                    "type": 'email',
                    "className": 'form-control',
                    "placeholder": 'Enter Email',
                    "ctrlType": "textfield"
                },
                {
                    "id": 3,
                    "lable": "Cell",
                    "type": 'text',
                    "className": 'form-control',
                    "placeholder": 'Enter Cell',
                    "ctrlType": "textfield"
                },
                {
                    "id": 4,
                    "lable": "Select",
                    "type": 'select',
                    "className": 'form-control',
                    "placeholder": '',
                    "ctrlType": "selectMenu"
                },
                {
                    "id": 5,
                    "lable": "Radio Group",
                    "ctrlType": "radioGroup",

                    radioList: [
                        {
                            "id": "rad1",
                            "name": "a",
                            "htmlfor": "rad1",
                            "txtlable": "Radio Button 1"
                        },
                        {
                            "id": "rad2",
                            "name": "a",
                            "htmlfor": "rad2",
                            "txtlable": "Radio Button 2"
                        },
                        {
                            "id": "rad3",
                            "name": "a",
                            "htmlfor": "rad3",
                            "txtlable": "Radio Button 3"
                        }
                    ]
                },

                {
                    "id": 6,
                    "lable": "Checkbox Group",
                    "ctrlType": "checkboxList",

                    checkboxList: [
                        {
                            "id": "chk1",
                            "name": "a",
                            "htmlfor": "chk1",
                            "txtlable": "Chk1 Button 1"
                        },
                        {
                            "id": "chk2",
                            "name": "b",
                            "htmlfor": "chk2",
                            "txtlable": "Chk2 Button 2"
                        },
                        {
                            "id": "chk3",
                            "name": "c",
                            "htmlfor": "chk3",
                            "txtlable": "Chk3 Button 3"
                        }
                    ]
                },

                {
                    "id": 7,
                    "lable": "Address",
                    "type": 'textarea',
                    "className": 'form-control',
                    "placeholder": 'Enter Address',
                    "ctrlType": "textArea"
                }
            ]
        }
        else {
            formsDtat = this.props.data;
        }
        this.setState({ formsDtat: formsDtat });


        var buttonActions;
        if (this.props.dataButtons == null) {

            buttonActions = [
                // {
                //     "id": 1,
                //     "btnText": 'OK',
                //     "className": 'btn btn-info fluid_Btn',
                //     "name":"",
                //     "BtnType": "ok"
                // },
                {
                    "id": 2,
                    "btnText": 'CANCEL',
                    "className": 'btn btn-danger fluid_Btn',
                    "name": "",
                    "BtnType": "cancel"
                },
                {
                    "id": 3,
                    "btnText": 'SUBMIT',
                    "className": 'btn btn-success fluid_Btn',
                    "name": "",
                    "BtnType": "submit"
                }
            ]
        }
        else {
            buttonActions = this.props.dataButtons;
        }
        this.setState({ buttonActions: buttonActions });

    }

    render() {

        function getForm(fd) {
            if (fd.ctrlType == 'textArea') {
                return <textarea type={fd.type} className={fd.className} placeholder={fd.placeholder}></textarea>
            }
            else if (fd.ctrlType == 'radioGroup') {
                return <div className="radiobuttoninline clearfix">
                    {fd.radioList.map((rv, index) => (
                        <div key={index.toString()}>
                            <input type="radio" id={rv.id} name={rv.name} />
                            <label htmlFor={rv.htmlfor}><span></span>{rv.txtlable}</label>
                        </div>
                    ))}
                </div>
            }
            else if (fd.ctrlType == 'checkboxList') {
                return <div className="checkboxkinline clearfix">
                    {fd.checkboxList.map((cv, index) => (
                        <div key={index.toString()}>
                            <input type="checkbox" id={cv.id} name={cv.name} />
                            <label htmlFor={cv.htmlfor}><span></span>{cv.txtlable}</label>
                        </div>
                    ))}
                </div>
            }
            else if (fd.ctrlType == 'selectMenu') {
                return <select className="js-example-basic-single form-control">
                    <option value="Select">Select</option>
                    <option value="Select 1">Select 1</option>
                    <option value="Select 2">Select 2</option>
                    <option value="Select 3">Select 3</option>
                </select>
            }
            else {
                return <input type={fd.type} className={fd.className} placeholder={fd.placeholder} />

            }
        }

        function getButton(bd) {
            if (bd.BtnType == 'ok') {
                return <button type="submit" className={bd.className}>{bd.btnText}</button>
            }
            else if (bd.BtnType == 'cancel') {
                return <button type="button" className={bd.className} data-dismiss="modal">{bd.btnText}</button>
            }
            else {
                return <button type="submit" className={bd.className}>{bd.btnText}</button>

            }
        }

        return (
            <div className="col-md-12">
                <div className="row">

                    <div className="modal fade" id="myModal1" role="dialog">
                        <div className="modal-dialog modal-md">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    <h4 className="modal-title">{this.props.title}</h4>
                                </div>
                                <div className="modal-body clearfix"><p>{this.props.content}</p>
                                    {this.state.formsDtat.map((fd, index) => (
                                        <div className="row fieldspace" key={index.toString()}>
                                            <label>{fd.lable}<mandatory>*</mandatory></label>
                                            {getForm(fd)}
                                        </div>
                                    ))}
                                </div>
                                <div className="clearfix"></div>
                                <div className="modal-footer">
                                    {this.state.buttonActions.map((bd, index) => (
                                        <div className="col-md-6" key={index.toString()}>
                                            {getButton(bd)}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Modal;