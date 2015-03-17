/** @jsx React.DOM */

var React = require('react/addons');

var Options = require('../Options/Options.jsx');
var Answer = require('../Answer/Answer.jsx');

require('./QAItem.css');
$ = require('jquery');

var QAItem = React.createClass({
  
  getInitialState(){
    return {
      completed: false
    }
  },

   _toNext(){
    
      var nextIndex = parseInt(this.props.data.order)+1;
      var target = $("#Question"+nextIndex);

      $("html,body").animate({
          scrollTop: target.offset().top + 250
      }, 500);

  },

  _onAnswer (i, event) {// i: 選擇的答案 [A, B, C, D...]
    
    // Reocrd user's answer
    var validVote = this.props.recordAnswerHandler(i);
    
    // Scroll to answer section
    var ansID = "#" + this.props.data.id + "Answer";
    var target = $(ansID);

    $("html,body").animate({
        scrollTop: target.offset().top
    }, 500);

    
    if(!validVote) return; // 如果使用者按第二次以上，只會跳到圖表，不會再投一次

    // Set question as completed -> activate answer section
    this.setState({
      completed: true
    });

    // Unlock next question
    this.props.unlockHandler();

  },

  render () {
  
    var { id,
          order,
          index,
          title,
          description,
          options } = this.props.data;

    var {classSet} = React.addons;
    var classes = classSet({
            "QAItem": true,
            "is-active": order <= this.props.currentQAItemIndex
    });
    //console.log(this.props.currentQAItemIndex);

    var toNextItem = "";
    //作答之後才顯示下一題 or 看結果的選項
    if(this.state.completed){
       toNextItem = (order === this.props.totalCount) ? 
                    <div className="QAItem-button"
                         onClick={this.props.toResultHandler}>看結果</div> :
                    <div className="QAItem-button"
                         onClick={this._toNext}>下一題</div>;
    }

    return (
      
      <div className={classes}
           id={id}>
          <div className="QAItem-questionContent">
              <div className="QAItem-questionTitle">{index}. {title}</div>
              <div className="QAItem-questionDescription">{description}</div>
              <Options  onAnswerHandler={this._onAnswer}
                        data={options}
                        id={id}
                        userVote={this.props.userVote} />
          </div>
          <div className="QAItem-resultContnet">
              <Answer completed={this.state.completed}
                      data={options}
                      id={id}
                      userVote={this.props.userVote} />
              {toNextItem}
          </div>
      </div>
      
    );
  }
});

module.exports = QAItem;


