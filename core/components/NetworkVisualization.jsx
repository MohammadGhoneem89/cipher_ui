/*standard imports*/
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/generalAction';


import * as utils from '../common/utils.js';

import * as d3 from "d3";

import * as constants from '../constants/Communication.js';


class NetworkVisualization extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            consortium: [

            ],
            channel: [

            ],
            response: []
        }

        this.myInterval = null;
        this.myInterval2 = null;
    }

    onInputRuleEngine = (e) => {

        let value;
        console.log('---e---', e.target);
        if (e.target.name.indexOf('is') === 0) {
            value = $("#" + e.target.name).is(":checked");
        } else {
            value = e.target.value;
        }

        let index = e.nativeEvent.target.selectedIndex;
        let label = this.state.channel[index - 1].label;
        let string = label.split(': ')[1];
        if (e.target.name == 'channel') {
            this.setState({
                selectedChannel: value,
                network: string
            })
        }

        if (e.target.name == 'consortium') {
            // pLoad.selectedConsortium = value
            this.setState({
                selectedConsortium: value
            })
        }
    }


    componentWillReceiveProps(nextProps) {

        if (nextProps.ConsortiumTypeData.data && nextProps.ConsortiumTypeData.data.consortium) {
            this.setState({
                consortium: nextProps.ConsortiumTypeData.data.consortium,
                channel: nextProps.ConsortiumTypeData.data.channel,
                smartcontract: nextProps.ConsortiumTypeData.data.smartcontract
            });
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let obj = {}
        this.props.actions.generalAjxProcess(constants.getConsortiumTypeList, { version: '2.0' }).then(res => {
            // if (res.ConsortiumTypeData.data) {
            //     let label = res.ConsortiumTypeData.data.channel[0].label;
            //     var fields = label.split(' ');
            //     let string = label.split(': ')[1];
            //     this.props.actions.generalAjxProcess(constants.getNetworkConfigByName, {
            //         "name": string
            //     });
            //     obj = {
            //         "network": string,
            //         "fabricChannel": fields[0]
            //     }
            //     this.setState({
            //         consortium: res.ConsortiumTypeData.data.consortium,
            //         channel: res.ConsortiumTypeData.data.channel,
            //     });
            //     this.props.actions.generalAjxProcess(constants.getNetworkStatus, obj).then(res => {
            //         this.getData(res)
            //     });
            // }

        });
        // this.myInterval = setInterval(() => {
        //     this.props.actions.generalAjxProcess(constants.getNetworkStatus, obj).then(res => {
        //         this.getData(res)
        //     });
        // }, 30000);
    }

    componentWillUnmount = () => {
        clearInterval(this.myInterval)
        clearInterval(this.myInterval2)

    }


    formSubmit = () => {
        clearInterval(this.myInterval)
        clearInterval(this.myInterval2)
        if (this.state.selectedChannel) {
            this.setState({
                isLoading: true
            })
            let body = {
                "fabricChannel": this.state.selectedChannel,
                "network": this.state.network,
            }
            this.props.actions.generalAjxProcess(constants.getNetworkStatus, body).then(res => {
                this.setState({
                    isLoading: false
                }, () => {
                    this.getData(res)
                })

            })
            this.myInterval2 = setInterval(() => {
                this.props.actions.generalAjxProcess(constants.getNetworkStatus, body).then(res => {
                    this.getData(res)
                });
            }, 30000);
        }
        else {
            alert("All fields are required");
            return false;
        }
    }


    getData = (res) => {
        var svg = d3.select("svg")
        svg.selectAll("g").remove()
        var newchar = '-'
        // let format = res.result.myself.name.split('.').join(newchar);
        let format = res.result.myself.mspid;
        let array = []
        let internalArray = []
        let parent = {
            "id": format,
            "value": 3,
            "color": "#808080",
        }
        array.push(parent)
        internalArray.push(parent)
        res.result.externalOrgPeers.forEach(element => {
            var newchar = '-'
            let format1 = element.endpoint.split('.').join(newchar);
            let obj = {
                "id": format + "." + format1,
                "value": 2,
                "color": "#808080",
                "status": element.status
            }
            let format2 = format + "." + format1
            array.push(obj)
            let ledger_height = Object.values(element.ledger_height)
            let keys = Object.keys(element.ledger_height)
            let obj1 = {
                "id": format2 + "." + "MSPID: " + element.mspid,
                "value": '',
                "color": "#808080",
            }
            let obj2 = {
                "id": format2 + "." + "Status: " + element.status,
                "value": '',
                "color": element.status == "CONNECTED" ? "#008000" : "#FF0000",
                "status": element.status
            }
            let obj3 = {
                "id": format2 + "." + "Ledger Height: ",
                "value": element.ledger_height.low,
                "color": "#808080",
            }
            array.push(obj1)
            array.push(obj2)
            array.push(obj3)
        });


        res.result.myOrgPeers.forEach(element => {
            var newchar = '-'
            let format1 = element.endpoint.split('.').join(newchar);
            let obj = {
                "id": format + "." + format1,
                "value": 2,
                "color": "#808080",
                "status": element.status
            }
            let format2 = format + "." + format1
            internalArray.push(obj)
            let obj1 = {
                "id": format2 + "." + "MSPID: " + element.mspid,
                "value": '',
                "color": "#808080",
            }
            let obj2 = {
                "id": format2 + "." + "Status: " + element.status,
                "value": '',
                "color": element.status == "CONNECTED" ? "#008000" : "#FF0000",
                "status": element.status
            }
            let obj3 = {
                "id": format2 + "." + "Ledger Height: ",
                "value": element.ledger_height.low,
                "color": "#808080",
            }
            internalArray.push(obj1)
            internalArray.push(obj2)
            internalArray.push(obj3)
        });

        res.result.orderers.forEach(element => {
            var newchar = '-'
            let format1 = element.host.split('.').join(newchar);
            let obj = {
                "id": format + "." + format1,
                "value": 2,
                "color": "#808080",
                "status": element.status
            }
            let format2 = format + "." + format1
            array.push(obj)
            let obj1 = {
                "id": format2 + "." + "MSPID: " + element.mspid,
                "value": '',
                "color": "#808080",
            }
            let obj2 = {
                "id": format2 + "." + "Status: " + element.status,
                "value": '',
                "color": element.status == "CONNECTED" ? "#008000" : "#FF0000",
                "status": element.status
            }
            array.push(obj1)
            array.push(obj2)
        })



        this.setState({ response: array }, () => {
            var svg = d3.select("svg"),
                width = +svg.attr("width"),
                height = +svg.attr("height"),
                g = svg.append("g").attr("transform", "translate(100,0)");       // move right 100px.

            // x-scale and x-axis
            var experienceName = ["", "", "", "", "", ""];
            var formatSkillPoints = function (d) {
                return experienceName[d % 6];
            }
            var xScale = d3.scaleLinear()
                .domain([0, 28000])
                .range([0, 280]);

            var xAxis = d3.axisTop()
                .scale(xScale)
                .ticks(5)
                .tickFormat(formatSkillPoints);

            // Setting up a way to handle the data
            var tree = d3.cluster()                 // This D3 API method setup the Dendrogram datum position.
                .size([height, width - 460])    // Total width - bar chart width = Dendrogram chart width
                .separation(function separate(a, b) {
                    return a.parent == b.parent            // 2 levels tree grouping for category
                        || a.parent.parent == b.parent
                        || a.parent == b.parent.parent ? 0.4 : 0.8;
                });

            var stratify = d3.stratify()            // This D3 API method gives cvs file flat data array dimensions.
                .parentId(function (d) { return d.id.substring(0, d.id.lastIndexOf(".")); });
            let self = this;
            d3.csv("https://gist.githubusercontent.com/vpletzke/9607d012e725638343ee01a8e8fa6310/raw/568f6f255250192b955c3e16ff151c12cc50800d/skillsdata.csv", row, function (error, data) {
                // if (error) throw error;
                console.log(self.state.response);
                var root = stratify(self.state.response);
                tree(root);

                // Draw every datum a line connecting to its parent.
                var link = g.selectAll(".link")
                    .data(root.descendants().slice(1))
                    .enter().append("path")
                    .attr("class", function (d) {
                        var myClass = (d.depth == 1 && d.data.status == "CONNECTED" ? "link" : d.depth == 1 ? " link2" : 'link3');
                        return myClass;
                    })
                    .attr("d", function (d) {
                        return "M" + d.y + "," + d.x
                            + "C" + (d.parent.y + 100) + "," + d.x
                            + " " + (d.parent.y + 100) + "," + d.parent.x
                            + " " + d.parent.y + "," + d.parent.x;
                    });

                // Setup position for every datum; Applying different css classes to parents and leafs.
                var node = g.selectAll(".node")
                    .data(root.descendants())
                    .enter().append("g")
                    .attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
                    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

                // Draw every datum a small circle.
                node.append("circle")
                    .attr("r", 7);

                // Setup G for every leaf datum.
                var leafNodeG = g.selectAll(".node--leaf")
                    .append("g")
                    .attr("class", "node--leaf-g")
                    .attr("transform", "translate(" + 8 + "," + -13 + ")");

                leafNodeG.append("rect")
                    .attr("class", "shadow")
                    .style("fill", function (d) { return d.data.color; })
                    .attr("width", 2)
                    .attr("height", 30)
                    .attr("rx", 2)
                    .attr("ry", 2)
                    .transition()
                    .duration(800)
                    .attr("width", function (d) { return xScale(d.data.value); });

                leafNodeG.append("text")
                    .attr("dy", 19.5)
                    .attr("x", 8)
                    .style("text-anchor", "start")
                    .attr("class", function (d) {
                        console.log('---d---', d);
                        var myClass = (!d.data.status ? "text" : d.data.status == "CONNECTED" ? "text1" : 'text2');
                        return myClass;
                    })
                    .text(function (d) {
                        return d.data.id.substring(d.data.id.lastIndexOf(".") + 1) + " " + d.data.value;
                    });

                // Write down text for every parent datum
                var internalNode = g.selectAll(".node--internal");
                internalNode.append("text")
                    .attr("y", -10)
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
                    });

                // Attach axis on top of the first leaf datum.
                var firstEndNode = g.select(".node--leaf");
                firstEndNode.insert("g")
                    .attr("class", "xAxis")
                    .attr("transform", "translate(" + 7 + "," + -14 + ")")
                    .call(xAxis);

                // tick mark for x-axis
                firstEndNode.insert("g")
                    .attr("class", "grid")
                    .attr("transform", "translate(7," + (height - 15) + ")")
                    .call(d3.axisBottom()
                        .scale(xScale)
                        .ticks(5)
                        .tickSize(-height, 0, 0)
                        .tickFormat("")
                    );

                // Emphasize the y-axis baseline.
                svg.selectAll(".grid").select("line")
                    .style("stroke-dasharray", "20,1")
                    .style("stroke", "black");
                d3.selectAll(".node--leaf-g")
                    .on("mouseover", handleMouseOver)
                    .on("mouseout", handleMouseOut);

                function handleMouseOver(d) {
                    var leafG = d3.select(this);

                    leafG.select("rect")
                        .attr("stroke", "#4D4D4D")
                        .attr("stroke-width", "2");


                    var ballGMovement = ballG.transition()
                        .duration(400)
                        .attr("transform", "translate(" + (d.y
                            + xScale(d.data.value) + 90) + ","
                            + (d.x + 1.5) + ")");

                    ballGMovement.select("circle")
                        .style("fill", d.data.color)
                        .attr("r", 18);

                    ballGMovement.select("text")
                        .delay(300)
                        .text(Number(d.data.value).toFixed(1));
                }
                function handleMouseOut() {
                    var leafG = d3.select(this);

                    leafG.select("rect")
                        .attr("stroke-width", "0");
                }

            });

            function row(d) {
                return {
                    id: d.id,
                    value: +d.value,
                    color: d.color
                };
            }
        })
    }

    clearFields() {
        $('#auditLogList').find('input:text').val('');
        $('#auditLogList').find('select').each(function () {
            $(this)[0].selectedIndex = 0;
        });
        this.setState({
            selectedConsortium: undefined,
            selectedChannel: undefined,
            selectedSmartcontract: undefined,
            smKey: "",
            selectedEndpoint: undefined,
            selectedCollection: undefined
        })
    }


    render() {
        console.log(this.state, "SSSSSSSSSSSSSSSSSSS")
        if (!this.state.isLoading) {

            return (
                <div>
                    <div className="row">
                        <div className="col-md-12 ">
                            <div className="portlet light bordered sdg_portlet">
                                <div className="portlet-title">
                                    <div className="portlet-body">
                                        <div className="form-body" id="auditLogList">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-group control-label col-md-4" style={{
                                                            textAlign: "left",
                                                            fontWeight: "normal"
                                                        }}>{utils.getLabelByID("Consortium Name")}</label>
                                                        <div className="form-group col-md-8">
                                                            <select id="consortium" name="consortium" onChange={this.onInputRuleEngine}
                                                                value={this.state.selectedConsortium} className="form-control">
                                                                <option disabled selected value> -- SELECT CONSORTIUM -- </option>
                                                                {
                                                                    this.state.consortium.map((option, index) => {
                                                                        return (
                                                                            <option key={index} value={option.value}>{option.label}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="form-group control-label col-md-4" style={{
                                                            textAlign: "left",
                                                            fontWeight: "normal"
                                                        }}>{utils.getLabelByID("Channel Name")}</label>
                                                        <div className="form-group col-md-8">
                                                            <select name="channel" id="channel" onChange={this.onInputRuleEngine}
                                                                value={this.state.selectedChannel} className="form-control">
                                                                <option disabled selected value> -- SELECT CHANNEL -- </option>
                                                                {
                                                                    this.state.channel.map((option, index) => {
                                                                        return (
                                                                            <option key={index} value={option.label.split("|")[0].trim()}>{option.label}</option>
                                                                        );
                                                                    })
                                                                }
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>



                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div className="col-md-12">
                                                        <div className="pull-right">
                                                            <button type="submit" className="btn green"
                                                                onClick={this.formSubmit}>{utils.getLabelByID("Search")} </button>
                                                            {"  "}
                                                            <button type="button" className="btn default"
                                                                onClick={this.clearFields.bind(this)}>{utils.getLabelByID("Clear")}</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="portlet light bordered sdg_portlet">
                        <div className="portlet-title">
                            <div className="portlet-body"></div>
                            <svg height={this.state.response.length > 0 ? "600" : "0"} width="1000"></svg>
                            <div className='GraphPlaceholder' style={{ height: this.state.response.length == 0 ? 500 : 0 }} />
                        </div>
                    </div>
                </div >
            );

        } else
            return (<div className="loader">{utils.getLabelByID("Loading")}</div>)
    }
}

NetworkVisualization.propTypes = {
    ConsortiumTypeData: PropTypes.object,
    children: PropTypes.object,
    typeData: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
    return {
        ConsortiumTypeData: state.app.ConsortiumTypeData,
        // getEndpointListView: state.app.getEndpointListView,
        // getCollectionList:state.app["collectionNameList"]?state.app.collectionNameList:[],
        // getRevisionsList:state.app["result"]?state.app.result:""
    };
}

function mapDispatchToProps(dispatch) {

    return { actions: bindActionCreators(actions, dispatch) }

}

NetworkVisualization.displayName = "Network Visualization";
export default connect(mapStateToProps, mapDispatchToProps)(NetworkVisualization);
