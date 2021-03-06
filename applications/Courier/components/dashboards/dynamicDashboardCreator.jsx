/*standard imports*/
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import * as actions from '../../../../core/actions/generalAction';
import Wrapper from '../../common/Wrapper.jsx';
import Row from '../../common/Row.jsx';
import Input from '../../common/Input.jsx';
import Label from '../../common/Lable.jsx';;
import Combobox from '../../common/Select.jsx';
import Col from '../../common/Col.jsx';;
import Table from '../../common/Datatable.jsx';
import * as utils from '../../../../core/common/utils.js';
import * as constants from '../../../../core/constants/Communication';
import * as requestCreator from '../../../../core/common/request.js';
import * as gen from '../../common/generalActionHandler'
import Portlet from '../../common/Portlet.jsx';
// import Checklist from '../../common/CheckList.jsx';
import HorizontalBarChartNew from '../../common/charts/horizontalBarChartNew.jsx';
import HorizontalBarChartWithDifferentColors from '../../common/charts/horizontalBarChartWithDifferentColors.jsx';
// import HorizontalStackedBarChart from '../../common/charts/horizontalStackedBarChart.jsx';
import PieChart from '../../common/charts/PieChart.jsx';
import VerticalBarChart from '../../common/charts/VerticalBarChart.jsx';
// import MultiLineChart from '../../common/charts/multiLineChart.jsx';
// import TileUnit from '../../../../core/common/tileUnit.jsx';
import moment from 'moment';
import * as d3 from "d3";
// import { Multiselect } from 'multiselect-react-dropdown';

import jsonData from '../../common/dummyData/dashboard.json';
import bankColors from '../../../config/bank-colors';
// import DashboardFilters from './dashboardFilters.jsx';
// import AutomaticallyTextSizingChart from '../../common/charts/automaticallyTextSizingChart.jsx';
// import BubbleChart from '../../common/charts/react-bubble-chart.jsx';
import { indexOf } from 'lodash';

// import countryData from './countries.csv';
import continentData from './continent-names.json';
import heatMapData from './worldheatMap1.json';
// import countryData from './countries.json';
// import companyData from './companies.json';
// import fcData from './fc-data.json';
// import companyBubbles from './company-data.json';
import sankeyData from './sankey-data.json';
// import { bubbleChartFc } from '../../common/charts/bubble-chart-fc';
import BubbleChart from '../../common/charts/bubbleChart-CSBOX.js';
import SankeyChart from '../../common/charts/d3-sankey-chart.jsx';
import MultiLineChart from '../../common/charts/d3-multiLine-chart.jsx';
import CountryBubbleChart from '../../common/charts/countryBubbleChart.jsx';
import WorldHeatChart from '../../common/charts/world-heat-chart.jsx';
import WorldHeatChart2 from '../../common/charts/world-heat-chart2.jsx';
// bubbleChartFc

