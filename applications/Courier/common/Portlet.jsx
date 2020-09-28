import React, { PropTypes } from 'react';
import * as utils from './utils.js';
import ActionButton from './ActionButtonNew.jsx';

const Portlet = props => {
    const { title, noCollapse, actions, className, children, color = "blue", style, portletAction, isRecon } = props;

    return (
        <div className="crad-box">
            <div className="portlet light bordered sdg_portlet">
                <div className="portlet-title">

                    {!noCollapse &&
                        <div className="tools"><a href="javascript:;" className="collapse" data-original-title="true"
                            title="true" /></div>}

                    <div className="caption">

                        <span className="caption-subject">
                            {utils.getLabelByID(title) || title}
                        </span>
                        {isRecon == false &&
                            <i className="fa fa-times pull-right" aria-hidden="true"></i>
                        }
                        {isRecon == true &&
                            <i className="fa fa-check pull-right default" aria-hidden="true"
                                style={{
                                    backgroundColor: "rgba(40, 39, 37, 0.08)",
                                    color: "rgb(97, 199, 56)"
                                }}

                            ></i>
                        }
                    </div>
                    <div className="actions">

                        {actions && !props.isPermissioned && actions.map((action, key) => {
                            switch (action.type) {
                                case "link":
                                    return (<a key={key} href="javascript:" onClick={action.actionHandler}
                                        className={action.className}>
                                        <i className={"fa fa-" + action.icon} />
                                        {action.label}
                                    </a>);
                                case "modal":
                                    return (<a key={key} href="javascript:" onClick={action.actionHandler}
                                        className={action.className}>
                                        <i className={"fa fa-" + action.icon} />
                                        {action.label}
                                    </a>);
                                case "icon":
                                default:
                                    return (
                                        <div key={key} className="fa-item" onClick={action.actionHandler}>
                                            <i className={"fa fa-" + action.icon} />
                                        </div>
                                    );
                            }
                        })}
                        {actions && props.isPermissioned && <ActionButton actionList={actions} performAction={(param) => {
                            console.log(temp1, "YESs");
                        }} />}
                    </div>
                    {/* <div className="tools">
                        <a href="javascript:;" className="collapse" data-original-title title> </a>
                    </div> */}
                </div>
                <div className="portlet-body " 
                style={{ marginTop: "20px", padding: "20px", ...style }}
                >
                    {children}
                </div>
                {portletAction &&
                    <a href="javascript:;" onClick={portletAction} className="actionbtn"><div className="at-action"><h4>Action</h4></div></a>
                }
            </div>
        </div>
    );
};


Portlet.propTypes = {
    title: PropTypes.string.isRequired
};

export default Portlet;