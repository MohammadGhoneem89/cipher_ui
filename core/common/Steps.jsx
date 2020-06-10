import React from 'react'

export default function Steps(props) {
    let { statusList } = props
    return (
        <ul id="progressbar">
            {
                statusList.map(status => {
                    return (<li className={status.status ? "active" : (status.cancelled ? "step-inactive": "")}><h6><b>{status.label}</b></h6></li>)
                })

            }
        </ul>
    )
}

