import React from "react";
import * as d3 from "d3";

class BubbleChart extends React.Component {
  static defaultProps = {
    data: [],
    useLabels: false,
    width: 400,
    height: 400
  };

  constructor(props) {
    super(props);

    this.minValue = 1;
    this.maxValue = 100;
    this.mounted = false;

    this.state = {
      data: []
    };

    this.radiusScale = this.radiusScale.bind(this);
    this.simulatePositions = this.simulatePositions.bind(this);
    this.renderBubbles = this.renderBubbles.bind(this);
  }

  componentWillMount() {
    this.mounted = true;
  }

  componentDidMount() {
    if (this.props.data.length > 0) {
      this.minValue =
        0.95 *
        d3.min(this.props.data, item => {
          return item.views;
        });

      this.maxValue =
        1.05 *
        d3.max(this.props.data, item => {
          return item.views;
        });

      this.simulatePositions(this.props.data);
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  radiusScale = value => {
    const fx = d3
      .scaleSqrt()
      .range([1, 70])
      .domain([this.minValue, this.maxValue]);

    return fx(value);
  };
  simulatePositions = data => {
    this.simulation = d3
      .forceSimulation()
      .nodes(data)
      .velocityDecay(0.5)
      .force("x", d3.forceX().strength(0.05))
      .force("y", d3.forceY().strength(0.05))
      .force(
        "collide",
        d3.forceCollide(d => {
          return this.radiusScale(d.views) + 2;
        })
      )
      .on("tick", () => {
        if (this.mounted) {
          this.setState({ data });
        }
      });
  };

  updateCountryInfo(title, view) {
    //     console.log('VIEW', view)
    // d3.select("#bubble-info").html(view);

    var info = "";
    if (title) {
        info = `${title}: ${view}`;
    }
    d3.select("#bubble-info").html(info).style("visibility", function() {
        return (info != '') ? "visible" : "hidden";
    })
    // d3.select("#bubble-info").html(info);
}

  renderBubbles = data => {
    const minValue =
      0.95 *
      d3.min(data, item => {
        return item.views;
      });
    //   d3.select("#bubble-info").html(item.views);

    const maxValue =
      1.05 *
      d3.max(data, item => {
        return item.views;
      });

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      // .range(["#eb001b", "#f79e1b", "#0576b2"]);
      .range(["#f79e1b"]);

    // render simple circle element
    if (!this.props.useLabels) {
      const circles = data.map((item, index) => {
        return (
          <circle
            key={index}
            r={this.radiusScale(item.views)}
            cx={item.x}
            cy={item.y}
            fill={color(item.views)}
            stroke={d3.rgb(color(item.views)).brighter(2)}
            strokeWidth="2"
            onMouseOver={this.updateCountryInfo(item.views)}
            onMouseOut={this.updateCountryInfo('')}
          />
        );
      });

      return (
        <g
          transform={`translate(${this.props.width / 2}, ${this.props.height /
            2})`}
        >
          {circles}
        </g>
      );
    }

//     .on("mouseover", function (d) {
//         updateCountryInfo(d);
//     })
//     .on("mouseout", function (d) {
//         updateCountryInfo();
//     });
// updateCircles();



    // render circle and text elements inside a group
    const texts = data.map((item, index) => {
      const props = this.props;
      const fontSize = this.radiusScale(item.views) / 3;
      return (
        <g
          key={index}
          transform={`translate(${props.width / 2 + item.x}, ${props.height /
            2 +
            item.y})`}
        >
          <circle
            r={this.radiusScale(item.views)}
            fill={color(item.views)}
            stroke={d3.rgb(color(item.views)).brighter(2)}
            strokeWidth="2"
            onMouseOver={() => this.updateCountryInfo(item.title, item.views)}
            onMouseOut={() => this.updateCountryInfo('', '')}
          />
          <text
            dy="6"
            fill="#fff"
            textAnchor="middle"
            fontSize={`${fontSize}px`}
            fontWeight="bold"
          >
            {item.title}
          </text>
        </g>
      );
    });

    return texts;
  };

  render() {
    return (
      <div>
        {/* <h3>D3 Bubble Chart With react rendering</h3> */}
        <div id="chart">
            <div style={{visibility: 'hidden'}} id="bubble-info"></div>
          <svg width={this.props.width} height={this.props.height}>
            {this.renderBubbles(this.state.data)}
          </svg>
        </div>
      </div>
    );
  }
}
export default BubbleChart;
