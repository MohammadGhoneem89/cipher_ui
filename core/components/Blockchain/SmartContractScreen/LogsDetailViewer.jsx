import React from 'react';
import Portlet from '../../../common/Portlet.jsx';

const LogsDetailViewer = ({updateState, containerState}) => {
    let actions = [
        {
            type: "icon",
            className: "btn btn-default",
            label: "ADD",
            icon: "close",
            actionHandler: updateState.bind(this, {logDetailModalIsOpen: false})
        }
    ];
    return (
            <Portlet title={"Detailed Log"} actions={actions}>
                <div style={{maxHeight: "200px", minHeight: "50px", overflowY: "auto"}}>
                    <pre>{JSON.stringify(containerState.contractLogs[containerState.index], undefined, 2)}</pre>
                </div>
            </Portlet>
    )
};

export default LogsDetailViewer;