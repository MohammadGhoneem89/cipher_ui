import React, {PropTypes} from 'react';
import * as utils from './utils.js';
import ActionButton from '../components/ActionButtonNew.jsx';

const Portlet = props => {
    const {title, noCollapse, actions, className, children, color = "blue", style} = props;

    return (
        <div className="portlet light bordered sdg_portlet">
            <div className="portlet-title">
                {!noCollapse &&
                <div className="tools"><a href="javascript:;" className="collapse" data-original-title="true"
                                          title="true"/></div>}
                <div className="caption">
                    <span className="caption-subject">
                        {utils.getLabelByID(title) || title}
                    </span>
                </div>
                <div className="actions">
                    {actions && !props.isPermissioned && actions.map((action, key) => {
                        switch (action.type) {
                            case "link":
                                return (<a key={key} href="javascript:" onClick={action.actionHandler}
                                           className={action.className}>
                                    <i className={"fa fa-" + action.icon}/>
                                    {action.label}
                                </a>);
                            case "modal":
                                return (<a key={key} href="javascript:" onClick={action.actionHandler}
                                           className={action.className}>
                                    <i className={"fa fa-" + action.icon}/>
                                    {action.label}
                                </a>);
                            case "icon":
                            default:
                                return (
                                    <div key={key} className="fa-item" onClick={action.actionHandler}>
                                        <i className={"fa fa-" + action.icon}/>
                                    </div>
                                );
                        }
                    })}
                    {actions && props.isPermissioned && <ActionButton actionList={actions} performAction={(param) => {
                        console.log(temp1, "YESs");
                    }}/>}
                </div>
            </div>
            <div className="portlet-body " style={style}>
                {children}
            </div>
        </div>
    );
};


Portlet.propTypes = {
    title: PropTypes.string.isRequired
};

export default Portlet;