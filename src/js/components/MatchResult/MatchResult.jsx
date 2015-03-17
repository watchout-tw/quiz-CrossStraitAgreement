/** @jsx React.DOM */

var React = require('react/addons');
var Version = require('../Version/Version.jsx');

var versions = ["尤美女", "EY", "DPP", "TSU", "鄭麗君", "姚文智", "李應元", "江啟臣"];
var versionToTitle = {"尤美女":"尤美女版", 
                      "EY":"行政院版", "DPP":"民進黨團版", 
                      "TSU":"台聯黨團版","鄭麗君":"鄭麗君版", 
                      "姚文智":"姚文智版", "李應元":"李應元版", 
                      "江啟臣":"江啟臣版"};

var versionObj = {
	"尤美女": {title:"尤美女版", count:0},
    "EY"   : {title:"行政院版", count:0},
    "DPP"  : {title:"民進黨團版", count:0},
    "TSU"  : {title:"台聯黨團版", count: 0},
    "鄭麗君": {title:"鄭麗君版", count: 0},
    "姚文智": {title:"姚文智版", count:0},
    "李應元": {title:"李應元版", count:0},
    "江啟臣": {title:"江啟臣版", count:0}
};

var PieChart = require('../PieChart/PieChart.jsx');
$ = require('jquery');

var Chart = require('../Chart/Chart.jsx');
var DataSeries = require('../DataSeries/DataSeries.jsx');


require('./MatchResult.css');

var MatchResult = React.createClass({
  
  render () {
    var data =  this.props.data;
    var array = [];
    var drawingData = [];
    var votesTotal = 0;
    for(var key in data){
    	
        array.push({
        	name: key,
        	count: data[key],
        	title: versionToTitle[key]
        });

        ////////
        // Update votes count
        
        // drawingData.push({
        //     text: versionToTitle[key],
        //     quantity: data[key]
        // });
        
        versionObj[key].count = data[key];
        
        ///
        votesTotal += data[key];
        
    }

    // 依照版本接近使用者選擇的程度排序
    array.sort(function (a, b) {
    	return b.count-a.count;
    });
   
    // var drawingData = [];
    // for(var key in versionObj){
    //     drawingData.push(versionObj[key]);
    // }
    // console.log(drawingData);
    //// Draw a pie chart
    //var size = ($(window).width() > 400) ? 400 : $(window).width()-20;
    //var colorRange = ["#0b64a0", "#5098d8", "#80b2e0", "#afcfef", "#d4e6f9", /* "#fcedd6",*/ "#f7e3bf", "#fcce65", "#fec92d", "#f4b425"];
    // var pieChartItem = (drawingData.length > 0) ? <PieChart colorRange={colorRange} 
    //                              data={drawingData} 
    //                              width={size} 
    //                              height={size} /> : "";
    
    
    /////////////////
    var highlightIndex = [];
    var topCount = array[0] ? array[0].count : 100;
    var topMatchItems = "";

    topMatchItems = array.map((item, index)=>{
        if(item.count === topCount){
            var split = (index === 0) ? "":"、";
            highlightIndex.push(String.fromCharCode(65+index))
            return (
                <span key={index}>{split}{ item.title }</span>
            )
        }
    });
    topMatchItems = <div className="MatchResult-topMatch">
       
       <div>和我最相近的版本是：<br/>{topMatchItems}</div>
    </div>;
    

    //////////////////////

    ////// MATCH RESULT: PIE CHART 
    var width = ($(window).width() > 500) ? 500 : $(window).width()-20;
    var height = ($(window).width() > 500) ? 300 : 200;

    /////// versionObj to Array
    var matchArray = [];
    for(var key in versionObj){
       versionObj[key].id = key;
       matchArray.push(versionObj[key]);
    }
    
    // Match Result Bar Chart
    matchArray.sort(function (a, b) {
    	return b.count-a.count;
    });
    
    var votesArray = matchArray.map((item, i)=>{
    	//console.log(item.count);
        //return Math.round((item.count/votesTotal)*100, 0);
        return item.count;
    });
    //console.log("***");
    //console.log(votesArray);

    var resultChartItem = (
    <Chart className="MatchResult-chart"
           width={width} 
           height={height}>
        <DataSeries 
           percentage={false}
           type="BarChart"
           data={votesArray} 
           width={width}
           height={height}
           defaultColor="#999"
           highlightColor="#F2DB5D"
           highlightIndex={highlightIndex} />
    </Chart>);

   ///////////////////////////////////////////////////////////////////

    
    var versionItems = matchArray.map((item,i)=>{ 
        return (
            <div className="MatchResult-flexCell"
                 key={i}>
                 <Version type={"result"}
                          name={item.id}
                          key={i}
                          totalCount={votesTotal} />
            </div>  
        )
    });

    ///////////////////////////////////////////////////////////////
    // FOR DEBUG
    // var matchItems = array.map((item, index)=>{
    //     return (
    //     	<div className="MatchResult-item"
    //              key={index}>
                 
    //     	    <div className="MatchResult-count">{item.count}</div>
    //     		<Version className="MatchResult-img"
    //     		         name={item.name}
    //     		         cover={true}
    //                      key={index} />
        		
    //     	</div>
    //     )
    // });

    return (
        <div className="MatchResult">
          {topMatchItems}
          {resultChartItem}
          <div className="MatchResult-flexGrid"> {versionItems}</div>
        </div>
    );
  }
});

module.exports = MatchResult;


