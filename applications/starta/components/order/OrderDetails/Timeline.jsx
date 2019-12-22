import React from 'react'
import Portlet from '../../../../../core/common/Portlet.jsx';

export default function Timeline(props) {


    const imgs = [
        "/assets/Resources/delivery.png",
        "/assets/Resources/purchase.png",
        "/assets/Resources/manufacturing.png",
        "/assets/Resources/analytics.png",
        "/assets/Resources/description.png",
        "/assets/Resources/code.png",
        "/assets/Resources/order.png",
        "/assets/Resources/assembly.png",
        "/assets/Resources/painting.png",
        "/assets/Resources/tracking.png",
        "/assets/Resources/delivery.png",
        "/assets/Resources/inspection.png",
        "/assets/Resources/acceptance.png",
        "/assets/Resources/rejected.png",
        "/assets/Resources/rating.png",
        "/assets/Resources/clipboard.png",
        "/assets/Resources/recycle.png",
        "/assets/Resources/receipt.png",
        "/assets/Resources/money-bag.png",
    ]
    const actions = [
       "Order Received",
       "Purchase Order",
       "Component Manufacturing",
       "Part Identification",
       "Part Inspection",
       "Final Inspection And Identification",
       "Part Testing",
       "Assembly",
       "Paint Or Finish",
       "Dispatched",
       "Received",
       "Inspected",
       "Accepted",
       "Rejected",
       'Reviewed',
       'Concession',
       'Scrapped',
       'Payment Order',
       'Paid'
    ]

    const timeLineItems = () => {

        return (
            imgs.map((elem, index) => {
                
                let badgeClass='timeline-badge'
                let dateValue = ''
                let timeValue = ''
                let actionBy = ''

                props.activities.forEach(item=>{
                    // check if the current action is marked done

                    if (parseInt(item.stage)===parseInt(index+1)){
                        console.log("item.date ",item.date)
                        badgeClass='timeline-badge green'
                        dateValue = item.date.split(' ')[0]
                        timeValue = item.date.split(' ')[1]
                        actionBy = item.actionBy
                    }
                })

                return (
                    <div className="timeline-item">
                        <div className={badgeClass}>
                            <i className="fa fa-check" aria-hidden="true"></i>

                        </div>
                        <div className="timeline-body">
                            <div className="timeline-body-arrow"><img src={imgs[index]} /></div>
                            <div className="timeline-body-head">
                                <div className="timeline-body-head-caption">
                                    <a href="javascript:;">{actions[index]}</a>
                                </div>
                            </div>
                            <div className="timeline-body-content">
                                
                                {dateValue && <span className="trckdate">{dateValue} </span>}
                                {timeValue && <span className="trcktime">{timeValue}</span>}

                                <div className="remark">
                                    <span className="font-grey-cascade">{actionBy} </span>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            })

        )
    }



    return (
        <div className="modal fade in" id="full-width" tabindex="-1" role="basic" aria-hidden="true" style={{ display: "block" }}>

            <div className="modal-dialog ordertrack">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="imgicon"><img src="/assets/Resources/OptimizationBox.png" /></div>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={props.closePortlet}></button>
                        <h4 className="modal-title text-center"><b>Order Timeline</b></h4>
                    </div>
                    <div className="modal-body">

                        <div className="timeline  white-bg ">
                            {/* <!-- TIMELINE ITEMs --> */}
                            {timeLineItems()}
                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn dark btn-outline" data-dismiss="modal" onClick={props.closePortlet}>Close</button>
                    </div>
                </div>
                {/* <!-- /.modal-content --> */}
            </div>
        </div>
    )
}
