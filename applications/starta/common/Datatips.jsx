import React from 'react';
import ReactDOM from 'react-dom';
import Tabs from './Tabs.jsx';
import { Link, browserHistory } from 'react-router';


class Datatips extends React.Component {

    render() {
        var data = [
            {
                "id": 13,
                "title": "Tabs13",
                "className": 'activeTab',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
            },
            {
                "id": 14,
                "title": "Tabs14",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
            },
            {
                "id": 15,
                "title": "Tabs15",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. "
            },
            {
                "id": 16,
                "title": "Tabs16",
                "className": '',
                "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries. "
            }
        ]
        return (
            <div>
                <h2>Datatips Page</h2>
                <p>Datatips Content</p>
                <Tabs data={data} />
            </div>
        );
    }
}

export default Datatips;