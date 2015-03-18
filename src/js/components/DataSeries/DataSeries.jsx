/** @jsx React.DOM */

var React = require('react/addons');
var d3 = require("d3");

var Bar = require('../Bar/Bar.jsx');
//var colorHue = ["#0c2c84","#225ea8","#1d91c0","#41b6c4","#7fcdbb","#c7e9b4","#edf8b1","#ffffd9"];
var colorHue = [
"#ECCB16",
//"#EED12E",
"#F0D645",
//"#F2DB5D",
"#F4E075",
//"#F6E58C",
"#F8EBA4",
"#FAF0BB",
"#FAF0BB",
"#FAF0BB",
"#FAF0BB"
];

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

    // if(this.props.type==="BarChart"){
    //////// 有時候 height 會是 NaN //////// NEEDS TO BE FIXED
       
        var highlightIndex = this.props.highlightIndex;
        
        // Bar Chart
        var colorIndex = 0;
        var previousPoint = -1;
        var bars = this.props.data.map(function(point, i) {

          var color;
          if(props.diverseColor){
              
              if(previousPoint !== -1){
                  colorIndex = (previousPoint === point) ? colorIndex : colorIndex + 1;
              }
              previousPoint = point;
              color = colorHue[colorIndex];

          }else{
              color = props.defaultColor;
              if(highlightIndex.length){
                highlightIndex.map(function (obj, index) {
                    if(obj.charCodeAt(0)-65 === i) // A, B, C, D to 0, 1, 2, 3
                        color = props.highlightColor;
                })
  
              }
          }
        

           return (
             <Bar percentage={props.percentage}
                  value={point}
                  height={yScale(point)} 
                  width={xScale.rangeBand()} 
                  offset={xScale(i)} 
                  availableHeight={props.height} 
                  color={color} 
                  key={i} />
           )
        });
        chart = bars;
        // console.log(chart);

    //}

    return (
      <g>{chart}</g>
    );
  }
});

module.exports = DataSeries;


