/** @jsx React.DOM */

var React = require('react/addons');
var d3 = require("d3");

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 400,
      height: 300,
      offset: 0
    }
  },

  componentDidMount: function() {
    this._renderGraph();  
     
  },

  _renderGraph: function () {
    //console.log("RENDER:"+this.props.value+", height: "+this.props.height);

    var height = this.props.height;

      d3.select(this.getDOMNode())
        .select("rect")
        .transition().duration(1000)
        .attr('y', this.props.availableHeight - height)
        .attr('height', height);

      // console.log(this.getDOMNode());
      // d3.select(this.getDOMNode())
      //   .append('text')
      //   .attr('x', this.props.offset)
      //   .attr('y', this.props.availableHeight - this.props.height)
      //   .attr('dy', "0.35em")
      //   .text("hello");c
      
      // TODO: label animation
  },

  componentWillReceiveProps: function(nextProps) {
      // if( nextProps.height !== this.props.height){
      //     console.log("NEXT HEIGHT: "+nextProps.height);
      //     console.log(this.props.height);

      //     this._renderGraph();
      // }
      //this._renderGraph();
  
  },

  render: function() {
    

    var label = (this.props.percentage) ? this.props.value + " %" : this.props.value;
    var xOffset = (this.props.percentage) ? (this.props.offset + this.props.width/2 - 18) : (this.props.offset + this.props.width/2 - 6);

    return (
      <g>
          <rect fill={this.props.color}
                width={this.props.width} 
                height="0"
                x={this.props.offset} 
                y={this.props.availableHeight - 0} />
          <text x={xOffset} 
                y={this.props.availableHeight - 10}
                fontSize="20px"
                fill="black"
                stroke="black"
                strokeWidth="1.4" >{label}</text>
      </g>
    );
    // return (
    //   <rect fill={this.props.color}
    //     width={this.props.width} height={this.props.height}
    //     x={this.props.offset} y={this.props.availableHeight - this.props.height} />
    // );
  }
});

module.exports = Bar;


