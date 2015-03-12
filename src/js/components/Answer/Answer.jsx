/** @jsx React.DOM */

var React = require('react/addons');

require('./Answer.css');

var Chart = require('../Chart/Chart.jsx');
var DataSeries = require('../DataSeries/DataSeries.jsx');


var Answer = React.createClass({
  
  render () {
  	
    var userAnswerItems = this.props.data.map((item,i)=>{
        
        //var choosedItem = this.props.userVote === item.index ? <div>你的選擇</div> : "";
        
        return (
            <div className="Answer-flexCell"
                 key={i}>
                 <div className="Answer-flexCellIndex">{item.index}</div>
                 
            </div>  
        )
    });

    var versionItems = this.props.data.map((item,i)=>{
        
        var subItems = item.versions.map((versionItem,j)=>{
            var versionImgURL = require("./images/"+versionItem+".png");
            return (
                <img className="Answer-flexCellImg" 
                     kye={j}
                     src={versionImgURL} />
            )
        });

        return (
            <div className="Answer-flexCell"
                 key={i}>
                 {subItems}
            </div>  
        )
    });
    
    // 各選項票數資料，原始數字 & 百分比表示
    var votesTotal = 0;
    var votesCountArray = this.props.data.map((item, i)=>{
        votesTotal += item.votes;
        return item.votes;
    });
    var votesPercentageArray = this.props.data.map((item, i)=>{
        return Math.round((item.votes/votesTotal)*100, 0);
    });

    //

    var {classSet} = React.addons;
    var classes = classSet({
            "Answer": true,
            "is-completed": this.props.completed
    });
    
    var answerID = this.props.id + "Answer";///// SET answer/result part's id

    //console.log(screen.width);
    var width = (screen.width > 400) ? 400 : screen.width-20;
    var height = width/2;

    var chartItem = this.props.completed ? 
    <Chart width={width} 
           height={height}>
        <DataSeries 
           type="BarChart"
           data={votesPercentageArray} 
           width={width}
           height={height}
           defaultColor="#999"
           highlightColor="#F2DB5D"
           highlightIndex={this.props.userVote} />
    </Chart> : "";

    return (
      
      <div className={classes}
           id={answerID}>
          {chartItem}
          <div className="Answer-flexGrid"> 
              {userAnswerItems}
          </div>
          <div className="Answer-version">
            <div className="Answer-flexGrid"> 
                {versionItems}
            </div>
          </div>
      </div>
      
    );
  }
});

module.exports = Answer;


