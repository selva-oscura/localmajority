import React, { Component } from 'react';
import * as d3 from 'd3';
import './PieChart.css';

class Arc extends Component {
  constructor() {
    super();
    this.arc = d3.arc();
  }
  componentWillMount() {
    this.updateD3(this.props);
  }
  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }
  updateD3(newProps) {
    this.arc.innerRadius(newProps.innerRadius);
    this.arc.outerRadius(newProps.outerRadius);
  }
  render() {
    return (
      <path d={this.arc(this.props.data)} style={{ fill: this.props.color }} />
    );
  }
}

class PieChart extends Component {
  constructor() {
    super();
    this.pie = d3
      .pie()
      .value(d => d.value)
      .sort(null);
  }
  arcGenerator(d, i) {
    let { color } = d.data;
    return (
      <Arc
        key={`arc-${i}`}
        data={d}
        innerRadius={this.props.innerRadius}
        outerRadius={this.props.outerRadius}
        color={color}
      />
    );
  }
  render() {
    let pieChart = this.pie(this.props.data),
      translate = `translate(${this.props.x}, ${this.props.y})`;
    // console.log(pieChart);
    return (
      <div className="PieChart">
        <h3>{this.props.title}</h3>
        <div className="chart">
          <svg>
            <g transform={translate}>
              {pieChart.map((d, i) => this.arcGenerator(d, i))}
            </g>
          </svg>
        </div>
        <div className="legend">
          {pieChart.map((d, i) => (
            <div className="row" key={`legend-row-${i}`}>
              <div
                className="swatch"
                style={{ backgroundColor: d.data.color }}
              />
              <div className="label">
                <h4>{d.data.label}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default PieChart;
