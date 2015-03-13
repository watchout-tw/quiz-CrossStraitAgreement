/** @jsx React.DOM */

var React = require('react/addons');
var d3 = require("d3");

var Bar = require('../Bar/Bar.jsx');
var Pie = require('../Pie/Pie.jsx');

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

    if(this.props.type==="BarChart"){
        //////// 有時候 height 會是 NaN //////// NEEDS TO BE FIXED
       
        var highlightIndex = this.props.highlightIndex;
        
        // Bar Chart
        var bars = this.props.data.map(function(point, i) {

           var color = props.defaultColor;
           
           //console.log("-------");
           //console.log(highlightIndex);
           if(highlightIndex.length){
              highlightIndex.map(function (obj, index) {
                  if(obj.charCodeAt(0)-65 === i) // A, B, C, D to 0, 1, 2, 3
                      color = props.highlightColor;
              })

           }
           
           // console.log("POINT:"+point);
           // console.log(yScale(point));

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

       

    }else if(this.props.type==="PieChart"){

        // var pie = d3.layout.pie()
      
        // //這裡有點拉雜
        // var points = [];
        
        // this.props.data.map((item, i)=>{
        //     points.push(item.count);
        // });
        // var path = pie(points);

        // this.props.data.map((item, i)=>{
        //     item.point = path[i];
        // });
        // ///////////

        // var bars = this.props.data.map(function(point, i) {
        //   return (
        //     <Pie data={point} 
        //          key={i}/>
        //   )
        // });
        
 
        // //translate( width/2 , height / 2)
        // var translateX = this.props.width/2;
        // var translateY = this.props.height/2;
        // var transformFomula = "translate("+translateX+","+translateY+")";
        // chart = (
        //   <g transform={transformFomula}>{bars}</g>
        // );

    }else {
       //
    }

    return (
      <g>{chart}</g>
    );
  }
});

module.exports = DataSeries;


