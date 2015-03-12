/** @jsx React.DOM */

var React = require('react/addons');
var Version = require('../Version/Version.jsx');
var versions = ["尤美女", "EY", "DPP", "TSU", "鄭麗君", "姚文智", "李應元", "江啟臣"];
var versionToTitle = {"尤美女":"尤美女版", 
                      "EY":"行政院版", "DPP":"民進黨團版", 
                      "TSU":"台聯黨團版","鄭麗君":"鄭麗君版", 
                      "姚文智":"姚文智版", "李應元":"李應元版", 
                      "江啟臣":"江啟臣版"};

var Chart = require('../Chart/Chart.jsx');
var DataSeries = require('../DataSeries/DataSeries.jsx');

require('./MatchResult.css');

var MatchResult = React.createClass({
  
  render () {
    
    console.log(this.props.data);
    
   
    var data =  this.props.data;
    var array = [];
    var drawingData = [];///////////// NEEDS rewrite

    for(var key in data){
    	var item = {};
    	item.name = key;
    	item.count = data[key];
        array.push(item);
        item.title = versionToTitle[key];

        //drawingData.push(data[key]);
    }

    // 依照版本接近使用者選擇的程度排序
    array.sort(function (a, b) {
    	return b.count-a.count;
    });


    // Draw a pie chart
    var width = (screen.width > 400) ? 400 : screen.width-20;
    var height = (screen.width > 400) ? 300 : 200;

    var matchPieChart = array.length > 0 ? 
    <Chart width={width} 
           height={height}>
        <DataSeries 
           type="PieChart"
           data={array} 
           width={width}
           height={height} />
    </Chart> : "";

    var topCount = array[0] ? array[0].count : 100;
    var topMatchItems = array.map((item, index)=>{
        if(item.count === topCount){
            var split = (index === 0) ? "":"、";
            return (
                <span key={index}>{split}{ item.title }</span>
            )
        }
    });
    topMatchItems = <div className="MatchResult-topMatch">和你最相近的版本是：{topMatchItems}</div>;

    var matchItems = array.map((item, index)=>{
        return (
        	<div className="MatchResult-item"
                 key={index}>
        	    <div className="MatchResult-count">{item.count}</div>
        		<Version className="MatchResult-img"
        		         name={item.name}
        		         cover={true}
                         key={index} />
        		
        	</div>
        )
    });

    return (
      <div className="MatchResult">
          {matchPieChart}
          {topMatchItems}
          {matchItems}
          
      </div>
    );
  }
});

module.exports = MatchResult;


