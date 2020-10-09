import React, { Component } from "react";
import * as d3 from "d3";
// import { sankey as sankeyGraph, sankeyLinkHorizontal } from 'd3-sankey';
// import { toInteger } from "lodash";
// import moment from "moment";


// const  Data = [
//     { Date: "2016-06-14", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 321 }, { Name: "Category3", Value: 524 }], LineCategory: [{ Name: "Line1", Value: 69 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-15", Categories: [{ Name: "Category1", Value: 521 }, { Name: "Category2", Value: 123 }, { Name: "Category3", Value: 653 }], LineCategory: [{ Name: "Line1", Value: 89 }, { Name: "Line2", Value: 96 }] },
//     { Date: "2016-06-17", Categories: [{ Name: "Category1", Value: 368 }, { Name: "Category2", Value: 236 }, { Name: "Category3", Value: 537 }], LineCategory: [{ Name: "Line1", Value: 63 }, { Name: "Line2", Value: 35 }] },
//     { Date: "2016-06-18", Categories: [{ Name: "Category1", Value: 423 }, { Name: "Category2", Value: 330 }, { Name: "Category3", Value: 689 }], LineCategory: [{ Name: "Line1", Value: 86 }, { Name: "Line2", Value: 45 }] },
//     { Date: "2016-06-19", Categories: [{ Name: "Category1", Value: 601 }, { Name: "Category2", Value: 423 }, { Name: "Category3", Value: 490 }], LineCategory: [{ Name: "Line1", Value: 65 }, { Name: "Line2", Value: 63 }] },
//     { Date: "2016-06-20", Categories: [{ Name: "Category1", Value: 412 }, { Name: "Category2", Value: 461 }, { Name: "Category3", Value: 321 }], LineCategory: [{ Name: "Line1", Value: 75 }, { Name: "Line2", Value: 85 }] }
// ];


