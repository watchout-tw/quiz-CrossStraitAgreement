/** @jsx React.DOM */

var React = require('react/addons');
var d3 = require("d3");

var Bar = require('../Bar/Bar.jsx');

var DataSeries = React.createClass({
  
  getDefaultProps: function() {
    return {
      title: '',
      data: []
    }
  },

  render: function() {
    /////////
    // NEEDS REWRITE
    ////////

    var props = this.props;

    var yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.data)])
      .range([0, this.props.height]);

    var xScale = d3.scale.ordinal()
      .domain(d3.range(this.props.data.length))
      .rangeRoundBands([0, this.props.width], 0.05);
      //.rangeRoundBands([0, this.props.width], 0.05);
    
    var chart = <g></g>;

    //console.log(this.props.type);
    
    // A, B, C, D to 0, 1, 2, 3
    var highlightIndex = this.props.highlightIndex.charCodeAt(0)-65;//65:'A'
    
    console.log(this.props.highlightIndex);

    if(this.props.type==="BarChart"){
       var bars = this.props.data.map(function(point, i) {

          var color = (highlightIndex === i) ? props.highlightColor : props.defaultColor;
          return (
            <Bar value={point}
                 height={yScale(point)} 
                 width={xScale.rangeBand()} 
                 offset={xScale(i)} 
                 availableHeight={props.height} 
                 color={color} 
                 key={i} />
          )
       });
       chart = bars;
       console.log(chart);

    }else if(this.props.type==="PieChart"){



    }else {
       //
    }

    return (
      <g>{chart}</g>
    );
  }
});

module.exports = DataSeries;


