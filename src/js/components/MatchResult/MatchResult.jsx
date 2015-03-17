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


$ = require('jquery');

var Chart = require('../Chart/Chart.jsx');
var DataSeries = require('../DataSeries/DataSeries.jsx');


require('./MatchResult.css');

var MatchResult = React.createClass({
  
  _onGoToCompleteMessage(){
    // Scroll to intro
    var target = $(".CompleteMessage");
    $("html,body").animate({
        scrollTop: target.offset().top
     }, 500);

  },

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
    var width = ($(window).width() > 500) ? 500 : $(window).width();
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
    <div className="MatchResult-chart">
    <Chart width={width} 
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
    </Chart>
    </div>);

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
          <div className="MatchResult-summary">
              <div className="MatchResult-summaryTitle">小結</div>
              <p>民主不應只是選舉，也不應只是投票，民主應深化到公共政策的決定參與過程，推動《兩岸協定締結條例（民間團體版草案）》的立法，就是要讓每一個權益受影響的人民，在協議的洽簽過程中可以參與，為自己的權益與公益發聲。</p>
              <p>立法，不只是立法委員的事，立法技術、條文可以交給專家、交給委員決定，但是，人民就重大法案的立法原則，應該表示意見。</p>
              <p>兩岸協議監督條例「人民來立法」行動，是一個嘗試，希望找出一個結合代議民主與草根民主的可行模式，讓台灣的民主更完善，讓「民主轉大人」。</p>
              <p>由於目前各版本草案討論的問題範圍並不相同，有些版本對於部分問題並無明確規定，所以不一定每一題的選項都會對應到各版本。填寫過程如果發現此一現象，並非疏漏，請放心參與問卷。</p>
              <p>感謝您費心填完此份問卷，我們將以此份問卷為基礎，推動後續公共討論與國會溝通、施壓工作，讓立法委員聽到人民的聲音，讓人民的意志影響立法，建立我國對中國談判的民主監督機制。</p>
              <div className="MatchResult-sign">
                  <div className="MatchResult-signName">經濟民主聯合</div>
                  <div className="MatchResult-signDate">2015.3.18</div>
              </div>
              <div className="MatchResult-jump">
                  <div className="MatchResult-arrowBox"
                       onClick={this._onGoToCompleteMessage}>咦發現野生阿草！</div>
              </div>
          </div>
        </div>
    );
  }
});

module.exports = MatchResult;


