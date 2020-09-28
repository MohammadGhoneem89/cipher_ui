import React, { Component } from "react";
import * as d3 from "d3";
import { sankey as sankeyGraph, sankeyLinkHorizontal } from 'd3-sankey';
import { toInteger } from "lodash";
import moment from "moment";


// const  Data = [
//     { Date: "2016-06-14", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 321 }, { Name: "Category3", Value: 524 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-15", Categories: [{ Name: "Category1", Value: 521 }, { Name: "Category2", Value: 123 }, { Name: "Category3", Value: 653 }], LineCategory: [{ Name: "Line1", Value: 89 }, { Name: "Line2", Value: 96 }] },
//     { Date: "2016-06-17", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 236 }, { Name: "Category3", Value: 537 }], LineCategory: [{ Name: "Line1", Value: 63 }, { Name: "Line2", Value: 35 }] },
//     { Date: "2016-06-18", Categories: [{ Name: "Category1", Value: 423 }, { Name: "Category2", Value: 330 }, { Name: "Category3", Value: 689 }], LineCategory: [{ Name: "Line1", Value: 86 }, { Name: "Line2", Value: 45 }] },
//     { Date: "2016-06-19", Categories: [{ Name: "Category1", Value: 601 }, { Name: "Category2", Value: 423 }, { Name: "Category3", Value: 490 }], LineCategory: [{ Name: "Line1", Value: 65 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-20", Categories: [{ Name: "Category1", Value: 412 }, { Name: "Category2", Value: 461 }, { Name: "Category3", Value: 321 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 85 }] }
// ];


class MultiLineChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.ref = null;

    }


    componentDidMount() {
        // set the dimensions and margins of the graph
        var margin = { top: 10, right: 100, bottom: 30, left: 30 },
            width = 540 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#my_datavizLine")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_connectedscatter.csv", function (someData) {

            let data = [
                {
                    "time": 1,
                    "ORDERS": 2,
                    "DECLARATIONS": 5,
                    "RETURN": 13,
                    "TOTAL": 22
                },
                {
                    "time": 2,
                    "ORDERS": 3,
                    "DECLARATIONS": 4,
                    "RETURN": 14,
                    "TOTAL": 25
                },
                {
                    "time": 3,
                    "ORDERS": 1,
                    "DECLARATIONS": 4,
                    "RETURN": 16,
                    "TOTAL": 24
                },
                {
                    "time": 4,
                    "ORDERS": 7,
                    "DECLARATIONS": 4,
                    "RETURN": 12,
                    "TOTAL": 31
                },
                {
                    "time": 5,
                    "ORDERS": 8,
                    "DECLARATIONS": 8,
                    "RETURN": 7,
                    "TOTAL": 21
                },
                {
                    "time": 6,
                    "ORDERS": 8,
                    "DECLARATIONS": 13,
                    "RETURN": 9,
                    "TOTAL": 35
                },
                {
                    "time": 7,
                    "ORDERS": 5,
                    "DECLARATIONS": 15,
                    "RETURN": 3,
                    "TOTAL": 30
                },
                {
                    "time": 8,
                    "ORDERS": 4,
                    "DECLARATIONS": 17,
                    "RETURN": 2,
                    "TOTAL": 42
                },
                {
                    "time": 9,
                    "ORDERS": 9,
                    "DECLARATIONS": 18,
                    "RETURN": 1,
                    "TOTAL": 41
                },
                {
                    "time": 10,
                    "ORDERS": 11,
                    "DECLARATIONS": 13,
                    "RETURN": 1,
                    "TOTAL": 55
                },
                {
                    "time": 11,
                    "ORDERS": 11,
                    "DECLARATIONS": 13,
                    "RETURN": 1,
                    "TOTAL": 35
                },
                {
                    "time": 12,
                    "ORDERS": 11,
                    "DECLARATIONS": 16,
                    "RETURN": 1,
                    "TOTAL": 35
                }
            ]

            console.log(data, 'LINE DATA')
            // List of groups (here I have one group per column)
            var allGroup = ["ORDERS",
                "DECLARATIONS",
                "RETURN", "TOTAL"]

            // Reformat the data: we need an array of arrays of {x, y} tuples
            var dataReady = allGroup.map(function (grpName) { // .map allows to do something for each element of the list
                return {
                    name: grpName,
                    values: data.map(function (d) {
                        return { time: d.time, value: +d[grpName] };
                    })
                };
            });
            // I strongly advise to have a look to dataReady with
            // console.log(dataReady)

            // A color scale: one color for each group
            var myColor = d3.scaleOrdinal()
                .domain(allGroup)
                .range(d3.schemeCategory10);

            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
                .domain([0, 12])
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, 60])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Add the lines
            var line = d3.line()
                .x(function (d) { return x(+d.time) })
                .y(function (d) { return y(+d.value) })
            svg.selectAll("myLines")
                .data(dataReady)
                .enter()
                .append("path")
                .attr("d", function (d) { return line(d.values) })
                .attr("stroke", function (d) { return myColor(d.name) })
                .style("stroke-width", 4)
                .style("fill", "none")

            // Add the points
            svg
                // First we need to enter in a group
                .selectAll("myDots")
                .data(dataReady)
                .enter()
                .append('g')
                .style("fill", function (d) { return myColor(d.name) })
                // Second we need to enter in the 'values' part of this group
                .selectAll("myPoints")
                .data(function (d) { return d.values })
                .enter()
                .append("circle")
                .attr("cx", function (d) { return x(d.time) })
                .attr("cy", function (d) { return y(d.value) })
                .attr("r", 5)
                .attr("stroke", "white")

            // Add a legend at the end of each line
            svg
                .selectAll("myLabels")
                .data(dataReady)
                .enter()
                .append('g')
                .append("text")
                .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; }) // keep only the last value of each time series
                .attr("transform", function (d) { return "translate(" + x(d.value.time)  + "," + y(d.value.value) + ")"; }) // Put the text at the position of the last point
                .attr("x", 12) // shift the text a bit more right
                .text(function (d) { return d.name; })
                .style("fill", function (d) { return myColor(d.name) })
                .style("font-size", 13)

        })
    }

    render() {
        return (
            // <svg className="body" width="1200" height="570" ref={ref => { this.ref = ref; }} style={{ bottom: 0 }} />
            <div style={{marginLeft: '-30px'}} id="my_datavizLine"></div>
            // <div className="App" style={{backgroundColor:"white"}}>
            //     <h2>ROI Graph</h2>
            //     <svg width="960" height="500"></svg>
            // </div>
        )
    }
}
export default MultiLineChart;
    // </script>
    //     </body>