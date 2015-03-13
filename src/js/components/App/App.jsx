/** @jsx React.DOM */

var React = require('react/addons');
var Cover = require('../Cover/Cover.jsx');
var QAItem = require('../QAItem/QAItem.jsx');

var MatchResult = require('../MatchResult/MatchResult.jsx');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');
var randomNum = Math.floor(Math.random() * 100 % 5)+1;

require('./App.css');

function getData(){
  var obj = AppStore.getData();
  var data = [];
  for(var key in obj){
    data.push(obj[key]);
  }
  return data;
}

var App = React.createClass({
  
  mixins: [React.addons.LinkedStateMixin],
  
  getInitialState(){
    return {
      data: getData(),
      currentQAItemIndex: 1,
      answers: {
        // Format // "Question1":"A"
      },
      match: {},
      showMatchResult: false

    }
  },
  
  //把 view 註冊到 stores，當 store 有改變/emit change 的時候，用 _onChange 這個 callback 處理
  componentDidMount () {
    AppStore.addChangeListener(this._onChange);

    
    
  },
  
  componentWillUnmount () {
    AppStore.removeChangeListener(this._onChange);
  },

  
  _onChange (){
      this.setState({
        data: getData()
      });
  },

  _onAnswer (i, event) {
    
  },

  _onShowMatchResult (){
    
    this.setState({
      showMatchResult: true
    });
    
    // Scroll to answer section
    var ansID = ".App-resultSection";
    var target = $(ansID);

    $("html,body").animate({
        scrollTop: target.offset().top
     }, 500);


  },

  _recordAnswer (item) {

      var currentAns = this.state.answers;

      if(currentAns[item.id]) return false;//如果已經回答過，不再重複登記

      currentAns[item.id] = item.index;
      this.setState({
        answers: currentAns
      });

      // Update vote counts in firebase
      AppActions.update(item);

      // 紀錄和哪個版本最像
      // console.log(item.versions);
      item.versions.map((value,index)=>{
          if(!this.state.match[value]){
              this.state.match[value] = 1;
          }else{
              this.state.match[value] += 1;
          }
      });

      console.log(this.state.match);
      return true;
  
      // TODO 紀錄總測驗人次
      // 全部答完的才算嗎？

  },

  _unlockNextQAItem() {
      this.setState({
        currentQAItemIndex: this.state.currentQAItemIndex+1
      });

      ////////////////////// FINAL // 
      var questionCount = Object.keys(this.state.data).length;//questionCount
      if(this.state.currentQAItemIndex === questionCount){
        
        // Scroll to gif
        // 250 is a magic number...
        var target = $(".App-resultButton");
        $("html,body").animate({
            scrollTop: target.offset().top + 250
         }, 500);
        console.log(target.offset().top);

        var cb = this._onShowMatchResult;
        setTimeout(function(){
          cb();
        }, 3000);
      }
  },

  render () {
   
    var qaItems = this.state.data.map((item, index)=>{
        //console.log(item);
        var userVoteData = this.state.answers[item.id];
        return (
            <QAItem currentQAItemIndex={this.state.currentQAItemIndex}
                    data={item}
                    userVote={userVoteData}
                    key={index}
                    unlockHandler={this._unlockNextQAItem}
                    recordAnswerHandler={this._recordAnswer} />
        )
    });

    var questionCount = Object.keys(this.state.data).length;//questionCount
  	
    
    var gifUrl = require("./images/resultTransit.gif");
    
    var imgUrl = require("./images/"+randomNum+".png");
    
    //debug//var matchResultButton = Object.keys(this.state.answers).length >= 2 ? 
    var matchResultButton = "";
    if(Object.keys(this.state.answers).length === questionCount){
       if(!this.state.showMatchResult){
          matchResultButton = <div className="App-resultButton is-actived">和我最接近的兩岸監督條例是...
                                  <img className="App-resultImg" 
                                        src={gifUrl} />
                              </div>;
       }else{
          matchResultButton = <div className="App-resultButton is-completed">
                                  <img className="App-resultImg" 
                                        src={imgUrl} />
                              </div>;
       }

    }else{
         matchResultButton = <div className="App-resultButton"></div>;
    }
    
    
    var matchResultItem = this.state.showMatchResult ? 
        <div className="App-resultSection is-actived"><MatchResult data={this.state.match} /></div> : 
        <div className="App-resultSection"></div>;
   
    
    return (
      <div className="App">
           <Cover />
           {qaItems}
           {matchResultButton}
           {matchResultItem}
      </div>
    );
  }
});

module.exports = App;


