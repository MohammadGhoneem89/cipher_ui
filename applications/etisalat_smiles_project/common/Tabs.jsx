import React from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';

class Tabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabsDta: [],
        }
    }

    componentDidMount() {

         var tabsDta;
         if(this.props.data == null){

             tabsDta = [
            {
                "id": 1,
                "title": "Tabs1",
                "className": 'activeTab',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
            },
            {
                "id": 2,
                "title": "Tabs2",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
            },
            {
                "id": 3,
                "title": "Tabs3",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
            },
            {
                "id": 4,
                "title": "Tabs4",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
            },
            {
                "id": 5,
                "title": "Tabs5",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
            },
            {
                "id": 6,
                "title": "Tabs6",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
            },
            {
                "id": 7,
                "title": "Tabs7",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
            },
            {
                "id": 8,
                "title": "Tabs8",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
            }
        ]
         }
       else{
           tabsDta = this.props.data;
       }

        this.setState({ tabsDta: tabsDta, currentDescription: tabsDta[0].description });
    }

    componentWillMount() {
    }

    tabActive(index) {

        // tab list active
        var tabList = this.state.tabsDta;
        this.tabsDta
        for (var i = 0; i < tabList.length; i++) {
            if (i == index) {
                tabList[i].className = 'activeTab';
            }
            else {
                tabList[i].className = '';
            }
        }
        this.setState({ tabsDta: tabList });
        // tab list active end

        this.setState({ currentDescription: this.state.tabsDta[index].description });
    }

    render() {
        return (
            <div>
                <div style={{display: 'flex', flexDirection: 'column'}} className="whitewrap padding-top padding-bottom clearfix">
                    <div className="col-md-12">
                        <ul className="tabslist">
                            {this.state.tabsDta.map((td, index) => (
                                <li className={td.className} style={{width: `${100/this.state.tabsDta.length+'%'}`}} key={index.toString()}><a href="javascript:;"  onClick={this.tabActive.bind(this, index)}>{td.title}</a></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-12">
                        <div className="row">
                            <div className="tabscontent">{this.state.currentDescription}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tabs;