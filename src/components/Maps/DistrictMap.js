import React, { Component } from 'react';
import * as d3 from 'd3';
import './DistrictMap.css';

class DistrictMap extends Component {
  componentDidMount(){
    const width = 1160;
    const height = 700;
    const districtData = this.props.districtData;
    const holder = document.getElementById('holder');
    const offsetL = 0;
    const offsetT = 0;
    // const offsetL = -300;
    // const offsetT = -400;
    // const offsetL = holder.offsetLeft + 60;
    // const offsetT = holder.offsetTop - 80;
    let showTooltip = (d) => {
      let imageLink = "";
      if(d.properties && d.properties.candImg){
        imageLink = d.properties.candImg;
        let imageIndex = imageLink.indexOf('images');
        imageLink = imageLink.slice(imageIndex);
      }
      var label = "<div><p>District: " + d.properties.name;
      if (d.properties.candName) {
        label += "<br />Candidate: <strong>" + d.properties.candName + "</strong></p><img src='../" + imageLink + "' alt='picture of " + d.properties.candName + "' /></div>";
      } else {
        label +="</p></div>"
      }

      let mouse = d3.mouse(svg.node())
        .map(function(d) {
          // console.log("mousing" + parseInt(d));
          return Math.floor(d);
        });
      tooltip.classed("hidden", false)
        .attr("style", "left:" + (mouse[0] + offsetL) + "px;top:" + (mouse[1]  + offsetT) + "px")
        .html(label);
    }

    // Create SVG
    let svg = d3.select(holder)
      .append("svg")
      .attr("width", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "none");
      /*            var hover = function(d) {
                 var div = d3.select(this.$.tooltip);
              console.log(div);
                     this.$.tooltip.style.left= event.pageX +'px';
                         this.$$('#tooltip').style.left = event.pageX +'px';
                         this.$.tooltip.style.top = event.pageY + 'px';
              div.style.innerHTML = "District " + d.properties.name;
                  }*/

    let tooltip = d3.select(holder)
      .append("div")
      .attr("class", "tooltip hidden");
      // Append empty placeholder g element to the SVG
      // g will contain geometry elements
    let g = svg.append("g");
    // Width and Height of the whole visualization
    // Set Projection Parameters
    let albersProjection = d3.geoAlbers()
      .scale(9000)
      .rotate([78 + 30 / 60, 0])
      .translate([width / 2, height/2 ]);

    // Create GeoPath function that uses built-in D3 functionality to turn
    // lat/lon coordinates into screen coordinates
    // .data( neighborhoods_json.features )

    const geoPath = d3.geoPath()
      .projection(albersProjection);


    // Classic D3... Select non-existent elements, bind the data, append the elements, and apply attributes
    g.selectAll("path")
      .data(districtData.features)
      .enter()
      .append("path")
      .attr("fill", (function(d) {
        if (d.properties.color)
          return d.properties.color;
        else
          return "#ccc";
      }))
      .attr("stroke", "#333")
      .attr("d", geoPath)
      .on("mouseover", showTooltip)
      .on('click', function(d, i) {});    
  }
  render(){
    // console.log('this.props', this.props);
    return (
      <div className="DistrictMap">
        <div id="holder"></div>
      </div>
    );
  }
}

export default DistrictMap;
