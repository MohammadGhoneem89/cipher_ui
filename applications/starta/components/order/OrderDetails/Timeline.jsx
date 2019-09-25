import React from 'react'
import Portlet from '../../../../../core/common/Portlet.jsx';

export default function Timeline(props) {
    return (
        <div className="modal fade in" id="full-width" tabindex="-1" role="basic" aria-hidden="true" style={{ display: "block"}}>

            <div className="modal-dialog ordertrack">
                <div className="modal-content">
                    <div className="modal-header">
                        <div className="imgicon"><img src="/assets/Resources/OptimizationBox.png" /></div>
                        <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={props.closePortlet}></button>
                        <h4 className="modal-title text-center">Order ID # ORD66667</h4>
                    </div>
                    <div className="modal-body">

                        <div className="timeline  white-bg ">
                            {/* <!-- TIMELINE ITEM --> */}
                            <div className="timeline-item">
                                <div className="timeline-badge green">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/delivery.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Order Received</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>

                                        <div className="remark">
                                            <span className="font-grey-cascade">Remarks <i className="fa fa-minus-circle"
                                                aria-hidden="true"></i></span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-badge green">
                                    <i className="fa fa-check" aria-hidden="true"></i>
                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/purchase.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Purchase Order</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>


                                    </div>
                                </div>
                            </div>
                            {/* <!-- END TIMELINE ITEM -->
                        <!-- TIMELINE ITEM --> */}

                            <div className="timeline-item">
                                <div className="timeline-badge blue ">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/manufacturing.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Component Manufacture</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>

                                    </div>
                                </div>
                            </div>


                            <div className="timeline-item">
                                <div className="timeline-badge">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/analytics.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Part Identification</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>


                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-badge">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/description.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Part Description</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>


                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-badge">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/code.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Final Inspection & Identification</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>

                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-badge">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/order.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Part Test</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>


                                    </div>
                                </div>
                            </div>


                            <div className="timeline-item">
                                <div className="timeline-badge">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/tracking.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Dispatched</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>

                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-badge">
                                    <i className="fa fa-check" aria-hidden="true"></i>

                                </div>
                                <div className="timeline-body">
                                    <div className="timeline-body-arrow"><img src="/assets/Resources/delivery.png" /></div>
                                    <div className="timeline-body-head">
                                        <div className="timeline-body-head-caption">
                                            <a href="javascript:;">Received</a>
                                        </div>
                                    </div>
                                    <div className="timeline-body-content">
                                        <span className="trckdate">22/04/2019</span>
                                        <span className="trcktime">22/04/2019</span>

                                        <div className="remark">
                                            <span className="font-grey-cascade">Remarks <i className="fa fa-minus-circle"
                                                aria-hidden="true"></i></span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            {/* <!-- END TIMELINE ITEM -->
                  <!-- TIMELINE ITEM WITH GOOGLE MAP --> */}


                        </div>


                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn dark btn-outline" data-dismiss="modal" onClick={props.closePortlet}>Close</button>
                        <button type="button" className="btn green">Save changes</button>
                    </div>
                </div>
                {/* <!-- /.modal-content --> */}
            </div>
        </div>
    )
}