let interval;
class DynamicDashboardCreator extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                { name: "Learn Angular", category: "wip", bgcolor: "yellow" },
                { name: "React", category: "wip", bgcolor: "pink" },
                { name: "Vue", category: "complete", bgcolor: "skyblue" }
            ],
            widget1isLoading: true,
            widget2isLoading: true,
            widget3isLoading: true,
            widget4isLoading: true,
            widget5isLoading: true,
            widget6isLoading: true,
            widget7isLoading: true,
            widget8isLoading: true,
            widget9isLoading: true,
            widget20isLoading: true,
            widget21isLoading: true,
            widget22isLoading: true,
            widgetIds: [1, 2, 3, 4, 5, 6, 7, 10, 11, 20, 21, 22],
            selectedYears: [],
            options: [{ name: 'Srigar', id: 1 }, { name: 'Sam', id: 2 }],
            selectedQuarters: [],
            selectedMonths: [],
            selectedZone: [],
            regions: [],
            typeData: undefined,
            getDashboardData: undefined,
            fromDate: moment().subtract(29, 'days').format('DD/MM/YYYY'),
            toDate: moment().format('DD/MM/YYYY'),
            selectedFromDate: moment().subtract(29, 'days').format('DD/MM/YYYY'),
            selectedToDate: moment().format('DD/MM/YYYY'),
            CBVLabels: undefined,
            CBVData: undefined,
            hsTitile: 'E-Commerce Company',
            topHS: { option: 'E-Commerce Company' },
            isLoading: false,
            ecommerce: '001',
            tracking: {
                courier: "",
                ecommerce: ""
            }
        };
        this.generalHandler = gen.generalHandler.bind(this);
        this.customActionHandler = customActionHandler.bind(this);
        this.dateChangeWorkboard = this.dateChangeWorkboard.bind(this)
        this.sendCall = this.sendCall.bind(this);
        this.generalActionHandler = gen.generalHandler.bind(this);
        this.applyFilter = this.applyFilter.bind(this);
        this.clearFilter = this.clearFilter.bind(this);
    }

    // bubbleChartFc = () => {
    //     var width = 960,
    //     height = 960,
    //     marginTop = 96,
    //     minRadius = 6,
    //     maxRadius = 20,
    //     columnForColors = "category",
    //     columnForTitle = "title",
    //     columnForRadius = "views",
    //     forceApart = -50,
    //     unitName="hearts",
    //     customColors=false,
    //     customRange,
    //     customDomain,
    //     chartSelection,
    //     chartSVG,
    //     showTitleOnCircle=false;

    //     /**
    //      * The command to actually render the chart after setting the settings.
    //      * @public
    //      * @param {string} selection - The div ID that you want to render in 
    //      */
    //     function chart(selection) {
    //         var data = selection.datum();
    //         chartSelection=selection;
    //         var div = selection,
    //         svg = div.selectAll('svg');
    //         svg.attr('width', width).attr('height', height);
    //         chartSVG=svg;

    //         var tooltip = selection
    //         .append("div")
    //         .style("position", "absolute")
    //         .style("visibility", "hidden")
    //         .style("color", "white")
    //         .style("padding", "8px")
    //         .style("background-color", "#626D71")
    //         .style("border-radius", "6px")
    //         .style("text-align", "center")
    //         .style("font-family", "monospace")
    //         .style("width", "400px")
    //         .text("");


    //         var simulation = d3.forceSimulation(data)
    //         .force("charge", d3.forceManyBody().strength([forceApart]))
    //         .force("x", d3.forceX())
    //         .force("y", d3.forceY())
    //         .on("tick", ticked);

    //         function ticked(e) {
    //             node.attr("transform",function(d) {
    //                 return "translate(" + [d.x+(width / 2), d.y+((height+marginTop) / 2)] +")";
    //             });
    //         }

    //         var colorCircles;
    //         if (!customColors) {
    //             colorCircles = d3.scaleOrdinal(d3.schemeCategory10);
    //         } 
    //         else {
    //             colorCircles = d3.scaleOrdinal()
    //             .domain(customDomain)
    //             .range(customRange);
    //         }

    //         var minRadiusDomain = d3.min(data, function(d) {
    //             return +d[columnForRadius];
    //         });
    //         var maxRadiusDomain = d3.max(data, function(d) {
    //             return +d[columnForRadius];
    //         });
    //         var scaleRadius = d3.scaleLinear()
    //         .domain([minRadiusDomain, maxRadiusDomain])
    //         .range([minRadius, maxRadius])

    //         var node = svg.selectAll("circle")
    //         .data(data)
    //         .enter()
    //         .append("g")
    //         .attr('transform', 'translate(' + [width / 2, height / 2] + ')')
    //         .style('opacity',1);

    //         node.append("circle")
    //         .attr("id",function(d,i) {
    //             return i;
    //         })
    //         .attr('r', function(d) {
    //             return scaleRadius(d[columnForRadius]);
    //         })
    //         .style("fill", function(d) {
    //             return colorCircles(d[columnForColors]);
    //         })
    //         .on("mouseover", function(d) {
    //             tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + " "+ unitName);
    //             return tooltip.style("visibility", "visible");
    //         })
    //         .on("mousemove", function() {
    //             return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    //         })
    //         .on("mouseout", function() {
    //             return tooltip.style("visibility", "hidden");
    //         });
    //         node.append("clipPath")
    //         .attr("id",function(d,i) {
    //             return "clip-"+i;
    //         })
    //         .append("use")
    //         .attr("xlink:href",function(d,i) {
    //             return "#" + i;
    //         });
    //         if (showTitleOnCircle) {
    //             node.append("text")
    //             .attr("clip-path",function(d,i) {
    //                 return "url(#clip-" + i + ")"
    //             })
    //             .attr("text-anchor", "middle")
    //             .append("tspan")
    //             .attr("x",function(d) {
    //                 return 0;//-1*scaleRadius(d[columnForRadius])/3;
    //             })
    //             .attr("y",function(d) {
    //                 return ".3em";//scaleRadius(d[columnForRadius])/4;
    //             })
    //             .text(function(d) {
    //                 return d[columnForTitle];
    //             })
    //             .on("mouseover", function(d) {
    //                 tooltip.html(d[columnForTitle] + "<br/>" + d[columnForColors] + "<br/>" + d[columnForRadius] + " "+ unitName);
    //                 return tooltip.style("visibility", "visible");
    //             })
    //             .on("mousemove", function() {
    //                 return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
    //             })
    //             .on("mouseout", function() {
    //                 return tooltip.style("visibility", "hidden");
    //             });
    //         }

    //         svg.append('text')
    //             .attr('x',width/2).attr('y',marginTop)
    //             .attr("text-anchor", "middle")
    //             .attr("font-size","1.8em")
    //             .text('title');
    //     }


    //     chart.width = chartWidth;
    //     chart.height = chartHeight;
    //     chart.columnForColors = chartColForColors;
    //     chart.columnForRadius = chartColForRadius;
    //     chart.columnForTitle = chartColForTitle;
    //     chart.minRadius = chartMinRadius;
    //     chart.maxRadius = chartMaxRadius;
    //     chart.forceApart = chartForceApart;
    //     chart.unitName = chartUnitName;
    //     chart.customColors = chartCustomColors;
    //     chart.showTitleOnCircle = chartShowTitleOnCircle;
    //     chart.title=chartTitle;
    //     chart.remove = chartRemove;

    //     /**
    //      * Get/set the height of the chart
    //      * Use 'chart.width' to get or set. 
    //      * @example
    //      * chart.columnForColors(960);	// Sets the width of the SVG to 960
    //      * chart.columnForColors();	// returns 960
    //      * 
    //      * @public
    //      * @param {number} [value] - The width of the chart 
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartWidth(value) {
    //         if (!arguments.length) {
    //             return width;
    //         }
    //         width = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the height of the chart.
    //      * Use 'chart.height' to get or set. 
    //      * @example
    //      * chart.height(960);	// Sets the height of the SVG to 960
    //      * chart.height();		// returns 960
    //      * 
    //      * @public
    //      * @param {number} [value] - The height of the chart
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartHeight(value) {
    //         if (!arguments.length) {
    //             return height;
    //         }
    //         height = value;
    //         marginTop=0.05*height;
    //         return chart;
    //     };


    //     /**
    //      * Get/set the property used to determine the colors of the bubbles. 
    //      * Use 'chart.columnForColors' to get or set. 
    //      * @example
    //      * chart.columnForColors("Sex");	// Sets the column to birthCount
    //      * chart.columnForColors();	// returns "Sex"
    //      * @public
    //      * @param {string} [value] - Property name to bind the bubble color to.
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartColForColors(value) {
    //         if (!arguments.length) {
    //             return columnForColors;
    //         }
    //         columnForColors = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the property to determine the titles of the bubbles.
    //      * Use 'chart.columnForTitle' to get or set. 
    //      * @example
    //      * chart.columnForTitle("Name");	// Sets the column to birthCount
    //      * chart.columnForTitle();		// returns "Name"
    //      * 
    //      * @param {string} [value] - Property name to bind the bubble title to.
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartColForTitle(value) {
    //         if (!arguments.length) {
    //             return columnForTitle;
    //         }
    //         columnForTitle = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the property to determine the radii of the bubbles.
    //      * Use 'chart.columnForRadius' to get or set. 
    //      * 
    //      * @example
    //      * chart.columnForRadius("birthCount");	// Sets the column to birthCount
    //      * chart.columnForRadius();		// returns "birthCount"
    //      * @public
    //      * @param {string} [value] - Property name to bind the bubble radius to. Requires a numerical property.
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartColForRadius (value) {
    //         if (!arguments.length) {
    //             return columnForRadius;
    //         }
    //         columnForRadius = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the minimum radius of the bubbles.
    //      * Use 'chart.minRadius' to get or set. 
    //      * @example
    //      * 	chart.columnForColors(3); 	// Sets the column to birthCount
    //      *  chart.columnForColors();	// returns 3
    //      * 
    //      * @param {number} [value] - The minimum radius for the width of the bubbles
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartMinRadius(value) {
    //         if (!arguments.length) {
    //             return minRadius;
    //         }
    //         minRadius = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the maximum radius of the bubbles.
    //      * Use 'chart.maxRadius' to get or set.
    //      * 
    //      * @public
    //      * @param {number} [value] - The maximum radius of the bubbles for the largest value in the dataset
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartMaxRadius(value) {
    //         if (!arguments.length) {
    //             return maxRadius;
    //         }
    //         maxRadius = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the unit name for the property the is represented by the radius of the bubbles. 
    //      * Used in the tooltip of the bubbles.
    //      * Use 'chart.unitName' to get or set.
    //      * @example
    //      * chart.unitName(" babies");	// Sets the column to birthCount
    //      * chart.unitName();		// returns " babies"
    //      * 
    //      * @public
    //      * @param {any} [value] - The unit name to display on the tooltip when hovering over a bubble
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartUnitName(value) {
    //         if (!arguments.length) {
    //             return unitName;
    //         }
    //         unitName = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the force the separates and pushes together the bubbles on loading of the chart
    //      * Use 'chart.forceApart' to get or set.
    //      * @example
    //      * chart.forceApart(150);	// Sets the column to birthCount
    //      * chart.forceApart();	// returns 150
    //      * 
    //      * @public
    //      * @param {any} [value] - Determines the force to separate the bubbles from each other when loading the chart
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartForceApart(value) {
    //         if (!arguments.length) {
    //             return forceApart;
    //         }
    //         forceApart = value;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the property that determines if we show or hide the title of the data on the bubbles.
    //      * Use 'chart.showTitleOnCircle' to get or set.
    //      * @example
    //      * chart.showTitleOnCircle(true); 	
    //      * chart.forceApart();	// returns true
    //      * 
    //      * @public
    //      * @param {boolean} [value] - Determines whether to show or hide the title of the data on the bubbles
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartShowTitleOnCircle(value) {
    //         if (!arguments.length) {
    //             return showTitleOnCircle;
    //         }
    //         showTitleOnCircle = value;
    //         return chart;
    //     };

    //     /**
    //      * Set the domain and range of the colors used for the bubbles. This is only needed if you want to use custom colors in the chart.
    //      * Use 'chart.customColors' to set.
    //      * @example
    //      * chart.customColors(["M","F"], ["#70b7f0","#e76486"]); 	// Sets the custom colors domain and range
    //      * 
    //      * @param {any[]} domain - The domain. This is the set of categories used for binding the colors.
    //      * @param {string[]} range - The range. This is an array of color codes that you want to represent each category in the domain.
    //      * 							 Note: The length of the array must perfectly match the length of the domain array.
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartCustomColors(domain,range) {
    //         customColors=true;
    //         customDomain=domain;
    //         customRange=range;
    //         return chart;
    //     };

    //     /**
    //      * Get/set the property that determines the title of the chart.
    //      * Use 'chart.title' to get or set.
    //      * @example
    //      * chart.title("Birth Count in the U.S. in 2016"); // Sets the chart title
    //      * chart.title();	// returns "Birth Count in the U.S. in 2016"
    //      * @public
    //      * @param {string} value - The title of the chart
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartTitle(value) {
    //         if (!arguments.length) {
    //             return title;
    //         }
    //         title = value;
    //         return chart;
    //     }

    //     /**
    //      * Animate the removal of data from the chart (and the title)
    //      * @public
    //      * @param {function} [callback] - At the end of each node animation call this function for each node
    //      * @returns function - Chart, allowing chaining of commands
    //      */
    //     function chartRemove(callback) {
    //         chartSVG.selectAll("text")
    //         .style("opacity",1)
    //         .transition()
    //         .duration(500)
    //         .style("opacity", "0")
    //         .remove();	
    //         if (!arguments.length) {	
    //             chartSVG.selectAll("g")
    //             .style("opacity",1)
    //             .transition()
    //             .duration(500)
    //             .style("opacity", "0")
    //             .remove();		
    //         }
    //         else {			
    //             chartSVG.selectAll("g")
    //             .style("opacity",1)
    //             .duration(500)
    //             .style("opacity", "0")
    //             .remove()
    //             .on("end", callback);
    //         }
    //         return chart;
    //     }

    //     return chart;
    // }

    // createBubbleChart(error, countries, continentNames) {
    //     console.log(countries, 'COUNTRIES');
    //     var populations = countries.map(function (country) { return +country.Population; });
    //     var meanPopulation = d3.mean(populations),
    //         populationExtent = d3.extent(populations),
    //         populationScaleX,
    //         populationScaleY;

    //     var continents = d3.set(countries.map(function (country) { return country.ContinentCode; }));
    //     var continentColorScale = d3.scaleOrdinal(d3.schemeCategory10)
    //         .domain(continents.values());

    //     var width = 1200,
    //         height = 800;
    //     var svg,
    //         circles,
    //         circleSize = { min: 10, max: 80 };
    //     var circleRadiusScale = d3.scaleSqrt()
    //         .domain(populationExtent)
    //         .range([circleSize.min, circleSize.max]);

    //     var forces,
    //         forceSimulation;

    //     createSVG();
    //     toggleContinentKey(!flagFill());
    //     createCircles();
    //     createForces();
    //     createForceSimulation();
    //     addFlagDefinitions();
    //     addFillListener();
    //     addGroupingListeners();

    //     function createSVG() {
    //         svg = d3.select("#bubble-chart")
    //             .append("svg")
    //             .attr("width", width)
    //             .attr("height", height);
    //     }

    //     function toggleContinentKey(showContinentKey) {
    //         var keyElementWidth = 150,
    //             keyElementHeight = 30;
    //         var onScreenYOffset = keyElementHeight * 1.5,
    //             offScreenYOffset = 100;

    //         if (d3.select(".continent-key").empty()) {
    //             createContinentKey();
    //         }
    //         var continentKey = d3.select(".continent-key");

    //         if (showContinentKey) {
    //             translateContinentKey("translate(0," + (height - onScreenYOffset) + ")");
    //         } else {
    //             translateContinentKey("translate(0," + (height + offScreenYOffset) + ")");
    //         }

    //         function createContinentKey() {
    //             var keyWidth = keyElementWidth * continents.values().length;
    //             var continentKeyScale = d3.scaleBand()
    //                 .domain(continents.values())
    //                 .range([(width - keyWidth) / 2, (width + keyWidth) / 2]);

    //             svg.append("g")
    //                 .attr("class", "continent-key")
    //                 .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
    //                 .selectAll("g")
    //                 .data(continents.values())
    //                 .enter()
    //                 .append("g")
    //                 .attr("class", "continent-key-element");

    //             d3.selectAll("g.continent-key-element")
    //                 .append("rect")
    //                 .attr("width", keyElementWidth)
    //                 .attr("height", keyElementHeight)
    //                 .attr("x", function (d) { return continentKeyScale(d); })
    //                 .attr("fill", function (d) { return continentColorScale(d); });

    //             d3.selectAll("g.continent-key-element")
    //                 .append("text")
    //                 .attr("text-anchor", "middle")
    //                 .attr("x", function (d) { return continentKeyScale(d) + keyElementWidth / 2; })
    //                 .text(function (d) { return continentNames[d]; });

    //             // The text BBox has non-zero values only after rendering
    //             d3.selectAll("g.continent-key-element text")
    //                 .attr("y", function (d) {
    //                     var textHeight = this.getBBox().height;
    //                     // The BBox.height property includes some extra height we need to remove
    //                     var unneededTextHeight = 4;
    //                     return ((keyElementHeight + textHeight) / 2) - unneededTextHeight;
    //                 });
    //         }

    //         function translateContinentKey(translation) {
    //             continentKey
    //                 .transition()
    //                 .duration(500)
    //                 .attr("transform", translation);
    //         }
    //     }

    //     function flagFill() {
    //         return isChecked("#flags");
    //     }

    //     function isChecked(elementID) {
    //         return d3.select(elementID).property("checked");
    //     }

    //     function createCircles() {
    //         var formatPopulation = d3.format(",");
    //         circles = svg.selectAll("circle")
    //             .data(countries)
    //             .enter()
    //             .append("circle")
    //             .attr("r", function (d) { return circleRadiusScale(d.Population); })
    //             .on("mouseover", function (d) {
    //                 updateCountryInfo(d);
    //             })
    //             .on("mouseout", function (d) {
    //                 updateCountryInfo();
    //             });
    //         updateCircles();

    //         function updateCountryInfo(country) {
    //             var info = "";
    //             if (country) {
    //                 info = [country.CountryName, formatPopulation(country.Population)].join(": ");
    //             }
    //             d3.select("#country-info").html(info);
    //         }
    //     }

    //     function updateCircles() {
    //         circles
    //             .attr("fill", function (d) {
    //                 return flagFill() ? "url(#" + d.CountryCode + ")" : continentColorScale(d.ContinentCode);
    //             });
    //     }

    //     function createForces() {
    //         var forceStrength = 0.05;

    //         forces = {
    //             combine: createCombineForces(),
    //             countryCenters: createCountryCenterForces(),
    //             continent: createContinentForces(),
    //             population: createPopulationForces()
    //         };

    //         function createCombineForces() {
    //             return {
    //                 x: d3.forceX(width / 2).strength(forceStrength),
    //                 y: d3.forceY(height / 2).strength(forceStrength)
    //             };
    //         }

    //         function createCountryCenterForces() {
    //             var projectionStretchY = 0.25,
    //                 projectionMargin = circleSize.max,
    //                 projection = d3.geoEquirectangular()
    //                     .scale((width / 2 - projectionMargin) / Math.PI)
    //                     .translate([width / 2, height * (1 - projectionStretchY) / 2]);

    //             return {
    //                 x: d3.forceX(function (d) {
    //                     return projection([d.CenterLongitude, d.CenterLatitude])[0];
    //                 }).strength(forceStrength),
    //                 y: d3.forceY(function (d) {
    //                     return projection([d.CenterLongitude, d.CenterLatitude])[1] * (1 + projectionStretchY);
    //                 }).strength(forceStrength)
    //             };
    //         }

    //         function createContinentForces() {
    //             return {
    //                 x: d3.forceX(continentForceX).strength(forceStrength),
    //                 y: d3.forceY(continentForceY).strength(forceStrength)
    //             };

    //             function continentForceX(d) {
    //                 if (d.ContinentCode === "EC") {
    //                     return left(width);
    //                 } else if (d.ContinentCode === "CO") {
    //                     return left(width);
    //                 } else if (d.ContinentCode === "LO") {
    //                     return right(width);
    //                 } else if (d.ContinentCode === "EC" || d.ContinentCode === "LO") {
    //                     return right(width);
    //                 }
    //                 return center(width);
    //             }

    //             function continentForceY(d) {
    //                 if (d.ContinentCode === "EC") {
    //                     return top(height);
    //                 } else if (d.ContinentCode === "CO") {
    //                     return bottom(height);
    //                 } else if (d.ContinentCode === "LO") {
    //                     return top(height);
    //                 } else if (d.ContinentCode === "EC" || d.ContinentCode === "LO") {
    //                     return bottom(height);
    //                 }
    //                 return center(height);
    //             }

    //             function left(dimension) { return dimension / 4; }
    //             function center(dimension) { return dimension / 2; }
    //             function right(dimension) { return dimension / 4 * 3; }
    //             function top(dimension) { return dimension / 4; }
    //             function bottom(dimension) { return dimension / 4 * 3; }
    //         }

    //         function createPopulationForces() {
    //             var continentNamesDomain = continents.values().map(function (continentCode) {
    //                 return continentNames[continentCode];
    //             });
    //             var scaledPopulationMargin = circleSize.max;

    //             populationScaleX = d3.scaleBand()
    //                 .domain(continentNamesDomain)
    //                 .range([scaledPopulationMargin, width - scaledPopulationMargin * 2]);
    //             populationScaleY = d3.scaleLog()
    //                 .domain(populationExtent)
    //                 .range([height - scaledPopulationMargin, scaledPopulationMargin * 2]);

    //             var centerCirclesInScaleBandOffset = populationScaleX.bandwidth() / 2;
    //             return {
    //                 x: d3.forceX(function (d) {
    //                     return populationScaleX(continentNames[d.ContinentCode]) + centerCirclesInScaleBandOffset;
    //                 }).strength(forceStrength),
    //                 y: d3.forceY(function (d) {
    //                     return populationScaleY(d.Population);
    //                 }).strength(forceStrength)
    //             };
    //         }

    //     }

    //     function createForceSimulation() {
    //         forceSimulation = d3.forceSimulation()
    //             .force("x", forces.combine.x)
    //             .force("y", forces.combine.y)
    //             .force("collide", d3.forceCollide(forceCollide));
    //         forceSimulation.nodes(countries)
    //             .on("tick", function () {
    //                 circles
    //                     .attr("cx", function (d) { return d.x; })
    //                     .attr("cy", function (d) { return d.y; });
    //             });
    //     }

    //     function forceCollide(d) {
    //         return countryCenterGrouping() || populationGrouping() ? 0 : circleRadiusScale(d.Population) + 1;
    //     }

    //     function countryCenterGrouping() {
    //         return isChecked("#country-centers");
    //     }

    //     function populationGrouping() {
    //         return isChecked("#population");
    //     }

    //     function addFlagDefinitions() {
    //         var defs = svg.append("defs");
    //         defs.selectAll(".flag")
    //             .data(countries)
    //             .enter()
    //             .append("pattern")
    //             .attr("id", function (d) { return d.CountryCode; })
    //             .attr("class", "flag")
    //             .attr("width", "100%")
    //             .attr("height", "100%")
    //             .attr("patternContentUnits", "objectBoundingBox")
    //             .append("image")
    //             .attr("width", 1)
    //             .attr("height", 1)
    //             // xMidYMid: center the image in the circle
    //             // slice: scale the image to fill the circle
    //             .attr("preserveAspectRatio", "xMidYMid slice")
    //             .attr("xlink:href", function (d) {
    //                 return "/flags/" + d.CountryCode + ".svg";
    //             });
    //     }

    //     function addFillListener() {
    //         d3.selectAll('input[name="fill"]')
    //             .on("change", function () {
    //                 toggleContinentKey(!flagFill() && !populationGrouping());
    //                 updateCircles();
    //             });
    //     }

    //     function addGroupingListeners() {
    //         addListener("#combine", forces.combine);
    //         addListener("#country-centers", forces.countryCenters);
    //         addListener("#continents", forces.continent);
    //         addListener("#population", forces.population);

    //         function addListener(selector, forces) {
    //             d3.select(selector).on("click", function () {
    //                 updateForces(forces);
    //                 toggleContinentKey(!flagFill() && !populationGrouping());
    //                 togglePopulationAxes(populationGrouping());
    //             });
    //         }

    //         function updateForces(forces) {
    //             forceSimulation
    //                 .force("x", forces.x)
    //                 .force("y", forces.y)
    //                 .force("collide", d3.forceCollide(forceCollide))
    //                 .alphaTarget(0.5)
    //                 .restart();
    //         }

    //         function togglePopulationAxes(showAxes) {
    //             var onScreenXOffset = 40,
    //                 offScreenXOffset = -40;
    //             var onScreenYOffset = 40,
    //                 offScreenYOffset = 100;

    //             if (d3.select(".x-axis").empty()) {
    //                 createAxes();
    //             }
    //             var xAxis = d3.select(".x-axis"),
    //                 yAxis = d3.select(".y-axis");

    //             if (showAxes) {
    //                 translateAxis(xAxis, "translate(0," + (height - onScreenYOffset) + ")");
    //                 translateAxis(yAxis, "translate(" + onScreenXOffset + ",0)");
    //             } else {
    //                 translateAxis(xAxis, "translate(0," + (height + offScreenYOffset) + ")");
    //                 translateAxis(yAxis, "translate(" + offScreenXOffset + ",0)");
    //             }

    //             function createAxes() {
    //                 var numberOfTicks = 10,
    //                     tickFormat = ".0s";

    //                 var xAxis = d3.axisBottom(populationScaleX)
    //                     .ticks(numberOfTicks, tickFormat);

    //                 svg.append("g")
    //                     .attr("class", "x-axis")
    //                     .attr("transform", "translate(0," + (height + offScreenYOffset) + ")")
    //                     .call(xAxis)
    //                     .selectAll(".tick text")
    //                     .attr("font-size", "16px");

    //                 var yAxis = d3.axisLeft(populationScaleY)
    //                     .ticks(numberOfTicks, tickFormat);
    //                 svg.append("g")
    //                     .attr("class", "y-axis")
    //                     .attr("transform", "translate(" + offScreenXOffset + ",0)")
    //                     .call(yAxis);
    //             }

    //             function translateAxis(axis, translation) {
    //                 axis
    //                     .transition()
    //                     .duration(500)
    //                     .attr("transform", translation);
    //             }
    //         }
    //     }

    // }

    componentDidMount() {
        console.log(sankeyData, 'SANKEY');
        let self = this;
        // self.createBubbleChart('', countryData, continentData); // for tumor chart


        // d3.csv('medium_january.csv', function(error, data) {
        //     if (error) {
        //         console.error('Error getting or parsing the data.');
        //         throw error;
        //     }
        // var chart = this.bubbleChartFc().width(600).height(400);
        // selection.datum() returns the bound datum for the first element in the selection and doesn't join the specified array of data with the selected elements
        // d3.select('#chart').datum(fcData).call(chart);
        //   });


        $(document).ready(function () {
            $('.multiselect').multiselect({
                buttonWidth: 'auto',
                numberDisplayed: 15,
                enableHTML: true,
                optionLabel: function (element) {
                    return '<img src="' + $(element).attr('data-img') + '"> ' + $(element).text();
                },
                onChange: function (element, checked) {
                    $("ul.multiselect-container").find("input[type=checkbox]").each(function () {
                        var valueAttr = $(this).attr('value');
                        if (element.attr('value') == valueAttr) {
                            var checkParent = $(this).parent().parent().parent().hasClass('active');
                            // if (checkParent == false) {
                            //     $(this).removeAttr('disabled')
                            // }else{
                            //     $(this).attr('disabled','disabled')
                            // }
                        }
                    });
                }
            });
        });
        document.getElementById('selectedToDate').value = this.state.selectedToDate
        document.getElementById('selectedFromDate').value = this.state.selectedFromDate
        //  for (let req = 0; req <= 4;) {
        //     console.log(req);
        this.getGraphData()
        // }
        //  }
        window.scrollTo(0, 0);
        this.props.actions.generalProcess(constants.getTypeData,
            requestCreator.createTypeDataRequest([
                'dc-hsCodeFilter',
            ]));

        this.props.actions.generalProcess(constants.orgList, { action: "entityList", page: { currentPageNo: 1, pageSize: 100 } });
        // this.props.actions.generalProcess(constants.getDashboardData, {
        //     action: 'getDashboardData',
        //     searchCriteria: {
        //         startDate: this.state.fromDateWrkBrd,
        //         endDate: this.state.toDateWrkBrd,
        //         ecommerce: this.state.ecommerce
        //     }
        // })
        // interval = setInterval(() => {
        //     this.props.actions.generalProcess(constants.getDashboardData, {
        //         action: 'getDashboardData',
        //         searchCriteria: {
        //             startDate: this.state.fromDateWrkBrd,
        //             endDate: this.state.toDateWrkBrd,
        //             ecommerce: this.state.ecommerce,
        //             trackCourier: this.state.tracking.courier,
        //             trackEcommerce: this.state.tracking.ecommerce
        //         }
        //     })
        // }, 10000);
    }

    graphRequestBody(widget) {
        let obj = {
            "body": {
                "widgetId": `widget${widget}`,
                "valueType": "byCount",
                "outputWidgetType": "pieChart",
                "period": {
                    "year": this.state.selectedYears,
                    "quarter": this.state.selectedQuarters,
                    "month": this.state.selectedMonths,
                    "fromDate": this.state.fromDate,
                    "toDate": this.state.toDate
                },
                "zone": {
                    "freezone": {
                        "freezoneAll": false,
                        "freezones": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "warehouse": {
                        "warehouseAll": false,
                        "warehouses": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "isMainland": false
                },
                "providers": {
                    "providerAll": true,
                    "eCommmerce": {
                        "eCommerceAll": false,
                        "eCommerce": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "logistics": {
                        "logisticsAll": false,
                        "logistics": [
                            "",
                            "",
                            ""
                        ]
                    },
                    "courier": {
                        "courierAll": false,
                        "couriers": [
                            "",
                            "",
                            ""
                        ]
                    }
                }
            }
        }
    }

    async getGraphData() {
        // for (let req = 0; req <=2;) {
        //     console.log(req);
        // }
        let array = [...this.state.widgetIds];
        array.filter(async x => {
            console.log(x);
            let obj = {
                "body": {
                    "widgetId": `widget${x}`,
                    "valueType": "", // byCount or byAmount
                    "outputWidgetType": "", // pieChart. 2Value-Bar Horizontal
                    "period": {
                        "year": this.state.selectedYears,
                        "quarter": this.state.selectedQuarters,
                        "month": this.state.selectedMonths,
                        "fromDate": this.state.selectedFromDate,
                        "toDate": this.state.selectedToDate
                    },
                    "zone": {
                        "freezone": {
                            "freezoneAll": false,
                            "freezones": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "warehouse": {
                            "warehouseAll": false,
                            "warehouses": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "isMainland": false
                    },
                    "providers": {
                        "providerAll": true,
                        "eCommmerce": {
                            "eCommerceAll": false,
                            "eCommerce": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "logistics": {
                            "logisticsAll": false,
                            "logistics": [
                                "",
                                "",
                                ""
                            ]
                        },
                        "courier": {
                            "courierAll": false,
                            "couriers": [
                                "",
                                "",
                                ""
                            ]
                        }
                    }
                }
            }
            await this.props.actions.generalAjxProcess(constants.getGraphDashboardData, obj).then(res => {
                // req++
            });
        })
        //  req++
        // if (req == 1) {
    }

    async getSingleGraphData(id, searchCriteria) {

        let obj = {
            "body": {
                "widgetId": id == 1 ? `widget${id}-betweenDates` : `widget${id}`,
                "valueType": "", // byCount or byAmount
                "outputWidgetType": "", // pieChart. 2Value-Bar Horizontal
                "searchCritera": searchCriteria
                // "period": {
                //     "year": this.state.selectedYears,
                //     "quarter": this.state.selectedQuarters,
                //     "month": this.state.selectedMonths,
                //     "fromDate": this.state.selectedFromDate,
                //     "toDate": this.state.selectedToDate
                // },
                // "zone": {
                //     "freezone": {
                //         "freezoneAll": false,
                //         "freezones": [
                //             "",
                //             "",
                //             ""
                //         ]
                //     },
                //     "warehouse": {
                //         "warehouseAll": false,
                //         "warehouses": [
                //             "",
                //             "",
                //             ""
                //         ]
                //     },
                //     "isMainland": false
                // },
                // "providers": {
                //     "providerAll": true,
                //     "eCommmerce": {
                //         "eCommerceAll": false,
                //         "eCommerce": [
                //             "",
                //             "",
                //             ""
                //         ]
                //     },
                //     "logistics": {
                //         "logisticsAll": false,
                //         "logistics": [
                //             "",
                //             "",
                //             ""
                //         ]
                //     },
                //     "courier": {
                //         "courierAll": false,
                //         "couriers": [
                //             "",
                //             "",
                //             ""
                //         ]
                //     }
                // }
            }
        }
        await this.props.actions.generalAjxProcess(constants.getGraphDashboardData, obj).then(res => {
            // req++
        });
        //  req++
        // if (req == 1) {
    }

    onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
    }

    graphCreator(graphProps) {
        console.log(graphProps, 'GP');
        // dummyProps.widgetData.map(widget => {
        if (graphProps.widgetData.widgetType == 'pieChart') {
            let labels = [];
            let values = [];

            graphProps.widgetData.graphData.data.forEach(data => {
                // console.log(data);
                labels.push(data.label)
                values.push(data.count)
            })
            let chart = <PieChart onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={labels} data={values} height={120}
                // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
                backgroundColor={['#9e9e9e', '#ae8b4b', '#2196f3']} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }

        if (graphProps.widgetData.widgetType == '2ValueBar-Horizontal') {
            let x = [];
            let y = [];
            // let z = [];
            let dataArray = [];
            let minRange = 0;
            let maxRange = 0;
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    // z.push(data.zIndex.value)
                })
            } else {

                let sortedValueArray = graphProps.widgetData.graphData.axisData.yAxis.value.sort((a, b) => a - b);
                maxRange = sortedValueArray[sortedValueArray.length - 1]
                graphProps.widgetData.graphData.data.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    let obj = {
                        entityName: data.xIndex.value,
                        value: data.yIndex.value,
                    }
                    dataArray.push(obj);
                })
                this.setState({
                    dataArray
                })
            }

            console.log(x);
            console.log(y);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <HorizontalBarChartNew minRange={0} maxRange={maxRange} stepSize={5} height={120}
                data={dataArray || []} labels={graphProps.widgetData.widgetId == 'widget6' ? ['Countries'] : ['Companies']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} backgroundColors={['#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '2ValueBar-Vertical') {
            let x = [];
            let y = [];
            // let z = [];
            let dataArray = [];
            let minRange = 0;
            let maxRange = 0;
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    // z.push(data.zIndex.value)
                })
            } else {

                let sortedValueArray = graphProps.widgetData.graphData.axisData.yAxis.value.sort((a, b) => a - b);
                maxRange = sortedValueArray[sortedValueArray.length - 1]
                graphProps.widgetData.graphData.data.forEach((data, index) => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    let obj = {
                        entityName: data.xIndex.value,
                        // ['value'+index]: data.yIndex.value,
                        value: data.yIndex.value,
                    }
                    dataArray.push(obj);
                })
                this.setState({
                    dataArray
                })
            }

            console.log(x, '2VAlueX');
            console.log(y, '2ValueY');
            console.log(dataArray, 'DATAARRRRRRR');
            let valuesArray = [];
            // dataArray.map((x, index) => { 
            //     valuesArray.push(Object.keys(x)[1])
            // }
            //     );
            // console.log(valuesArray, 'VAAA');
            let chart = <VerticalBarChart data={dataArray} labels={['HS']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={["value"]} backgroundColors={['#2196f3']}
                height={120} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
            // <HorizontalBarChartNew minRange={10} maxRange={maxRange} stepSize={5} height={180} 
            //     data={dataArray || []} labels={['Companies']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} backgroundColors={['#ae8b4b', '#2196f3']}
            //     options={{
            //         responsive: true,
            //         maintainAspectRatio: true
            //     }} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueLine-Vertical') {
            let lineGraphData = [...graphProps.widgetData.graphData.data];
            let dataPoints = [];
            let convertedGraphData = [];
            // let name;
            lineGraphData.map((data, index) => {
                let dpObj = {
                    year: data.zIndex.value,
                    label: data.xIndex.value,
                    value: +data.yIndex.value
                }
                // name = data.bankCode
                dataPoints.push(dpObj)
            })

            graphProps.widgetData.graphData.axisData.zAxis.value.forEach((year, index) => {
                let dataPointsNew = [];
                dataPoints.filter(data => {
                    if (year == data.year) {
                        dataPointsNew.push(data);
                    }
                })
                let obj = {
                    type: "line",
                    name: year,
                    // color: "#" + ((1 << 24) * Math.random() | 0).toString(16),
                    color: index == 0 ? '#2196f3' : '#f58709',
                    showInLegend: true,
                    dataPoints: dataPointsNew,
                }
                convertedGraphData.push(obj);
            })
            this.setState({
                dataArray: convertedGraphData
            })

            // console.log(x);
            // console.log(y);
            // console.log(z);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <MultiLineChart dataPoints={convertedGraphData} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueBar-Horizontal') {
            let x = [];
            let y = [];
            let z = [];
            let sortedValueArray = [];
            let maxRange = 0;
            let dataArray = [];
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    z.push(data.zIndex.value)
                })
            } else {
                sortedValueArray = graphProps.widgetData.graphData.axisData.yAxis.value.sort((a, b) => a - b);
                maxRange = sortedValueArray[sortedValueArray.length - 1];
                graphProps.widgetData.graphData.data.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    if (graphProps.widgetData.widgetId == 'widget1') {
                        if (data.zIndex && !z.includes(data.zIndex.value)) {
                            z.push(data.zIndex.value)
                        }
                        if (data.zIndex && data.zIndex.value == z[0]) {
                            let obj = {
                                entityName: data.xIndex.value,
                                value: data.yIndex.value,
                                type: data.zIndex.value,
                                color: '#f58709'
                            }
                            dataArray.push(obj);
                        } else if (data.zIndex.value == z[1]) {
                            let obj = {
                                entityName: data.xIndex.value,
                                value: data.yIndex.value,
                                type: data.zIndex.value,
                                color: '#ae8b4b'
                            }
                            dataArray.push(obj);
                        } else {
                            let obj = {
                                entityName: data.xIndex.value,
                                value: data.yIndex.value,
                                type: data.zIndex.value,
                                color: '#2196f3'
                            }

                            dataArray.push(obj);
                        }

                    } else {

                        if (data.zIndex && !z.includes(data.zIndex.value)) {
                            z.push(data.zIndex.value)
                        }
                        if (data.zIndex && data.zIndex.value == z[0]) {
                            let obj = {
                                entityName: data.xIndex.value,
                                value1: data.yIndex.value,
                                type: data.zIndex.value,
                                color: '#f58709'
                            }
                            dataArray.push(obj);
                        } else if (data.zIndex.value == z[1]) {
                            let obj = {
                                entityName: data.xIndex.value,
                                value2: data.yIndex.value,
                                type: data.zIndex.value,
                                color: '#ae8b4b'
                            }
                            dataArray.push(obj);
                        } else {
                            let obj = {
                                entityName: data.xIndex.value,
                                value3: data.yIndex.value,
                                type: data.zIndex.value,
                                color: '#2196f3'
                            }

                            dataArray.push(obj);
                        }
                    }

                })
                this.setState({
                    dataArray
                })
            }

            console.log(x, 'X');
            console.log(y, 'Y');
            console.log(z, 'Z');

            let unique = z.filter(this.onlyUnique);
            console.log(unique, 'UNIQUE')
            console.log(dataArray, 'DATAARRRRRRR - multiple color bar chart');
            let sortedColors = dataArray.map(x => x.color);
            let sortedLabels = dataArray.map(x => x.type);
            let chart;
            if (graphProps.widgetData.widgetId == 'widget1') {
                chart = <HorizontalBarChartWithDifferentColors minRange={sortedValueArray[0]} maxRange={maxRange} stepSize={maxRange / 5} height={120}
                    data={dataArray || []} labels={unique} sortedLabels={sortedLabels} sortedColors={sortedColors} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} separateColors={true} backgroundColors={['#f58709', '#ae8b4b', '#2196f3']}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true
                    }} />
            } else {
                chart = <HorizontalBarChartNew minRange={sortedValueArray[0]} maxRange={maxRange} stepSize={maxRange / 5} height={120}
                    data={dataArray || []} labels={unique} stack="multiple" dataLabelsAttribute="entityName" separateColors={false} dataValuesAttributes={['value1', 'value2', 'value3']} backgroundColors={['#f58709', '#ae8b4b', '#2196f3']}
                    options={{
                        responsive: true,
                        maintainAspectRatio: true
                    }} />
            }

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueBar-Vertical') {
            let x = [];
            let y = [];
            let z = [];
            let dataArray = [];
            if (graphProps.widgetData.widgetId.toggle == 'value') {
                graphProps.widgetData.graphData.byValue.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    z.push(data.zIndex.value)
                })
            } else {
                graphProps.widgetData.graphData.data.forEach(data => {
                    // console.log(data);
                    x.push(data.xIndex.value)
                    y.push(data.yIndex.value)
                    if (data.zIndex && !z.includes(data.zIndex.value)) {
                        z.push(data.zIndex.value)
                    }
                    if (data.zIndex && data.zIndex.value == z[0]) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value1: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    } else if (data.zIndex) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value2: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    }

                })
                this.setState({
                    dataArray
                })
            }

            console.log(x);
            console.log(y);
            console.log(z);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={180}
                data={dataArray || []} separateColors={false} labels={z} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2']} backgroundColors={['#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == 'flagChart') {
            // this.createBubbleChart('', graphProps.widgetData.graphData.data, continentData);

            let chart = <CountryBubbleChart countryData={graphProps.widgetData.graphData.data} continents={continentData} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == 'sankeyChart') {
            // this.createBubbleChart('', graphProps.widgetData.graphData.data, continentData);

            let chart = <SankeyChart data={graphProps.widgetData.graphData} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
        if (graphProps.widgetData.widgetType == '3ValueBubble-Vertical') {

            let graphDataArray = [...graphProps.widgetData.graphData.data]
            let bubbleArray = [];
            graphDataArray.map(data => {
                let obj = {
                    title: data.xIndex.value,
                    category: data.zIndex.value,
                    views: data.yIndex.value
                }
                bubbleArray.push(obj)
            })
            console.log(bubbleArray, "BUBBLE ARRAY");
            let chart = <BubbleChart data={bubbleArray} useLabels />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = widgetIdNumber.length == 8 ? 'widget' + widgetIdNumber[widgetIdNumber.length - 2] + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading' : 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
            this.setState({
                [graphProps.widgetData.widgetId]: chart,
                [stateLabel]: false
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'NextProps');

        Object.keys(nextProps).map((key, index) => {
            if (key.startsWith('widget') && Object.keys(nextProps[key]).length != 0) {
                this.graphCreator(nextProps[key]);
            }
        })

        if (jsonData.dashboardData && jsonData.dashboardData.barGraphAmountData) {
            this.setState({
                isLoading: false
            })
            let bankNames = []
            jsonData.dashboardData.barGraphAmountData.map(bank => {
                bankNames.push(bank.bankCode)
            })
            this.setState({
                bankNames,
                dashboardData: {
                    barGraphAmountData: jsonData.dashboardData.barGraphAmountData,
                    barGraphSubmissionData: jsonData.dashboardData.barGraphSubmissionData
                }
            })
        }

        if (jsonData.dashboardData) {
            this.setState({
                firstTile: jsonData.dashboardData.firstTile,
                secondTile: jsonData.dashboardData.secondTile,
                thirdTile: jsonData.dashboardData.thirdTile,
                fourthTile: jsonData.dashboardData.fourthTile,
            })
        }

        if (jsonData.dashboardData && jsonData.dashboardData.lineGraphData && this.state.bankNames && this.state.bankNames.length > 0) {
            this.setState({
                isLoading: false
            })
            let lineGraphData = [...jsonData.dashboardData.lineGraphData];
            let dataPoints = [];
            let convertedGraphData = [];
            // let name;
            lineGraphData.map((data, index) => {
                let dpObj = {
                    bankCode: data.bankCode,
                    label: moment(data.date.split('T')[0]).format('Do') + ' ' + moment(data.date.split('T')[0]).format('MMMM'),
                    y: +data.count
                }
                // name = data.bankCode
                dataPoints.push(dpObj)
            })

            this.state.bankNames.forEach((bank, index) => {
                let dataPointsNew = [];
                dataPoints.filter(data => {
                    if (bank == data.bankCode) {
                        dataPointsNew.push(data);
                    }
                })
                // console.log(this.getBankColors(bank))
                let obj = {
                    type: "line",
                    name: bank,
                    // color: "#" + ((1 << 24) * Math.random() | 0).toString(16),
                    color: this.getBankColors(bank)[0].color,
                    showInLegend: true,
                    dataPoints: dataPointsNew,
                }
                convertedGraphData.push(obj);
            })
            // console.log(convertedGraphData, "CGGGGG");
            this.setState({
                convertedGraphData
            })
        }
        if (jsonData.dashboardData && jsonData.dashboardData.pieChartData) {
            let financedCount = 0;
            let rejectedCount = 0;
            let purgedCount = 0;
            this.setState({
                isLoading: false
            })
            jsonData.dashboardData.pieChartData.map(data => {
                if (data.bankStatus == 'FINANCED') {
                    financedCount = + data.count;
                }
                if (data.bankStatus == 'REJECTED') {
                    rejectedCount = + data.count;
                }
                if (data.bankStatus == 'PURGED') {
                    purgedCount = + data.count;
                }

            })
            let calculatedScore = financedCount + rejectedCount + purgedCount;
            let financedRemainder = financedCount / calculatedScore;
            let rejectedRemainder = rejectedCount / calculatedScore;
            let purgedRemainder = purgedCount / calculatedScore;

            let financedPercentage = Math.round(financedRemainder * 100);
            let rejectedPercentage = Math.round(rejectedRemainder * 100);
            let purgedPercentage = Math.round(purgedRemainder * 100);

            this.setState({
                financedPercentage,
                rejectedPercentage,
                purgedPercentage
            })
        }

        if (jsonData.dashboardData != null && jsonData.dashboardData.ruleData.length == 0) {
            this.setState({
                ruleData: []
            })
        } else if (jsonData.dashboardData != null) {
            this.setState({
                ruleData: jsonData.dashboardData.ruleData
            })
        }

    }


    ActionHandlers({ actionName, index }) {
        switch (actionName) {
            case "Delete":
                let result = confirm("Are you you want to delete?");
                if (result) {
                    if (index > -1) {
                        let a = this.state.relationshipData;
                        a.splice(index, 1);
                        this.setState({ relationshipData: a });
                    }
                }
                break;
            default:
                break;
        }
    }

    getRuleHitData() {

        let orderTracking = _.get(this.state, 'getDashboardData.orderTracking', undefined);

        let data = {
            labels: ["Finalized", "HAWB Created", "Export Cleared", "Delivered", "Return By Customer", "Undelivered", "Import Cleared", "Partial Return", "Full Return"],
            datasets: [
                {
                    label: '',
                    fill: false,
                    backgroundColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    borderColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    borderWidth: 1,
                    hoverBackgroundColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    hoverBorderColor: ['#8DC63F', '#1DB2F5', '#97C95C', '#FFC720', '#EB3573', '#A63DB8', '#BD1550', '#1DB2F5', '#FFC720'],
                    data: orderTracking ? [orderTracking.FINALIZED, orderTracking.HAWBCREATED, orderTracking.EXPORTCLEARED, orderTracking.DELIVERED, orderTracking.RETURNBYCUSTOMER, orderTracking.UNDELIVERED, orderTracking.IMPORTCLEARED, orderTracking.PARTIALRETURN, orderTracking.FULLRETURN] : []
                }
            ]
        };
        return data
    }

    dateChangeWorkboard(toDate, fromDate) {
        this.setState({
            fromDateWrkBrd: fromDate,
            toDateWrkBrd: toDate
        });

        // console.log('to check the case', fromDate, toDate)
        this.props.actions.generalProcess(constants.getDashboardData, {
            action: 'getDashboardData',
            searchCriteria: {
                startDate: fromDate,
                endDate: toDate,
                trackCourier: this.state.tracking.courier,
                trackEcommerce: this.state.tracking.ecommerce
            }
        })
    }

    sendCall = (topHS) => {
        this.setState({
            topHS: { option: topHS },
            hsTitile: topHS
        });
        if (topHS && topHS === 'E-Commerce Company') {
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: moment(this.state.fromDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    endDate: moment(this.state.toDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    ecommerce: '001',
                    trackCourier: this.state.tracking.courier,
                    trackEcommerce: this.state.tracking.ecommerce
                }
            })
            this.setState({
                ecommerce: '001'
            })
        }
        else if (topHS && topHS === 'Destination Country') {
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: moment(this.state.fromDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    endDate: moment(this.state.toDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    ecommerce: '002',
                    trackCourier: this.state.tracking.courier,
                    trackEcommerce: this.state.tracking.ecommerce
                }
            })
            this.setState({
                ecommerce: '002'
            })
        } else if (topHS && topHS === 'HS Code') {
            this.props.actions.generalProcess(constants.getDashboardData, {
                action: 'getDashboardData',
                searchCriteria: {
                    startDate: moment(this.state.fromDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    endDate: moment(this.state.toDateWrkBrd, 'YYYY-MM-DD').startOf('day'),
                    ecommerce: '003',
                    trackCourier: this.state.tracking.courier,
                    trackEcommerce: this.state.tracking.ecommerce
                }
            })
            this.setState({
                ecommerce: '003'
            })
        }
    }

    componentWillUnmount() {
        // console.log('interval', interval);
        clearInterval(interval)
        // console.log('interval', interval);

    }

    applyFilter() {
        this.props.actions.generalProcess(constants.getDashboardData, {
            action: 'getDashboardData',
            searchCriteria: {
                startDate: this.state.fromDateWrkBrd,
                endDate: this.state.toDateWrkBrd,
                ecommerce: this.state.ecommerce,
                trackCourier: this.state.tracking.courier,
                trackEcommerce: this.state.tracking.ecommerce
            }
        })
    }

    clearFilter() {
        this.setState({
            tracking: {
                courier: "",
                ecommerce: ""
            }
        })
    }

    getBankColors(name) {
        return bankColors.filter(bank => {
            if (name == bank.name) {
                // console.log(bank.color)
                return bank.color
            }
        })
    }

    selectYear(value) {
        console.log(value);
        let array = [...this.state.selectedYears];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedYears: array
        })

    }

    selectQuarters(value) {
        console.log(value);
        let array = [...this.state.selectedQuarters];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedQuarters: array
        })

    }
    selectMonths(value) {
        console.log(value);
        let array = [...this.state.selectedMonths];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedMonths: array
        })

    }

    selectZone(value) {
        let array = [...this.state.selectedZone];
        if (array.find((x, index) => value == x)) {
            array.splice(indexOf(value), 1)
        } else {
            array.push(value);
        }
        console.log(array);
        this.setState({
            selectedZone: array
        })

    }

    refreshSingleWidget(widgetId) {
        let stateLabel = 'widget' + widgetId + 'isLoading';
        this.setState({
            [stateLabel]: true,
        })
        let searchCriteria;
        if (widgetId == 'widgetId2') {
            searchCriteria = { filter: { place: 'old', number: 7 } };
        }
        if (widgetId == 'widgetId3') {
            searchCriteria = { filter: { date: '12/2/1994', toDate: '01/10/1994' } };
        }
        if (widgetId == 'widgetId4') {
            searchCriteria = { filter: { some: '12/2/1994', thing: '01/10/1994' } };
        }
        if (widgetId == 'widgetId5') {
            searchCriteria = { body: { key: '12/2/1994', value: '01/10/1994' } };
        }
        this.getSingleGraphData(widgetId, searchCriteria);

    }


    onDragStart = (ev, id) => {
        console.log('dragstart:', id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData("id");

        let tasks = this.state.tasks.filter((task) => {
            if (task.name == id) {
                task.category = cat;
            }
            return task;
        });

        this.setState({
            ...this.state,
            tasks
        });
    }

    render() {
        var tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach((t) => {
            tasks[t.category].push(
                <div key={t.name}
                    onDragStart={(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    style={{ backgroundColor: t.bgcolor }}
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <h2 className="header">DRAG & DROP DEMO</h2>
                <div className="wip"
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => { this.onDrop(e, "wip") }}>
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
                <div className="droppable"
                    onDragOver={(e) => this.onDragOver(e)}
                    onDrop={(e) => this.onDrop(e, "complete")}>
                    <span className="task-header">COMPLETED</span>
                    {tasks.complete}
                </div>


            </div>
        );
    }
}

let dataArray = [];

function mapStateToProps(state, ownProps) {
    return {
        // widgetData: _.get(state.app, 'data.widgetData', []),
        // widgetData: dataArray,
        widget1: _.get(state.app, 'widget1', {}),
        widget2: _.get(state.app, 'widget2', {}),
        widget3: _.get(state.app, 'widget3', {}),
        widget4: _.get(state.app, 'widget4', {}),
        widget5: _.get(state.app, 'widget5', {}),
        widget6: _.get(state.app, 'widget6', {}),
        widget7: _.get(state.app, 'widget7', {}),
        widget8: _.get(state.app, 'widget8', {}),
        widget9: _.get(state.app, 'widget9', {}),
        widget10: _.get(state.app, 'widget10', {}),
        widget11: _.get(state.app, 'widget11', {}),
        widget20: _.get(state.app, 'widget20', {}),
        widget21: _.get(state.app, 'widget21', {}),
        widget22: _.get(state.app, 'widget22', {}),
        //  dataArray.push(state.app.data && Object.keys(state.app.data).length > 0 ? state.app.data.widgetData : []),
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
DynamicDashboardCreator.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(DynamicDashboardCreator);