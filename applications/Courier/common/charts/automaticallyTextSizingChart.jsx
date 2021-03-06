import React, { Component } from "react"
import * as d3 from "d3";
import bubbleData from '../dummyData/bubbleChart.json'



class AutomaticallyTextSizingChart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: {
                "name": "flare",
                "children": [
                    {
                        "name": "analytics",
                        "children": [
                            {
                                "name": "cluster",
                                "children": [
                                    { "name": "AgglomerativeCluster", "size": 3938 },
                                    { "name": "CommunityStructure", "size": 3812 },
                                    { "name": "HierarchicalCluster", "size": 6714 },
                                    { "name": "MergeEdge", "size": 743 }
                                ]
                            },
                            {
                                "name": "graph",
                                "children": [
                                    { "name": "BetweennessCentrality", "size": 3534 },
                                    { "name": "LinkDistance", "size": 5731 },
                                    { "name": "MaxFlowMinCut", "size": 7840 },
                                    { "name": "ShortestPaths", "size": 5914 },
                                    { "name": "SpanningTree", "size": 3416 }
                                ]
                            },
                            {
                                "name": "optimization",
                                "children": [
                                    { "name": "AspectRatioBanker", "size": 7074 }
                                ]
                            }
                        ]
                    },
                    {
                        "name": "animate",
                        "children": [
                            { "name": "Easing", "size": 17010 },
                            { "name": "FunctionSequence", "size": 5842 },
                            {
                                "name": "interpolate",
                                "children": [
                                    { "name": "ArrayInterpolator", "size": 1983 },
                                    { "name": "ColorInterpolator", "size": 2047 },
                                    { "name": "DateInterpolator", "size": 1375 },
                                    { "name": "Interpolator", "size": 8746 },
                                    { "name": "MatrixInterpolator", "size": 2202 },
                                    { "name": "NumberInterpolator", "size": 1382 },
                                    { "name": "ObjectInterpolator", "size": 1629 },
                                    { "name": "PointInterpolator", "size": 1675 },
                                    { "name": "RectangleInterpolator", "size": 2042 }
                                ]
                            },
                            { "name": "ISchedulable", "size": 1041 },
                            { "name": "Parallel", "size": 5176 },
                            { "name": "Pause", "size": 449 },
                            { "name": "Scheduler", "size": 5593 },
                            { "name": "Sequence", "size": 5534 },
                            { "name": "Transition", "size": 9201 },
                            { "name": "Transitioner", "size": 19975 },
                            { "name": "TransitionEvent", "size": 1116 },
                            { "name": "Tween", "size": 6006 }
                        ]
                    },
                    {
                        "name": "data",
                        "children": [
                            {
                                "name": "converters",
                                "children": [
                                    { "name": "Converters", "size": 721 },
                                    { "name": "DelimitedTextConverter", "size": 4294 },
                                    { "name": "GraphMLConverter", "size": 9800 },
                                    { "name": "IDataConverter", "size": 1314 },
                                    { "name": "JSONConverter", "size": 2220 }
                                ]
                            },
                            { "name": "DataField", "size": 1759 },
                            { "name": "DataSchema", "size": 2165 },
                            { "name": "DataSet", "size": 586 },
                            { "name": "DataSource", "size": 3331 },
                            { "name": "DataTable", "size": 772 },
                            { "name": "DataUtil", "size": 3322 }
                        ]
                    },
                    {
                        "name": "display",
                        "children": [
                            { "name": "DirtySprite", "size": 8833 },
                            { "name": "LineSprite", "size": 1732 },
                            { "name": "RectSprite", "size": 3623 },
                            { "name": "TextSprite", "size": 10066 }
                        ]
                    },
                    {
                        "name": "flex",
                        "children": [
                            { "name": "FlareVis", "size": 4116 }
                        ]
                    },
                    {
                        "name": "physics",
                        "children": [
                            { "name": "DragForce", "size": 1082 },
                            { "name": "GravityForce", "size": 1336 },
                            { "name": "IForce", "size": 319 },
                            { "name": "NBodyForce", "size": 10498 },
                            { "name": "Particle", "size": 2822 },
                            { "name": "Simulation", "size": 9983 },
                            { "name": "Spring", "size": 2213 },
                            { "name": "SpringForce", "size": 1681 }
                        ]
                    },
                    {
                        "name": "query",
                        "children": [
                            { "name": "AggregateExpression", "size": 1616 },
                            { "name": "And", "size": 1027 },
                            { "name": "Arithmetic", "size": 3891 },
                            { "name": "Average", "size": 891 },
                            { "name": "BinaryExpression", "size": 2893 },
                            { "name": "Comparison", "size": 5103 },
                            { "name": "CompositeExpression", "size": 3677 },
                            { "name": "Count", "size": 781 },
                            { "name": "DateUtil", "size": 4141 },
                            { "name": "Distinct", "size": 933 },
                            { "name": "Expression", "size": 5130 },
                            { "name": "ExpressionIterator", "size": 3617 },
                            { "name": "Fn", "size": 3240 },
                            { "name": "If", "size": 2732 },
                            { "name": "IsA", "size": 2039 },
                            { "name": "Literal", "size": 1214 },
                            { "name": "Match", "size": 3748 },
                            { "name": "Maximum", "size": 843 },
                            {
                                "name": "methods",
                                "children": [
                                    { "name": "add", "size": 593 },
                                    { "name": "and", "size": 330 },
                                    { "name": "average", "size": 287 },
                                    { "name": "count", "size": 277 },
                                    { "name": "distinct", "size": 292 },
                                    { "name": "div", "size": 595 },
                                    { "name": "eq", "size": 594 },
                                    { "name": "fn", "size": 460 },
                                    { "name": "gt", "size": 603 },
                                    { "name": "gte", "size": 625 },
                                    { "name": "iff", "size": 748 },
                                    { "name": "isa", "size": 461 },
                                    { "name": "lt", "size": 597 },
                                    { "name": "lte", "size": 619 },
                                    { "name": "max", "size": 283 },
                                    { "name": "min", "size": 283 },
                                    { "name": "mod", "size": 591 },
                                    { "name": "mul", "size": 603 },
                                    { "name": "neq", "size": 599 },
                                    { "name": "not", "size": 386 },
                                    { "name": "or", "size": 323 },
                                    { "name": "orderby", "size": 307 },
                                    { "name": "range", "size": 772 },
                                    { "name": "select", "size": 296 },
                                    { "name": "stddev", "size": 363 },
                                    { "name": "sub", "size": 600 },
                                    { "name": "sum", "size": 280 },
                                    { "name": "update", "size": 307 },
                                    { "name": "variance", "size": 335 },
                                    { "name": "where", "size": 299 },
                                    { "name": "xor", "size": 354 },
                                    { "name": "_", "size": 264 }
                                ]
                            },
                            { "name": "Minimum", "size": 843 },
                            { "name": "Not", "size": 1554 },
                            { "name": "Or", "size": 970 },
                            { "name": "Query", "size": 13896 },
                            { "name": "Range", "size": 1594 },
                            { "name": "StringUtil", "size": 4130 },
                            { "name": "Sum", "size": 791 },
                            { "name": "Variable", "size": 1124 },
                            { "name": "Variance", "size": 1876 },
                            { "name": "Xor", "size": 1101 }
                        ]
                    },
                    {
                        "name": "scale",
                        "children": [
                            { "name": "IScaleMap", "size": 2105 },
                            { "name": "LinearScale", "size": 1316 },
                            { "name": "LogScale", "size": 3151 },
                            { "name": "OrdinalScale", "size": 3770 },
                            { "name": "QuantileScale", "size": 2435 },
                            { "name": "QuantitativeScale", "size": 4839 },
                            { "name": "RootScale", "size": 1756 },
                            { "name": "Scale", "size": 4268 },
                            { "name": "ScaleType", "size": 1821 },
                            { "name": "TimeScale", "size": 5833 }
                        ]
                    },
                    {
                        "name": "util",
                        "children": [
                            { "name": "Arrays", "size": 8258 },
                            { "name": "Colors", "size": 10001 },
                            { "name": "Dates", "size": 8217 },
                            { "name": "Displays", "size": 12555 },
                            { "name": "Filter", "size": 2324 },
                            { "name": "Geometry", "size": 10993 },
                            {
                                "name": "heap",
                                "children": [
                                    { "name": "FibonacciHeap", "size": 9354 },
                                    { "name": "HeapNode", "size": 1233 }
                                ]
                            },
                            { "name": "IEvaluable", "size": 335 },
                            { "name": "IPredicate", "size": 383 },
                            { "name": "IValueProxy", "size": 874 },
                            {
                                "name": "math",
                                "children": [
                                    { "name": "DenseMatrix", "size": 3165 },
                                    { "name": "IMatrix", "size": 2815 },
                                    { "name": "SparseMatrix", "size": 3366 }
                                ]
                            },
                            { "name": "Maths", "size": 17705 },
                            { "name": "Orientation", "size": 1486 },
                            {
                                "name": "palette",
                                "children": [
                                    { "name": "ColorPalette", "size": 6367 },
                                    { "name": "Palette", "size": 1229 },
                                    { "name": "ShapePalette", "size": 2059 },
                                    { "name": "SizePalette", "size": 2291 }
                                ]
                            },
                            { "name": "Property", "size": 5559 },
                            { "name": "Shapes", "size": 19118 },
                            { "name": "Sort", "size": 6887 },
                            { "name": "Stats", "size": 6557 },
                            { "name": "Strings", "size": 22026 }
                        ]
                    },
                    {
                        "name": "vis",
                        "children": [
                            {
                                "name": "axis",
                                "children": [
                                    { "name": "Axes", "size": 1302 },
                                    { "name": "Axis", "size": 24593 },
                                    { "name": "AxisGridLine", "size": 652 },
                                    { "name": "AxisLabel", "size": 636 },
                                    { "name": "CartesianAxes", "size": 6703 }
                                ]
                            },
                            {
                                "name": "controls",
                                "children": [
                                    { "name": "AnchorControl", "size": 2138 },
                                    { "name": "ClickControl", "size": 3824 },
                                    { "name": "Control", "size": 1353 },
                                    { "name": "ControlList", "size": 4665 },
                                    { "name": "DragControl", "size": 2649 },
                                    { "name": "ExpandControl", "size": 2832 },
                                    { "name": "HoverControl", "size": 4896 },
                                    { "name": "IControl", "size": 763 },
                                    { "name": "PanZoomControl", "size": 5222 },
                                    { "name": "SelectionControl", "size": 7862 },
                                    { "name": "TooltipControl", "size": 8435 }
                                ]
                            },
                            {
                                "name": "data",
                                "children": [
                                    { "name": "Data", "size": 20544 },
                                    { "name": "DataList", "size": 19788 },
                                    { "name": "DataSprite", "size": 10349 },
                                    { "name": "EdgeSprite", "size": 3301 },
                                    { "name": "NodeSprite", "size": 19382 },
                                    {
                                        "name": "render",
                                        "children": [
                                            { "name": "ArrowType", "size": 698 },
                                            { "name": "EdgeRenderer", "size": 5569 },
                                            { "name": "IRenderer", "size": 353 },
                                            { "name": "ShapeRenderer", "size": 2247 }
                                        ]
                                    },
                                    { "name": "ScaleBinding", "size": 11275 },
                                    { "name": "Tree", "size": 7147 },
                                    { "name": "TreeBuilder", "size": 9930 }
                                ]
                            },
                            {
                                "name": "events",
                                "children": [
                                    { "name": "DataEvent", "size": 2313 },
                                    { "name": "SelectionEvent", "size": 1880 },
                                    { "name": "TooltipEvent", "size": 1701 },
                                    { "name": "VisualizationEvent", "size": 1117 }
                                ]
                            },
                            {
                                "name": "legend",
                                "children": [
                                    { "name": "Legend", "size": 20859 },
                                    { "name": "LegendItem", "size": 4614 },
                                    { "name": "LegendRange", "size": 10530 }
                                ]
                            },
                            {
                                "name": "operator",
                                "children": [
                                    {
                                        "name": "distortion",
                                        "children": [
                                            { "name": "BifocalDistortion", "size": 4461 },
                                            { "name": "Distortion", "size": 6314 },
                                            { "name": "FisheyeDistortion", "size": 3444 }
                                        ]
                                    },
                                    {
                                        "name": "encoder",
                                        "children": [
                                            { "name": "ColorEncoder", "size": 3179 },
                                            { "name": "Encoder", "size": 4060 },
                                            { "name": "PropertyEncoder", "size": 4138 },
                                            { "name": "ShapeEncoder", "size": 1690 },
                                            { "name": "SizeEncoder", "size": 1830 }
                                        ]
                                    },
                                    {
                                        "name": "filter",
                                        "children": [
                                            { "name": "FisheyeTreeFilter", "size": 5219 },
                                            { "name": "GraphDistanceFilter", "size": 3165 },
                                            { "name": "VisibilityFilter", "size": 3509 }
                                        ]
                                    },
                                    { "name": "IOperator", "size": 1286 },
                                    {
                                        "name": "label",
                                        "children": [
                                            { "name": "Labeler", "size": 9956 },
                                            { "name": "RadialLabeler", "size": 3899 },
                                            { "name": "StackedAreaLabeler", "size": 3202 }
                                        ]
                                    },
                                    {
                                        "name": "layout",
                                        "children": [
                                            { "name": "AxisLayout", "size": 6725 },
                                            { "name": "BundledEdgeRouter", "size": 3727 },
                                            { "name": "CircleLayout", "size": 9317 },
                                            { "name": "CirclePackingLayout", "size": 12003 },
                                            { "name": "DendrogramLayout", "size": 4853 },
                                            { "name": "ForceDirectedLayout", "size": 8411 },
                                            { "name": "IcicleTreeLayout", "size": 4864 },
                                            { "name": "IndentedTreeLayout", "size": 3174 },
                                            { "name": "Layout", "size": 7881 },
                                            { "name": "NodeLinkTreeLayout", "size": 12870 },
                                            { "name": "PieLayout", "size": 2728 },
                                            { "name": "RadialTreeLayout", "size": 12348 },
                                            { "name": "RandomLayout", "size": 870 },
                                            { "name": "StackedAreaLayout", "size": 9121 },
                                            { "name": "TreeMapLayout", "size": 9191 }
                                        ]
                                    },
                                    { "name": "Operator", "size": 2490 },
                                    { "name": "OperatorList", "size": 5248 },
                                    { "name": "OperatorSequence", "size": 4190 },
                                    { "name": "OperatorSwitch", "size": 2581 },
                                    { "name": "SortOperator", "size": 2023 }
                                ]
                            },
                            { "name": "Visualization", "size": 16540 }
                        ]
                    }
                ]
            },
            labels: this.props.labels || [],
            datasets: [{
                data: this.props.data,
                backgroundColor: this.props.backgroundColor
            }],
        }
    }

    componentDidMount() {
        // let svg = d3.select('svg');
        // let margin = { top: 20, right: 20, bottom: 30, left: 40 };
        // let width = +svg.attr("width") - margin.left - margin.right;
        // let height = +svg.attr("height") - margin.top - margin.bottom;
        // let g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // let x0 = d3.scaleBand()
        //     .rangeRound([0, width])
        //     .paddingInner(0.1);

        // let x1 = d3.scaleBand()
        //     .padding(0.05);

        // let y = d3.scaleLinear()
        //     .rangeRound([height, 0]);

        // let z = d3.scaleOrdinal()
        //     .range(["#222222", "#69ea69"]);


        // let data = this.vals;
        // let keys = Object.keys(data[0]).slice(1);

        // x0.domain(data.map(function (d) { return d.Month; }));
        // x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        // y.domain([0, d3.max(data, function (d) { return d3.max(keys, function (key) { return d[key]; }); })]).nice();


        // g.append("g")
        //     .attr("class", "grid")
        //     .call(d3.axisLeft(y)
        //         .ticks(5)
        //         .tickSize(-width)
        //         .tickFormat("")
        //     ).attr("stroke", "#777").attr("stroke-dasharray", "2,5")
        //     .call(g => g.select(".domain").remove())

        // var rectG = g.append("g")
        //     .selectAll("g")
        //     .data(data)
        //     .enter().append("g")
        //     .attr("transform", function (d) { return "translate(" + x0(d.Month) + ",0)"; })
        //     .selectAll("rect")
        //     .data(function (d) { return keys.map(function (key) { return { key: key, value: d[key] }; }); })
        //     .enter()

        // rectG.append("rect")
        //     .attr("x", function (d) { return x1(d.key); })
        //     .attr("y", function (d) { return y(d.value); })
        //     .attr("width", x1.bandwidth())
        //     .attr("height", function (d) { return height - y(d.value); })
        //     .attr("fill", function (d) { return z(d.key); });

        // rectG.append("text")
        //     .text(function (d) {
        //         console.log(d, 'D=====');
        //         return d.value + '%';
        //     })
        //     .attr("x", function (d) { return x1(d.key) + (x1.bandwidth() / 2); })
        //     .attr("y", function (d) { return y(d.value); })
        //     .style("text-anchor", "middle");

        // d3.select("text")
        //     .style("bottom", "5px")
        //     .style("position", "relative")
        //     .style("background", "red")
        //     .style("color", "blue")
        //     .style("width", "50px")
        //     .style("height", "50px")

        // g.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(0," + height + ")")
        //     .call(d3.axisBottom(x0))
        //     .call(g => g.select(".domain").remove()).call(g => g.selectAll(".tick line")
        //         .attr("stroke-opacity", 0)
        //         .attr("stroke-dasharray", "2,2"));



        // g.append("g")
        //     .attr("class", "axis")
        //     .call(d3.axisLeft(y))
        //     .call(g => g.select(".domain")
        //         .remove())
        //     .call(g => g.selectAll(".tick line")
        //         .attr("stroke-opacity", 0)
        //         .attr("stroke-dasharray", "2,2"))
        // // .append("text")
        // // .attr("x", 2)
        // // .attr("y", y(y.ticks().pop()) + 0.5)
        // // .attr("dy", "0.32em")
        // // .attr("fill", "#000")
        // // .attr("font-weight", "bold")
        // // .attr("text-anchor", "start")
        // // .text("Consumption");


        // let line = d3.line()
        //     .x(function (d, i) { return x0(d.Month) + x0.bandwidth() / 2; })
        //     .y(function (d) { return y(d.AED); })
        //     .curve(d3.curveLinear);

        // g.append("path")
        //     //   .attr("class", "line") // Assign a class for styling
        //     .style("fill", "none")
        //     .style("stroke", "#999")
        //     .style("stroke-width", 3)
        //     .attr("d", line(this.lineData)); // 11. Calls the line generator

        // g.selectAll(".dot")
        //     .data(this.lineData)
        //     .enter()
        //     .append("circle") // Uses the enter().append() method
        //     .style("fill", "#999")
        //     .style("stroke", "#999")
        //     .attr("cx", function (d, i) { return x0(d.Month) + x0.bandwidth() / 2; })
        //     .attr("cy", function (d) { return y(d.AED); })
        //     .attr("r", 3);



        // //  .attr("cx", function (d, i) { return x0(d.Month) + x0.bandwidth() / 2; })
        // //     .attr("cy", function (d) { return y(d.AED); })
        // // .attr("r", 5);


        // let legend = g.append("g")
        //     .attr("font-family", "sans-serif")
        //     .attr("font-size", 10)
        //     .attr("text-anchor", "end")
        //     .selectAll("g")
        //     .data(keys.slice().reverse())
        //     .enter().append("g")
        //     .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });


        // legend.append("rect")
        //     .attr("x", width - 19)
        //     .attr("width", 19)
        //     .attr("height", 19)
        //     .attr("fill", z);

        // legend.append("text")
        //     .attr("x", width - 24)
        //     .attr("y", 9.5)
        //     .attr("dy", "0.32em")
        //     .text(function (d) { return d; });


        // ===============================

        var bleed = 100,
            width = 960,
            height = 760;

        var pack = d3.pack()
            .size([width, height + bleed * 2])
            .padding(2);

        // let svg = d3.select('svg');
            var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(0," + -bleed + ")");

        // d3.json("../dummyData/bubbleChart.json", function (error, json) {
            // d3.json("flare.json", function(root) {
            d3.json("../dummyData/bubbleChart.json", function (json) {
                
                var node = svg.selectAll(".node")
                .data(pack.nodes(flatten(json))
                    .filter(function (d) { return !d.children; }))
                .enter().append("g")
                .attr("class", "node")
                .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });

            node.append("circle")
                .attr("r", function (d) { return d.r; });

            node.append("text")
                .text(function (d) { return d.name; })
                .style("font-size", function (d) { return Math.min(2 * d.r, (2 * d.r - 8) / this.getComputedTextLength() * 24) + "px"; })
                .attr("dy", ".35em");
            })
            // if (error) throw error;
        // });

        // Returns a flattened hierarchy containing all leaf nodes under the root.
        function flatten(root) {
            var nodes = [];

            function recurse(node) {
                if (node.children) node.children.forEach(recurse);
                else nodes.push({ name: node.name, value: node.size });
            }

            recurse(root);
            return { children: nodes };
        }
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
export default AutomaticallyTextSizingChart;