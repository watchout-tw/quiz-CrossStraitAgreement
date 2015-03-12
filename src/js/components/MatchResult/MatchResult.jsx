/** @jsx React.DOM */

var React = require('react/addons');
var Version = require('../Version/Version.jsx');
var versions = ["尤美女", "EY", "DPP", "TSU", "鄭麗君", "姚文智", "李應元", "江啟臣"];

require('./MatchResult.css');

var MatchResult = React.createClass({
  
  render () {
    
    console.log(this.props.data);
    
    // TODO: 想要用百分比來算個圓餅圖
    

    var data =  this.props.data;
    var array = [];
    for(var key in data){
    	var item = {};
    	item.name = key;
    	item.count = data[key];
        array.push(item);
    }

    array.sort(function (a, b) {
    	return b.count-a.count;
    });

    var matchItems = array.map((item, index)=>{
        return (
        	<div className="MatchResult-item">
        	    <div className="MatchResult-count">{item.count}</div>
        		<Version className="MatchResult-img"
        		         name={item.name}
        		         cover={true} />
        		
        	</div>
        )
    });

    return (
      <div className="MatchResult">
          {matchItems}
      </div>
    );
  }
});

module.exports = MatchResult;


