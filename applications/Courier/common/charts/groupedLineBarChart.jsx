import React, { Component } from "react";
import * as d3 from "d3";
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


class GroupedBarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.ref = null;


        this.vals = [
            { "Month": "Jan", "New Device": 200 },
            { "Month": "Feb", "New Device": 450 },
            { "Month": "Mar", "New Device": 800 },
            { "Month": "Apr", "New Device": 650 },
            { "Month": "May", "New Device": 300 },
        ]

        this.lineData = [
            { "Month": "Jan", AED: 200 },
            { "Month": "Feb", AED: 400 },
            { "Month": "Mar", AED: 800 },
            { "Month": "Apr", AED: 600 },
            { "Month": "May", AED: 500 },
        ]
    }

    componentDidMount() {
        let svg = d3.select('svg');
        let margin = { top: 20, right: 20, bottom: 30, left: 40 };
        let width = +svg.attr("width") - margin.left - margin.right;
        let height = +svg.attr("height") - margin.top - margin.bottom;
        let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        let x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        let x1 = d3.scaleBand()
            .padding(0.05);

        let y = d3.scaleLinear()
            .rangeRound([height, 0]);

        let z = d3.scaleOrdinal()
            .range(["#222222", "#69ea69"]);


        let data = this.vals;
        let keys = Object.keys(data[0]).slice(1);

        x0.domain(data.map(function (d) { return d.Month; }));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();


        g.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(y)
                .ticks(5)
                .tickSize(-width)
                .tickFormat("")
            ).attr("stroke", "#777").attr("stroke-dasharray", "2,5")
            .call(g => g.select(".domain").remove())

        var rectG = g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("transform", function (d) { return "translate(" + x0(d.Month) + ",0)"; })
            .selectAll("rect")
            .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
            .enter()

        rectG.append("rect")
            .attr("x", function (d) { return x1(d.key); })
            .attr("y", function (d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function (d) { return height - y(d.value); })
            .attr("fill", function (d) { return z(d.key); });

        rectG.append("text")
            .text(function (d) {
                console.log(d, 'D=====');
                return d.value + '%';
            })
            .attr("x", function (d) { return x1(d.key) + (x1.bandwidth() / 2); })
            .attr("y", function (d) { return y(d.value); })
            .style("text-anchor", "middle");

        d3.select("text")
            .style("bottom", "5px")
            .style("position", "relative")
            .style("background", "red")
            .style("color", "blue")
            .style("width", "50px")
            .style("height", "50px")

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0))
            .call(g => g.select(".domain").remove()).call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0)
                .attr("stroke-dasharray", "2,2"));



        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain")
                .remove())
            .call(g => g.selectAll(".tick line")
                .attr("stroke-opacity", 0)
                .attr("stroke-dasharray", "2,2"))
        // .append("text")
        // .attr("x", 2)
        // .attr("y", y(y.ticks().pop()) + 0.5)
        // .attr("dy", "0.32em")
        // .attr("fill", "#000")
        // .attr("font-weight", "bold")
        // .attr("text-anchor", "start")
        // .text("Consumption");


        let line = d3.line()
            .x(function (d, i) { return x0(d.Month) + x0.bandwidth() / 2; })
            .y(function (d) { return y(d.AED); })
            .curve(d3.curveLinear);

        g.append("path")
            //   .attr("class", "line") // Assign a class for styling
            .style("fill", "none")
            .style("stroke", "#999")
            .style("stroke-width", 3)
            .attr("d", line(this.lineData)); // 11. Calls the line generator

        g.selectAll(".dot")
            .data(this.lineData)
            .enter()
            .append("circle") // Uses the enter().append() method
            .style("fill", "#999")
            .style("stroke", "#999")
            .attr("cx", function (d, i) { return x0(d.Month) + x0.bandwidth() / 2; })
            .attr("cy", function (d) { return y(d.AED); })
            .attr("r", 3);



        //  .attr("cx", function (d, i) { return x0(d.Month) + x0.bandwidth() / 2; })
        //     .attr("cy", function (d) { return y(d.AED); })
        // .attr("r", 5);


        let legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });


        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function (d) { return d; });
    }

    render() {
        return (
            <svg className="body" width="1200" height="570" ref={ref => { this.ref = ref; }} style={{ bottom: 0 }} />
            // <div className="App" style={{backgroundColor:"white"}}>
            //     <h2>ROI Graph</h2>
            //     <svg width="960" height="500"></svg>
            // </div>
        )
    }
}
export default GroupedBarChart;
    // </script>
    //     </body>