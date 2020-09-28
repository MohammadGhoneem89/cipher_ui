import React            from 'react';
import ReactBubbleChart from 'react-bubble-chart';
// import Actions          from '../Actions';

var colorLegend = [
  //reds from dark to light
  {color: "#67000d", text: 'Negative', textColor: "#ffffff"}, "#a50f15", "#cb181d", "#ef3b2c", "#fb6a4a", "#fc9272", "#fcbba1", "#fee0d2",
  //neutral grey
  {color: "#f0f0f0", text: 'Neutral'},
  // blues from light to dark
  "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", {color: "#08306b", text: 'Positive', textColor: "#ffffff"}
];

var tooltipProps = [{
  css: 'symbol',
  prop: '_id'
}, {
  css: 'value',
  prop: 'value',
  display: 'Last Value'
}, {
  css: 'change',
  prop: 'colorValue',
  display: 'Change'
}];

class BubbleChart extends React.Component {
  render () {
    var bubbleChartData =  [{
        "name": "Orland",
        "count": 18
    }, {
        "name": "Keely",
        "count": 363
    }, {
        "name": "Melita",
        "count": 305
    }, {
        "name": "Morry",
        "count": 140
    }, {
        "name": "Joyous",
        "count": 481
    }, {
        "name": "Emery",
        "count": 14
    }, {
        "name": "Libbi",
        "count": 424
    }, {
        "name": "Lauralee",
        "count": 385
    }, {
        "name": "Noll",
        "count": 426
    }, {
        "name": "Paulette",
        "count": 184
    }, {
        "name": "Alfredo",
        "count": 233
    }, {
        "name": "Todd",
        "count": 66
    }, {
        "name": "Homer",
        "count": 335
    }, {
        "name": "Hana",
        "count": 343
    }, {
        "name": "Gaile",
        "count": 208
    }, {
        "name": "Rhetta",
        "count": 174
    }, {
        "name": "Claudine",
        "count": 125
    }, {
        "name": "Bonita",
        "count": 138
    }, {
        "name": "Anstice",
        "count": 367
    }, {
        "name": "Ginger",
        "count": 313
    }]
    var data = bubbleChartData.map(d => ({
      _id: d.name,
      value: d.count,
      colorValue: '#fa7070',
      selected: false
    }));

    return <ReactBubbleChart
      className="my-cool-chart"
      colorLegend={colorLegend}
      data={data}
      selectedColor="#737373"
      selectedTextColor="#d9d9d9"
      fixedDomain={{min: -1, max: 1}}
    //   onClick={Actions.doStuff.bind(Actions)}
      legend={true}
      legendSpacing={0}
      tooltip={true}
      tooltipProps={tooltipProps}
    //   tooltipFunc={tooltipFunc}
    />;
  }
}

export default BubbleChart;