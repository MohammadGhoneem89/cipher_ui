import React, { Component } from "react";
import * as d3 from "d3";
import { sankey as sankeyGraph, sankeyLinkHorizontal } from 'd3-sankey';
import { toInteger } from "lodash";
import moment from "moment";
{/* <script src="./d3-tip.js" ></script> */ }
import d3Tip from "d3-tip";
import * as topojson from "topojson-client";
import heatmapCountries from '../dummyData/heatmap-countries.json'
import worldCountries from '../dummyData/world-countries.json'
import skillsData from '../dummyData/skillsData.json'


// const  Data = [
//     { Date: "2016-06-14", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 321 }, { Name: "Category3", Value: 524 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-15", Categories: [{ Name: "Category1", Value: 521 }, { Name: "Category2", Value: 123 }, { Name: "Category3", Value: 653 }], LineCategory: [{ Name: "Line1", Value: 89 }, { Name: "Line2", Value: 96 }] },
//     { Date: "2016-06-17", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 236 }, { Name: "Category3", Value: 537 }], LineCategory: [{ Name: "Line1", Value: 63 }, { Name: "Line2", Value: 35 }] },
//     { Date: "2016-06-18", Categories: [{ Name: "Category1", Value: 423 }, { Name: "Category2", Value: 330 }, { Name: "Category3", Value: 689 }], LineCategory: [{ Name: "Line1", Value: 86 }, { Name: "Line2", Value: 45 }] },
//     { Date: "2016-06-19", Categories: [{ Name: "Category1", Value: 601 }, { Name: "Category2", Value: 423 }, { Name: "Category3", Value: 490 }], LineCategory: [{ Name: "Line1", Value: 65 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-20", Categories: [{ Name: "Category1", Value: 412 }, { Name: "Category2", Value: 461 }, { Name: "Category3", Value: 321 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 85 }] }
// ];


class GroupedDendogramBarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.ref = null;

    }


    componentDidMount() {
        // main svg
        // var svg = d3.select("#my_dendogram").append("svg"),
        // width = +svg.attr("width"),
        // height = +svg.attr("height"),
        // g = svg.append("g").attr("transform", "translate(20,0)");       // move right 20px.
        let width = 1000;
        let height = 1100;
        var svg = d3.select("#my_dendogram")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr("transform", "translate(20,0)");
            // g = svg.append("g").attr("transform", "translate(20,0)")
            let g = svg;

        // x-scale and x-axis
        // var experienceName = ["", "Basic 1.0", "Alright 2.0", "Handy 3.0", "Expert 4.0", "Guru 5.0"];
        var experienceName = ["", "", "", "", "", ""];
        var formatSkillPoints = function (d) {
            return experienceName[d % 6];
        }
        var xScale = d3.scaleLinear()
            .domain([0, 5])
            .range([0, 400]);

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

        d3.csv("skillsdata.csv", row, function (error, data) {
            // if (error) throw error;

            var root = stratify(skillsData);
            tree(root);

            // Draw every datum a line connecting to its parent.
            var link = g.selectAll(".link")
                .data(root.descendants().slice(1))
                .enter().append("path")
                .attr("class", "link")
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
                .attr("r", 4);

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
                .text(function (d) {
                    return d.data.id.substring(d.data.id.lastIndexOf(".") + 1);
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

            // The moving ball
            var ballG = svg.insert("g")
                .attr("class", "ballG")
                .attr("transform", "translate(" + 1100 + "," + height / 2 + ")");
            ballG.insert("circle")
                .attr("class", "shadow")
                .style("fill", "steelblue")
                .attr("r", 5);
            ballG.insert("text")
                .style("text-anchor", "middle")
                .attr("dy", 5)
                .text("0.0");

            // Animation functions for mouse on and off events.
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

    }

    render() {
        return (
            // <svg className="body" width="1200" height="570" ref={ref => { this.ref = ref; }} style={{ bottom: 0 }} />
            <div width="1000" height="1100" style={{ marginLeft: '-30px' }} id="my_dendogram"></div>
            // <div className="App" style={{backgroundColor:"white"}}>
            //     <h2>ROI Graph</h2>
            //     <svg width="960" height="500"></svg>
            // </div>
        )
    }

}

export default GroupedDendogramBarChart;
    // </script>
    //     </body>