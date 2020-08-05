import React, { PropTypes } from 'react';
import * as utils from './utils.js';
import DateRangePicker from '../../../core/common/DateRangePicker.jsx';
const Wrapper = props => {
    const { title, noCollapse, actions, className, children, color = "blue", style, identity, daterange, taskStatus, onDateChange } = props;
    return (
        <div>
            <div className="crad-box">
                <div className="portlet light bordered sdg_portlet">

                    <div className="portlet-title D-header">

                        <div className="caption">
                            {/* <img src="/assets/imgs/header-icon.png" /> */}
                            <span className="caption-subject">{utils.getLabelByID(title) || title}</span>
                            {/* <span className="DeviceIdno">161314615</span> */}
                        </div>
                        {daterange &&
                            <span className="DeviceIdno" style={{ padding: "11 15 15 15" }}><DateRangePicker onChangeRange={onDateChange} /></span>
                        }
                        {identity &&
                            <span className="DeviceIdno">{identity}</span>
                        }
                        {taskStatus &&
                            <span className={utils.getClassForStatusLabel(taskStatus)}
                                style={{ left: "10px", fontSize: "17px", top: "3px", position: "relative" }}>{taskStatus}</span>
                        }
                        <div className="actions"></div>
                    </div>
                    <div className="portlet-body " style={{ marginTop: "20px", padding: "20px", ...style }}>
                        {children}
                    </div>
                </div>
            </div>

        </div>
    );
};


Wrapper.propTypes = {
    title: PropTypes.string.isRequired
};

export default Wrapper;