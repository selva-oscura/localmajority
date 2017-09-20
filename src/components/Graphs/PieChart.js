import React, { Component } from 'react';
import * as d3 from 'd3';
import './PieChart.css';

class Arc extends Component {
  constructor() {
    super();
    this.arc = d3.arc();
  }
  // componentWillMount(){
  // 	this.updateD3(this.props)
  // }
  // componentWillReceiveProps(newProps) {
  // 	this.updateD3(newProps);
  // }
  // updateD3(newProps){
  // 	this.arc.innerRadius(newProps.innerRadius);
  // 	this.arc.outerRadius(newProps.outerRadius);
  // }
  render(){
  	return (
  		<path 
  			d={this.arc(this.props.data)}
  			style={{fill: this.props.color}}
  		></path>
  	);
  }
}

class LabeledArc extends Arc {
	render() {
		let [labelX, labelY] = this.arc.centroid(this.props.data),
    		labelTranslate = `translate(${labelX * 2.5}, ${labelY * 2.5})`;
    console.log(this.props.data, labelX, labelY);
		return (
			<g>
				{super.render()}
				<text 
					transform={labelTranslate}
					textAnchor="middle"
				>
					{this.props.data.data.label}
				</text>
			</g>
		);
	}
}


class PieChart extends Component {
	constructor(){
		super();
		this.pie = d3.pie()
								.value((d) => (d.value))
								.sort(null);
	}
	arcGenerator(d, i){
		let { color } = d.data;
		return (
			<LabeledArc
				key={`arc-${i}`}
				data={d}
				innerRadius={this.props.innerRadius}
				outerRadius={this.props.outerRadius}
				color={color}
			/>
		);
	}
	render(){	
		let pieChart = this.pie(this.props.data),
				translate=`translate(${this.props.x}, ${this.props.y})`;
		return (
      <div className="PieChart">
      	<h3>{this.props.title}</h3>
				<svg>
	        <g transform={translate}>
	        	{ pieChart.map((d, i) => this.arcGenerator(d, i)) }
	        </g>
				</svg>
      </div>
		);
	}
}

export default PieChart;

