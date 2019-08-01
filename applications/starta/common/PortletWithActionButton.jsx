import React, {PropTypes} from 'react';
import * as utils from './utils.js';
import ActionButton from './ActionButtonNew.jsx';

const PortletWithActionButton = props => {
    const {title, noCollapse, actions, className, children, color = "blue", style, actionLink} = props;

    return (
        <div className="portlet light bordered sdg_portlet">
            <div className="portlet-title">
                {!noCollapse &&
                <div className="tools"><a href="javascript:;" className="collapse" data-original-title="true"
                                          title="true"/></div>}
                <div className="caption">
                    <i className="fa fa-times" aria-hidden="true"></i>
                    <span className="caption-subject" style={{marginLeft: "45px"}}>
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
            <a href={actionLink} className="actionbtn"><div className="at-action"><h4>Action</h4></div></a>
        </div>
    );
};


PortletWithActionButton.propTypes = {
    title: PropTypes.string.isRequired
};

export default PortletWithActionButton;