class CountryBubbleChart extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }

        this.ref = null;

    }

    componentDidMount() {
        this.createBubbleChart('', this.props.countryData, this.props.continents)
    }


    createBubbleChart(error, countries, continentNames) {
        console.log(countries, 'COUNTRIES');
        var Transactions = countries.map(function (country) { return +country.Transactions; });
        var meanPopulation = d3.mean(Transactions),
            populationExtent = d3.extent(Transactions),
            populationScaleX,
            populationScaleY;

        var continents = d3.set(countries.map(function (country) { return country.ContinentCode; }));
        var continentColorScale = d3.scaleOrdinal(d3.schemeCategory10)
            .domain(continents.values());

        var width = 1200,
            height = 800;
        var svg,
            circles,
            circleSize = { min: 10, max: 80 };
        var circleRadiusScale = d3.scaleSqrt()
            .domain(populationExtent)
            .range([circleSize.min, circleSize.max]);

        var forces,
            forceSimulation;

        createSVG();
        toggleContinentKey(!flagFill());
        createCircles();
        createForces();
        createForceSimulation();
        addFlagDefinitions();
        addFillListener();
        addGroupingListeners();

        function createSVG() {
            svg = d3.select("#bubble-chart")
                .append("svg")
                .attr("width", width)
                .attr("height", height);
        }

        function toggleContinentKey(showContinentKey) {
            var keyElementWidth = 150,
                keyElementHeight = 30;
            var onScreenYOffset = keyElementHeight * 1.5,
                offScreenYOffset = 100;

            // if (d3.select(".continent-key").empty()) {
            //     createContinentKey();
            // }
            var continentKey = d3.select(".continent-key");

            if (showContinentKey) {
                translateContinentKey("translate(0," + (height - onScreenYOffset) + ")");
            } else {
                translateContinentKey("translate(0," + (height + offScreenYOffset) + ")");
            }

            function createContinentKey() {
                var keyWidth = keyElementWidth * continents.values().length;
                var continentKeyScale = d3.scaleBand()
                    .domain(continents.values())
                    .range([(width - keyWidth) / 2, (width + keyWidth) / 2]);

                svg.append("g")
                    .attr("class", "continent-key")
                    .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
                    .selectAll("g")
                    .data(continents.values())
                    .enter()
                    .append("g")
                    .attr("class", "continent-key-element");

                d3.selectAll("g.continent-key-element")
                    .append("rect")
                    .attr("width", keyElementWidth)
                    .attr("height", keyElementHeight)
                    .attr("x", function (d) { return continentKeyScale(d); })
                    .attr("fill", function (d) { return continentColorScale(d); });

                d3.selectAll("g.continent-key-element")
                    .append("text")
                    .attr("text-anchor", "middle")
                    .attr("x", function (d) { return continentKeyScale(d) + keyElementWidth / 2; })
                    .text(function (d) { return continentNames[d]; });

                // The text BBox has non-zero values only after rendering
                d3.selectAll("g.continent-key-element text")
                    .attr("y", function (d) {
                        var textHeight = this.getBBox().height;
                        // The BBox.height property includes some extra height we need to remove
                        var unneededTextHeight = 4;
                        return ((keyElementHeight + textHeight) / 2) - unneededTextHeight;
                    });
            }

            function translateContinentKey(translation) {
                continentKey
                    .transition()
                    .duration(500)
                    .attr("transform", translation);
            }
        }

        function flagFill() {
            return isChecked("#flags");
        }

        function isChecked(elementID) {
            console.log(d3.select(elementID), 'ElementId');
            console.log(d3.select(elementID).property("checked"), 'CHECKED');
            return d3.select(elementID).property("checked");
        }

        function createCircles() {
            var formatPopulation = d3.format(",");
            circles = svg.selectAll("circle")
                .data(countries)
                .enter()
                .append("circle")
                .attr("r", function (d) { return circleRadiusScale(d.Transactions); })
                .on("mouseover", function (d) {
                    updateCountryInfo(d);
                })
                .on("mouseout", function (d) {
                    updateCountryInfo();
                });
            updateCircles();

            function updateCountryInfo(country) {
                var info = "";
                if (country) {
                    info = [country.CountryName, formatPopulation(country.Transactions)].join(": ");
                }
                d3.select("#country-info").html(info).style("visibility", function() {
                    return (info != '') ? "visible" : "hidden";
                })
            }
        }

        function updateCircles() {
            circles
                .attr("fill", function (d) {
                    // return flagFill() ? "url(#" + d.CountryCode + ")" : continentColorScale(d.ContinentCode);
                    return  "url(#" + d.CountryCode + ")";
                });
        }

        function createForces() {
            var forceStrength = 0.05;

            forces = {
                combine: createCombineForces(),
                countryCenters: createCountryCenterForces(),
                continent: createContinentForces(),
                Transactions: createPopulationForces()
            };

            function createCombineForces() {
                return {
                    x: d3.forceX(width / 2).strength(forceStrength),
                    y: d3.forceY(height / 2).strength(forceStrength)
                };
            }

            function createCountryCenterForces() {
                var projectionStretchY = 0.25,
                    projectionMargin = circleSize.max,
                    projection = d3.geoEquirectangular()
                        .scale((width / 2 - projectionMargin) / Math.PI)
                        .translate([width / 2, height * (1 - projectionStretchY) / 2]);

                return {
                    x: d3.forceX(function (d) {
                        return projection([d.CenterLongitude, d.CenterLatitude])[0];
                    }).strength(forceStrength),
                    y: d3.forceY(function (d) {
                        return projection([d.CenterLongitude, d.CenterLatitude])[1] * (1 + projectionStretchY);
                    }).strength(forceStrength)
                };
            }

            function createContinentForces() {
                return {
                    x: d3.forceX(continentForceX).strength(forceStrength),
                    y: d3.forceY(continentForceY).strength(forceStrength)
                };

                function continentForceX(d) {
                    if (d.ContinentCode === "EC") {
                        return left(width);
                    } else if (d.ContinentCode === "CO") {
                        return left(width);
                    } else if (d.ContinentCode === "LO") {
                        return right(width);
                    } else if (d.ContinentCode === "EC" || d.ContinentCode === "LO") {
                        return right(width);
                    }
                    return center(width);
                }

                function continentForceY(d) {
                    if (d.ContinentCode === "EC") {
                        return top(height);
                    } else if (d.ContinentCode === "CO") {
                        return bottom(height);
                    } else if (d.ContinentCode === "LO") {
                        return top(height);
                    } else if (d.ContinentCode === "EC" || d.ContinentCode === "LO") {
                        return bottom(height);
                    }
                    return center(height);
                }

                function left(dimension) { return dimension / 4; }
                function center(dimension) { return dimension / 2; }
                function right(dimension) { return dimension / 4 * 3; }
                function top(dimension) { return dimension / 4; }
                function bottom(dimension) { return dimension / 4 * 3; }
            }

            function createPopulationForces() {
                var continentNamesDomain = continents.values().map(function (continentCode) {
                    return continentNames[continentCode];
                });
                var scaledPopulationMargin = circleSize.max;

                populationScaleX = d3.scaleBand()
                    .domain(continentNamesDomain)
                    .range([scaledPopulationMargin, width - scaledPopulationMargin * 2]);
                populationScaleY = d3.scaleLog()
                    .domain(populationExtent)
                    .range([height - scaledPopulationMargin, scaledPopulationMargin * 2]);

                var centerCirclesInScaleBandOffset = populationScaleX.bandwidth() / 2;
                return {
                    x: d3.forceX(function (d) {
                        return populationScaleX(continentNames[d.ContinentCode]) + centerCirclesInScaleBandOffset;
                    }).strength(forceStrength),
                    y: d3.forceY(function (d) {
                        return populationScaleY(d.Transactions);
                    }).strength(forceStrength)
                };
            }

        }

        function createForceSimulation() {
            forceSimulation = d3.forceSimulation()
                .force("x", forces.combine.x)
                .force("y", forces.combine.y)
                .force("collide", d3.forceCollide(forceCollide));
            forceSimulation.nodes(countries)
                .on("tick", function () {
                    circles
                        .attr("cx", function (d) { return d.x; })
                        .attr("cy", function (d) { return d.y; });
                });
        }

        function forceCollide(d) {
            return countryCenterGrouping() || populationGrouping() ? 0 : circleRadiusScale(d.Transactions) + 1;
        }

        function countryCenterGrouping() {
            return isChecked("#country-centers");
        }

        function populationGrouping() {
            return isChecked("#population");
        }

        function addFlagDefinitions() {
            var defs = svg.append("defs");
            defs.selectAll(".flag")
                .data(countries)
                .enter()
                .append("pattern")
                .attr("id", function (d) { return d.CountryCode; })
                .attr("class", "flag")
                .attr("width", "100%")
                .attr("height", "100%")
                .attr("patternContentUnits", "objectBoundingBox")
                .append("image")
                .attr("width", 1)
                .attr("height", 1)
                // xMidYMid: center the image in the circle
                // slice: scale the image to fill the circle
                .attr("preserveAspectRatio", "xMidYMid slice")
                .attr("xlink:href", function (d) {
                    return "/flags/" + d.CountryCode + ".svg";
                });
        }

        function addFillListener() {
            d3.selectAll('input[name="fill"]')
                .on("change", function () {
                    toggleContinentKey(!flagFill() && !populationGrouping());
                    updateCircles();
                });
        }

        function addGroupingListeners() {
            addListener("#combine", forces.combine);
            addListener("#country-centers", forces.countryCenters);
            addListener("#continents", forces.continent);
            addListener("#population", forces.Transactions);

            function addListener(selector, forces) {
                d3.select(selector).on("click", function () {
                    updateForces(forces);
                    toggleContinentKey(!flagFill() && !populationGrouping());
                    togglePopulationAxes(populationGrouping());
                });
            }

            function updateForces(forces) {
                forceSimulation
                    .force("x", forces.x)
                    .force("y", forces.y)
                    .force("collide", d3.forceCollide(forceCollide))
                    .alphaTarget(0.5)
                    .restart();
            }

            function togglePopulationAxes(showAxes) {
                var onScreenXOffset = 40,
                    offScreenXOffset = -40;
                var onScreenYOffset = 40,
                    offScreenYOffset = 100;

                if (d3.select(".x-axis").empty()) {
                    createAxes();
                }
                var xAxis = d3.select(".x-axis"),
                    yAxis = d3.select(".y-axis");

                if (showAxes) {
                    translateAxis(xAxis, "translate(0," + (height - onScreenYOffset) + ")");
                    translateAxis(yAxis, "translate(" + onScreenXOffset + ",0)");
                } else {
                    translateAxis(xAxis, "translate(0," + (height + offScreenYOffset) + ")");
                    translateAxis(yAxis, "translate(" + offScreenXOffset + ",0)");
                }

                function createAxes() {
                    var numberOfTicks = 10,
                        tickFormat = ".0s";

                    var xAxis = d3.axisBottom(populationScaleX)
                        .ticks(numberOfTicks, tickFormat);

                    svg.append("g")
                        .attr("class", "x-axis")
                        .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
                        .call(xAxis)
                        .selectAll(".tick text")
                        .attr("font-size", "16px");

                    var yAxis = d3.axisLeft(populationScaleY)
                        .ticks(numberOfTicks, tickFormat);
                    svg.append("g")
                        .attr("class", "y-axis")
                        .attr("transform", "translate(" + offScreenXOffset + ",0)")
                        .call(yAxis);
                }

                function translateAxis(axis, translation) {
                    axis
                        .transition()
                        .duration(500)
                        .attr("transform", translation);
                }
            }
        }

    }

    render() {
        return (
            <div style={{ border: '3px dashed' }}>
                <div id="controls-graph">
                    <span style={{ visibility: 'hidden' }}>
                        <label><input id="combine" type="radio" name="grouping" value="combine" checked />Combine</label>
                        <label><input id="continents" type="radio" name="grouping" value="continents" />Continents</label>
                        <label><input id="country-centers" type="radio" name="grouping" value="country-centers" />Country Centers</label>
                        <label><input id="population" type="radio" name="grouping" value="population" />Population</label>
                    </span>
                    <span style={{visibility: 'hidden'}}>
                        <label><input id="colors" type="radio" name="fill" value="colors" />Colors</label>
                        <label><input id="flags" type="radio" name="fill" value="flags" checked={true} readOnly="true" checked="true" />Flags</label>
                    </span>
                </div>
                <div style={{visibility: 'hidden'}} id="country-info"></div>
                <div id="bubble-chart"></div>
            </div>
        )
    }
}
export default CountryBubbleChart;
    // </script>
    //     </body>