/*standard imports*/
import React from 'react';
import { browserHistory } from 'react-router';


class Sidebar extends React.Component {

    constructor(props) {
        super(props);


    }

    getMenuitem(pageURI) {

        browserHistory.push(pageURI);
    }


    componentDidMount() {


    }

    componentWillMount() {

    }

    getMenuPage(indexVal, page) {

        if (page.displayMenu) {
            return (<li key={indexVal.toString()} className="nav-item start ">
                <a href="javascript:;"
                    onClick={this.getMenuitem.bind(this, page.pageURI)}
                    className="nav-link ">
                    <i className={page.icon ? page.icon : ""} />
                    <span className="title"> {page.label}</span>
                </a>
            </li>)
        }

    }
    getSubMenuClass(children) {
        if (children.length > 6)
            return 'sub-menu upward'
        else
            return 'sub-menu'

    }
    getMenu(sd, index) {
        if (sd.displayMenu) {
            return (
                <li key={index.toString()} className="nav-item">
                    <a href="javascript:;" className="nav-linknav-toggle">
                        <i className={sd.iconName} />
                        <span className="title">{sd.label}</span>
                        <span className="Selected"></span>

                    </a>

                    <ul className={this.getSubMenuClass(sd.children)} style={{ "display": "none" }}>
                        {
                            sd.children.map((page, indexVal) => (
                                this.getMenuPage(indexVal.toString(), page)
                            ))
                        }
                    </ul>

                </li>

            )
        }
    }

    render() {
        return (
            <div className="page-sidebar-wrapper">
                <div className="page-sidebar navbar-collapse collapse">
                    <div className="menu-toggler sidebar-toggler">
                        <i className="fa fa-bars" aria-hidden="true"></i>
                    </div>
                    <ul className="page-sidebar-menu  page-header-fixed page-sidebar-menu-hover-submenu "
                        data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">


                        {
                            this.props.data.menuPermissions.map((sd, index) => (

                                this.getMenu(sd, index)

                            ))
                        }
                    </ul>
                </div>
            </div>





        );
    }
}


export default Sidebar;
