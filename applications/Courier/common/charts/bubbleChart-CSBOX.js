import React from "react";
import * as d3 from "d3";

class BubbleChart extends React.Component {
  static defaultProps = {
    data: [],
    useLabels: false,
    width: 600,
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
      .range([1, 50])
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

  renderBubbles = data => {
    const minValue =
      0.95 *
      d3.min(data, item => {
        return item.views;
      });

    const maxValue =
      1.05 *
      d3.max(data, item => {
        return item.views;
      });

    const color = d3
      .scaleLinear()
      .domain([minValue, maxValue])
      .interpolate(d3.interpolateHcl)
      .range(["#eb001b", "#f79e1b", "#0576b2"]);

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

    // render circle and text elements inside a group
    const texts = data.map((item, index) => {
      const props = this.props;
      const fontSize = this.radiusScale(item.views) / 3;
      return (
        <g
          key={index}
          transform={`translate(${props.width / 3 + item.x}, ${props.height /
            3 +
            item.y})`}
        >
          <circle
            r={this.radiusScale(item.views)}
            fill={color(item.views)}
            stroke={d3.rgb(color(item.views)).brighter(2)}
            strokeWidth="2"
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
          <svg width={this.props.width} height={this.props.height}>
            {this.renderBubbles(this.state.data)}
          </svg>
        </div>
      </div>
    );
  }
}
export default BubbleChart;
