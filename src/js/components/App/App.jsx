/** @jsx React.DOM */

var React = require('react/addons');
var Cover = require('../Cover/Cover.jsx');
var QAItem = require('../QAItem/QAItem.jsx');
var MatchResult = require('../MatchResult/MatchResult.jsx');

var AppStore = require('../../stores/AppStore');
var AppActions = require('../../actions/AppActions');

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
      match: {}

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

  _recordAnswer (item) {

      var currentAns = this.state.answers;
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
      //console.log(this.state.match);
  
      // TODO 紀錄總測驗人次
      // 全部答完的才算嗎？

  },

  _unlockNextQAItem() {
      this.setState({
        currentQAItemIndex: this.state.currentQAItemIndex+1
      });
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
  	
    return (
      <div className="App">
           <Cover />
           {qaItems}
           <MatchResult data={this.state.match} />
      </div>
    );
  }
});

module.exports = App;


