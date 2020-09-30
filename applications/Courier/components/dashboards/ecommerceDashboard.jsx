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
import countryData from './countries.json';
import companyData from './companies.json';
import fcData from './fc-data.json';
import companyBubbles from './company-data.json';
import sankeyData from './sankey-data.json';
// import { bubbleChartFc } from '../../common/charts/bubble-chart-fc';
import BubbleChart from '../../common/charts/bubbleChart-CSBOX.js';
import SankeyChart from '../../common/charts/d3-sankey-chart.jsx';
import MultiLineChart from '../../common/charts/d3-multiLine-chart.jsx';
import CountryBubbleChart from '../../common/charts/countryBubbleChart.jsx';
// bubbleChartFc

let interval;
class EcommerceDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            widget1isLoading: true,
            widget2isLoading: true,
            widget3isLoading: true,
            widget4isLoading: true,
            widget5isLoading: true,
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

    async getSingleGraphData(id) {

        let obj = {
            "body": {
                "widgetId": id == 1 ? `widget${id}-betweenDates` : `widget${id}`,
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
            let chart = <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={labels} data={values} height={180}
                // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
                backgroundColor={['#9e9e9e', '#ae8b4b', '#2196f3']} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
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
            let chart = <HorizontalBarChartNew minRange={0} maxRange={maxRange} stepSize={5} height={graphProps.widgetData.widgetId == 6 ? 420 : 180} key={Math.random()}
                data={dataArray || []} labels={graphProps.widgetData.widgetId == 'widget6' ? ['Countries'] : ['Companies']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} backgroundColors={['#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
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
            let chart = <VerticalBarChart key={Math.random()} data={dataArray} labels={['HS']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={["value"]} backgroundColors={['#2196f3']}
                height={250} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
            // <HorizontalBarChartNew minRange={10} maxRange={maxRange} stepSize={5} height={180} key={Math.random()}
            //     data={dataArray || []} labels={['Companies']} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value']} backgroundColors={['#ae8b4b', '#2196f3']}
            //     options={{
            //         responsive: true,
            //         maintainAspectRatio: true
            //     }} />
            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
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
            // let x = [];
            // let y = [];
            // let z = [];
            // let dataArray = [];
            // if (graphProps.widgetData.widgetId.toggle == 'value') {
            //     graphProps.widgetData.graphData.byValue.forEach(data => {
            //         // console.log(data);
            //         x.push(data.xIndex.value)
            //         y.push(data.yIndex.value)
            //         z.push(data.zIndex.value)
            //     })
            // } else {
            //     graphProps.widgetData.graphData.data.forEach(data => {
            //         // console.log(data);
            //         x.push(data.xIndex.value)
            //         y.push(data.yIndex.value)
            //         if (data.zIndex && !z.includes(data.zIndex.value)) {
            //             z.push(data.zIndex.value)
            //         }
            //         if (data.zIndex && data.zIndex.value == z[0]) {
            //             let obj = {
            //                 entityName: data.xIndex.value,
            //                 value1: data.yIndex.value,
            //                 type: data.zIndex.value
            //             }
            //             dataArray.push(obj);
            //         } else if (data.zIndex) {
            //             let obj = {
            //                 entityName: data.xIndex.value,
            //                 value2: data.yIndex.value,
            //                 type: data.zIndex.value
            //             }
            //             dataArray.push(obj);
            //         }

            //     })
            // }
            this.setState({
                dataArray: convertedGraphData
            })

            // console.log(x);
            // console.log(y);
            // console.log(z);
            console.log(dataArray, 'DATAARRRRRRR');
            let chart = <MultiLineChart dataPoints={convertedGraphData} />

            this.setState({
                [graphProps.widgetData.widgetId]: chart
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
                    } else if (data.zIndex.value == z[1]) {
                        let obj = {
                            entityName: data.xIndex.value,
                            value2: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
                    } else {
                        let obj = {
                            entityName: data.xIndex.value,
                            value3: data.yIndex.value,
                            type: data.zIndex.value
                        }
                        dataArray.push(obj);
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
            let chart = <HorizontalBarChartNew minRange={sortedValueArray[0]} maxRange={maxRange} stepSize={maxRange / 5} height={300} key={Math.random()}
                data={dataArray || []} labels={unique} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2', 'value3']} backgroundColors={['#f58709', '#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            let widgetIdNumber = graphProps.widgetData.widgetId.split('');
            let stateLabel = 'widget' + widgetIdNumber[widgetIdNumber.length - 1] + 'isLoading';
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
            let chart = <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={180} key={Math.random()}
                data={dataArray || []} labels={z} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2']} backgroundColors={['#ae8b4b', '#2196f3']}
                options={{
                    responsive: true,
                    maintainAspectRatio: true
                }} />

            this.setState({
                [graphProps.widgetData.widgetId]: chart
            })
        }
        if (graphProps.widgetData.widgetType == 'flagChart') {
            // this.createBubbleChart('', graphProps.widgetData.graphData.data, continentData);

            let chart = <CountryBubbleChart countryData={graphProps.widgetData.graphData.data} continents={continentData} />
            //  <div> <div id="controls-graph">
            //     <span style={{ visibility: 'hidden' }}>
            //         <label><input id="combine" type="radio" name="grouping" value="combine" checked />Combine</label>
            //         <label><input id="continents" type="radio" name="grouping" value="continents" />Continents</label>
            //         <label><input id="country-centers" type="radio" name="grouping" value="country-centers" />Country Centers</label>
            //         <label><input id="population" type="radio" name="grouping" value="population" />Population</label>
            //     </span>
            //     <span>
            //         <label><input id="colors" type="radio" name="fill" value="colors" />Colors</label>
            //         <label><input id="flags" type="radio" name="fill" value="flags" checked />Flags</label>
            //     </span>
            // </div>
            //     <div id="country-info"></div>
            //     <div id="bubble-chart"></div>
            // </div>

            this.setState({
                [graphProps.widgetData.widgetId]: chart
            })
        }
        if (graphProps.widgetData.widgetType == 'sankeyChart') {
            // this.createBubbleChart('', graphProps.widgetData.graphData.data, continentData);

            let chart = <SankeyChart data={graphProps.widgetData.graphData} />

            this.setState({
                [graphProps.widgetData.widgetId]: chart
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

            this.setState({
                [graphProps.widgetData.widgetId]: chart
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps, 'NextProps');
        // let dummyProps = {
        //     widgetData: {
        //         "widgetId": "widget1",
        //         "widgetType": "pieChart",
        //         "graphTitle": "Free Zone Wise Transactions",
        //         "graphData": {
        //             "data": [
        //                 {
        //                     "label": "Dubai south",
        //                     "count": 19
        //                 },
        //                 {
        //                     "label": "DAFZA",
        //                     "count": 30
        //                 },
        //                 {
        //                     "label": "JAFZA",
        //                     "count": 51
        //                 }
        //             ]
        //         }
        //     }
        // }
        Object.keys(nextProps).map((key, index) => {
            if (key.startsWith('widget') && Object.keys(nextProps[key]).length != 0) {
                this.graphCreator(nextProps[key]);
            }
        })
        // if (nextProps.widgetData.startsWith('widget')) {
        //     // graphCreator
        //     // dummyProps.widgetData.map(widget => {
        //     if (nextProps.widgetData.widgetType == 'pieChart') {
        //         let labels = [];
        //         let values = [];

        //         nextProps.widgetData.graphData.data.forEach(data => {
        //             // console.log(data);
        //             labels.push(data.label)
        //             values.push(data.count)
        //         })
        //         let chart = <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={labels} data={values} height={120}
        //             // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
        //             backgroundColor={['#9e9e9e', '#ae8b4b', '#2196f3']} />

        //         this.setState({
        //             [nextProps.widgetData.widgetId]: chart
        //         })
        //         if (nextProps.widgetData.widgetType == '3ValueBar-Horizontal') {
        //             let x = [];
        //             let y = [];
        //             let z = [];
        //             let dataArray = [];
        //             if (nextProps.widgetData.widgetId.toggle == 'value') {
        //                 nextProps.widgetData.graphData.byValue.forEach(data => {
        //                     // console.log(data);
        //                     x.push(data.xIndex.value)
        //                     y.push(data.yIndex.value)
        //                     z.push(data.zIndex.value)
        //                 })
        //             } else {
        //                 nextProps.widgetData.graphData.byCount.forEach(data => {
        //                     // console.log(data);
        //                     x.push(data.xIndex.value)
        //                     y.push(data.yIndex.value)
        //                     if (!z.includes(data.zIndex.value)) {
        //                         z.push(data.zIndex.value)
        //                     }
        //                     if (data.zIndex.value == z[0]) {
        //                         let obj = {
        //                             entityName: data.xIndex.value,
        //                             value1: data.yIndex.value,
        //                             type: data.zIndex.value
        //                         }
        //                         dataArray.push(obj);
        //                     } else {
        //                         let obj = {
        //                             entityName: data.xIndex.value,
        //                             value2: data.yIndex.value,
        //                             type: data.zIndex.value
        //                         }
        //                         dataArray.push(obj);
        //                     }

        //                 })
        //                 this.setState({
        //                     dataArray
        //                 })
        //             }

        //             // console.log(x);
        //             // console.log(y);
        //             // console.log(z);
        //             // console.log(dataArray);
        //             let chart = <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()}
        //                 data={dataArray || []} labels={z} stack="multiple" dataLabelsAttribute="entityName" dataValuesAttributes={['value1', 'value2']} backgroundColors={['#ae8b4b', '#2196f3']}
        //                 options={{
        //                     responsive: true,
        //                     maintainAspectRatio: true
        //                 }} />

        //             this.setState({
        //                 [nextProps.widgetData.widgetId]: chart
        //             })
        //         }
        //     }

        // }
        // if (dummyProps.widgetData) {
        //     // dummyProps.widgetData.map(widget => {
        //         if (dummyProps.widgetData.widgetType == 'pieChart') {
        //             let labels = [];
        //             let  values = [];

        //             dummyProps.widgetData.graphData.data.forEach(data => {
        //                 if (data.label) {
        //                     labels.push(data.label)
        //                 } else {
        //                     values.push(data.count)
        //                 }
        //             })
        //            let chart = <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={[labels.toString()]} data={[values.toString()]} height={120}
        //             // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
        //             backgroundColor={['#9e9e9e', '#ae8b4b', '#2196f3']} />

        //             this.setState({
        //                 [dummyProps.widgetData.widgetId]: chart
        //             })
        //         }
        //     // })
        // }
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
        this.getSingleGraphData(widgetId);

    }

    render() {
        console.log("state-->", this.state)
        console.log("props-->", this.props)
        if (!this.state.isLoading)
            return (
                <Wrapper title="E-Commerce Dashboard">
                    <Portlet title={"Search Filters"} noCollapse={false}>

                        {/* <div className="portlet light bordered sdg_portlet"> */}

                        <div className="row p-0">
                            <div className="col-md-2">
                                <div className="bg-blue-period">
                                    <span>
                                        Period
                </span>
                                </div>


                            </div>
                            <div className="col-md-10">
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Year
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2017')} checked={this.state.selectedYears.includes('2017')} name="2017" id="option1" />
                                                <label className={this.state.selectedYears.includes('2017') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2017
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2018')} checked={this.state.selectedYears.includes('2018')} name="2018" id="option1" />
                                                <label className={this.state.selectedYears.includes('2018') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2018
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2019')} checked={this.state.selectedYears.includes('2019')} name="2019" id="option1" />
                                                <label className={this.state.selectedYears.includes('2019') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2019
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <input className="radio-input" type="radio" onClick={() => this.selectYear('2020')} checked={this.state.selectedYears.includes('2020')} name="2020" id="option1" />
                                                <label className={this.state.selectedYears.includes('2020') ? "btn btn-primary btn-block active radio-selected" : "btn btn-primary btn-block active"}>
                                                    2020
                            </label>
                                            </div>
                                        </div>




                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Quarter
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option1" /> Quarter 1
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option2" /> Quarter 2
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option3" /> Quarter 3
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-3 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option4" /> Quarter 4
                            </label>
                                            </div>
                                        </div>




                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Monthly
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option1" /> 1
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option2" /> 2
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option3" /> 3
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option4" /> 4
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option5" /> 5
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option6" /> 6
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option7" /> 7
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option8" /> 8
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary btn-block active">
                                                    <input type="radio" name="options" id="option9" /> 9
                            </label>
                                            </div>
                                        </div>
                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option10" /> 10
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option11" /> 11
                            </label>
                                            </div>
                                        </div>

                                        <div className="col-md-1 p-0">
                                            <div className="btn-group btn-group-toggle grid" data-toggle="buttons">
                                                <label className="btn btn-primary active">
                                                    <input type="radio" name="options" id="option12" /> 12
                            </label>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="row mb-1">
                                    <div className="col-md-2 p-0" >
                                        <div className="bg-blue-year">
                                            <span>
                                                Date
                        </span>
                                        </div>

                                    </div>
                                    <div className="col-md-10 p-0">
                                        <div className="col-md-2 p-0">
                                            <div className="bg-grey">
                                                <span>
                                                    From
                            </span>
                                            </div>
                                        </div>
                                        <div className="col-md-4 p-0">
                                            <input type="date" id="selectedFromDate" className="form-control" />
                                        </div>

                                        <div className="col-md-2 p-0">
                                            <div className="bg-grey">
                                                <span>
                                                    To
                            </span>
                                            </div>

                                        </div>

                                        <div className="col-md-4 p-0">
                                            <input type="date" id="selectedToDate" className="form-control" />
                                        </div>


                                    </div>

                                </div>


                            </div>


                        </div>

                        <div className="row p-0 mt-1">
                            <div className="col-md-2">
                                <div className="bg-blue-period zone">
                                    <span>
                                        Zone
                            </span>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="row">
                                    <div className="col-xs-12 p-0">
                                        <nav>
                                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                <div className="col-md-12 p-0">
                                                    <a onClick={() => this.selectZone('All')} className={this.state.selectedZone.includes('All') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All</a>
                                                    <a onClick={() => this.selectZone('freeZone')} className={this.state.selectedZone.includes('freeZone') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Free Zone</a>
                                                    <a onClick={() => this.selectZone('customWarehouse')} className={this.state.selectedZone.includes('customWarehouse') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Custom Warehouse</a>
                                                    <a onClick={() => this.selectZone('mainLand')} className={this.state.selectedZone.includes('mainLand') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Mainland</a>
                                                </div>
                                            </div>
                                        </nav>
                                        <div className="tab-content py-3 px-3 px-sm-0 mt-2" id="nav-tabContent">
                                            <div className="tab-pane fade active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <div className="row">
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                                <div className="form-group mb-2">
                                                    <input type="hidden" name="data[Server][0][id]" className="form-control" value="1" id="Server0Id" />
                                                    <div className="controls-dropdown">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\dafza.png" value="ipr0451483t">DAFZA</option>
                                                                <option data-img="\assets\Resources\images\dubai-south.png" value="ldap0451483t">Dubai South</option>
                                                                <option data-img="\assets\Resources\images\jafza.png" value="proxy0451483t">JAFZA</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                                <div className="form-group mb-2">
                                                    {/* <input type="hidden" name="data[Server][0][id]" className="form-control" value="1" id="Server0Id">  */}
                                                    <div className="controls-dropdown">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\1.png" value="ipr0451483t">Custom Warehouse 1</option>
                                                                <option data-img="\assets\Resources\images\2.png" value="ldap0451483t">Custom Warehouse 2</option>
                                                                <option data-img="\assets\Resources\images\3.png" value="proxy0451483t">Custom Warehouse 3</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row p-0 mt-1">
                            <div className="col-md-2">
                                <div className="bg-blue-period zone">
                                    <span>
                                        Companies
                            </span>
                                </div>
                            </div>
                            <div className="col-md-10">
                                <div className="row">
                                    <div className="col-xs-12 p-0">
                                        <nav>
                                            <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                <div className="col-md-12 p-0">
                                                    <a onClick={() => this.selectZone('All')} className={this.state.selectedZone.includes('All') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">All</a>
                                                    <a onClick={() => this.selectZone('eCommerce')} className={this.state.selectedZone.includes('eCommerce') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-ecomm-tab" data-toggle="tab" href="#nav-ecomm" role="tab" aria-controls="nav-ecomm" aria-selected="false">E-Commerce</a>
                                                    <a onClick={() => this.selectZone('logistics')} className={this.state.selectedZone.includes('logistics') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-log-tab" data-toggle="tab" href="#nav-log" role="tab" aria-controls="nav-log" aria-selected="false">Logistics</a>
                                                    <a onClick={() => this.selectZone('courier')} className={this.state.selectedZone.includes('courier') ? "nav-item nav-link active radio-selected" : "nav-item nav-link active"} id="nav-about-tab" data-toggle="tab" href="#nav-courier" role="tab" aria-controls="nav-courier" aria-selected="false">Courier</a>
                                                </div>
                                            </div>
                                        </nav>
                                        <div className="tab-content py-3 px-3 px-sm-0 mt-2" id="nav-tabContent">
                                            <div className="tab-pane fade active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                                <div className="row">
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                    <div className="col-md-4"></div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-ecomm" role="tabpanel" aria-labelledby="nav-ecomm-tab">
                                                <div className="form-group mb-2">
                                                    <input type="hidden" name="data[Server][0][id]" className="form-control" value="1" id="Server0Id" />
                                                    <div className="controls">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\namshi.png" value="ipr0451483t">NAMSHI</option>
                                                                <option data-img="\assets\Resources\images\noon.png" value="proxy0451483t">NOON</option>
                                                                <option data-img="\assets\Resources\images\jolly-chic.png" value="ldap0451483t">JOLLY CHIC</option>
                                                                <option data-img="\assets\Resources\images\awok.png" value="ldap0451483t">AWOK</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-courier" role="tabpanel" aria-labelledby="nav-courier-tab">
                                                <div className="form-group mb-2">
                                                    {/* <input type="hidden" name="data[Server][0][id]" className="form-control" value="1" id="Server0Id">  */}
                                                    <div className="controls">
                                                        <select className="multiselect" multiple="multiple" id="Server0Vm">
                                                            <optgroup>
                                                                <option data-img="\assets\Resources\images\all.png" value="ctrlr0451483t">All</option>
                                                                <option data-img="\assets\Resources\images\aramex.png" value="ipr0451483t">ARAMEX</option>
                                                                <option data-img="\assets\Resources\images\dhl.png" value="ldap0451483t">DHL</option>
                                                                <option data-img="\assets\Resources\images\fedex.png" value="proxy0451483t">FEDEX</option>
                                                            </optgroup>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row button-row">
                            <button onClick={() => this.getGraphData()} className="btn btn-primary search-button radio-selected">Search</button>
                        </div>







                    </Portlet>

                    <div className="row">
                        {/* <div className="col-md-12">
                                <DashboardFilters />
                            </div> */}
                        <div className="col-md-6">
                            <Portlet title={"Top 3 E-Commerce, Logistics and Courier Companies"} style={{ height: 'auto', maxHeight: 'auto' }} noCollapse={false}>

                                <div className="refresh-img-div">
                                    <div className="content-toggle">
                                        <label htmlFor="">Volume</label>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                        <label htmlFor="">Value</label>
                                    </div>
                                    <img onClick={() => this.refreshSingleWidget(1)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget1isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget1} </div>
                                }
                                {/* <PieChart key={Math.random()} onElementsClick={() => { console.log('Pie Chart Clicked') }} labels={['FINANCED', 'REJECTED', 'PURGED']} data={[this.state.financedPercentage, this.state.rejectedPercentage, this.state.purgedPercentage]} height={120}
                                        // backgroundColor={['#7aa62d', '#18e244', '#95d22a', '#62920d']} />
                                        backgroundColor={['#9e9e9e', '#ae8b4b', '#2196f3']} /> */}
                            </Portlet>
                        </div>

                        <div className="col-md-6">
                            <Portlet title={"E-COMMERCE TRANSACTIONS"} noCollapse={false} style={{ height: 'auto' }}>
                                <div className="refresh-img-div">
                                <div className="content-toggle">
                                        <label htmlFor="">Volume</label>
                                        <label className="switch">
                                            <input type="checkbox" />
                                            <span className="slider round"></span>
                                        </label>
                                        <label htmlFor="">Value</label>
                                    </div>
                                    <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {/* <h2 id="downloadPdf" onClick={() => this.CreatePDFfromHTML('rule-graph')}>DOWNLOAD PDF</h2> */}

                                {/* <BubbleChart data={companyBubbles} useLabels /> */}
                                {this.state.widget20}
                                <div id="rule-graph" className="col-md-12">
                                    {/* <a href="#" onClick={() => this.downloadRuleCSV(this.props.dashboardData.ruleData)} className="btn-success">Download CSV</a> */}
                                    {/* {this.state.widget7isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                            :
                                            <div>   {this.state.widget7} </div>
                                        } */}

                                    {/* {this.state.ruleData && (
                                            <VerticalBarChart key={Math.random()} data={[..._.get(this.state, 'ruleData', [])]} labels={['Hit Count', 'Not Hit Count']} stack="multiple" dataLabelsAttribute="riskname" dataValuesAttributes={["hitcount", "nothitcount"]} backgroundColors={['#ae8b4b', '#2196f3']}
                                         height={150} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                        )} */}
                                </div>

                            </Portlet>
                        </div>


                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Portlet title={"E-COMMERCE TRADE (AED)"} noCollapse={false} style={{ height: 'auto' }}>
                                <div className="refresh-img-div">
                                    <img onClick={() => this.refreshSingleWidget(2)} className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {this.state.widget1isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                    :
                                    <div>   {this.state.widget2} </div>
                                }

                            </Portlet>
                        </div>
                        <div className="col-md-6">
                            <Portlet title={this.state.widget3 ? "CIF VALUE" : "Top Exporting Countries"} noCollapse={false} style={{ height: 'auto' }}>
                                <div className="refresh-img-div">
                                    <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                {/* <h2 id="downloadPdf" onClick={() => this.CreatePDFfromHTML('rule-graph')}>DOWNLOAD PDF</h2> */}
                                {this.state.widget3 ? <div>{this.state.widget3}</div> : <div>{this.state.widget6}</div>}

                            </Portlet>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <Portlet title={"TRANSACTION BY DESTINATION COUNTRY"} noCollapse={false} style={{ height: '900px' }}>
                                <div className="refresh-img-div">
                                    <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                <div id="rule-graph" className="col-md-12">
                                    {/* {this.state.widget7isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                            :
                                            <div>   {this.state.widget7} </div>
                                        } */}
                                    {/* <div id="controls-graph">
                                        <span style={{ visibility: 'hidden' }}>
                                            <label><input id="combine" type="radio" name="grouping" value="combine" checked />Combine</label>
                                            <label><input id="continents" type="radio" name="grouping" value="continents" />Continents</label>
                                            <label><input id="country-centers" type="radio" name="grouping" value="country-centers" />Country Centers</label>
                                            <label><input id="population" type="radio" name="grouping" value="population" />Population</label>
                                        </span>
                                        <span>
                                            <label><input id="colors" type="radio" name="fill" value="colors" />Colors</label>
                                            <label><input id="flags" type="radio" name="fill" value="flags" checked />Flags</label>
                                        </span>
                                    </div>
                                    <div id="country-info"></div>
                                    <div id="bubble-chart"></div> */}
                                    {this.state.widget22}
                                </div>

                            </Portlet>
                        </div>
                    </div>
                    <div className="row">
                        <div className="">
                            {/* <Portlet title={"BANKS"} noCollapse={true} style={{ height: '350px' }}> */}
                            <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"Top E-Commerce Companies"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                        </div>
                                        {this.state.widget5isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                            :
                                            <div>   {this.state.widget5} </div>
                                        }
                                        {/* <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#ae8b4b']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} /> */}

                                    </Portlet>
                                }
                            </div>
                            <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"Top Exporting Countries"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                        </div>

                                        {this.state.widget6isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                            :
                                            <div>   {this.state.widget6} </div>
                                        }
                                        {/* <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#2196f3']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} /> */}

                                    </Portlet>
                                }
                            </div>
                            <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"FREE ZONE WISE TRANSACTIONS"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                        </div>

                                        {this.state.widget4isLoading ? <div className="graphLoader" > {utils.getLabelByID("Loading")}</div>
                                            :
                                            <div>   {this.state.widget4} </div>
                                        }
                                        {/* <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={120} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#2196f3']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} /> */}

                                    </Portlet>
                                }
                            </div>
                            {/* <div className="col-md-6">
                                <Portlet title={"Top 5 Banks by Invoice Submission Amount"} noCollapse={false}>
                                    <HorizontalStackedBarChart minRange={100} maxRange={6500} stepSize={50} height={120} key={Math.random()} data={_.get(this.state.dashboardData, 'barGraphAmountData', [])} labels={['sum']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["sum"]} backgroundColors={['#ae8b4b']}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: true
                                        }} />

                                </Portlet>
                            </div> */}
                        </div>

                    </div>
                    <div className="row">
                        <div className="">
                            {/* <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"Top E-Commerce Companies"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                        </div>
                                      

                                    </Portlet>
                                }
                            </div> */}
                            {/* <div className="col-md-6">
                                {this.state.dashboardData && this.state.dashboardData.barGraphAmountData &&
                                    <Portlet title={"Top Exporting Countries"} noCollapse={false}>
                                        <div className="refresh-img-div">
                                            <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                        </div>
                                        <HorizontalBarChartNew minRange={10} maxRange={100} stepSize={5} height={180} key={Math.random()} data={[..._.get(this.state.dashboardData, 'barGraphSubmissionData', [])]} labels={['count']} stack="single" dataLabelsAttribute="bankCode" dataValuesAttributes={["count"]} backgroundColors={['#2196f3']}
                                            options={{
                                                responsive: true,
                                                maintainAspectRatio: true
                                            }} />

                                    </Portlet>
                                }
                            </div> */}

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <Portlet title={"TOP 5 EXPORT HS CODES"} noCollapse={true} style={{ height: '550px' }}>
                                <div className="refresh-img-full-div">
                                    <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                <div id="rule-graph" className="col-md-12">
                                    {this.state.widget7}
                                    {/* {this.state.ruleData && (
                                    <VerticalBarChart key={Math.random()} data={[..._.get(this.state, 'ruleData', [])]} labels={['Hit Count', 'Not Hit Count']} stack="multiple" dataLabelsAttribute="riskname" dataValuesAttributes={["hitcount", "nothitcount"]} backgroundColors={['#ae8b4b', '#2196f3']}
                                       height={100} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                )} */}
                                </div>

                            </Portlet>
                        </div>
                        <div className="col-md-6">
                            <Portlet title={"TOTAL E-COMMERCE TRANSACTIONS"} noCollapse={true} style={{ height: '550px' }}>
                                <div className="refresh-img-full-div">
                                    <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                <div id="rule-graph" className="col-md-12">
                                    {sankeyData && sankeyData.nodes &&
                                        <MultiLineChart data={sankeyData} />
                                    }
                                    {/* {this.state.widget10} */}
                                    {/* {this.state.ruleData && (
                                    <VerticalBarChart key={Math.random()} data={[..._.get(this.state, 'ruleData', [])]} labels={['Hit Count', 'Not Hit Count']} stack="multiple" dataLabelsAttribute="riskname" dataValuesAttributes={["hitcount", "nothitcount"]} backgroundColors={['#ae8b4b', '#2196f3']}
                                       height={100} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                )} */}
                                </div>

                            </Portlet>
                        </div>
                        <div className="col-md-12">
                            <Portlet title={"TRANSACTION FLOW (Hover on Elements to View Count)"} noCollapse={true} style={{ height: '550px' }}>
                                <div className="refresh-img-full-div">
                                    <img className="refresh-img-full" src="\assets\Resources\images\refresh.png" alt="" />
                                </div>
                                <div id="rule-graph" className="col-md-12">
                                    {sankeyData && sankeyData.nodes &&
                                        // <SankeyChart data={sankeyData} />
                                        <div>    {this.state.widget21} </div>
                                    }
                                    {/* {this.state.widget10} */}
                                    {/* {this.state.ruleData && (
                                    <VerticalBarChart key={Math.random()} data={[..._.get(this.state, 'ruleData', [])]} labels={['Hit Count', 'Not Hit Count']} stack="multiple" dataLabelsAttribute="riskname" dataValuesAttributes={["hitcount", "nothitcount"]} backgroundColors={['#ae8b4b', '#2196f3']}
                                       height={100} yAxesLabel={{ display: true, labelString: 'Total Count', fontSize: 14 }} />
                                )} */}
                                </div>

                            </Portlet>
                        </div>



                    </div>
                    {/* <Portlet title="Order Tracking">

                    </Portlet> */}

                </Wrapper>
            );
        else
            return (<div className="loader" > {utils.getLabelByID("Loading")}</div>)
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
EcommerceDashboard.displayName = "__HIDE";
export default connect(mapStateToProps, mapDispatchToProps)(EcommerceDashboard);