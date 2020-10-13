/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Wrapper from '../../common/Wrapper.jsx';
import * as constants from '../../../../core/constants/Communication';
import * as gen from '../../common/generalActionHandler'
import Portlet from '../../common/Portlet.jsx';
import Table from '../../common/Datatable.jsx';
import Input from '../../../../core/common/Input.jsx';
import * as utils from '../../../../core/common/utils.js';

let interval;
class WidgetList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            typeData: undefined,
            isLoading: false,
            graphData: [
                // {
                //     widgetName: 'Transaction bar',
                //     widgetCaption: 'Bar Heading',
                //     widgetType: 'Bar Graph',
                //     status: 'Active'
                // },
                // {
                //     widgetName: 'Company Pie',
                //     widgetCaption: 'Pie Heading',
                //     widgetType: 'Pie Graph',
                //     status: 'In-Active'
                // }
            ],
            tracking: {
                courier: "",
                ecommerce: ""
            },
        };
        this.generalHandler = gen.generalHandler.bind(this);
        // this.customActionHandler = customActionHandler.bind(this);
        // this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
        // this.sendCall = this.sendCall.bind(this);
        // this.generalActionHandler = gen.generalHandler.bind(this);
        // this.applyFilter = this.applyFilter.bind(this);
    }

    componentDidMount() {
        this.props.actions.generalProcess(constants.getWidgetList, {});
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.getWidgetList) {
            this.setState({
                graphData: nextProps.getWidgetList
            })
        }
    }

    render() {
        console.log("state-->", this.state)
        console.log("props-->", this.props)
        if (!this.state.isLoading)
            return (
                <Wrapper title="Add Widget">
                    <Portlet title={'Widget List'}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="col-md-4"><label>Widget Name</label></div>
                                <div className="col-md-8">
                                    <Input
                                        divStyle={{ padding: '0' }}
                                        status={(this.state.errors && this.state.errors.name) ? "ERROR" : undefined}
                                        fieldname='name'
                                        // placeholder={utils.getLabelByID('Passport Number*')}
                                        formname='editBody'
                                        columns='12'
                                        state={this.state}
                                        actionHandler={this.generalHandler}
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }} className="row">
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </Portlet>

                    <Portlet title={'Widget List'}>
                        <div className="row">
                            {this.state.graphData && <Table
                                pagination={false}
                                export={false}
                                search={false}
                                gridColumns={utils.getGridColumnByName("WidgetList")}
                                // componentFunction={actionHandlers}
                                gridData={this.state.graphData}
                                totalRecords={0}
                            />
                            }
                        </div>
                    </Portlet>
                </Wrapper>
            )
    }
}

let dataArray = [];

function mapStateToProps(state, ownProps) {
    console.log(state.app);
    return {
        //  dataArray.push(state.app.data && Object.keys(state.app.data).length > 0 ? state.app.data.widgetData : []),
        getWidgetList: _.get(state.app, 'getWidgetList.data.searchResult.widgetList', []),
        typeData: _.get(state.app.typeData, 'data', undefined),
        getDashboardData: _.get(state.app, 'getDashboardData', undefined),
        entityList: state.app.entityList
    };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) }

}
function customActionHandler(formname, fieldname, type, e) {
    let value = e.target.value;
    this.sendCall(value)
}
WidgetList.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(WidgetList);