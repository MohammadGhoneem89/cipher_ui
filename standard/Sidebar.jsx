/*standard imports*/
import React from 'react';
import { browserHistory } from 'react-router';


class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { selectedIndex: 0 }
        sessionStorage.selectedIndex = 0;
    }

    getMenuitem(pageURI, index) {
        sessionStorage.selectedIndex = index;
        browserHistory.push(pageURI);
    }


    componentDidMount() {


    }

    componentWillMount() {

    }

    getMenuPage(indexVal, page, index) {

        if (page.displayMenu) {
            return (<li key={indexVal.toString()} className="nav-item start ">
                <a href="javascript:;"
                    onClick={this.getMenuitem.bind(this, page.pageURI, index)}
                    className="nav-link ">
                    <i className={page.icon ? page.icon : ""} />
                    <span className="title"> {page.label}</span>
                </a>
            </li>)
        }

    }
    getSubMenuClass(children, index) {
        if (children.length > 5 && index > 4)
            return 'sub-menu upward'
        else
            return 'sub-menu'

    }
    getMenu(sd, index) {
        if (sd.displayMenu) {
            return (
                <li key={index.toString()} className={sessionStorage.selectedIndex == index ? "nav-item active" : "nav-item"}>
                    <a href="javascript:;" className="nav-linknav-toggle">
                        <i className={sd.iconName} />
                        <span className="title">{sd.label}</span>


                    </a>

                    <ul className={this.getSubMenuClass(sd.children, index)} style={{ "display": "none" }}>
                        {
                            sd.children.map((page, indexVal) => (
                                this.getMenuPage(indexVal.toString(), page, index)
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
                        <img src="assets/layouts/layout2/img/expand.png" className="expandImg" />
                    </div>
                    <ul id="SideMenuIcons" className="page-sidebar-menu  page-header-fixed page-sidebar-menu-hover-submenu "
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
