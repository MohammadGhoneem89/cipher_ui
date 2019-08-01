/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';

import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';

//Custom Components
import Select from '../../common/Select.jsx';
import Div from '../../common/Div.jsx';
import Row from '../../common/Row.jsx';
import Col from '../../common/Col.jsx';
import Label from '../../common/Lable.jsx';
import Input from '../../common/Input.jsx';
import Portlet from '../../common/Portlet.jsx';

import * as gen from '../../common/generalActionHandler';

class OneTimeOrder extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            typeData: { 'et-flow': [{ lable: 'kamran', value: 'haider' }] }
        }
        this.generalHandler = gen.generalHandler.bind(this);
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getItemCatalogue, {});
    }

    render() {
        return (
            <Row>
                <Div className="masthead">
                    <Input fieldname='search' formname='ruleDefination' columns='3' state={this.state}
                        style={{ width: '250%', paddingLeft: '5px' }} actionHandler={this.generalHandler} className="search-field productSearch" placeholder="Search For Products" />
                    <Div className="input-group-addon search-categories">
                        <Select fieldname='product_cat' formname='ruleDefination' columns='4' style={{}}
                            state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                            multiple={false} actionHandler={this.generalHandler} className="postform resizeselect dropmenu" />
                    </Div>
                    <Div className="input-group-addon option">
                        <Select fieldname='product_cat' formname='ruleDefination' columns='4' style={{}}
                            state={this.state} typeName="et-flow" dataSource={this.state.typeData}
                            multiple={false} actionHandler={this.generalHandler} className="postform resizeselect dropmenu" />
                    </Div>
                    <Div className="input-group-btn">
                        <button type="submit" className="btn btn-secondary"><i className="fa fa-search btn-img" aria-hidden="true"></i></button>
                    </Div>
                    <Div className="carticon cart-set">
                        <a href="#"><img src="/assets/blkimgs/cart.png" style={{ "width": "30px" }} /></a>
                        {/* <button type="submit" className="btn btn-secondary"><i className="fa fa-shopping-cart btn-img" aria-hidden="true"></i></button> */}
                    </Div>
                    <Div></Div>
                    {/* dlsjflaj */}
                </Div>

                <Row>
                    <Portlet title="Product Catelogue">
                        <Row>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                                <div className="seprator" />
                            </Col>
                            <Col col="3">
                                <Div className="procard hov procards">
                                    <Div className="counterbadge span-product"><span>40</span></Div>
                                    <Div className="clear"></Div>
                                    <Div className="text-center proimg"><img src="/assets/blkimgs/product1.png" /></Div>
                                    <a href="#">
                                        <h3 className="pull-left">{'Dust Fan'}</h3>
                                    </a>
                                    <Label text="AED 178" />
                                    <hr />
                                    <Row>
                                        <Col col='5'>
                                            <a href="#">
                                                <img src="/assets/blkimgs/cart.png" className="addcart cart" />
                                            </a>
                                        </Col>
                                        <Col col='3'>
                                            <label className="qty qty-label">Qty</label>
                                        </Col>
                                        <Col col='4'>
                                            <input type="number" className="form-control new-form" />
                                        </Col>
                                    </Row>

                                </Div>
                            </Col>
                        </Row>
                    </Portlet>
                    
                </Row>
            </Row >
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }
}

OneTimeOrder.displayName = '__HIDE';
export default connect(mapStateToProps, mapDispatchToProps)(OneTimeOrder);