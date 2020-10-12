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


// const  Data = [
//     { Date: "2016-06-14", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 321 }, { Name: "Category3", Value: 524 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-15", Categories: [{ Name: "Category1", Value: 521 }, { Name: "Category2", Value: 123 }, { Name: "Category3", Value: 653 }], LineCategory: [{ Name: "Line1", Value: 89 }, { Name: "Line2", Value: 96 }] },
//     { Date: "2016-06-17", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 236 }, { Name: "Category3", Value: 537 }], LineCategory: [{ Name: "Line1", Value: 63 }, { Name: "Line2", Value: 35 }] },
//     { Date: "2016-06-18", Categories: [{ Name: "Category1", Value: 423 }, { Name: "Category2", Value: 330 }, { Name: "Category3", Value: 689 }], LineCategory: [{ Name: "Line1", Value: 86 }, { Name: "Line2", Value: 45 }] },
//     { Date: "2016-06-19", Categories: [{ Name: "Category1", Value: 601 }, { Name: "Category2", Value: 423 }, { Name: "Category3", Value: 490 }], LineCategory: [{ Name: "Line1", Value: 65 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-20", Categories: [{ Name: "Category1", Value: 412 }, { Name: "Category2", Value: 461 }, { Name: "Category3", Value: 321 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 85 }] }
// ];


class WorldHeatChart2 extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.ref = null;

    }


    componentDidMount() {
        var format = d3.format(",");

        // Set tooltips
        var tip = d3Tip()
            .attr('class', 'd3-tip')
            .offset([0, 10])
            .html(function (d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Transactions: </strong><span class='details'>" + format(+d.population) + "</span>";
            })

        var margin = { top: 0, right: 0, bottom: 0, left: 0 },
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        var color = d3.scaleThreshold()
            .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
            .range(["rgb(247,251,255)", "rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)", "rgb(33,113,181)", "rgb(8,81,156)", "rgb(8,48,107)", "rgb(3,19,43)"]);

        var path = d3.geoPath();

        var svg = d3.select("#my_heatmap")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append('g')
            .attr('class', 'map');

        var projection = d3.geoMercator()
            .scale(130)
            .translate([width / 2, height / 1.5]);

        var path = d3.geoPath().projection(projection);

        svg.call(tip);

        ready();
        // queue()
        //     .defer(d3.json, "world_countries.json")
        //     .defer(d3.tsv, "world_population.tsv")
        //     .await(ready);

        function ready(error, data, population) {
            var populationById = {};

            // heatmapCountries.forEach(function (d) { populationById[d.id] = +d.population; });
            // heatmapCountries.forEach(function (d) { d.population = populationById[d.id] });

            heatmapCountries.forEach(function (d) { populationById[d.id] = +d.population; });
            worldCountries.features.forEach(function (d) { d.population = populationById[d.id] });

            svg.append("g")
                .attr("class", "countries")
                .selectAll("path")
                .data(worldCountries.features)
                .enter().append("path")
                .attr("d", path)
                .style("fill", function (d) { return color(populationById[d.id]); })
                .style('stroke', 'white')
                .style('stroke-width', 1.5)
                .style("opacity", 0.8)
                // tooltips
                .style("stroke", "white")
                .style('stroke-width', 0.3)
                .on('mouseover', function (d) {
                    tip.show(d, this);

                    d3.select(this)
                        .style("opacity", 1)
                        .style("stroke", "white")
                        .style("stroke-width", 3);
                })
                .on('mouseout', function (d) {
                    tip.hide(d);

                    d3.select(this)
                        .style("opacity", 0.8)
                        .style("stroke", "white")
                        .style("stroke-width", 0.3);
                });

            svg.append("path")
                .datum(topojson.mesh(worldCountries.features, function (a, b) { return a.id !== b.id; }))
                // .datum(topojson.mesh(worldCountries.features, function(a, b) { return a !== b; }))
                .attr("class", "names")
                .attr("d", path);
        }
    }

    render() {
        return (
            // <svg className="body" width="1200" height="570" ref={ref => { this.ref = ref; }} style={{ bottom: 0 }} />
            <div style={{ marginLeft: '-30px' }} id="my_heatmap"></div>
            // <div className="App" style={{backgroundColor:"white"}}>
            //     <h2>ROI Graph</h2>
            //     <svg width="960" height="500"></svg>
            // </div>
        )
    }

}

export default WorldHeatChart2;
    // </script>
    //     </body>