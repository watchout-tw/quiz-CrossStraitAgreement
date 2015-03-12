/** @jsx React.DOM */

var React = require('react/addons');
var d3 = require("d3");

var colorSets = ["#1f77b4","#aec7e8","#ff7f0e","#ffbb78","#2ca02c","#98df8a","#d62728","#ff9896"];


var Pie = React.createClass({
  getDefaultProps: function() {
    return {
      width: 0,
      height: 0,
      offset: 0
    }
  },

  componentDidMount: function() {
      
     
  },

  render: function() {
    
    //var label = this.props.value + " %";
    var arc = d3.svg.arc()
                .outerRadius(140)
                .innerRadius(0);

    var c = arc.centroid(this.props.data.point);
    c[0] = c[0]-30;
    var transformFomula = "translate("+c[0]+","+c[1]+")";
       
    console.log(this.props.data);

    return (
      <g className="arc"
         stroke="white"
         fill={colorSets[this.props.key]}>
        <path d={arc(this.props.data.point)} />
        <text transform={transformFomula}
              fill="black"
              stroke="none">{this.props.data.title}</text>
      </g>
    );
    
  }
});

module.exports = Pie;


