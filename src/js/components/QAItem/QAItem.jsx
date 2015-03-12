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

  _onAnswer (i, event) {// i: 選擇的答案 [A, B, C, D...]
    

    // Reocrd user's answer
    this.props.recordAnswerHandler(i);

    // Set question as completed -> activate answer section
    this.setState({
      completed: true
    });

    // Scroll to answer section
    var ansID = "#" + this.props.data.id + "Answer";
    var target = $(ansID);

    //console.log("slide to:");
    //console.log(target.offset().top);
    
    $("html,body").animate({
        scrollTop: target.offset().top
     }, 500);

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
          <Answer completed={this.state.completed}
                  data={options}
                  id={id}
                  userVote={this.props.userVote} />
      </div>
      
    );
  }
});

module.exports = QAItem;


