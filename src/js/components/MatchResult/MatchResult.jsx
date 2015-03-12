/** @jsx React.DOM */

var React = require('react/addons');

require('./MatchResult.css');

var MatchResult = React.createClass({
  
  render () {
    
    console.log(this.props.data);
    
    // TODO: 想要用百分比來算個圓餅圖

    return (
      <div className="MatchResult">
          
      </div>
    );
  }
});

module.exports = MatchResult;


